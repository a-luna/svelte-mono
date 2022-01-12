<svelte:options accessors />

<script lang="ts">
	import Color from '$lib/components/ThemeEditor/Palettes/Color.svelte';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let palette: ColorPalette;
	export let columns: number;
	export let expanded = false;
	export let color: ComponentColor = 'blue';
	export let displayName = false;
	const dispatch = createEventDispatcher();

	$: accordionGrid = expanded ? `grid-column-start: span ${columns};` : '';
	$: paletteGrid = displayName
		? 'grid-template-columns: 100%; justify-items: flex-start;'
		: 'grid-template-columns: repeat(4, minmax(0, 1fr)); justify-items: center;';
	$: if (palette?.updated) {
		if (!expanded) {
			togglePalette();
		}
		palette.updated = false;
	}

	export function togglePalette() {
		expanded = !expanded;
		dispatch('togglePalette', palette.id);
	}
</script>

<div
	id="accordion-item-{palette.id}"
	class="accordion-item {color}"
	data-state={expanded ? 'expanded' : 'collapsed'}
	style={accordionGrid}
>
	<button
		class="accordion-button transition"
		class:active={expanded}
		type="button"
		aria-expanded="false"
		aria-controls="accordion-content-{palette.id}"
		on:click={() => togglePalette()}
	>
		<h2 class="accordion-heading mb-0 w-full" id="accordion-heading-{palette.id}">{palette.paletteName}</h2>
	</button>
	{#if expanded}
		<div
			transition:slide|local
			id="accordion-content-{palette.id}"
			class="accordion-content transition"
			style="display: grid; {paletteGrid}"
			aria-labelledby="accordion-heading-{palette.id}"
		>
			{#each palette.colors as color}
				<Color {color} {displayName} on:click={() => dispatch('colorSelected', color)} />
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.accordion-item.black {
		--active-border-color: var(--black2);
		--active-bg-color: var(--white2);
		--active-text-color: var(--black2);
	}

	.accordion-item.yellow {
		--active-border-color: hsl(47 63% 26%);
		--active-bg-color: hsl(47 85% 94%);
		--active-text-color: hsl(47 63% 26%);
	}

	.accordion-item.blue {
		--active-border-color: hsl(240 63% 26%);
		--active-bg-color: hsl(240 100% 98%);
		--active-text-color: hsl(240 63% 26%);
	}

	.accordion-item.green {
		--active-border-color: hsl(120 63% 26%);
		--active-bg-color: hsl(150 100% 98%);
		--active-text-color: hsl(120 63% 26%);
	}

	.accordion-item.indigo {
		--active-border-color: hsl(275 63% 26%);
		--active-bg-color: hsl(275 100% 98%);
		--active-text-color: hsl(275 63% 26%);
	}

	.accordion-item {
		--border-color: var(--dark-gray3);
		--bg-color: hsl(0 0% 98%);
		--text-color: var(--dark-gray3);
		--hover-border-color: var(--black2);
		--hover-bg-color: var(--white2);
		--hover-text-color: var(--black2);
		--border-radius: 6px;
	}

	button .accordion-heading {
		margin: 0;
	}

	.accordion-button {
		border-radius: var(--border-radius, 4px);
		display: flex;
		position: relative;
		align-items: center;
		background-color: var(--bg-color, var(--bg-color, var(--light-gray1)));
		color: var(--text-color, var(--dark-gray2));
		border: 2px solid var(--border-color, var(--black2));
		font-size: 14px;
		line-height: 1;
		outline: 2px solid transparent;
		outline-offset: 2px;
		padding: 8px;
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
		gap: 0.5rem 0.25rem;
		background-color: var(--active-bg-color, var(--bg-color, var(--light-gray1)));
		border-bottom-left-radius: var(--border-radius, 4px);
		border-bottom-right-radius: var(--border-radius, 4px);
		border-top: none;
		border-bottom: 2px solid var(--active-border-color, var(--black2));
		border-right: 2px solid var(--active-border-color, var(--black2));
		border-left: 2px solid var(--active-border-color, var(--black2));
		padding: 0.5rem 0.5rem 1rem 0.5rem;
		margin: 0 auto;
	}

	:global(.collapsed) {
		display: none;
	}

	:global(.expanded) {
		display: block;
	}

	.transition {
		transition-property: color, background-color, border-color, transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
