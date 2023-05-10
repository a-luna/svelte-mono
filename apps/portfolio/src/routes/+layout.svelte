<script lang="ts">
	import { dev } from '$app/environment';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import NavSideBar from '$lib/components/Nav/NavSideBar.svelte';
	import ScrollToTopButton from '$lib/components/Nav/ScrollToTopButton.svelte';
	import { SITE_TITLE, THEME_COLOR } from '$lib/siteConfig';
	import { getPageHeight, getPageWidth, initialFadePerformed, mobileDisplay, mobileNavOpen } from '$lib/stores';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import '../tailwind.css';

	let pageHeight: Writable<number>;
	let pageWidth: Writable<number>;
	let windowHeight: number;
	let scrollY: number;
	let showScrollToTopButton: boolean;
	let pageHeightInitialized = false;

	$: if ($initialFadePerformed && !pageHeightInitialized) {
		let result = getPageWidth();
		if (result.success) {
			pageWidth = result.value;
		}
		result = getPageHeight();
		pageHeightInitialized = result.success;
		if (result.success) {
			pageHeight = result.value;
		}
	}
	$: fadeInDelay = $initialFadePerformed ? 450 : 0;
	$: if (typeof window !== 'undefined') {
		showScrollToTopButton = $pageHeight > windowHeight && scrollY > 0;
		$mobileDisplay = $pageWidth < 760;
	}
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

<div id="svelte">
	{#if !$mobileNavOpen}
		<div in:fade={{ delay: fadeInDelay, duration: 400 }} out:fade={{ duration: 300 }} id="top" class="header-wrapper">
			<Nav />
		</div>
		<main in:fade={{ delay: fadeInDelay, duration: 400 }} out:fade={{ duration: 300 }}>
			<slot />
			{#if showScrollToTopButton}
				<ScrollToTopButton />
			{/if}
		</main>
	{:else}
		<NavSideBar pageWidth={$pageWidth} />
	{/if}
</div>

<style lang="postcss">
	.header-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		background-color: var(--page-bg-color);
		width: 100%;
		height: 87px;
	}
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.header-wrapper {
			height: 95px;
		}
	}
</style>
