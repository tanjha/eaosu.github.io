<script lang="ts">
	import { GAME_ROSTER_CONFIGS } from '$lib/data/game-roster-config';

	type MemberType = 'Player' | 'Sub' | 'Coach' | 'AssistantCoach' | 'Assistant Coach' | 'Analyst';

	const {
		name,
		fact,
		rank,
		secondaryRank,
		type = 'Player',
		game = 'valorant',
		roles = [],
		...roleFlags
	}: {
		name: string;
		fact: string;
		rank?: string;
		secondaryRank?: string;
		type?: MemberType;
		game?: string;
		/** Role list, e.g. ['Initiator', 'Controller'] (used by the sheet sync) */
		roles?: string[];
		/** Boolean role flags also work, e.g. <Member Initiator Controller /> */
		[key: string]: unknown;
	} = $props();

	const config = $derived(GAME_ROSTER_CONFIGS[game]);
	const rankExt = $derived(
		(rank && config?.rankExtensions?.[rank]) ?? config?.rankExtension ?? 'webp'
	);
	const formatRank = (r: string) => config?.rankLabels?.[r] ?? r.replace(/_/g, ' ');

	const typeOrder: Record<MemberType, number> = {
		Player: 0,
		Sub: 1,
		Coach: 2,
		AssistantCoach: 3,
		'Assistant Coach': 3,
		Analyst: 4
	};

	const staffLabels: Partial<Record<MemberType, string>> = {
		Coach: 'Coach',
		AssistantCoach: 'Asst. Coach',
		'Assistant Coach': 'Asst. Coach',
		Analyst: 'Analyst'
	};

	const staffLabel = $derived(staffLabels[type]);
	const showRoleIcons = $derived(
		!staffLabel && !config?.dualRanks && Boolean(config?.assetsFolder && config.roles.length > 0)
	);

	const has_role = (role: string) => {
		if (roles.includes(role) || roleFlags[role]) {
			return 'active';
		} else {
			return '';
		}
	};
</script>

<div class="player-card reveal" style="order: {typeOrder[type] ?? 0}">
	<div class="player-photo"></div>
	<div class="player-card-body">
		<div class="player-card-header" class:no-roles={!showRoleIcons}>
			<p class="pc-name">{name}</p>
			{#if staffLabel}
				<p class="pc-rank">{staffLabel}</p>
			{:else if config?.dualRanks}
				{#if rank || secondaryRank}
					<div class="pc-rank" style="flex-wrap: wrap; gap: 6px 14px;">
						{#if rank}
							<span style="display: inline-flex; align-items: center; gap: 6px;">
								<img
									src={`/assets/${config.assetsFolder}/${config.dualRanks.colDFolder}/${rank}_Rank.${rankExt}`}
									alt={`Killer ${rank.replace(/_/g, ' ')}`}
								/>
								{rank.replace(/_/g, ' ')}
							</span>
						{/if}
						{#if secondaryRank}
							<span style="display: inline-flex; align-items: center; gap: 6px;">
								<img
									src={`/assets/${config.assetsFolder}/${config.dualRanks.colEFolder}/${secondaryRank}_Rank.${rankExt}`}
									alt={`Survivor ${secondaryRank.replace(/_/g, ' ')}`}
								/>
								{secondaryRank.replace(/_/g, ' ')}
							</span>
						{/if}
					</div>
				{/if}
			{:else}
				{#if rank}
					<p
						class="pc-rank"
						style={config?.nowrapRank
							? 'white-space: nowrap; letter-spacing: 0.06em;'
							: undefined}
					>
						{#if config?.assetsFolder}
							<img
								src={`/assets/${config.assetsFolder}/Ranks/${rank}_Rank.${rankExt}`}
								alt={formatRank(rank)}
							/>
						{/if}
						{formatRank(rank)}
					</p>
				{/if}
				{#if config?.assetsFolder && config.roles.length > 0}
					<div
						class="pc-roles"
						style={config.roles.length >= 5 ? 'gap: 3px;' : undefined}
					>
						{#each config.roles as role (role)}
							<img
								src={config.rankMatchedRoles
									? `/assets/${config.assetsFolder}/Roles/${rank || 'Gold'}_${role}.${config.roleExtension ?? 'png'}`
									: `/assets/${config.assetsFolder}/Roles/${role}.${config.roleExtension ?? 'png'}`}
								alt={role}
								class={has_role(role)}
								style={config.roleIconSize
									? `width: ${config.roleIconSize}px; height: ${config.roleIconSize}px;`
									: undefined}
							/>
						{/each}
					</div>
				{/if}
			{/if}
		</div>

		<p class="pc-fact">{fact}</p>
	</div>
</div>
