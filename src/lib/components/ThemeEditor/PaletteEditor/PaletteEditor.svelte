<script lang="ts">
	import AddPaletteButton from '$lib/components/ThemeEditor/PaletteEditor/AddPaletteButton.svelte';
	import DeletePaletteButton from '$lib/components/ThemeEditor/PaletteEditor/DeletePaletteButton.svelte';
	import FinishEditingButton from '$lib/components/ThemeEditor/PaletteEditor/FinishEditingButton.svelte';
	import { getRandomHexString } from '$lib/helpers';
	import type { ColorPalette } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let themePalettes: ColorPalette[] = [];
	const dispatch = createEventDispatcher();

	$: disabled = themePalettes.length === 1;

	const getToolTip = (paletteNumber: number) =>
		disabled ? 'Your theme must contain at least one color palette' : `Delete Palette #${paletteNumber}`;

	const createPalette = () =>
		(themePalettes = [...themePalettes, { id: getRandomHexString(4), paletteName: 'my custom palette', colors: [] }]);
	function deletePalette(id: string) {
		themePalettes = [...themePalettes.filter((p) => p.id !== id)];
		dispatch('paletteDeleted', id);
	}
</script>

<div class="flex flex-col flex-nowrap items-end justify-end gap-2">
	<FinishEditingButton color={'yellow'} on:click={() => dispatch('exitEditMode')} />
	{#each themePalettes as palette, i (palette.id)}
		<div transition:slide|local class="flex flex-row flex-nowrap items-center">
			<span class="palette-number">{i + 1}</span>
			<input type="text" placeholder="palette name" bind:value={palette.paletteName} />
			<DeletePaletteButton
				color={'yellow'}
				tooltip={getToolTip(i)}
				on:click={() => deletePalette(palette.id)}
				{disabled}
			/>
		</div>
	{/each}
	<AddPaletteButton color={'yellow'} on:click={() => createPalette()} />
</div>

<style lang="postcss">
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
		background-color: var(--white2);
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
