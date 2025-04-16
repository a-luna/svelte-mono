<script lang="ts">
	import { dev } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import ScrollToTopButton from '$lib/components/Nav/ScrollToTopButton.svelte';
	import { defaultAppState } from '$lib/constants';
	import { SITE_TITLE, THEME_COLOR } from '$lib/siteConfig';
	import { initAppContext, isInitialPageLoad, mobileNavOpen, sectionTransition } from '$lib/stores';
	import { isTransitionSection } from '$lib/typeguards';
	import type { AppStore } from '$lib/types';
	import { readable, writable, type Readable } from 'svelte/store';
	import '../tailwind.css';

	let y: number;
	let scrollY = writable(0);
	let windowInnerHeight = 0;
	let viewportHeight = writable(0);
	let state: Readable<AppStore> = readable(defaultAppState);

	beforeNavigate(({ from, to }) => {
		$isInitialPageLoad = false;
		const [fromRoute, toRoute] = [from?.route.id ?? '', to?.route.id ?? ''];
		if (isTransitionSection(toRoute) && fromRoute !== toRoute) {
			$sectionTransition = {
				inProgress: false,
				showContent: false,
				from: isTransitionSection(fromRoute) ? fromRoute : '',
				fromComplete: !isTransitionSection(fromRoute),
				to: toRoute,
				toComplete: false,
			};
		}
		if ($mobileNavOpen) $mobileNavOpen = false;
	});

	$: scrollY.set(y);
	$: viewportHeight.set(windowInnerHeight);
	$: if (typeof window !== 'undefined' && !$state.initialized) state = initAppContext(scrollY, viewportHeight);
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={windowInnerHeight} />

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
			src="https://aluna-umami.netlify.app/script.js"
			data-website-id="e1f22fd4-5482-4696-8f11-85c2b5cb8241"
		></script>
	{/if}
</svelte:head>

<div id="svelte" class:mobile-nav-open={$mobileNavOpen}>
	<Nav />
	<main>
		<slot />
	</main>
	{#if $state.showScrollToTopButton}
		<ScrollToTopButton />
	{/if}
</div>

<style lang="postcss">
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}
</style>
