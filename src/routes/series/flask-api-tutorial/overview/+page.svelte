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

	$: if (browser && Object.keys(allTutorialSections).length)
		$tutorialSections = allTutorialSections;
	$: if (tutorialSections && $tutorialSections.length)
		list = $tutorialSections.sort((a, b) => a.series_weight - b.series_weight);
</script>

<svelte:head>
	<title>{SITE_TITLE} Flask API Tutorial Overview</title>
	<meta name="description" content={`Flask API Tutorial Overview`} />
</svelte:head>

<section class="article-list">
	<h1>How To: Create a Flask API with JWT-Based Authentication</h1>
	<CoverImage slug={'part-0'} caption={coverImage?.caption ?? ''} />
	<p>
		This tutorial series provides step-by-step instructions and in-depth explanations to guide you
		through the process of creating a robust, production-quality REST API. The toolstack consists of
		Flask, Flask-RESTx, SQLAlchemy, pyjwt, tox and other packages. Code quality is a major focus,
		with considerable time dedicated to testing (using pytest), logging and tools such as coverage,
		flake8 and mypy. The tutorial concludes by creating a process that continuously integrates (with
		tox, travis/circle CI, coveralls) and deploys the API (with either Github or Azure DevOps to
		Heroku).
	</p>
	<h3>All Sections</h3>
	{#if list.length}
		<ul class="">
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
		margin: 0 0 1rem 0;
		font-size: 1.7rem;
		line-height: 2.25rem;
		font-weight: 500;
		letter-spacing: -0.025em;
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
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 2.5rem;
			line-height: 1.2;
			letter-spacing: 0.4px;
		}
		h3 {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}
	}
</style>
