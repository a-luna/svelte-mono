<script lang="ts">
	import ThemeEditor from '$lib/components/ThemeEditor/ThemeEditor.svelte';
	import { columnSettings } from '$lib/table/columnSettings';
	import { data } from '$lib/table/data';
	import type { PitchFx } from '$lib/table/PitchFx';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import type { TableSettings } from '@a-luna/svelte-simple-tables/types';

	const tableSettings: TableSettings<PitchFx> = {
		tableId: 'pfx',
		showHeader: true,
		header: 'Barrels',
		showSortDescription: true,
		sortBy: 'launch_speed',
		sortDir: 'desc',
		tableWrapper: true,
		themeName: 'light',
		clickableRows: false,
		animateSorting: false,
		paginated: false,
		pageSize: 10,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'auto',
		pageNavFormat: 'auto',
		rowType: 'barrels',
	};
</script>

<ThemeEditor>
	<SimpleTable {data} {columnSettings} {tableSettings} />
</ThemeEditor>
