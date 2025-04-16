<script lang="ts">
	import PageTransition from '$lib/components/PageTransition.svelte';
	import SectionName from '$lib/components/SectionName.svelte';
	import { SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import { sectionTransition } from '$lib/stores';
	import type { SiteSection } from '$lib/types';
	import { capitalize } from '@a-luna/shared-ui/util';

	export let section: SiteSection;
	export let title = capitalize(section);
	export let pageTitle = `${title} | ${SITE_TITLE}`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="canonical" href={`${SITE_URL}/${section}`} />
	<meta property="og:title" content={pageTitle} />
</svelte:head>

<div class="section {section}">
	<div class="section-wrapper">
		<SectionName {title} />
		{#if $sectionTransition.showContent}
			<PageTransition>
				<slot />
			</PageTransition>
		{/if}
	</div>
	<!-- {#if showContent && section === 'home'}
		<div in:fade={{ delay: 500, duration: 2500 }} class="mandala-wrapper">
			<Mandala />
		</div>
	{/if} -->
</div>

<style lang="postcss">
	.section {
		padding: var(--mobile-page-padding);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 100%;
		margin: 0 auto;
	}
	.section.home {
		max-width: none;
	}
	.section-wrapper {
		margin: 0 auto;
		position: relative;
		max-width: var(--max-width);
		grid-column: 1;
		grid-row: 1;
		padding: 0;
		width: 100%;
		z-index: 2;
	}
	.mandala-wrapper {
		height: 775px;
		overflow: hidden;
		transition: all 1s ease-in-out;
		width: 100%;
		z-index: 1;
		grid-column: 1;
		grid-row: 1;
	}
	@media (min-width: 768px) {
		.section {
			padding: 0 0 3rem 0;
		}
	}
</style>
