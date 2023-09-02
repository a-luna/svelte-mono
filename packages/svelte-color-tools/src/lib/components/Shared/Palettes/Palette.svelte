<svelte:options accessors />

<script lang="ts">
	import Color from '$lib/components/Shared/Palettes/Color.svelte';
	import { getAppContext } from '$lib/context';
	import type { ColorPalette } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let palette: ColorPalette;
	export let expanded = false;
	export let displayPaletteName = true;
	export let alwaysExpanded = false;
	let { themeEditor } = getAppContext();
	let colorRefs: Record<string, Color> = {};
	const dispatchPaletteToggled = createEventDispatcher<{ paletteToggled: { paletteId: string } }>();

	$: hasColors = palette.colors.length > 0;
	$: color = $themeEditor.userTheme.uiColor;
	$: accordionButtonPadding = alwaysExpanded ? 'padding: 6px 1px 0px 1px;' : 'padding: 0.5rem;';
	$: accordionButtonBorder = expanded
		? 'border-top-left-radius: var(--border-radius, var(--default-border-radius)); border-top-right-radius: var(--border-radius, var(--default-border-radius)); border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; border-top: 1px solid var(--border-color, var(--black2)); border-bottom: none; border-right: 1px solid var(--border-color, var(--black2)); border-left: 1px solid var(--border-color, var(--black2));'
		: 'border: 1px solid var(--border-color, var(--black2)); border-radius: var(--border-radius, var(--default-border-radius));';
	$: accordionStylesSlide = `--text-color: var(--${color}-fg-color); --hover-text-color: var(--${color}-fg-color); --active-text-color: var(--${color}-fg-color); --border-radius: 6px; --color-wrapper-bg-color: var(--${color}-bg-color); --hover-border-color: var(--${color}-fg-color); --active-border-color: var(--${color}-fg-color);`;
	$: accordionStyles = expanded
		? `${accordionStylesSlide} --bg-color: var(--${color}-hover-bg-color);`
		: accordionStylesSlide;
	$: if (palette?.updated) {
		if (!expanded) {
			togglePalette();
		}
		palette.updated = false;
	}

	export function togglePalette() {
		if (!alwaysExpanded) {
			dispatchPaletteToggled('paletteToggled', { paletteId: palette.id });
		}
	}
</script>

<div
	id="accordion-item-{palette.id}"
	class="accordion-item {color}"
	data-themeEditor={expanded ? 'expanded' : 'collapsed'}
	style={accordionStyles}
>
	<button
		class="accordion-button transition-color"
		class:active={expanded}
		type="button"
		style="{accordionButtonPadding} {accordionButtonBorder}"
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
			aria-labelledby="accordion-heading-{palette.id}"
		>
			{#each palette.colors as color}
				<Color
					{color}
					componentColor={palette.componentColor}
					on:colorSelected
					on:editColorDetails
					on:deleteColor
					bind:this={colorRefs[color.color.hex]}
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
		cursor: pointer;
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
	[data-themeEditor='expanded'] .accordion-button {
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
		display: grid;
		grid-template-columns: 100%;
		justify-items: flex-start;
		gap: 0.5rem;
		flex-grow: 1;
		background-color: var(--active-bg-color, var(--bg-color, var(--light-gray1)));
		border-bottom-left-radius: var(--border-radius, var(--default-border-radius));
		border-bottom-right-radius: var(--border-radius, var(--default-border-radius));
		border-top: none;
		border-bottom: 1px solid var(--active-border-color, var(--black2));
		border-right: 1px solid var(--active-border-color, var(--black2));
		border-left: 1px solid var(--active-border-color, var(--black2));
		margin: 0 auto;
		padding: 0.5rem;
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
