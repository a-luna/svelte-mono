<script lang="ts">
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let style: string = '';
	export let inputText: string;
	export let disabled = false;
	export let error = false;
	export let id = `text-box-${getRandomHexString(4)}`;
	let inputTextElement: HTMLInputElement;
	const dispatch = createEventDispatcher();

	export function focus() {
		inputTextElement.focus();
	}

	export function blur() {
		inputTextElement.blur();
	}

	function handleKeyPress(key: string) {
		if (key === 'Enter') {
			dispatch('submit');
		}
	}
</script>

<input
	type="text"
	spellcheck="false"
	class:error
	data-testid="input-text"
	{style}
	{disabled}
	{id}
	name={id}
	bind:this={inputTextElement}
	bind:value={inputText}
	on:keydown|stopPropagation={(e) => handleKeyPress(e.key)}
/>

<style lang="postcss">
	input {
		justify-self: flex-start;
		font-size: 1rem;
		border: 1px solid var(--input-text-border-color, var(--input-text-default-border-color, var(--black1)));
		border-radius: 4px;
		-webkit-border-radius: 4px;
		padding: 0.25rem 0.5rem;
		margin: auto 0;
		width: 100%;
		font-size: var(--input-font-size, var(--input-default-text-size, 1rem));
		line-height: 19px;
	}
	input:focus {
		box-shadow: 0 0 0 2px var(--blue4);
		outline: 0;
	}
	input.error {
		box-shadow: 0 0 0 2px var(--red4);
		color: var(--red4);
		outline: 0;
	}
	input[disabled] {
		color: var(--input-text-color, var(--input-text-default-fg-color, var(--gray4)));
		background-color: var(
			--input-text-background-color,
			var(--input-text-default-background-color, var(--modal-body-background-color))
		);
	}
</style>
