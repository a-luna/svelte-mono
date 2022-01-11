<script lang="ts">
	import HslColorChannels from '$lib/components/ColorPicker/ColorChannels/HslColorChannels.svelte';
	import RgbColorChannels from '$lib/components/ColorPicker/ColorChannels/RgbColorChannels.svelte';
	import { ColorParser } from '$lib/parser';
	import { getContext } from 'svelte';

	export let pickerId: string;
	export let alphaEnabled: boolean;
	export let editable: boolean;
	let { state } = getContext(pickerId);
	let rgb: string;
	let hsl: string;
	let [r, g, b, h, s, l, a] = [0, 0, 0, 0, 0, 0, 1];
	const getHex = (num: number): string => num.toString(16).padStart(2, '0');

	$: if ($state.labelState === 'prerender' || $state.labelState === 'success') {
		({ r, g, b } = $state?.color?.rgb);
		({ h, s, l } = $state?.color?.hsl);
	}
	$: if ($state.labelState === 'inactive') {
		if ($state.colorSpace === 'rgb' || $state.colorSpace === 'rgba') {
			rgb = alphaEnabled
				? `#${getHex(r)}${getHex(g)}${getHex(b)}${getHex(Math.round(a * 255))}`
				: `#${getHex(r)}${getHex(g)}${getHex(b)}`;
			$state.color = ColorParser.parse(rgb).value;
			h = $state?.color?.hsl?.h || 0;
			s = $state?.color?.hsl?.s || 0;
			l = $state?.color?.hsl?.l || 0;
		}
		if ($state.colorSpace === 'hsl' || $state.colorSpace === 'hsla') {
			hsl = alphaEnabled ? `hsla(${h} ${s}% ${l}% / ${a})` : `hsl(${h} ${s}% ${l}%)`;
			$state.color = ColorParser.parse(hsl).value;
			r = $state?.color?.rgb?.r || 0;
			g = $state?.color?.rgb?.g || 0;
			b = $state?.color?.rgb?.b || 0;
		}
	}
</script>

<div class="text-sm flex flex-col flex-nowrap justify-center items-stretch gap-2">
	{#if $state?.colorSpace === 'rgb' || $state?.colorSpace === 'rgba'}
		<RgbColorChannels bind:r bind:g bind:b bind:a {alphaEnabled} {editable} />
	{:else if $state?.colorSpace === 'hsl' || $state?.colorSpace === 'hsla'}
		<HslColorChannels bind:h bind:s bind:l bind:a {alphaEnabled} {editable} />
	{/if}
</div>
