<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import type { CssColor } from '@a-luna/shared-ui';
	import { cssColorFromLch } from '@a-luna/shared-ui/color/parsers';
	import { clampColorComponents, toFixedPercent } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let l: number;
	export let c: number;
	export let h: number;
	export let a: number = 0;
	const dispatch = createEventDispatcher<{ colorChanged: { color: CssColor } }>();

	$: disabled = !editable;
	$: color = cssColorFromLch({ l, c, h, a });
	$: clamped = clampColorComponents(color);
	$: alpha = parseFloat(toFixedPercent(clamped.lch.a));
</script>

<ColorSlider
	name="L"
	bind:value={l}
	display={clamped.lch.l}
	max={100}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="C"
	bind:value={c}
	display={clamped.lch.c}
	max={150}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="H"
	bind:value={h}
	display={clamped.lch.h}
	max={359}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="A"
	bind:value={a}
	display={alpha}
	max={1}
	step={0.01}
	isPercent={true}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
