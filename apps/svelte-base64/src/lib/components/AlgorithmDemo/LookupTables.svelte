<script lang="ts">
	import AsciiLookupTable from '$lib/components/Results/LookupTables/AsciiLookupTable.svelte';
	import Base64LookupTable from '$lib/components/Results/LookupTables/Base64LookupTable.svelte';
	import { getDemoAppContext } from '$lib/stores/context';
	import type { Base64Encoding } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let outputBase64Encoding: Base64Encoding;
	export let highlightHexByte: number | undefined;
	export let highlightBase64: string;
	const { demoState } = getDemoAppContext();

	$: tableChunkSize = $demoState?.isMobileDisplay ? 32 : 16;
</script>

{#if $demoState?.showAsciiTable}
	<div transition:fade class="ascii-table">
		<AsciiLookupTable asciiTableChunkSize={tableChunkSize} {highlightHexByte} fontSize={'0.65rem'} />
	</div>
{:else if $demoState?.showBase64Table}
	<div transition:fade class="base64-table">
		<Base64LookupTable
			base64Encoding={outputBase64Encoding}
			base64TableChunkSize={tableChunkSize}
			{highlightBase64}
			fontSize={'0.65rem'}
		/>
	</div>
	<!-- {:else if !$state.matches('finished')}
	<div class="placeholder" style="width: 292px" /> -->
{/if}

<style lang="postcss">
	.ascii-table,
	.base64-table {
		flex: 0 1 auto;
		margin: 0 auto;
		width: min-content;
	}
</style>
