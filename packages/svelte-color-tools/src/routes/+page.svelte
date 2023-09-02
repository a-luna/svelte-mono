<script lang="ts">
	import ComponentEditor from '$lib/components/ComponentEditor/ComponentEditor.svelte';
	import ColorFormatSelector from '$lib/components/Shared/ColorFormatSelector.svelte';
	import type { PitchFx } from '$lib/table/PitchFx';
	import type { ThemeEditorStore } from '$lib/types';
	import { ThemeWrapper, type ComponentColor } from '@a-luna/shared-ui';
	import type { TableSettings } from '@a-luna/svelte-simple-tables/types';

	let editorId = 'component-css-editor';
	let color: ComponentColor;
	let state: ThemeEditorStore;

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

	function handleUiColorChanged(e: CustomEvent<{ uiColor: ComponentColor }>) {
		const { uiColor } = e.detail;
		color = uiColor;
	}
</script>

<svelte:head>
	<title>Component Theme Editor by Aaron Luna</title>
</svelte:head>

<!-- <ThemeWrapper {color}>
	<ComponentEditor {editorId} on:uiColorChanged={handleUiColorChanged}>
		<SimpleTable {data} {columnSettings} {tableSettings} />
	</ComponentEditor>
</ThemeWrapper> -->

<ThemeWrapper {color}>
	<ComponentEditor on:uiColorChanged={handleUiColorChanged}>
		<div class="layout">
			<div class="component-wrapper">
				<ColorFormatSelector />
			</div>
			<div class="placeholder" />
		</div>
	</ComponentEditor>
</ThemeWrapper>

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
