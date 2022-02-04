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
	class="text-sm flex-grow px-1"
	data-testid="color-name-input"
	on:keypress={(e) => handleKeyPress(e.key)}
/>
<div class="flex flex-row flex-nowrap gap-1">
	<div
		id="change-color-button"
		data-testid="change-color-button"
		class="flex-initial h-4 w-4 my-auto cursor-pointer"
		title="Change color"
		style="color: var(--black2)"
		on:click={() => dispatch('updateColor', textInput.value)}
	>
		<OkButton />
	</div>
	<div
		id="keep-color-button"
		data-testid="keep-color-button"
		class="flex-initial h-4 w-4 my-auto cursor-pointer"
		title="Cancel"
		style="color: var(--black2)"
		on:click={() => dispatch('keepCurrentColor')}
	>
		<Cancel />
	</div>
</div>
