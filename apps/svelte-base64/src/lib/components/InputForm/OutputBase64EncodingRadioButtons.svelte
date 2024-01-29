<script lang="ts">
	import RadioButtons from '$lib/components/RadioButtons.svelte';
	import { getSimpleAppContext } from '$lib/stores/context';
	import { isBase64Encoding, isEncoding } from '$lib/typeguards';
	import type { AppState } from '$lib/types';

	export let style: string;
	let buttonsInstance: RadioButtons;

	let state: AppState;
	({ state } = getSimpleAppContext());

	export const reset = () => buttonsInstance.reset();

	const outputEncodingOptionDefs = {
		title: 'Output Encoding',
		form: 'encode-form',
		groupId: 'output-base64-encoding',
		groupName: 'base64EncodingOut',
		buttons: [
			{
				label: 'base64',
				id: 'base64EncodingOut1',
				value: 'base64',
				checked: $state.encoderInput.outputEncoding === 'base64',
			},
			{
				label: 'base64url',
				id: 'base64EncodingOut2',
				value: 'base64url',
				checked: $state.encoderInput.outputEncoding === 'base64url',
			},
		],
	};

	function handleRadioButtonSelectionChanged(
		e: CustomEvent<{ groupId: string; groupName: string; selectionId: string; value: string }>,
	) {
		const { value } = e.detail;
		if (isEncoding(value) && isBase64Encoding(value)) {
			state.changeOutputEncoding(value);
		}
	}
</script>

<RadioButtons
	bind:this={buttonsInstance}
	{style}
	{...outputEncodingOptionDefs}
	on:radioButtonSelectionChanged={handleRadioButtonSelectionChanged}
/>
