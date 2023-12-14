<script lang="ts">
	import { fade } from 'svelte/transition';

	export let hasVarSelector15 = false;
	export let hasVarSelector16 = false;
	export let hasZeroWidthJoiner = false;
	export let hasWhiteSpace = false;
	export let inputHasWhiteSpace = false;

	const zwjUrl = 'https://en.wikipedia.org/wiki/Zero-width_joiner';
	const varUrl = 'https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)';

	const zwj1 = " (pronounced 'zwidge') Stands for ";
	const zwj2 = 'Zero-Width Joiner';
	const zwj3 = ' which itself is a non-printing character that joins a set of characters into a single emoji.';

	const vs15_1 = ' Stands for ';
	const vs15_2 = 'Variation Selector-15';
	const vs15_3 =
		'. This codepoint may change the appearance of the preceding character. If that is a symbol, dingbat or emoji, <strong>VS15 forces it to be rendered in a monochrome, textual fashion</strong> rather than as a colorful image.';

	const vs16_1 = ' Stands for ';
	const vs16_2 = 'Variation Selector-16';
	const vs16_3 =
		'. This codepoint may change the appearance of the preceding character. If that is a symbol, dingbat or emoji, <strong>VS16 forces it to be rendered as a colorful image</strong> rather than in a monochrome, textual fashion.';
</script>

<div transition:fade class="legend">
	<ul>
		{#if hasZeroWidthJoiner}
			<li class="zwj">
				<strong>ZWJ: </strong>{zwj1}<strong><a href={zwjUrl} target="_blank" rel="noreferrer">{zwj2}</a></strong>{zwj3}
			</li>
		{/if}
		{#if hasVarSelector15}
			<li class="variation">
				<strong>VS15: </strong>{vs15_1}<strong><a href={varUrl} target="_blank" rel="noreferrer">{vs15_2}</a></strong
				>{@html vs15_3}
			</li>
		{/if}
		{#if hasVarSelector16}
			<li class="variation">
				<strong>VS16: </strong>{vs16_1}<strong><a href={varUrl} target="_blank" rel="noreferrer">{vs16_2}</a></strong
				>{@html vs16_3}
			</li>
		{/if}
		{#if hasWhiteSpace || inputHasWhiteSpace}
			<li class="whitespace"><strong>SP: </strong>0x20 is the hex value of the space character</li>
		{/if}
	</ul>
</div>

<style lang="postcss">
	.legend {
		font-size: 0.7rem;
		padding: 0.25rem;
		background-color: var(--black1);
		border: 0.5px solid var(--nav-button-autoplay-disabled-border-color);
		border-radius: 4px;
		color: var(--sec-color);
	}
	.legend ul {
		list-style: none;
		margin: 0.25rem;
		padding: 0;
	}
	.legend li {
		margin: 0 0 1rem 0;
		line-height: 1.4;
	}
	.legend li:last-child {
		margin: 0;
	}
	:global(#demo-text .legend code) {
		background-color: var(--black4);
		color: var(--sec-color);
		padding: 0;
		white-space: normal;
	}
	:global(#demo-text) .legend strong {
		color: var(--sec-color);
	}
	:global(#demo-text .legend .whitespace code),
	:global(#demo-text .legend .zwj code),
	:global(#demo-text .legend .variation code) {
		background-color: inherit;
		padding: 0;
	}
</style>
