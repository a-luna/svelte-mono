<script lang="ts">
	import { alphaBgPattern } from '$lib/constants';
	import { getColorPickerStore } from '$lib/stores';
	import { getCssColorString } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let pickerId: string;
	let picker = getColorPickerStore(pickerId);
	const dispatchSwatchClicked = createEventDispatcher<{ swatchClicked: {} }>();
	const dispatchIconClicked = createEventDispatcher<{ iconClicked: {} }>();

	$: hasAlpha = $picker.color.rgb.a !== 255;
	$: swatchColor = hasAlpha ? alphaBgPattern : 'background-color: inherit;';
	$: overlayColor = `background: ${getCssColorString($picker.color, $picker.colorSpace, $picker.colorFormat)};`;
</script>

<div class="swatch-wrapper">
	<div class="swatch" style={swatchColor} />
	<div class="swatch-overlay" style={overlayColor} on:click={() => dispatchSwatchClicked('swatchClicked')} />
	{#if $$slots.icon}
		<div
			class="icon"
			title={'Open X11 Color Palettes'}
			style="width: 30px; height: 30px;"
			on:click|stopPropagation={() => dispatchIconClicked('iconClicked')}
		>
			<slot name="icon" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.swatch-wrapper {
		cursor: pointer;
		display: grid;
		grid-template-rows: 1fr 30px;
		grid-template-columns: 1fr;
		width: var(--swatch-width);
		height: var(--swatch-height);
	}

	.swatch {
		z-index: 1;
		position: relative;
		grid-row: 1 / span 2;
		grid-column: 1 / span 1;
		place-self: center;
		width: 95%;
		height: 95%;
	}

	.swatch-overlay {
		border-radius: 4px;
		z-index: 2;
		grid-row: 1 / span 2;
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
