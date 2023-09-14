<script lang="ts">
	import ColorFormatSelector from '$lib/components/Shared/ColorFormatSelector.svelte';
	import ComponentColorSelector from '$lib/components/Shared/ComponentColorSelector/ComponentColorSelector.svelte';
	import P3ColorFormatSelector from '$lib/components/Shared/P3ColorFormatSelector.svelte';
	import { getAppContext } from '$lib/stores';
	import type { UserThemeSettings } from '$lib/types';
	import { InputTextBox, Modal, type ColorFormat, type ComponentColor } from '@a-luna/shared-ui';
	import { createEventDispatcher, tick } from 'svelte';

	let previousSettings: UserThemeSettings;
	let modal: Modal;
	let closed: boolean;
	let themeName = '';
	let colorFormatSrgb: ColorFormat = 'oklch';
	let colorFormatP3: ColorFormat = 'oklch';
	let usesPrefix = false;
	let themePrefix = '';
	let uiColor: ComponentColor = 'black';
	let uiColorMenuId: string;
	let nameTextBox: InputTextBox;
	let prefixTextBox: InputTextBox;
	let { themeEditor } = getAppContext();
	let themeNameError = false;
	let themePrefixError = false;
	const dispatchUiColorChanged = createEventDispatcher<{ uiColorChanged: {} }>();

	$: if (usesPrefix && prefixTextBox) focusPrefixTextBox();
	$: if (usesPrefix && themePrefix)
		themePrefixError = !themePrefix || !themePrefix.length || themePrefix.indexOf('--') !== 0;
	$: themeNameError = !themeName || !themeName.length;

	export async function toggleModal() {
		modal.toggleModal();
		$themeEditor.modalOpen = !$themeEditor.modalOpen;

		if (!closed) {
			themeName = $themeEditor.userTheme.themeName;
			uiColor = $themeEditor.userTheme.uiColor;
			colorFormatSrgb = $themeEditor.userTheme.colorFormatSrgb;
			colorFormatP3 = $themeEditor.userTheme.colorFormatP3;
			usesPrefix = $themeEditor.userTheme.usesPrefix;
			themePrefix = $themeEditor.userTheme.themePrefix;
			previousSettings = { themeName, uiColor, colorFormatSrgb, colorFormatP3, usesPrefix, themePrefix };
			await focusNameTextBox();
		} else {
			nameTextBox.blur();
			prefixTextBox.blur();
		}
	}
	function saveChanges() {
		$themeEditor.userTheme.themeName = themeName;
		$themeEditor.userTheme.uiColor = uiColor;
		$themeEditor.userTheme.colorFormatP3 = colorFormatP3;
		$themeEditor.userTheme.colorFormatSrgb = colorFormatSrgb;
		$themeEditor.userTheme.usesPrefix = usesPrefix;
		$themeEditor.userTheme.themePrefix = themePrefix;
		themeName = '';
		usesPrefix = false;
		themePrefix = '';
		modal.toggleModal();
		dispatchUiColorChanged('uiColorChanged', {});
	}
	function discardChanges() {
		$themeEditor.userTheme.themeName = previousSettings['themeName'];
		$themeEditor.userTheme.uiColor = previousSettings['uiColor'];
		$themeEditor.userTheme.colorFormatSrgb = previousSettings['colorFormatSrgb'];
		$themeEditor.userTheme.colorFormatP3 = previousSettings['colorFormatP3'];
		$themeEditor.userTheme.usesPrefix = previousSettings['usesPrefix'];
		$themeEditor.userTheme.themePrefix = previousSettings['themePrefix'];
		themeName = '';
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

		<label for="css-color-format">CSS Color Format (sRGB Colors)</label>
		<div class="select-wrapper">
			<ColorFormatSelector bind:value={colorFormatSrgb} />
		</div>

		<label for="css-color-format">CSS Color Format (P3 Colors)</label>
		<div class="select-wrapper">
			<P3ColorFormatSelector bind:value={colorFormatP3} />
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
		--select-list-width: 95px;
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
