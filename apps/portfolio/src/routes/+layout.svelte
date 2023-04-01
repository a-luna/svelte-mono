<script lang="ts">
	import { dev } from '$app/environment';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import ScrollToTopButton from '$lib/components/Nav/ScrollToTopButton.svelte';
	import { SITE_TITLE, THEME_COLOR } from '$lib/siteConfig';
	import { getPageHeight } from '$lib/stores';
	import type { Writable } from 'svelte/store';
	import '../tailwind.css';

	let pageHeight: Writable<number>;
	let windowHeight: number;
	let scrollY: number;
	let showScrollToTopButton: boolean;
	// let userReposInitialized = false;

	$: if (typeof window !== 'undefined') {
		const result = getPageHeight();
		if (result.success) {
			pageHeight = result.value;
		}
	}
	$: if (typeof window !== 'undefined') showScrollToTopButton = $pageHeight > windowHeight && scrollY > 0;
	// $: if (!userReposInitialized) userReposInitialized = initializeUserRepos();
</script>

<svelte:window bind:innerHeight={windowHeight} bind:scrollY />

<svelte:head>
	<link rel="icon" href="/favicon.ico?v=1.1" sizes="any" />
	<link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.1" />
	<link rel="manifest" href="/site.webmanifest?v=1.1" />
	<meta name="apple-mobile-web-app-title" content="aaronluna.dev" />
	<meta name="application-name" content="aaronluna.dev" />
	<meta name="theme-color" content={THEME_COLOR} />
	<link rel="alternate" type="application/rss+xml" title={'RSS Feed for ' + SITE_TITLE} href="/rss.xml" />
	{#if !dev}
		<script
			async
			defer
			data-website-id="a0c0f9c7-cb88-4e9b-ad30-be3c8b0c9571"
			src="https://aluna-umami.netlify.app/umami.js"
		></script>
	{/if}
</svelte:head>

<div id="top" class="header-wrapper">
	<Nav />
</div>
<main>
	<slot />
	{#if showScrollToTopButton}
		<ScrollToTopButton />
	{/if}
</main>

<style lang="postcss">
	.header-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		background-color: var(--page-bg-color);
		width: 100%;
	}
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}
</style>
