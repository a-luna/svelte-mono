<script lang="ts">
	import AddColorButton from '$lib/components/ComponentEditor/PaletteControls/AddColorButton.svelte';
	import DeselectColorButton from '$lib/components/ComponentEditor/PaletteControls/DeselectColorButton.svelte';
	import SelectedColor from '$lib/components/ComponentEditor/PaletteControls/SelectedColor.svelte';
	import SelectedPalette from '$lib/components/ComponentEditor/PaletteControls/SelectedPalette.svelte';
	import SetColorPickerButton from '$lib/components/ComponentEditor/PaletteControls/SetColorPickerButton.svelte';
	import UpdateColorButton from '$lib/components/ComponentEditor/PaletteControls/UpdateColorButton.svelte';
	import { getAppContext } from '$lib/stores';
	import { defaultColorPalette, type CssColor } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let gridStyle: string = '';
	let { picker, themeEditor, app } = getAppContext();

	interface PaletteControls {
		addColorToPalette: { color: CssColor };
		setColorPickerValue: { color: CssColor };
		updateThemeColor: { color: CssColor };
		deselectThemeColor: null;
	}
	const dispatch = createEventDispatcher<PaletteControls>();

	$: disableControls =
		$themeEditor?.userTheme?.palettes.length === 0 ||
		!$app?.selectedThemePalette ||
		$themeEditor?.editMode ||
		$app?.x11PalettesShown;
	$: selectedPalette =
		$themeEditor?.userTheme?.palettes.find((p) => p.id === $themeEditor?.selectedPaletteId) ?? defaultColorPalette;
</script>

<div class="palette-controls" style={gridStyle}>
	<span class="palette-name-label">selected palette</span>
	<SelectedPalette {selectedPalette} />
	<AddColorButton
		style={'grid-column: 2 / span 1; grid-row: 2 / span 1;'}
		on:click={() => dispatch('addColorToPalette', { color: $picker.color })}
		disabled={disableControls}
	/>

	<span class="theme-color-label">selected color</span>
	<SelectedColor />
	<div class="button-list">
		<SetColorPickerButton
			style={'grid-column: 2 / span 1; grid-row: 4 / span 1;'}
			on:click={() => dispatch('setColorPickerValue', { color: $themeEditor.selectedColor.color })}
			disabled={disableControls || !$themeEditor.colorSelected}
		/>
		<UpdateColorButton
			on:click={() => dispatch('updateThemeColor', { color: $picker.color })}
			disabled={disableControls || !$themeEditor.colorSelected}
		/>
		<DeselectColorButton
			on:click={() => dispatch('deselectThemeColor')}
			disabled={disableControls || !$themeEditor.colorSelected}
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
