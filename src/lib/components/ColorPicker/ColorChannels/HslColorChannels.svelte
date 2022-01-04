<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';

	export let alphaEnabled: boolean = false;
	export let h: number;
	export let s: number;
	export let l: number;
	export let a: number = 0;
</script>

<ColorSlider name="H" bind:value={h} max={360} />
<ColorSlider name="S" bind:value={s} max={100} />
<ColorSlider name="L" bind:value={l} max={100} />
<ColorSlider name="A" bind:value={a} max={1} step={0.01} disabled={!alphaEnabled} />
