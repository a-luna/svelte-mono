<script lang="ts">
	import { defaultColorPalette, type ColorPalette } from '@a-luna/shared-ui';

	export let selectedPalette: ColorPalette;
	let displayName: string;
	let tooltip: string;

	$: displayName = selectedPalette !== defaultColorPalette ? selectedPalette.displayName : '';
	$: tooltip =
		selectedPalette !== defaultColorPalette
			? `${selectedPalette.displayName} is the selected palette`
			: 'No Palette Selected';
</script>

<div class="option-wrapper" title={tooltip}>
	<span>{displayName}</span>
</div>

<style lang="postcss">
	.option-wrapper {
		display: flex;
		align-items: center;
		color: var(--fg-color);
		background-color: var(--active-bg-color);
		border: 1px solid var(--fg-color);
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
