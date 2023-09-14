<script lang="ts">
	import { alphaBgPattern, alphaBgPatternSmall } from '$lib/constants';
	import type { CssColorForColorSpace } from '@a-luna/shared-ui';

	export let color: CssColorForColorSpace;
	export let variant: 'small' | 'regular' = 'regular';
	export let style = '';

	$: hasAlpha = color.rgb.a !== 255;
	$: swatchColor =
		hasAlpha && variant === 'regular'
			? alphaBgPattern
			: hasAlpha && variant === 'small'
			? alphaBgPatternSmall
			: 'background-color: inherit;';
	$: overlayColor = `background-color: ${color.oklchString};`;
</script>

<div class="swatch-wrapper" {style}>
	<div class="swatch" style={swatchColor} />
	<div class="swatch-overlay" style={overlayColor} />
</div>

<style lang="postcss">
	.swatch-wrapper {
		cursor: pointer;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		width: var(--swatch-width);
		height: var(--swatch-height);
	}

	.swatch {
		z-index: 1;
		position: relative;
		grid-row: 1 / span 1;
		grid-column: 1 / span 1;
		place-self: center;
		width: 95%;
		height: 95%;
	}

	.swatch-overlay {
		z-index: 2;
		grid-row: 1 / span 1;
		grid-column: 1 / span 1;
	}

	:global(#x11-palettes) .swatch-overlay,
	:global(.dropdown) .swatch-overlay {
		border-radius: 0;
	}

	.icon {
		z-index: 3;
		cursor: pointer;
		padding: 0 0 5px 5px;
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
</style>
