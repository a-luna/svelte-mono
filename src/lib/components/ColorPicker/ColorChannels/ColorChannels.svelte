<script lang="ts">
	import { decimalToOpacityValue } from '$lib/color';
	import HslColorChannels from '$lib/components/ColorPicker/ColorChannels/HslColorChannels.svelte';
	import RgbColorChannels from '$lib/components/ColorPicker/ColorChannels/RgbColorChannels.svelte';
	import { ColorParser } from '$lib/parser';
	import { getContext } from 'svelte';

	export let pickerId: string;
	export let alphaEnabled: boolean;
	export let editable: boolean;
	let { state } = getContext(pickerId);
	let [r, g, b, rgbAlpha] = [0, 0, 0, 1];
	let [h, s, l, hslAlpha] = [0, 0, 0, 1];

	$: if ($state.labelState === 'prerender' || $state.labelState === 'success') {
		resetRgbValues();
		resetHslValues();
	}
	$: if ($state.labelState === 'inactive') {
		if ($state.colorSpace === 'rgb' || $state.colorSpace === 'rgba') {
			const rgb = alphaEnabled ? `rgba(${r} ${g} ${b} / ${rgbAlpha})` : `rgb(${r} ${g} ${b})`;
			$state.color = ColorParser.parse(rgb).value;
			resetHslValues();
		}
		if ($state.colorSpace === 'hsl' || $state.colorSpace === 'hsla') {
			const hsl = alphaEnabled ? `hsla(${h} ${s}% ${l}% / ${hslAlpha})` : `hsl(${h} ${s}% ${l}%)`;
			$state.color = ColorParser.parse(hsl).value;
			resetRgbValues();
		}
	}

	function resetHslValues() {
		h = $state?.color?.hsl?.h ?? 0;
		s = $state?.color?.hsl?.s ?? 0;
		l = $state?.color?.hsl?.l ?? 0;
		hslAlpha = $state?.color?.hsl?.a ?? 1;
	}

	function resetRgbValues() {
		r = $state?.color?.rgb?.r ?? 0;
		g = $state?.color?.rgb?.g ?? 0;
		b = $state?.color?.rgb?.b ?? 0;
		const rgbAlphaInteger = $state?.color?.rgb?.a ?? 255;
		rgbAlpha = decimalToOpacityValue(rgbAlphaInteger);
	}
</script>

<div class="text-sm flex flex-col flex-nowrap justify-center items-stretch gap-2">
	{#if $state?.colorSpace === 'rgb' || $state?.colorSpace === 'rgba'}
		<RgbColorChannels bind:r bind:g bind:b bind:a={rgbAlpha} {alphaEnabled} {editable} />
	{:else if $state?.colorSpace === 'hsl' || $state?.colorSpace === 'hsla'}
		<HslColorChannels bind:h bind:s bind:l bind:a={hslAlpha} {alphaEnabled} {editable} />
	{/if}
</div>
