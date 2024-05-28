<script lang="ts">
	import FormTitle from '$lib/components/FormTitle.svelte';
	import InputBase64EncodingRadioButtons from '$lib/components/InputForm/InputBase64EncodingRadioButtons.svelte';
	import InputStringEncodingRadioButtons from '$lib/components/InputForm/InputStringEncodingRadioButtons.svelte';
	import OutputBase64EncodingRadioButtons from '$lib/components/InputForm/OutputBase64EncodingRadioButtons.svelte';
	import InputTextBox from '$lib/components/InputTextBox.svelte';
	import { alert } from '$lib/stores/alert';
	import { getSimpleAppContext } from '$lib/stores/context';
	import type { AppState, AppStore } from '$lib/types';
	import type { HslColor } from '@a-luna/shared-ui';
	import { PushableButton } from '@a-luna/shared-ui';
	import { getCssPropertyHslColorValue } from '@a-luna/shared-ui/util';
	import { tick } from 'svelte';
	import type { Readable } from 'svelte/store';

	let inputText: string;
	let inputTextBox: InputTextBox;
	let inputStringEncodingButtons: InputStringEncodingRadioButtons;
	let inputBase64EncodingOptions: InputBase64EncodingRadioButtons;
	let outputBase64EncodingOptions: OutputBase64EncodingRadioButtons;
	let priColor: HslColor = { h: 0, s: 0, l: 0, a: 1 };
	let secColor: HslColor = { h: 0, s: 0, l: 0, a: 1 };
	let errorColor: HslColor = { h: 0, s: 0, l: 0, a: 1 };
	const fgColor = { h: 0, s: 0, l: 0, a: 1 };
	let state: AppState;
	let app: Readable<AppStore>;
	let initialized = false;
	({ state, app } = getSimpleAppContext());

	$: if (typeof window !== 'undefined' && !initialized) {
		updateButtonColors();
	}
	$: inputTextBoxGridStyles = 'grid-column: 1 / span 3;';
	$: defaultFlexStyles = 'display: flex; gap: 0.5rem;';
	$: encodingOptionsFlexStyles = $app.isDefaultDisplay
		? $app.encoderMode
			? `${defaultFlexStyles} flex-flow: row nowrap;`
			: `${defaultFlexStyles} flex-flow: column nowrap;`
		: $app.isMobileDisplay
			? `${defaultFlexStyles} flex-flow: column nowrap; `
			: `${defaultFlexStyles} flex-flow: row nowrap;`;
	$: defaultGridStyles = 'display: grid; gap: 0.5rem; padding: 0.25rem 0.5rem 0.5rem 0.5rem;';
	$: inputTextEncodingStylesGrid = $app.isDefaultDisplay
		? `${defaultGridStyles} grid-template-columns: 75px 1fr; grid-template-rows: auto auto;`
		: $app.isMobileDisplay
			? `${defaultGridStyles} grid-template-columns: 75px 75px 75px 1fr; grid-template-rows: auto;`
			: `${defaultGridStyles} grid-template-columns: repeat(4, auto); grid-template-rows: auto;`;
	$: outputBase64EncodingStylesGrid = $app.isDefaultDisplay
		? `${defaultGridStyles} grid-template-columns: 1fr; grid-template-rows: auto auto;`
		: $app.isMobileDisplay
			? `${defaultGridStyles} grid-template-columns: 75px 1fr; grid-template-rows: auto;`
			: `${defaultGridStyles} grid-template-columns: repeat(2, auto); grid-template-rows: auto;`;
	$: inputBase64EncodingStylesGrid = `${defaultGridStyles} grid-template-columns: auto 1fr; grid-template-rows: auto;`;
	$: state.changeInputText(inputText);
	$: if ($state.resetPerformed) {
		inputText = '';
		$state.resetPerformed = false;
	}
	$: formTitleMargin = $app.isMobileDisplay ? '0' : '-0.25rem 0 0 0';
	$: execButtonColor = $app.inputStringIsValid ? priColor : errorColor;

	async function updateButtonColors() {
		if (typeof window !== 'undefined') {
			const query = `main.${$app.encoderMode ? 'encode' : 'decode'}`;
			let mainElement: HTMLElement | null = null;
			do {
				mainElement = document.querySelector(query);
				await tick();
			} while (!mainElement);

			priColor = getCssPropertyHslColorValue(mainElement, '--pri-color');
			secColor = getCssPropertyHslColorValue(mainElement, '--sec-color');
			errorColor = getCssPropertyHslColorValue(mainElement, '--error-color');
			initialized = true;
		} else {
			initialized = false;
		}
	}

	async function toggleMode() {
		state.toggleMode();
		await updateButtonColors();
		inputTextBox.focus();
	}

	function resetForm() {
		state.reset();
		resetRadioButtons();
		inputTextBox.focus();
	}

	function resetRadioButtons() {
		if ($app.encoderMode) {
			inputStringEncodingButtons.reset();
			outputBase64EncodingOptions.reset();
		} else {
			inputBase64EncodingOptions.reset();
		}
	}

	function submitForm() {
		if ($app.inputStringIsValid) {
			state.execute();
		}
		if ($app.errorMessage) {
			$alert = $app.errorMessage;
		}
	}
</script>

<div class="form-top">
	<FormTitle title={$app.formTitle} margin={formTitleMargin} />
	<div class="switch-mode-button-wrapper">
		<PushableButton bgColor={priColor} {fgColor} testid={'switch-mode-button'} on:click={() => toggleMode()}>
			Switch Mode
		</PushableButton>
	</div>
	<div class="reset-form-button-wrapper">
		<PushableButton bgColor={secColor} {fgColor} testid={'reset-form-button'} on:click={() => resetForm()}>
			Reset
		</PushableButton>
	</div>
</div>
<div class="encoding-options-wrapper" style={encodingOptionsFlexStyles}>
	<div class="input-encoding-options">
		{#if $app.encoderMode}
			<InputStringEncodingRadioButtons bind:this={inputStringEncodingButtons} style={inputTextEncodingStylesGrid} />
		{:else}
			<InputBase64EncodingRadioButtons bind:this={inputBase64EncodingOptions} style={inputBase64EncodingStylesGrid} />
		{/if}
	</div>
	<div class="output-encoding-options">
		{#if $app.encoderMode}
			<OutputBase64EncodingRadioButtons
				bind:this={outputBase64EncodingOptions}
				style={outputBase64EncodingStylesGrid}
			/>
		{:else}
			<div class="placeholder" />
		{/if}
	</div>
</div>
<InputTextBox
	bind:inputText
	bind:this={inputTextBox}
	error={!$app.inputStringIsValid}
	style={inputTextBoxGridStyles}
	on:submit={() => submitForm()}
/>
<PushableButton bgColor={execButtonColor} {fgColor} testid={'execute-button'} on:click={() => submitForm()}>
	{$app.buttonLabel}
</PushableButton>

<style lang="postcss">
	.form-top {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 31px 31px;
		grid-gap: 1rem;

		grid-column: 1 / span 4;
		grid-row: 1 / span 1;
	}
	.encoding-options-wrapper {
		justify-content: center;
		grid-column: 1 / span 4;
	}
	.input-encoding-options,
	.output-encoding-options {
		flex: 0 1 50%;
		height: 55px;
	}
	.switch-mode-button-wrapper,
	.reset-form-button-wrapper {
		--pushable-button-width: 115px;
		place-self: center stretch;
		flex: 1;
	}
	.switch-mode-button-wrapper {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	.reset-form-button-wrapper {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	@media screen and (min-width: 540px) {
		.form-top {
			display: grid;
			grid-template-columns: 1fr 115px 115px;
			grid-template-rows: 31px;
			grid-gap: 1rem;

			grid-column: 1 / span 4;
			grid-row: 1 / span 1;
		}
		.input-encoding-options {
			flex: 1;
		}
		.output-encoding-options {
			flex: 0;
		}
		.switch-mode-button-wrapper {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
			justify-self: center;
		}
		.reset-form-button-wrapper {
			grid-column: 3 / span 1;
			grid-row: 1 / span 1;
		}
	}
</style>
