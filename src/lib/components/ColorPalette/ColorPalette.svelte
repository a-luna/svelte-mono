<script lang="ts">
	import { getNamedColorsOrderedByHue } from '$lib/color';
	import { getRandomHexString } from '$lib/helpers';
	import AccordionItem from '../Accordion/AccordionItem.svelte';

	export let id: string = getRandomHexString(4);
	export let alwaysOpen = false;

	function handleSectionToggled(details: { id: string; expanding: boolean }) {
		const { id: sectionId, expanding } = details;
    console.log({id, expanding});
		const targetHeading = document.getElementById(`accordion-heading-${sectionId}`);
		const allHeadings = document.querySelectorAll<HTMLElement>(`#accordion-${id} accordion-heading`);
		allHeadings.forEach((sec) => sec.classList.remove('active'));
		targetHeading.classList.add('active');
    console.log({allItems: allHeadings, targetItem: targetHeading});

		const targetContent = document.getElementById(`accordion-content-${sectionId}`);
    const allContents = document.querySelectorAll<HTMLElement>(`#accordion-${id} accordion-content`);
		if (expanding) {
			if (!alwaysOpen) {				
				allContents.forEach((sec) => sec.classList.add('collapsed'));
			}
			targetContent.classList.remove('collapsed');
			targetContent.classList.add('expanded');
		} else {
			targetContent.classList.remove('expanded');
			targetContent.classList.add('collapsed');
		}
    console.log({allItemContents: allContents, targetItemContent: targetContent});
	}
</script>

<div id="accordion-{id}" class="accordion">
	<AccordionItem parentId={id} on:toggleSection={(e) => handleSectionToggled(e.detail)}>
		<span slot="heading">Named Colors</span>
		<div slot="body" class="flex flex-col gap-2">
			{#each getNamedColorsOrderedByHue() as {name, hsl}}
				<div class="flex flex-row gap-5">
					<span class="font-medium text-lg tracking-wide leading-none flex-initial">{name}</span>
					<div title={hsl} class="palette-option flex-grow" style="background-color: {hsl}" />
				</div>
			{/each}
		</div>
	</AccordionItem>
	<AccordionItem parentId={id} on:toggleSection={(e) => handleSectionToggled(e.detail)}>
		<span slot="heading">Another Section</span>
		<div slot="body">Another section!</div>
	</AccordionItem>
</div>

<style lang="postcss">
	.palette-option {
		height: 20px;
		/* width: 40px; */
		white-space: nowrap;
		border: 1px solid var(--black4);
	}
</style>
