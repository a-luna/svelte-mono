<script lang="ts">
	import AddColorButton from '$lib/components/ThemeEditor/PaletteControls/AddColorButton.svelte';
	import SelectedPalette from '$lib/components/ThemeEditor/PaletteControls/SelectedPalette.svelte';
	import { getAppStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let app = getAppStore(editorId);
	const dispatch = createEventDispatcher();

	$: disableControls =
		$app.themeColorPalettes.length === 0 ||
		!$app.themeEditorState.selectedPalette ||
		$app.themeEditorState.editMode ||
		$app.themeEditorState.showX11Palettes;
</script>

<div class="palette-controls">
	<SelectedPalette {editorId} />
	<AddColorButton
		color={componentColor}
		on:click={() => dispatch('addColorToPalette', $app.colorPickerState.color)}
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
