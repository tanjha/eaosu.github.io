<script>
	import Player from './player.svelte';
</script>

<svelte:head>
	<title>Valorant - Esports at Oregon State University</title>
	<meta
		name="description"
		content="Meet the Valorant rosters at Esports at Oregon State University. Black, Orange, and White teams competing in CVAL."
	/>
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
				<div class="badge-large">VAL</div>
				<div>
					<h1 class="page-title">Valorant</h1>
				</div>
			</div>
			<h2 class="kicker">Major Competitions:</h2>
			<span class="league-tag">CVAL</span>
			<span class="league-tag">CECC</span>
			<span class="league-tag">RiB</span>
			<span class="league-tag">Platypus</span>
		</div>
	</div>

	<!-- Info Section -->
	<div class="section info-section">
		<div class="wrap">
			<p>
				The Valorant program at Esports at Oregon State fields three rosters — Black (Varsity),
				Orange (JV), and White — competing in CVAL and regional collegiate events. Practices run
				throughout the week with team-specific schedules, and biweekly inhouses on Saturdays at 8:30
				PM give the broader community a chance to play with the comp players.
			</p>
			<p>
				Whether you're an Immortal-ranked grinder or someone looking to break into organized play
				for the first time, we have a spot for you. Tryouts open at the start of each fall term —
				keep an eye on the Discord announcements channel for signups and details.
			</p>
			<p>
				Send any questions to your handsome and impressive Valorant Game Coordinator: @teamkyr on
				discord
			</p>
		</div>
	</div>

	<!-- Player Card Grid -->
	<div class="section player-grid-section">
		<div class="wrap">
			<p class="kicker">Rosters</p>
			<h2>Meet the Players</h2>

			<!-- BLACK roster cards -->
			<p class="roster-label" style="margin-top:12px">Black - Varsity</p>
			<div class="player-grid" style="margin-bottom:48px">
				<Player
					name="Marine"
					rank="Immortal_2"
					fact="Highest HS% in Run it Back 2025"
					Initiator
					Controller
				></Player>

				<Player
					rank="Immortal_2"
					name="B0SSCK"
					fact="Started on the Club Team. W Streamer"
					Duelist
					Controller
				/>
				<Player
					rank="Immortal_3"
					name="Vize"
					fact="It sounds like the agent but with a Z. Shotguns are W"
					Duelist
					Initiator
					Controller
					Sentinel
				/>
				<Player rank="Ascendant_3" name="Sae" fact="Refuses to play ranked" Initiator Sentinel />
				<Player
					rank="Immortal_2"
					name="Peptic"
					fact="This is his first year at OSU"
					Initiator
					Sentinel
				/>
				<Player rank="Immortal_2" name="Jin" fact="The Backup." Duelist Initiator />

				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Zexsonn</p>
						<p class="pc-rank">Coach</p>
						<p class="pc-fact">Hit Immortal in Episode 1</p>
					</div>
				</div>
			</div>

			<!-- ORANGE roster cards -->
			<p class="roster-label">Orange - Junior Varsity</p>
			<div class="player-grid" style="margin-bottom:48px">
				<Player rank="Immortal_2" name="Proven" fact="Proved" Initiator Controller />
				<Player
					rank="Ascendant_3"
					name="Aether"
					fact="Twitch.tv/aetherval. be there or be square"
					Duelist
					Controller
				/>
				<Player rank="Platinum_2" name="Froggeli" fact="&quot;heh..&quot;" Initiator Sentinel />
				<Player rank="Platinum_2" name="tensi0n" fact="Great aim no brain" Sentinel />
				<Player
					rank="Immortal_3"
					name="Hanzz"
					fact="Definitely never queued comp and delayed an official..."
					Initiator
				/>
				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Lyler</p>
						<p class="pc-rank">Coach</p>
						<p class="pc-fact">Prepare for trouble...</p>
					</div>
				</div>

				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Uta</p>
						<p class="pc-rank">Asst. Coach</p>
						<p class="pc-fact">Also goes by Gulpin (like the Pokémon)</p>
					</div>
				</div>
			</div>

			<!-- WHITE roster cards -->
			<p class="roster-label">White - Talent Development</p>
			<div class="player-grid" style="margin-bottom:48px">
				<Player rank="Diamond_3" name="Kyurem" fact="He's so cool" Initiator Controller />
				<Player rank="Ascendant_3" name="Ducky" fact="NOT a Brim one trick" Controller />
				<Player
					rank="Platinum_1"
					name="Serenity"
					fact="Pavlov-ing my teammates, one flash at a time"
					Initiator
					Controller
				/>
				<Player rank="Platinum_2" name="himm" fact="Peep the name." Controller Sentinel />
				<Player rank="Gold_1" name="Milkyways" fact="top frag?" Duelist />
				<Player rank="Silver_3" name="Snowblizzard" fact="65 wouldn't fit on the card" Duelist />
				<Player rank="Immortal_1" name="JPR" fact="Don't search up the premier team..." Initiator />

				<div class="player-card reveal">
					<div class="player-photo"></div>
					<div class="player-card-body">
						<p class="pc-name">Lyler</p>
						<p class="pc-rank">Coach</p>
						<p class="pc-fact">And make it double!</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom tryout CTA -->
	<div class="section" style="padding-top:0;padding-bottom:72px">
		<div class="wrap">
			<div class="tryout-note reveal">
				<div>
					<h3>Want to join the Val squad?</h3>
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
