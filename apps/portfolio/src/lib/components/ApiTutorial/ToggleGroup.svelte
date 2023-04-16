<script lang="ts">
	import GithubLinks from '$lib/components/ApiTutorial/GithubLinks.svelte';
	import TutorialSections from '$lib/components/ApiTutorial/TutorialSections.svelte';
	import TableOfContents from '$lib/components/TableOfContents/TableOfContents.svelte';
	import type { TutorialSection } from '$lib/types';

	export let tutorialSection: TutorialSection;
	let secId: string;
	let tocId: string;
	let ghId: string;
	let secElement: HTMLDetailsElement;
	let tocElement: HTMLDetailsElement;
	let ghElement: HTMLDetailsElement;

	function getSections(): { [k: string]: HTMLDetailsElement } {
		let toggleSections: { [k: string]: HTMLDetailsElement } = {};
		toggleSections[secId] = secElement;
		toggleSections[tocId] = tocElement;
		toggleSections[ghId] = ghElement;
		return toggleSections;
	}

	function toggle(toggledId: string) {
		const sections = getSections();
		if (sections[toggledId]?.open) {
			Object.entries(sections).forEach(([id, section]) => {
				if (id !== toggledId) {
					section.open = false;
				}
			});
		}
	}
</script>

<div class="toggle-groups">
	<TutorialSections
		bind:id={secId}
		bind:detailsElement={secElement}
		on:toggleSection={({ detail: { sectionId } }) => toggle(sectionId)}
	/>
	<TableOfContents
		bind:id={tocId}
		bind:detailsElement={tocElement}
		toc={tutorialSection?.toc ?? []}
		on:toggleSection={({ detail: { sectionId } }) => toggle(sectionId)}
	/>
	<GithubLinks
		bind:id={ghId}
		bind:detailsElement={ghElement}
		section={tutorialSection}
		on:toggleSection={({ detail: { sectionId } }) => toggle(sectionId)}
	/>
</div>

<style lang="postcss">
	.toggle-groups :global(summary) {
		display: list-item;
		list-style: none;
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		font-size: 1rem;
		line-height: 1;
		padding: 1rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.3s ease-in;
	}

	@media (min-width: 640px) {
		.toggle-groups :global(summary) {
			font-size: 1.25rem;
		}
	}
</style>
