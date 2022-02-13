<script lang="ts">
	import { state } from '$lib/state';

	$: inputText = $state.mode === 'encode' ? $state.encoderInput.inputText : $state.decoderInput.inputText;
	$: totalBytesIn = $state.mode === 'encode' ? $state.encoderInput.bytes.length : 0;
	$: isASCII =
		$state.mode === 'encode' ? $state.encoderOutput.isASCII : $state.decoderOutput.outputEncoding === 'ASCII';
	$: inputEncoding = $state.mode === 'encode' ? $state.encoderOutput.inputEncoding : $state.decoderOutput.inputEncoding;
	$: outputText = $state.mode === 'encode' ? $state.encoderOutput.output : $state.decoderOutput.output;
	$: totalBytesOut = $state.mode === 'encode' ? $state.encoderOutput.bytes.length : $state.decoderOutput.bytes.length;
	$: outputEncoding =
		$state.mode === 'encode' ? $state.encoderOutput.outputEncoding : $state.decoderOutput.outputEncoding;

	// async function copyInputText() {
	// 	await copyText(inputText);
	// }

	// async function copyOutputText() {
	// 	await copyText(outputText);
	// }

	// async function copyText(textToCopy) {
	// 	if (typeof window !== 'undefined') {
	// 		try {
	// 			await navigator.clipboard.writeText(textToCopy);
	// 			return true;
	// 		} catch (e) {
	// 			return false;
	// 		}
	// 	}
	// }
</script>

<div id="results" class="results-wrapper">
	<fieldset class="results-in">
		<legend>Input</legend>
		<div class="details-wrapper">
			<div class="encoding">Encoding: {inputEncoding}</div>
			{#if $state.mode === 'encode'}
				<div class="byte-length">Total Bytes: {totalBytesIn}</div>
			{/if}
		</div>
		<textarea id="copyable-input-text" readonly rows="1" bind:value={inputText} />
	</fieldset>
	<fieldset class="results-out">
		<legend>Output</legend>
		<div class="details-wrapper">
			<div class="encoding">Encoding: {outputEncoding}</div>
			{#if $state.mode === 'decode'}
				<div class="byte-length">Total Bytes: {totalBytesOut}</div>
			{/if}
		</div>
		<textarea id="copyable-output-text" readonly rows="1" bind:value={outputText} />
	</fieldset>
</div>

<style lang="postcss">
	.results-wrapper {
		flex: 1 1 auto;
	}
	.results-in {
		color: var(--pri-color);
	}
	.results-out {
		color: var(--sec-color);
	}
	#copyable-input-text,
	#copyable-output-text {
		font-size: 0.875rem;
		font-family: 'Roboto Mono', monospace;
		line-height: 1rem;
		margin: 0;
		white-space: normal;
		word-break: break-all;
		margin: 0;
		word-break: break-word;
		width: 100%;
		background-color: inherit;
		color: inherit;
		border: none;
		overflow: auto;
		outline: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		resize: vertical;
	}
	fieldset {
		border: 1px solid rgba(216, 216, 216, 0.45);
		border-radius: 4px;
		padding: 3px 7px 5px 7px;
		font-size: 0.875rem;
		line-height: 1;
		margin: 0 0 10px 0;
	}
	fieldset:last-child {
		margin: 0;
	}
	legend {
		color: #f2f2f2;
		font-weight: 400;
		padding: 0 3px;
	}
	.results-wrapper {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
	}
	.details-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 0.625rem;
		color: #7f7f7f;
		font-weight: 400;
	}
	.encoding,
	.byte-length {
		margin: 2px 5px;
	}
	@media screen and (max-width: 670px) {
		.results-wrapper {
			flex: 0 0 100%;
			margin: auto;
		}
		fieldset {
			font-size: 1rem;
		}
		.details-wrapper {
			font-size: 0.75rem;
		}
	}
</style>
