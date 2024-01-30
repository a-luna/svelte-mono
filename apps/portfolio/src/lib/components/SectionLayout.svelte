<script lang="ts">
	import PageTransition from '$lib/components/PageTransition.svelte';
	import SectionName from '$lib/components/SectionName.svelte';
	import { SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import { sectionTransition } from '$lib/stores';
	import type { SiteSection } from '$lib/types';
	import { capitalize } from '$lib/util';

	export let section: SiteSection;
	export let title = capitalize(section);
	export let pageTitle = `${title} | ${SITE_TITLE}`;
	let showContent = false;

	$: if ($sectionTransition.inProgress) {
		showContent = false;
	}
	$: if ($sectionTransition.toComplete) {
		showContent = true;
	}
</script>

<svelte:head>
	<title>{title} | {SITE_TITLE}</title>
	<link rel="canonical" href={`${SITE_URL}/${section}`} />
	<meta property="og:title" content={pageTitle} />
</svelte:head>

<div class="section {section}">
	<SectionName {title} />
	{#if showContent}
		<PageTransition>
			<slot />
		</PageTransition>
	{/if}
</div>

<style lang="postcss">
	.section {
		padding: var(--mobile-page-padding);
		max-width: var(--max-width);
		margin: 0 auto;
		width: 100%;
	}
	@media (min-width: 768px) {
		.section {
			padding: 0 0 3rem 0;
		}
	}
</style>
