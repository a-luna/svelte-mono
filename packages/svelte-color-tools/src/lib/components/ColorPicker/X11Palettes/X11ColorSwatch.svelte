<script lang="ts">
	import type { ComponentColor } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let paletteId: string;
	export let activePaletteId: string = '';
	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;
	let buttonComponent: HTMLButtonElement;

	const dispatch = createEventDispatcher<{ x11PaletteSelected: { paletteId: string } }>();

	$: active = paletteId === activePaletteId;
	$: style = `--button-background-color: var(--${color}-bg-color); --button-background-color-hover: var(--${color}-hover-bg-color); --button-background-color-active: var(--${color}-fg-color); --button-color: var(--${color}-fg-color); --button-color-hover: var(--${color}-fg-color); --button-color-active: var(--${color}-fg-color);`;

	export function focus() {
		buttonComponent?.focus();
	}
</script>

<button
	bind:this={buttonComponent}
	class="square-button"
	class:active
	title={tooltip}
	{disabled}
	{style}
	on:click={() => dispatch('x11PaletteSelected', { paletteId })}
/>

<style lang="postcss">
	button {
		--button-height: 26px;
		--button-width: 26px;
		--button-focus-ring-color: hsl(218 100% 55%);

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
		white-space: nowrap;
		background-color: var(--button-background-color, var(--button-default-background-color));
		border: 2px solid var(--button-color, var(--button-default-color));
		color: var(--button-color, var(--button-default-color));
		border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		min-width: var(--button-min-width, var(--button-default-min-width));
		width: var(--button-width, var(--button-default-width));
		height: var(--button-height, var(--button-default-height));

		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	button:hover {
		background-color: var(--button-background-color-hover, var(--button-default-background-color-hover));
		border: 2px solid var(--button-color-hover, var(--button-default-color-hover));
		color: var(--button-color-hover, var(--button-default-color-hover));
	}

	button:active,
	button:focus,
	button:active:focus {
		background-color: var(--button-background-color-active, var(--button-default-background-color-active));
		border: 2px solid var(--button-color-active, var(--button-default-color-active));
		color: var(--button-color-active, var(--button-default-color-active));
		outline: 2px solid var(--button-focus-ring-color, var(--button-default-focus-ring-color));
		outline-offset: 1px;
	}

	button[disabled],
	button:hover[disabled] {
		background-color: var(--button-background-color-disabled, var(--button-default-background-color-disabled));
		border: 2px solid var(--button-color-disabled, var(--button-default-color-disabled));
		color: var(--button-color-disabled, var(--button-default-color-disabled));
		cursor: not-allowed;
	}
</style>
