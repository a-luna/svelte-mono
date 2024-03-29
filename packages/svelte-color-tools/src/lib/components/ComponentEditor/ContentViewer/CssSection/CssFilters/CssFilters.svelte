<script lang="ts">
	import IgnoreTailwindsCheckbox from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssFilters/IgnoreTailwindsCheckbox.svelte';
	import RuleSelectorList from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssFilters/RuleSelectorList.svelte';
	import UseThemePrefixCheckbox from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssFilters/UseThemePrefixCheckbox.svelte';
	import { getAppContext } from '$lib/stores';
	import { InputTextBox } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let allSelectors: string[];
	export let useThemePrefix = false;
	export let ignoreTailwinds = false;
	export let selector = '';
	export let prefix: string;
	export let themeInitialized: boolean;

	interface CssFiltersEvent {
		ignoreTailwindsChanged: { ignore: boolean };
		useThemePrefixChanged: { usePrefix: boolean };
		componentPrefixChanged: { newPrefix: string };
	}
	const dispatch = createEventDispatcher<CssFiltersEvent>();
	let { themeEditor } = getAppContext();

	$: themePrefixExists = Boolean($themeEditor?.userTheme?.usesPrefix && $themeEditor?.userTheme?.themePrefix);
	$: themePrefixInputTextBoxDisabled = !themeInitialized || (themeInitialized && useThemePrefix && themePrefixExists);
	$: if (ignoreTailwinds || !ignoreTailwinds) dispatch('ignoreTailwindsChanged', { ignore: ignoreTailwinds });
	$: if (!themeInitialized) prefix = '';
	$: if (useThemePrefix || !useThemePrefix) dispatch('useThemePrefixChanged', { usePrefix: useThemePrefix });
	$: if (useThemePrefix && themePrefixExists) prefix = $themeEditor?.userTheme?.themePrefix;
	$: if (prefix) dispatch('componentPrefixChanged', { newPrefix: prefix });

	export function handleUserThemeUpdated(usesPrefix: boolean) {
		useThemePrefix = usesPrefix;
	}
</script>

<div class="css-filters">
	<span class="prefix-label label">Component Prefix:</span>
	<InputTextBox
		bind:inputText={prefix}
		disabled={themePrefixInputTextBoxDisabled}
		id={'theme-prefix-textbox'}
		style="grid-column: 1 / span 1; grid-row: 2 / span 1;"
	/>
	<UseThemePrefixCheckbox bind:checked={useThemePrefix} disabled={!themeInitialized} />
	<span class="selector-label label">CSS Rule Selector:</span>
	<RuleSelectorList {allSelectors} bind:value={selector} on:cssRuleSelectorChanged />
	<IgnoreTailwindsCheckbox bind:checked={ignoreTailwinds} />
</div>

<style lang="postcss">
	.css-filters {
		display: grid;
		grid-template-columns: 2fr auto 3fr auto;
		grid-template-rows: auto auto;
		column-gap: 1em;
		row-gap: 0.25rem;
		padding: 1rem 1rem 0 1rem;
	}
	.label {
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1;
	}
	.prefix-label {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.selector-label {
		grid-column: 3 / span 1;
		grid-row: 1 / span 1;
	}
</style>
