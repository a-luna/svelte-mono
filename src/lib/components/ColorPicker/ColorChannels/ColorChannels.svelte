<script lang="ts">
	import HslColorChannels from '$lib/components/ColorPicker/ColorChannels/HslColorChannels.svelte';
	import RgbColorChannels from '$lib/components/ColorPicker/ColorChannels/RgbColorChannels.svelte';
	import { getColorPickerStore } from '$lib/context';
	import { ColorParser } from '$lib/parser';

	export let pickerId: string;
	export let alphaEnabled: boolean;
	export let editable: boolean;
	let state = getColorPickerStore(pickerId);

	function handleRgbColorChanged(rgbString: string) {
		if ($state.labelState === 'inactive') {
			$state.color = ColorParser.parse(rgbString).value;
		}
	}

	function handleHslColorChanged(hslString: string) {
		if ($state.labelState === 'inactive') {
			$state.color = ColorParser.parse(hslString).value;
		}
	}
</script>

<div class="text-sm flex flex-col flex-nowrap justify-center items-stretch gap-2">
	{#if $state?.colorSpace === 'rgb' || $state?.colorSpace === 'rgba'}
		<RgbColorChannels
			r={$state.color.rgb.r}
			g={$state.color.rgb.g}
			b={$state.color.rgb.b}
			a={$state.color.rgb.a}
			{alphaEnabled}
			{editable}
			on:rgbColorChanged={(e) => handleRgbColorChanged(e.detail)}
		/>
	{:else if $state?.colorSpace === 'hsl' || $state?.colorSpace === 'hsla'}
		<HslColorChannels
			h={$state.color.hsl.h}
			s={$state.color.hsl.s}
			l={$state.color.hsl.l}
			a={$state.color.hsl.a}
			{alphaEnabled}
			{editable}
			on:hslColorChanged={(e) => handleHslColorChanged(e.detail)}
		/>
	{/if}
</div>
