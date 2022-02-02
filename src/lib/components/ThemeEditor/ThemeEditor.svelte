<script lang="ts">
	import { browser } from '$app/env';
	import { createEmptyColorPalette, getX11ColorPalettes } from '$lib/color';
	import ColorEditor from '$lib/components/ThemeEditor/ColorEditor/ColorEditor.svelte';
	import EditPalettesButton from '$lib/components/ThemeEditor/ColorEditor/EditPalettesButton.svelte';
	import FinishEditingButton from '$lib/components/ThemeEditor/PaletteEditor/FinishEditingButton.svelte';
	import PaletteEditor from '$lib/components/ThemeEditor/PaletteEditor/PaletteEditor.svelte';
	import ColorPalettes from '$lib/components/ThemeEditor/Palettes/ColorPalettes.svelte';
	import X11Palettes from '$lib/components/ThemeEditor/Palettes/X11Palettes/X11Palettes.svelte';
	import type { ColorPalette, ColorPickerState, CssColor } from '$lib/types';
	import { onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';

	let x11ColorPalettes: ColorPalette[];
	let themeColorPalettes: ColorPalette[] = [createEmptyColorPalette()];
	let selectedPaletteId: string;
	let selectedPalette: ColorPalette;
	let selectedColor: CssColor;
	let colorPickerState: Writable<ColorPickerState>;
	let editMode: boolean;

	let editThemeName = false;
	let timeout: NodeJS.Timeout;
	let themeName = 'custom theme';
	let newName = themeName;
	let themeNameError = false;
	let waitingForDoubleClick = false;

	$: if (browser) x11ColorPalettes = getX11ColorPalettes();
	$: if (selectedPaletteId) selectedPalette = themeColorPalettes.find((p) => p.id === selectedPaletteId);
	$: if (selectedPalette) {
		selectedPalette.colors = [...selectedPalette.colors];
		themeColorPalettes = [...themeColorPalettes];
		selectedPalette.updated = true;
	}

	$: themeNameError = editThemeName && !newName;
	$: outlineColor = themeNameError ? 'var(--red2)' : `var(--black-fg-color);`;
	$: inputStyles = `outline: 2px solid ${outlineColor}; outline-offset: 2px`;

	function handleThemeNameClicked() {
		if (waitingForDoubleClick) {
			editThemeName = true;
		} else {
			waitingForDoubleClick = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				waitingForDoubleClick = false;
			}, 750);
		}
	}

	const focusInput = (inputElement: HTMLInputElement) => inputElement.focus();

	function handleKeyPress(key: string) {
		if (newName && key === 'Enter') {
			themeName = newName;
			editThemeName = false;
		} else if (key === 'Escape') {
			editThemeName = false;
		}
	}

	function possiblyExitEditMode(key: string) {
		if (editThemeName && key === 'Escape') {
			editThemeName = false;
		}
	}

	function addColorToPalette(newColor: CssColor) {
		if (!selectedPalette.colors.some((c) => c.hex === newColor.hex)) {
			newColor.name = newColor.hslString;
			selectedPalette.colors = [...selectedPalette.colors, newColor];
			themeColorPalettes = [...themeColorPalettes];
			selectedPalette.updated = true;
		}
	}

	function deleteColorFromPalette(deleteColor: CssColor) {
		const remainingColors = selectedPalette.colors.filter((c) => c.hex !== deleteColor.hex);
		selectedPalette.colors = [...remainingColors];
		themeColorPalettes = [...themeColorPalettes];
		selectedPalette.updated = true;
	}

	function handlePaletteDeleted(deletedPaletteId: string) {
		if (selectedPaletteId === deletedPaletteId) {
			selectedPaletteId = '';
			selectedPalette = null;
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<svelte:window on:keydown={(e) => possiblyExitEditMode(e.key)} />

<div id="theme-editor">
	<div class="editor-left-col">
		<ColorEditor
			bind:editMode
			bind:themeColorPalettes
			bind:selectedPaletteId
			bind:colorPickerState
			componentColor={'black'}
			{selectedColor}
			on:paletteSelected={(e) => (selectedPaletteId = e.detail)}
			on:addColorToPalette={(e) => addColorToPalette(e.detail)}
		/>
		{#if x11ColorPalettes !== undefined}
			<X11Palettes {x11ColorPalettes} on:colorSelected={(e) => (selectedColor = e.detail)} />
		{/if}
	</div>
	<div class="editor-right-col">
		<div class="theme-palettes">
			<div class="theme-name-wrapper">
				{#if editThemeName}
					<input
						id="theme-name-input"
						name="theme-name-input"
						type="text"
						bind:value={newName}
						on:keypress={(e) => handleKeyPress(e.key)}
						style={inputStyles}
						use:focusInput
					/>
				{:else}
					<span id="theme-name" title="Doubleclick to change theme name" on:click={() => handleThemeNameClicked()}
						>{themeName}</span
					>
				{/if}
			</div>
			{#if editMode}
				<PaletteEditor
					bind:themeColorPalettes
					color={'black'}
					on:paletteDeleted={(e) => handlePaletteDeleted(e.detail)}
				/>
			{:else}
				<ColorPalettes
					palettes={themeColorPalettes}
					allowMultiplePalettesOpen={true}
					displayColorName={true}
					columns={1}
					on:colorSelected={(e) => (selectedColor = e.detail)}
					on:paletteToggled={(e) => (selectedPaletteId = e.detail)}
					on:deleteColor={(e) => deleteColorFromPalette(e.detail)}
				/>
			{/if}
			<div class="palette-controls">
				<div style="height: 30px" />
				{#if editMode}
					<FinishEditingButton color={'black'} on:click={() => (editMode = false)} />
				{:else}
					<EditPalettesButton color={'black'} on:click={() => (editMode = true)} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	#theme-editor {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		padding: 1rem;
		background-color: var(--light-gray4);
		max-width: 700px;
		margin: 0 auto;
	}

	.editor-left-col {
		flex: 0 1 auto;
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 360px;
	}

	.theme-palettes {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 100%;
	}

	.editor-right-col {
		flex: 1;
		align-items: flex-start;
		width: 100%;
	}

	.theme-name-wrapper,
	.palette-controls {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		gap: 0.5rem;
		width: 100%;
	}

	#theme-name {
		flex: 1;
		background-color: var(--white2);
		font-size: 1rem;
		line-height: 1;
		margin: auto 0;
		text-align: center;
		cursor: pointer;
		padding: 0.5rem 0.25rem;
		border: 1px solid var(--white2);
		border-radius: 6px;
	}

	#theme-name-input {
		flex-grow: 1;
		line-height: 1;
		padding: 0.5rem 0.25rem;
		border: none;
		border-radius: 6px;
		outline: none;
		font-size: 1rem;
		text-align: center;
		background-color: var(--white4);
	}

	#theme-name-input:focus {
		outline: none;
	}
</style>
