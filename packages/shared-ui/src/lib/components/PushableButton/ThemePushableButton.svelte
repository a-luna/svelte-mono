<script lang="ts">
	import type { HslColor } from '$lib';
	import PushableButtonBase from '$lib/components/PushableButton/PushableButtonBase.svelte';
	import { getCssPropertyValue, getRandomHexString } from '$lib/util';

	export let disabled = false;
	export let testid = `button-${getRandomHexString({ length: 4 })}`;
	let buttonElement: HTMLButtonElement;
	let fgColor: HslColor | undefined = undefined;
	let bgColor: HslColor | undefined = undefined;
	let initialized = false;

	$: if (!initialized) {
		[fgColor, bgColor] = getButtonColors(buttonElement);
	}

	function getButtonColors(button: HTMLButtonElement | undefined): [HslColor | undefined, HslColor | undefined] {
		if (!button) {
			return [undefined, undefined];
		}
		const themeWrapper = button.closest('#ui-wrapper');
		if (themeWrapper && themeWrapper instanceof HTMLElement) {
			const themeHue = getCssPropertyValue(themeWrapper, '--theme-color-hue', 'numeric');
			if (themeHue && themeHue instanceof CSSUnitValue) {
				const bgColorTheme = { h: themeHue?.value ?? 0, s: 100, l: 74, a: 1 };
				const fgColorTheme = { ...bgColorTheme, l: 16 };
				initialized = true;
				return [fgColorTheme, bgColorTheme];
			}

			// const fgColorTheme = getThemeCSSPropertyHslColorValue(
			// 	themeWrapper,
			// 	'--theme-text-color',
			// 	'--theme-default-text-color',
			// );
			// const bgColorTheme = getThemeCSSPropertyHslColorValue(
			// 	themeWrapper,
			// 	'--theme-background-color-hover',
			// 	'--theme-default-background-color-hover',
			// );
			// return [fgColorTheme, bgColorTheme];
		}
		return [undefined, undefined];
	}
</script>

<PushableButtonBase bind:buttonElement {fgColor} {bgColor} {disabled} {testid}>
	{#if $$slots.icon}
		<div class="icon">
			<slot name="icon" />
		</div>
	{/if}
	{#if $$slots.label}
		<div class="label">
			<slot name="label" />
		</div>
	{/if}
</PushableButtonBase>

<style lang="postcss">
	.icon {
		width: var(--pushable-button-icon-size, var(--pushable-button-default-icon-size));
		height: var(--pushable-button-icon-size, var(--pushable-button-default-icon-size));
		flex: 0 0 auto;
	}
	.label {
		flex: 1;
	}
</style>
