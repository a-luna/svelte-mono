<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import PaletteOptions from '$lib/components/ThemeEditor/ColorEditor/PaletteSelector/PaletteOptions.svelte';
	import type { ColorPalette, SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let themeColorPalettes: ColorPalette[];
	export let width = '100%';
	export let fontSize: string = '0.875rem';
	export let value: string = themeColorPalettes[0].id;
	export let disabled = false;
	let options: SelectMenuOption[];
	let selectedPalette: ColorPalette;
	let selectComponent: Select;
	const dispatch = createEventDispatcher();

	$: options = themeColorPalettes?.map((p, i) => ({
		label: p.name,
		value: p.id,
		optionNumber: i + 1,
		active: false,
	}));

	$: if (value) selectedPalette = themeColorPalettes.find((p) => p.id === value);

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
	flexStyles={'flex: 1;'}
	buttonHeight={'30px'}
	buttonPadding={'7px 6px'}
	{menuLabel}
	{disabled}
	{options}
	selectedValue={value}
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
		<div class="option-wrapper">
			<div class="color-swatch" style="background-color: var(--{selectedPalette.componentColor}-fg-color)" />
			<span>{selectedPalette.name}</span>
		</div>
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
</style>
