<script lang="ts">
	import InputTextBox from '$lib/components/Shared/InputTextBox.svelte';
	import Modal from '$lib/components/Shared/Modal.svelte';
	import ColorFormatSelector from '$lib/components/ThemeEditor/Modals/EditThemeSettingsModal/ColorFormatSelector.svelte';
	import { getAppStore, getThemeEditorStore } from '$lib/context';
	import { CSS_VAR_PREFIX_REGEX } from '$lib/themes';
	import type { ColorFormat, UserThemeFromFile } from '$lib/types';
	import { tick } from 'svelte';

	export let editorId: string;
	let userTheme: UserThemeFromFile;
	let previousSettings: {};
	let modal: Modal;
	let closed: boolean;
	let themeName = '';
	let colorFormat: ColorFormat = null;
	let usesPrefix = false;
	let themePrefix = '';
	let inputTextBox: InputTextBox;
	let state = getThemeEditorStore(editorId);
	let app = getAppStore(editorId);
	let error = false;

	$: if (usesPrefix && inputTextBox) focusInput();
	$: if (usesPrefix && themePrefix) error = !CSS_VAR_PREFIX_REGEX.test(themePrefix);

	export function toggleModal(theme: UserThemeFromFile) {
		if (closed) {
			userTheme = theme;
			themeName = theme.themeName;
			colorFormat = theme.colorFormat;
			usesPrefix = theme.usesPrefix;
			themePrefix = theme.themePrefix;
			previousSettings = { themeName, colorFormat, usesPrefix, themePrefix };
		}
		modal.toggleModal();
		$state.modalOpen = !$state.modalOpen;
	}
	function saveChanges() {
		userTheme.themeName = themeName;
		userTheme.colorFormat = colorFormat;
		userTheme.usesPrefix = usesPrefix;
		userTheme.themePrefix = themePrefix;
		themeName = '';
		colorFormat = null;
		usesPrefix = false;
		themePrefix = '';
		modal.toggleModal();
	}
	function discardChanges() {
		userTheme.themeName = previousSettings['themeName'];
		userTheme.colorFormat = previousSettings['colorFormat'];
		userTheme.usesPrefix = previousSettings['usesPrefix'];
		userTheme.themePrefix = previousSettings['themePrefix'];
		themeName = '';
		colorFormat = null;
		usesPrefix = false;
		themePrefix = '';
		modal.toggleModal();
	}

	async function focusInput() {
		await tick();
		inputTextBox.focus();
	}
</script>

<Modal
	bind:this={modal}
	bind:closed
	title={'Edit Theme Settings'}
	on:discardChanges={() => discardChanges()}
	on:saveChanges={() => saveChanges()}
>
	<div class="edit-theme-settings">
		<label for="theme-name">Theme Name</label>
		<input type="text" id="theme-name" name="theme-name" value={themeName} />

		<label for="css-color-format">CSS Color Format</label>
		<div class="select-wrapper">
			<ColorFormatSelector bind:value={colorFormat} />
		</div>

		<label for="uses-prefix" class="checkbox-label">Add Prefix to Css Var. Names</label>
		<div class="checkbox-wrapper">
			<input type="checkbox" id="uses-prefix" name="uses-prefix" bind:checked={usesPrefix} />
		</div>

		<label for="theme-prefix">CSS Variable Prefix</label>
		<InputTextBox
			{error}
			bind:this={inputTextBox}
			bind:inputText={themePrefix}
			disabled={!usesPrefix}
			id={'theme-prefix'}
		/>
	</div>
</Modal>

<style lang="postcss">
	.edit-theme-settings {
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
		border-radius: 4px;
		justify-self: flex-start;
		background-color: var(--white4);
		padding: 0.25rem;
	}
	.select-wrapper {
		width: 80px;
	}
	.checkbox-label {
		font-size: 0.65rem;
	}
	.checkbox-wrapper {
		width: 20px;
	}
</style>
