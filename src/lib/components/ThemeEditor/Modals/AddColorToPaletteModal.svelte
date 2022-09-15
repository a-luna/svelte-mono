<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import InputTextBox from '$lib/components/Shared/InputTextBox.svelte';
	import Modal from '$lib/components/Shared/Modal.svelte';
	import { getAppStore, getThemeEditorStore } from '$lib/context';
	import { ColorParser } from '$lib/parser';
	import { getCssValueForColor } from '$lib/themes';
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import ColorSettings from './ColorSettings.svelte';

	export let editorId: string;
	let modal: Modal;
	let closed: boolean;
	let themeColor: ThemeColor;
	let propName = '';
	let propValue = '';
	let cssVarName = '';
	let displayName = '';
	let disableSaveButton = false;
	let state = getThemeEditorStore(editorId);
	let app = getAppStore(editorId);
	const dispatch = createEventDispatcher();

	$: selectedPalette = $app?.selectedThemePalette?.displayName;

	export function toggleModal(color: string = null) {
		if (closed) {
			const parsed = ColorParser.parse(color).value;
			setDefaultValues(color);
		}
		modal.toggleModal();
		$state.modalOpen = !$state.modalOpen;
	}

	function setDefaultValues(color: string) {
		const parsed = ColorParser.parse(color).value;
		themeColor = { color: parsed };
		propName = '';
		propValue = getCssValueForColor(themeColor, $state.userTheme.colorFormat);
		cssVarName = '';
		displayName = '';
		themeColor.isSelected = false;
	}

	function saveChanges() {
		themeColor.propName = propName;
		themeColor.value = propValue;
		themeColor.cssVarName = cssVarName;
		themeColor.displayName = displayName;
		themeColor.color.name = displayName;
		dispatch('addNewColor', themeColor);
		toggleModal();
	}

	function submitForm() {
		if (!disableSaveButton) {
			saveChanges();
		}
	}
</script>

<Modal
	bind:this={modal}
	bind:closed
	title={'Add Color To Palette'}
	{disableSaveButton}
	on:discardChanges={() => toggleModal()}
	on:saveChanges={() => saveChanges()}
>
	<div class="color-details">
		<div class="color-swatch-wrapper">
			<label for="color-swatch">Add color</label>
			<div class="swatch-border">
				<ColorSwatch color={themeColor?.color} swatchWidth={'39px'} swatchHeight={'20px'} />
			</div>
		</div>
		<div class="pallete-name-wrapper">
			<label for="palette-name">To Palette</label>
			<InputTextBox id={'palette-name'} bind:inputText={selectedPalette} readonly={true} />
		</div>
		<ColorSettings
			{editorId}
			bind:propName
			bind:propValue
			bind:displayName
			bind:cssVarNameFinal={cssVarName}
			bind:validationError={disableSaveButton}
			on:submit={() => submitForm()}
		/>
	</div>
</Modal>

<style lang="postcss">
	.color-details {
		--input-text-font-size: 0.9rem;

		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(5, 34px);
		row-gap: 0.5rem;
		column-gap: 1rem;
		align-items: center;
		white-space: nowrap;
	}
	.color-swatch-wrapper {
		flex: 0 1 auto;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.pallete-name-wrapper {
		flex: 0 1 auto;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 0.5rem;

		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
	label {
		font-weight: 500;
		text-align: right;
	}
	.swatch-border {
		border: 2px inset var(--color-swatch-button-border-color);
		grid-column: 2 / span 1;
	}
</style>
