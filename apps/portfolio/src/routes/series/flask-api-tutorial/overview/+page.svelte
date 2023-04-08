<script lang="ts">
	import { browser } from '$app/environment';
	import SectionSummary from '$lib/components/ApiTutorial/SectionSummary.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import { nullBlogPost } from '$lib/constants';
	import { SITE_URL } from '$lib/siteConfig';
	import { tutorialSections } from '$lib/stores';
	import type { BlogPost, TutorialSection } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let list: TutorialSection[];
	const description =
		'This tutorial series provides step-by-step instructions and in-depth explanations to guide you through the process of creating a robust, production-quality REST API. The toolstack consists of Flask, Flask-RESTx, SQLAlchemy, pyjwt, tox and other packages. Code quality is a major focus, with considerable time dedicated to testing (using pytest), logging and tools such as coverage, flake8 and mypy. The tutorial concludes by creating a process that continuously integrates (with tox, travis/circle CI, coveralls) and deploys the API (with either Github or Azure DevOps to Heroku).';

	const content: BlogPost = {
		...nullBlogPost,
		title: 'How To: Create a Flask API with JWT-Based Authentication',
		url: `${SITE_URL}/series/flask-api-tutorial/overview`,
		date: new Date(0).toISOString(),
		description,
		coverImage: {
			name: 'cover',
			src: '',
			caption: 'Photo by Matt Howard on Unsplash',
		},
	};

	$: allTutorialSections = data.allTutorialSections;
	$: if (browser && Object.keys(allTutorialSections).length) $tutorialSections = allTutorialSections;
	$: if (tutorialSections && $tutorialSections.length)
		list = $tutorialSections.sort((a, b) => (a?.series_weight ?? 0) - (b?.series_weight ?? 0));
</script>

<ContentLayout {content} contentType={'tutorial'}>
	<section class="article-list">
		<p>
			This tutorial series provides step-by-step instructions and in-depth explanations to guide you through the process
			of creating a robust, production-quality REST API. The toolstack consists of Flask, Flask-RESTx, SQLAlchemy,
			pyjwt, tox and other packages. Code quality is a major focus, with considerable time dedicated to testing (using
			pytest), logging and tools such as coverage, flake8 and mypy. The tutorial concludes by creating a process that
			continuously integrates (with tox, travis/circle CI, coveralls) and deploys the API (with either Github or Azure
			DevOps to Heroku).
		</p>
		<h3>All Sections</h3>
		{#if list.length}
			<ul data-sveltekit-preload-data="hover">
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
</ContentLayout>

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
	p {
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
	}
	h3 {
		color: var(--body-text);
		margin: 2rem 0 1rem 0;
		font-size: 1.7rem;
		line-height: 2rem;
		font-weight: 400;
		letter-spacing: 0.75px;
	}
	ul {
		list-style: none;
		margin: 0;
	}
	li {
		margin: 0 0 2rem 0;
		padding: 0;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	@media (min-width: 640px) {
		section {
			padding: 0 2rem;
		}
	}

	@media (min-width: 768px) {
		h3 {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}
	}
</style>
