<script lang="ts">
	import Member from '../valorant/member.svelte';
	import Team from '../valorant/team.svelte';
	import rosterData from '$lib/data/counterstrike-roster.json';
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
	<title>Counter Strike - Esports at Oregon State University</title>
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
				<div class="badge-large">CS2</div>
				<div>
					<h1 class="page-title">Counter Strike 2</h1>
				</div>
			</div>
			<Competitions competitions={roster.competitions} />
		</div>
	</div>

	<!-- Info Section -->
	<SectionBlurb paragraphs={roster.blurb} />

	<!-- Player Card Grid -->
	<div class="section player-grid-section">
		<div class="wrap">
			<p class="kicker">Rosters</p>
			<h2>Meet the Players</h2>

			{#each roster.teams as team (team.name)}
				<Team name={team.name}>
					{#each team.members as member, i (i)}
						<Member game="counterstrike" {...member} />
					{/each}
				</Team>
			{/each}
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
