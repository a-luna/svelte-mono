<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import { decimalToOpacityValue } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let r: number;
	export let g: number;
	export let b: number;
	export let a: number;
	let rgb: string;
	const dispatch = createEventDispatcher<{ colorChanged: { css: string } }>();

	$: disabled = !editable;
	$: alpha = a < 255 ? decimalToOpacityValue(a) : 1;
	$: rgb = a < 255 ? `rgb(${r} ${g} ${b} / ${alpha})` : `rgb(${r} ${g} ${b})`;
	// $: if (!alphaEnabled) dispatch('rgbColorChanged', { rgb: `rgb(${r} ${g} ${b})` });
</script>

<ColorSlider name="R" bind:value={r} {disabled} on:change={() => dispatch('colorChanged', { css: rgb })} />
<ColorSlider name="G" bind:value={g} {disabled} on:change={() => dispatch('colorChanged', { css: rgb })} />
<ColorSlider name="B" bind:value={b} {disabled} on:change={() => dispatch('colorChanged', { css: rgb })} />
<ColorSlider name="A" bind:value={a} {disabled} on:change={() => dispatch('colorChanged', { css: rgb })} />
