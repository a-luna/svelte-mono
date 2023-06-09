<script lang="ts">
	import { alphaBgPattern } from '$lib/constants';
	import type { CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColor;
	export let iconSize = '';
	export let iconTooltip = '';
	export let style = '';
	const dispatch = createEventDispatcher();

	$: wrapperGrid = $$slots.icon ? `grid-template-rows: 1fr ${iconSize};` : 'grid-template-rows: 1fr;';
	$: swatchColor = color?.hasAlpha ? alphaBgPattern : 'background-color: inherit;';
	$: swatchGrid = $$slots.icon ? 'grid-row: 1 / span 2;' : 'grid-row: 1 / span 1;';
	$: overlayColor = `background-color: ${color?.hslaString};`;
	$: overlayPointer = color?.hasAlpha ? `pointer-events: none;` : '';
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
		width: var(--swatch-size);
		height: var(--swatch-size);
	}

	.swatch {
		z-index: 1;
		position: relative;
		grid-column: 1 / span 1;
	}

	.swatch-overlay {
		z-index: 2;
		grid-column: 1 / span 1;
		border-radius: 4px;
	}

	:global(#x11-palettes) .swatch-overlay,
	:global(.dropdown) .swatch-overlay {
		border-radius: 0;
	}

	.icon {
		z-index: 3;
		cursor: pointer;
		padding: 0 0 0.25rem 0.25rem;
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
</style>
