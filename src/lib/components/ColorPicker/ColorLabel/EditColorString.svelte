<script lang="ts">
	import Cancel from '$lib/components/Icons/Cancel.svelte';
	import OkButton from '$lib/components/Icons/Ok.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	let value: string = '';
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

<input
	bind:this={textInput}
	{value}
	type="text"
	data-testid="color-name-input"
	on:keypress={(e) => handleKeyPress(e.key)}
/>
<div class="buttons">
	<div
		id="change-color-button"
		data-testid="change-color-button"
		title="Change color"
		on:click={() => dispatch('updateColor', textInput.value)}
	>
		<OkButton />
	</div>
	<div
		id="keep-color-button"
		data-testid="keep-color-button"
		title="Cancel"
		on:click={() => dispatch('keepCurrentColor')}
	>
		<Cancel />
	</div>
</div>

<style lang="postcss">
	input {
		flex: 1;
		font-size: 0.875rem;
		line-height: 1.25rem;
		padding: 0 0.25rem;
		outline: 1px solid var(--gray2);
		border-radius: 6px;
	}

	input:focus {
		outline: 1px solid var(--black2);
		outline-offset: 1px;
	}

	.buttons {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
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
</style>
