<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
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

	beforeNavigate(() => Object.values(getSections()).forEach((sec) => (sec.open = false)));
</script>

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

<style lang="postcss">
</style>
