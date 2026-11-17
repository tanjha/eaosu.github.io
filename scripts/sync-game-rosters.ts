// Script to fetch game roster tabs from a Google Sheet and write each game to
// src/lib/data/<game>-roster.json
// Uses standard Node/Deno compatible APIs (node:fs/promises, node:process, web fetch)
//
// Each tab in the Google Sheet corresponds to a game defined in src/lib/data/game-roster-config.ts:
//   Row 1:    Col A = "Game Coord(s) Discord", Cols B–F = coordinator Discord handles
//   Column A: Team name  — a non-empty cell starts a new team
//   Column B: Member     — member name (rows with no member are skipped)
//   Column C: Type       — Player | Sub | Coach | Assistant Coach | Analyst
//   Column D: Role(s)    — multi-select roles (validated per game)
//   Column E: Rank       — rank name (validated per game)
//   Column F: Blurb      — fun fact shown on the card
//   Column G: Page info  — "Major Competitions:" row (names in H, I, J, ...) and
//                          "Section Blurb" row (each non-empty G cell below it is a paragraph)
//
// The sheet must be shared as "Anyone with the link can view".
// Set ROSTER_SHEET_URL to the sheet's normal browser URL.

import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { GAME_ROSTER_CONFIGS, type GameRosterConfig } from '../src/lib/data/game-roster-config.ts';

type MemberType = 'Player' | 'Sub' | 'Coach' | 'AssistantCoach' | 'Analyst';

interface RosterMember {
	name: string;
	type: MemberType;
	rank?: string;
	secondaryRank?: string;
	roles: string[];
	fact: string;
}

interface RosterTeam {
	name: string;
	members: RosterMember[];
}

interface GameRosterData {
	lastUpdated: string;
	coordinators: string[];
	competitions: string[];
	blurb: string[];
	teams: RosterTeam[];
}

const LOG = '[sync-game-rosters]';

// Lowercased, punctuation-stripped sheet value -> component type
const TYPE_ALIASES: Record<string, MemberType> = {
	player: 'Player',
	sub: 'Sub',
	substitute: 'Sub',
	coach: 'Coach',
	headcoach: 'Coach',
	assistantcoach: 'AssistantCoach',
	asstcoach: 'AssistantCoach',
	analyst: 'Analyst'
};

function getOutputPath(gameKey: string): string {
	return `src/lib/data/${gameKey}-roster.json`;
}

function extractSpreadsheetId(input: string): string {
	const trimmed = input.trim();
	const idMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
	const id = idMatch ? idMatch[1] : /^[a-zA-Z0-9-_]{20,}$/.test(trimmed) ? trimmed : null;
	if (!id) throw new Error(`Could not find a spreadsheet ID in "${trimmed}"`);
	return id;
}

function toTabCsvUrl(spreadsheetId: string, sheetTab: string): string {
	return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&headers=0&sheet=${encodeURIComponent(sheetTab)}`;
}

/** RFC 4180 CSV parser (handles quoted fields, escaped quotes, and newlines inside quotes). */
function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let field = '';
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (inQuotes) {
			if (ch === '"') {
				if (text[i + 1] === '"') {
					field += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				field += ch;
			}
		} else if (ch === '"') {
			inQuotes = true;
		} else if (ch === ',') {
			row.push(field);
			field = '';
		} else if (ch === '\n' || ch === '\r') {
			if (ch === '\r' && text[i + 1] === '\n') i++;
			row.push(field);
			rows.push(row);
			row = [];
			field = '';
		} else {
			field += ch;
		}
	}
	if (field !== '' || row.length > 0) {
		row.push(field);
		rows.push(row);
	}
	return rows;
}

function normalizeType(raw: string, memberName: string, gameKey: string): MemberType {
	const key = raw.toLowerCase().replace(/[^a-z]/g, '');
	if (!key) return 'Player';
	const type = TYPE_ALIASES[key];
	if (!type) {
		console.warn(`${LOG} [${gameKey}] Unknown type "${raw}" for ${memberName}; defaulting to Player.`);
		return 'Player';
	}
	return type;
}

function normalizeRoles(raw: string, memberName: string, gameKey: string, config: GameRosterConfig): string[] {
	const roles: string[] = [];
	for (const part of raw.split(/[,;\n]/)) {
		const value = part.trim();
		if (!value) continue;
		if (config.roles.length === 0) {
			if (!roles.includes(value)) roles.push(value);
			continue;
		}
		const match = config.roles.find((r) => r.toLowerCase() === value.toLowerCase());
		if (match) {
			if (!roles.includes(match)) roles.push(match);
		} else {
			console.warn(`${LOG} [${gameKey}] Unknown role "${value}" for ${memberName}; ignoring.`);
		}
	}
	return roles;
}

function normalizeRank(raw: string, memberName: string, gameKey: string, config: GameRosterConfig): string | undefined {
	const value = raw.trim().replace(/^faceit\s+/i, '').replace(/\s+/g, '_');
	if (!value) return undefined;
	const formatted = value.charAt(0).toUpperCase() + value.slice(1);
	if (config.ranks.length > 0) {
		const match = config.ranks.find((r) => r.toLowerCase() === formatted.toLowerCase());
		if (!match) {
			console.warn(`${LOG} [${gameKey}] Unknown rank "${raw}" for ${memberName}; ignoring.`);
			return undefined;
		}
		return match;
	}
	return formatted;
}

const COLUMN_TITLES_A = new Set(['team name', 'team', 'teams', 'roster', 'rosters']);
const COLUMN_TITLES_B = new Set(['member', 'members', 'player', 'players', 'name']);
const COLUMN_TITLES_C = new Set(['type', 'role type']);
const COLUMN_TITLES_D = new Set(['role(s)', 'roles', 'role']);
const COLUMN_TITLES_E = new Set(['rank', 'ranks', 'peak rank']);
const COLUMN_TITLES_F = new Set(['blurb', 'player blurb', 'fact', 'fun fact', 'bio']);

// Roster data lives in columns A–F; page info (competitions + section blurb) lives in column G onward.
const ROSTER_COLUMNS = 6;
const INFO_COLUMN = 6; // Column G

function isDataTitleRow(cells: string[]): boolean {
	const [a = '', b = '', c = '', d = '', e = '', f = ''] = cells.map((x) => x.toLowerCase());
	if (COLUMN_TITLES_A.has(a)) return true;
	if (COLUMN_TITLES_B.has(b) || b.startsWith('member')) return true;
	if (COLUMN_TITLES_C.has(c) && (COLUMN_TITLES_D.has(d) || d.includes('grade'))) return true;
	if (COLUMN_TITLES_E.has(e) && COLUMN_TITLES_F.has(f)) return true;
	if (e.includes('rank') && COLUMN_TITLES_F.has(f)) return true;
	return false;
}

interface ParsedTab {
	coordinators: string[];
	competitions: string[];
	blurb: string[];
	teams: RosterTeam[];
}

function parseSheetTab(rows: string[][], gameKey: string, config: GameRosterConfig): ParsedTab {
	const coordinators: string[] = [];
	const competitions: string[] = [];
	const blurb: string[] = [];
	const teams: RosterTeam[] = [];
	let currentTeam: RosterTeam | null = null;
	let inBlurb = false;

	for (const cells of rows) {
		const trimmedCells = cells.map((c) => c.trim());

		// ---- Page info (Column G onward) ----
		//   "Major Competitions:" in G, competition names in H, I, J, ...
		//   "Section Blurb ..." in G, then each non-empty G cell below it is a paragraph
		const infoCell = trimmedCells[INFO_COLUMN] ?? '';
		if (/major\s*competition/i.test(infoCell)) {
			for (const cell of trimmedCells.slice(INFO_COLUMN + 1)) {
				if (cell && !competitions.includes(cell)) competitions.push(cell);
			}
		} else if (/section\s*blurb/i.test(infoCell)) {
			inBlurb = true;
		} else if (inBlurb && infoCell) {
			blurb.push(infoCell);
		}

		// ---- Roster (Columns A–F only) ----
		const rosterCells = trimmedCells.slice(0, ROSTER_COLUMNS);
		const [teamCell = '', memberCell = '', typeCell = '', rolesCell = '', rankCell = '', factCell = ''] =
			rosterCells;

		// Skip rows with nothing in the roster columns
		if (rosterCells.every((c) => c === '')) continue;

		// Row 1: "Game Coord(s) Discord" in Column A, handles in Columns B–F
		if (/^(game\s*)?coord|lead\s*discord/i.test(teamCell)) {
			for (const cell of rosterCells.slice(1)) {
				for (const part of cell.split(/[,;]/)) {
					const handle = part.trim().replace(/^@/, '');
					if (handle && !COLUMN_TITLES_B.has(handle.toLowerCase()) && !coordinators.includes(handle)) {
						coordinators.push(handle);
					}
				}
			}
			continue;
		}

		// Skip column title / header rows (e.g. "Team Name", "Member | Type | Role(s) | Rank | Blurb")
		if (isDataTitleRow(rosterCells)) continue;

		// A non-empty Column A starts a new team section
		if (teamCell) {
			currentTeam = { name: teamCell, members: [] };
			teams.push(currentTeam);
		}

		// If there is no member name in Column B on this row, move to the next row
		if (!memberCell) continue;

		if (!currentTeam) {
			console.warn(`${LOG} [${gameKey}] Member "${memberCell}" appears before any team name; skipping.`);
			continue;
		}

		const type = normalizeType(typeCell, memberCell, gameKey);
		const member: RosterMember = {
			name: memberCell,
			type,
			roles: config.dualRanks ? [] : normalizeRoles(rolesCell, memberCell, gameKey, config),
			fact: factCell
		};
		if (config.dualRanks) {
			const killerRank = normalizeRank(rolesCell, memberCell, gameKey, config);
			const survivorRank = normalizeRank(rankCell, memberCell, gameKey, config);
			if (killerRank) member.rank = killerRank;
			if (survivorRank) member.secondaryRank = survivorRank;
		} else {
			const rank = normalizeRank(rankCell, memberCell, gameKey, config);
			if (rank) member.rank = rank;
		}

		currentTeam.members.push(member);
	}

	return {
		coordinators,
		competitions,
		blurb,
		teams: teams.filter((t) => t.members.length > 0)
	};
}

async function readJsonIfExists<T>(filePath: string): Promise<T | null> {
	try {
		return JSON.parse(await readFile(filePath, 'utf-8'));
	} catch {
		return null;
	}
}

async function main() {
	const source = process.argv[2] || process.env.ROSTER_SHEET_URL;

	if (!source) {
		console.warn(`${LOG} ROSTER_SHEET_URL not set. Keeping existing roster JSON files.`);
		return;
	}

	const spreadsheetId = extractSpreadsheetId(source);
	console.log(`${LOG} Syncing from spreadsheet: ${spreadsheetId}`);

	for (const [gameKey, config] of Object.entries(GAME_ROSTER_CONFIGS)) {
		const outputPath = getOutputPath(gameKey);
		const csvUrl = toTabCsvUrl(spreadsheetId, config.sheetTab);
		console.log(`${LOG} Fetching tab "${config.sheetTab}" -> ${outputPath}...`);

		let response: Response;
		try {
			response = await fetch(csvUrl, { redirect: 'follow' });
		} catch (err) {
			console.error(`${LOG} [${gameKey}] Network error fetching tab:`, err);
			continue;
		}

		const contentType = response.headers.get('content-type') || '';
		if (!response.ok || contentType.includes('text/html')) {
			console.warn(
				`${LOG} [${gameKey}] Could not fetch tab "${config.sheetTab}" as CSV (HTTP ${response.status}). Keeping ${outputPath}.`
			);
			continue;
		}

		const existing = await readJsonIfExists<GameRosterData>(outputPath);
		const parsed = parseSheetTab(parseCsv(await response.text()), gameKey, config);

		// Any section left blank in the sheet keeps its previous value
		const pick = <T>(next: T[], prev: T[] | undefined): T[] => (next.length > 0 ? next : prev ?? []);
		const output: GameRosterData = {
			lastUpdated: new Date().toISOString(),
			coordinators: pick(parsed.coordinators, existing?.coordinators),
			competitions: pick(parsed.competitions, existing?.competitions),
			blurb: pick(parsed.blurb, existing?.blurb),
			teams: pick(parsed.teams, existing?.teams)
		};

		const hasData =
			output.coordinators.length + output.competitions.length + output.blurb.length + output.teams.length > 0;
		if (!hasData) {
			console.log(`${LOG} [${gameKey}] Tab "${config.sheetTab}" has no data yet. Keeping ${outputPath}.`);
			continue;
		}

		const { lastUpdated: _new, ...nextContent } = output;
		const { lastUpdated: _old, ...prevContent } = existing ?? ({} as Partial<GameRosterData>);
		if (existing && JSON.stringify(prevContent) === JSON.stringify(nextContent)) {
			console.log(`${LOG} [${gameKey}] Data unchanged. Skipping write.`);
			continue;
		}

		await writeFile(outputPath, JSON.stringify(output, null, '\t') + '\n', 'utf-8');

		const memberCount = output.teams.reduce((n, t) => n + t.members.length, 0);
		console.log(
			`${LOG} [${gameKey}] Wrote ${output.coordinators.length} coord(s), ${output.competitions.length} competition(s), ` +
				`${output.blurb.length} blurb paragraph(s), ${output.teams.length} teams / ${memberCount} members to ${outputPath}.`
		);
	}
}

main().catch((err) => {
	console.error(`${LOG} Fatal error:`, err);
	process.exit(1);
});
