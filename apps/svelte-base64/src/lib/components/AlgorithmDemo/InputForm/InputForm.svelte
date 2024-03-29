<script lang="ts">
	import OpenHelpDocsButton from '$lib/components/AlgorithmDemo/Buttons/OpenHelpDocsButton.svelte';
	import NavButtons from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButtons.svelte';
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/InputForm/SelectBase64Encoding.svelte';
	import SelectStringEncoding from '$lib/components/AlgorithmDemo/InputForm/SelectStringEncoding.svelte';
	import { getDemoAppContext } from '$lib/stores/context';
	import type { Base64Encoding, StringEncoding } from '$lib/types';
	import { InputTextBox } from '@a-luna/shared-ui';

	export let inputText: string;
	export let inputTextEncoding: StringEncoding = 'utf8';
	export let outputBase64Encoding: Base64Encoding = 'base64';
	const { state } = getDemoAppContext();

	$: inputTextBoxStyles = 'flex: 1;';
	$: controlsDisabled = !$state?.matches('inactive') && !$state?.matches({ validateInputText: 'error' });
	$: error =
		inputText &&
		!$state.matches('inactive') &&
		inputText === $state.context.input.inputText &&
		!$state.context.input.validationResult.success;
</script>

<div class="input-form">
	<span class="input-text-label form-label">Input Text/Data</span>
	<div class="help-docs-button">
		<OpenHelpDocsButton label={'Help Docs'} name="help-docs-button-input-form" on:openHelpModal />
	</div>
	<div class="input-text">
		<InputTextBox
			bind:inputText
			disabled={controlsDisabled}
			error={Boolean(error)}
			style={inputTextBoxStyles}
			on:submit
		/>
	</div>
	<span class="input-encoding-label form-label">Text Encoding</span>
	<div class="input-encoding">
		<SelectStringEncoding bind:value={inputTextEncoding} disabled={controlsDisabled} />
	</div>
	<span class="output-encoding-label form-label">Output Encoding</span>
	<div class="output-encoding">
		<SelectBase64Encoding bind:value={outputBase64Encoding} disabled={controlsDisabled} />
	</div>
	<div class="nav-buttons">
		<NavButtons />
	</div>
</div>

<style lang="postcss">
	.input-form {
		--select-list-open-button-icon-height: 14px;
		--select-list-open-button-icon-width: 10px;

		display: grid;
		grid-template-columns: 114px auto 114px;
		grid-template-rows: auto auto auto 55px auto;
		column-gap: 1rem;
		margin: 0;

		grid-area: input-form;
	}
	.form-label {
		margin: 0 0 0.5rem 0;
	}
	.input-text-label {
		justify-self: center;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.help-docs-button {
		font-size: 0.75rem;

		justify-self: center;
		grid-column: 3 / span 1;
		grid-row: 1 / span 1;
	}
	.input-text {
		margin: 0 0 1rem 0;
		grid-column: 1 / span 3;
		grid-row: 2 / span 1;
	}
	.input-encoding-label {
		justify-self: center;
		line-height: 1;

		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.output-encoding-label {
		justify-self: center;
		line-height: 1;

		grid-column: 3 / span 1;
		grid-row: 3 / span 1;
	}
	.input-encoding {
		margin: 0 0 1rem 0;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}
	.output-encoding {
		margin: 0 0 1rem 0;

		grid-column: 3 / span 1;
		grid-row: 4 / span 1;
	}
	.nav-buttons {
		grid-column: 1 / span 3;
		grid-row: 5 / span 1;
	}

	@media screen and (min-width: 764px) {
		.input-form {
			display: grid;
			grid-template-columns: 100px 100px auto;
			grid-template-rows: auto auto 20px 33px auto;
			width: 701px;
		}
		.input-text-label {
			justify-self: start;

			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
		}
		.help-docs-button {
			justify-self: flex-end;
		}
		.input-text {
			grid-column: 1 / span 3;
			grid-row: 2 / span 1;
		}
		.input-encoding-label {
			justify-self: center;

			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}
		.input-encoding {
			margin: 0;

			grid-column: 1 / span 1;
			grid-row: 4 / span 1;
		}
		.output-encoding-label {
			justify-self: center;

			grid-column: 2 / span 1;
			grid-row: 3 / span 1;
		}
		.output-encoding {
			margin: 0;

			grid-column: 2 / span 1;
			grid-row: 4 / span 1;
		}
		.nav-buttons {
			align-self: flex-end;

			grid-column: 3 / span 1;
			grid-row: 3 / span 2;
		}
	}
</style>
