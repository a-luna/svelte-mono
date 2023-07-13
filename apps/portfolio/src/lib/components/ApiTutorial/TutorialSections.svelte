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
			<span class="summary-text">Tutorial Sections</span>
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
		background-color: var(--toggle-section-bg-color);
	}

	#tutorial-sections > summary {
		border-top: 1.5px solid var(--dark-gray);
		border-left: 1.5px solid var(--dark-gray);
		border-right: 1.5px solid var(--dark-gray);
		border-bottom: 1.5px solid transparent;
	}

	#tutorial-sections[open] .tutorial-sections-wrapper,
	#tutorial-sections > summary:hover {
		color: var(--accent-color);
		border-color: var(--accent-color);
	}

	#tutorial-sections[open] > summary {
		color: var(--toggle-section-bg-color);
		border-color: var(--accent-color);
	}

	#tutorial-sections[open] > summary,
	#tutorial-sections > summary:hover {
		border-bottom: 1.5px solid var(--accent-color);
	}

	.tutorial-sections-wrapper {
		border: 1.5px solid var(--dark-gray);
	}

	@media (min-width: 640px) {
		#tutorial-sections > summary {
			border-top: 2px solid var(--dark-gray);
			border-left: 2px solid var(--dark-gray);
			border-right: 2px solid var(--dark-gray);
			border-bottom: 2px solid transparent;
		}

		#tutorial-sections[open] > summary,
		#tutorial-sections > summary:hover {
			border-bottom: 2px solid var(--accent-color);
		}

		.tutorial-sections-wrapper {
			border: 2px solid var(--dark-gray);
		}
	}
</style>
