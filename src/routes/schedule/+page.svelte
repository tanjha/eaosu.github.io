<script>
	import { afterNavigate } from '$app/navigation';

	// Event filters (events page only)
	afterNavigate(() => {
		const filters = document.querySelectorAll('.filter');
		if (!filters.length) return;
		filters.forEach((btn) => {
			btn.addEventListener('click', () => {
				filters.forEach((b) => b.classList.remove('on'));
				btn.classList.add('on');
				const f = btn.dataset.filter;
				document.querySelectorAll('.match').forEach((m) => {
					m.style.display = f === 'all' || m.dataset.game.split(' ').includes(f) ? '' : 'none';
				});
				// Hide week labels with no visible matches
				document.querySelectorAll('.week-label').forEach((label) => {
					let el = label.nextElementSibling,
						any = false;
					while (el && el.classList.contains('match')) {
						if (el.style.display !== 'none') any = true;
						el = el.nextElementSibling;
					}
					label.style.display = any ? '' : 'none';
				});
			});
		});
	});
</script>

<main>
	<div class="section" style="padding-top: 80px">
		<div class="wrap">
			<p class="kicker">Schedule</p>
			<h1 class="page-title" style="margin-bottom: 40px">Events &amp; matches</h1>

			<div class="filters" role="group" aria-label="Filter events by game">
				<button class="on filter" data-filter="all">All</button>
				<button class="filter" data-filter="ow">Overwatch</button>
				<button class="filter" data-filter="val">Valorant</button>
				<button class="filter" data-filter="lol">League</button>
				<button class="filter" data-filter="rl">Rocket League</button>
				<button class="filter" data-filter="r6">R6 Siege</button>
				<button class="filter" data-filter="dbd">DBD</button>
				<button class="filter" data-filter="cs">CS2</button>
				<button class="filter" data-filter="dlk">DLK</button>
				<button class="filter" data-filter="comm">Community</button>
			</div>

			<!--
        USE class="match" for official events then class="match community" for club events
        MATCH data-game to game or comm for community
        ADD details - major in "vs" and minor in "sub" then time and location on the right
        -->
			<p class="week-label">Week of June 8</p>
			<div class="match community" data-game="dlk">
				<div class="date">Wed 10<small>June</small></div>
				<div class="game-tag">Deadlock</div>
				<div class="detail">
					<p class="vs">Deadlock Inhouses</p>
					<p class="sub"></p>
				</div>
				<div class="time"><b>7:00 PM</b>Discord · Event Voice 1</div>
			</div>
		</div>
	</div>
</main>
