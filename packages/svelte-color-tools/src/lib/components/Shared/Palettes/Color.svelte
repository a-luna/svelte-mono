<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { getAppContext } from '$lib/context';
	import { getCssValueForThemeColor } from '$lib/theme';
	import type { ComponentColor, ThemeColor } from '@a-luna/shared-ui';
	import { colorNameisCustomized } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor;
	export let componentColor: ComponentColor;
	let { themeEditor } = getAppContext();
	const dispatch = createEventDispatcher();

	$: componentColor = $themeEditor.userTheme.uiColor;
	$: colorInGamut = color.color.space === 'srgb' ? color.color.srbgColor : color.color.p3Color;
	$: colorFormat =
		color.color.space === 'srgb' ? $themeEditor.userTheme.colorFormatSrgb : $themeEditor.userTheme.colorFormatP3;
	$: currentColor = getCssValueForThemeColor(color, colorFormat);
	$: hasCustomName = colorNameisCustomized(color);
	$: wrapperStyles = `border: 1px solid var(--${componentColor}-fg-color);`;
</script>

<div
	class="color-wrapper user-color"
	class:named-color={hasCustomName}
	class:unnamed-color={!hasCustomName}
	class:selected-color={color.isSelected}
	style={wrapperStyles}
>
	<div class="color-wrapper-top">
		<button type="button" on:click={() => dispatch('colorSelected', color)}>
			<ColorSwatch variant="small" color={colorInGamut} />
		</button>
		{#if hasCustomName}
			<div class="color-name-wrapper">
				<span class="color-name" on:click={() => dispatch('editColorDetails', color)}>{color.color.name}</span>
			</div>
		{/if}
	</div>
	<span class="css-value">{currentColor}</span>
</div>

<style lang="postcss">
	.color-wrapper {
		--swatch-width: 25px;
		--swatch-height: 15px;

		display: flex;
		gap: 0.25rem;
		justify-content: flex-start;
		border-radius: 6px;
		-webkit-border-radius: 6px;
	}

	.selected-color {
		outline: 2px solid var(--blue3);
		outline-offset: 2px;
	}

	.color-wrapper.user-color {
		padding: 0.35rem 0.5rem;
		background-color: var(--color-wrapper-bg-color);
		border-radius: 6px;
		width: 100%;
	}

	.color-wrapper.named-color {
		flex-flow: column nowrap;
	}

	.color-wrapper.unnamed-color {
		flex-flow: row nowrap;
	}

	.color-wrapper-top {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
	}

	button {
		flex: 0 1 auto;
		border-width: 2px;
		border-style: inset;
	}

	button:focus {
		outline: none;
	}

	.user-color button {
		height: 19px;
		align-self: center;
	}

	.color-name-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.25rem;
		align-items: flex-start;
		font-size: 0.75rem;
		line-height: 1;
		text-align: left;
		padding: 3px 4px;
	}

	.color-name {
		cursor: pointer;
		font-weight: 500;
		letter-spacing: 0.5px;
		line-height: 1.2;
	}

	.color-name:hover {
		text-decoration: underline;
	}

	.css-value {
		font-size: 0.75rem;
		line-height: 1;
		text-align: left;
		padding: 3px 4px;

		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}

	.named-color .css-value {
		margin: 0 0 0 34px;
	}
</style>
