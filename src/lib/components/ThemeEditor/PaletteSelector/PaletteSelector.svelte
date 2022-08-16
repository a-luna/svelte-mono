<script lang="ts">
	import Select from '$lib/components/Shared/Select/Select.svelte';
	import PaletteOptions from '$lib/components/ThemeEditor/PaletteSelector/PaletteOptions.svelte';
	import type { ColorPalette, SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let themeColorPalettes: ColorPalette[];
	export let width = '100%';
	export let fontSize: string = '0.875rem';
	export let value: string = themeColorPalettes.length > 0 ? themeColorPalettes[0].id : null;
	export let disabled = false;
	let options: SelectMenuOption[];
	let selectedPalette: ColorPalette;
	let selectComponent: Select;
	const dispatch = createEventDispatcher();

	$: options = themeColorPalettes?.map((p, i) => ({
		label: p.displayName,
		value: p.id,
		optionNumber: i + 1,
		active: false,
	}));

	$: if (value) selectedPalette = themeColorPalettes.find((p) => p.id === value);
	$: enabled = themeColorPalettes.length > 0 && !disabled;

	const menuId = 'select-theme-palette';
	const menuLabel = 'select theme palette';

	function handleThemePaletteChanged(paletteId: string) {
		value = paletteId;
		selectComponent.dropdownShown = false;
		dispatch('paletteSelected', paletteId);
	}
</script>

<Select
	bind:this={selectComponent}
	flexStyles={'flex: 0 1 auto;'}
	buttonHeight={'30px'}
	buttonPadding={'7px 6px'}
	disabled={!enabled}
	selectedValue={value}
	{menuLabel}
	{options}
	{menuId}
	{width}
	{fontSize}
	on:changed={(e) => handleThemePaletteChanged(e.detail)}
>
	<svelte:fragment slot="options">
		<PaletteOptions
			{options}
			{themeColorPalettes}
			{menuId}
			{fontSize}
			on:changed={(e) => handleThemePaletteChanged(e.detail)}
		/>
	</svelte:fragment>

	<svelte:fragment slot="selectedValue">
		{#if selectedPalette}
			<div class="option-wrapper">
				<div class="color-swatch" style="background-color: var(--{selectedPalette.componentColor}-fg-color)" />
				<span class="palette-name">{selectedPalette.displayName}</span>
			</div>
		{:else}
			<div class="option-wrapper">
				<!-- <div class="color-swatch" style="background-color: inherit" /> -->
				<span>{@html '&nbsp;'}</span>
			</div>
		{/if}
	</svelte:fragment>
</Select>

<style lang="postcss">
	.option-wrapper {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
	}

	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
	.palette-name {
		text-overflow: ellipsis;
	}
</style>
