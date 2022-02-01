<script lang="ts">
	import { createEmptyColorPalette } from '$lib/color';
	import AddPaletteButton from '$lib/components/ThemeEditor/PaletteEditor/AddPaletteButton.svelte';
	import EditPaletteForm from '$lib/components/ThemeEditor/PaletteEditor/EditPaletteForm.svelte';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let themeColorPalettes: ColorPalette[] = [];
	export let color: ComponentColor;
	const dispatch = createEventDispatcher();

	$: disabled = themeColorPalettes.length === 1;

	const createPalette = () =>
		(themeColorPalettes = [...themeColorPalettes, createEmptyColorPalette(`palette ${themeColorPalettes.length + 1}`)]);
	function deletePalette(id: string) {
		themeColorPalettes = [...themeColorPalettes.filter((p) => p.id !== id)];
		dispatch('paletteDeleted', id);
	}
</script>

<div class="palette-editor">
	<div class="palette-list">
		{#each themeColorPalettes as palette, i (palette.id)}
			<EditPaletteForm
				bind:palette
				{disabled}
				paletteNumber={i + 1}
				on:deletePalette={(e) => deletePalette(e.detail)}
			/>
		{/each}
	</div>
	<AddPaletteButton {color} on:click={() => createPalette()} />
</div>

<style lang="postcss">
	.palette-editor {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		width: 100%;
	}

	.palette-list {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 0.5rem;
		width: 100%;
	}
</style>
