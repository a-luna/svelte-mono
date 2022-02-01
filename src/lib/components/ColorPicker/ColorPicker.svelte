<svelte:options accessors />

<script lang="ts">
	import ColorChannels from '$lib/components/ColorPicker/ColorChannels/ColorChannels.svelte';
	import ColorLabel from '$lib/components/ColorPicker/ColorLabel/ColorLabel.svelte';
	import ColorSpaceSelector from '$lib/components/ColorPicker/ColorSpaceSelector.svelte';
	import ColorSwatch from '$lib/components/ColorPicker/ColorSwatch.svelte';
	import { getRandomHexString } from '$lib/helpers';
	import { ColorParser } from '$lib/parser';
	import type { ColorPickerState, CssColor } from '$lib/types';
	import { onDestroy, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';

	export let pickerId: string = `color-picker-${getRandomHexString(4)}`;
	export let state = writable<ColorPickerState>({
		pickerId,
		color: ColorParser.parse('rgb(128 128 128)').value,
		colorSpace: 'rgb',
		labelState: 'prerender',
		editable: true,
	});

	export let editable = true;
	setContext($state.pickerId, { state });
	let timeout: NodeJS.Timeout;
	let colorPicker: HTMLInputElement;

	$: alphaEnabled = $state.colorSpace === 'rgba' || $state.colorSpace === 'hsla';
	$: $state.editable = editable;

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

	const getHexOpaqueValue = (color: CssColor): string => color?.hex?.slice(0, 7) || '#000000';

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

<input
	bind:this={colorPicker}
	type="color"
	class="hidden"
	value={getHexOpaqueValue($state?.color)}
	on:change={() => handleColorPickerValueChanged()}
/>
<div class="color-picker flex flex-row flex-nowrap items-start gap-2 p-2 w-min" data-testid={$state.pickerId}>
	<div class="flex flex-col flex-nowrap justify-start items-stretch gap-2">
		<ColorSpaceSelector bind:value={$state.colorSpace} disabled={!$state.editable} />
		<ColorSwatch pickerId={$state.pickerId} {alphaEnabled} on:showColorPicker={() => colorPicker.click()} />
	</div>
	<div class="flex flex-col flex-nowrap justify-start items-stretch gap-2">
		<ColorLabel pickerId={$state.pickerId} {alphaEnabled} on:updateColor={(e) => handleStringValueChanged(e.detail)} />
		<ColorChannels pickerId={$state.pickerId} {alphaEnabled} editable={$state.editable} />
	</div>
</div>

<style>
	.color-picker {
		background-color: var(--white2);
		border-radius: 4px;
	}
</style>
