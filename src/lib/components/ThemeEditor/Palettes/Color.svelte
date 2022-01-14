<svelte:options accessors />

<script lang="ts">
	import type { ComponentColor, CssColor } from '$lib/types';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let color: CssColor;
	export let displayName = false;
	export let componentColor: ComponentColor;
	export let editName = false;
	let newName = color.name;
	let timeout: NodeJS.Timeout;
	let error = false;
	let waitingForDoubleClick = false;
	let buttonElement: HTMLButtonElement;
	const dispatch = createEventDispatcher();

	$: tooltip = color?.name ? `${color.hslString} (${color.name})` : color.hslString;
	$: outlineColor = error ? 'var(--red2)' : `var(--${componentColor}-fg-color);`;
	$: inputStyles = `outline: 2px solid ${outlineColor}; outline-offset: 2px`;

	function handleColorWrapperClicked() {
		if (!editName) {
			buttonElement.focus();
		}
	}

	function handleColorNameClicked() {
		if (waitingForDoubleClick) {
			editName = true;
			dispatch('beginEditingColorName', color);
		} else {
			waitingForDoubleClick = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (waitingForDoubleClick = false), 750);
		}
	}

	const focusInput = (inputElement: HTMLInputElement) => inputElement.focus();

	function handleKeyPress(key: string) {
		error = false;
		if (key === 'Enter') {
			if (newName !== '') {
				color.name = newName;
				editName = false;
			}
			error = true;
		} else if (key === 'Escape') {
			editName = false;
		}
	}

	function possiblyExitEditMode(key: string) {
		if (editName && key === 'Escape') {
			editName = false;
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<svelte:window on:keydown={(e) => possiblyExitEditMode(e.key)} />

<div
	class="color-wrapper"
	on:click
	on:click={() => handleColorWrapperClicked()}
	style={displayName ? `width: 100%` : ''}
>
	<button type="button" bind:this={buttonElement}>
		<div title={tooltip} class="color-swatch" style="background-color: {color.hslString}" />
	</button>
	{#if displayName}
		{#if editName}
			<input
				type="text"
				bind:value={newName}
				class:error
				on:keypress={(e) => handleKeyPress(e.key)}
				style={inputStyles}
				use:focusInput
			/>
		{:else}
			<span class="color-name" on:click={() => handleColorNameClicked()}>{color.name}</span>
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

	.error {
		outline: 1.5px solid var(--red2);
		outline-offset: 1.5px;
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
</style>
