<script lang="ts">
	import PushableButton from '$lib/components/Buttons/PushableButton.svelte';
	import { alert } from '$lib/stores/alert';
	import { state } from '$lib/stores/state';
	import type { ButtonColor } from '$lib/types';
	import { focusInput } from '$lib/util';

	let switchModeButtonColor: ButtonColor;
	let errorMessage = '';
	let inputText: string;
	let buttonColor: ButtonColor;

	$: formTitle = $state.mode === 'encode' ? 'Base64 Encoder' : 'Base64 Decoder';
	$: switchModeButtonColor = $state.mode === 'encode' ? 'teal' : 'green';
	$: inputStringIsValid =
		$state.mode === 'encode'
			? $state.encoderInput.validationResult.success
			: $state.decoderInput.validationResult.success;
	$: buttonColor = inputStringIsValid ? ($state.mode === 'encode' ? 'teal' : 'green') : 'red';
	$: buttonLabel = $state.mode === 'encode' ? 'Encode' : 'Decode';
	$: errorMessage =
		$state.mode === 'encode'
			? $state.encoderInput.validationResult?.error?.message
			: $state.decoderInput.validationResult?.error?.message;
	$: state.setInputText(inputText);
	$: if (errorMessage) $alert = errorMessage;

	function toggleMode() {
		state.reset();
		if ($state.mode === 'encode') {
			$state.mode = 'decode';
			state.setInputEncoding($state.decoderInput.inputEncoding);
		} else {
			$state.mode = 'encode';
			state.setInputEncoding($state.encoderInput.inputEncoding);
			state.setOutputEncoding($state.encoderInput.outputEncoding);
		}
	}

	function handleKeyPress(key: string) {
		if (key === 'Enter') {
			submitForm();
		}
	}

	function submitForm() {
		if (inputStringIsValid) {
			state.execute();
		}
	}
</script>

<div class="input-form" class:error={!inputStringIsValid}>
	<div class="form-title">
		{formTitle}
	</div>
	<PushableButton size={'xs'} color={switchModeButtonColor} on:click={() => toggleMode()}>Switch Mode</PushableButton>
	<PushableButton size={'xs'} color={'gray'} on:click={() => state.reset()}>Reset</PushableButton>
	<input type="text" bind:value={inputText} on:keydown={(e) => handleKeyPress(e.key)} use:focusInput />
	<PushableButton size={'xs'} color={buttonColor} on:click={() => submitForm()}>{buttonLabel}</PushableButton>
</div>

<style lang="postcss">
	.input-form {
		display: grid;
		grid-template-columns: repeat(3, auto);
		grid-template-rows: 33px 39px;
		grid-auto-flow: row;
		align-items: center;
		grid-gap: 1rem 0.75rem;
	}
	.form-title {
		color: var(--pri-color);
		font-size: 1.8rem;
		font-weight: 400;
		text-align: center;
		letter-spacing: 1.5px;
		margin: 0 5px 0 0;
		line-height: 1;
		text-shadow: 2px 2px var(--sec-color), 1.75px 1.75px var(--sec-color), 1.5px 1.5px var(--sec-color),
			1.25px 1.25px var(--sec-color), 1px 1px var(--sec-color), 0.75px 0.75px var(--sec-color),
			0.5px 0.5px var(--sec-color), 0.25px 0.25px var(--sec-color);
	}
	input {
		grid-column: 1 / span 2;
		align-self: end;
		font-size: 1rem;
		color: var(--pri-color);
		background-color: var(--page-bg-color);
		outline: 1px solid var(--pri-color);
		border: none;
		border-radius: 6px;
	}
	input:focus {
		outline: 1px solid var(--pri-color);
	}
	.error input {
		outline: 1px solid var(--red4);
		color: var(--red4);
	}
</style>
