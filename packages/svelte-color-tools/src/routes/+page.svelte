<script lang="ts">
	import ColorSpaceSelector from '$lib/components/ColorPicker/ColorSpaceSelector.svelte';
	import ComponentEditor from '$lib/components/ComponentEditor/ComponentEditor.svelte';
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
		expandToContainerWidth: true,
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

<!-- <ComponentEditor {editorId}>
	<SimpleTable {data} {columnSettings} {tableSettings} />
</ComponentEditor> -->

<ComponentEditor {editorId}>
	<div class="layout">
		<div class="component-wrapper">
			<ColorSpaceSelector />
		</div>
		<div class="placeholder" />
	</div>
</ComponentEditor>

<!-- <ComponentEditor {editorId}>
	<InputTextBox inputText={'Hello, world!'} />
</ComponentEditor> -->

<style lang="postcss">
	.layout {
		display: flex;
	}

	.component-wrapper {
		flex: 0 0 113px;
	}

	.placeholder {
		flex: 1;
	}
</style>
