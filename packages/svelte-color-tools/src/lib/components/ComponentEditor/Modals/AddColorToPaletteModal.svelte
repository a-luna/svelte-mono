<script lang="ts">
	import ColorSettings from '$lib/components/ComponentEditor/Modals/ColorSettings.svelte';
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { getAppContext } from '$lib/stores';
	import { getCssValueForThemeColor } from '$lib/theme';
	import { InputTextBox, Modal, defaultCssColorForColorSpace, type CssColor, type ThemeColor } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	let modal: Modal;
	let closed: boolean;
	let themeColor: ThemeColor;
	let propName = '';
	let propValue = '';
	let cssVarName = '';
	let displayName = '';
	let disableSaveButton = false;
	let invalidPropName = false;
	let invalidCssVarName = false;
	let { themeEditor, app } = getAppContext();
	const dispatch = createEventDispatcher<{ addNewColor: { color: ThemeColor } }>();

	$: selectedPalette = $app?.selectedThemePalette?.displayName;

	export function addColorToPalette(e: CustomEvent<{ color: CssColor }>) {
		const { color } = e.detail;
		if (closed) {
			setDefaultValues(color);
		}
		toggleModal();
	}

	function toggleModal() {
		modal.toggleModal();
		$themeEditor.modalOpen = !$themeEditor.modalOpen;
	}

	function setDefaultValues(color: CssColor) {
		themeColor = {
			color,
			colorSpace: color.space,
			colorInGamut: color.space === 'srgb' ? color.srbgColor : color.p3Color,
		};
		propName = '';
		const colorFormat =
			color.space === 'srgb' ? $themeEditor.userTheme.colorFormatSrgb : $themeEditor.userTheme.colorFormatP3;
		propValue = getCssValueForThemeColor(themeColor, colorFormat);
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
		dispatch('addNewColor', { color: themeColor });
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
				<ColorSwatch variant={'small'} color={themeColor?.colorInGamut ?? defaultCssColorForColorSpace} />
			</div>
		</div>
		<div class="pallete-name-wrapper">
			<label for="palette-name">To Palette</label>
			<InputTextBox id={'palette-name'} bind:inputText={selectedPalette} readonly={true} />
		</div>
		<ColorSettings
			bind:propName
			bind:propValue
			bind:displayName
			bind:cssVarNameFinal={cssVarName}
			bind:validationError={disableSaveButton}
			bind:invalidPropName
			bind:invalidCssVarName
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
		--swatch-width: 39px;
		--swatch-height: 20px;
		--swatch-border-radius: 0;

		border: 2px inset var(--color-swatch-button-border-color);
		grid-column: 2 / span 1;
	}
</style>
