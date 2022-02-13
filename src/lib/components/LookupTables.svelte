<script lang="ts">
	import { getChunkedAsciiMap, getChunkedBase64Map } from '$lib/maps';
	import { state } from '$lib/state';
	import type { AsciiCharacterMap } from '$lib/types';

	const asciiMapChunked: AsciiCharacterMap[][] = getChunkedAsciiMap();

	$: showASCII =
		$state.mode === 'encode' ? $state.encoderOutput.isASCII : $state.decoderOutput.outputEncoding === 'ASCII';
	$: base64Encoding =
		$state.mode === 'encode' ? $state.encoderOutput.outputEncoding : $state.decoderOutput.inputEncoding;
	$: base64MapChunked = getChunkedBase64Map(base64Encoding);
	$: b64AlphabetDetail = base64Encoding == 'base64' ? 'Standard' : 'URL and Filename safe';
</script>

<div class="lookup-tables">
	{#if showASCII}
		<div class="table-wrapper">
			<h2>ASCII Map (Printable Characters)</h2>
			<div class="ascii-lookup-table">
				{#each asciiMapChunked as asciiMap}
					<div class="ascii-lookup-chunk">
						{#each asciiMap as ascii}
							<div
								class="ascii-lookup"
								class:highlight-hex-byte={ascii.dec === $state.highlightHexByte}
								data-ascii={ascii.ascii}
								data-hex-byte={ascii.hex}
								data-eight-bit={ascii.bin}
								data-decimal={ascii.dec}
							>
								<code>{ascii.ascii}</code>
								<code>{ascii.hex}</code>
								<code>{ascii.binWord1} {ascii.binWord2}</code>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<div class="table-wrapper">
		<h2>Base64 Alphabet ({b64AlphabetDetail})</h2>
		<div class="base64-lookup-table">
			{#each base64MapChunked as base64Map}
				<div class="base64-lookup-chunk">
					{#each base64Map as base64}
						<div
							class="base64-lookup"
							class:highlight-base64={base64.b64 === $state.highlightBase64}
							data-base={base64.b64}
							data-six-bit={base64.bin}
							data-decimal={base64.dec}
						>
							<code>{base64.dec}</code>
							<code>{base64.bin}</code>
							<code>{base64.b64}</code>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.lookup-tables {
		font-size: 0.8rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
	}

	.table-wrapper h2 {
		font-size: 1rem;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.8px;
		text-align: center;
		margin: 0 0 0.625rem 0;
	}

	.ascii-lookup-table,
	.base64-lookup-table {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		border: 1px solid rgba(216, 216, 216, 0.45);
		border-radius: 0.375rem;
		margin: 0.625rem auto 0.625rem 0;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.ascii-lookup-chunk,
	.base64-lookup-chunk {
		border-right: 1px solid rgba(216, 216, 216, 0.45);
		padding: 0 0.1875rem;
	}

	.ascii-lookup-chunk:last-child,
	.base64-lookup-chunk:last-child {
		border: none;
	}

	.ascii-lookup-chunk {
		margin: 0.1875rem 0;
	}

	.base64-lookup-chunk {
		margin: 0.1875rem 0;
	}

	.ascii-lookup,
	.base64-lookup {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
	}

	.ascii-lookup code {
		color: var(--sec-color);
	}

	.base64-lookup code {
		color: var(--pri-color);
	}

	.ascii-lookup code,
	.base64-lookup code {
		margin: 0 0.3125rem;
		white-space: nowrap;
		text-transform: none;
	}

	/* @media screen and (max-width: 825px) {
    .lookup-tables {
      font-size: 10px;
    }
    .table-wrapper h2 {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 767px) {
    .lookup-tables {
      font-size: 9px;
    }
    .table-wrapper h2 {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 720px) {
    .lookup-tables {
      font-size: 10px;
    }
    .table-wrapper h2 {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 400px) {
    .lookup-tables {
      font-size: 10px;
    }
  } */
</style>
