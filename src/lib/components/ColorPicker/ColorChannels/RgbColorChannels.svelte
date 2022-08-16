<script lang="ts">
	import { decimalToOpacityValue } from '$lib/color';

	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import { createEventDispatcher } from 'svelte';

	export let alphaEnabled: boolean = false;
	export let editable: boolean;
	export let r: number;
	export let g: number;
	export let b: number;
	export let a: number = 0;
	let rgb: string;
	const dispatch = createEventDispatcher();

	$: disabled = !editable;
	$: alpha = alphaEnabled ? decimalToOpacityValue(a) : 1;
	$: rgb = alphaEnabled ? `rgba(${r} ${g} ${b} / ${alpha})` : `rgb(${r} ${g} ${b})`;
	$: if (!alphaEnabled) dispatch('rgbColorChanged', `rgb(${r} ${g} ${b})`);
</script>

<ColorSlider name="R" bind:value={r} {disabled} on:change={() => dispatch('rgbColorChanged', rgb)} />
<ColorSlider name="G" bind:value={g} {disabled} on:change={() => dispatch('rgbColorChanged', rgb)} />
<ColorSlider name="B" bind:value={b} {disabled} on:change={() => dispatch('rgbColorChanged', rgb)} />
{#if alphaEnabled}
	<ColorSlider name="A" bind:value={a} {disabled} on:change={() => dispatch('rgbColorChanged', rgb)} />
{:else}
	<div style="width: 100%; height: 20px" />
{/if}
