<script lang="ts">
	import DeletePaletteButton from '$lib/components/ThemeEditor/PaletteEditor/DeletePaletteButton.svelte';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import type { ColorPalette } from '$lib/types';

	export let palette: ColorPalette;
	export let paletteNumber: number;
	export let disabled = false;
	const dispatch = createEventDispatcher();

	const getToolTip = () =>
		disabled ? 'Your theme must contain at least one color palette' : `Delete Palette #${paletteNumber}`;
</script>

<div transition:slide|local class="edit-palette">
	<span class="palette-number">{paletteNumber}</span>
	<input type="text" placeholder="palette name" bind:value={palette.paletteName} />
	<DeletePaletteButton
		color={'yellow'}
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
	}

	.palette-number {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.5;
		margin: 0;
		padding: 3px 6px;
		color: var(--yellow-fg-color);
		background-color: var(--yellow-bg-color);
		border-top: 1.5px solid var(--yellow-fg-color);
		border-right: none;
		border-bottom: 1.5px solid var(--yellow-fg-color);
		border-left: 1.5px solid var(--yellow-fg-color);
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	input {
		flex-grow: 1;
		padding: 3px 8px;
		margin: 0 4px 0 0;
		background-color: var(--yellow-hover-bg-color);
		border: 1.5px solid var(--yellow-fg-color);
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		font-size: 0.875rem;
		outline: none;
	}

	input:focus {
		border: 1.5px solid var(--yellow-active-fg-color);
		outline: none;
	}
</style>
