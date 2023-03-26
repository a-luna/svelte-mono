<script lang="ts">
	import { colorNameisCustomized } from '$lib/color';
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { getCssValueForColor } from '$lib/theme';
	import type { ColorFormat, ComponentColor, ThemeColor } from '$lib/types';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let color: ThemeColor;
	export let colorFormat: ColorFormat;
	export let displayColorName = false;
	export let componentColor: ComponentColor;
	let timeout: NodeJS.Timeout;
	const dispatch = createEventDispatcher();

	$: currentColor = getCssValueForColor(color, colorFormat);
	$: hasCustomName = colorNameisCustomized(color.color);
	$: wrapperStyles = displayColorName ? `border: 1px solid var(--${componentColor}-fg-color);` : '';
	$: buttonToolTip = !displayColorName ? `${color.color.name} (${color.color.hex}, hue: ${color.color.hsl.h})` : '';

	onDestroy(() => clearTimeout(timeout));
</script>

<div
	class="color-wrapper"
	class:user-color={displayColorName}
	class:x11-color={!displayColorName}
	class:named-color={hasCustomName}
	class:unnamed-color={!hasCustomName}
	class:selected-color={color.isSelected}
	style={wrapperStyles}
>
	<div class="color-wrapper-top">
		<button type="button" title={buttonToolTip} on:click={() => dispatch('colorSelected', color)}>
			<ColorSwatch
				color={color.color}
				swatchWidth={displayColorName ? '25px' : '28px'}
				swatchHeight={displayColorName ? '15px' : '15px'}
			/>
		</button>
		{#if hasCustomName && displayColorName}
			<div class="color-name-wrapper">
				<span class="color-name" on:click={() => dispatch('editColorDetails', color)}>{color.color.name}</span>
			</div>
		{/if}
	</div>
	{#if displayColorName}
		<span class="css-value">{currentColor}</span>
	{/if}
</div>

<style lang="postcss">
	.color-wrapper {
		display: flex;
		gap: 0.25rem;
		justify-content: flex-start;
		border-radius: 4px;
		-webkit-border-radius: 4px;
	}

	.selected-color {
		outline: 2px solid var(--blue3);
		outline-offset: 2px;
	}

	.color-wrapper.user-color {
		padding: 0.35rem 0.5rem;
		background-color: var(--color-wrapper-bg-color);
		border-radius: 4px;
		width: 100%;
	}

	.color-wrapper.x11-color {
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

	.x11-color button {
		height: 19px;
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
