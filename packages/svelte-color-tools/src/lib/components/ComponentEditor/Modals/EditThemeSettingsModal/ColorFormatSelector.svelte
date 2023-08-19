<script lang="ts">
	import { InputSelectList } from '@a-luna/shared-ui/components';
	import type { ColorFormat, SelectListOption } from '@a-luna/shared-ui/types';

	export let value: ColorFormat = 'hsl';
	export let disabled = false;
	const menuId = 'css-color-format';
	const menuLabel = '';

	const options: SelectListOption[] = [
		{ label: 'HSL', value: 'hsl', optionNumber: 1, active: false },
		{ label: 'RGB', value: 'rgb', optionNumber: 2, active: false },
		{ label: 'Hex', value: 'hex', optionNumber: 3, active: false },
	];

	function handleColorFormatChanged(e: CustomEvent<{ selectedValue: ColorFormat }>) {
		const { selectedValue } = e.detail;
		value = selectedValue;
	}
</script>

<InputSelectList
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	on:changed={handleColorFormatChanged}
/>
