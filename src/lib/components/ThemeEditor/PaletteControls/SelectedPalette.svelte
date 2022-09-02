<script lang="ts">
	import type { ColorPalette } from '$lib/types';

	export let selectedPalette: ColorPalette;
	let bgColor: string;
	let swatchColor: string;
	let displayName: string;
	let tooltip: string;

	$: bgColor = selectedPalette ? 'var(--white3)' : 'var(--white1)';
	$: swatchColor = selectedPalette ? `var(--${selectedPalette.componentColor}-fg-color)` : 'inherit';
	$: displayName = selectedPalette ? selectedPalette.displayName : 'No Palette Selected';
	$: tooltip = selectedPalette ? `${selectedPalette.displayName} is the selected palette` : 'No Palette Selected';
</script>

<div class="option-wrapper" title={tooltip} style="background-color: {bgColor}">
	<div class="color-swatch" style="background-color: {swatchColor}" />
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
		grid-row: 2 / span 1;
	}

	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
