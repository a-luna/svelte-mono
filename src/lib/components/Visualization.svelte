<script lang="ts">
	import EncodedChunk from '$lib/components/EncodedChunk.svelte';
	import type { AppMode, DecodingOutput, EncodingOutput, OutputChunk } from '$lib/types';

	export let mode: AppMode;
	export let encodingOutput: EncodingOutput;
	export let decodingOutput: DecodingOutput;
	let chunks: OutputChunk[] = [];

	$: chunks = mode === 'encode' ? encodingOutput.chunks : decodingOutput.chunks;
	$: isASCII = mode === 'encode' ? encodingOutput.inputEncoding === 'ASCII' : decodingOutput.outputEncoding === 'ASCII';
</script>

{#if chunks.length}
	<div class="visualization-wrapper">
		<div class="visualization">
			<div class="encoding-key">
				<div class="input-key">
					<div>
						<code class:hide-element={!isASCII}>ASCII</code>
						<code>Hex</code>
						<code>8-bit</code>
					</div>
				</div>
				<div class="output-key">
					<div>
						<code>6-bit</code>
						<code>Decimal</code>
						<code>Base64</code>
					</div>
				</div>
			</div>
			<div class="encoding-map">
				{#each chunks as chunk}
					<EncodedChunk {chunk} on:highlightAsciiValue on:highlightBase64Value on:highlightBitGroups />
				{/each}
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.visualization-wrapper {
		overflow-x: auto;
		overflow-y: hidden;
		margin: 0.625rem auto;
		background-color: #202020;
		border: 1px solid rgba(216, 216, 216, 0.45);
		border-radius: 0.375rem;
		padding: 0.3125rem 0.625rem;
	}

	.visualization {
		font-size: 0.7rem;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		width: auto;
		padding: 0.3125rem;
		white-space: nowrap;
	}

	.encoding-key {
		display: flex;
		flex-flow: column nowrap;
		color: #f2f2f2;
		font-weight: 400;
	}

	.input-key {
		margin: 0 0 0.3125rem 0;
	}

	.output-key {
		margin: 0.3125rem 0 0 0;
	}

	.encoding-map {
		display: flex;
		flex-flow: row nowrap;
	}

	code {
		display: block;
		color: #f2f2f2;
		font-weight: 400;
		letter-spacing: 0.3125rem;
		text-transform: uppercase;
	}

	.hide-element {
		display: none;
	}
</style>
