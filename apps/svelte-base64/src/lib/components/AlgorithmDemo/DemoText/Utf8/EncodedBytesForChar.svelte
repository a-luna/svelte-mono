<svelte:options accessors />

<script lang="ts">
	import ToggleExpandCharacters from '$lib/components/AlgorithmDemo/DemoText/Utf8/ToggleExpandCharacters.svelte';
	import { getAppContext } from '$lib/stores/context';
	import type { Utf8StandardCharacterMap } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let hasCharacterNames: boolean;
	export let anyCharsAreCombined: boolean;
	export let anyCharsAreExpanded: boolean;
	export let char: string;
	export let isASCII: boolean;
	export let encoded: string;
	export let hexBytes: string[];
	export let codepoints: string[];
	export let unicodeNames: string[] | undefined;
	export let isCombined: boolean;
	export let charMap: Utf8StandardCharacterMap[] | undefined;
	export let expanded = false;
	const dispatch = createEventDispatcher<{ toggled: never }>();
	const { demoState } = getAppContext();

	const isVS15 = (encoded: string): boolean => encoded === '%EF%B8%8E';
	const isVS16 = (encoded: string): boolean => encoded === '%EF%B8%8F';
	const isZWJ = (encoded: string): boolean => encoded === '%E2%80%8D';
	const isWhiteSpace = (encoded: string): boolean => encoded === '%20';

	const getCharType = (encoded: string): string =>
		isVS15(encoded) || isVS16(encoded)
			? 'variation'
			: isZWJ(encoded)
			? 'zwj'
			: isWhiteSpace(encoded)
			? 'whitespace'
			: isASCII
			? 'ascii'
			: 'char';

	const getCharToDisplay = (char: string, encoded: string): string =>
		isVS15(encoded) ? 'VS15' : isVS16(encoded) ? 'VS16' : isZWJ(encoded) ? 'ZWJ' : isWhiteSpace(encoded) ? 'SP' : char;

	$: charFlex = anyCharsAreExpanded ? 'flex: 0 0 25px;' : anyCharsAreCombined ? 'flex: 0 0 20px;' : 'flex: 0 0 25px;';
	$: placeHolderXFlex = anyCharsAreExpanded ? 'flex: 0 0 25px;' : 'flex: 0 0 20px;';
	$: charMapMargin = anyCharsAreExpanded ? 'margin: 0.5rem 0 0 0;' : 'margin: 4px 0 0 0;';
	$: buttonPlaceholderFlexMobile = anyCharsAreExpanded
		? 'flex: 0 0 30px;'
		: anyCharsAreCombined
		? 'flex: 0 0 20px;'
		: 'flex: 0;';
	$: buttonPlaceholderFlexLarge = anyCharsAreExpanded
		? 'flex: 0 0 25px;'
		: anyCharsAreCombined
		? 'flex: 0 0 20px;'
		: 'flex: 0;';
	$: buttonPlaceholderFlex = $demoState.isMobileDisplay ? buttonPlaceholderFlexMobile : buttonPlaceholderFlexLarge;

	export function expand() {
		if (isCombined && expanded) {
			expanded = false;
		}
	}
</script>

{#if isCombined}
	<button
		class="utf8-bytes-for-char combined-char {getCharType(encoded)}"
		style={charMapMargin}
		class:expanded
		on:click={() => dispatch('toggled')}
	>
		<ToggleExpandCharacters bind:toggled={expanded} {anyCharsAreExpanded} />
		{#if expanded}
			<div class="combined-char-wrapper">
				<div class="utf8-char">{getCharToDisplay(char, encoded)}</div>
				{#if expanded && charMap}
					{#each Array.from({ length: charMap.length - 1 }) as _}
						<div class="placeholderY" />
					{/each}
				{/if}
			</div>
			<div class="combined-utf8-char-map">
				{#if charMap}
					{#each charMap as { char: singleChar, encoded: singleCharEncoded, hexBytes: singleCharHexBytes, unicodeName, codepoint }}
						<div class="utf8-bytes-for-char {getCharType(singleCharEncoded)}">
							<div class="utf8-char" style="flex: 0 0 25px;">{getCharToDisplay(singleChar, singleCharEncoded)}</div>
							<div class="hex-bytes">
								{#each singleCharHexBytes as hex}
									<code>{hex}</code>
								{/each}
							</div>
							<span class="codepoint">{codepoint}</span>
							{#if hasCharacterNames}
								<span class="char-name">{unicodeName}</span>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		{:else}
			{#if anyCharsAreExpanded}
				<div class="placeholderX" style={placeHolderXFlex} />
			{/if}
			<div class="utf8-char combined-char" style={charFlex}>{getCharToDisplay(char, encoded)}</div>
			<div class="hex-bytes">
				{#each hexBytes as hex}
					<code>{hex}</code>
				{/each}
			</div>
		{/if}
	</button>
{:else}
	<div class="utf8-bytes-for-char single-char {getCharType(encoded)}" style={charMapMargin}>
		<div class="button-placeholder" style={buttonPlaceholderFlex} />
		{#if anyCharsAreExpanded}
			<div class="placeholderX" />
		{/if}
		<div class="utf8-char" style={charFlex}>{getCharToDisplay(char, encoded)}</div>
		<div class="hex-bytes">
			{#each hexBytes as hex}
				<code>{hex}</code>
			{/each}
		</div>
		{#if !anyCharsAreCombined || anyCharsAreExpanded}
			<span class="codepoint">{codepoints[0]}</span>
			{#if hasCharacterNames && unicodeNames}
				<span class="char-name">{unicodeNames[0]}</span>
			{/if}
		{/if}
	</div>
{/if}

<style lang="postcss">
	button {
		--scrollbar-track-color: var(--black2);

		background-color: var(--black3);
		border: none;
		padding: 0;
		height: auto;
		align-items: center;
		line-height: 1;
		border-radius: 6px;

		scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
		scrollbar-width: thin;
	}
	button:focus {
		outline: none;
	}
	button:focus-visible {
		outline-offset: 1px;
		outline: 1px solid var(--white2);
	}
	button::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}
	button::-webkit-scrollbar-thumb {
		background-color: var(--light-gray2);
		border-radius: 0;
		border: 2px solid var(--black2);
	}
	button::-webkit-scrollbar-track {
		background: var(--black2);
	}
	button::-webkit-scrollbar-corner {
		background: var(--black2);
	}
	.combined-utf8-char-map {
		line-height: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 4px;
	}
	.utf8-bytes-for-char {
		display: flex;
		flex-flow: row nowrap;
		background-color: inherit;
		gap: 0.5rem;
	}
	.expanded {
		align-items: flex-start;
		padding: 0 5px;
	}
	:global(#demo-text) .utf8-bytes-for-char code {
		font-size: 0.75rem;
		border-radius: 0px;
		align-self: center;
		height: 16px;
	}
	:global(#demo-text) .combined-char code {
		color: var(--pri-color);
	}
	:global(#demo-text) .single-char code,
	:global(#demo-text) .expanded code {
		color: var(--light-gray2);
	}
	.utf8-char,
	.placeholderX {
		background-color: inherit;
		font-size: 16px;
		color: var(--light-gray2);
		text-align: center;
	}
	.single-char .placeholderX {
		flex: 0 0 20px;
	}
	.placeholderY,
	.combined-char-wrapper .utf8-char {
		flex: 0 0 16px;
		width: 25px;
	}
	.combined-char-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: flex-start;
		gap: 4px;
	}
	.zwj .utf8-char,
	.variation .utf8-char,
	.whitespace .utf8-char {
		font-size: 0.6rem;
	}
	.whitespace .utf8-char {
		align-self: center;
	}

	.combined-utf8-char-map .utf8-char {
		margin: auto 0;
	}
	.hex-bytes {
		display: flex;
		min-width: 88px;
	}
	.hex-bytes code {
		flex: 0;
	}
	.codepoint {
		min-width: 47px;
	}
	.char-name,
	.codepoint {
		color: var(--light-gray2);
		text-align: left;
		align-self: center;
		white-space: nowrap;
	}
	:global(#demo-text) .whitespace .utf8-char,
	:global(#demo-text) .whitespace .hex-bytes code,
	:global(#demo-text) .whitespace .char-name,
	:global(#demo-text) .whitespace .codepoint,
	:global(#demo-text) .zwj .utf8-char,
	:global(#demo-text) .zwj .hex-bytes code,
	:global(#demo-text) .zwj .char-name,
	:global(#demo-text) .zwj .codepoint,
	:global(#demo-text) .variation .utf8-char,
	:global(#demo-text) .variation .hex-bytes code,
	:global(#demo-text) .variation .char-name,
	:global(#demo-text) .variation .codepoint {
		color: var(--sec-color);
	}
	@media screen and (min-width: 764px) {
		button {
			--scrollbar-track-color: var(--black2);

			background-color: var(--black2);
			overflow-x: auto;
			scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
			scrollbar-width: thin;
		}
		button:active,
		button:hover,
		button:focus,
		button:focus-visible,
		button:active:focus {
			background-color: var(--black3);
		}
		button.expanded:active,
		button.expanded:hover,
		button.expanded:focus,
		button.expanded:focus-visible,
		button.expanded:active:focus {
			background-color: var(--black2);
		}
		.expanded {
			align-items: flex-start;
			background-color: var(--black2);
			border: 1px solid var(--nav-button-bg-color);
			padding: 0.5rem 0.25rem;
		}
		.single-char .placeholderX {
			flex: 0 0 25px;
		}
	}
</style>
