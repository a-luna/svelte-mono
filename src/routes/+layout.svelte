<script lang="ts">
	import Nav from '$lib/components/Nav/Nav.svelte';
	import ScrollToTopButton from '$lib/components/Nav/ScrollToTopButton.svelte';
	import { SITE_TITLE } from '$lib/siteConfig';
	import { getBodyIsScrollable } from '$lib/stores';
	import { getScrollbarWidth } from '$lib/util';
	import type { Writable } from 'svelte/store';
	import '../tailwind.css';

	export const prerender = true;
	let bodyIsScrollable: Writable<boolean>;

	$: if (typeof window !== 'undefined') bodyIsScrollable = getBodyIsScrollable();
	$: scrollBarWidth = getScrollbarWidth();
	$: if (bodyIsScrollable && $bodyIsScrollable) {
		document.body.style.paddingRight = '0px';
	} else if (bodyIsScrollable && scrollBarWidth) {
		document.body.style.paddingRight = `${scrollBarWidth}px`;
	}
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={'RSS Feed for ' + SITE_TITLE}
		href="/rss.xml"
	/>
</svelte:head>

<div id="top" class="header-wrapper">
	<Nav />
</div>
<main>
	<slot />
	<ScrollToTopButton />
</main>

<style lang="postcss">
	.header-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		background-color: hsla(0 0% 0% / 0);
		max-width: 700px;
		margin: 0 auto;
	}
	main {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}
</style>
