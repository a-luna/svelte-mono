<script lang="ts">
	import { colorNameisCustomized } from '$lib/color';
	import type { ComponentColor, ThemeColor } from '$lib/types';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let alphaEnabled: boolean;
	export let color: ThemeColor;
	export let displayColorName = false;
	export let componentColor: ComponentColor;
	let timeout: NodeJS.Timeout;
	let buttonElement: HTMLButtonElement;
	const dispatch = createEventDispatcher();
	let currentLabelIndex = 0;

	$: colorLabels = alphaEnabled
		? [color?.color?.hslaString, color?.color?.rgbaString, color?.color?.hexAlpha]
		: [color?.color?.hslString, color?.color?.rgbString, color?.color?.hex];
	$: currentColor = colorLabels[currentLabelIndex];
	$: hasCustomName = colorNameisCustomized(color.color);
	$: alphaBg = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");`;
	$: bgColor = `background-color: ${color.color.hslaString};`;
	$: wrapperStyles = displayColorName ? `border: 1px solid var(--${componentColor}-fg-color);` : '';
	$: buttonToolTip = !displayColorName ? `${color.color.name} (${color.color.hex}, hue: ${color.color.hsl.h})` : '';

	function handleColorSwatchClicked() {
		dispatch('colorSelected', color);
		buttonElement.focus();
	}

	function handleColorNameClicked() {
		dispatch('editColorDetails', color);
	}

	function handleCssValueClicked() {
		currentLabelIndex += 1;
		if (currentLabelIndex === colorLabels.length) {
			currentLabelIndex = 0;
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<div
	class="color-wrapper"
	class:user-color={displayColorName}
	class:x11-color={!displayColorName}
	class:named-color={hasCustomName}
	class:unnamed-color={!hasCustomName}
	style={wrapperStyles}
>
	<div class="color-wrapper-top">
		<button
			type="button"
			title={buttonToolTip}
			bind:this={buttonElement}
			on:click|stopPropagation={() => handleColorSwatchClicked()}
		>
			<div class="swatch-wrapper">
				<div class="swatch" style={color.color.hasAlpha ? alphaBg : 'background-color: inherit'} />
				<div class="swatch-overlay" style={bgColor} />
			</div>
		</button>
		{#if hasCustomName && displayColorName}
			<div class="color-name-wrapper">
				<span class="color-name" on:click={() => handleColorNameClicked()}>{color.color.name}</span>
			</div>
		{/if}
	</div>
	{#if displayColorName}
		<span class="css-value" on:click={() => handleCssValueClicked()}>{currentColor}</span>
	{/if}
</div>

<style lang="postcss">
	.color-wrapper {
		display: flex;
		gap: 0.25rem;
		justify-content: flex-start;
		border-radius: 4px;
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
		outline: 2px solid hsl(240 100% 27%);
		outline-offset: 2px;
	}

	.user-color button {
		height: 19px;
		align-self: center;
	}

	.x11-color button {
		height: 24px;
	}

	.swatch-wrapper {
		flex: 0 1 auto;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.user-color .swatch-wrapper {
		width: 25px;
		height: 15px;
	}

	.x11-color .swatch-wrapper {
		width: 30px;
		height: 20px;
	}

	.swatch {
		z-index: 1;
		position: relative;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}

	.swatch-overlay {
		z-index: 2;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
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
		cursor: pointer;
		padding: 3px 4px;

		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}

	.named-color .css-value {
		margin: 0 0 0 34px;
	}
</style>
