<script lang="ts">
	import { browser, dev } from '$app/environment';
	import PostNavCompact from '$lib/components/ApiTutorial/PostNavCompact.svelte';
	import ToggleGroup from '$lib/components/ApiTutorial/ToggleGroup.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import PostNav from '$lib/components/PostNav.svelte';
	import { tutorialSections } from '$lib/stores';
	import type { TutorialSection } from '$lib/types';
	import Giscus from '@giscus/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let tutorialSection: TutorialSection;

	$: tutorialSection = data.tutorialSection;
	$: allTutorialSections = data.allTutorialSections;
	$: if (browser && Object.keys(allTutorialSections).length) $tutorialSections = allTutorialSections;
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
			<PostNav slug={tutorialSection.slug} contentType={'tutorial'} />
		</svelte:fragment>
		<svelte:fragment slot="comments">
			{#if !dev}
				<div class="wrapper comments-wrapper">
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
				</div>
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
