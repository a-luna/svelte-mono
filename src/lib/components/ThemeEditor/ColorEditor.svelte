<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import PaletteControls from '$lib/components/ThemeEditor/PaletteControls/PaletteControls.svelte';
	import type { ColorPalette, CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editMode = false;
	export let themePalettes: ColorPalette[];
	export let selectedPaletteId: string;
	let name: string;
	let custom = false;
	let selectedColor: CssColor;
	let colorPicker: ColorPicker;
	let color: CssColor;
	let error = false;
	const dispatch = createEventDispatcher();

	$: editable = !editMode;

	$: if (name) {
		error = false;
		if (custom) {
			selectedColor.name = name;
		}
	}

	export function setColor(namedColor: CssColor, isCustom: boolean) {
		selectedColor = namedColor;
		name = namedColor.name;
		custom = isCustom;
		colorPicker.setColor(namedColor);
	}

	function addNewColor() {
		if (!name) {
			error = true;
			return;
		}
		const newColor: CssColor = { ...color, name };
		dispatch('addNewColor', newColor);
	}
</script>

<div class="wrapper flex flex-col justify-end gap-4">
	<ColorPicker bind:this={colorPicker} bind:color bind:editable />
	<PaletteControls
		bind:editMode
		bind:selectedPaletteId
		bind:name
		{themePalettes}
		{custom}
		{selectedColor}
		{color}
		{error}
		on:addNewColor={() => addNewColor()}
		on:paletteSelected
	/>
</div>

<style lang="postcss">
	.wrapper {
		width: 393px;
	}
</style>
