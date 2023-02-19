<script lang="ts">
	import PostNav from '$lib/components/ApiTutorial/PostNav.svelte';
	import ToggleGroup from '$lib/components/ApiTutorial/ToggleGroup.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import type { TutorialSection } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let tutorialSection: TutorialSection;

	$: tutorialSection = data.tutorialSection;
</script>

<ContentLayout content={tutorialSection} contentType={'tutorial'}>
	<div class="post-nav-wrapper">
		<PostNav compact={true} slug={tutorialSection.slug} />
		<ToggleGroup {tutorialSection} />
	</div>
	{@html tutorialSection?.content}
	<PostNav slug={tutorialSection.slug} />
</ContentLayout>
