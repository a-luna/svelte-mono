<script lang="ts">
	import { dev } from '$app/environment';
	import PostNavCompact from '$lib/components/ApiTutorial/PostNavCompact.svelte';
	import ToggleGroup from '$lib/components/ApiTutorial/ToggleGroup.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import PostNav from '$lib/components/PostNav.svelte';
	import { tutorialSections } from '$lib/stores';
	import type { OrderedNavItem, TutorialSection } from '$lib/types';
	import Giscus from '@giscus/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let tutorialSection: TutorialSection;

	const part0: OrderedNavItem = {
		slug: 'overview',
		title: 'Project Overview',
		titleCompact: 'Overview',
		weight: 0,
	};

	$: tutorialSection = data.tutorialSection;
	$: sortedTutorials = data.allSections
		.sort((a, b) => (a?.series_weight ?? 0) - (b?.series_weight ?? 0))
		.map(({ slug, series_weight, series_part, lead }) => ({
			slug,
			title: lead || series_part || '',
			titleCompact: series_part || '',
			weight: series_weight || 0,
		}));
	$: navItems = [part0, ...sortedTutorials];
</script>

{#if $tutorialSections.length}
	<ContentLayout content={tutorialSection} contentType={'tutorial'}>
		<svelte:fragment slot="content">
			<div class="post-nav-wrapper">
				<PostNavCompact slug={tutorialSection.slug} />
				<ToggleGroup {tutorialSection} />
			</div>
			{@html tutorialSection?.content}
		</svelte:fragment>
		<svelte:fragment slot="content_item_nav">
			<PostNav {navItems} slug={tutorialSection.slug} />
		</svelte:fragment>
		<svelte:fragment slot="comments">
			{#if !dev}
				<Giscus
					repo="a-luna/svelte-mono"
					repoId="R_kgDOJRXMQw"
					category="Giscus"
					categoryId="DIC_kwDOJRXMQ84CYIYD"
					mapping="og:title"
					strict="1"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="top"
					theme="transparent_dark"
					lang="en"
					loading="lazy"
				/>
			{/if}
		</svelte:fragment>
	</ContentLayout>
{/if}

<style lang="postcss">
	.post-nav-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
		margin: 0 0 2rem 0;
	}
</style>
