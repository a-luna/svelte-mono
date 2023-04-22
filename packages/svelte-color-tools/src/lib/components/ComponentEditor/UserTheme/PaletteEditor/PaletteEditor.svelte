<script lang="ts">
	import AddPaletteButton from '$lib/components/ComponentEditor/UserTheme/PaletteEditor/AddPaletteButton.svelte';
	import EditPaletteForm from '$lib/components/ComponentEditor/UserTheme/PaletteEditor/EditPaletteForm.svelte';
	import { getThemeEditorStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editorId: string;
	export let color: ComponentColor;
	let state = getThemeEditorStore(editorId);
	const dispatch = createEventDispatcher();

	$: disabled = $state.userTheme.palettes.length === 1;
</script>

<div class="palette-editor">
	<div class="palette-list">
		{#each $state.userTheme.palettes as palette, i (palette.id)}
			<EditPaletteForm bind:palette {disabled} paletteNumber={i + 1} on:deletePalette />
		{/each}
	</div>
	<div class="add-palette-controls">
		<AddPaletteButton {color} on:click={() => dispatch('createPalette')} />
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
		--select-menu-default-border-color: var(--black1);
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
