<script lang="ts">
	import { getAppContext } from '$lib/stores/context';
	import { createEventDispatcher } from 'svelte';

	const { demoState } = getAppContext();

	$: style = $demoState.isMobileDisplay ? 'font-weight: 700; align-self: flex-end;' : 'font-weight: 700;';

	const dispatch = createEventDispatcher();
</script>

<button
	type="button"
	title="Copy encoded output string to clipboard"
	name="copy-output-string-button"
	{style}
	on:click={() => dispatch('copyEncodedText')}
>
	Copy to Clipboard
</button>

<style lang="postcss">
	button {
		display: inline;
		border: none;
		font-size: inherit;
		letter-spacing: inherit;
		background-color: inherit;
		color: var(--nav-button-autoplay-bg-color);
		padding: 0;
		height: auto;
		text-align: left;
		cursor: pointer;
		line-height: inherit;
	}

	button:focus,
	button:hover,
	button:active,
	button:active:focus {
		color: var(--sec-color);
		background-color: inherit;
		text-decoration: underline;
	}
</style>
