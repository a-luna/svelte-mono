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
		background-color: var(--toggle-group-bg-color);
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

	#table-of-contents :global(p) {
		margin: 0;
	}

	#table-of-contents :global(ul li) {
		font-size: 0.9rem;
	}

	.toc-wrapper ul {
		list-style: square;
		padding: 1rem 0.5rem 1rem 1.5rem;
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

	:global(.blog #table-of-contents > summary),
	:global(.readme #table-of-contents > summary) {
		display: list-item;
		list-style: none;
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		font-size: 1.1rem;
		line-height: 1;
		padding: 0.75rem 0.5rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.3s ease-in;
		border: 1px solid var(--accent-color);
	}

	:global(.blog #table-of-contents[open] > summary),
	:global(.readme #table-of-contents[open] > summary) {
		font-weight: 500x;
	}

	:global(.tutorial #table-of-contents > summary) {
		border-top: none;
		border-left: 1px solid var(--accent-color);
		border-right: 1px solid var(--accent-color);
		border-bottom: none;
	}

	#table-of-contents[open] > summary {
		font-weight: 500;
		color: var(--page-bg-color);
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
		width: 10px;
		transition: transform 0.3s ease-in;
	}

	#table-of-contents[open] .details-icon {
		transform: rotate(90deg);
	}

	.toc-wrapper {
		background-color: var(--toggle-group-bg-color);
		border-top: none;
		border-right: 1px solid var(--accent-color);
		border-bottom: 1px solid var(--accent-color);
		border-left: 1px solid var(--accent-color);
	}

	@media (min-width: 640px) {
		#table-of-contents :global(ul li) {
			font-size: 1rem;
		}
		:global(.blog #table-of-contents > summary),
		:global(.readme #table-of-contents > summary) {
			font-size: 1.25rem;
			padding: 1rem;
			border: 2px solid var(--accent-color);
		}
		:global(.tutorial #table-of-contents > summary) {
			border-top: none;
			border-left: 2px solid var(--accent-color);
			border-right: 2px solid var(--accent-color);
			border-bottom: none;
		}
		.details-icon {
			width: 12px;
		}
		.toc-wrapper {
			border-right: 2px solid var(--accent-color);
			border-bottom: 2px solid var(--accent-color);
			border-left: 2px solid var(--accent-color);
		}
	}
</style>
