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
		labelState: 'prerender'
	});
	setContext($state.pickerId, { state });
	let timeout: NodeJS.Timeout;
	let colorPicker: HTMLInputElement;

	$: alphaEnabled = $state.colorSpace === 'rgba' || $state.colorSpace === 'hsla';

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
<div
	id={$state.pickerId}
	class="color-picker flex flex-row flex-nowrap items-start gap-2 p-2 w-min"
	data-testid={$state.pickerId}
>
	<div class="flex flex-col flex-nowrap justify-start items-stretch gap-2">
		<ColorSpaceSelector bind:value={$state.colorSpace} />
		<ColorSwatch
			pickerId={$state.pickerId}
			{alphaEnabled}
			on:showColorPicker={() => colorPicker.click()}
		/>
	</div>
	<div class="flex flex-col flex-nowrap justify-start items-stretch gap-2">
		<ColorLabel
			pickerId={$state.pickerId}
			{alphaEnabled}
			on:updateColor={(e) => handleStringValueChanged(e.detail)}
		/>
		<ColorChannels pickerId={$state.pickerId} {alphaEnabled} />
	</div>
</div>

<style>
	.color-picker {
		background-color: var(--light-gray1);
		border: 1px solid var(--black2);
		border-radius: 4px;
	}
</style>
