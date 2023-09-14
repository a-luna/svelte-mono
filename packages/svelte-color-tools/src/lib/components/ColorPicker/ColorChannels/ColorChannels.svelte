<script lang="ts">
	import HslColorChannels from '$lib/components/ColorPicker/ColorChannels/HslColorChannels.svelte';
	import LabColorChannels from '$lib/components/ColorPicker/ColorChannels/LabColorChannels.svelte';
	import LchColorChannels from '$lib/components/ColorPicker/ColorChannels/LchColorChannels.svelte';
	import OkhslColorChannels from '$lib/components/ColorPicker/ColorChannels/OkhslColorChannels.svelte';
	import OklabColorChannels from '$lib/components/ColorPicker/ColorChannels/OklabColorChannels.svelte';
	import OklchColorChannels from '$lib/components/ColorPicker/ColorChannels/OklchColorChannels.svelte';
	import RgbColorChannels from '$lib/components/ColorPicker/ColorChannels/RgbColorChannels.svelte';
	import { getColorPickerStore } from '$lib/stores';

	export let pickerId: string;
	let picker = getColorPickerStore(pickerId);
</script>

<div class="color-channels">
	{#if $picker?.colorFormat === 'rgb'}
		<RgbColorChannels
			r={$picker.colorInGamut.rgb.r}
			g={$picker.colorInGamut.rgb.g}
			b={$picker.colorInGamut.rgb.b}
			a={$picker.colorInGamut.rgb.a}
			editable={$picker.editable}
			on:colorChanged
		/>
	{:else if $picker?.colorFormat === 'hsl'}
		<HslColorChannels
			h={$picker.colorInGamut.hsl.h}
			s={$picker.colorInGamut.hsl.s}
			l={$picker.colorInGamut.hsl.l}
			a={$picker.colorInGamut.hsl.a}
			editable={$picker.editable}
			on:colorChanged
		/>
	{:else if $picker?.colorFormat === 'okhsl'}
		<OkhslColorChannels
			h={$picker.colorInGamut.okhsl.h}
			s={$picker.colorInGamut.okhsl.s}
			l={$picker.colorInGamut.okhsl.l}
			a={$picker.colorInGamut.okhsl.a}
			editable={$picker.editable}
			on:colorChanged
		/>
	{:else if $picker?.colorFormat === 'lab'}
		<LabColorChannels
			l={$picker.colorInGamut.lab.l}
			a={$picker.colorInGamut.lab.a}
			b={$picker.colorInGamut.lab.b}
			A={$picker.colorInGamut.lab.A}
			editable={$picker.editable}
			on:colorChanged
		/>
	{:else if $picker?.colorFormat === 'oklab'}
		<OklabColorChannels
			l={$picker.colorInGamut.oklab.l}
			a={$picker.colorInGamut.oklab.a}
			b={$picker.colorInGamut.oklab.b}
			A={$picker.colorInGamut.oklab.A}
			editable={$picker.editable}
			on:colorChanged
		/>
	{:else if $picker?.colorFormat === 'lch'}
		<LchColorChannels
			l={$picker.colorInGamut.lch.l}
			c={$picker.colorInGamut.lch.c}
			h={$picker.colorInGamut.lch.h}
			a={$picker.colorInGamut.lch.a}
			editable={$picker.editable}
			on:colorChanged
		/>
	{:else if $picker?.colorFormat === 'oklch'}
		<OklchColorChannels
			l={$picker.colorInGamut.oklch.l}
			c={$picker.colorInGamut.oklch.c}
			h={$picker.colorInGamut.oklch.h}
			a={$picker.colorInGamut.oklch.a}
			editable={$picker.editable}
			on:colorChanged
		/>
	{/if}
</div>

<style lang="postcss">
	.color-channels {
		font-size: 0.75rem;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		gap: 0.375rem;
		justify-content: space-around;
		align-items: stretch;
		height: 100%;
	}
</style>
