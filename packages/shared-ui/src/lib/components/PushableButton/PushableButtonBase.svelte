<script lang="ts">
	import { hslToString } from '$lib/color/util';
	import type { HslColor } from '$lib/types';
	import { getRandomHexString, getThemeCSSPropertyValue } from '$lib/util';

	export let fgColor: HslColor | undefined = undefined;
	export let bgColor: HslColor | undefined = undefined;
	export let disabled = false;
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

	$: {
		[fgColor, bgColor] = getButtonColors(fgColor, bgColor, disabled);
		const [edgeHeight, frontHeight] = getButtonHeights(buttonElement);
		frontStyle = `height: ${frontHeight}; color: ${hslToString(fgColor)}; background: ${hslToString(bgColor)};`;
		const gStop1 = hslToString({ ...bgColor, l: 16 });
		const gStop2 = hslToString({ ...bgColor, l: 32 });
		edgeStyle = disabled
			? `height: ${edgeHeight}; background: ${hslToString(bgColor)};`
			: `height: ${edgeHeight}; background: linear-gradient(to left, ${gStop1} 0%, ${gStop2} 8%, ${gStop2} 92%, ${gStop1} 100%);`;
	}

	function getButtonColors(
		fg: HslColor | undefined,
		bg: HslColor | undefined,
		disabled: boolean,
	): [HslColor, HslColor] {
		if (disabled) return disabledColors;
		if (fg && bg) return [fg, bg];
		return defaultColors;
	}

	function getButtonHeights(button: HTMLButtonElement | undefined): [string, string] {
		if (!button) return ['', ''];
		let originalHeight = getThemeCSSPropertyValue(
			button,
			'--pushable-button-height',
			'--pushable-button-default-height',
			'numeric',
		);
		let yOffset = getThemeCSSPropertyValue(
			button,
			'--pushable-button-front-y-position',
			'--pushable-button-default-front-y-position',
			'numeric',
		);
		let yMargin = getThemeCSSPropertyValue(
			button,
			'--pushable-button-vertical-padding',
			'--pushable-button-default-vertical-padding',
			'numeric',
		);
		if (!originalHeight || !(originalHeight instanceof CSSUnitValue)) return ['', ''];
		if (!yOffset || !(yOffset instanceof CSSUnitValue)) return ['', ''];
		if (!yMargin || !(yMargin instanceof CSSUnitValue)) return ['', ''];

		const yOffsetAbs = yOffset.max(yOffset.mul(-1));
		const edgeHeight = originalHeight.sub(yOffsetAbs);
		const frontHeight = originalHeight.sub(yOffsetAbs.mul(2).add(yMargin.mul(2)));
		const frontHeightDisabled = originalHeight.sub(yMargin.mul(2));
		return disabled
			? [edgeHeight.toString(), frontHeightDisabled.toString()]
			: [edgeHeight.toString(), frontHeight.toString()];
	}
</script>

<button bind:this={buttonElement} {disabled} class="pushable" data-testid={testid} on:click>
	<span class="edge" style={edgeStyle} />
	<span class="front" style={frontStyle}>
		<slot />
	</span>
</button>

<style lang="postcss">
	.pushable {
		--pushable-button-default-width: 32px;
		--pushable-button-default-height: 32px;
		--pushable-button-default-icon-size: 1rem;
		--pushable-button-default-font-size: 1rem;
		--pushable-button-default-font-weight: 400;
		--pushable-button-default-vertical-padding: 0.25rem;
		--pushable-button-default-horizontal-padding: 0.5rem;
		--pushable-button-default-front-y-position: -4px;
		--pushable-button-default-front-y-position-hover: -6px;
		--pushable-button-default-front-y-position-active: -2px;

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
		width: var(--pushable-button-width, var(--pushable-button-default-width));
		height: var(--pushable-button-height, var(--pushable-button-default-height));
		font-size: var(--pushable-button-font-size, var(--pushable-button-default-font-size));
	}
	.edge {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--pushable-button-width, var(--pushable-button-default-width));
		height: calc(
			var(--pushable-button-height, var(--pushable-button-default-height)) +
				var(--pushable-button-front-y-position, var(--pushable-button-default-front-y-position))
		);
		transform: translateY(
			calc(var(--pushable-button-front-y-position, var(--pushable-button-default-front-y-position)) * -1)
		);
		border-radius: 6px;
	}
	.front {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		padding: var(--pushable-button-vertical-padding, var(--pushable-button-default-vertical-padding))
			var(--pushable-button-horizontal-padding, var(--pushable-button-default-horizontal-padding));
		width: calc(
			var(--pushable-button-width, var(--pushable-button-default-width)) -
				calc(var(--pushable-button-horizontal-padding, var(--pushable-button-default-horizontal-padding)) * 2)
		);

		border-radius: 6px;
		font-weight: var(--pushable-button-font-weight, var(--pushable-button-default-font-weight));
		line-height: 1;
		letter-spacing: 0.8px;
		white-space: nowrap;
		transform: translateY(var(--pushable-button-front-y-position, var(--pushable-button-default-front-y-position)));
		transition: transform 400ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	.pushable:hover {
		transition: filter 250ms;
		filter: brightness(120%);
	}
	.pushable:hover .front {
		transform: translateY(
			var(--pushable-button-front-y-position-hover, var(--pushable-button-default-front-y-position-hover))
		);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:active .front {
		transform: translateY(
			var(--pushable-button-front-y-position-active, var(--pushable-button-default-front-y-position-active))
		);
		transition: transform 34ms;
	}
	.pushable:disabled {
		cursor: not-allowed;
		filter: none;
	}
	.pushable:disabled .front {
		transform: none;
		--vertical-pad: calc(
			calc(
					var(--pushable-button-height, var(--pushable-button-default-height)) -
						var(--pushable-button-icon-size, var(--pushable-button-default-icon-size))
				) /
				2
		);
	}
	.pushable:disabled .edge {
		display: none;
	}
</style>
