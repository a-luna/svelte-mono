<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import AddColorButton from '$lib/components/ThemeEditor/ColorEditor/AddColorButton.svelte';
	import PaletteSelector from '$lib/components/ThemeEditor/ColorEditor/PaletteSelector.svelte';
	import type { ColorPalette, ColorPickerState, ComponentColor, CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let editMode = false;
	export let themeColorPalettes: ColorPalette[];
	export let selectedPaletteId: string;
	export let componentColor: ComponentColor;
	export let selectedColor: CssColor;
	export let colorPickerState: Writable<ColorPickerState>;
	let colorPicker: ColorPicker;
	const dispatch = createEventDispatcher();

	$: if (selectedColor && colorPicker) colorPicker.setColor(selectedColor);
	$: editable = !editMode;
	$: selectorStyles = `--select-bg-color: var(--${componentColor}-hover-bg-color); --select-bg-color-hov: var(--${componentColor}-hover-bg-color); --select-text-color: var(--black2); --select-text-color-no-selection: var(--gray4); --selected-item-bg-color: var(--${componentColor}-bg-color); --select-bg-color-disabled: var(--white1)`;
</script>

<div class="color-editor">
	<ColorPicker bind:this={colorPicker} bind:state={colorPickerState} bind:editable />
	<div class="palette-selector" style={selectorStyles}>
		<PaletteSelector {themeColorPalettes} bind:value={selectedPaletteId} disabled={editMode} on:paletteSelected />
		<AddColorButton
			color={componentColor}
			on:click={() => dispatch('addColorToPalette', $colorPickerState.color)}
			disabled={!selectedPaletteId || editMode}
		/>
	</div>
</div>

<style lang="postcss">
	.color-editor {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
		gap: 0.5rem;
		width: 360px;
	}

	.palette-selector {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
	}
</style>
