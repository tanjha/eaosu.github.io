<script lang="ts">
	/** Section blurb paragraphs for a game page (each sheet cell under "Section Blurb" is one paragraph) */
	const { paragraphs = [] }: { paragraphs?: string[] } = $props();
</script>

{#if paragraphs.length > 0}
	<div class="section info-section">
		<div class="wrap">
			{#each paragraphs as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
		</div>
	</div>
{/if}

