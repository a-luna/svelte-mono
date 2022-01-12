<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import AddColorButton from '$lib/components/ThemeEditor/ColorEditor/AddColorButton.svelte';
	import EditPalettesButton from '$lib/components/ThemeEditor/ColorEditor/EditPalettesButton.svelte';
	import PaletteSelector from '$lib/components/ThemeEditor/ColorEditor/PaletteSelector.svelte';
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
	$: disabled = !custom && selectedColor?.hex === color?.hex;

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

	function addColorToPalette() {
		if (!name) {
			error = true;
			return;
		}
		dispatch('addColorToPalette', { ...color, name });
	}
</script>

<div class="color-editor">
	<div class="palette-selector">
		<PaletteSelector {themePalettes} bind:value={selectedPaletteId} disabled={editMode} on:paletteSelected />
		<EditPalettesButton color={'indigo'} on:click={() => (editMode = true)} disabled={editMode} />
	</div>
	<ColorPicker bind:this={colorPicker} bind:color bind:editable />
	<form class="palette-controls" autocomplete="off">
		<input type="text" id="color-name" placeholder="color name" class:error bind:value={name} {disabled} />
		<AddColorButton color={'indigo'} on:click={() => addColorToPalette()} disabled={!selectedPaletteId || editMode} />
	</form>
</div>

<style lang="postcss">
	.color-editor {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
		gap: 0.5rem;
		width: 393px;
	}

	.palette-selector {
		--select-bg-color: var(--indigo-hover-bg-color);
		--select-bg-color-hov: var(--indigo-hover-bg-color);
		--select-text-color: var(--indigo-fg-color);
		--select-text-color-no-selection: var(--gray4);
		--selected-item-bg-color: var(--indigo-bg-color);

		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
	}

	.palette-controls {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
	}

	input {
		flex-grow: 1;
		padding: 2.5px 8px;
		background-color: var(--indigo-bg-color);
		border: none;
		border-radius: 6px;
		outline: none;
		font-size: 0.875rem;
	}

	input[disabled] {
		border: none;
		outline: none;
		background-color: var(--white2);
		color: var(--light-gray3);
	}

	input:focus {
		background-color: var(--indigo-hover-bg-color);
		outline: 1px solid var(--indigo-fg-color);
	}

	input.error {
		outline: 1px solid var(--red2);
	}
</style>
