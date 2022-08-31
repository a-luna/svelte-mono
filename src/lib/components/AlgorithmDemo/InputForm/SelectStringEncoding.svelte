<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { isStringEncoding } from '$lib/typeguards';
	import type { EncodingMachineStateStore, SelectMenuOption, StringEncoding } from '$lib/types';
	import type { DemoStore } from '$lib/types/DemoStore';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	export let width = '100%';
	export let fontSize = '0.875rem';
	export let value: StringEncoding = 'ascii';
	export let dropdownShown = false;
	export let inHelpDocs = false;
	let state: EncodingMachineStateStore;
	let demoState: Readable<DemoStore>;
	({ state, demoState } = getContext('demo'));

	const allOptions: SelectMenuOption[] = [
		{ label: 'ASCII', value: 'ascii', optionNumber: 1, active: false },
		{ label: 'UTF-8', value: 'utf8', optionNumber: 2, active: false },
		{ label: 'hex', value: 'hex', optionNumber: 3, active: false },
		{ label: 'bin', value: 'bin', optionNumber: 4, active: false },
	];
	const menuId = 'select-string-encoding';
	const menuLabel = '';

	$: options = inHelpDocs
		? allOptions
		: allOptions.filter((option) => $demoState.validInputEncodings.includes(option.value.toString()));
	$: bestMatch = inHelpDocs
		? 'ascii'
		: $demoState.validInputEncodings.length
		? $demoState.validInputEncodings.at(0)
		: null;
	$: value = isStringEncoding(bestMatch) ? bestMatch : null;
	$: noInputText = !$state.context.input.inputText || $state.context.input.inputText.length == 0;
	$: controlsDisabled = !$state.matches('inactive') && !$state.matches({ validateInputText: 'error' });
	$: disabled = inHelpDocs ? false : noInputText || controlsDisabled;

	const handleStringEncodingChanged = (stringEncoding: StringEncoding) => (value = stringEncoding);
</script>

<Select
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{width}
	{fontSize}
	{disabled}
	{dropdownShown}
	tooltip={'Select String (Input) Encoding'}
	flexStyles={'flex: 0 1 auto;'}
	on:changed={(e) => handleStringEncodingChanged(e.detail)}
/>
