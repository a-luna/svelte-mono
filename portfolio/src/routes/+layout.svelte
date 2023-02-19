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
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color={THEME_COLOR} />
	<meta name="msapplication-TileColor" content={THEME_COLOR} />
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
		background-color: hsla(0 0% 0% / 0);
		width: 100%;
	}
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}
</style>
