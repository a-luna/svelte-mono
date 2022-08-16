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
		border-radius: 6px;
		padding: 0.25rem;
		margin: auto 0;
		width: 100%;
		font-size: 1rem;
		line-height: 19px;
	}
	input.error {
		border: 1px solid var(--red4);
		color: var(--red4);
	}
	input[disabled] {
		color: var(--gray4);
		background-color: var(--modal-body-bg-color);
		outline: 1px solid var(--black1);
		border-radius: 4px;
	}
</style>
