<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { ColorPalette, SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let themeColorPalettes: ColorPalette[];
	export let width = '100%';
	export let fontSize: string = '0.875rem';
	export let value: string = themeColorPalettes[0].id;
	export let disabled = false;
	let options: SelectMenuOption[];
	const dispatch = createEventDispatcher();

	$: options = themeColorPalettes?.map((p, i) => ({
		label: p.name,
		value: p.id,
		optionNumber: i + 1,
		active: false,
	}));

	const menuId = 'select-theme-palette';
	const menuLabel = 'select theme palette';

	function handleThemePaletteChanged(paletteId: string) {
		value = paletteId;
		dispatch('paletteSelected', paletteId);
	}
</script>

<Select
	flexStyles={'flex-grow'}
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
/>
