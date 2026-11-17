export interface GameRosterConfig {
	/** Tab name in the Google Sheet */
	sheetTab: string;
	/** Allowed roles for this game (empty array if game doesn't use roles) */
	roles: string[];
	/** Allowed ranks for this game (empty array to allow any rank string) */
	ranks: string[];
	/** Folder under /assets/ containing Ranks/ and Roles/ images, if available */
	assetsFolder?: string;
	/** Default file extension for rank images in Ranks/<Rank>_Rank.<ext> (defaults to 'webp') */
	rankExtension?: string;
	/** Per-rank file extension overrides (e.g. if one rank is .webp while others are .png) */
	rankExtensions?: Record<string, string>;
	/** Default file extension for role images in Roles/<Role>.<ext> (defaults to 'png') */
	roleExtension?: string;
	/** Optional display label overrides per rank key */
	rankLabels?: Record<string, string>;
	/** Optional role icon size in px (defaults to 12) */
	roleIconSize?: number;
	/** If true, role icons use /assets/<assetsFolder>/Roles/<Rank>_<Role>.png */
	rankMatchedRoles?: boolean;
	/** If true, keeps long rank names on a single line with slightly tighter letter-spacing */
	nowrapRank?: boolean;
	/** If true, Column D and Column E are both rank columns (e.g. DBD Killer & Survivor grades) */
	dualRanks?: {
		colDFolder: string;
		colEFolder: string;
	};
}

export const GAME_ROSTER_CONFIGS: Record<string, GameRosterConfig> = {
	valorant: {
		sheetTab: 'Valorant',
		assetsFolder: 'ValorantImages',
		rankExtension: 'webp',
		roles: ['Duelist', 'Initiator', 'Controller', 'Sentinel'],
		ranks: [
			'Iron_1',
			'Iron_2',
			'Iron_3',
			'Bronze_1',
			'Bronze_2',
			'Bronze_3',
			'Silver_1',
			'Silver_2',
			'Silver_3',
			'Gold_1',
			'Gold_2',
			'Gold_3',
			'Platinum_1',
			'Platinum_2',
			'Platinum_3',
			'Diamond_1',
			'Diamond_2',
			'Diamond_3',
			'Ascendant_1',
			'Ascendant_2',
			'Ascendant_3',
			'Immortal_1',
			'Immortal_2',
			'Immortal_3',
			'Radiant'
		]
	},
	overwatch: {
		sheetTab: 'Overwatch',
		assetsFolder: 'OWImages',
		rankExtension: 'webp',
		roleExtension: 'webp',
		roleIconSize: 16,
		roles: ['Tank', 'Damage', 'Support'],
		ranks: [
			'Bronze',
			'Silver',
			'Gold',
			'Platinum',
			'Emerald',
			'Diamond',
			'Master',
			'Grandmaster',
			'Champion',
			'Top_500'
		]
	},
	league: {
		sheetTab: 'LOL',
		assetsFolder: 'LOLImages',
		rankExtension: 'png',
		rankMatchedRoles: true,
		roleIconSize: 12,
		roles: ['Top', 'Jungle', 'Mid', 'Bot', 'Support'],
		ranks: [
			'Iron',
			'Bronze',
			'Silver',
			'Gold',
			'Platinum',
			'Emerald',
			'Diamond',
			'Master',
			'Grandmaster',
			'Challenger'
		]
	},
	rl: {
		sheetTab: 'Rocket League',
		assetsFolder: 'RLImages',
		rankExtension: 'webp',
		rankExtensions: {
			Bronze_1: 'png',
			Bronze_3: 'png',
			Gold_3: 'png',
			Platinum_1: 'png',
			Grand_Champion_1: 'png',
			Grand_Champion_3: 'png'
		},
		nowrapRank: true,
		roles: [],
		ranks: [
			'Bronze_1',
			'Bronze_2',
			'Bronze_3',
			'Silver_1',
			'Silver_2',
			'Silver_3',
			'Gold_1',
			'Gold_2',
			'Gold_3',
			'Platinum_1',
			'Platinum_2',
			'Platinum_3',
			'Diamond_1',
			'Diamond_2',
			'Diamond_3',
			'Champion_1',
			'Champion_2',
			'Champion_3',
			'Grand_Champion_1',
			'Grand_Champion_2',
			'Grand_Champion_3',
			'Supersonic_Legend'
		]
	},
	counterstrike: {
		sheetTab: 'CS2',
		assetsFolder: 'CS2Images',
		rankExtension: 'png',
		nowrapRank: true,
		roles: [],
		ranks: [
			'Level_1',
			'Level_2',
			'Level_3',
			'Level_4',
			'Level_5',
			'Level_6',
			'Level_7',
			'Level_8',
			'Level_9',
			'Level_10',
			'Challenger'
		],
		rankLabels: {
			Level_1: 'Faceit Level 1',
			Level_2: 'Faceit Level 2',
			Level_3: 'Faceit Level 3',
			Level_4: 'Faceit Level 4',
			Level_5: 'Faceit Level 5',
			Level_6: 'Faceit Level 6',
			Level_7: 'Faceit Level 7',
			Level_8: 'Faceit Level 8',
			Level_9: 'Faceit Level 9',
			Level_10: 'Faceit Level 10',
			Challenger: 'Faceit Challenger'
		}
	},
	rivals: {
		sheetTab: 'Marvel Rivals',
		assetsFolder: 'RivalsImages',
		rankExtension: 'png',
		rankExtensions: {
			Grandmaster: 'webp'
		},
		roleIconSize: 16,
		roles: ['Duelist', 'Strategist', 'Vanguard'],
		ranks: [
			'Bronze',
			'Silver',
			'Gold',
			'Platinum',
			'Diamond',
			'Grandmaster',
			'Celestial',
			'One_Above_All'
		]
	},
	rainbow: {
		sheetTab: 'R6 Siege',
		assetsFolder: 'R6Images',
		rankExtension: 'png',
		roles: [],
		ranks: ['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Champion']
	},
	dbd: {
		sheetTab: 'DBD',
		assetsFolder: 'DBDImages',
		rankExtension: 'png',
		dualRanks: {
			colDFolder: 'Killer',
			colEFolder: 'Survivor'
		},
		roles: [],
		ranks: ['Ash', 'Bronze', 'Silver', 'Gold', 'Iridescent', 'Iridescent_1']
	},
	deadlock: {
		sheetTab: 'Deadlock',
		assetsFolder: 'DeadlockImages',
		rankExtension: 'webp',
		roles: [],
		ranks: [
			'Initiate',
			'Seeker',
			'Acolyte',
			'Mystic',
			'Sentinel',
			'Ritualist',
			'Emissary',
			'Oracle',
			'Phantom',
			'Ascendant',
			'Eternus'
		]
	}
};
