<script lang="ts">
	import { defaultBase64ByteMap, rotatingColors } from '$lib/constants';
	import { getDemoAppContext } from '$lib/stores/context';
	import { getChunkIndexFromBase64CharIndex } from '$lib/util';

	export let charIndex: number;
	const { state } = getDemoAppContext();

	$: b64 = $state.context.base64Maps[charIndex] ?? defaultBase64ByteMap;
	$: b64CharNumber = charIndex + 1;
	$: byteDisplayChar = b64.isPad ? '&nbsp;' : 'B';
	$: byteDisplayNumber = b64.isPad ? '&nbsp;' : `${b64CharNumber}`;
	$: chunkId = getChunkIndexFromBase64CharIndex(charIndex);
	$: chunkNumber = chunkId + 1;
	$: chunkColor = rotatingColors[chunkId % rotatingColors.length];
	$: currentOutputChunk = $state.context.outputChunkIndex;
	$: chunkMappingInProgress =
		$state.matches({ createOutputChunks: 'autoPlayCreateOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createOutputChunk' }) ||
		$state.matches({ createOutputChunks: 'createLastPaddedChunk' }) ||
		$state.matches({ createOutputChunks: 'createdAllOutputChunks' });
	$: currentChunkIsMapped = chunkMappingInProgress && currentOutputChunk === chunkId;
	$: currentChunkColor = currentChunkIsMapped ? chunkColor : '--gray3';
	$: currentBitGroupColor = currentChunkIsMapped ? chunkColor : '--black1';
</script>

<div class="b64Char-id" data-b64char-number={b64CharNumber} style="color: var({currentChunkColor});">
	<span class="letter-B">{@html byteDisplayChar}</span>
	<span class="b64Char-number">{@html byteDisplayNumber}</span>
</div>
<div class="base64-char" data-chunk-id={chunkNumber} class:mapping={chunkMappingInProgress}>
	{#if !b64.isPad}
		{#each b64.bitGroups as bitGroup}
			<div
				class="hex-bit-group"
				data-bit-group={bitGroup.groupId}
				class:mapping={currentChunkIsMapped}
				style="color: var({currentBitGroupColor});"
			>
				{#each bitGroup.bits as bit}
					<code class="bit"><span>{bit}</span></code>
				{/each}
			</div>
		{/each}
	{:else}
		<div
			class="hex-bit-group pad-char"
			class:mapping={currentChunkIsMapped}
			style="outline: 1px dotted var({currentChunkColor});"
		>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
			<code class="bit pad-bit"><span>{@html '&nbsp;'}</span></code>
		</div>
	{/if}
</div>
