<script lang="ts">
	import { page } from '$app/stores';
	import { SITE_TITLE } from '$lib/siteConfig';

	const offline = typeof navigator !== 'undefined' && navigator.onLine === false;

	let message = offline ? 'Find the internet and try again' : $page.error?.message;

	let title = offline ? 'Offline' : $page.status;
	if ($page.status === 404) {
		title = 'Page not found :(';
		message = 'Sorry! If you think this URL is broken, please let me know!';
	}

	function displayPathname(str: string) {
		return decodeURIComponent(str).replaceAll('-', ' ');
	}
</script>

<svelte:head>
	<title>{title} | {SITE_TITLE}</title>
</svelte:head>

<section class="container prose mx-auto py-12 dark:prose-invert">
	<h1>{$page.status}: {title}</h1>

	{#if $page.status === 404}
		<p class="">There is no post at the slug <code>{$page.url.pathname}</code>.</p>
		<p>
			<a href={'/blog/?filter=' + $page.url.pathname.slice(1)}
				>Try searching for "{displayPathname($page.url.pathname.slice(1))}" here!</a
			>
		</p>
		<p class="">If you believe this was a bug, please let me know!</p>
	{:else}
		<p class="font-mono">{message}</p>
	{/if}
</section>

<style>
	h1,
	p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
