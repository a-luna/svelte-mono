<script lang="ts">
	import { browser } from '$app/env';
	import Mandala from '$components/Mandala.svelte';
	import ProjectList from '$lib/components/ProjectList/ProjectList.svelte';
	import {
		DEFAULT_OG_IMAGE,
		MY_TWITTER_HANDLE,
		SITE_DESCRIPTION,
		SITE_TITLE,
		SITE_URL
	} from '$lib/siteConfig';
	import { userRepos } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;
	$: allRepos = data.allRepos;

	$: if (browser && Object.keys(allRepos).length) $userRepos = allRepos;
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<link rel="canonical" href={SITE_URL} />
	<link rel="alternate" type="application/rss+xml" href={SITE_URL + '/api/rss.xml'} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<div class="main-header">
	<div class="main-header-content mr-auto px-4 sm:px-8" />
	<Mandala />
</div>

<h2>// My_Projects</h2>
<ProjectList />

<style lang="postcss">
	.main-header {
		background: var(--page-bg-color);
		display: grid;
		grid-template-columns: auto 1fr auto 1fr auto repeat(5, 1fr);
		grid-template-rows: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto;
		width: 100%;
		max-height: 365px;
		margin: 0 auto;
	}
	.main-header-content {
		padding-top: 0;
		z-index: 2;
		position: relative;
		grid-column: 1 / span 10;
		grid-row: 1 / span 10;
	}
	h2 {
		color: var(--gray-shade4);
		font-family: 'Roboto Mono', menlo, consolas, monospace;
		font-size: 2em;
		margin: 0 0 2.5rem 0;
	}

	@media (min-width: 640px) {
		h2 {
			font-size: 3em;
		}
	}

	@media (min-width: 1024px) {
		.main-header {
			max-height: 450px;
		}
	}
</style>
