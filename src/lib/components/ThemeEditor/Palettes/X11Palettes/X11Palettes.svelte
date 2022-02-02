<script lang="ts">
	import Palette from '$lib/components/ThemeEditor/Palettes/Palette.svelte';
	import X11Swatches from '$lib/components/ThemeEditor/Palettes/X11Palettes/X11Swatches.svelte';
	import type { ColorPalette, ComponentColor } from '$lib/types';

	export let x11ColorPalettes: ColorPalette[];
	let selectedPalette: ColorPalette;
	let x11PaletteMap: Record<ComponentColor, ColorPalette> = {} as Record<ComponentColor, ColorPalette>;

	$: if (x11ColorPalettes) x11ColorPalettes.forEach((p) => (x11PaletteMap[p.componentColor] = p));
</script>

<div class="x11-palettes">
	<X11Swatches {x11ColorPalettes} on:changeX11Palette={(e) => (selectedPalette = x11PaletteMap[e.detail])} />
	{#if selectedPalette}
		<Palette
			palette={selectedPalette}
			expanded={true}
			alwaysExpanded={true}
			displayPaletteName={false}
			columns={5}
			on:colorSelected
		/>
	{/if}
</div>

<style lang="postcss">
	.x11-palettes {
		--button-size: 35px;

		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		width: 100%;
	}
</style>
