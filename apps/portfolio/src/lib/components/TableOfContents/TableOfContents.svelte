<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import TocSection from '$lib/components/TableOfContents/TocSection.svelte';
	import type { TocSection as TocSectionType } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import ExpandableSection from '../ExpandableSection.svelte';

	export let toc: TocSectionType[];
	export let detailsElement: HTMLDetailsElement | undefined = undefined;
	export const id = `toc-${getRandomHexString(4)}`;
	let open = false;

	const toggleDetailsElement = createEventDispatcher<{
		toggleSection: { sectionId: string };
	}>();

	function handleSectionToggled() {
		if (!detailsElement) return;
		open = detailsElement.open;
		toggleDetailsElement('toggleSection', { sectionId: id });
	}

	beforeNavigate(() => {
		if (detailsElement) {
			detailsElement.open = false;
		}
	});
</script>

{#if toc.length}
	<ExpandableSection sectionId={'table-of-contents'} title={'Table of Contents'}>
		<ul>
			{#each toc as section}
				<TocSection {section} />
			{/each}
		</ul>
	</ExpandableSection>
{/if}

<style lang="postcss">
</style>
