<script lang="ts">
	import ColorSpaceSelector from '$lib/components/ColorPicker/ColorSpaceSelector.svelte';

	import ThemeEditor from '$lib/components/ThemeEditor/ThemeEditor.svelte';
	import type { PitchFx } from '$lib/table/PitchFx';
	import type { TableSettings } from '@a-luna/svelte-simple-tables/types';

	let editorId: string;

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
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'auto',
		pageNavFormat: 'auto',
		rowType: 'barrels',
	};
</script>

<svelte:head>
	<title>Component Theme Editor by Aaron Luna</title>
</svelte:head>

<!-- <ThemeEditor>
	<SimpleTable {data} {columnSettings} {tableSettings} />
</ThemeEditor> -->

<ThemeEditor {editorId}>
	<ColorSpaceSelector />
</ThemeEditor>
