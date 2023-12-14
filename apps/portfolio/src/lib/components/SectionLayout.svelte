<script lang="ts">
	import { SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import type { SiteSection } from '$lib/types';
	import { capitalize } from '$lib/util';

	export let section: SiteSection;
	export let title = capitalize(section);
	export let pageTitle = `${title} | ${SITE_TITLE}`;
</script>

<svelte:head>
	<title>{title} | {SITE_TITLE}</title>
	<link rel="canonical" href={`${SITE_URL}/${section}`} />
	<meta property="og:title" content={pageTitle} />
</svelte:head>

<div class="section {section}">
	<div class="section-outer">
		<h1 class="section-header">{title}</h1>
		<slot />
	</div>
</div>

<style lang="postcss">
	.section-outer {
		z-index: 3;
		width: 100%;
	}

	.section {
		padding: var(--mobile-page-padding);
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.section-header {
		font-family: 'Roboto Mono', menlo, consolas, monospace;
		font-size: 1.7rem;
		line-height: 1.5;
		color: var(--page-bg-color);
		background-color: var(--accent-color);
		padding: 0.25rem 0.5rem;
		font-weight: 500;
		width: 100%;
		margin: 0 0 2rem 0;
	}

	@media (min-width: 640px) {
		.section-header {
			font-size: 2rem;
		}
	}

	@media (min-width: 768px) {
		.section {
			padding: 0 0 3rem 0;
		}
		.section-header,
		.home .section-header {
			margin: 1rem 0 2.5rem 0;
		}
	}
</style>
