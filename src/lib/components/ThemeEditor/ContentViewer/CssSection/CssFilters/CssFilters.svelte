<script lang="ts">
	import InputTextBox from '$lib/components/Shared/InputTextBox.svelte';
	import IgnoreTailwindsCheckbox from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssFilters/IgnoreTailwindsCheckbox.svelte';
	import RuleSelectorList from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssFilters/RuleSelectorList.svelte';
	import type { ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let allSelectors: string[];
	export let ignoreTailwinds: boolean;
	export let usesTheme: boolean;
	export let themePrefix: string;
	export let selector: string = '';
	export let componentColor: ComponentColor;
	const dispatch = createEventDispatcher();

	$: prefix = usesTheme && themePrefix ? themePrefix : '';
	$: if (ignoreTailwinds || !ignoreTailwinds) {
		dispatch('ignoreTailwindsChanged', ignoreTailwinds);
	}
</script>

<div
	class="css-filters"
	style="--bg-color: var(--{componentColor}-bg-color); --fg-color: var(--{componentColor}-fg-color); --active-fg-color: var(--{componentColor}-active-fg-color); --disabled-bg-color: var(--{componentColor}-hover-bg-color);  --hover-bg-color: var(--{componentColor}-hover-bg-color);"
>
	<span class="prefix-label label">Component Prefix:</span>
	<InputTextBox
		bind:inputText={prefix}
		disabled={true}
		id={'theme-prefix-textbox'}
		style="grid-column: 1 / span 1; grid-row: 2 / span 1;"
	/>
	<span class="selector-label label">CSS Rule Selector:</span>
	<RuleSelectorList {allSelectors} bind:value={selector} on:cssRuleSelectorChanged />
	<IgnoreTailwindsCheckbox {componentColor} bind:checked={ignoreTailwinds} />
</div>

<style lang="postcss">
	.css-filters {
		--select-menu-width: 100%;
		--select-menu-bg-color: var(--bg-color);
		--select-menu-hover-bg-color: var(--hover-bg-color);
		--select-menu-text-color: var(--fg-color);
		--select-menu-border-color: var(--fg-color);
		--select-menu-padding: 0 4px;
		--select-menu-height: 30px;
		--select-menu-dropdown-height: 300px;
		--select-menu-no-selection-text-color: var(--active-fg-color);
		--input-font-size: 0.875rem;
		--input-text-border-color: var(--fg-color);
		--input-text-fg-color: var(--fg-color);
		--input-text-bg-color: var(--bg-color);

		display: grid;
		grid-template-columns: 1fr 1fr auto;
		grid-template-rows: auto auto;
		column-gap: 1em;
		row-gap: 0.25rem;
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
		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
</style>
