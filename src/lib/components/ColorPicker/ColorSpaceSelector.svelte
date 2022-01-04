<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { ColorSpace, SelectMenuOption } from '$lib/types';

	export let width = '100%';
	export let fontSize: string = '0.875rem';
	export let value: string = 'rgb';

	const options: SelectMenuOption[] = [
		{ text: 'RGB', value: 'rgb', optionNumber: 1, active: false },
		{ text: 'RGBA', value: 'rgba', optionNumber: 2, active: false },
		{ text: 'HSL', value: 'hsl', optionNumber: 3, active: false },
		{ text: 'HSLA', value: 'hsla', optionNumber: 4, active: false }
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
	on:changed={(e) => handleColorSpaceChanged(e.detail)}
/>
