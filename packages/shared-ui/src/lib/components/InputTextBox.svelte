<script lang="ts">
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let style = '';
	export let inputText: string;
	export let regex: RegExp | undefined = undefined;
	export let required = false;
	export let disabled = false;
	export let readonly = false;
	export let error = false;
	export let tooltip = '';
	export let id = `text-box-${getRandomHexString(4)}`;
	let inputTextElement: HTMLInputElement;
	const dispatch = createEventDispatcher();

	$: pattern = regex ? regex.source : null;
	$: error = regex ? !regex.test(inputText) : required ? !inputText : false;

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
		--text-box-default-text-color: var(--black1);
		--text-box-default-background-color: var(--white4);
		--text-box-default-border-color: var(--black1);
		--text-box-default-border-radius: 4px;
		--text-box-default-font-size: 1rem;
		--text-box-default-line-height: 19px;
		--text-box-default-padding: 0.25rem 0.5rem;
		--text-box-default-focus-ring-color: var(--blue4);
		--text-box-default-focus-ring-offset: 1px;
		--text-box-default-invalid-text-color: var(--red3);
		--text-box-default-invalid-focus-ring-color: var(--red3);
		--text-box-default-invalid-background-color: var(--white4);
		--text-box-default-disabled-text-color: var(--dark-gray2);
		--text-box-default-disabled-background-color: var(--light-gray1);
		--text-box-default-disabled-border-color: var(--dark-gray2);

		justify-self: flex-start;
		color: var(--text-box-text-color, var(--text-box-default-text-color));
		background-color: var(--text-box-background-color, var(--text-box-default-background-color));
		border: 1px solid var(--text-box-border-color, var(--text-box-default-border-color));
		border-radius: var(--text-box-border-radius, var(--text-box-default-border-radius));
		-webkit-border-radius: var(--text-box-border-radius, var(--text-box-default-border-radius));
		font-size: var(--text-box-font-size, var(--text-box-default-font-size));
		line-height: var(--text-box-line-height, var(--text-box-default-line-height));
		padding: var(--text-box-padding, var(--text-box-default-padding));
		margin: auto 0;
		width: 100%;
	}
	input:focus {
		outline-offset: var(--text-box-focus-ring-offset, var(--text-box-default-focus-ring-offset));
		outline: var(--text-box-focus-ring-offset, var(--text-box-default-focus-ring-offset)) solid
			var(--text-box-focus-ring-color, var(--text-box-default-focus-ring-color));
	}
	input:not([readonly]):not([disabled]).error,
	input:not([readonly]):not([disabled]):invalid {
		color: var(--text-box-invalid-text-color, var(--text-box-default-invalid-text-color));
		background-color: var(--text-box-invalid-background-color, var(--text-box-default-invalid-background-color));
		outline: 0;
	}
	input:not([readonly]):not([disabled]).error:focus,
	input:not([readonly]):not([disabled]):invalid:focus {
		outline: 0;
	}
	input[disabled] {
		color: var(--text-box-disabled-text-color, var(--text-box-default-disabled-text-color));
		background-color: var(--text-box-disabled-background-color, var(--text-box-default-disabled-background-color));
		border: 1px solid var(--text-box-disabled-border-color, var(--text-box-default-disabled-border-color));
	}

	input[readonly] {
		pointer-events: none;
		color: var(--text-box-disabled-text-color, var(--text-box-default-disabled-text-color));
		background-color: var(--text-box-disabled-background-color, var(--text-box-default-disabled-background-color));
		border: 1px solid var(--text-box-disabled-border-color, var(--text-box-default-disabled-border-color));
	}
</style>
