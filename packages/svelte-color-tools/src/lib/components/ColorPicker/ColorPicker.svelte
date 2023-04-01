<svelte:options accessors />

<script lang="ts">
	import { copyCssColor, getX11ColorPalettes, hslToString } from '$lib/color';
	import ColorChannels from '$lib/components/ColorPicker/ColorChannels/ColorChannels.svelte';
	import ColorLabel from '$lib/components/ColorPicker/ColorLabel/ColorLabel.svelte';
	import ColorSpaceSelector from '$lib/components/ColorPicker/ColorSpaceSelector.svelte';
	import X11Palettes from '$lib/components/ColorPicker/X11Palettes/X11Palettes.svelte';
	import ColorSwatches from '$lib/components/Icons/ColorSwatches.svelte';
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { initColorPickerStore } from '$lib/context';
	import { ColorParser } from '$lib/parser';
	import type { ColorPickerState, CssColor, ThemeColor } from '$lib/types';
	import { onDestroy, onMount, tick } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';

	export let pickerId = `color-picker`;
	export let state: Writable<ColorPickerState>;
	export let editMode = false;
	let initialized = false;
	let timeout: NodeJS.Timeout;
	let colorPicker: HTMLInputElement;

	$: if ($state) $state.editable = !editMode;
	$: if ($state) $state.alphaEnabled = $state?.colorSpace === 'rgba' || $state?.colorSpace === 'hsla';

	$: if (typeof window !== 'undefined' && !initialized) {
		state = writable<ColorPickerState>({
			pickerId,
			color: ColorParser.parse('rgb(128 128 128)').value,
			x11PalettesShown: false,
			x11ColorPalettes: getX11ColorPalettes(),
			colorSpace: 'rgb',
			labelState: 'prerender',
			editable: true,
			alphaEnabled: false,
		});
		state = initColorPickerStore(state);
		initialized = true;
	}

	$: swatchBorderColor = { ...$state?.color?.hsl, l: $state?.color?.hsl.l - 20 };
	$: swatchBorderStyles = `border: 2px solid ${hslToString(swatchBorderColor)};`;
	$: pointerStyles = !$state.editable ? `pointer-events: none` : '';
	$: tooltip =
		$state.alphaEnabled || !$state.editable
			? 'Color picker does not support RGBA/HSLA color space'
			: 'Click to open color picker';

	function handleX11ColorSelected(color: ThemeColor) {
		setColor(copyCssColor(color.color));
	}

	export function setColor(color: CssColor) {
		console.log({ color });
		setCorrectColorSpace(color);
		$state.color = color;
		$state.labelState = 'success';
		timeout = setTimeout(() => {
			$state.labelState = 'inactive';
		}, 500);
	}

	function setCorrectColorSpace(color: CssColor) {
		if ($state.colorSpace === 'rgba' && !color.hasAlpha) {
			$state.colorSpace = 'rgb';
		} else if ($state.colorSpace === 'rgb' && color.hasAlpha) {
			$state.colorSpace = 'rgba';
		} else if ($state.colorSpace === 'hsla' && !color.hasAlpha) {
			$state.colorSpace = 'hsl';
		} else if ($state.colorSpace === 'hsl' && color.hasAlpha) {
			$state.colorSpace = 'hsla';
		}
	}

	function handleStringValueChanged(color: string) {
		const result = ColorParser.parse(color);
		if (result.success) {
			$state.color = result.value;
			$state.labelState = 'success';
		} else {
			$state.labelState = 'error';
		}
		timeout = setTimeout(() => {
			$state.labelState = 'inactive';
		}, 500);
	}

	function handleColorPickerValueChanged() {
		$state.color = ColorParser.parse(colorPicker.value).value;
		$state.labelState = 'success';
		timeout = setTimeout(() => {
			$state.labelState = 'inactive';
		}, 500);
	}

	onMount(async () => {
		await tick();
		$state.labelState = 'inactive';
	});

	onDestroy(() => clearTimeout(timeout));
</script>

{#if initialized}
	<input
		bind:this={colorPicker}
		type="color"
		style="display: none"
		value={$state?.color?.hex}
		on:change={() => handleColorPickerValueChanged()}
	/>
	{#if !$state.x11PalettesShown}
		<div class="color-picker" data-testid={$state?.pickerId}>
			<div class="picker-left-col">
				<ColorSpaceSelector bind:value={$state.colorSpace} disabled={!$state.editable} />
				<div
					class="swatch-wrapper"
					class:cursor-pointer={!$state.alphaEnabled && $state?.editable}
					class:cursor-not-allowed={$state.alphaEnabled || !$state?.editable}
					title={tooltip}
					style="{swatchBorderStyles} {pointerStyles}"
				>
					<ColorSwatch
						color={$state.color}
						iconSize={'25px'}
						iconTooltip={'Open X11 Color Palettes'}
						on:iconClicked={() => ($state.x11PalettesShown = true)}
						on:swatchClicked={() => colorPicker.click()}
					>
						<svelte:fragment slot="icon">
							<ColorSwatches />
						</svelte:fragment>
					</ColorSwatch>
				</div>
			</div>
			<div class="picker-right-col">
				<ColorLabel pickerId={$state.pickerId} on:updateColor={(e) => handleStringValueChanged(e.detail)} />
				<ColorChannels pickerId={$state.pickerId} />
			</div>
		</div>
	{:else if $state.x11ColorPalettes}
		<X11Palettes
			x11ColorPalettes={$state.x11ColorPalettes}
			on:colorSelected={() => ($state.x11PalettesShown = false)}
			on:colorSelected={(e) => handleX11ColorSelected(e.detail)}
			on:hideX11Palettes={() => ($state.x11PalettesShown = false)}
		/>
	{/if}
{/if}

<style lang="postcss">
	.color-picker {
		--select-menu-background-color: var(--white3);
		--swatch-size: 111px;

		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		gap: 0.5rem;
		width: 371px;
		height: 169px;
		background-color: var(--color-picker-background-color);
		border: 1px solid var(--fg-color, --black2);
		border-radius: 6px;
		padding: 0.5rem;
	}

	.picker-left-col,
	.picker-right-col {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: stretch;
		gap: 0.5rem;
	}

	.swatch-wrapper {
		border-radius: 6px;
	}
</style>
