<script lang="ts">
	import { isStringEncoding } from '$lib/typeguards';
	import type { StringEncoding } from '$lib/types';
	import { InputSelectList } from '../../../../../node_modules/@a-luna/shared-ui';
	import type { SelectListOption } from '../../../../../node_modules/@a-luna/shared-ui/types';

	export let value: StringEncoding = 'ascii';
	export let disabled = false;
	export let dropdownShown = false;

	const options: SelectListOption[] = [
		{ label: 'ASCII', value: 'ascii', optionNumber: 1, active: false },
		{ label: 'UTF-8', value: 'utf8', optionNumber: 2, active: false },
		{ label: 'hex', value: 'hex', optionNumber: 3, active: false },
		{ label: 'bin', value: 'bin', optionNumber: 4, active: false },
	];
	const menuId = 'select-string-encoding';
	const menuLabel = '';

	function handleStringEncodingChanged(e: CustomEvent<{ selected: string | number }>) {
		const stringEncoding = e.detail.selected as unknown as string;
		if (isStringEncoding(stringEncoding)) {
			value = stringEncoding;
		}
	}
</script>

<InputSelectList
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	{dropdownShown}
	tooltip={'Select String (Input) Encoding'}
	on:selectedOptionChanged={handleStringEncodingChanged}
/>
