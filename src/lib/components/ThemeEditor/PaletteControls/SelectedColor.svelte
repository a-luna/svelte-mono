<script lang="ts">
	import { parseColorFromString } from '$lib/color';

	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { getThemeEditorStore } from '$lib/context';

	export let editorId: string;
	let state = getThemeEditorStore(editorId);
	let bgColor: string;
	let displayName: string;
	let tooltip: string;

	$: bgColor = $state.colorSelected ? 'var(--white3)' : 'var(--white1)';
	$: swatchColor = $state.colorSelected ? $state.selectedColor.color : parseColorFromString('hsl(0, 0%, 85%)').value;
	$: displayName = $state.colorSelected ? $state.selectedColor.displayName : 'No Color Selected';
	$: tooltip = $state.colorSelected
		? `${$state.selectedColor.displayName} is the selected palette`
		: 'No Palette Selected';
</script>

<div class="option-wrapper" title={tooltip} style="background-color: {bgColor}">
	<div class="swatch-border">
		<ColorSwatch color={swatchColor} swatchWidth={'15px'} swatchHeight={'15px'} />
	</div>
	<span>{displayName}</span>
</div>

<style lang="postcss">
	.option-wrapper {
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		gap: 0.5rem;
		border: 1px solid var(--black1);
		border-radius: 6px;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}

	.swatch-border {
		border: 2px inset var(--color-swatch-button-border-color);
	}
</style>
