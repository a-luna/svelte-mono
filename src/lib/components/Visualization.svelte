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
			<section class="encoding-map">
				<div>
					<ul>
						{#each chunks as chunk}
							<li>
								<EncodedChunk {chunk} on:highlightAsciiValue on:highlightBase64Value on:highlightBitGroups />
							</li>
						{/each}
					</ul>
				</div>
			</section>
		</div>
	</div>
{/if}

<style lang="postcss">
	.visualization-wrapper {
		margin: 0.625rem auto;
		background-color: #202020;
		border: 1px solid rgba(216, 216, 216, 0.45);
		border-radius: 0.375rem;
		padding: 0.3125rem 0.625rem;
	}

	.visualization {
		display: flex;
		flex-flow: row nowrap;
		overflow: hidden;
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

	code {
		display: block;
		color: #f2f2f2;
		font-weight: 400;
		letter-spacing: 0.75px;
		text-transform: uppercase;
	}

	.hide-element {
		display: none;
	}

	.encoding-map {
		overflow-x: auto;
	}

	.encoding-map div {
		overflow: hidden;
	}

	.encoding-map ul {
		display: flex;
		flex-flow: row nowrap;
		overflow-x: scroll;
		cursor: ew-resize;
		block-size: calc(100% + 25px);
	}

	.encoding-map li {
		flex: 1 0 auto;
		block-size: calc(100% - 25px);
	}
</style>
