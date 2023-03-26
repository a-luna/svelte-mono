<script lang="ts">
	import X11ColorSwatch from '$lib/components/ColorPicker/X11Palettes/X11ColorSwatch.svelte';
	import type { ColorPalette } from '$lib/types';

	export let x11ColorPalettes: ColorPalette[];
	export let activePaletteId: string = '';
	let swatchMap: Record<string, X11ColorSwatch> = {} as Record<string, X11ColorSwatch>;

	$: if (Object.keys(swatchMap).length === x11ColorPalettes.length) activePaletteId = x11ColorPalettes[0].id;
	$: if (activePaletteId) swatchMap[activePaletteId]?.focus();

	function handleX11PaletteSelected(e: CustomEvent<{ paletteId: string }>) {
		const { paletteId } = e.detail;
		activePaletteId = paletteId;
	}
</script>

{#each x11ColorPalettes as palette}
	<X11ColorSwatch
		paletteId={palette.id}
		{activePaletteId}
		color={palette.componentColor}
		tooltip={palette.displayName}
		on:x11PaletteSelected={handleX11PaletteSelected}
		on:x11PaletteSelected
		bind:this={swatchMap[palette.id]}
	/>
{/each}
