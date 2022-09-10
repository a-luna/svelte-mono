<script lang="ts">
	import type { CssVariable } from '$lib/types';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import { createTableStateStore } from '@a-luna/svelte-simple-tables/stores';
	import type { ColumnSettings, TableSettings, TableState } from '@a-luna/svelte-simple-tables/types';

	export let data: CssVariable[] = [];

	const tableSettings: TableSettings<CssVariable> = {
		showHeader: false,
		showSortDescription: false,
		sortBy: 'name',
		sortDir: 'asc',
		tableWrapper: false,
		expandToContainerWidth: true,
		themeName: 'lighter',
		clickableRows: false,
		animateSorting: false,
		paginated: true,
		pageSize: 10,
		pageSizeOptions: [5, 10, 15, 20],
		pageRangeFormat: 'verbose',
		pageNavFormat: 'compact',
		rowType: 'custom properties',
	};
	export let tableState: TableState<CssVariable> = createTableStateStore(data.length, tableSettings);

	const columnSettings: ColumnSettings<CssVariable>[] = [
		{
			propName: 'addToTheme',
			headerText: 'Add',
			tooltip: 'Add this custom property to the current theme',
			colValue: (data: CssVariable): string =>
				`<input type="checkbox" id="add-prop-${data.id}" name="add-prop-${data.id}" data-prop-id="${data.id}"${
					data.addToTheme ? ' checked' : ''
				} />`,
			classList: ['py-2'],
		},
		{
			propName: 'name',
			headerText: 'Custom Property',
			tooltip: 'CSS Custom Property Name',
		},
		{
			propName: 'selector',
			headerText: 'Selector',
			tooltip: 'CSS Rule Selector Text',
		},
		{
			propName: 'value',
			tooltip: 'Value for this instance of the custom property',
			classList: ['whitespace-normal'],
		},
	];
</script>

<SimpleTable bind:tableState {data} {columnSettings} {tableSettings} />

<style lang="postcss">
</style>
