<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import type { CssColor } from '@a-luna/shared-ui';
	import { cssColorFromOklab } from '@a-luna/shared-ui/color/parsers';
	import { clampColorComponents, toFixedPercent } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let l: number;
	export let a: number;
	export let b: number;
	export let A: number = 0;
	const dispatch = createEventDispatcher<{ colorChanged: { color: CssColor } }>();

	$: disabled = !editable;
	$: color = cssColorFromOklab({ l, a, b, A });
	$: clamped = clampColorComponents(color);
	$: alpha = parseFloat(toFixedPercent(clamped.oklab.A));
</script>

<ColorSlider
	name="L"
	bind:value={l}
	display={clamped.oklab.l}
	max={100}
	isPercent={true}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="a"
	bind:value={a}
	display={clamped.oklab.a}
	min={-0.4}
	max={0.4}
	step={0.01}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="b"
	bind:value={b}
	display={clamped.oklab.b}
	min={-0.4}
	max={0.4}
	step={0.01}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="A"
	bind:value={A}
	display={alpha}
	max={1}
	step={0.01}
	isPercent={true}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
