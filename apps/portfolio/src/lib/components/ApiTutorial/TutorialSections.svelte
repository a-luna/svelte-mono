<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { tutorialSections } from '$lib/stores';
	import { getRandomHexString } from '$lib/util';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let id = `sec-${getRandomHexString(4)}`;
	export let detailsElement: HTMLDetailsElement;
	let open = false;

	const toggleDetailsElement = createEventDispatcher<{
		toggleSection: { sectionId: string };
	}>();

	function handleSectionToggled() {
		open = detailsElement.open;
		toggleDetailsElement('toggleSection', { sectionId: id });
	}

	beforeNavigate(() => {
		if (detailsElement) {
			detailsElement.open = false;
		}
	});
</script>

<details id="tutorial-sections" bind:this={detailsElement} on:toggle={() => handleSectionToggled()}>
	<summary>
		<div class="summary-wrapper">
			<div class="details-icon"><BasicIconRenderer icon={'chevron'} /></div>
			Tutorial Sections
		</div>
	</summary>
	{#if open}
		<div
			class="tutorial-sections-wrapper"
			in:slide={{ duration: 300, delay: 100 }}
			out:slide={{ duration: 300, delay: 100 }}
		>
			<ul>
				<li>
					<a href="overview">Project Overview</a>
				</li>
				{#each $tutorialSections as { slug, lead }}
					<li>
						<a href={slug}>{lead}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</details>

<style lang="postcss">
	#tutorial-sections {
		flex: 1;
		width: 100%;
		padding: 0;
		margin: 1rem 0 0 0;
	}

	#tutorial-sections ::marker {
		color: var(--accent-color);
	}

	#tutorial-sections a,
	#tutorial-sections a:hover {
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		transition: all 350ms ease-out;
	}

	.tutorial-sections-wrapper ul {
		list-style: square;
		margin: 1rem 0 1rem 2.5rem;
	}

	.tutorial-sections-wrapper ul > li::marker {
		color: var(--accent-color);
	}

	.tutorial-sections-wrapper > ul > li {
		margin: 0.5rem 0 0.5rem 0;
	}

	.tutorial-sections-wrapper > ul > li:first-child {
		margin: 0;
	}

	#tutorial-sections summary::-webkit-details-marker {
		/* Hides marker on Safari */
		display: none;
	}

	#tutorial-sections > summary {
		display: list-item;
		list-style: none;
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		border-top: 2px solid var(--accent-color);
		border-left: 2px solid var(--accent-color);
		border-right: 2px solid var(--accent-color);
		border-bottom: none;
		font-size: 1.25rem;
		line-height: 1;
		padding: 11px 5px;
		cursor: pointer;
		white-space: nowrap;
	}

	#tutorial-sections[open] > summary {
		color: var(--page-bg-color);
		font-weight: 500;
		background-color: var(--accent-color);
	}

	#tutorial-sections > summary > .summary-wrapper {
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

	#tutorial-sections[open] .details-icon {
		transform: rotate(90deg);
	}

	.tutorial-sections-wrapper {
		background-color: var(--toggle-group-bg-color);
		border: 2px solid var(--accent-color);
	}
</style>
