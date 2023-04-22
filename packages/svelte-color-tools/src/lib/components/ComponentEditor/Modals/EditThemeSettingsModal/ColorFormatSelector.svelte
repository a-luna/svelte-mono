<script lang="ts">
	import Select from '$lib/components/Shared/Select/Select.svelte';
	import type { ColorFormat, SelectMenuOption } from '$lib/types';

	export let value: string = 'hsl';
	export let disabled = false;

	const options: SelectMenuOption[] = [
		{ label: 'HSL', value: 'hsl', optionNumber: 1, active: false },
		{ label: 'RGB', value: 'rgb', optionNumber: 2, active: false },
		{ label: 'Hex', value: 'hex', optionNumber: 3, active: false },
	];
	const menuId = 'css-color-format';
	const menuLabel = '';

	function handleColorFormatChanged(colorFormat: ColorFormat) {
		value = colorFormat;
	}
</script>

<Select
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	on:changed={(e) => handleColorFormatChanged(e.detail)}
/>
