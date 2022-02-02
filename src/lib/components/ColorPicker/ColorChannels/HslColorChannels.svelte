<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import { createEventDispatcher } from 'svelte';

	export let alphaEnabled: boolean = false;
	export let editable: boolean;
	export let h: number;
	export let s: number;
	export let l: number;
	export let a: number = 0;
	let hsl: string;
	const dispatch = createEventDispatcher();

	$: hsl = alphaEnabled ? `hsla(${h} ${s}% ${l}% / ${a})` : `hsl(${h} ${s}% ${l}%)`;
</script>

<ColorSlider
	name="H"
	bind:value={h}
	max={360}
	disabled={!editable}
	on:change={() => dispatch('hslColorChanged', hsl)}
/>
<ColorSlider
	name="S"
	bind:value={s}
	max={100}
	disabled={!editable}
	on:change={() => dispatch('hslColorChanged', hsl)}
/>
<ColorSlider
	name="L"
	bind:value={l}
	max={100}
	disabled={!editable}
	on:change={() => dispatch('hslColorChanged', hsl)}
/>
{#if alphaEnabled}
	<ColorSlider
		name="A"
		bind:value={a}
		max={1}
		step={0.01}
		disabled={!editable}
		on:change={() => dispatch('hslColorChanged', hsl)}
	/>
{:else}
	<div style="width: 100%; height: 20px" />
{/if}
