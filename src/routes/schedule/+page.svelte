<script lang="ts">
	import eventsData from '$lib/data/events.json';

	interface EventItem {
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
		discordUrl?: string;
	}

	let activeFilter = $state('all');

	const filters = [
		{ id: 'all', label: 'All' },
		{ id: 'ow', label: 'Overwatch' },
		{ id: 'val', label: 'Valorant' },
		{ id: 'lol', label: 'League' },
		{ id: 'rl', label: 'Rocket League' },
		{ id: 'r6', label: 'R6 Siege' },
		{ id: 'dbd', label: 'DBD' },
		{ id: 'cs', label: 'CS2' },
		{ id: 'dlk', label: 'DLK' },
		{ id: 'mr', label: 'Rivals' },
		{ id: 'comm', label: 'Community' }
	];

	// Filter events based on active category
	let filteredEvents = $derived(
		((eventsData?.events || []) as EventItem[]).filter((e) => {
			if (activeFilter === 'all') return true;
			if (activeFilter === 'comm') return e.isCommunity || e.gameCode === 'comm';
			return e.gameCode === activeFilter;
		})
	);

	// Group filtered events by weekLabel preserving chronological order
	let groupedWeeks = $derived.by(() => {
		const groups: Array<{ weekLabel: string; events: EventItem[] }> = [];
		for (const event of filteredEvents) {
			let group = groups.find((g) => g.weekLabel === event.weekLabel);
			if (!group) {
				group = { weekLabel: event.weekLabel, events: [] };
				groups.push(group);
			}
			group.events.push(event);
		}
		return groups;
	});
</script>

<svelte:head>
	<title>Schedule &amp; Events - Esports at Oregon State University</title>
	<meta
		name="description"
		content="Upcoming matches, tournaments, and community inhouses for Esports at Oregon State University."
	/>
</svelte:head>

<main>
	<div class="section" style="padding-top: 80px">
		<div class="wrap">
			<p class="kicker">Schedule</p>
			<h1 class="page-title" style="margin-bottom: 40px">Events &amp; matches</h1>

			<div class="filters" role="group" aria-label="Filter events by game">
				{#each filters as f (f.id)}
					<button
						class="filter {activeFilter === f.id ? 'on' : ''}"
						onclick={() => (activeFilter = f.id)}
					>
						{f.label}
					</button>
				{/each}
			</div>

			{#if groupedWeeks.length === 0}
				<div class="empty-schedule">
					<p>No upcoming events currently scheduled for this category.</p>
					<a
						class="btn btn-ghost"
						href="https://discord.gg/eaosu"
						target="_blank"
						rel="noopener noreferrer"
					>
						Join our Discord for announcements
					</a>
				</div>
			{:else}
				{#each groupedWeeks as week (week.weekLabel)}
					<p class="week-label">{week.weekLabel}</p>
					{#each week.events as match (match.id)}
						<div class="match {match.isCommunity ? 'community' : ''}" data-game={match.gameCode}>
							<div class="date">{match.dateDay}<small>{match.dateMonth}</small></div>
							<div class="game-tag">{match.gameName}</div>
							<div class="detail">
								<p class="vs">{match.name}</p>
								{#if match.description}
									<p class="sub">{match.description}</p>
								{/if}
							</div>
							<div class="time">
								<b>{match.timeFormatted}</b>
								<span>{match.location}</span>
							</div>
						</div>
					{/each}
				{/each}
			{/if}
		</div>
	</div>
</main>
