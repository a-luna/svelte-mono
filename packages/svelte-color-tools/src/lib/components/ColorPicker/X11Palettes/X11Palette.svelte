<svelte:options accessors />

<script lang="ts">
	import X11Color from '$lib/components/ColorPicker/X11Palettes/X11Color.svelte';
	import type { X11ColorPalette } from '@a-luna/shared-ui';
	import { slide } from 'svelte/transition';

	export let palette: X11ColorPalette;
	export let displayPaletteName = true;
	export let columns = 7;
	let colorRefs: Record<string, X11Color> = {};

	$: color = palette.componentColor;
	$: accordionStyles = `--text-color: var(--${color}-fg-color); --hover-text-color: var(--${color}-fg-color); --active-text-color: var(--${color}-fg-color); --border-radius: 6px; --bg-color: var(--${color}-bg-color); --hover-bg-color: var(--${color}-bg-color); --active-bg-color: var(--${color}-bg-color);`;
	$: paletteGrid = `grid-template-columns: repeat(${columns}, minmax(0, 1fr));`;
</script>

<div id="accordion-item-{palette.id}" class="accordion-item {color}" data-state="expanded" style={accordionStyles}>
	<button
		class="accordion-button active transition-color"
		type="button"
		aria-expanded="false"
		aria-controls="accordion-content-{palette.id}"
	>
		{#if displayPaletteName}
			<h2 class="accordion-heading mb-0 w-full" id="accordion-heading-{palette.id}">{palette.displayName}</h2>
		{/if}
	</button>
	<div
		transition:slide|local
		id="accordion-content-{palette.id}"
		class="accordion-content x11-palette transition"
		style="display: grid; {paletteGrid}"
		aria-labelledby="accordion-heading-{palette.id}"
	>
		{#each palette.colors as color}
			<X11Color {color} on:colorSelected bind:this={colorRefs[color.hex]} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.accordion-item {
		border: none;
	}

	button .accordion-heading {
		margin: 0;
		font-weight: 500;
	}

	.accordion-button {
		cursor: default;
		display: flex;
		position: relative;
		align-items: center;
		background-color: var(--bg-color, var(--light-gray1));
		color: var(--text-color, var(--dark-gray2));
		border-radius: 0;
		border: none;
		font-size: 14px;
		line-height: 1;
		outline: 1px solid transparent;
		outline-offset: 1px;
		width: 320px;
		padding: 5px 0 8px 0;
	}

	.accordion-button:hover {
		background-color: var(--hover-bg-color, var(--bg-color, var(--light-gray1)));
		color: var(--hover-text-color, var(--indigo2));
		border-color: var(--hover-border-color, var(--black2));
	}

	.accordion-button.active,
	.accordion-button.active:hover,
	[data-state='expanded'] .accordion-button {
		background-color: var(--active-bg-color, var(--bg-color, var(--light-gray1)));
		color: var(--active-text-color, var(--indigo2));
	}

	.icon {
		width: 14px;
		height: 14px;
		line-height: 14px;
		margin: 0 0 0 4px;
	}

	.accordion-content {
		flex-grow: 1;
		background-color: var(--active-bg-color, var(--bg-color, var(--light-gray1)));
		border-bottom-left-radius: var(--border-radius, var(--default-border-radius));
		border-bottom-right-radius: var(--border-radius, var(--default-border-radius));
		border-top: none;
		border-bottom: 1px solid var(--active-border-color, var(--black2));
		border-right: 1px solid var(--active-border-color, var(--black2));
		border-left: 1px solid var(--active-border-color, var(--black2));
		grid-auto-rows: auto;
		justify-items: center;
		row-gap: 6px;
		margin: 0 auto;
		padding: 0 0 3px 0;
	}

	.x11-palette {
		border: none;
		border-radius: 0;
	}

	:global(.collapsed) {
		display: none;
	}

	:global(.expanded) {
		display: block;
	}
</style>
