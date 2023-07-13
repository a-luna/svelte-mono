<script lang="ts">
	import { browser } from '$app/environment';
	import PostNavCompact from '$lib/components/ApiTutorial/PostNavCompact.svelte';
	import ToggleGroup from '$lib/components/ApiTutorial/ToggleGroup.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import { tutorialSections } from '$lib/stores';
	import type { TutorialSection } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let tutorialSection: TutorialSection;

	$: tutorialSection = data.tutorialSection;
	$: allTutorialSections = data.allTutorialSections;
	$: if (browser && Object.keys(allTutorialSections).length) $tutorialSections = allTutorialSections;
</script>

{#if $tutorialSections.length}
	<ContentLayout content={tutorialSection} contentType={'tutorial'}>
		<div class="post-nav-wrapper">
			<PostNavCompact slug={tutorialSection.slug} />
			<ToggleGroup {tutorialSection} />
		</div>
		{@html tutorialSection?.content}
	</ContentLayout>
{/if}

<style lang="postcss">
	.post-nav-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 2rem;
	}
</style>
