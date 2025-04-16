<script lang="ts">
	import { browser, dev } from '$app/environment';
	import AboutMe from '$lib/components/HomePage/AboutMe.svelte';
	import ApiTutorial from '$lib/components/HomePage/ApiTutorial.svelte';
	import FeaturedProjects from '$lib/components/HomePage/FeaturedProjects.svelte';
	import RecentBlogPosts from '$lib/components/HomePage/RecentBlogPosts.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { DEFAULT_OG_IMAGE, MY_TWITTER_HANDLE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import { blogPosts, mobileNavOpen, tutorialSections } from '$lib/stores';
	import { parseColorFromString } from '@a-luna/shared-ui/color/parsers';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const title = 'Welcome!';
	let mounted = false;

	$: if (dev && browser) {
		let result = parseColorFromString('sandy-brown');
		console.log(result);
		result = parseColorFromString('oklab(80.88% -0.18 -0.03 / 0.76)');
		console.log(result);
		result = parseColorFromString('oklch(80.88% 0.184 188.23 / 76.08%)');
		console.log(result);
		result = parseColorFromString('#000000');
		console.log(result);
		result = parseColorFromString('hsl(353 100% 38%)');
		console.log(result);
	}
	$: projects = Object.values(data.repos);
	$: $blogPosts = data.allPosts;
	$: $tutorialSections = data.allSections;

	onMount(() => {
		$mobileNavOpen = false;
		mounted = true;
	});
</script>

<svelte:head>
	<link rel="canonical" href={SITE_URL} />
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

{#if mounted}
	<SectionLayout section={'home'} {title}>
		<div class="intro">
			<div class="intro-content prose prose-invert">
				<div class="section-content">
					<AboutMe />
					{#if $blogPosts && $blogPosts.length}
						<RecentBlogPosts />
					{/if}
					{#if projects && projects.length}
						<FeaturedProjects />
					{/if}
					{#if $tutorialSections && $tutorialSections.length}
						<ApiTutorial />
					{/if}
				</div>
			</div>
		</div>
	</SectionLayout>
{/if}

<style lang="postcss">
	.intro {
		/* background: var(--page-bg-color);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr; */
		width: 100%;
		margin: 0 auto;
	}
	.intro-content {
		margin: 0 auto;
		max-width: var(--max-width);
		/* position: relative;
		grid-column: 1;
		grid-row: 1;
		padding: 0;
		width: 100%;
		z-index: 2; */
	}
	.section-content {
		display: flex;
		flex-flow: column nowrap;
		gap: 2.5rem;
	}

	@media (min-width: 640px) {
		.intro {
			padding: 0;
		}
	}

	@media (min-width: 1024px) {
		.intro {
			max-height: 450px;
		}
	}
</style>
