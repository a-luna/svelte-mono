<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let value: string = '';
	let textInput: HTMLInputElement;
	const dispatch = createEventDispatcher();

	function handleKeyPress(key: string) {
		if (key === 'Enter') {
			dispatch('updateColor', textInput.value);
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
	on:click={() => dispatch('keepCurrentColor')}
>
	<BasicIconRenderer icon={'cancel'} />
</div>
<input
	bind:this={textInput}
	{value}
	type="text"
	data-testid="color-name-input"
	on:keypress={(e) => handleKeyPress(e.key)}
/>
<div
	id="change-color-button"
	data-testid="change-color-button"
	title="Change color"
	on:click={() => dispatch('updateColor', textInput.value)}
>
	<BasicIconRenderer icon={'ok'} />
</div>

<style lang="postcss">
	input {
		flex: 1;
		font-size: 0.875rem;
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
