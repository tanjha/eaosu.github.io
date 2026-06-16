<svelte:head>
	<title>League - Esports at Oregon State University</title>
	<!-- <meta
		name="description"
		content="Meet the Valorant rosters at Esports at Oregon State University. Black, Orange, and White teams competing in CVAL."
	/> -->
</svelte:head>

<!-- Tryout Banner -->
<div class="tryout-banner">
	<p>
		Next Tryouts — <span class="date-highlight">Fall 2026</span> · Exact Date TBD · Watch Discord Announcements
	</p>
</div>

<main>
	<!-- Detail Hero -->
	<div class="section detail-hero">
		<div class="wrap">
			<a class="back-link" href="/teams">All Teams</a>
			<div class="badge-row">
				<div class="badge-large">LOL</div>
				<div>
					<h1 class="page-title">League of Legends</h1>
				</div>
			</div>
			<h2 class="kicker">Major Competitions:</h2>
			<span class="league-tag">RiB</span>
			<span class="league-tag">Platypus</span>
		</div>
	</div>

	<!-- Info Section -->
	<div class="section info-section">
		<div class="wrap">
			<p>Blurb</p>
		</div>
	</div>

	<!-- Player Card Grid -->
	<div class="section player-grid-section">
		<div class="wrap">
			<p class="kicker">Rosters</p>
			<h2>Meet the Players</h2>

			<!-- BLACK roster cards -->
			<p class="roster-label" style="margin-top: 12px">Black - Varsity</p>
			<div class="player-grid" style="margin-bottom: 48px">
				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Player1</p>
						<p class="pc-rank"><img src="" alt="rank" /> Rank</p>
						<p class="pc-fact">Placeholder fun fact about this player.</p>
					</div>
				</div>
			</div>

			<!-- ORANGE roster cards -->
			<p class="roster-label">Orange - Junior Varsity</p>
			<div class="player-grid" style="margin-bottom: 48px">
				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Player1</p>
						<p class="pc-rank"><img src="" alt="rank" /> Rank</p>
						<p class="pc-fact">Placeholder fun fact about this player.</p>
					</div>
				</div>
			</div>

			<!-- WHITE roster cards -->
			<p class="roster-label">White - Talent Development</p>
			<div class="player-grid" style="margin-bottom: 48px">
				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Player1</p>
						<p class="pc-rank"><img src="" alt="rank" /> Rank</p>
						<p class="pc-fact">Placeholder fun fact about this player.</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom tryout CTA -->
	<div class="section" style="padding-top: 0; padding-bottom: 72px">
		<div class="wrap">
			<div class="tryout-note reveal">
				<div>
					<h3>Want to join?</h3>
					<p>
						Tryouts open fall term. Signups go live in the Discord. No matter the rank or skill
						level, we have a place for you.
					</p>
				</div>
				<a class="btn" href="/about">How to join</a>
			</div>
		</div>
	</div>
</main>
