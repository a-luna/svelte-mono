<script lang="ts">
	import { alphaBgPattern } from '$lib/constants';
	import { getColorPickerStore } from '$lib/stores';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { getCssColorString, oklchToString } from '@a-luna/shared-ui/color/util';
	import { isLabColorFormat } from '@a-luna/shared-ui/typeguards';
	import { createEventDispatcher } from 'svelte';

	export let pickerId: string;
	let picker = getColorPickerStore(pickerId);

	interface ColorSwatchEvent {
		swatchClicked: null;
		iconClicked: null;
	}
	const dispatch = createEventDispatcher<ColorSwatchEvent>();

	$: swatchBorderColor =
		$picker?.colorInGamut?.oklch.l > 20
			? { ...$picker?.colorInGamut?.oklch, l: $picker?.colorInGamut?.oklch.l - 20, a: 1 }
			: { ...$picker?.colorInGamut?.oklch, l: 0, a: 1 };
	$: swatchBorderStyles = `border-color: ${oklchToString(swatchBorderColor)};`;
	$: swatchTextColor =
		$picker?.colorInGamut?.oklch.l > 40
			? { ...$picker?.colorInGamut?.oklch, l: $picker?.colorInGamut?.oklch.l - 40, a: 1 }
			: { ...$picker?.colorInGamut?.oklch, l: 0, a: 1 };
	$: swatchTextStyles = `color: ${oklchToString(swatchTextColor)};`;
	$: pointerStyles = !$picker.editable ? `pointer-events: none` : '';
	$: hasAlpha = $picker.color.rgb.a !== 255;
	$: swatchColor = hasAlpha ? alphaBgPattern : 'background-color: inherit;';
	$: showBothSwatches = $picker.color.space !== 'srgb';
	$: overlayColorP3 = showBothSwatches ? `background: ${getCssColorString($picker.color, 'p3', 'oklch')};` : '';
	$: overlayColorSrgb = `background: ${getCssColorString($picker.color, 'srgb', 'hsl')};`;
	$: selectedColorP3 = isLabColorFormat($picker.colorFormat);
	$: outlineColorSrgb = $picker.color.space !== 'srgb' ? 'red' : 'var(--fg-color)';
	$: outlineColorP3 = $picker.color.space === 'rec2020' || $picker.color.space === 'out' ? 'red' : 'var(--fg-color)';
	$: selectedColorOutlineColor = `outline-color: ${selectedColorP3 ? outlineColorP3 : outlineColorSrgb}`;
</script>

<div
	class="swatch-wrapper"
	class:cursor-not-allowed={!$picker?.editable}
	title={'Click to open color picker'}
	style={pointerStyles}
>
	<div class="swatch" class:hidden={showBothSwatches} style={swatchColor} />
	<button
		class="swatch-overlay"
		class:hidden={showBothSwatches}
		style="{overlayColorSrgb} {swatchBorderStyles}"
		on:click={() => dispatch('swatchClicked')}
	/>
	<div class="swatch-p3" class:hidden={!showBothSwatches} style={swatchColor} />
	<button
		class="swatch-overlay-p3"
		class:hidden={!showBothSwatches}
		class:selected-color={selectedColorP3}
		style="{overlayColorP3} {swatchTextStyles} {swatchBorderStyles} {selectedColorP3 ? selectedColorOutlineColor : ''}"
		on:click={() => dispatch('swatchClicked')}
		>P3
	</button>
	<div class="swatch-srgb" class:hidden={!showBothSwatches} style={swatchColor} />
	<button
		class="swatch-overlay-srgb"
		class:hidden={!showBothSwatches}
		class:selected-color={!selectedColorP3}
		style="{overlayColorSrgb} {swatchTextStyles} {swatchBorderStyles} {selectedColorP3
			? ''
			: selectedColorOutlineColor}"
		on:click={() => dispatch('swatchClicked')}
		>sRGB
	</button>
	<button
		class="icon"
		title={'Open X11 Color Palettes'}
		style="width: var(--x11-color-palettes-icon-size); height: var(--x11-color-palettes-icon-size);"
		on:click|stopPropagation={() => dispatch('iconClicked')}
	>
		<BasicIconRenderer icon={'colorswatches'} />
	</button>
</div>

<style lang="postcss">
	.swatch-wrapper {
		cursor: pointer;
		display: grid;
		grid-template-rows: 53px 4px calc(53px - var(--x11-color-palettes-icon-size)) var(--x11-color-palettes-icon-size);
		grid-template-columns: 1fr;
		border-radius: 6px;
		width: var(--swatch-width);
		height: var(--swatch-height);
	}

	.hidden {
		display: none;
	}

	.selected-color {
		outline-width: 1.5px;
		outline-style: dashed;
		outline-offset: 1px;
	}

	.swatch,
	.swatch-p3,
	.swatch-srgb {
		z-index: 1;
		position: relative;
		place-self: center;
	}

	.swatch {
		height: 96px;
		width: 96px;
		grid-row: 1 / span 4;
		grid-column: 1 / span 1;
	}

	.swatch-p3 {
		height: 90%;
		width: 95%;
		grid-row: 1 / span 1;
		grid-column: 1 / span 1;
	}

	.swatch-srgb {
		height: 90%;
		width: 95%;
		grid-row: 3 / span 2;
		grid-column: 1 / span 1;
	}

	.swatch-overlay,
	.swatch-overlay-p3,
	.swatch-overlay-srgb {
		border-style: solid;
		border-radius: 4px;
		z-index: 2;
	}

	.swatch-overlay {
		border-width: 2px;
		grid-row: 1 / span 4;
		grid-column: 1 / span 1;
	}

	.swatch-overlay-p3 {
		border-width: 1px;
		grid-row: 1 / span 1;
		grid-column: 1 / span 1;
	}

	.swatch-overlay-srgb {
		border-width: 1px;
		grid-row: 3 / span 2;
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
		grid-row: 4 / span 1;
	}
</style>
