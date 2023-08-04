<script lang="ts">
	import TocSection from '$lib/components/TableOfContents/TocSection.svelte';
	import type { TocSection as TocSectionType } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import ExpandableSection from '../ExpandableSection.svelte';

	export let toc: TocSectionType[];
	export const id = `toc-${getRandomHexString(4)}`;
</script>

{#if toc.length}
	<ExpandableSection sectionId={'table-of-contents'} title={'Table of Contents'} on:toggleSection>
		<ul>
			{#each toc as section}
				<TocSection {section} />
			{/each}
		</ul>
	</ExpandableSection>
{/if}

<style lang="postcss">
</style>
