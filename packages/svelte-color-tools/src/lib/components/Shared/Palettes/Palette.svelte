<svelte:options accessors />

<script lang="ts">
	import Color from '$lib/components/Shared/Palettes/Color.svelte';
	import type { ColorPalette } from '$lib/types';
	import type { ColorFormat } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let colorFormat: ColorFormat = 'hex';
	export let palette: ColorPalette;
	export let expanded = false;
	export let displayPaletteName = true;
	export let displayColorName = false;
	export let alwaysExpanded = false;
	export let columns = 4;
	export let x11Palette = false;
	export let contentHeight = '';
	let colorRefs: Record<string, Color> = {};
	const dispatch = createEventDispatcher();

	$: hasColors = palette.colors.length > 0;
	$: color = palette.componentColor;
	$: accordionContentPadding = x11Palette ? 'padding: 0 0 3px 0;' : 'padding: 0.5rem;';
	$: accordionContentHeight = contentHeight ? `height: ${contentHeight};` : '';
	$: accordionButtonWidth = x11Palette ? 'width: 320px;' : 'width: 100%;';
	$: accordionButtonCursor = x11Palette ? 'cursor: default;' : 'cursor: pointer;';
	$: accordionButtonPadding = x11Palette
		? 'padding: 7px 0 10px 0;'
		: alwaysExpanded
		? 'padding: 6px 1px 0px 1px;'
		: 'padding: 0.5rem;';
	$: accordionButtonBorder = x11Palette
		? `border-radius: 0; border: none;`
		: expanded && hasColors
		? 'border-top-left-radius: var(--border-radius, var(--default-border-radius));; border-top-right-radius: var(--border-radius, var(--default-border-radius));; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; border-top: 1px solid var(--active-border-color, var(--black2)); border-bottom: none; border-right: 1px solid var(--active-border-color, var(--black2)); border-left: 1px solid var(--active-border-color, var(--black2));'
		: expanded && !hasColors
		? 'border: 1px solid var(--active-border-color, var(--black2)); border-radius: var(--border-radius, var(--default-border-radius));'
		: 'border: 1px solid var(--border-color, var(--black2)); border-radius: var(--border-radius, var(--default-border-radius));';
	$: accordionStylesSlide = `--text-color: var(--${color}-fg-color); --hover-text-color: var(--${color}-fg-color); --active-text-color: var(--${color}-fg-color); --border-radius: 6px; --hover-bg-color: var(--${color}-hover-bg-color); --active-bg-color: var(--${color}-hover-bg-color); --color-wrapper-bg-color: var(--${color}-cw-bg-color);`;
	$: accordionStyles = x11Palette
		? `${accordionStylesSlide} border: none;`
		: `${accordionStylesSlide} --border-color: var(--${color}-fg-color); --hover-border-color: var(--${color}-fg-color); --active-border-color: var(--${color}-fg-color);`;
	$: accordionCollapsedStyles = `--bg-color: var(--${color}-bg-color);`;
	$: accordionExpandedStyles = `--bg-color: var(--${color}-hover-bg-color);`;
	$: paletteGrid = displayColorName
		? 'grid-template-columns: 100%; justify-items: flex-start; gap: 0.5rem; '
		: `grid-template-columns: repeat(${columns}, minmax(0, 1fr)); grid-auto-rows: auto; justify-items: center; row-gap: 6px; `;
	$: if (palette?.updated) {
		if (!expanded) {
			togglePalette();
		}
		palette.updated = false;
	}

	export function togglePalette() {
		if (!alwaysExpanded) {
			dispatch('togglePalette', palette.id);
		}
	}
</script>

<div
	id="accordion-item-{palette.id}"
	class="accordion-item {color}"
	data-state={expanded ? 'expanded' : 'collapsed'}
	style="{accordionStyles} {expanded ? accordionExpandedStyles : accordionCollapsedStyles}"
>
	<button
		class="accordion-button transition-color"
		class:active={expanded}
		type="button"
		style="{accordionButtonWidth} {accordionButtonPadding} {accordionButtonBorder} {accordionButtonCursor}"
		aria-expanded="false"
		aria-controls="accordion-content-{palette.id}"
		on:click={() => togglePalette()}
	>
		{#if displayPaletteName}
			<h2 class="accordion-heading mb-0 w-full" id="accordion-heading-{palette.id}">{palette.displayName}</h2>
		{/if}
	</button>
	{#if hasColors && expanded}
		<div
			transition:slide|local
			id="accordion-content-{palette.id}"
			class="accordion-content transition"
			class:x11-palette={x11Palette}
			style="display: grid; {paletteGrid} {accordionContentPadding} {accordionContentHeight}"
			aria-labelledby="accordion-heading-{palette.id}"
		>
			{#each palette.colors as color}
				<Color
					{color}
					{colorFormat}
					{displayColorName}
					componentColor={palette.componentColor}
					on:colorSelected
					on:editColorDetails
					on:deleteColor
					bind:this={colorRefs[color.color.hexAlpha]}
				/>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	button .accordion-heading {
		margin: 0;
		font-weight: 500;
	}

	.accordion-button {
		display: flex;
		position: relative;
		align-items: center;
		background-color: var(--bg-color, var(--light-gray1));
		color: var(--text-color, var(--dark-gray2));
		font-size: 14px;
		line-height: 1;
		outline: 1px solid transparent;
		outline-offset: 1px;
		width: 100%;
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
		margin: 0 auto;
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
