<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import TocSection from '$lib/components/TableOfContents/TocSection.svelte';
	import type { TocSection as TocSectionType } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

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
	<details id="table-of-contents" bind:this={detailsElement} on:toggle={() => handleSectionToggled()}>
		<summary>
			<div class="summary-wrapper">
				<div class="details-icon"><BasicIconRenderer icon={'chevron'} /></div>
				<span class="summary-text">Table of Contents</span>
			</div>
		</summary>
		{#if open}
			<div class="toc-wrapper" in:slide={{ duration: 300, delay: 100 }} out:slide={{ duration: 300, delay: 100 }}>
				<ul>
					{#each toc as section}
						<TocSection {section} />
					{/each}
				</ul>
			</div>
		{/if}
	</details>
{/if}

<style lang="postcss">
	#table-of-contents {
		background-color: var(--toggle-section-bg-color);
	}

	:global(.tutorial #table-of-contents) {
		margin: 0;
	}

	:global(.blog #table-of-contents),
	:global(.readme #table-of-contents) {
		margin: 0.5rem 0 0 0;
	}

	:global(.blog #table-of-contents > summary),
	:global(.readme #table-of-contents > summary) {
		border-width: 1.5px;
		border-style: solid;
		border-color: var(--dark-gray);
	}

	#table-of-contents > summary:hover {
		color: var(--accent-color);
		border-color: var(--accent-color);
	}

	#table-of-contents[open] > summary {
		color: var(--toggle-section-bg-color);
		border-color: var(--accent-color);
	}

	:global(.tutorial #table-of-contents > summary) {
		border-width: 1.5px;
		border-style: solid;
		border-color: var(--dark-gray);
	}

	.toc-wrapper {
		background-color: var(--toggle-section-bg-color);
		border-top: none;
		border-left-width: 1.5px;
		border-left-style: solid;
		border-left-color: var(--dark-gray);
		border-right-width: 1.5px;
		border-right-style: solid;
		border-right-color: var(--dark-gray);
		border-bottom-width: 1.5px;
		border-bottom-style: solid;
		border-bottom-color: var(--dark-gray);
	}

	#table-of-contents[open] .toc-wrapper,
	.toc-wrapper:hover {
		border-color: var(--accent-color);
	}

	@media (min-width: 640px) {
		#table-of-contents > summary {
			border-width: 2px;
		}
		.toc-wrapper {
			border-left-width: 2px;
			border-right-width: 2px;
			border-bottom-width: 2px;
		}
	}
</style>
