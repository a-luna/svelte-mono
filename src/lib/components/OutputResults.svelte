<script lang="ts">
	import { state } from '$lib/stores/state';

	$: hexOutput = $state.decoderOutput.bytes.map((byte) => byte.toString(16).padStart(2, '0')).join(' ');
	$: outputText =
		$state.mode === 'encode'
			? $state.encoderOutput.output
			: $state.decoderOutput.outputEncoding === 'ASCII'
			? $state.decoderOutput.output
			: hexOutput;
	$: totalBytesOut = $state.mode === 'encode' ? $state.encoderOutput.bytes.length : $state.decoderOutput.bytes.length;
	$: outputEncoding =
		$state.mode === 'encode' ? $state.encoderInput.outputEncoding : $state.decoderOutput.outputEncoding;
</script>

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

<style lang="postcss">
	.results-out {
		color: var(--sec-color);
	}
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
	}
	fieldset:last-child {
		margin: 0;
	}
	legend {
		color: #f2f2f2;
		font-weight: 400;
		padding: 0 3px;
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
		fieldset {
			font-size: 1rem;
		}
		.details-wrapper {
			font-size: 0.75rem;
		}
	}
</style>
