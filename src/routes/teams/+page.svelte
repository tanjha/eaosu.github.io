<script lang="ts">
	import overwatchRoster from '$lib/data/overwatch-roster.json';
	import valorantRoster from '$lib/data/valorant-roster.json';
	import leagueRoster from '$lib/data/league-roster.json';
	import rlRoster from '$lib/data/rl-roster.json';
	import rainbowRoster from '$lib/data/rainbow-roster.json';
	import dbdRoster from '$lib/data/dbd-roster.json';
	import counterstrikeRoster from '$lib/data/counterstrike-roster.json';
	import deadlockRoster from '$lib/data/deadlock-roster.json';
	import rivalsRoster from '$lib/data/rivals-roster.json';

	function formatCoords(coords?: string[]): string {
		if (!coords || coords.length === 0) return '';
		return coords.map((c) => (c.startsWith('@') ? c : `@${c}`)).join(' · ');
	}
</script>

<svelte:head>
	<title>Teams - Esports at Oregon State University</title>
</svelte:head>

<main>
	<div class="section" style="padding-top:80px">
		<div class="wrap">
			<p class="kicker">Rosters</p>
			<h1 class="page-title" style="margin-bottom:40px">Our teams</h1>

			<div class="teams-grid">
				<!-- OVERWATCH -->
				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">OW</div>
							<div>
								<h3>Overwatch</h3>
								<p class="league">NACE Open</p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Varsity · Junior Varisty · Black</span
								>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(overwatchRoster.coordinators)}</span>
							</div>
							<div class="team-row">
								<span class="k">Inhouses</span><span class="v">Sat Biweekly · 5 PM</span>
							</div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/overwatch/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">VAL</div>
							<div>
								<h3>Valorant</h3>
								<p class="league">CVAL</p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v"
									>Black (Varsity) · Orange (JV) · White</span
								>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(valorantRoster.coordinators)}</span>
							</div>
							<div class="team-row">
								<span class="k">Inhouses</span><span class="v">Sat Biweekly · 8:30</span>
							</div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/valorant/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">LoL</div>
							<div>
								<h3>League of Legends</h3>
								<p class="league">Riot Collegiate</p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Varsity · Junior Varisty</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(leagueRoster.coordinators)}</span>
							</div>
							<div class="team-row">
								<span class="k">Inhouses</span><span class="v">3rd Mon Monthly · 7 PM </span>
							</div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/league/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">RL</div>
							<div>
								<h3>Rocket League</h3>
								<p class="league">Collegiate Rocket League</p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Varsity</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(rlRoster.coordinators)}</span>
							</div>
							<div class="team-row"><span class="k">Inhouses</span><span class="v"></span></div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/rl/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">R6</div>
							<div>
								<h3>Rainbow Six Siege</h3>
								<p class="league">Collegiate R6</p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Black · Orange</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(rainbowRoster.coordinators)}</span>
							</div>
							<div class="team-row"><span class="k">Inhouses</span><span class="v"></span></div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/rainbow/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">DBD</div>
							<div>
								<h3>Dead by Daylight</h3>
								<p class="league">Community squad</p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Format</span><span class="v">Varsity · Junior Varsity</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(dbdRoster.coordinators)}</span>
							</div>
							<div class="team-row">
								<span class="k">Inhouses</span><span class="v">4th Thu Monthly · 7 PM</span>
							</div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/dbd/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">CS2</div>
							<div>
								<h3>Counter-Strike 2</h3>
								<p class="league"></p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Orange</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(counterstrikeRoster.coordinators)}</span>
							</div>
							<div class="team-row">
								<span class="k">Inhouses</span><span class="v">3rd Fri Monthly · 6 PM</span>
							</div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/counterstrike/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">DLK</div>
							<div>
								<h3>Deadlock</h3>
								<p class="league"></p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Orange</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(deadlockRoster.coordinators)}</span>
							</div>
							<div class="team-row">
								<span class="k">Inhouses</span><span class="v">Wed Biweekly · 7 PM</span>
							</div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/deadlock/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="team-card-link">
					<div class="team-card reveal">
						<div class="team-top">
							<div class="team-badge">MR</div>
							<div>
								<h3>Marvel Rivals</h3>
								<p class="league"></p>
							</div>
						</div>
						<div class="team-body">
							<div class="team-row">
								<span class="k">Rosters</span><span class="v">Orange</span>
							</div>
							<div class="team-row">
								<span class="k">Lead Discord</span><span class="v">{formatCoords(rivalsRoster.coordinators)}</span>
							</div>
							<div class="team-row"><span class="k">Inhouses</span><span class="v"></span></div>
						</div>
						<div class="team-footer">
							<a class="roster-link" href="/teams/rivals/">
								<div class="team-card-roster">
									<h3>View Roster →</h3>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="tryout-note reveal">
				<div>
					<h3>Tryouts open fall term for collegiate</h3>
					<p>
						Signups go live in the Discord. Watch the announcements channel. No matter the rank or
						skill level, we have a place for you
					</p>
				</div>
				<a class="btn" href="/about">How to join</a>
			</div>
		</div>
	</div>
</main>
