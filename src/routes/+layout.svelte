<script lang="ts">
	import '../app.css';
	import '../styles.css';
	import favicon from '$lib/assets/EAOSULOGO.png';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	// Scroll reveals
	afterNavigate(() => {
		const items = document.querySelectorAll('.reveal');
		if (!items.length) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add('in');
						observer.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12 }
		);
		items.forEach((el) => observer.observe(el));
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Esports at Oregon State University</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,700;0,800;0,900;1,800;1,900&family=Chakra+Petch:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header></Header>
{@render children?.()}
<Footer></Footer>
