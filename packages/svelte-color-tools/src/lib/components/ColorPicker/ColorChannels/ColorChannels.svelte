<script lang="ts">
	import HslColorChannels from '$lib/components/ColorPicker/ColorChannels/HslColorChannels.svelte';
	import RgbColorChannels from '$lib/components/ColorPicker/ColorChannels/RgbColorChannels.svelte';
	import { getColorPickerStore } from '$lib/context';
	import { ColorParser } from '@a-luna/shared-ui';

	export let pickerId: string;
	let state = getColorPickerStore(pickerId);

	function handleColorChanged(e: CustomEvent<{ css: string }>) {
		const { css } = e.detail;
		if ($state.labelState === 'inactive') {
			const result = ColorParser.parse(css);
			$state.color = result.success ? result.value : $state.color;
		}
	}
</script>

<div class="text-sm flex flex-col flex-nowrap justify-center items-stretch gap-1.5">
	{#if $state?.colorSpace === 'rgb'}
		<RgbColorChannels
			r={$state.color.rgb.r}
			g={$state.color.rgb.g}
			b={$state.color.rgb.b}
			a={$state.color.rgb.a}
			editable={$state.editable}
			on:colorChanged={handleColorChanged}
		/>
	{:else if $state?.colorSpace === 'hsl'}
		<HslColorChannels
			h={$state.color.hsl.h}
			s={$state.color.hsl.s}
			l={$state.color.hsl.l}
			a={$state.color.hsl.a}
			editable={$state.editable}
			on:colorChanged={handleColorChanged}
		/>
	{/if}
</div>
