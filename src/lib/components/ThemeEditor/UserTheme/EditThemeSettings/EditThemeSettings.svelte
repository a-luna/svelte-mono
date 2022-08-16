<script lang="ts">
	import InputTextBox from '$lib/components/Shared/InputTextBox.svelte';
	import { CSS_VAR_PREFIX_REGEX } from '$lib/themes';
	import type { UserThemeImported } from '$lib/types';
	import ColorFormatSelector from '../../Modals/EditThemeSettingsModal/ColorFormatSelector.svelte';

	export let userTheme: UserThemeImported;

	$: error = userTheme.usesPrefix ? CSS_VAR_PREFIX_REGEX.test(userTheme.themePrefix) : false;
</script>

<div class="edit-theme-settings">
	<label for="theme-name">Theme Name</label>
	<input type="text" id="theme-name" name="theme-name" value={userTheme.themeName} />

	<label for="css-color-format">CSS Color Format</label>
	<ColorFormatSelector bind:value={userTheme.colorFormat} />

	<label for="uses-prefix" class="checkbox-label">Add Prefix to Css Var. Names</label>
	<input type="checkbox" id="uses-prefix" name="uses-prefix" bind:checked={userTheme.usesPrefix} />

	<label for="theme-prefix">CSS Variable Prefix</label>
	<InputTextBox {error} bind:inputText={userTheme.themePrefix} id={'theme-prefix'} disabled={!userTheme.usesPrefix} />
</div>

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
	}
	input {
		width: 100%;
		border-radius: 4px;
		justify-self: flex-start;
		background-color: var(--white4);
		padding: 0.25rem;
	}
	.checkbox-label {
		font-size: 0.65rem;
	}
</style>
