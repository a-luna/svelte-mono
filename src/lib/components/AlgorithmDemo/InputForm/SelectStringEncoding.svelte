<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { getAppContext } from '$lib/stores/context';
	import { isStringEncoding } from '$lib/typeguards';
	import type { SelectMenuOption, StringEncoding } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let width = '100%';
	export let fontSize = '0.875rem';
	export let value: StringEncoding = 'ascii';
	export let inputText: string = '';
	export let dropdownShown = false;
	export let inHelpDocs = false;
	let noInputText = true;
	let options: SelectMenuOption[] = [];
	let bestMatch: string = '';
	const dispatch = createEventDispatcher();
	const { state, demoState } = getAppContext();

	const allOptions: SelectMenuOption[] = [
		{ label: 'ASCII', value: 'ascii', optionNumber: 1, active: false },
		{ label: 'UTF-8', value: 'utf8', optionNumber: 2, active: false },
		{ label: 'hex', value: 'hex', optionNumber: 3, active: false },
		{ label: 'bin', value: 'bin', optionNumber: 4, active: false },
	];
	const menuId = 'select-string-encoding';
	const menuLabel = '';

	$: {
		noInputText = !inputText || inputText.length === 0;
		options =
			inHelpDocs || $demoState.test
				? allOptions
				: noInputText
				? [allOptions[1]]
				: allOptions.filter((option) => $demoState.validInputEncodings.includes(option.value.toString()));
		bestMatch = inHelpDocs
			? 'ascii'
			: noInputText || !$demoState.validInputEncodings.length
			? 'utf8'
			: $demoState.validInputEncodings.at(0);
		value = isStringEncoding(bestMatch) ? bestMatch : null;
		dispatch('inputTextEncodingChanged', value);
	}
	$: controlsDisabled = !$state.matches('inactive') && !$state.matches({ validateInputText: 'error' });
	$: disabled = inHelpDocs || $demoState.test ? false : noInputText || controlsDisabled;

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
