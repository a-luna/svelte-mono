<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import type { CssColor } from '@a-luna/shared-ui';
	import { cssColorFromLab } from '@a-luna/shared-ui/color/parsers';
	import { clampColorComponents } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let l: number;
	export let a: number;
	export let b: number;
	export let A: number = 0;
	const dispatch = createEventDispatcher<{ colorChanged: { color: CssColor } }>();

	$: disabled = !editable;
	$: color = cssColorFromLab({ l, a, b, A });
	$: clamped = clampColorComponents(color);
</script>

<ColorSlider
	name="L"
	bind:value={l}
	display={clamped.lab.l}
	max={100}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="a"
	bind:value={a}
	display={clamped.lab.a}
	min={-125}
	max={125}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="b"
	bind:value={b}
	display={clamped.lab.b}
	min={-125}
	max={125}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="A"
	bind:value={A}
	display={clamped.lab.A}
	max={1}
	step={0.01}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
