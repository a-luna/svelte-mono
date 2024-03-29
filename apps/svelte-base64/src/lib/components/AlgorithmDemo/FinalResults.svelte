<script lang="ts">
	import CopyEncodedText from '$lib/components/AlgorithmDemo/Buttons/CopyEncodedText.svelte';
	import { alert } from '$lib/stores/alert';
	import { getDemoAppContext } from '$lib/stores/context';
	import { copyToClipboard } from '$lib/util';

	const { state } = getDemoAppContext();

	$: inputEncoding = $state?.context.output.isASCII ? 'ascii' : $state?.context.output.inputEncoding;
	$: utf8 = $state?.context.output.inputEncoding === 'utf8';

	async function handleCopyButtonClicked(colorString: string) {
		const result = await copyToClipboard(colorString);
		if (!result.success) {
			$alert = result.error?.message ?? '';
		}
	}
</script>

{#if $state?.matches('finished')}
	<div class="demo-results">
		<div class="result input-value">
			<div class="result-label-wrapper">
				<span class="result-label">Input</span>
				<span class="encoding-type" title="Input Encoding">{inputEncoding}</span>
			</div>
			<span class="result-value" class:utf8>{$state.context.input.inputText}</span>
		</div>
		<div class="result output-value">
			<div class="result-label-wrapper">
				<span class="result-label">Output</span>
				<span class="encoding-type" title="Output Encoding">{$state.context.output.outputEncoding}</span>
			</div>
			<span class="result-value">{$state.context.output.output}</span>
			<CopyEncodedText on:copyEncodedText={() => handleCopyButtonClicked($state.context.output.output)} />
		</div>
	</div>
{/if}

<style lang="postcss">
	.demo-results {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.result {
		display: flex;
		flex-flow: column nowrap;
		font-size: 0.75rem;
		gap: 0.75rem;
		padding: 0.5rem;
		background-color: var(--black1);
		border-radius: 6px;
		white-space: normal;
		word-break: break-all;
		line-height: 1;
	}
	.result-label-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.result-label {
		font-size: 0.75rem;
		font-weight: 700;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.input-value {
		border: 1px solid var(--nav-button-border-color);
	}
	.input-value .result-label {
		color: var(--pri-color);
	}
	.output-value {
		border: 1px solid var(--nav-button-autoplay-border-color);
	}
	.output-value .result-label {
		color: var(--sec-color);
	}
	.result-value {
		font-family: 'Roboto Mono', menlo, monospace;
		color: var(--white3);
		letter-spacing: 0.7px;
		line-height: 1.4;

		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
	.utf8 {
		letter-spacing: 5px;
		font-size: 1.2rem;
	}
	.encoding-type {
		font-size: 0.7rem;
	}
	.input-value .encoding-type {
		color: var(--nav-button-active-bg-color);
	}
	.output-value .encoding-type {
		color: var(--nav-button-autoplay-bg-color);
	}
	@media screen and (min-width: 764px) {
		.demo-results {
			gap: 2rem;
		}
		.result {
			font-size: 0.75rem;
		}
		.result-label {
			font-size: 0.85rem;
		}
		.result-value {
			line-height: 1.6;
		}
		.encoding-type {
			font-size: 0.7rem;
		}
	}
</style>
