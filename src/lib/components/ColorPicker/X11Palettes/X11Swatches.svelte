<script lang="ts">
	import X11ColorSwatch from '$lib/components/ColorPicker/X11Palettes/X11ColorSwatch.svelte';
	import type { ColorPalette } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let x11ColorPalettes: ColorPalette[];
	export let activePaletteId: string;
	let swatchMap: Record<string, X11ColorSwatch> = {} as Record<string, X11ColorSwatch>;
	const dispatch = createEventDispatcher();

	$: if (Object.keys(swatchMap).length === x11ColorPalettes.length) activePaletteId = x11ColorPalettes[0].id;
	$: if (Object.keys(swatchMap).length === x11ColorPalettes.length && activePaletteId)
		swatchMap[activePaletteId].focus();

	function handleSwatchClicked(paletteId: string) {
		dispatch('changeX11Palette', paletteId);
		activePaletteId = paletteId;
	}
</script>

<div class="x11-swatches">
	{#each x11ColorPalettes as palette}
		<X11ColorSwatch
			color={palette.componentColor}
			tooltip={palette.displayName}
			on:click={() => handleSwatchClicked(palette.id)}
			bind:this={swatchMap[palette.id]}
		/>
	{/each}
</div>

<style lang="postcss">
	.x11-swatches {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
	}
</style>
