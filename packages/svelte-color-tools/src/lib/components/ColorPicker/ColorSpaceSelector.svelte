<script lang="ts">
	import type { ColorFormat, SelectListOption } from '@a-luna/shared-ui';
	import { InputSelectList } from '@a-luna/shared-ui';
	import { isColorFormat } from '@a-luna/shared-ui/typeguards';

	export let value: ColorFormat = 'rgb';
	export let disabled = false;
	export let dropdownShown = false;

	const options: SelectListOption[] = [
		{ label: 'RGB', value: 'rgb', optionNumber: 1, active: false },
		{ label: 'HSL', value: 'hsl', optionNumber: 2, active: false },
	];
	const menuId = 'select-color-space';
	const menuLabel = '';

	function handleColorSpaceChanged(e: CustomEvent<{ selected: string | number }>) {
		const colorFormat = e.detail.selected as unknown as string;
		if (isColorFormat(colorFormat)) {
			value = colorFormat;
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
	on:selectedOptionChanged={handleColorSpaceChanged}
/>
