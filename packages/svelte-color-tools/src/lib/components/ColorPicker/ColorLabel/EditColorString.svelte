<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let value: string = '';
	let textInput: HTMLInputElement;
	const dispatchStringValueChanged = createEventDispatcher<{ stringValueChanged: { css: string } }>();
	const dispatchKeepCurrentColor = createEventDispatcher<{ keepCurrentColor: {} }>();

	function handleKeyPress(key: string) {
		if (key === 'Enter') {
			dispatchStringValueChanged('stringValueChanged', { css: textInput.value });
		}
	}

	function handleEscapeKeyPress(key: string) {
		if (key === 'Escape') {
			dispatchKeepCurrentColor('keepCurrentColor');
		}
	}

	onMount(async () => {
		await tick();
		textInput.focus();
	});
</script>

<div
	id="keep-color-button"
	data-testid="keep-color-button"
	title="Cancel"
	on:click={() => dispatchKeepCurrentColor('keepCurrentColor')}
>
	<BasicIconRenderer icon={'cancel'} />
</div>
<input
	bind:this={textInput}
	{value}
	type="text"
	data-testid="color-name-input"
	on:keypress={(e) => handleKeyPress(e.key)}
	on:keyup={(e) => handleEscapeKeyPress(e.key)}
/>
<div
	id="change-color-button"
	data-testid="change-color-button"
	title="Change color"
	on:click={() => dispatchStringValueChanged('stringValueChanged', { css: textInput.value })}
>
	<BasicIconRenderer icon={'ok'} />
</div>

<style lang="postcss">
	input {
		flex: 1;
		font-size: 0.75rem;
		line-height: 1.25rem;
		padding: 0 0.25rem;
		border: 1px solid var(--gray2);
		border-radius: 6px;
		grid-column: 4 / span 1;
	}

	input:focus {
		border: 1px solid var(--black2);
		outline: none;
		outline-offset: 1px;
	}

	#change-color-button,
	#keep-color-button {
		flex: 0 1 auto;
		color: var(--black2);
		width: 1rem;
		height: 1rem;
		margin: auto 0;
		cursor: pointer;
	}

	#change-color-button {
		grid-column: 6 / span 1;
	}

	#keep-color-button {
		grid-column: 2 / span 1;
	}
</style>
