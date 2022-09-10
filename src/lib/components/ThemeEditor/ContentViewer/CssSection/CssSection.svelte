<script lang="ts">
	import CssControls from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssControls/CssControls.svelte';
	import CssCustomPropTable from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssCustomPropTable.svelte';
	import CssFilters from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssFilters/CssFilters.svelte';
	import type { ComponentColor, CssVariable } from '$lib/types';
	import { getAllCssVariables } from '$lib/util';
	import type { TableState } from '@a-luna/svelte-simple-tables/types';
	import { onMount, tick } from 'svelte';

	export let componentColor: ComponentColor;
	export let usesTheme: boolean;
	export let themePrefix: string;
	let data: CssVariable[];
	let allCustomProps: CssVariable[];
	let selectedCustomProps: CssVariable[];
	let allSelectors: string[];
	let selector: string;
	let ignoreTailwinds: boolean;
	let totalFiltered: number;
	let totalSelected: number;
	let allCustomPropsSelected: boolean;
	let anyCustomPropsSelected: boolean;
	let tableState: TableState<CssVariable>;

	$: allCustomProps = getAllCssVariables({ ignoreTailwinds: false });
	$: totalCustomProps = allCustomProps.length;
	$: if (allCustomProps) {
		data = refreshCssCustomProps(ignoreTailwinds, [], usesTheme, themePrefix, selector);
		allSelectors = getUniqueSelectors();
	}
	$: if (ignoreTailwinds || usesTheme || themePrefix || selector) {
		data = refreshCssCustomProps(ignoreTailwinds, [], usesTheme, themePrefix, selector);
		totalFiltered = data.length;
		selectedCustomProps = data.filter((data) => data.addToTheme);
		totalSelected = selectedCustomProps.length;
		allCustomPropsSelected = totalSelected === totalFiltered;
		anyCustomPropsSelected = totalSelected > 0;
		data = [...data];
	}

	export function changeComponentPrefix(newUsesTheme: boolean, newPrefix: string) {
		usesTheme = newUsesTheme;
		themePrefix = newPrefix;
		data = refreshCssCustomProps(ignoreTailwinds, [], usesTheme, themePrefix, selector);
		tableState.reset(data.length, $tableState.pageSize);
	}

	function refreshCssCustomProps(
		ignoreTailwinds: boolean,
		prefixBlackList: string[],
		usesTheme: boolean,
		prefix: string,
		selector: string,
	): CssVariable[] {
		const prefixWhiteList = usesTheme && prefix ? [prefix] : [];
		const selectors = selector ? [selector] : [];
		return getAllCssVariables({ ignoreTailwinds, prefixBlackList, prefixWhiteList, selectors });
	}

	function handleTableClicked(target: EventTarget) {
		if (target instanceof HTMLElement && target.nodeName === 'INPUT') {
			const customProp = data.find((prop) => prop.id === target.dataset.propId);
			if (customProp) {
				customProp.addToTheme = !customProp.addToTheme;
				data = [...data];
			}
		}
	}

	function selectAllCustomProperties() {
		data.forEach((prop) => (prop.addToTheme = true));
		data = [...data];
	}

	function deselectAllCustomProperties() {
		data.forEach((prop) => (prop.addToTheme = false));
		data = [...data];
	}

	function getUniqueSelectors(): string[] {
		const allSelectors = allCustomProps.map((prop) => prop.selector.split(',').map((s) => s.trim())).flat();
		return [...new Set(allSelectors)].sort();
	}

	async function handleCssRuleSelectorChanged(newSelector: string) {
		selector = newSelector;
		data = refreshCssCustomProps(ignoreTailwinds, [], usesTheme, themePrefix, selector);
		tableState.reset(data.length, $tableState.pageSize);
	}

	async function handleIgnoreTailwindsChanged(ignore: boolean) {
		console.log({ ignoreTailwinds, totalRows: data.length });
		ignoreTailwinds = ignore;
		data = refreshCssCustomProps(ignoreTailwinds, [], usesTheme, themePrefix, selector);
		console.log({ ignoreTailwinds, totalRows: data.length });
		tableState.reset(data.length, $tableState.pageSize);
	}

	onMount(async () => {
		if ($tableState) {
			await tick();
			tableState.reset(data.length, $tableState.pageSize);
		}
	});
</script>

<CssFilters
	{allSelectors}
	{componentColor}
	{usesTheme}
	bind:ignoreTailwinds
	bind:selector
	bind:themePrefix
	on:cssRuleSelectorChanged={(e) => handleCssRuleSelectorChanged(e.detail)}
	on:ignoreTailwindsChanged={(e) => handleIgnoreTailwindsChanged(e.detail)}
/>
<span class="css-filter-results"
	>{totalCustomProps} found on page, {totalFiltered} match filter, {totalSelected} selected for theme settings</span
>
<div class="css-table-wwrapper" on:click={(e) => handleTableClicked(e.target)}>
	<CssCustomPropTable {data} bind:tableState />
</div>
<CssControls
	{componentColor}
	{allCustomPropsSelected}
	{anyCustomPropsSelected}
	on:selectAllCustomProperties={() => selectAllCustomProperties()}
	on:deselectAllCustomProperties={() => deselectAllCustomProperties()}
/>

<style lang="postcss">
	.css-filter-results {
		margin: 0.5rem 0;
	}
</style>
