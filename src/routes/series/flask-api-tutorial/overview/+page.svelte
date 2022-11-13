<script lang="ts">
	import { browser } from '$app/environment';
	import CoverImage from '$lib/components/ApiTutorial/CoverImage.svelte';
	import SectionSummary from '$lib/components/ApiTutorial/SectionSummary.svelte';
	import { SITE_TITLE } from '$lib/siteConfig';
	import { tutorialSections } from '$lib/stores';
	import type { BlogResource, TutorialSection } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let list: TutorialSection[];

	const coverImage: BlogResource = {
		name: 'cover',
		src: '',
		caption: 'Photo by Matt Howard on Unsplash'
	};

	$: allTutorialSections = data.allTutorialSections;

	$: if (browser && Object.keys(allTutorialSections).length) $tutorialSections = allTutorialSections;
	$: if (tutorialSections && $tutorialSections.length)
		list = $tutorialSections.sort((a, b) => (a?.series_weight ?? 0) - (b?.series_weight ?? 0));
</script>

<svelte:head>
	<title>{SITE_TITLE} Flask API Tutorial Overview</title>
	<meta name="description" content={`Flask API Tutorial Overview`} />
</svelte:head>

<section class="article-list">
	<h1>How To: Create a Flask API with JWT-Based Authentication</h1>
	<CoverImage slug={'part-0'} caption={coverImage?.caption ?? ''} />
	<p>
		This tutorial series provides step-by-step instructions and in-depth explanations to guide you through the process
		of creating a robust, production-quality REST API. The toolstack consists of Flask, Flask-RESTx, SQLAlchemy, pyjwt,
		tox and other packages. Code quality is a major focus, with considerable time dedicated to testing (using pytest),
		logging and tools such as coverage, flake8 and mypy. The tutorial concludes by creating a process that continuously
		integrates (with tox, travis/circle CI, coveralls) and deploys the API (with either Github or Azure DevOps to
		Heroku).
	</p>
	<h3>All Sections</h3>
	{#if list.length}
		<ul data-sveltekit-prefetch>
			{#each list as item}
				<li>
					<SectionSummary section={item} />
				</li>
			{/each}
		</ul>
	{:else}
		<div class="prose dark:prose-invert">No tutorial sections found!</div>
	{/if}
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-flow: column nowrap;
		padding: 0 1rem;
		margin: 1rem auto 4rem auto;
		justify-content: center;
		align-items: flex-start;
		max-width: 42rem;
	}
	h1 {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--post-title-text-color);
		-webkit-text-fill-color: var(--post-title-text-color);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: var(--post-title-text-stroke);
		line-height: 1.3;
		/* text-shadow: 2px 2px var(--post-title-text-shadow-color),
			1.75px 1.75px var(--post-title-text-shadow-color),
			1.5px 1.5px var(--post-title-text-shadow-color),
			1.25px 1.25px var(--post-title-text-shadow-color), 1px 1px var(--post-title-text-shadow-color),
			0.75px 0.75px var(--post-title-text-shadow-color),
			0.5px 0.5px var(--post-title-text-shadow-color),
			0.25px 0.25px var(--post-title-text-shadow-color); */
	}
	p {
		font-size: 1.1rem;
		line-height: 1.5;
	}
	h3 {
		color: var(--body-text);
		margin: 2rem 0 1rem 0;
		font-size: 1.7rem;
		line-height: 2rem;
		font-weight: 500;
		letter-spacing: -0.025em;
	}
	ul {
		list-style: none;
	}
	li {
		margin: 0 0 2rem 0;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	@media (min-width: 640px) {
		section {
			padding: 0 2rem;
		}
		h1 {
			font-size: 2.25rem;
		}
	}

	@media (min-width: 768px) {
		h3 {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}
	}
</style>
