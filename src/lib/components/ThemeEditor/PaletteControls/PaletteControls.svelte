<script lang="ts">
	import AddColorButton from '$lib/components/ThemeEditor/PaletteControls/AddColorButton.svelte';
	import EditPalettesButton from '$lib/components/ThemeEditor/PaletteControls/EditPalettesButton.svelte';
	import PaletteSelector from '$lib/components/ThemeEditor/PaletteControls/PaletteSelector.svelte';
	import type { ColorPalette, CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editMode = false;
	export let themePalettes: ColorPalette[];
	export let selectedPaletteId: string;
	export let name: string;
	export let custom = false;
	export let selectedColor: CssColor;
	export let color: CssColor;
	export let error = false;
	const dispatch = createEventDispatcher();

	$: disabled = !custom && selectedColor?.hex === color?.hex;
</script>

<div class="palette-controls">
	<PaletteSelector {themePalettes} bind:value={selectedPaletteId} on:paletteSelected />
	<EditPalettesButton color={'green'} on:click={() => (editMode = true)} disabled={editMode} />
	<input type="text" id="color-name" placeholder="color name" class:error bind:value={name} {disabled} />
	<AddColorButton color={'green'} on:click={() => dispatch('addNewColor')} disabled={!selectedPaletteId || editMode} />
</div>

<style lang="postcss">
	.palette-controls {
		--select-bg-color: var(--green-bg-color);
		--select-bg-color-hov: var(--green-hover-bg-color);
		--select-text-color: var(--green-fg-color);
		--select-text-color-no-selection: var(--gray4);
		--selected-item-bg-color: var(--green-active-fg-color);

		display: grid;
		grid-template-columns: auto 126px;
		margin: 0 0.25rem;
		gap: 0.25rem 0.5rem;
	}

	input {
		flex-grow: 1;
		padding: 2.5px 8px;
		background-color: var(--green-bg-color);
		border: none;
		border-radius: 6px;
		font-size: 0.875rem;
	}

	input[disabled] {
		border: none;
		outline: none;
		background-color: var(--white2);
		color: var(--light-gray3);
	}

	input:focus {
		background-color: var(--green-bg-color);
		outline: 1px solid var(--green-fg-color);
	}

	input.error {
		outline: 1px solid var(--red2);
	}
</style>
