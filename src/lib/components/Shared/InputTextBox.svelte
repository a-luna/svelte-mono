<script lang="ts">
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let style: string = null;
	export let inputText: string;
	export let regex: RegExp = null;
	export let required = false;
	export let disabled = false;
	export let readonly = false;
	export let error = false;
	export let tooltip = null;
	export let id = `text-box-${getRandomHexString(4)}`;
	let inputTextElement: HTMLInputElement;
	const dispatch = createEventDispatcher();

	$: pattern = regex ? regex.source : null;
	$: error = regex ? !regex.test(inputText) : required ? !Boolean(inputText) : false;

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
	{required}
	{disabled}
	{readonly}
	{pattern}
	{id}
	name={id}
	title={tooltip}
	bind:this={inputTextElement}
	bind:value={inputText}
	on:keydown|stopPropagation={(e) => handleKeyPress(e.key)}
/>

<style lang="postcss">
	input {
		--input-text-default-font-size: 1rem;
		--input-text-default-text-size: 1rem;
		--input-text-default-text-color: var(--black1);
		--input-text-default-background-color: var(--white4);
		--input-text-default-border-color: var(--black1);
		--input-text-default-border-radius: 4px;
		--input-text-default-padding: 0.25rem 0.5rem;
		--input-text-default-line-height: 19px;
		--input-text-default-focus-ring-color: var(--blue4);
		--input-text-default-invalid-text-color: var(--red3);
		--input-text-default-invalid-focus-ring-color: var(--red3);
		--input-text-default-invalid-background-color: var(--white4);
		--input-text-default-disabled-text-color: var(--dark-gray2);
		--input-text-default-disabled-background-color: var(--light-gray1);
		--input-text-default-disabled-border-color: var(--dark-gray2);

		justify-self: flex-start;
		color: var(--input-text-text-color, var(--input-text-default-text-color));
		background-color: var(--input-text-background-color, var(--input-text-default-background-color));
		border: 1px solid var(--input-text-border-color, var(--input-text-default-border-color));
		border-radius: var(--input-text-border-radius, var(--input-text-default-border-radius));
		-webkit-border-radius: var(--input-text-border-radius, var(--input-text-default-border-radius));
		padding: var(--input-text-padding, var(--input-text-default-padding));
		margin: auto 0;
		width: 100%;
		font-size: var(--input-text-font-size, var(--input-text-default-text-size));
		line-height: var(--input-text-line-height, var(--input-text-default-line-height));
	}
	input:focus {
		box-shadow: 0 0 0 2px var(--input-text-focus-ring-color, var(--input-text-default-focus-ring-color));
		outline: 0;
	}
	input:not([readonly]):not([disabled]).error,
	input:not([readonly]):not([disabled]):invalid {
		color: var(--input-text-invalid-text-color, var(--input-text-default-invalid-text-color));
		background-color: var(--input-text-invalid-background-color, var(--input-text-default-invalid-background-color));
		box-shadow: 0 0 0 2px var(--input-text-invalid-focus-ring-color, var(--input-text-default-invalid-focus-ring-color));
		outline: 0;
	}
	input:not([readonly]):not([disabled]).error:focus,
	input:not([readonly]):not([disabled]):invalid:focus {
		outline: 0;
	}
	input[disabled] {
		color: var(--input-text-disabled-text-color, var(--input-text-default-disabled-text-color));
		background-color: var(--input-text-disabled-background-color, var(--input-text-default-disabled-background-color));
		border: 1px solid var(--input-text-disabled-border-color, var(--input-text-default-disabled-border-color));
	}

	input[readonly] {
		pointer-events: none;
		color: var(--input-text-disabled-text-color, var(--input-text-default-disabled-text-color));
		background-color: var(--input-text-disabled-background-color, var(--input-text-default-disabled-background-color));
		border: 1px solid var(--input-text-disabled-border-color, var(--input-text-default-disabled-border-color));
	}
</style>
