// Script to fetch Discord Scheduled Events and write to src/lib/data/events.json
// Uses standard Node/Deno compatible APIs (node:fs/promises, node:process, web fetch, Intl)

import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';

interface RecurrenceRule {
	start: string;
	end: string | null;
	frequency: number; // 0: YEARLY, 1: MONTHLY, 2: WEEKLY, 3: DAILY
	interval: number;
	by_weekday?: number[] | null;
	by_n_weekday?: Array<{ n: number; day: number }> | null;
	by_month?: number[] | null;
	by_month_day?: number[] | null;
	by_year_day?: number[] | null;
	count?: number | null;
}

interface EventException {
	event_exception_id?: string;
	event_id?: string;
	scheduled_start_time: string;
	scheduled_end_time?: string | null;
	is_canceled: boolean;
}

interface DiscordEvent {
	id: string;
	guild_id: string;
	channel_id: string | null;
	creator_id?: string;
	name: string;
	description: string | null;
	scheduled_start_time: string;
	scheduled_end_time: string | null;
	privacy_level: number;
	status: number; // 1: SCHEDULED, 2: ACTIVE, 3: COMPLETED, 4: CANCELED
	entity_type: number; // 1: STAGE, 2: VOICE, 3: EXTERNAL
	entity_metadata: { location?: string } | null;
	user_count?: number;
	image?: string | null;
	recurrence_rule?: RecurrenceRule | null;
	guild_scheduled_event_exceptions?: EventException[] | null;
}

interface ProcessedEvent {
	id: string;
	name: string;
	description: string;
	gameCode: string;
	gameName: string;
	isCommunity: boolean;
	location: string;
	startTime: string;
	endTime: string | null;
	dateDay: string;
	dateMonth: string;
	timeFormatted: string;
	weekLabel: string;
	tickerText: string;
	discordUrl: string;
}

interface OutputData {
	lastUpdated: string;
	events: ProcessedEvent[];
}

const GAME_PATTERNS: Array<{
	code: string;
	name: string;
	pattern: RegExp;
}> = [
	{ code: 'dlk', name: 'Deadlock', pattern: /\b(deadlock|dlk)\b/i },
	{ code: 'val', name: 'Valorant', pattern: /\b(valorant|val|cval)\b/i },
	{ code: 'ow', name: 'Overwatch', pattern: /\b(overwatch|ow|ow2)\b/i },
	{ code: 'lol', name: 'League', pattern: /\b(league(\s+of\s+legends)?|lol|tft|teamfight\s+tactics)\b/i },
	{ code: 'rl', name: 'Rocket League', pattern: /\b(rocket\s+league|crl|rl)\b/i },
	{ code: 'r6', name: 'R6 Siege', pattern: /\b(rainbow\s+six(\s+siege)?|r6|siege)\b/i },
	{ code: 'dbd', name: 'DBD', pattern: /\b(dead\s+by\s+daylight|dbd)\b/i },
	{ code: 'cs', name: 'CS2', pattern: /\b(counter[\s-]?strike(\s*2)?|cs2|csgo|cs:go)\b/i },
	{ code: 'mr', name: 'Marvel Rivals', pattern: /\b(marvel\s+rivals|rivals)\b/i }
];

const COMMUNITY_PATTERN = /\b(inhouse|inhouses|casual|scrim|game\s*night|watch\s*party|social|meeting|general\s*meeting|tryouts?)\b/i;

function getEnv(key: string): string | undefined {
	return process.env[key];
}

async function writeJson(filePath: string, data: OutputData): Promise<void> {
	const content = JSON.stringify(data, null, '\t') + '\n';
	await writeFile(filePath, content, 'utf-8');
}

async function readJsonIfExists(filePath: string): Promise<OutputData | null> {
	try {
		const text = await readFile(filePath, 'utf-8');
		return JSON.parse(text);
	} catch {
		return null;
	}
}

function detectGame(title: string, description: string) {
	const combined = `${title} ${description}`;
	for (const game of GAME_PATTERNS) {
		if (game.pattern.test(combined)) {
			return { code: game.code, name: game.name };
		}
	}
	return { code: 'comm', name: 'Community' };
}

function getWeekMonday(date: Date, timeZone: string): Date {
	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone,
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
	const parts = formatter.formatToParts(date);
	const year = Number(parts.find((p) => p.type === 'year')?.value);
	const month = Number(parts.find((p) => p.type === 'month')?.value) - 1;
	const day = Number(parts.find((p) => p.type === 'day')?.value);

	const localDate = new Date(Date.UTC(year, month, day));
	const dayOfWeek = localDate.getUTCDay(); // 0 is Sunday, 1 is Monday
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
	localDate.setUTCDate(localDate.getUTCDate() + diffToMonday);
	return localDate;
}

function formatWeekLabel(date: Date, timeZone: string): string {
	const monday = getWeekMonday(date, timeZone);
	const monthName = monday.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
	const dayNumber = monday.getUTCDate();
	return `Week of ${monthName} ${dayNumber}`;
}

function formatPacificDate(isoString: string) {
	const date = new Date(isoString);
	const timeZone = 'America/Los_Angeles';

	const weekdayShort = date.toLocaleString('en-US', { weekday: 'short', timeZone });
	const monthLong = date.toLocaleString('en-US', { month: 'long', timeZone });
	const monthNum = date.toLocaleString('en-US', { month: 'numeric', timeZone });
	const dayNum = date.toLocaleString('en-US', { day: 'numeric', timeZone });

	const timeString = date
		.toLocaleString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
			timeZone
		})
		.toUpperCase();

	return {
		dateDay: `${weekdayShort} ${dayNum}`,
		dateMonth: monthLong,
		timeFormatted: timeString,
		weekLabel: formatWeekLabel(date, timeZone),
		tickerDay: `${weekdayShort.toUpperCase()} ${monthNum}/${dayNum}`
	};
}

function resolveLocation(event: DiscordEvent): string {
	if (event.entity_metadata?.location) {
		return event.entity_metadata.location.trim();
	}
	if (event.entity_type === 2) {
		return 'Discord · Voice Channel';
	}
	if (event.entity_type === 1) {
		return 'Discord · Stage Channel';
	}
	return 'Discord';
}

function addLocalDays(
	isoString: string,
	days: number,
	timeZone: string = 'America/Los_Angeles'
): string {
	const date = new Date(isoString);
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	}).formatToParts(date);

	const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
	const year = get('year');
	const month = get('month') - 1;
	const day = get('day') + days;
	let hour = get('hour');
	if (hour === 24) hour = 0;
	const minute = get('minute');
	const second = get('second');

	const testUtc = new Date(Date.UTC(year, month, day, hour, minute, second));
	const testParts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	}).formatToParts(testUtc);

	const tGet = (type: string) => Number(testParts.find((p) => p.type === type)?.value);
	let tHour = tGet('hour');
	if (tHour === 24) tHour = 0;
	const diffMs =
		Date.UTC(year, month, day, hour, minute, second) -
		Date.UTC(tGet('year'), tGet('month') - 1, tGet('day'), tHour, tGet('minute'), tGet('second'));

	return new Date(testUtc.getTime() + diffMs).toISOString();
}

function expandEventOccurrences(
	event: DiscordEvent,
	now: number,
	maxDaysAhead: number = 35,
	maxOccurrences: number = 5
): Array<{ instanceId: string; startTime: string; endTime: string | null }> {
	const results: Array<{ instanceId: string; startTime: string; endTime: string | null }> = [];
	const baseStartMs = new Date(event.scheduled_start_time).getTime();
	if (isNaN(baseStartMs)) return results;

	const durationMs = event.scheduled_end_time
		? Math.max(0, new Date(event.scheduled_end_time).getTime() - baseStartMs)
		: 2 * 60 * 60 * 1000; // default 2 hours

	const maxFutureMs = now + maxDaysAhead * 24 * 60 * 60 * 1000;
	const fourHoursAgo = now - 4 * 60 * 60 * 1000;

	// Exceptions lookup (e.g. cancellations)
	const exceptions = event.guild_scheduled_event_exceptions || [];
	const canceledStarts = new Set<string>();
	for (const ex of exceptions) {
		if (ex.is_canceled && ex.scheduled_start_time) {
			canceledStarts.add(new Date(ex.scheduled_start_time).toISOString());
		}
	}

	// Always add the base/next occurrence provided by Discord if valid and not canceled
	const baseIso = new Date(event.scheduled_start_time).toISOString();
	if (!canceledStarts.has(baseIso)) {
		const baseEndMs = event.scheduled_end_time
			? new Date(event.scheduled_end_time).getTime()
			: baseStartMs;
		if (baseEndMs >= fourHoursAgo && baseStartMs <= maxFutureMs) {
			results.push({
				instanceId: event.id,
				startTime: event.scheduled_start_time,
				endTime: event.scheduled_end_time
			});
		}
	}

	// If no recurrence rule, we only have the single occurrence
	if (!event.recurrence_rule) {
		return results;
	}

	const rule = event.recurrence_rule;
	const interval = Math.max(1, rule.interval || 1);
	const ruleEndMs = rule.end ? new Date(rule.end).getTime() : Infinity;
	const ruleCount = rule.count || Infinity;

	// Determine step in calendar days based on recurrence frequency:
	// 1: MONTHLY, 2: WEEKLY, 3: DAILY
	let stepDays = 7 * interval;
	if (rule.frequency === 3) {
		stepDays = interval;
	} else if (rule.frequency === 1) {
		stepDays = 28 * interval;
	} else if (rule.frequency === 2) {
		stepDays = 7 * interval;
	}

	let currentIso = event.scheduled_start_time;
	let occurrenceIndex = 1;

	while (results.length < maxOccurrences && occurrenceIndex < ruleCount) {
		currentIso = addLocalDays(currentIso, stepDays);
		const currentStartMs = new Date(currentIso).getTime();

		// Stop if past our max projection window or past the rule's specified end
		if (currentStartMs > maxFutureMs || currentStartMs > ruleEndMs) {
			break;
		}

		if (currentStartMs >= fourHoursAgo) {
			const checkIso = new Date(currentIso).toISOString();
			if (!canceledStarts.has(checkIso)) {
				const currentEndIso = new Date(currentStartMs + durationMs).toISOString();
				results.push({
					instanceId: `${event.id}_occ${occurrenceIndex}`,
					startTime: currentIso,
					endTime: currentEndIso
				});
			}
		}

		occurrenceIndex++;
	}

	return results;
}

async function main() {
	const rawToken = getEnv('DISCORD_BOT_TOKEN');
	const rawGuildId = getEnv('DISCORD_GUILD_ID');
	const outputPath = 'src/lib/data/events.json';

	if (!rawToken || !rawGuildId) {
		console.warn(
			'[sync-discord-events] DISCORD_BOT_TOKEN or DISCORD_GUILD_ID not set in environment.'
		);
		const existing = await readJsonIfExists(outputPath);
		if (existing && existing.events?.length > 0) {
			console.log(
				`[sync-discord-events] Preserving existing ${existing.events.length} events from ${outputPath}`
			);
			return;
		}
		console.log('[sync-discord-events] No existing events file to preserve. Exiting.');
		return;
	}

	const token = rawToken.trim();
	const guildId = rawGuildId.trim();
	const authHeader = token.startsWith('Bot ') ? token : `Bot ${token}`;

	console.log(`[sync-discord-events] Fetching scheduled events for guild ${guildId}...`);

	const response = await fetch(
		`https://discord.com/api/v10/guilds/${guildId}/scheduled-events?with_user_count=true`,
		{
			headers: {
				Authorization: authHeader,
				'Content-Type': 'application/json',
				'User-Agent': 'EAOSU-Web-Sync/1.0'
			}
		}
	);

	if (!response.ok) {
		const errBody = await response.text();
		console.error(`[sync-discord-events] Discord API error (${response.status}): ${errBody}`);
		// If API fails, keep existing file if available
		const existing = await readJsonIfExists(outputPath);
		if (existing) {
			console.log('[sync-discord-events] Keeping previous events data due to API error.');
			return;
		}
		throw new Error(`Discord API returned ${response.status}`);
	}

	const rawEvents: DiscordEvent[] = await response.json();
	console.log(`[sync-discord-events] Retrieved ${rawEvents.length} raw events from Discord.`);

	const now = Date.now();

	// Expand recurring events and filter completed/canceled events
	const allInstances: Array<{
		event: DiscordEvent;
		instanceId: string;
		startTime: string;
		endTime: string | null;
	}> = [];

	for (const ev of rawEvents) {
		// Status 3: COMPLETED, 4: CANCELED
		if (ev.status === 3 || ev.status === 4) continue;
		if (!ev.scheduled_start_time) continue;

		const occurrences = expandEventOccurrences(ev, now);
		for (const occ of occurrences) {
			allInstances.push({
				event: ev,
				instanceId: occ.instanceId,
				startTime: occ.startTime,
				endTime: occ.endTime
			});
		}
	}

	// Sort chronologically across all expanded instances
	allInstances.sort(
		(a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
	);

	const processedEvents: ProcessedEvent[] = allInstances.map((inst) => {
		const ev = inst.event;
		const game = detectGame(ev.name, ev.description || '');
		const isCommunity =
			game.code === 'comm' || COMMUNITY_PATTERN.test(`${ev.name} ${ev.description || ''}`);
		const dt = formatPacificDate(inst.startTime);
		const location = resolveLocation(ev);
		const tickerText = `${dt.tickerDay} — ${ev.name} — ${dt.timeFormatted}`;
		const discordUrl = `https://discord.com/events/${guildId}/${ev.id}`;

		return {
			id: inst.instanceId,
			name: ev.name,
			description: ev.description || '',
			gameCode: game.code,
			gameName: game.name,
			isCommunity,
			location,
			startTime: inst.startTime,
			endTime: inst.endTime,
			dateDay: dt.dateDay,
			dateMonth: dt.dateMonth,
			timeFormatted: dt.timeFormatted,
			weekLabel: dt.weekLabel,
			tickerText,
			discordUrl
		};
	});

	// Compare with existing events to prevent unnecessary commits and deployment triggers
	const existing = await readJsonIfExists(outputPath);
	if (existing && JSON.stringify(existing.events) === JSON.stringify(processedEvents)) {
		console.log(
			`[sync-discord-events] Events are unchanged (${processedEvents.length} events). Skipping file write.`
		);
		return;
	}

	const output: OutputData = {
		lastUpdated: new Date().toISOString(),
		events: processedEvents
	};

	await writeJson(outputPath, output);
	console.log(
		`[sync-discord-events] Successfully wrote ${processedEvents.length} events (including recurrences) to ${outputPath}`
	);
}

main().catch((err) => {
	console.error('[sync-discord-events] Fatal error:', err);
	process.exit(1);
});
