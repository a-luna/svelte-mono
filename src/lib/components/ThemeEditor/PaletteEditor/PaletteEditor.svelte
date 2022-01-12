<script lang="ts">
	import AddPaletteButton from '$lib/components/ThemeEditor/PaletteEditor/AddPaletteButton.svelte';
	import FinishEditingButton from '$lib/components/ThemeEditor/PaletteEditor/FinishEditingButton.svelte';
	import { getRandomHexString } from '$lib/helpers';
	import type { ColorPalette } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import EditPaletteForm from '$lib/components/ThemeEditor/PaletteEditor/EditPaletteForm.svelte';

	export let themePalettes: ColorPalette[] = [];
	const dispatch = createEventDispatcher();

	$: disabled = themePalettes.length === 1;

	const createPalette = () =>
		(themePalettes = [...themePalettes, { id: getRandomHexString(4), paletteName: 'my custom palette', colors: [] }]);
	function deletePalette(id: string) {
		themePalettes = [...themePalettes.filter((p) => p.id !== id)];
		dispatch('paletteDeleted', id);
	}
</script>

<div class="palette-editor">
	<div class="editor-top">
		{#each themePalettes as palette, i (palette.id)}
			<EditPaletteForm
				bind:palette
				{disabled}
				paletteNumber={i + 1}
				on:deletePalette={(e) => deletePalette(e.detail)}
			/>
		{/each}
		<AddPaletteButton color={'yellow'} on:click={() => createPalette()} />
	</div>
	<FinishEditingButton color={'yellow'} on:click={() => dispatch('exitEditMode')} />
</div>

<style lang="postcss">
	.palette-editor {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
		width: 100%;
	}

	.editor-top {
		display: flex;
		flex-flow: column nowrap;
		flex: 0 1 auto;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 0.5rem;
		width: 100%;
	}
</style>
