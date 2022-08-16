<script lang="ts">
	import Select from '$lib/components/Shared/Select/Select.svelte';
	import type { ColorSpace, SelectMenuOption } from '$lib/types';

	export let width = '100%';
	export let fontSize: string = '0.875rem';
	export let value: string = 'rgb';
	export let disabled = false;

	const options: SelectMenuOption[] = [
		{ label: 'RGB', value: 'rgb', optionNumber: 1, active: false },
		{ label: 'RGBA', value: 'rgba', optionNumber: 2, active: false },
		{ label: 'HSL', value: 'hsl', optionNumber: 3, active: false },
		{ label: 'HSLA', value: 'hsla', optionNumber: 4, active: false },
	];
	const menuId = 'select-color-space';
	const menuLabel = '';

	function handleColorSpaceChanged(colorSpace: ColorSpace) {
		value = colorSpace;
	}
</script>

<Select
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{width}
	{fontSize}
	{disabled}
	on:changed={(e) => handleColorSpaceChanged(e.detail)}
/>
