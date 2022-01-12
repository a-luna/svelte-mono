<script lang="ts">
	import Palette from '$lib/components/ThemeEditor/Palettes/Palette.svelte';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let palettes: ColorPalette[];
	export let color: ComponentColor = 'blue';
	export let columns: number = 2;
	export let allowMultiplePalettesOpen = false;
	export let displayName = false;
	let paletteRefs: Record<string, Palette> = {};
	const dispatch = createEventDispatcher();

	function handlePaletteToggled(id: string) {
		dispatch('paletteToggled', id);
		if (!allowMultiplePalettesOpen) {
			for (let [paletteId, palette] of Object.entries(paletteRefs)) {
				if (paletteId !== id && palette.expanded) {
					palette.expanded = false;
				}
			}
		}
	}
</script>

<div class="accordion" style="grid-template-columns: repeat({columns}, minmax(0, 1fr));">
	{#each palettes as palette}
		<Palette
			{palette}
			{color}
			{columns}
			{displayName}
			on:colorSelected
			on:togglePalette={(e) => handlePaletteToggled(e.detail)}
			bind:this={paletteRefs[palette.id]}
		/>
	{/each}
</div>

<style lang="postcss">
	.accordion {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		width: 100%;
	}
</style>
