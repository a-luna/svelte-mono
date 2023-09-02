<script lang="ts">
	import type { ColorFormat, SelectListOption } from '@a-luna/shared-ui';
	import { InputSelectList } from '@a-luna/shared-ui';
	import { isColorFormat } from '@a-luna/shared-ui/typeguards';
	import { createEventDispatcher } from 'svelte';

	export let value: ColorFormat = 'rgb';
	export let disabled = false;
	export let dropdownShown = false;
	const colorFormatChangedDispatch = createEventDispatcher<{ colorFormatChanged: { colorFormat: ColorFormat } }>();

	const options: SelectListOption[] = [
		{ label: 'RGB', value: 'rgb', optionNumber: 1, active: false },
		{ label: 'HSL', value: 'hsl', optionNumber: 2, active: false },
		{ label: 'OKHSL', value: 'okhsl', optionNumber: 3, active: false },
		{ label: 'LAB', value: 'lab', optionNumber: 4, active: false },
		{ label: 'OKLAB', value: 'oklab', optionNumber: 5, active: false },
		{ label: 'LCH', value: 'lch', optionNumber: 6, active: false },
		{ label: 'OKLCH', value: 'oklch', optionNumber: 7, active: false },
	];
	const menuId = 'select-color-format';
	const menuLabel = '';

	function handleColorFormatChanged(e: CustomEvent<{ selected: string | number }>) {
		const colorFormat = e.detail.selected as unknown as string;
		if (isColorFormat(colorFormat)) {
			value = colorFormat;
			colorFormatChangedDispatch('colorFormatChanged', { colorFormat: colorFormat });
		}
	}
</script>

<InputSelectList
	{menuId}
	{menuLabel}
	{options}
	{disabled}
	{dropdownShown}
	selectedValue={value}
	tooltip={'Select Color Space'}
	on:selectedOptionChanged={handleColorFormatChanged}
/>
