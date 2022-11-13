<script lang="ts">
	import CoverImage from '$lib/components/ApiTutorial/CoverImage.svelte';
	import PostNav from '$lib/components/ApiTutorial/PostNav.svelte';
	import ToggleGroup from '$lib/components/ApiTutorial/ToggleGroup.svelte';
	import ByLine from '$lib/components/ByLine.svelte';
	import { enableCopyCodeButtons, updateHeadingElements } from '$lib/content/browser';
	import { MY_TWITTER_HANDLE, SITE_URL } from '$lib/siteConfig';
	import type { TutorialSection } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let pageLoaded = false;
	let buttonsEnabled = false;
	let headingsUpdated = false;
	let tutorialSection: TutorialSection;

	$: tutorialSection = data.tutorialSection;
	$: if (pageLoaded && !buttonsEnabled) buttonsEnabled = enableCopyCodeButtons();
	$: if (pageLoaded && !headingsUpdated) headingsUpdated = updateHeadingElements();

	onMount(() => (pageLoaded = true));
</script>

<svelte:head>
	<title>{tutorialSection?.title}</title>
	<meta name="description" content="swyxkit blog" />

	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={tutorialSection?.title} />
	<meta name="Description" content={tutorialSection?.description} />
	<meta property="og:description" content={tutorialSection?.description} />
	<meta name="twitter:card" content={tutorialSection?.coverImage.src ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={tutorialSection?.title} />
	<meta name="twitter:description" content={tutorialSection?.description} />
	{#if tutorialSection?.coverImage}
		<meta property="og:image" content={tutorialSection?.coverImage?.src} />
		<meta name="twitter:image" content={tutorialSection?.coverImage?.src} />
	{/if}
</svelte:head>

<article class="tutorial">
	<h1>{tutorialSection?.title}</h1>
	<ByLine nameOnly={true} />
	<CoverImage slug={tutorialSection.slug} caption={tutorialSection.coverImage?.caption ?? ''} />
	<div class="post-nav-wrapper">
		<PostNav compact={true} slug={tutorialSection.slug} />
		<ToggleGroup {tutorialSection} />
	</div>
	<div
		class="prose prose-invert mb-8 w-full max-w-none prose-headings:m-0 prose-headings:font-normal prose-headings:leading-none prose-figure:mx-auto prose-figure:mb-4 prose-strong:inline prose-video:mx-auto prose-video:my-0"
	>
		{@html tutorialSection?.content}
	</div>
	<PostNav slug={tutorialSection.slug} />
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-flow: column nowrap;
		padding: 0 1.5rem;
		margin: 1rem auto;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		max-width: var(--max-width);
	}
	h1 {
		font-size: 2rem;
		font-weight: 500;
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
	.post-nav-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		width: 100%;
	}
	@media (min-width: 640px) {
		article {
			padding: 0 2rem;
		}
		h1 {
			font-size: 2.25rem;
		}
	}
	@media (min-width: 640px) {
		article {
			padding: 0 1.5rem;
		}
	}
	@media (min-width: 768px) {
		article {
			margin: 2rem auto;
			padding: 0;
		}
	}
</style>
