<script lang="ts">
	import ByLine from '$lib/components/ByLine.svelte';
	import { enableCopyCodeButtons } from '$lib/content/browser';
	import { MY_TWITTER_HANDLE, SITE_TITLE } from '$lib/siteConfig';
	import type { BlogPost, ProjectReadme, TutorialSection } from '$lib/types';
	import { onMount } from 'svelte';

	export let content: ProjectReadme | BlogPost | TutorialSection;
	export let contentType: string;
	let pageLoaded = false;
	let buttonsEnabled = false;

	$: published = content?.date ? new Date(content.date) : new Date(0);
	$: if (pageLoaded && !buttonsEnabled) buttonsEnabled = enableCopyCodeButtons();

	onMount(() => (pageLoaded = true));
</script>

<svelte:head>
	<title>{content?.title} | {SITE_TITLE}</title>
	<link rel="canonical" href={content?.url} />
	<meta property="og:url" content={content?.url} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={content?.title} />
	<meta name="Description" content={content?.description} />
	<meta property="og:description" content={content?.description} />
	<meta name="twitter:card" content={content?.coverImage?.src ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={content?.title} />
	<meta name="twitter:description" content={content?.description} />
	{#if content?.coverImage?.src}
		<meta property="og:image" content={content?.coverImage?.src} />
		<meta name="twitter:image" content={content?.coverImage?.src} />
	{/if}
</svelte:head>

<article class={contentType}>
	<header>
		<div class="wrapper">
			<h1>{content?.title}</h1>
			<ByLine {published} {contentType} />
		</div>
	</header>
	<div
		class="wrapper prose prose-invert mb-8 w-full max-w-none prose-headings:m-0 prose-headings:font-normal prose-headings:leading-none prose-figure:mx-auto prose-figure:mb-4 prose-strong:inline prose-video:mx-auto prose-video:my-0"
	>
		<slot />
	</div>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: flex-start;
	}
	header {
		background-color: var(--black-tint2);
		width: 100%;
		margin: 1rem 0;
	}
	h1 {
		font-family: 'Noto Sans', sans-serif;
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
	.wrapper {
		padding: 0 1.5rem;
		margin: 1rem auto;
		width: 100%;
		max-width: var(--max-width);
	}
	header .wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		margin: 1rem auto;
	}
	@media (min-width: 640px) {
		.wrapper {
			padding: 0 2rem;
		}
		h1 {
			font-size: 2.25rem;
		}
	}
	@media (min-width: 640px) {
		.wrapper {
			padding: 0 1.5rem;
		}
	}
	@media (min-width: 768px) {
		.wrapper {
			padding: 0;
		}
	}
</style>
