<script lang="ts">
	import eventsData from '$lib/data/events.json';

	interface TickerItem {
		tickerText: string;
	}

	const fallbackEvents: TickerItem[] = [
		{ tickerText: 'WED 9/30 — Deadlock Inhouses — 7:00 PM' },
		{ tickerText: 'SAT 10/3 - Overwatch Inhouses - 5:00 PM' },
		{ tickerText: 'MON 10/5 - League Inhouses - 7:00 PM' },
		{ tickerText: 'FRI 10/9 - CS2 Inhouses - 6:00 PM' },
		{ tickerText: 'SAT 10/10 - Valorant Inhouses - 8:30 PM' },
		{ tickerText: 'THU 10/15 - DBD Inhouses - 7:00 PM' }
	];

	function buildTickerItems(raw: TickerItem[] | undefined): TickerItem[] {
		const source = raw && raw.length > 0 ? raw : fallbackEvents;
		let repeated = [...source];
		while (repeated.length < 8) {
			repeated = repeated.concat(source);
		}
		return repeated.slice(0, 12);
	}

	const events = buildTickerItems(eventsData?.events);
</script>

<div class="ticker" aria-hidden="true">
	<div class="ticker-track" id="tickerTrack">
		{#each events as item, idx (`first-${idx}-${item.tickerText}`)}
			<span>{item.tickerText}</span>
		{/each}
		{#each events as item, idx (`second-${idx}-${item.tickerText}`)}
			<span>{item.tickerText}</span>
		{/each}
	</div>
</div>
