<script lang="ts">
	import PushableButton from '$lib/components/PushableButton.svelte';
	import { alert } from '$lib/stores/alert';
	import { app } from '$lib/stores/app';
	import { state } from '$lib/stores/state';
	import { focusInput } from '$lib/util';

	let inputText: string;
	let inputTextElement: HTMLInputElement;

	$: state.setInputText(inputText);
	$: if ($state.resetPerformed) {
		inputText = '';
		$state.resetPerformed = false;
	}

	function toggleMode() {
		if ($app.encoderMode) {
			state.changeMode('decode');
			state.setInputEncoding($state.decoderInput.inputEncoding);
		} else {
			state.changeMode('encode');
			state.setInputEncoding($state.encoderInput.inputEncoding);
			state.setOutputEncoding($state.encoderInput.outputEncoding);
		}
		inputTextElement.focus();
	}

	function handleKeyPress(key: string) {
		if (key === 'Enter') {
			submitForm();
		}
	}

	function submitForm() {
		if ($app.inputStringIsValid) {
			state.execute();
		} else if ($app.errorMessage) {
			$alert = $app.errorMessage;
		}
	}
</script>

<div class="input-form" class:error={!$app.inputStringIsValid}>
	<span class="form-title">
		{$app.formTitle}
	</span>
	<PushableButton size={'xs'} color={$app.switchModeButtonColor} on:click={() => toggleMode()}
		>Switch Mode</PushableButton
	>
	<PushableButton size={'xs'} color={'gray'} on:click={() => state.reset()}>Reset</PushableButton>
	<input
		type="text"
		bind:this={inputTextElement}
		bind:value={inputText}
		on:keydown={(e) => handleKeyPress(e.key)}
		use:focusInput
	/>
	<PushableButton size={'xs'} color={$app.buttonColor} on:click={() => submitForm()}>{$app.buttonLabel}</PushableButton>
</div>

<style lang="postcss">
	.input-form {
		display: grid;
		grid-template-columns: auto auto 87px;
		grid-template-rows: auto auto;
		grid-auto-flow: row;
		align-items: end;
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
		font-size: 1rem;
		color: var(--pri-color);
		background-color: var(--page-bg-color);
		outline: 1px solid var(--pri-color);
		border: none;
		border-radius: 6px;
		margin: auto 0;
		padding: 0.375rem 0.5rem;
	}
	input:focus {
		outline: 1px solid var(--pri-color);
	}
	.error input {
		outline: 1px solid var(--red4);
		color: var(--red4);
	}
</style>
