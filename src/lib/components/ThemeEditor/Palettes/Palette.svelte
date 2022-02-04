<svelte:options accessors />

<script lang="ts">
	import Color from '$lib/components/ThemeEditor/Palettes/Color.svelte';
	import type { ColorPalette } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let palette: ColorPalette;
	export let expanded = false;
	export let displayPaletteName = true;
	export let displayColorName = false;
	export let alwaysExpanded = false;
	export let columns = 4;
	export let slideContent = false;
	export let contentHeight = null;
	let colorRefs: Record<string, Color> = {};
	const dispatch = createEventDispatcher();

	$: color = palette.componentColor;
	$: accordionContentPadding = slideContent ? 'padding: 14px 24px 1rem 24px;' : 'padding: 0.5rem 0.5rem 1rem 0.5rem;';
	$: accordionContentHeight = contentHeight ? `height: ${contentHeight};` : '';
	$: accordionButtonPadding = alwaysExpanded ? 'padding: 2px;' : 'padding: 0.5rem';
	$: accordionStyles = `--border-color: var(--${color}-fg-color); --text-color: var(--${color}-fg-color); --hover-border-color: var(--${color}-fg-color); --hover-text-color: var(--${color}-fg-color); --active-border-color: var(--${color}-fg-color); --active-text-color: var(--${color}-fg-color); --border-radius: 6px; --hover-bg-color: var(--${color}-hover-bg-color); --active-bg-color: var(--${color}-hover-bg-color);`;
	$: accordionCollapsedStyles = `--bg-color: var(--${color}-bg-color);`;
	$: accordionExpandedStyles = `--bg-color: var(--${color}-hover-bg-color);`;
	$: paletteGrid = displayColorName
		? 'grid-template-columns: 100%; justify-items: flex-start; gap: 0.75rem 0.75rem; '
		: `grid-template-columns: repeat(${columns}, minmax(0, 1fr)); justify-items: center; gap: 0.5rem 0.25rem; `;
	$: if (palette?.updated) {
		if (!expanded) {
			togglePalette();
		}
		palette.updated = false;
	}

	export function togglePalette() {
		if (!alwaysExpanded) {
			expanded = !expanded;
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
		style={accordionButtonPadding}
		aria-expanded="false"
		aria-controls="accordion-content-{palette.id}"
		on:click={() => togglePalette()}
	>
		{#if displayPaletteName}
			<h2 class="accordion-heading mb-0 w-full" id="accordion-heading-{palette.id}">{palette.name}</h2>
		{/if}
	</button>
	{#if expanded}
		<div
			transition:slide|local
			id="accordion-content-{palette.id}"
			class="accordion-content transition"
			style="display: grid; {paletteGrid} {accordionContentPadding} {accordionContentHeight}"
			aria-labelledby="accordion-heading-{palette.id}"
		>
			{#each palette.colors as color}
				<Color
					{color}
					{displayColorName}
					componentColor={palette.componentColor}
					on:colorSelected
					on:deleteColor
					bind:this={colorRefs[color.hex]}
				/>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	button .accordion-heading {
		margin: 0;
	}

	.accordion-button {
		border-radius: var(--border-radius, var(--default-border-radius));
		display: flex;
		position: relative;
		align-items: center;
		background-color: var(--bg-color, var(--light-gray1));
		color: var(--text-color, var(--dark-gray2));
		border: 2px solid var(--border-color, var(--black2));
		font-size: 14px;
		line-height: 1;
		outline: 2px solid transparent;
		outline-offset: 2px;
		width: 100%;
	}

	.accordion-button:hover {
		background-color: var(--hover-bg-color, var(--bg-color, var(--light-gray1)));
		color: var(--hover-text-color, var(--indigo2));
		border: 2px solid var(--hover-border-color, var(--black2));
	}

	.accordion-button.active,
	.accordion-button.active:hover {
		background-color: var(--active-bg-color, var(--bg-color, var(--light-gray1)));
		color: var(--active-text-color, var(--indigo2));
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		border-top: 2px solid var(--active-border-color, var(--black2));
		border-bottom: none;
		border-right: 2px solid var(--active-border-color, var(--black2));
		border-left: 2px solid var(--active-border-color, var(--black2));
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
		border-bottom: 2px solid var(--active-border-color, var(--black2));
		border-right: 2px solid var(--active-border-color, var(--black2));
		border-left: 2px solid var(--active-border-color, var(--black2));
		margin: 0 auto;
	}

	:global(.collapsed) {
		display: none;
	}

	:global(.expanded) {
		display: block;
	}
</style>
