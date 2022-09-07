<script lang="ts">
	import AddColorButton from '$lib/components/ThemeEditor/PaletteControls/AddColorButton.svelte';
	import DeselectColorButton from '$lib/components/ThemeEditor/PaletteControls/DeselectColorButton.svelte';
	import SelectedColor from '$lib/components/ThemeEditor/PaletteControls/SelectedColor.svelte';
	import SelectedPalette from '$lib/components/ThemeEditor/PaletteControls/SelectedPalette.svelte';
	import UpdateColorButton from '$lib/components/ThemeEditor/PaletteControls/UpdateColorButton.svelte';
	import { getAppStore, getColorPickerStore, getThemeEditorStore } from '$lib/context';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import SetColorPickerButton from './SetColorPickerButton.svelte';

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

	<span class="theme-color-label">selected color</span>
	<SelectedColor {editorId} />
	<div class="button-list">
		<SetColorPickerButton
			color={componentColor}
			style={'grid-column: 2 /  span 1; grid-row: 4 /  span 1;'}
			on:click={() => dispatch('setColorPickerValue', $state.selectedColor.color)}
			disabled={disableControls || !$state.colorSelected}
		/>
		<UpdateColorButton
			color={componentColor}
			on:click={() => dispatch('updateThemeColor', $colorPickerState.color)}
			disabled={disableControls || !$state.colorSelected}
		/>
		<DeselectColorButton
			color={componentColor}
			on:click={() => dispatch('deselectThemeColor')}
			disabled={disableControls || !$state.colorSelected}
		/>
	</div>
</div>

<style lang="postcss">
	.palette-controls {
		display: grid;
		grid-template-columns: 1fr auto auto auto;
		grid-template-rows: auto auto auto auto;
		row-gap: 0.25rem;
		column-gap: 0.5rem;
	}
	.palette-name-label,
	.theme-color-label {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1px;
	}
	.palette-name-label {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.theme-color-label {
		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.button-list {
		display: flex;
		gap: 0.25rem;

		grid-column: 2 / span 3;
		grid-row: 4 / span 1;
	}
</style>
