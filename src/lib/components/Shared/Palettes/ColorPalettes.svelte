<script lang="ts">
	import Palette from '$lib/components/Shared/Palettes/Palette.svelte';
	import type { ColorPalette } from '$lib/types';

	export let alphaEnabled: boolean;
	export let selectedPaletteId: string;
	export let palettes: ColorPalette[];
	export let columns: number = 2;
	export let allowMultiplePalettesOpen = false;
	export let displayColorName = false;
	let paletteRefs: Record<string, Palette> = {};

	$: if (palettes && palettes.length === 0) paletteRefs = {};

	function handlePaletteToggled(id: string) {
		const isExpanded = paletteRefs[id].expanded;
		if (!allowMultiplePalettesOpen) {
			Object.values(paletteRefs)
				.filter((palette) => palette.expanded)
				.forEach((palette) => (palette.expanded = false));
		}
		paletteRefs[id].expanded = !isExpanded;
		selectedPaletteId = id;
	}
</script>

<div class="accordion" style="grid-template-columns: repeat({columns}, minmax(0, 1fr));">
	{#if palettes && palettes.length}
		{#each palettes as palette}
			<Palette
				{alphaEnabled}
				{palette}
				{displayColorName}
				on:colorSelected
				on:editColorDetails
				on:deleteColor
				on:togglePalette={() => handlePaletteToggled(palette.id)}
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
