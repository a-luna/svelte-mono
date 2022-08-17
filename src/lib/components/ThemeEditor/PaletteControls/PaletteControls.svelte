<script lang="ts">
	import AddColorButton from '$lib/components/ThemeEditor/PaletteControls/AddColorButton.svelte';
	import SelectedPalette from '$lib/components/ThemeEditor/PaletteControls/SelectedPalette.svelte';
	import { getAppStore, getColorPickerStore, getThemeEditorStore } from '$lib/context';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

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
	<SelectedPalette bind:selectedPalette />
	<AddColorButton
		color={componentColor}
		on:click={() => dispatch('addColorToPalette', $colorPickerState.color)}
		disabled={disableControls}
	/>
</div>

<style lang="postcss">
	.palette-controls {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		width: 367px;
	}
</style>
