<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import AddColorButton from '$lib/components/ThemeEditor/ColorEditor/AddColorButton.svelte';
	import EditPalettesButton from '$lib/components/ThemeEditor/ColorEditor/EditPalettesButton.svelte';
	import PaletteSelector from '$lib/components/ThemeEditor/ColorEditor/PaletteSelector.svelte';
	import type { ColorPalette, ComponentColor, CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editMode = false;
	export let themePalettes: ColorPalette[];
	export let selectedPaletteId: string;
	export let componentColor: ComponentColor;
	let name: string;
	let custom = false;
	let selectedColor: CssColor;
	let colorPicker: ColorPicker;
	let color: CssColor;
	let error = false;
	const dispatch = createEventDispatcher();

	$: editable = !editMode;
	$: disabled = (!custom && selectedColor?.hex === color?.hex) || editMode;
	$: selectorStyles = `--select-bg-color: var(--${componentColor}-hover-bg-color); --select-bg-color-hov: var(--${componentColor}-hover-bg-color); --select-text-color: var(--black2); --select-text-color-no-selection: var(--gray4); --selected-item-bg-color: var(--${componentColor}-bg-color); --select-bg-color-disabled: var(--white1)`;
	$: inputBgStyle = disabled ? 'var(--white1)' : `var(--${componentColor}-hover-bg-color)`;
	$: inputStyles = `outline: none; background-color: ${inputBgStyle};`;

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
	<div class="palette-selector" style={selectorStyles}>
		<PaletteSelector {themePalettes} bind:value={selectedPaletteId} disabled={editMode} on:paletteSelected />
		<EditPalettesButton color={componentColor} on:click={() => (editMode = true)} disabled={editMode} />
	</div>
	<ColorPicker bind:this={colorPicker} bind:color bind:editable />
	<form class="palette-controls" autocomplete="off">
		<input
			type="text"
			id="color-name"
			placeholder="color name"
			class:error
			{disabled}
			style={inputStyles}
			bind:value={name}
		/>
		<AddColorButton
			color={componentColor}
			on:click={() => addColorToPalette()}
			disabled={!selectedPaletteId || editMode}
		/>
	</form>
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

	.palette-controls {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
	}

	input {
		flex-grow: 1;
		padding: 2.5px 8px;
		border: none;
		border-radius: 6px;
		outline: none;
		font-size: 0.875rem;
	}

	input[disabled] {
		border: none;
		outline: none;
		background-color: var(--light-gray1);
		color: var(--gray4);
	}

	input:focus {
		outline: none;
	}

	input.error {
		outline: 1px solid var(--red2);
	}
</style>
