<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';
	import type { CssColor } from '@a-luna/shared-ui';
	import { cssColorFromRgb } from '@a-luna/shared-ui/color/parsers';
	import { clampColorComponents } from '@a-luna/shared-ui/color/util';
	import { createEventDispatcher } from 'svelte';

	export let editable: boolean;
	export let r: number;
	export let g: number;
	export let b: number;
	export let a: number;
	const dispatch = createEventDispatcher<{ colorChanged: { color: CssColor } }>();

	$: disabled = !editable;
	$: color = cssColorFromRgb({ r, g, b, a });
	$: clamped = clampColorComponents(color);
</script>

<ColorSlider
	name="R"
	bind:value={r}
	display={clamped.rgb.r}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="G"
	bind:value={g}
	display={clamped.rgb.g}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="B"
	bind:value={b}
	display={clamped.rgb.b}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
<ColorSlider
	name="A"
	bind:value={a}
	display={clamped.rgb.a}
	max={1}
	step={0.01}
	{disabled}
	on:change={() => dispatch('colorChanged', { color })}
/>
