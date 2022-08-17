<script lang="ts">
	import { colorNameisCustomized } from '$lib/color';
	import InputTextBox from '$lib/components/Shared/InputTextBox.svelte';
	import Modal from '$lib/components/Shared/Modal.svelte';
	import { getAppStore, getThemeEditorStore } from '$lib/context';
	import {
		CAMEL_CASE_REGEX,
		convertPropNameToCssVarName,
		convertPropNameToDisplayName,
		exportColorAsCssValue,
	} from '$lib/themes';
	import type { CssColor, ThemeColor } from '$lib/types';
	import { uncapitalize } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let editorId: string;
	let modal: Modal;
	let closed: boolean;
	let themeColor: ThemeColor;
	let propName = '';
	let cssVarName = '';
	let displayName = '';
	let propNameFormatError = false;
	let autoGenCssVarName = true;
	let autoGenDisplayName = true;
	let inputTextBox: InputTextBox;
	let state = getThemeEditorStore(editorId);
	let app = getAppStore(editorId);
	const dispatch = createEventDispatcher();
	const LOWERCASE_REGEX = /^[a-z]+$/;

	$: alphaBg = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");`;
	$: bgColor = `background-color: ${themeColor?.color.hslaString};`;
	$: propNameFormatError =
		autoGenCssVarName || autoGenDisplayName
			? !(CAMEL_CASE_REGEX.test(propName) || LOWERCASE_REGEX.test(propName))
			: false;
	$: if (autoGenCssVarName && propName) cssVarName = convertPropNameToCssVarName($state.userTheme, propName);
	$: if (autoGenDisplayName && propName) displayName = convertPropNameToDisplayName(propName);

	export function toggleModal(color: CssColor) {
		setDefaultValues(color);
		modal.toggleModal();
		inputTextBox.focus();
		$state.modalOpen = !$state.modalOpen;
	}

	function setDefaultValues(color: CssColor) {
		themeColor = { color };
		if (colorNameisCustomized(color)) {
			themeColor.propName = uncapitalize(color.name);
			themeColor.cssVarName = convertPropNameToCssVarName($state.userTheme, themeColor.propName);
			themeColor.displayName = convertPropNameToDisplayName(themeColor.propName);
		} else {
			themeColor.propName = '';
			themeColor.cssVarName = '';
			themeColor.displayName = '';
		}
		themeColor.value = exportColorAsCssValue(themeColor, $state.userTheme.colorFormat);
	}

	function saveChanges() {
		themeColor.propName = propName;
		themeColor.cssVarName = cssVarName;
		themeColor.displayName = displayName;
		themeColor.color.name = displayName;
		dispatch('addNewColor', themeColor);
		modal.toggleModal();
	}
</script>

<Modal
	bind:this={modal}
	bind:closed
	title={'Add Color To Palette'}
	on:discardChanges={() => modal.toggleModal()}
	on:saveChanges={() => saveChanges()}
>
	<div class="color-details">
		<div class="color-swatch-wrapper">
			<label for="color-swatch">Add color</label>
			<div class="swatch-wrapper">
				<div class="swatch" style={themeColor?.color.hasAlpha ? alphaBg : 'background-color: inherit'} />
				<div class="swatch-overlay" style={bgColor} />
			</div>
		</div>
		<div class="pallete-name-wrapper">
			<label for="palette-name">To Palette</label>
			<input
				type="text"
				readonly
				id="palette-name"
				name="palette-name"
				value={$app?.selectedThemePalette?.displayName}
			/>
		</div>

		<label for="color-prop-name">JSON Property Name</label>
		<InputTextBox
			bind:this={inputTextBox}
			bind:inputText={propName}
			id={'color-prop-name'}
			error={propNameFormatError}
		/>

		<label for="css-var-name">CSS Variable Name</label>
		<div class="name-value-wrapper">
			<input readonly={autoGenCssVarName} type="text" id="css-var-name" name="css-var-name" value={cssVarName} />
			<div class="checkbox-wrapper">
				<input type="checkbox" id="auto-css-var-name" name="auto-css-var-name" bind:checked={autoGenCssVarName} />
				<label for="auto-css-var-name">Auto</label>
			</div>
		</div>

		<label for="display-name">Display Name</label>
		<div class="name-value-wrapper">
			<input readonly={autoGenDisplayName} type="text" id="display-name" name="display-name" value={displayName} />
			<div class="checkbox-wrapper">
				<input type="checkbox" id="auto-display-name" name="auto-display-name" bind:checked={autoGenDisplayName} />
				<label for="auto-display-name">Auto</label>
			</div>
		</div>

		<label for="color-prop-value">CSS/JSON Value</label>
		<input type="text" readonly id="color-prop-value" name="color-prop-value" value={themeColor?.value} />
	</div>
</Modal>

<style lang="postcss">
	.color-details {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(5, 34px);
		row-gap: 0.5rem;
		column-gap: 1rem;
		align-items: center;
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
	.swatch-wrapper {
		flex: 0 1 auto;
		width: 39px;
		height: 20px;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.swatch {
		z-index: 1;
		position: relative;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.swatch-overlay {
		z-index: 2;

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
	.name-value-wrapper {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	.name-value-wrapper > input {
		flex: 1;
	}
	.checkbox-wrapper {
		flex: 0 1 auto;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.25rem;
	}
	label {
		font-weight: 500;
		text-align: right;
	}
	input {
		flex: 1;
		border-radius: 4px;
		justify-self: flex-start;
		background-color: var(--white4);
		padding: 0.25rem;
	}
	input[readonly] {
		width: 100%;
		pointer-events: none;
		color: var(--gray4);
		background-color: var(--white2);
		outline: 1px solid var(--black1);
		border-radius: 4px;
		padding: 0.25rem;
	}
</style>
