<script lang="ts">
	import AddPaletteButton from '$lib/components/ComponentEditor/UserTheme/PaletteEditor/AddPaletteButton.svelte';
	import EditPaletteForm from '$lib/components/ComponentEditor/UserTheme/PaletteEditor/EditPaletteForm.svelte';
	import { getAppContext } from '$lib/context';
	import { createEventDispatcher } from 'svelte';

	let { themeEditor } = getAppContext();
	const dispatchCreatePalette = createEventDispatcher<{ createPalette: {} }>();

	$: disabled = $themeEditor.userTheme.palettes.length === 1;
</script>

<div class="palette-editor">
	<div class="palette-list">
		{#each $themeEditor.userTheme.palettes as palette, i (palette.id)}
			<EditPaletteForm bind:palette {disabled} paletteNumber={i + 1} on:deletePalette />
		{/each}
	</div>
	<div class="add-palette-controls">
		<AddPaletteButton on:click={() => dispatchCreatePalette('createPalette')} />
	</div>
</div>

<style lang="postcss">
	.palette-editor {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
	}

	.palette-list {
		--select-list-default-border-color: var(--black1);
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 0.25rem;
		width: 100%;
	}

	.add-palette-controls {
		width: 115px;
	}
</style>
