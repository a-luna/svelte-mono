<script lang="ts">
	import type { ComponentColor } from '$lib/types';

	export let themeName = '';
	export let editMode: boolean;
	export let componentColor: ComponentColor;
	let newName = themeName;
	let error = false;

	$: error = editMode && !newName;
	$: themeNameStyles = `color: var(--${componentColor}-fg-color);`;

	function possiblyExitEditMode(key: string) {
		if (editMode && key === 'Escape') {
			editMode = false;
		}
	}

	const focusInput = (inputElement: HTMLInputElement) => inputElement.focus();

	function handleKeyPress(key: string) {
		if (newName && key === 'Enter') {
			themeName = newName;
			editMode = false;
		} else if (key === 'Escape') {
			editMode = false;
		}
	}
</script>

<svelte:window on:keydown={(e) => possiblyExitEditMode(e.key)} />

<div class="theme-name-wrapper" class:edit-mode={editMode} class:error>
	<span class="theme-name-label">Theme Name:</span>
	{#if editMode}
		<input
			id="theme-name-input"
			name="theme-name-input"
			type="text"
			bind:value={newName}
			on:keypress={(e) => handleKeyPress(e.key)}
			style={themeNameStyles}
			use:focusInput
		/>
	{:else}
		<span id="theme-name" title="Click to change theme name" style={themeNameStyles}>{themeName}</span>
	{/if}
</div>

<style lang="postcss">
	.theme-name-label {
		font-size: 0.85rem;
		line-height: 1;
		flex: 0 1 auto;
		white-space: nowrap;
	}

	.theme-name-wrapper {
		height: 30px;
		border-radius: 4px;
	}

	.theme-name-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 0.5rem;
	}

	#theme-name {
		flex: 1;
		font-size: 0.85rem;
		font-weight: 500;
		font-style: italic;
		line-height: 1;
		text-align: left;
		padding: 6px 4px;
		max-width: 150px;
		background-color: var(--white1);
	}

	#theme-name-input {
		flex: 1;
		line-height: 1;
		border: none;
		outline: none;
		border-radius: 6px;
		font-size: 0.875rem;
		text-align: left;
		padding: 2px 0 2px 4px;
		max-width: 150px;
		background-color: var(--white4);
	}

	.error #theme-name-input,
	.error #theme-name-input:focus {
		outline: 2px solid var(--red2);
		outline-offset: 2px;
	}

	#theme-name-input:focus {
		outline: none;
	}
</style>
