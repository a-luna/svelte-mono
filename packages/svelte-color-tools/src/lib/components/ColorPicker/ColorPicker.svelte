<svelte:options accessors />

<script lang="ts">
	import ColorChannels from '$lib/components/ColorPicker/ColorChannels/ColorChannels.svelte';
	import ColorLabel from '$lib/components/ColorPicker/ColorLabel/ColorLabel.svelte';
	import ColorSwatch from '$lib/components/ColorPicker/ColorSwatch.svelte';
	import X11Palettes from '$lib/components/ColorPicker/X11Palettes/X11Palettes.svelte';
	import ColorFormatSelector from '$lib/components/Shared/ColorFormatSelector.svelte';
	import { createColorPickerStore, initColorPickerStore } from '$lib/stores';
	import type { ColorPickerStore } from '$lib/types';
	import {
		BasicIconRenderer,
		ColorParser,
		type ColorFormat,
		type CssColor,
		type CssColorForColorSpace,
	} from '@a-luna/shared-ui';
	import { finalizeLabColor, getColorFormatFromCssString } from '@a-luna/shared-ui/color/parsers';
	import { copyCssColor, oklchToString } from '@a-luna/shared-ui/color/util';
	import { onDestroy, onMount, tick } from 'svelte';

	export let pickerId = `color-picker`;
	export let picker: ColorPickerStore;
	export let editMode = false;
	let initialized = false;
	let timeout: NodeJS.Timeout;
	let colorPicker: HTMLInputElement;
	let colorLabel: ColorLabel;

	$: if ($picker) $picker.editable = !editMode;
	$: if (typeof window !== 'undefined' && !initialized) {
		picker = initColorPickerStore(createColorPickerStore(pickerId));
		initialized = true;
	}
	$: swatchBorderColor = { ...$picker?.colorInGamut?.oklch, l: $picker?.colorInGamut?.oklch.l - 20, a: 1 };
	$: swatchBorderStyles = `border: 2px solid ${oklchToString(swatchBorderColor)};`;
	$: pointerStyles = !$picker.editable ? `pointer-events: none` : '';
	$: if ($picker.labelState === 'success') {
		timeout = setTimeout(() => {
			$picker.labelState = 'inactive';
		}, 500);
	}

	function handleX11ColorSelected(e: CustomEvent<{ color: CssColorForColorSpace }>) {
		const { color } = e.detail;
		picker.setColor(finalizeLabColor(copyCssColor(color)), 'rgb');
	}

	function handleColorChanged(e: CustomEvent<{ color: CssColor }>) {
		const { color } = e.detail;
		if ($picker.labelState === 'inactive') {
			picker.setColor(color, $picker.colorFormat);
		}
	}

	function handleStringValueChanged(e: CustomEvent<{ css: string }>) {
		const { css } = e.detail;
		parseCssColorFromString(css);
	}

	function handleColorPickerValueChanged() {
		parseCssColorFromString(colorPicker.value);
	}

	function parseCssColorFromString(css: string) {
		const result = ColorParser.parse(css);
		const colorFormat = getColorFormatFromCssString(css) ?? $picker.colorFormat;
		if (result.success) {
			const color = result.value ?? $picker.color;
			picker.setColor(color, colorFormat);
		} else {
			$picker.labelState = 'error';
		}
	}

	function handleColorFormatChanged(e: CustomEvent<{ colorFormat: ColorFormat }>) {
		const { colorFormat } = e.detail;
		picker.setColorFormat(colorFormat);
		colorLabel.setColorFormat(colorFormat);
	}

	onMount(async () => {
		await tick();
		$picker.labelState = 'inactive';
	});

	onDestroy(() => clearTimeout(timeout));
</script>

{#if initialized}
	<input
		bind:this={colorPicker}
		type="color"
		style="display: none"
		value={$picker?.color?.hex}
		on:change={() => handleColorPickerValueChanged()}
	/>
	{#if !$picker.x11PalettesShown}
		<div class="color-picker" data-testid={$picker?.pickerId}>
			<div class="picker-left-col">
				<ColorFormatSelector
					bind:value={$picker.colorFormat}
					disabled={!$picker.editable}
					on:colorFormatChanged={handleColorFormatChanged}
				/>
				<div
					class="swatch-wrapper"
					class:cursor-not-allowed={!$picker?.editable}
					title={'Click to open color picker'}
					style="{swatchBorderStyles} {pointerStyles}"
				>
					<ColorSwatch
						{pickerId}
						on:iconClicked={() => ($picker.x11PalettesShown = true)}
						on:swatchClicked={() => colorPicker.click()}
					>
						<svelte:fragment slot="icon">
							<BasicIconRenderer icon={'colorswatches'} height={'25px'} width={'25px'} />
						</svelte:fragment>
					</ColorSwatch>
				</div>
			</div>
			<div class="picker-right-col">
				<ColorLabel {pickerId} bind:this={colorLabel} on:stringValueChanged={handleStringValueChanged} />
				<ColorChannels {pickerId} on:colorChanged={handleColorChanged} />
			</div>
		</div>
	{:else if $picker.x11ColorPalettes}
		<X11Palettes
			x11ColorPalettes={$picker.x11ColorPalettes}
			on:colorSelected={() => ($picker.x11PalettesShown = false)}
			on:colorSelected={handleX11ColorSelected}
			on:hideX11Palettes={() => ($picker.x11PalettesShown = false)}
		/>
	{/if}
{/if}

<style lang="postcss">
	.color-picker {
		--swatch-width: 109px;
		--swatch-height: 109px;
		--swatch-border-radius: 6px;
		--select-list-open-button-height: 30px;

		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		gap: 10px;
		width: 371px;
		height: 169px;
		background-color: var(--panel-bg-color);
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
