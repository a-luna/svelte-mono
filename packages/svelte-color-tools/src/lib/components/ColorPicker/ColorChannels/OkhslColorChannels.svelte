<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import type { CssColor } from '@a-luna/shared-ui';
	import { cssColorFromOkhsl } from '@a-luna/shared-ui/color/parsers';
	import { clampColorComponents } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let h: number;
	export let s: number;
	export let l: number;
	export let a: number = 0;
	const dispatch = createEventDispatcher<{ colorChanged: { color: CssColor } }>();

	$: disabled = !editable;
	$: color = cssColorFromOkhsl({ h, s, l, a });
	$: clamped = clampColorComponents(color);
</script>

<ColorSlider
	name="H"
	bind:value={h}
	display={clamped.okhsl.h}
	max={359}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="S"
	bind:value={s}
	display={clamped.okhsl.s}
	max={100}
	isPercent={true}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="L"
	bind:value={l}
	display={clamped.okhsl.l}
	max={100}
	isPercent={true}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="A"
	bind:value={a}
	display={clamped.okhsl.a}
	max={1}
	step={0.01}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
