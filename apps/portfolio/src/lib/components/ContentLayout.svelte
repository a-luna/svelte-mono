<script lang="ts">
	import ByLine from '$lib/components/ByLine.svelte';
	import PostNav from '$lib/components/PostNav.svelte';
	import { enableCopyCodeButtons } from '$lib/content/browser';
	import { MY_TWITTER_HANDLE, SITE_TITLE } from '$lib/siteConfig';
	import type { BlogPost, ContentType, ProjectReadme, TutorialSection } from '$lib/types';
	import { onMount } from 'svelte';

	export let content: ProjectReadme | BlogPost | TutorialSection;
	export let contentType: ContentType;
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
		class="wrapper content-wrapper prose prose-invert mb-8 w-full max-w-none prose-headings:m-0 prose-headings:font-normal prose-headings:leading-none prose-figure:mx-auto prose-figure:mb-4 prose-strong:inline prose-video:mx-auto prose-video:my-0"
	>
		<slot />
	</div>
	{#if ['blog', 'tutorial'].includes(contentType)}
		<div class="wrapper nav-wrapper">
			<PostNav slug={content.slug} {contentType} />
		</div>
	{/if}
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
		margin: 1.5rem 0 2rem 0;
	}
	h1 {
		font-family: 'Noto Sans', Inter, Arial, Helvetica, sans-serif;
		font-size: 1.65rem;
		font-weight: 500;
		color: var(--post-title-text-color);
		-webkit-text-fill-color: var(--post-title-text-color);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: var(--post-title-text-stroke);
		line-height: 1.3;
		text-shadow: 2px 2px var(--post-title-text-stroke), 1.75px 1.75px var(--post-title-text-stroke),
			1.5px 1.5px var(--post-title-text-stroke), 1.25px 1.25px var(--post-title-text-stroke),
			1px 1px var(--post-title-text-stroke), 0.75px 0.75px var(--post-title-text-stroke),
			0.5px 0.5px var(--post-title-text-stroke), 0.25px 0.25px var(--post-title-text-stroke);
	}
	.wrapper {
		padding-top: 0;
		padding-bottom: 0;
		padding-left: var(--mobile-page-padding);
		padding-right: var(--mobile-page-padding);
		width: 100%;
		margin: 1rem auto;
	}
	.content-wrapper {
		background-color: var(--page-bg-color);
		margin: 0 auto 2rem auto;
	}
	.nav-wrapper {
		background-color: var(--page-bg-color);
		margin: 0 auto;
	}
	.content-wrapper,
	.nav-wrapper {
		max-width: var(--max-width);
		padding-top: 0;
		padding-bottom: 0;
		padding-left: var(--mobile-page-padding);
		padding-right: var(--mobile-page-padding);
	}
	header .wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		max-width: var(--max-width);
	}
	@media (min-width: 640px) {
		h1 {
			font-size: 1.8rem;
		}
	}
	@media (min-width: 768px) {
		.wrapper {
			padding: 0;
		}
		h1 {
			font-size: 2rem;
		}
	}
</style>
