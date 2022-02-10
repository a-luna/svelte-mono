<script lang="ts">
	import type { Base64ByteMap, HexByteMap, OutputChunk } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let chunk: OutputChunk;
	let asciiByteHovered: string;
	let asciiBitGroupHovered: string;
	let b64DigitHovered: string;
	let b64BitGroupHovered: string;
	const highlightAsciiDispatcher =
		createEventDispatcher<{ highlightAsciiValue: { highlight: boolean; ascii: string } }>();
	const highlightBase64Dispatcher =
		createEventDispatcher<{ highlightBase64Value: { highlight: boolean; base64: string } }>();

	function highlightAsciiValue(highlight: boolean, hexMap: HexByteMap) {
		asciiByteHovered = highlight ? hexMap.ascii : null;
		asciiBitGroupHovered = highlight ? hexMap.groupId : null;
		highlightAsciiDispatcher('highlightAsciiValue', { highlight, ascii: asciiByteHovered });
	}

	function highlightBase64Value(highlight: boolean, b64Map: Base64ByteMap) {
		b64DigitHovered = highlight ? b64Map.b64 : null;
		b64BitGroupHovered = highlight ? b64Map.groupId : null;
		highlightBase64Dispatcher('highlightBase64Value', { highlight, base64: b64DigitHovered });
	}
</script>

<div class="single-chunk">
	{#if chunk.hexMap}
		<div class="hex-map">
			{#each chunk.hexMap as hexMap}
				<div
					class="hex-byte"
					class:highlight-ascii={asciiByteHovered === hexMap.ascii}
					data-eight-bit="{hexMap.bin_word1}{hexMap.bin_word2}"
					data-hex-byte="{hexMap.hex_word1}{hexMap.hex_word2}"
					data-ascii={hexMap.ascii}
					data-bit-group={hexMap.groupId}
					on:mouseenter={() => highlightAsciiValue(true, hexMap)}
					on:mouseleave={() => highlightAsciiValue(false, hexMap)}
				>
					<div>
						<code
							class="hex-ascii"
							data-ascii={hexMap.ascii}
							data-hex-byte="{hexMap.hex_word1}{hexMap.hex_word2}"
							class:hide-element={!chunk.isASCII}
							class:black={hexMap.isWhiteSpace}
						>
							{@html hexMap.isWhiteSpace ? '&nbsp;' : hexMap.ascii}
						</code>
						<code data-ascii={hexMap.ascii} data-hex-byte="{hexMap.hex_word1}{hexMap.hex_word2}">
							<span class="hex-digit" data-hex={hexMap.hex_word1} data-four-bit={hexMap.bin_word1}>
								{hexMap.hex_word1}
							</span>
							<span class="hex-digit" data-hex={hexMap.hex_word2} data-four-bit={hexMap.bin_word2}>
								{hexMap.hex_word2}
							</span>
						</code>
						{#if hexMap.bitGroups}
							<code class="hex-binary bit-group" data-ascii={hexMap.ascii} data-bit-group={hexMap.groupId}>
								<code>
									{#each hexMap.bitGroups as bitGroup}
										<span
											class:highlight-bit-group={bitGroup.groupId === b64BitGroupHovered}
											data-bit-group={bitGroup.groupId}
										>
											{bitGroup.bits}
										</span>
									{/each}
								</code>
							</code>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
	{#if chunk.base64Map}
		<div class="base64-map">
			{#each chunk.base64Map as b64Map}
				<div
					class="base64"
					class:highlight-base64={b64DigitHovered === b64Map.b64}
					data-six-bit={b64Map.bin}
					data-decimal={b64Map.dec}
					data-base={b64Map.b64}
					data-bit-group={b64Map.groupId}
					on:mouseenter={() => highlightBase64Value(true, b64Map)}
					on:mouseleave={() => highlightBase64Value(false, b64Map)}
				>
					<div>
						{#if b64Map.bitGroups}
							<code class="base64-binary bit-group" data-base={b64Map.b64} data-bit-group={b64Map.groupId}>
								<code>
									{#each b64Map.bitGroups as bitGroup}
										<span
											class:highlight-bit-group={bitGroup.groupId === asciiBitGroupHovered}
											class:black={b64Map.isPad}
											data-bit-group={bitGroup.groupId}
										>
											{bitGroup.bits}
										</span>
									{/each}
								</code>
							</code>
						{/if}
						<code
							class="base64-decimal"
							class:small-font={b64Map.isPad}
							data-base={b64Map.b64}
							data-decimal={b64Map.dec}
							class:black={b64Map.isPad}
						>
							{@html b64Map.isPad ? '&nbsp;' : b64Map.dec}
						</code>
						<code class="base64-digit" data-base={b64Map.b64} data-decimal={b64Map.dec}>
							{b64Map.b64}
						</code>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	code,
	span {
		margin: 0;
	}

	.hex-map,
	.base64-map {
		transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out;
	}

	.hex-map {
		margin: 0 0 0.3125rem 0;
	}

	.base64-map {
		margin: 0.3125rem 0 0 0;
	}

	.single-chunk {
		display: flex;
		flex-flow: column nowrap;
		border-right: 1px solid rgba(216, 216, 216, 0.45);
		padding: 0 0.625rem;
	}

	.single-chunk:last-child {
		border: none;
	}

	.hex-map,
	.base64-map {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}

	.hex-digit:last-child {
		margin: 0 0 0 1rem;
	}

	.hex-byte {
		margin: 0 0.125rem;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
	}

	code.hex-ascii,
	code.base64-decimal {
		font-weight: 400;
	}

	.base64 {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
		min-width: 48px;
		margin: 0 1px;
	}

	code {
		display: block;
	}

	.hex-byte:nth-child(even) code {
		font-weight: 700;
		color: #fe2d6c;
	}

	.hex-byte:nth-child(odd) code {
		font-weight: 400;
		color: #19f6d6;
	}

	.base64:nth-child(even) code {
		font-weight: 700;
		color: #7a32ff;
	}

	.base64:nth-child(odd) code {
		font-weight: 400;
		color: #7fff6e;
	}

	.hex-binary code,
	.base64-binary code {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}

	.small-font {
		font-size: 0.75rem;
	}

	.hide-element {
		display: none;
	}

	.hex-byte code.black,
	.base64 code.black {
		color: #202020;
		transition: color 0.35s ease-in-out;
	}
</style>
