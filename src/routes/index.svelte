<script lang="ts">
	import { browser } from '$app/env';
	import { getNamedColorPalettes } from '$lib/color';
	import ColorEditor from '$lib/components/ThemeEditor/ColorEditor.svelte';
	import ColorPalettes from '$lib/components/ThemeEditor/ColorPalettes.svelte';
	import CustomColorPalettes from '$lib/components/ThemeEditor/CustomColorPalettes.svelte';
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

	function addNewColor(newColor: CssColor) {
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

<div id="theme-editor" class="flex flex-row gap-4">
	<div class="flex flex-col flex-nowrap gap-2">
		<ColorEditor
			bind:this={colorEditor}
			bind:editMode
			bind:themePalettes
			bind:selectedPaletteId
			on:paletteSelected={(e) => changeSelectedPalette(e.detail)}
			on:addNewColor={(e) => addNewColor(e.detail)}
		/>
		{#if namedColorPalettes !== undefined}
			<ColorPalettes
				palettes={namedColorPalettes}
				color={'blue'}
				on:colorClicked={(e) => colorEditor.setColor(e.detail, true)}
			/>
		{/if}
	</div>
	<CustomColorPalettes
		bind:themePalettes
		bind:editMode
		on:colorClicked={(e) => colorEditor.setColor(e.detail, true)}
		on:paletteDeleted={(e) => handlePaletteDeleted(e.detail)}
		on:paletteToggled={(e) => changeSelectedPalette(e.detail)}
	/>
</div>

<style lang="postcss">
	#theme-editor {
		width: 800px;
		padding: 1rem;
		background-color: var(--light-gray3);
	}
</style>
