<script lang="ts">
	import EncodedBytesForChar from '$lib/components/AlgorithmDemo/DemoText/Utf8/EncodedBytesForChar.svelte';
	import ToggleExpandAllCharacters from '$lib/components/AlgorithmDemo/DemoText/Utf8/ToggleExpandAllCharacters.svelte';
	import { defaultUtf8StringComposition } from '$lib/constants';
	import { getAppContext } from '$lib/stores/context';
	import type { Utf8StringComposition } from '$lib/types';
	import { getUtf8StringDecomposition } from '$lib/unicode/utf8';
	import NonPrintingCharLegend from './NonPrintingCharLegend.svelte';

	let utf8ByteMap: Utf8StringComposition;
	let charByteMapComponents: Record<number, EncodedBytesForChar> = {};
	let anyCharsAreExpanded = false;
	let allCharsAreExpanded = false;
	let hasVarSelector15 = false;
	let hasVarSelector16 = false;
	let hasZeroWidthJoiner = false;
	let hasWhiteSpace = false;
	const { state, demoState } = getAppContext();
	utf8ByteMap = $state.context.input.utf8 || defaultUtf8StringComposition;

	$: if ($demoState.getUtf8StringDecomposition && !utf8ByteMap.hasCharacterNames) {
		getUtf8ByteMap();
	}
	$: expandableCharMaps = Object.values(charByteMapComponents).filter((charMap) => charMap.isCombined);
	$: anyCharsAreCombined = utf8ByteMap?.hasCombinedChars;
	$: inputEncoded = utf8ByteMap?.encoded;
	$: inputHasWhiteSpace = inputEncoded?.includes('%20');
	$: showLegend =
		(anyCharsAreExpanded && (hasVarSelector15 || hasVarSelector16 || hasZeroWidthJoiner || hasWhiteSpace)) ||
		inputHasWhiteSpace;

	async function getUtf8ByteMap() {
		utf8ByteMap = await getUtf8StringDecomposition($state.context.input.inputText);
	}

	function handleCharacterToggled(charIndex: number) {
		const expandChar = charByteMapComponents[charIndex];
		if (expandChar) {
			expandChar.expanded = !expandChar.expanded;
		}
		updateCharComponents();
	}

	function toggleAllChars() {
		const expandableCharMaps = Object.values(charByteMapComponents).filter((charMap) => charMap.isCombined);
		expandableCharMaps.forEach((charMap) => (charMap.expanded = allCharsAreExpanded));
		updateCharComponents();
	}

	function updateCharComponents() {
		const expandedCharMaps = expandableCharMaps.filter((charMap) => charMap.expanded);
		hasVarSelector15 = expandedCharMaps.some((charMap) => charMap.encoded.includes('%EF%B8%8E'));
		hasVarSelector16 = expandedCharMaps.some((charMap) => charMap.encoded.includes('%EF%B8%8F'));
		hasZeroWidthJoiner = expandedCharMaps.some((charMap) => charMap.encoded.includes('%E2%80%8D'));
		hasWhiteSpace = expandedCharMaps.some((charMap) => charMap.encoded.includes('%20'));
		anyCharsAreExpanded = anyCharsAreCombined && expandableCharMaps.some((charMap) => charMap.expanded);
		allCharsAreExpanded = expandableCharMaps.every((charMap) => charMap.expanded);
	}
</script>

<div class="utf8-byte-map-wrapper">
	{#if anyCharsAreCombined}
		<ToggleExpandAllCharacters bind:toggled={allCharsAreExpanded} on:click={() => toggleAllChars()} />
	{/if}
	<div class="utf8-byte-map">
		{#each utf8ByteMap.charMap as { char, isASCII, encoded, hexBytes, isCombined, charMap, unicodeNames, codepoints }, i}
			<EncodedBytesForChar
				hasCharacterNames={utf8ByteMap.hasCharacterNames}
				bind:this={charByteMapComponents[i]}
				bind:anyCharsAreExpanded
				{anyCharsAreCombined}
				{char}
				{isASCII}
				{encoded}
				{hexBytes}
				{codepoints}
				{unicodeNames}
				{isCombined}
				{charMap}
				on:toggled={() => handleCharacterToggled(i)}
			/>
		{/each}
	</div>
	{#if showLegend}
		<NonPrintingCharLegend
			{hasZeroWidthJoiner}
			{hasVarSelector15}
			{hasVarSelector16}
			{hasWhiteSpace}
			{inputHasWhiteSpace}
		/>
	{/if}
</div>

<style lang="postcss">
	.utf8-byte-map-wrapper {
		--scrollbar-track-color: var(--black3);
		--scrollbar-thumb-color: var(--light-gray2);

		line-height: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
		margin: 1rem 0 0.25rem 0;
		padding: 0.75rem;
		overflow-y: hidden;
		overflow-x: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--light-gray2) var(--black3);
		scrollbar-gutter: stable;
		background-color: var(--black3);
		border-radius: 6px;

		scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
		scrollbar-width: thin;
	}
	.utf8-byte-map-wrapper::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}
	.utf8-byte-map-wrapper::-webkit-scrollbar-thumb {
		background-color: var(--light-gray2);
		border-radius: 0;
		border: 2px solid var(--black3);
	}
	.utf8-byte-map-wrapper::-webkit-scrollbar-track {
		background: var(--black3);
	}
	.utf8-byte-map-wrapper::-webkit-scrollbar-corner {
		background: var(--black3);
	}
	.utf8-byte-map {
		display: flex;
		flex-flow: column nowrap;
	}
</style>
