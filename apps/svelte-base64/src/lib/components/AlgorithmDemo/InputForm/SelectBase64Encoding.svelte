<script lang="ts">
	import { isBase64Encoding } from '$lib/typeguards';
	import type { Base64Encoding } from '$lib/types';
	import { InputSelectList } from '@a-luna/shared-ui';
	import type { SelectListOption } from '@a-luna/shared-ui/types';

	export let value: Base64Encoding = 'base64';
	export let disabled = false;
	export let dropdownShown = false;

	const options: SelectListOption[] = [
		{ label: 'base64', value: 'base64', optionNumber: 1, active: false },
		{ label: 'base64url', value: 'base64url', optionNumber: 2, active: false },
	];
	const menuId = 'select-base64-encoding';
	const menuLabel = '';

	function handleStringEncodingChanged(e: CustomEvent<{ selected: string | number }>) {
		const b64Encoding = e.detail.selected as unknown as string;
		if (isBase64Encoding(b64Encoding)) {
			value = b64Encoding;
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
	tooltip={'Select Base64 (Output) Encoding'}
	on:selectedOptionChanged={handleStringEncodingChanged}
/>
