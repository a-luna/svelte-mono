<script lang="ts">
	import { hslToString } from '$lib/color/util';
	import type { ButtonSize, HslColor } from '$lib/types';
	import { getRandomHexString } from '$lib/util';

	export let fgColor: HslColor | undefined = undefined;
	export let bgColor: HslColor | undefined = undefined;
	export let size: ButtonSize = 'sm';
	export let disabled = false;
	export let width = 'auto';
	export let testid = `button-${getRandomHexString({ length: 4 })}`;
	export let buttonElement: HTMLButtonElement | undefined = undefined;
	let frontStyle = '';
	let edgeStyle = '';

	const fgColorDefault: HslColor = { h: 0, s: 0, l: 0, a: 1 };
	const bgColorDefault: HslColor = { h: 0, s: 0, l: 60, a: 1 };
	const defaultColors: [HslColor, HslColor] = [fgColorDefault, bgColorDefault];

	const fgColorDisabled: HslColor = { h: 0, s: 0, l: 25, a: 1 };
	const bgColorDisabled: HslColor = { h: 0, s: 0, l: 50, a: 1 };
	const disabledColors: [HslColor, HslColor] = [fgColorDisabled, bgColorDisabled];

	const fontSizeMap: Record<ButtonSize, string> = {
		xs: '0.75rem',
		sm: '0.85rem',
		md: '1rem',
		lg: '1.2rem',
	};

	function getButtonColors(
		button: HTMLButtonElement | undefined,
		fg: HslColor | undefined,
		bg: HslColor | undefined,
		disabled: boolean,
	): [HslColor, HslColor] {
		if (!button) {
			return defaultColors;
		}
		if (disabled) {
			return disabledColors;
		}
		return fg && bg ? [fg, bg] : defaultColors;
	}

	$: fontSize = fontSizeMap[size];
	$: {
		[fgColor, bgColor] = getButtonColors(buttonElement, fgColor, bgColor, disabled);
		frontStyle = `color: ${hslToString(fgColor)}; background: ${hslToString(bgColor)};`;
		const gStop1 = hslToString({ ...bgColor, l: 16 });
		const gStop2 = hslToString({ ...bgColor, l: 32 });
		edgeStyle = `background: linear-gradient(to left, ${gStop1} 0%, ${gStop2} 8%, ${gStop2} 92%, ${gStop1} 100%);`;
	}
</script>

<button
	bind:this={buttonElement}
	{disabled}
	class="pushable"
	style="font-size: {fontSize}; width: {width}"
	data-testid={testid}
	on:click
>
	<span class="shadow" />
	<span class="edge" style={edgeStyle} />
	<span class="front" style={frontStyle}>
		<slot />
		<!-- {#if $$slots.icon}
			<div
				class="icon"
				style="width: var(--button-icon-size, var(--button-default-icon-size)); height: var(--button-icon-size, var(--button-default-icon-size))"
			>
				<slot name="icon" />
			</div>
		{/if}
		{#if $$slots.label}
			<span class="label">
				<slot name="label" />
			</span>
		{/if} -->
	</span>
</button>

<style lang="postcss">
	.pushable {
		--pushable-button-padding-default: 10px;
		--pushable-button-font-size-default: 1em;
		--pushable-button-font-weight-default: 400;

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
		padding: var(--pushable-button-padding, var(--pushable-button-padding-default));
		border-radius: 6px;
		font-size: var(--pushable-button-font-size, var(--pushable-button-font-size-default));
		font-weight: var(--pushable-button-font-weight, var(--pushable-button-font-weight-default));
		line-height: 1;
		letter-spacing: 0.8px;
		white-space: nowrap;
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
	.pushable:disabled {
		cursor: default;
		filter: none;
	}
	.pushable:disabled .front {
		transform: none;
	}
</style>
