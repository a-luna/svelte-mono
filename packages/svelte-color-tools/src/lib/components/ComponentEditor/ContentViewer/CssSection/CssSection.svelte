<script lang="ts">
	import CssControls from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssControls/CssControls.svelte';
	import CssCustomPropTable from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssCustomPropTable.svelte';
	import CssFilters from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssFilters/CssFilters.svelte';
	import { getAppContext } from '$lib/stores';
	import type { CssVariable } from '$lib/types';
	import { getAllCssVariables } from '$lib/util';
	import type { TableState } from '@a-luna/svelte-simple-tables/types';
	import { onMount, tick } from 'svelte';

	export let themeInitialized: boolean;
	let { themeEditor } = getAppContext();
	let data: CssVariable[];
	let allCustomProps: CssVariable[];
	let selectedCustomProps: CssVariable[];
	let allSelectors: string[];
	let selectorWhiteList: string;
	let prefix = '';
	let useThemePrefix = false;
	let ignoreTailwinds: boolean;
	let totalFiltered: number;
	let totalSelected: number;
	let allCustomPropsSelected: boolean;
	let anyCustomPropsSelected: boolean;
	let tableState: TableState<CssVariable>;
	let cssFilters: CssFilters;

	const selectorBlackList = '.theme-editor-wrapper';

	$: allCustomProps = getAllCssVariables({ ignoreTailwinds: false });
	$: totalCustomProps = allCustomProps.length;
	$: if (allCustomProps) {
		data = refreshCssCustomProps(ignoreTailwinds, [], prefix, selectorWhiteList, selectorBlackList);
		allSelectors = getUniqueSelectors();
	}
	$: if (prefix) {
		data = refreshCssCustomProps(ignoreTailwinds, [], prefix, selectorWhiteList, selectorBlackList);
	}
	$: totalFiltered = data.length;
	$: selectedCustomProps = data.filter((data) => data.addToTheme);
	$: totalSelected = selectedCustomProps.length;
	$: allCustomPropsSelected = totalSelected === totalFiltered;
	$: anyCustomPropsSelected = totalSelected > 0;

	export function handleUserThemeChanged(usePrefix: boolean, newPrefix: string) {
		cssFilters.handleUserThemeUpdated(usePrefix);
		handleComponentPrefixChanged(new CustomEvent('useThemePrefixChanged', { detail: { newPrefix } }));
	}

	function refreshCssCustomProps(
		ignoreTailwinds: boolean,
		prefixBlackList: string[],
		prefix: string,
		selectorWhiteList: string,
		selectorBlackList: string,
	): CssVariable[] {
		try {
			return getAllCssVariables({
				ignoreTailwinds,
				prefixBlackList,
				prefixWhiteList: prefix ? [prefix] : [],
				selectorWhiteList: selectorWhiteList ? [selectorWhiteList] : [],
				selectorBlackList: selectorBlackList ? [selectorBlackList] : [],
			});
		} catch {
			return [];
		}
	}

	function handleTableClicked(target: EventTarget | null) {
		if (target && target instanceof HTMLElement && target.nodeName === 'INPUT') {
			const customProp = data.find((prop) => prop.id === target.dataset.propId);
			if (customProp) {
				customProp.addToTheme = !customProp.addToTheme;
				data = [...data];
			}
		}
	}

	function selectAllCustomProperties(e: CustomEvent<null>) {
		data.forEach((prop) => (prop.addToTheme = true));
		refreshTable(false);
	}

	function deselectAllCustomProperties(e: CustomEvent<null>) {
		data.forEach((prop) => (prop.addToTheme = false));
		refreshTable(false);
	}

	function getUniqueSelectors(): string[] {
		const allSelectors = allCustomProps.map((prop) => prop.selector.split(',').map((s) => s.trim())).flat();
		return [...new Set(allSelectors)].sort();
	}

	function handleComponentPrefixChanged(e: CustomEvent<{ newPrefix: string }>) {
		const { newPrefix } = e.detail;
		prefix = newPrefix;
		refreshTable();
	}

	function handleCssRuleSelectorChanged(e: CustomEvent<{ selector: string }>) {
		const { selector } = e.detail;
		selectorWhiteList = selector;
		refreshTable();
	}

	function handleIgnoreTailwindsChanged(e: CustomEvent<{ ignore: boolean }>) {
		const { ignore } = e.detail;
		ignoreTailwinds = ignore;
		refreshTable();
	}

	function handleUseThemePrefixChanged(e: CustomEvent<{ usePrefix: boolean }>) {
		const { usePrefix } = e.detail;
		useThemePrefix = usePrefix;
		refreshTable();
	}

	function refreshTable(refreshData = true) {
		if (refreshData) {
			data = refreshCssCustomProps(ignoreTailwinds, [], prefix, selectorWhiteList, selectorBlackList);
		} else {
			data = [...data];
		}
		tableState.reset(data.length, $tableState?.pageSize ?? 5);
	}

	onMount(async () => {
		if ($tableState) {
			await tick();
			tableState.reset(data.length, $tableState?.pageSize ?? 5);
		}
	});
</script>

<CssFilters
	bind:this={cssFilters}
	{allSelectors}
	{themeInitialized}
	bind:prefix
	on:componentPrefixChanged={handleComponentPrefixChanged}
	on:cssRuleSelectorChanged={handleCssRuleSelectorChanged}
	on:useThemePrefixChanged={handleUseThemePrefixChanged}
	on:ignoreTailwindsChanged={handleIgnoreTailwindsChanged}
/>
<span class="css-filter-results"
	><strong>{totalFiltered}</strong> custom properties match these filter settings (<strong>{totalCustomProps}</strong> total
	custom properties on page)</span
>
<div class="css-table-wrapper" on:click={(e) => handleTableClicked(e.target)}>
	<CssCustomPropTable {data} bind:tableState />
</div>
<CssControls
	{totalSelected}
	{allCustomPropsSelected}
	{anyCustomPropsSelected}
	on:selectAllCustomProperties={selectAllCustomProperties}
	on:deselectAllCustomProperties={deselectAllCustomProperties}
/>

<style lang="postcss">
	.css-filter-results {
		font-size: 0.8rem;
		padding: 1rem 1rem 0.5rem 1rem;
	}
	strong {
		font-weight: 700;
	}
	.css-table-wrapper {
		padding: 0.5rem 1rem 0 1rem;
	}
</style>
