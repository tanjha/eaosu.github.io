<script lang="ts">
	const {
		name,
		fact,
		rank,
		...roles
	}: { name: string; fact: string; rank?: string; [key: string]: unknown } = $props();

	const has_role = (role: string) => {
		if (roles[role]) {
			return 'active';
		} else {
			return '';
		}
	};
</script>

<div class="player-card reveal">
	<div class="player-photo"></div>
	<div class="player-card-body">
		<p class="pc-name">{name}</p>
		{#if rank}
			<p class="pc-rank">
				<img
					src={'/assets/ValorantImages/Ranks/' + rank + '_Rank.webp'}
					alt={rank.replace('_', ' ')}
				/>
				{rank.replace('_', ' ')}
			</p>
		{/if}
		{#if roles}
			<div class="pc-roles">
				<img
					src="/assets/ValorantImages/Roles/Duelist.png"
					alt="Duelist"
					class={has_role('Duelist')}
				/>
				<img
					src="/assets/ValorantImages/Roles/Initiator.png"
					alt="Initiator"
					class={has_role('Initiator')}
				/>
				<img
					src="/assets/ValorantImages/Roles/Controller.png"
					alt="Controller"
					class={has_role('Controller')}
				/>
				<img
					src="/assets/ValorantImages/Roles/Sentinel.png"
					alt="Sentinel"
					class={has_role('Sentinel')}
				/>
			</div>
		{/if}

		<p class="pc-fact">{fact}</p>
	</div>
</div>
