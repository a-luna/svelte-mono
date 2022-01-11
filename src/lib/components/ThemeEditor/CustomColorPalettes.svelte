<script lang="ts">
	import ColorPalettes from '$lib/components/ThemeEditor/ColorPalettes.svelte';
	import PaletteEditor from '$lib/components/ThemeEditor/PaletteEditor/PaletteEditor.svelte';
	import type { ColorPalette } from '$lib/types';

	export let themePalettes: ColorPalette[];
	export let editMode = false;

	$: columns = themePalettes.length > 1 ? 2 : 1;
</script>

<div class="flex flex-col flex-nowrap items-end">
	{#if editMode}
		<PaletteEditor bind:themePalettes on:paletteDeleted on:exitEditMode={() => (editMode = false)} />
	{:else}
		<ColorPalettes palettes={themePalettes} color={'green'} {columns} on:colorClicked on:paletteToggled />
	{/if}
</div>
