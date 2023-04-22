<script lang="ts">
	import type { ColorPalette } from '$lib/types';

	export let selectedPalette: ColorPalette;
	let displayName: string;
	let tooltip: string;

	$: bgColor = selectedPalette ? `var(--${selectedPalette.componentColor}-hover-bg-color)` : 'var(--white1)';
	$: fgColor = selectedPalette ? `var(--${selectedPalette.componentColor}-fg-color)` : 'var(--black-fg-color)';
	$: displayName = selectedPalette ? selectedPalette.displayName : '';
	$: tooltip = selectedPalette ? `${selectedPalette.displayName} is the selected palette` : 'No Palette Selected';
</script>

<div
	class="option-wrapper"
	title={tooltip}
	style="color: {fgColor}; background-color: {bgColor}; border: 1px solid {fgColor};"
>
	<span>{displayName}</span>
</div>

<style lang="postcss">
	.option-wrapper {
		display: flex;
		align-items: center;
		border-radius: 6px;
		padding: 0 0 0 8px;
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}

	span {
		font-size: 0.9rem;
		font-weight: 500;
		width: 100%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
