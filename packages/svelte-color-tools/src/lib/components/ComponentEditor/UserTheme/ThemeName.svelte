<script lang="ts">
	export let themeName = '';
	export let editMode = false;
	let newName = themeName;
	let error = false;

	$: error = editMode && !newName;

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
	<span class="theme-name-label">theme name</span>
	{#if editMode}
		<input
			id="theme-name-input"
			name="theme-name-input"
			type="text"
			bind:value={newName}
			on:keypress={(e) => handleKeyPress(e.key)}
			use:focusInput
		/>
	{:else}
		<div class="theme-name">
			<span title="Click to change theme name">{themeName}</span>
		</div>
	{/if}
</div>

<style lang="postcss">
	.theme-name-wrapper {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr;
		grid-template-rows: auto 32px;
		row-gap: 0.25rem;
		border-radius: 6px;
	}

	.theme-name-label {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1px;
		flex: 0 1 auto;
		white-space: nowrap;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}

	.theme-name {
		flex: 1;
		display: flex;
		align-items: center;
		color: var(--fg-color);
		background-color: var(--active-bg-color);
		border: 1px solid var(--fg-color);
		border-radius: 6px;
		padding: 0 0 0 8px;
		height: 32px;

		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}

	.theme-name span {
		font-size: 0.85rem;
		font-weight: 500;
		width: 100%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#theme-name-input {
		flex: 1;
		color: var(--fg-color);
		background-color: var(--active-bg-color);
		border: 1px solid var(--fg-color);
		outline: none;
		border-radius: 6px;
		font-size: 0.85rem;
		text-align: left;

		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
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
