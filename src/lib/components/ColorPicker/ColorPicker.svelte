<svelte:options accessors />

<script lang="ts">
	import { getX11ColorPalettes } from '$lib/color';
	import ColorChannels from '$lib/components/ColorPicker/ColorChannels/ColorChannels.svelte';
	import ColorLabel from '$lib/components/ColorPicker/ColorLabel/ColorLabel.svelte';
	import ColorSpaceSelector from '$lib/components/ColorPicker/ColorSpaceSelector.svelte';
	import ColorSwatch from '$lib/components/ColorPicker/ColorSwatch.svelte';
	import X11Palettes from '$lib/components/ColorPicker/X11Palettes/X11Palettes.svelte';
	import { initColorPickerStore } from '$lib/context';
	import { ColorParser } from '$lib/parser';
	import type { ColorPalette, ColorPickerState, CssColor } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';

	export let pickerId: string = `color-picker-${getRandomHexString(4)}`;
	export let state: Writable<ColorPickerState>;

	export let editable = true;
	export let showX11Palettes = false;
	let initialized = false;
	let timeout: NodeJS.Timeout;
	let colorPicker: HTMLInputElement;
	let x11ColorPalettes: ColorPalette[];
	const dispatch = createEventDispatcher();

	$: alphaEnabled = $state?.colorSpace === 'rgba' || $state?.colorSpace === 'hsla';
	$: if ($state) $state.editable = editable;
	$: if (typeof window !== 'undefined' && !initialized) {
		state = writable<ColorPickerState>({
			pickerId,
			color: ColorParser.parse('rgb(128 128 128)').value,
			x11ColorPalettes: getX11ColorPalettes(),
			colorSpace: 'rgb',
			labelState: 'prerender',
			editable: true,
		});
		state = initColorPickerStore(state);
		initialized = true;
	}
	$: if ($state) x11ColorPalettes = $state.x11ColorPalettes;

	export function setColor(color: CssColor) {
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
	{#if !showX11Palettes}
		<div class="color-picker" data-testid={$state?.pickerId}>
			<div class="picker-left-col">
				<ColorSpaceSelector bind:value={$state.colorSpace} disabled={!$state.editable} />
				<ColorSwatch
					pickerId={$state.pickerId}
					{alphaEnabled}
					disabled={!$state.editable}
					on:showX11Palettes={() => (showX11Palettes = true)}
					on:showX11Palettes
					on:showColorPicker={() => colorPicker.click()}
				/>
			</div>
			<div class="picker-right-col">
				<ColorLabel
					pickerId={$state.pickerId}
					{alphaEnabled}
					on:updateColor={(e) => handleStringValueChanged(e.detail)}
				/>
				<ColorChannels pickerId={$state.pickerId} {alphaEnabled} editable={$state.editable} />
			</div>
		</div>
	{:else if x11ColorPalettes !== undefined}
		<X11Palettes
			{x11ColorPalettes}
			{alphaEnabled}
			on:colorSelected={() => (showX11Palettes = false)}
			on:colorSelected={() => dispatch('hideX11Palettes')}
			on:colorSelected={(e) => setColor(e.detail)}
		/>
	{/if}
{/if}

<style lang="postcss">
	.color-picker {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		gap: 0.5rem;
		width: min-content;
		background-color: var(--white3);
		border: 1px solid var(--dark-gray1);
		border-radius: 4px;
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
</style>
