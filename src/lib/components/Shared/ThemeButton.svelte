<script lang="ts">
	import { getRandomHueValue } from '$lib/color';

	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor = 'black';
	export let disabled = false;
	export let tooltip: string = '';
	export let alignSelf = '';
	export let wrapperWidth: string = '';
	export let classList: string[] = [];
	export let iconWidth: string = '11px';
	export let padding: string = '2px 6px';
	export let randomHue = false;
	export let gridStyle: string = '';
	let style: string;
	let buttonElement: HTMLButtonElement;

	$: buttonType = randomHue || color !== 'black' ? 'color' : 'black';
	$: hueStyle = randomHue ? `--button-hue: ${getRandomHueValue()};` : `--button-hue: var(--${color}-hue);`;
	$: flexStyle = alignSelf ? `align-self: ${alignSelf};` : '';
	$: widthStyle = wrapperWidth
		? `width: ${wrapperWidth}; min-width: var(--button-size);`
		: 'min-width: var(--button-size);';
	$: style = [hueStyle, flexStyle, widthStyle, gridStyle].filter((s) => s !== '').join(' ');

	export function focus() {
		buttonElement.focus();
	}
</script>

<div class="theme-button-wrapper {buttonType}" {style}>
	<button
		bind:this={buttonElement}
		type="button"
		title={tooltip}
		class="theme-button transition-color {classList.join(' ')}"
		style="padding: {padding};"
		{disabled}
		on:click
	>
		{#if $$slots.icon}
			<div class="icon" style="width: {iconWidth}">
				<slot name="icon" />
			</div>
		{/if}
		{#if $$slots.label}
			<span><slot name="label" /></span>
		{/if}
	</button>
</div>

<style lang="postcss">
	.color button {
		--button-background-color: hsl(var(--button-hue, 0), var(--background-sat, 0%), var(--background-light, 95%));
		--button-hover-background-color: hsl(
			var(--button-hue, 0),
			var(--background-sat, 0%),
			var(--background-light-hover, 100%)
		);
		--button-fg-color: hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));
		--button-active-fg-color: hsl(var(--button-hue, 0), var(--fg-sat-active, 0%), var(--fg-light-active, 0%));
		--button-hover-fg-color: var(--button-fg-color);
	}

	.black button {
		--button-background-color: var(--white3);
		--button-hover-background-color: var(--white4);
		--button-fg-color: var(--black2);
		--button-active-fg-color: var(--black4);
		--button-hover-fg-color: var(--black4);
	}

	button {
		--default-border-radius: 6px;

		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
		white-space: nowrap;
		background-color: var(--button-background-color);
		border: 2px solid var(--button-fg-color);
		color: var(--button-fg-color);
		border-radius: var(--default-border-radius);
		width: 100%;
		height: var(--button-size);
	}

	button:hover {
		color: var(--button-hover-fg-color);
		background-color: var(--button-hover-background-color);
	}

	button:active,
	button:focus,
	button:active:focus {
		background-color: var(--button-hover-background-color);
		border: 2px solid var(--button-active-fg-color);
		color: var(--button-active-fg-color);
		outline: 1px solid transparent;
		outline-offset: 1px;
	}

	button[disabled],
	button:hover[disabled] {
		background-color: var(--white1);
		border: 2px solid var(--gray4);
		color: var(--gray4);
		cursor: not-allowed;
	}

	.icon {
		margin: auto;
	}

	span {
		font-size: 13px;
		font-weight: 500;
		line-height: 1;
		margin: auto auto auto 0;
	}
</style>
