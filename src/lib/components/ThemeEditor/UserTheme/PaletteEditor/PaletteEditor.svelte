<script lang="ts">
	import AddPaletteButton from '$lib/components/ThemeEditor/UserTheme/PaletteEditor/AddPaletteButton.svelte';
	import EditPaletteForm from '$lib/components/ThemeEditor/UserTheme/PaletteEditor/EditPaletteForm.svelte';
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
	<AddPaletteButton {color} on:click={() => dispatch('createPalette')} />
</div>

<style lang="postcss">
	.palette-editor {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		width: 287px;
	}

	.palette-list {
		--select-border-color: var(--black1);
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 0.5rem;
		width: 100%;
	}
</style>
