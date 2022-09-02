<script lang="ts">
	import AddColorButton from '$lib/components/ThemeEditor/PaletteControls/AddColorButton.svelte';
	import SelectedPalette from '$lib/components/ThemeEditor/PaletteControls/SelectedPalette.svelte';
	import { getAppStore, getColorPickerStore, getThemeEditorStore } from '$lib/context';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import UpdateColorButton from './UpdateColorButton.svelte';

	export let editorId: string;
	export let pickerId: string;
	export let componentColor: ComponentColor;
	export let selectedPalette: ColorPalette;
	let state = getThemeEditorStore(editorId);
	let app = getAppStore(editorId);
	let colorPickerState = getColorPickerStore(pickerId);
	const dispatch = createEventDispatcher();

	$: disableControls =
		$state.userTheme.palettes.length === 0 || !$app?.selectedThemePalette || $state.editMode || $app?.x11PalettesShown;
</script>

<div class="palette-controls">
	<span class="palette-name-label">selected palette</span>
	<SelectedPalette bind:selectedPalette />
	<AddColorButton
		color={componentColor}
		style={'grid-column: 2 /  span 1; grid-row: 2 /  span 1;'}
		on:click={() => dispatch('addColorToPalette', $colorPickerState.color)}
		disabled={disableControls}
	/>
	<UpdateColorButton
		color={componentColor}
		style={'grid-column: 3 /  span 1; grid-row: 2 /  span 1;'}
		on:click={() => dispatch('updateThemeColor', $colorPickerState.color)}
		disabled={disableControls || !$state.colorSelected}
	/>
</div>

<style lang="postcss">
	.palette-controls {
		display: grid;
		grid-template-columns: 1fr auto auto;
		grid-template-rows: auto auto;
		column-gap: 0.5rem;
	}
	.palette-name-label {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1px;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
</style>
