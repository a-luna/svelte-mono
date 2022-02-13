<script lang="ts">
	import type { ButtonColor } from '$lib/types';
	import { HslColor } from '$lib/types';
	import { getCSSPropValue } from '$lib/util';

	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
	export let color: ButtonColor = 'blue';
	export let disabled: boolean = false;
	const buttonSize = size === 'xs' ? 30 : size === 'sm' ? 36 : size === 'md' ? 48 : 72;
	const iconSize = size === 'xs' ? 12 : size === 'sm' ? 16 : size === 'md' ? 24 : 36;
	const padding = size === 'xs' ? 8 : size === 'sm' ? 10 : size === 'md' ? 12 : 18;
	let bgColor: HslColor;
	let edgeGradient: string = '';

	$: fgColorCssPropName = disabled ? '--button-disabled-text-color' : `--fg-color-on-${color}`;
	$: bgColorCssPropName = disabled ? '--button-disabled-bg-color' : `--bg-color-${color}`;
	$: if (typeof window !== 'undefined')
		bgColor = HslColor.fromString(getCSSPropValue(document.body, bgColorCssPropName));
	$: if (bgColor)
		edgeGradient = `linear-gradient(to left, hsl(${bgColor.hue}deg ${bgColor.saturation}% 16%) 0%, hsl(${bgColor.hue}deg ${bgColor.saturation}% 32%) 8%, hsl(${bgColor.hue}deg ${bgColor.saturation}% 32%) 92%, hsl(${bgColor.hue}deg ${bgColor.saturation}% 16%) 100%)`;
</script>

<button {disabled} class="pushable" on:click>
	<span class="shadow" />
	<span class="edge" style="background: {edgeGradient}" />
	<span
		class="front"
		style="color: var({fgColorCssPropName}); background: var({bgColorCssPropName}) linear-gradient(hsla(0, 0%, 100%, 0.2), transparent); width: {buttonSize}px; height: {buttonSize}px; padding: 0 {padding}px"
	>
		<div style="width: {iconSize}px; height: {iconSize}px; margin: auto">
			<slot />
		</div>
	</span>
</button>

<style lang="postcss">
	.pushable {
		position: relative;
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
		transition: filter 600ms;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}
	.shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 9999px;
		background: hsl(0deg 0% 0% / 0.25);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
		filter: blur(4px);
	}
	.edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 9999px;
	}
	.front {
		@apply flex items-center uppercase rounded-full max-w-max overflow-hidden font-normal whitespace-nowrap;
		position: relative;
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 400ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	.pushable:hover {
		transition: filter 250ms;
		filter: brightness(110%);
	}
	.pushable:hover .front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:hover .shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:active .front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}
	.pushable:active .shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}
	.pushable:focus:not(:focus-visible) {
		outline: none;
	}
	.pushable:disabled {
		cursor: default;
		filter: none;
	}
	.pushable:disabled .front {
		transform: none;
		color: var(--button-disabled-text-color);
		background: var(--button-disabled-bg-color);
	}
</style>
