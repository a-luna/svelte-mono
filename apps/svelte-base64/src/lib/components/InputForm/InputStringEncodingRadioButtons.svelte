<script lang="ts">
	import RadioButtons from '$lib/components/RadioButtons.svelte';
	import { getSimpleAppContext } from '$lib/stores/context';
	import { isEncoding, isStringEncoding } from '$lib/typeguards';
	import type { AppState } from '$lib/types';

	export let style: string;
	let buttonsInstance: RadioButtons;
	let state: AppState;

	({ state } = getSimpleAppContext());

	export const reset = () => buttonsInstance.reset();

	const inputEncodingOptionDefs = {
		title: 'Input Encoding',
		form: 'encode-form',
		groupId: 'input-encoding',
		groupName: 'inputEncoding',
		buttons: [
			{
				label: 'ASCII',
				id: 'inputEncoding1',
				value: 'ascii',
				checked: $state.encoderInput.inputEncoding === 'ascii',
			},
			{
				label: 'UTF-8',
				id: 'inputEncoding2',
				value: 'utf8',
				checked: $state.encoderInput.inputEncoding === 'utf8',
			},
			{
				label: 'Hex',
				id: 'inputEncoding3',
				value: 'hex',
				checked: $state.encoderInput.inputEncoding === 'hex',
			},
			{
				label: 'Binary',
				id: 'inputEncoding4',
				value: 'bin',
				checked: $state.encoderInput.inputEncoding === 'bin',
			},
		],
	};

	function handleRadioButtonSelectionChanged(
		e: CustomEvent<{ groupId: string; groupName: string; selectionId: string; value: string }>,
	) {
		const { value } = e.detail;
		if (isEncoding(value) && isStringEncoding(value)) {
			state.changeInputEncoding(value);
		}
	}
</script>

<RadioButtons
	bind:this={buttonsInstance}
	{style}
	{...inputEncodingOptionDefs}
	on:radioButtonSelectionChanged={handleRadioButtonSelectionChanged}
/>
