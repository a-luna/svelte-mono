<script lang="ts">
	import { browser } from '$app/env';
	import { getNamedColorPalettes } from '$lib/color';
	import ColorEditor from '$lib/components/ThemeEditor/ColorEditor/ColorEditor.svelte';
	import ColorPalettes from '$lib/components/ThemeEditor/Palettes/ColorPalettes.svelte';
	import PaletteEditor from '$lib/components/ThemeEditor/PaletteEditor/PaletteEditor.svelte';
	import { getRandomHexString } from '$lib/helpers';
	import type { ColorPalette, CssColor } from '$lib/types';

	let namedColorPalettes: ColorPalette[];
	let themePalettes: ColorPalette[] = [{ id: getRandomHexString(4), paletteName: 'custom palette', colors: [] }];
	let selectedPalette: ColorPalette;
	let selectedPaletteId: string;
	let colorEditor: ColorEditor;
	let editMode: boolean;

	$: if (browser) namedColorPalettes = getNamedColorPalettes();

	function changeSelectedPalette(paletteId: string) {
		selectedPaletteId = paletteId;
		selectedPalette = themePalettes.find((p) => p.id === paletteId);
		if (selectedPalette) selectedPalette.updated = true;
	}

	function addColorToPalette(newColor: CssColor) {
		selectedPalette.colors = [...selectedPalette.colors, newColor];
		themePalettes = [...themePalettes];
		selectedPalette.updated = true;
	}

	function handlePaletteDeleted(deletedPaletteId: string) {
		if (selectedPaletteId === deletedPaletteId) {
			selectedPaletteId = '';
			selectedPalette = null;
		}
	}
</script>

<div id="theme-editor">
	<div class="color-editor">
		<ColorEditor
			bind:this={colorEditor}
			bind:editMode
			bind:themePalettes
			bind:selectedPaletteId
			on:paletteSelected={(e) => changeSelectedPalette(e.detail)}
			on:addColorToPalette={(e) => addColorToPalette(e.detail)}
		/>
		{#if namedColorPalettes !== undefined}
			<ColorPalettes
				palettes={namedColorPalettes}
				displayName={false}
				color={'blue'}
				columns={2}
				on:colorSelected={(e) => colorEditor.setColor(e.detail, false)}
			/>
		{/if}
	</div>
	<div class="theme-palettes">
		{#if editMode}
			<PaletteEditor
				bind:themePalettes
				on:paletteDeleted={(e) => handlePaletteDeleted(e.detail)}
				on:exitEditMode={() => (editMode = false)}
			/>
		{:else}
			<ColorPalettes
				palettes={themePalettes}
				displayName={true}
				color={'green'}
				columns={1}
				on:colorSelected={(e) => colorEditor.setColor(e.detail, true)}
				on:paletteToggled={(e) => changeSelectedPalette(e.detail)}
			/>
		{/if}
	</div>
</div>

<style lang="postcss">
	#theme-editor {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		padding: 1rem;
		background-color: var(--light-gray3);
	}

	.color-editor {
		flex: 0 1 auto;
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 393px;
	}

	.theme-palettes {
		flex: 1;
		align-items: flex-start;
		width: 100%;
	}
</style>
