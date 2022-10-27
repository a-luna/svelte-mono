<script lang="ts">
	import { browser } from '$app/environment';
	import Mandala from '$lib/components/Mandala.svelte';
	import {
		DEFAULT_OG_IMAGE,
		MY_TWITTER_HANDLE,
		SITE_DESCRIPTION,
		SITE_TITLE,
		SITE_URL
	} from '$lib/siteConfig';
	import { userRepos } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	$: allRepos = data.allRepos;

	$: if (browser && Object.keys(allRepos).length) $userRepos = allRepos;
</script>

<svelte:head>
	<title>{SITE_TITLE} Full Stack Developer</title>
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

<div class="main-header portfolio">
	<div class="main-header-content mr-auto">
		<p class="subheading"><span>Hello, I'm a full-stack developer from Reno, NV.</span></p>
		<p class="normal-text">
			The projects listed below range from REST APIs and CLI apps on the backend to component
			libraries and web applications on the frontend.
		</p>
		<p class="normal-text">The list is filterable by language/technology used and project type.</p>
		<p class="normal-text"><a href="series/flask-api-tutorial/overview">Flask API Tutorial</a></p>
	</div>
	<Mandala />
</div>

<style lang="postcss">
	.main-header {
		background: var(--page-bg-color);
		display: grid;
		grid-template-columns: 10% 5% repeat(6, 1fr) 5% 10%;
		grid-template-rows: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto;
		width: 100%;
		max-height: 365px;
		margin: 0 auto;
	}
	.main-header-content {
		font-family: 'Roboto Mono', menlo, consolas, monospace;
		margin: 0 auto;
		z-index: 2;
		position: relative;
		grid-column: 2 / span 8;
		grid-row: 1 / span 10;
	}
	.main-header-content h2 span,
	.subheading span {
		color: var(--page-bg-color);
	}

	.subheading {
		background-color: var(--accent-color);
		padding: 0.25rem;
		font-size: 1.2rem;
		margin: 1.5rem 0 0 0;
	}
	.main-header-content .normal-text {
		font-size: 0.9rem;
		margin: 2rem 0 0 0;
	}

	@media (min-width: 640px) {
		.subheading {
			font-size: 1.4rem;
		}
		.main-header-content .normal-text {
			font-size: 1rem;
		}
	}

	@media (min-width: 768px) {
		.main-header-content {
			max-width: 700px;
			grid-column: 3 / span 6;
		}
	}

	@media (min-width: 1024px) {
		.main-header {
			max-height: 450px;
		}
	}
</style>
