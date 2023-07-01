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
				Table of Contents
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
	:global(.tutorial #table-of-contents) {
		margin: 0;
	}

	:global(.blog #table-of-contents) {
		margin: 0.5rem 0 0 0;
	}

	:global(.blog #table-of-contents > summary),
	:global(.readme #table-of-contents > summary) {
		border: 1px solid var(--accent-color);
	}

	:global(.tutorial #table-of-contents > summary) {
		border-top: none;
		border-left: 1.5px solid var(--accent-color);
		border-right: 1.5px solid var(--accent-color);
		border-bottom: none;
	}

	.toc-wrapper {
		background-color: var(--toggle-group-bg-color);
		border-top: none;
		border-right: 1.5px solid var(--accent-color);
		border-bottom: 1.5px solid var(--accent-color);
		border-left: 1.5px solid var(--accent-color);
	}

	@media (min-width: 640px) {
		:global(.blog #table-of-contents > summary),
		:global(.readme #table-of-contents > summary) {
			border: 2px solid var(--accent-color);
		}
		:global(.tutorial #table-of-contents > summary) {
			border-top: none;
			border-left: 2px solid var(--accent-color);
			border-right: 2px solid var(--accent-color);
			border-bottom: none;
		}
		.toc-wrapper {
			border-right: 2px solid var(--accent-color);
			border-bottom: 2px solid var(--accent-color);
			border-left: 2px solid var(--accent-color);
		}
	}
</style>
