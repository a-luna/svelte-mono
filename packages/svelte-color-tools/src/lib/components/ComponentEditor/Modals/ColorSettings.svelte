<script lang="ts">
	import { getThemeEditorStore } from '$lib/context';
	import {
		convertPropNameToCssVarName,
		convertPropNameToDisplayName,
		CSS_VAR_NAME_REGEX,
		PROP_NAME_REGEX,
	} from '$lib/theme';
	import { Checkbox, InputTextBox } from '@a-luna/shared-ui';

	export let editorId: string;
	export let propName = '';
	export let propValue = '';
	export let cssVarNameFinal = '';
	export let displayName = '';
	export let validationError = false;
	let cssVarName = '';
	let autoGenDisplayName = true;
	let displayNameIsEmpty: boolean;
	let propNameFormatError = false;
	let state = getThemeEditorStore(editorId);

	const camelCaseTooltip =
		'Since this value is used as the property name of a JSON object, it must be formatted using lowerCamelCase: i.e., words must be written without spaces or punctuation, the separation of words is indicated by a single capitalized letter, except for the the first letter which must be lowercase. Example: "Border Color" -> "borderColor"';

	$: if (autoGenDisplayName || displayName || propName) updateNames();
	$: cssVarNamePrefix = $state?.userTheme?.usesPrefix ? `${$state?.userTheme?.themePrefix}-` : '--';
	$: cssVarNameFinal = cssVarName ? `${cssVarNamePrefix}${cssVarName}` : '';
	$: validationError = propNameFormatError || displayNameIsEmpty;

	function updateNames() {
		cssVarName = propName ? convertPropNameToCssVarName($state.userTheme, propName) : '';
		if (autoGenDisplayName) {
			displayName = propName ? convertPropNameToDisplayName(propName) : '';
		}
	}
</script>

<label for="prop-name" class:error={propNameFormatError}>JSON Property Name</label>
<InputTextBox
	id={'prop-name'}
	bind:inputText={propName}
	bind:error={propNameFormatError}
	regex={PROP_NAME_REGEX}
	required={true}
	tooltip={camelCaseTooltip}
	on:submit
/>

<label for="display-name">Display Name</label>
<div class="name-value-wrapper">
	<InputTextBox
		id={'display-name'}
		bind:inputText={displayName}
		bind:error={displayNameIsEmpty}
		required={true}
		readonly={autoGenDisplayName}
		on:submit
	/>
	<div class="checkbox-wrapper">
		<Checkbox id={'auto-display-name'} bind:checked={autoGenDisplayName}>
			<svelte:fragment slot="rightLabel">Auto</svelte:fragment>
		</Checkbox>
	</div>
</div>

<label for="css-var-name">CSS Variable Name</label>
<InputTextBox
	id={'css-var-name'}
	bind:inputText={cssVarNameFinal}
	required={true}
	readonly={true}
	regex={CSS_VAR_NAME_REGEX}
/>

<label for="prop-value">CSS/JSON Value</label>
<InputTextBox id={'prop-value'} bind:inputText={propValue} readonly={true} />

<style lang="postcss">
	.name-value-wrapper {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
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
	label.error {
		color: var(--red3);
	}
</style>
