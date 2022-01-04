<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';

	export let alphaEnabled: boolean = false;
	export let r: number;
	export let g: number;
	export let b: number;
	export let a: number = 0;
</script>

<ColorSlider name="R" bind:value={r} />
<ColorSlider name="G" bind:value={g} />
<ColorSlider name="B" bind:value={b} />
<ColorSlider name="A" bind:value={a} max={1} step={0.01} disabled={!alphaEnabled} />
