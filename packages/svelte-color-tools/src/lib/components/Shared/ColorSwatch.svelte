<script lang="ts">
	import { alphaBgPattern } from '$lib/constants';
	import type { CssColor } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColor;
	export let iconSize = '';
	export let iconTooltip = '';
	export let style = '';
	const dispatch = createEventDispatcher();

	$: wrapperGrid = $$slots.icon ? `grid-template-rows: 1fr ${iconSize};` : 'grid-template-rows: 1fr;';
	$: hasAlpha = color.rgb.a !== 255;
	$: swatchColor = hasAlpha ? alphaBgPattern : 'background-color: inherit;';
	$: swatchGrid = $$slots.icon ? 'grid-row: 1 / span 2;' : 'grid-row: 1 / span 1;';
	$: overlayColor = `background-color: ${color.hslString};`;
	$: overlayPointer = hasAlpha ? `pointer-events: none;` : '';
</script>

<div class="swatch-wrapper" style="{wrapperGrid} {style}">
	<div class="swatch" style="{swatchColor} {swatchGrid}" />
	<div
		class="swatch-overlay"
		style="{overlayColor} {swatchGrid} {overlayPointer}"
		on:click={() => dispatch('swatchClicked')}
	/>
	{#if $$slots.icon}
		<div
			class="icon"
			title={iconTooltip}
			style="width: {iconSize}; height: {iconSize};"
			on:click|stopPropagation={() => dispatch('iconClicked')}
		>
			<slot name="icon" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.swatch-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		width: var(--swatch-width);
		height: var(--swatch-height);
	}

	.swatch {
		z-index: 1;
		position: relative;
		grid-column: 1 / span 1;
		place-self: center;
		width: 95%;
		height: 95%;
	}

	.swatch-overlay {
		z-index: 2;
		grid-column: 1 / span 1;
		border-radius: var(--swatch-border-radius);
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
