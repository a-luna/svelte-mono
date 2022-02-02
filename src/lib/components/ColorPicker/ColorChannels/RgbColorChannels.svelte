<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import { createEventDispatcher } from 'svelte';

	export let alphaEnabled: boolean = false;
	export let editable: boolean;
	export let r: number;
	export let g: number;
	export let b: number;
	export let a: number = 0;
	let rgb: string;
	let alphaSlider: ColorSlider;
	const dispatch = createEventDispatcher();

	$: rgbAlpha = a ? a : 1;
	$: rgb = alphaEnabled ? `rgba(${r} ${g} ${b} / ${rgbAlpha})` : `rgb(${r} ${g} ${b})`;

	function handleAlphaChanged() {
		a = alphaSlider.value;
		dispatch('rgbColorChanged', rgb);
	}
</script>

<ColorSlider name="R" bind:value={r} disabled={!editable} on:change={() => dispatch('rgbColorChanged', rgb)} />
<ColorSlider name="G" bind:value={g} disabled={!editable} on:change={() => dispatch('rgbColorChanged', rgb)} />
<ColorSlider name="B" bind:value={b} disabled={!editable} on:change={() => dispatch('rgbColorChanged', rgb)} />
{#if alphaEnabled}
	<ColorSlider
		bind:this={alphaSlider}
		name="A"
		value={rgbAlpha}
		max={1}
		step={0.01}
		disabled={!editable}
		on:change={() => handleAlphaChanged()}
	/>
{:else}
	<div style="width: 100%; height: 20px" />
{/if}
