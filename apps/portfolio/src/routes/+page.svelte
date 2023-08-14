<script lang="ts">
	import AboutMe from '$lib/components/HomePage/AboutMe.svelte';
	import ApiTutorial from '$lib/components/HomePage/ApiTutorial.svelte';
	import FeaturedProjects from '$lib/components/HomePage/FeaturedProjects.svelte';
	import RecentBlogPosts from '$lib/components/HomePage/RecentBlogPosts.svelte';
	import Mandala from '$lib/components/Mandala.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { DEFAULT_OG_IMAGE, MY_TWITTER_HANDLE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import { initialFadePerformed, mobileNavOpen } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	let mounted = false;

	onMount(() => {
		mounted = true;
		$mobileNavOpen = false;
		setTimeout(() => ($initialFadePerformed = true), 1000);
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

<div class="intro">
	<div class="intro-content prose prose-invert">
		{#if mounted}
			<SectionLayout section={'home'} title={'Welcome!'}>
				<div class="section-content">
					<AboutMe />
					<RecentBlogPosts allBlogPosts={data.allBlogPosts} />
					<FeaturedProjects />
					<ApiTutorial />
				</div>
			</SectionLayout>
		{/if}
	</div>
	{#if $initialFadePerformed}
		<div in:fade={{ duration: 2500 }} class="mandala-wrapper">
			<Mandala />
		</div>
	{/if}
</div>

<style lang="postcss">
	.intro {
		background: var(--page-bg-color);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 100%;
		margin: 0 auto;
	}
	.intro-content {
		font-family: 'Noto Sans';
		margin: 0 auto;
		z-index: 2;
		position: relative;
		max-width: var(--max-width);
		grid-column: 1;
		grid-row: 1;
		padding: 0;
	}
	.section-content {
		display: flex;
		flex-flow: column nowrap;
		gap: 2.5rem;
	}
	.mandala-wrapper {
		height: 550px;
		overflow: hidden;
		transition: all 1s ease-in-out;
		width: 100%;
		z-index: 1;
		grid-column: 1;
		grid-row: 1;
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
