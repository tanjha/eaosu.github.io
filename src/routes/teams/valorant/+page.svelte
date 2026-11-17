<script lang="ts">
	import Member from './member.svelte';
	import Team from './team.svelte';
	import rosterData from '$lib/data/valorant-roster.json';
	import Competitions from '../../../components/Competitions.svelte';
	import SectionBlurb from '../../../components/SectionBlurb.svelte';
	import type { ComponentProps } from 'svelte';

	type MemberProps = ComponentProps<typeof Member>;
	const roster = rosterData as {
		competitions?: string[];
		blurb?: string[];
		teams: { name: string; members: MemberProps[] }[];
	};
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
		Next Tryouts: <span class="date-highlight">September 27, 2026 — 7:30 P.M.</span> — <a
			href="https://forms.gle/6gF2K9r39qTBag9C7"
			target="_blank"
			rel="noopener noreferrer"
			style="text-decoration: underline;">Tryout Application Form</a
		> — <a href="#tryout-info" style="text-decoration: underline;">More Information</a>
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
			<Competitions competitions={roster.competitions} />
		</div>
	</div>

	<!-- Info Section -->
	<SectionBlurb paragraphs={roster.blurb} />
	<div id="tryout-info" class="section player-grid-section">
		<div class="wrap">
			<p class="kicker">Tryouts</p>
			<h2>Tryout Information</h2>
		</div>
	</div>
	<div class="section info-section">
		<div class="wrap">
			<p>Hey, everyone! It's the time you've all been waiting for!</p>
			<p>
				Valorant Tryouts will be on September 27, followed by interviews from the 28th until
				October 2
			</p>
			<p>
				Tryouts will be held in two phases, gameplay and interview. The Gameplay Phase will be a 5v5
				Trial on September 27th at 7:30 p.m. In the next phase, you will have an interview during
				the following week (Sep 28-Oct 2).
			</p>
			<p>
				Please make sure to have downloaded and set up: Valorant, OBS (or another recording
				software), and Discord before the 27th.
			</p>
			<p>
				You MUST fill out this form to participate: <a
					href="https://forms.gle/6gF2K9r39qTBag9C7"
					target="_blank"
					rel="noopener noreferrer"
					style="text-decoration: underline;">Tryout Application Form</a
				>
			</p>
			<p>
				As always with Valorant-Related Events, direct any questions towards your Valorant Game
				Coordinator (info above)
			</p>
			<p>Looking forward to seeing you there!</p>
		</div>
	</div>

	<!-- Player Card Grid -->
	<div class="section player-grid-section">
		<div class="wrap">
			<p class="kicker">Rosters</p>
			<h2>Meet the Teams</h2>

			<!-- Rosters are synced from the Google Sheet at build time (scripts/sync-game-rosters.ts) -->
			{#each roster.teams as team (team.name)}
				<Team name={team.name}>
					{#each team.members as member, i (i)}
						<Member {...member} />
					{/each}
				</Team>
			{/each}
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
