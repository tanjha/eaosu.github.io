<script lang="ts">
	import { page } from '$app/stores';
	import icon from '$lib/assets/EAOSULOGO.png';

	const is_active = (link: string) => {
		const current = $page.url.pathname;
		if (link === current) {
			return 'active';
		} else {
			return '';
		}
	};
</script>

{#snippet header_link(link: string, title: string)}
	<a href={link} class={is_active(link)}>{title}</a>
{/snippet}

<header>
	<div class="wrap nav">
		<a class="brand" href="/">
			<img class="brand-mark" src={icon} alt="Esports at Oregon State University logo" />
			<span class="brand-name">Esports<small>at Oregon State</small></span>
		</a>
		<nav class="menu" aria-label="Main">
			{@render header_link('/', 'Home')}
			{@render header_link('/about', 'About')}
			{@render header_link('/schedule', 'Events')}
			{@render header_link('/teams', 'Teams')}
		</nav>
	</div>
</header>
