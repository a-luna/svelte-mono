<script lang="ts">
	import ColorFormatSelector from '$lib/components/ComponentEditor/Modals/EditThemeSettingsModal/ColorFormatSelector.svelte';
	import ComponentColorSelector from '$lib/components/Shared/ComponentColorSelector/ComponentColorSelector.svelte';
	import { getThemeEditorStore } from '$lib/context';
	import type { UserThemeFromFile, UserThemeSettings } from '$lib/types';
	import { InputTextBox, Modal, type ColorFormat, type ComponentColor } from '@a-luna/shared-ui';
	import { createEventDispatcher, tick } from 'svelte';

	export let editorId: string;
	let userTheme: UserThemeFromFile;
	let previousSettings: UserThemeSettings;
	let modal: Modal;
	let closed: boolean;
	let themeName = '';
	let colorFormat: ColorFormat = 'rgb';
	let usesPrefix = false;
	let themePrefix = '';
	let uiColor: ComponentColor = 'black';
	let uiColorMenuId: string;
	let nameTextBox: InputTextBox;
	let prefixTextBox: InputTextBox;
	let state = getThemeEditorStore(editorId);
	let themeNameError = false;
	let themePrefixError = false;
	const dispatch = createEventDispatcher();

	$: if (usesPrefix && prefixTextBox) focusPrefixTextBox();
	$: if (usesPrefix && themePrefix)
		themePrefixError = !themePrefix || !themePrefix.length || themePrefix.indexOf('--') !== 0;
	$: themeNameError = !themeName || !themeName.length;

	export async function toggleModal(theme: UserThemeFromFile) {
		modal.toggleModal();
		$state.modalOpen = !$state.modalOpen;

		if (!closed) {
			userTheme = theme;
			themeName = theme.themeName;
			uiColor = theme.uiColor;
			colorFormat = theme.colorFormat;
			usesPrefix = theme.usesPrefix;
			themePrefix = theme.themePrefix;
			previousSettings = { themeName, uiColor, colorFormat, usesPrefix, themePrefix };
			await focusNameTextBox();
		} else {
			nameTextBox.blur();
			prefixTextBox.blur();
		}
	}
	function saveChanges() {
		userTheme.themeName = themeName;
		userTheme.uiColor = uiColor;
		userTheme.colorFormat = colorFormat;
		userTheme.usesPrefix = usesPrefix;
		userTheme.themePrefix = themePrefix;
		themeName = '';
		usesPrefix = false;
		themePrefix = '';
		modal.toggleModal();
		dispatch('updateUiColor', userTheme.uiColor);
		dispatch('updateColorFormat', userTheme.colorFormat);
		dispatch('updateComponentPrefix', userTheme);
	}
	function discardChanges() {
		userTheme.themeName = previousSettings['themeName'];
		userTheme.uiColor = previousSettings['uiColor'];
		userTheme.colorFormat = previousSettings['colorFormat'];
		userTheme.usesPrefix = previousSettings['usesPrefix'];
		userTheme.themePrefix = previousSettings['themePrefix'];
		themeName = '';
		uiColor = 'black';
		colorFormat = previousSettings['colorFormat'];
		usesPrefix = false;
		themePrefix = '';
		modal.toggleModal();
	}

	async function focusNameTextBox() {
		await tick();
		nameTextBox.focus();
	}

	async function focusPrefixTextBox() {
		await tick();
		prefixTextBox.focus();
	}
</script>

<Modal
	bind:this={modal}
	bind:closed
	title={'Edit Theme Settings'}
	disableSaveButton={themeNameError || themePrefixError}
	on:discardChanges={() => discardChanges()}
	on:saveChanges={() => saveChanges()}
>
	<div class="edit-theme-settings">
		<label for="theme-name">Theme Name</label>
		<InputTextBox error={themeNameError} bind:this={nameTextBox} bind:inputText={themeName} id={'theme-name'} />

		<label for={uiColorMenuId}>UI Color</label>
		<ComponentColorSelector bind:menuId={uiColorMenuId} bind:value={uiColor} />

		<label for="css-color-format">CSS Color Format</label>
		<div class="select-wrapper">
			<ColorFormatSelector bind:value={colorFormat} />
		</div>

		<label for="uses-prefix">Use Theme Prefix?</label>
		<div class="checkbox-wrapper">
			<input type="checkbox" id="uses-prefix" name="uses-prefix" bind:checked={usesPrefix} />
		</div>

		<label for="theme-prefix">CSS Variable Prefix</label>
		<InputTextBox
			error={themePrefixError}
			bind:this={prefixTextBox}
			bind:inputText={themePrefix}
			disabled={!usesPrefix}
			id={'theme-prefix'}
		/>
	</div>
</Modal>

<style lang="postcss">
	.edit-theme-settings {
		--select-list-width: 80px;
		--select-list-height: 30px;
		--select-list-margin: 0 6px 0 0;
		--select-list-padding: 4px 10px;

		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(4, auto);
		row-gap: 0.5rem;
		column-gap: 1rem;
		align-items: center;
	}
	label {
		font-size: 0.85rem;
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;
		text-align: right;
	}
	input {
		width: 100%;
		border-radius: 6px;
		justify-self: flex-start;
		background-color: var(--white4);
		padding: 0.25rem;
	}
	.select-wrapper {
		width: 80px;
	}
	.checkbox-wrapper {
		width: 20px;
	}
</style>
