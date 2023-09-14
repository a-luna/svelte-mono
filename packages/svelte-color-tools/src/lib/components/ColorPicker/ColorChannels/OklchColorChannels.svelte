<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import type { CssColor } from '@a-luna/shared-ui';
	import { cssColorFromOklch } from '@a-luna/shared-ui/color/parsers';
	import { clampColorComponents } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let l: number;
	export let c: number;
	export let h: number;
	export let a: number = 0;
	const dispatch = createEventDispatcher<{ colorChanged: { color: CssColor } }>();

	$: disabled = !editable;
	$: color = cssColorFromOklch({ l, c, h, a });
	$: clamped = clampColorComponents(color);
</script>

<ColorSlider
	name="L"
	bind:value={l}
	display={clamped.oklch.l}
	max={100}
	isPercent={true}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="C"
	bind:value={c}
	display={clamped.oklch.c}
	max={0.4}
	step={0.005}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="H"
	bind:value={h}
	display={clamped.oklch.h}
	max={359}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="A"
	bind:value={a}
	display={clamped.oklch.a}
	max={1}
	step={0.01}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
