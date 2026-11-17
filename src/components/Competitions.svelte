<script lang="ts">
	/** Major Competitions tags for a game page (synced from column G/H+ of the sheet) */
	const { competitions = [] }: { competitions?: string[] } = $props();
</script>

{#if competitions.length > 0}
	<h2 class="kicker">Major Competitions:</h2>
	{#each competitions as competition (competition)}
		<span class="league-tag">{competition}</span>
	{/each}
{/if}
