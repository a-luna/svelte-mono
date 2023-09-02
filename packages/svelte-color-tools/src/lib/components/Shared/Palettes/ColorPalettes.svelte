<script lang="ts">
	import Palette from '$lib/components/Shared/Palettes/Palette.svelte';
	import type { ColorPalette } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let palettes: ColorPalette[];
	export let columns: number = 2;
	export let allowMultiplePalettesOpen = false;
	let paletteRefs: Record<string, Palette> = {};
	const dispatchPaletteSelected = createEventDispatcher<{ paletteSelected: { paletteId: string | null } }>();

	$: if (palettes && palettes.length === 0) paletteRefs = {};

	function handlePaletteToggled(e: CustomEvent<{ paletteId: string }>) {
		const { paletteId } = e.detail;
		const isExpanded = paletteRefs?.[paletteId]?.expanded;
		if (!allowMultiplePalettesOpen) {
			Object.values(paletteRefs)
				.filter((palette) => palette.expanded)
				.forEach((palette) => (palette.expanded = false));
		}

		const togglePalette = paletteRefs[paletteId];
		if (togglePalette) {
			togglePalette.expanded = !isExpanded;
		}

		if (Object.values(paletteRefs).every((palette) => !palette.expanded)) {
			dispatchPaletteSelected('paletteSelected', { paletteId: null });
		} else {
			dispatchPaletteSelected('paletteSelected', { paletteId });
		}
	}
</script>

<div class="accordion" style="grid-template-columns: repeat({columns}, minmax(0, 1fr));">
	{#if palettes && palettes.length}
		{#each palettes as palette}
			<Palette
				{palette}
				on:colorSelected
				on:editColorDetails
				on:deleteColor
				on:paletteToggled={handlePaletteToggled}
				bind:this={paletteRefs[palette.id]}
			/>
		{/each}
	{/if}
</div>

<style lang="postcss">
	.accordion {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		width: 100%;
	}
</style>
