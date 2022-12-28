<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Chevron from '$lib/components/Icons/Chevron.svelte';
	import TocSection from '$lib/components/TableOfContents/TocSection.svelte';
	import type { TocSection as TocSectionType } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
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

<details id="table-of-contents" bind:this={detailsElement} on:toggle={() => handleSectionToggled()}>
	<summary>
		<div class="summary-wrapper">
			<div class="details-icon"><Chevron /></div>
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

<style lang="postcss">
	#table-of-contents {
		flex: 1;
		width: 100%;
		padding: 0;
	}

	:global(.tutorial #table-of-contents) {
		margin: 0;
	}

	#table-of-contents ::marker {
		color: var(--accent-color);
	}

	#table-of-contents :global(a),
	#table-of-contents :global(a:hover) {
		color: var(--accent-color);
		transition: all 350ms ease-out;
	}

	#table-of-contents :global(code),
	#table-of-contents :global(a code) {
		color: var(--body-text);
		background-color: var(--page-bg-color);
		font-size: 0.8rem;
		padding: 2px 3px;
		border-radius: 4px;
		box-shadow: none;
		text-decoration: none;
	}

	#table-of-contents :global(a code:hover) {
		color: var(--black-tint3);
		background-color: var(--accent-color);
		transition: all 350ms ease-out;
	}

	#table-of-contents :global(p) {
		margin: 0;
	}

	.toc-wrapper ul {
		list-style: square;
		margin: 1rem 0 1rem 2.5rem;
	}

	.toc-wrapper :global(ul > li::marker) {
		color: var(--accent-color);
	}

	:global(.toc-wrapper > ul > li) {
		margin: 0.5rem 0 0.5rem 0;
	}

	:global(.toc-wrapper > ul > li > ul > li) {
		margin: 0.25rem 0 0.25rem 0;
	}

	:global(.toc-wrapper > ul > li:first-child) {
		margin: 0;
	}

	#table-of-contents summary::-webkit-details-marker {
		/* Hides marker on Safari */
		display: none;
	}

	#table-of-contents > summary {
		display: list-item;
		list-style: none;
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		font-size: 1.25rem;
		line-height: 1;
		padding: 11px 5px;
		cursor: pointer;
		white-space: nowrap;
	}

	:global(.blog #table-of-contents > summary) {
		border: 2px solid var(--accent-color);
	}

	:global(.tutorial #table-of-contents > summary) {
		border-top: none;
		border-left: 2px solid var(--accent-color);
		border-right: 2px solid var(--accent-color);
		border-bottom: none;
	}

	#table-of-contents[open] > summary {
		color: var(--page-bg-color);
		font-weight: 500;
		background-color: var(--accent-color);
	}

	#table-of-contents > summary > .summary-wrapper {
		flex: 0;
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
		margin: 0 0 0 0.5rem;
	}

	.details-icon {
		width: 12px;
		transition: transform 0.3s ease-in;
	}

	#table-of-contents[open] .details-icon {
		transform: rotate(90deg);
	}

	.toc-wrapper {
		background-color: var(--toggle-group-bg-color);
		border: 2px solid var(--accent-color);
	}
</style>
