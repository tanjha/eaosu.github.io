<script lang="ts">
	import type { Snippet } from 'svelte';

	const { name, children }: { name: string; children?: Snippet } = $props();
</script>

<p class="roster-label">{name}</p>
<div class="player-grid" style="margin-bottom:48px">
	{@render children?.()}
</div>
