<script lang="ts">
	import HslColorChannels from '$lib/components/ColorPicker/ColorChannels/HslColorChannels.svelte';
	import RgbColorChannels from '$lib/components/ColorPicker/ColorChannels/RgbColorChannels.svelte';
	import { getColorPickerStore } from '$lib/context';
	import { ColorParser } from '$lib/parser';

	export let pickerId: string;
	let state = getColorPickerStore(pickerId);

	function handleRgbColorChanged(rgbString: string) {
		if ($state.labelState === 'inactive') {
			$state.color.color = ColorParser.parse(rgbString).value;
		}
	}

	function handleHslColorChanged(hslString: string) {
		if ($state.labelState === 'inactive') {
			$state.color.color = ColorParser.parse(hslString).value;
		}
	}
</script>

<div class="text-sm flex flex-col flex-nowrap justify-center items-stretch gap-2">
	{#if $state?.colorSpace === 'rgb' || $state?.colorSpace === 'rgba'}
		<RgbColorChannels
			r={$state.color.color.rgb.r}
			g={$state.color.color.rgb.g}
			b={$state.color.color.rgb.b}
			a={$state.color.color.rgb.a}
			alphaEnabled={$state.alphaEnabled}
			editable={$state.editable}
			on:rgbColorChanged={(e) => handleRgbColorChanged(e.detail)}
		/>
	{:else if $state?.colorSpace === 'hsl' || $state?.colorSpace === 'hsla'}
		<HslColorChannels
			h={$state.color.color.hsl.h}
			s={$state.color.color.hsl.s}
			l={$state.color.color.hsl.l}
			a={$state.color.color.hsl.a}
			alphaEnabled={$state.alphaEnabled}
			editable={$state.editable}
			on:hslColorChanged={(e) => handleHslColorChanged(e.detail)}
		/>
	{/if}
</div>
