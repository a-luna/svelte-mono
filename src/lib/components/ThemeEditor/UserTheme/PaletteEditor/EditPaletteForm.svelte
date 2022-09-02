<script lang="ts">
	import ComponentColorSelector from '$lib/components/Shared/ComponentColorSelector/ComponentColorSelector.svelte';
	import DeletePaletteButton from '$lib/components/ThemeEditor/UserTheme/PaletteEditor/DeletePaletteButton.svelte';
	import type { ColorPalette } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let palette: ColorPalette;
	export let paletteNumber: number;
	export let disabled = false;
	let inputElement: HTMLInputElement;
	const dispatch = createEventDispatcher();

	$: numberStyles = `color: var(--${palette.componentColor}-fg-color); background-color: var(--${palette.componentColor}-bg-color); border-top: 1.5px solid var(--${palette.componentColor}-fg-color); border-right: none; border-bottom: 1.5px solid var(--${palette.componentColor}-fg-color); border-left: 1.5px solid var(--${palette.componentColor}-fg-color)`;
	$: borderStyle = `border: 1.5px solid var(--${palette.componentColor}-fg-color)`;

	const getToolTip = () =>
		disabled ? 'Your theme must contain at least one color palette' : `Delete Palette #${paletteNumber}`;

	function applyFocusStyles() {
		inputElement.style.border = `1.5px solid var(--${palette.componentColor}-active-fg-color)`;
	}

	function removeFocusStyles() {
		inputElement.style.border = `1.5px solid var(--${palette.componentColor}-fg-color)`;
	}
</script>

<div transition:slide|local class="edit-palette">
	<span class="palette-number" style={numberStyles}>{paletteNumber}</span>
	<input
		bind:this={inputElement}
		type="text"
		placeholder="palette name"
		bind:value={palette.displayName}
		on:focus={() => applyFocusStyles()}
		on:blur={() => removeFocusStyles()}
		style={borderStyle}
	/>
	<ComponentColorSelector bind:value={palette.componentColor} />
	<DeletePaletteButton
		color={palette.componentColor}
		tooltip={getToolTip()}
		on:click={() => dispatch('deletePalette', palette.id)}
		{disabled}
	/>
</div>

<style lang="postcss">
	.edit-palette {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: 100%;
	}

	.palette-number {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.5;
		margin: 0;
		padding: 3px 6px;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	input {
		flex-grow: 1;
		padding: 3px 8px;
		margin: 0 6px 0 0;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		font-size: 0.875rem;
		outline: none;
	}

	input:focus {
		outline: none;
	}
</style>
