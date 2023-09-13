<script lang="ts">
	import { hslToString } from '$lib/color/util';
	import type { ButtonColor, ButtonSize, HslColor } from '$lib/types';
	import { getRandomHexString } from '$lib/util';

	export let size: ButtonSize = 'sm';
	export let color: ButtonColor = 'blue';
	export let disabled = false;
	export let width = 'auto';
	export let testid = `button-${getRandomHexString({ length: 4 })}`;

	const fgColor: HslColor = { h: 0, s: 0, l: 0, a: 1 };
	const fgColorDisabled: HslColor = { h: 0, s: 0, l: 25, a: 1 };
	const bgColorDisabled: HslColor = { h: 0, s: 0, l: 50, a: 1 };
	const bgColorMap: Record<ButtonColor, HslColor> = {
		red: { h: 342, s: 100, l: 60, a: 1 },
		pink: { h: 301, s: 93, l: 71, a: 1 },
		orange: { h: 19, s: 100, l: 45, a: 1 },
		teal: { h: 171, s: 92, l: 53, a: 1 },
		green: { h: 113, s: 100, l: 72, a: 1 },
		blue: { h: 165, s: 100, l: 45, a: 1 },
		gray: { h: 0, s: 0, l: 60, a: 1 },
		yellow: { h: 60, s: 100, l: 55, a: 1 },
		indigo: { h: 261, s: 100, l: 65, a: 1 },
	};

	$: fontSize = size === 'xs' ? '0.75rem' : size === 'sm' ? '0.85rem' : size === 'md' ? '1rem' : '1.2rem';
	$: fg = disabled ? fgColorDisabled : fgColor;
	$: bg = disabled ? bgColorDisabled : bgColorMap[color];
	$: frontStyle = `color: ${hslToString(fg)}; background: ${hslToString(bg)};`;
	$: gStop1 = hslToString({ ...bg, l: 16 });
	$: gStop2 = hslToString({ ...bg, l: 32 });
	$: edgeStyle = `background: linear-gradient(to left, ${gStop1} 0%, ${gStop2} 8%, ${gStop2} 92%, ${gStop1} 100%);`;
</script>

<button {disabled} class="pushable" style="font-size: {fontSize}; width: {width}" data-testid={testid} on:click>
	<span class="shadow" />
	<span class="edge" style={edgeStyle} />
	<span class="front" style={frontStyle}>
		<slot />
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
		margin: 0;
	}
	.shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 6px;
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
		border-radius: 6px;
	}
	.front {
		display: block;
		position: relative;
		padding: 0.6em 1.5em;
		border-radius: 6px;
		font-size: 1em;
		font-weight: 700;
		line-height: 1;
		letter-spacing: 0.8px;
		white-space: nowrap;
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
	}
</style>
