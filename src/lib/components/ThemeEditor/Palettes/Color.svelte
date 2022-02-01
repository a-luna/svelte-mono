<script lang="ts">
	import Delete from '$lib/components/Icons/Delete.svelte';
	import type { ComponentColor, CssColor } from '$lib/types';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let color: CssColor;
	export let displayName = false;
	export let componentColor: ComponentColor;
	let editColorName = false;
	let newName = color.name;
	let timeout: NodeJS.Timeout;
	let error = false;
	let waitingForDoubleClick = false;
	let buttonElement: HTMLButtonElement;
	let colorWrapperElement: HTMLElement;
	const dispatch = createEventDispatcher();

	$: error = editColorName && !newName;
	$: outlineColor = error ? 'var(--red2)' : `var(--${componentColor}-fg-color);`;
	$: inputStyles = `outline: 2px solid ${outlineColor}; outline-offset: 2px`;

	function handleColorWrapperClicked() {
		if (!editColorName) {
			dispatch('colorSelected', color);
			buttonElement.focus();
		}
	}

	function handleColorNameClicked() {
		if (waitingForDoubleClick) {
			editColorName = true;
		} else {
			waitingForDoubleClick = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (waitingForDoubleClick = false), 750);
		}
	}

	function handleDeleteButtonClicked() {
		editColorName = false;
		dispatch('deleteColor', color);
	}

	const focusInput = (inputElement: HTMLInputElement) => inputElement.focus();

	function handleKeyPress(key: string) {
		if (newName && key === 'Enter') {
			color.name = newName;
			editColorName = false;
		} else if (key === 'Escape') {
			editColorName = false;
		}
	}

	function possiblyExitEditMode(key: string) {
		if (editColorName && key === 'Escape') {
			editColorName = false;
		}
	}

	function checkForOuterClick(event) {
		if (editColorName && !colorWrapperElement.contains(event.target)) {
			editColorName = false;
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<svelte:window on:keydown={(e) => possiblyExitEditMode(e.key)} on:click={checkForOuterClick} />

<div
	bind:this={colorWrapperElement}
	class="color-wrapper"
	on:click|stopPropagation={() => handleColorWrapperClicked()}
	style={displayName ? `width: 100%` : ''}
>
	<button type="button" bind:this={buttonElement}>
		<div class="color-swatch" style="background-color: {color.hslString}" />
	</button>
	{#if displayName}
		{#if editColorName}
			<input
				type="text"
				bind:value={newName}
				on:keypress={(e) => handleKeyPress(e.key)}
				style={inputStyles}
				use:focusInput
			/>
			<div class="icon" style="color: var(--{componentColor}-fg-color);" on:click={() => handleDeleteButtonClicked()}>
				<Delete tooltip={'Remove color from palette'} />
			</div>
		{:else}
			<span class="color-name" title="Double-click to edit" on:click={() => handleColorNameClicked()}>{color.name}</span
			>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.color-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		gap: 0.75rem;
		white-space: nowrap;
		padding: 0 0.25rem;
	}

	button {
		flex: 0 1 auto;
	}

	button:focus {
		outline: 2px solid hsl(240 100% 27%);
		outline-offset: 2px;
	}

	.color-swatch {
		flex: 0 1 auto;
		height: 20px;
		width: 40px;
		padding: 5px;
		border-width: 2px;
		border-style: inset;
	}

	.color-name {
		flex: 1;
		font-size: 0.875rem;
		line-height: 1;
		margin: auto 0;
		text-align: left;
		cursor: pointer;
		padding: 3px 4px;
	}

	input {
		flex: 1;
		line-height: 1;
		font-size: 0.875rem;
		padding: 0 4px;
		border-radius: 6px;
		background-color: var(--white4);
	}

	.icon {
		width: 20px;
		height: 20px;
		margin: auto 0;
		cursor: pointer;
	}
</style>
