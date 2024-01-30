<script lang="ts">
	import ByLine from '$lib/components/ByLine.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
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
	$: projectName = contentType === 'readme' ? ' ' + content.slug : '';

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

<PageTransition>
	<article class="{contentType}{projectName}">
		<header>
			<div class="wrapper">
				<h1>{content?.title}</h1>
				<ByLine {published} {contentType} />
			</div>
		</header>
		<div
			class="wrapper content-wrapper prose prose-invert mb-8 w-full max-w-none prose-headings:m-0 prose-headings:font-normal prose-headings:leading-none prose-figure:mx-auto prose-figure:mb-4 prose-strong:inline prose-video:mx-auto prose-video:my-0"
		>
			<slot name="toc" />
			<slot name="content" />
		</div>
		{#if $$slots.content_item_nav}
			<div class="wrapper nav-wrapper">
				<slot name="content_item_nav" />
			</div>
		{/if}
		<slot name="comments" />
	</article>
</PageTransition>

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
		margin: 1.5rem 0;
	}
	header .wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
		margin: 1rem auto;
	}
	h1 {
		color: var(--tw-prose-invert-headings);
		font-size: 1.65rem;
		font-weight: 400;
		line-height: 1.3;
	}
	/* .gradient-heading {
		color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-box-decoration-break: text;
		box-decoration-break: clone;
		background-image: var(--page-title-gradient);
		background-color: var(--black-tint2);
	} */
	.wrapper {
		padding-top: 0;
		padding-bottom: 0;
		padding-left: var(--mobile-page-padding);
		padding-right: var(--mobile-page-padding);
		width: 100%;
		max-width: var(--max-width);
	}
	.content-wrapper,
	.nav-wrapper,
	.comments-wrapper {
		background-color: var(--page-bg-color);
		margin: 0 auto 4rem auto;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: var(--mobile-page-padding);
		padding-right: var(--mobile-page-padding);
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
	@media (min-width: 848px) {
		article.readme {
			--max-width: 800px;
		}
	}
</style>
