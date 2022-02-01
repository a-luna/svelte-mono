<script lang="ts">
	import ColorSlider from '$lib/components/ColorPicker/ColorChannels/ColorSlider.svelte';

	export let alphaEnabled: boolean = false;
	export let editable: boolean;
	export let r: number;
	export let g: number;
	export let b: number;
	export let a: number = 0;
</script>

<ColorSlider name="R" bind:value={r} disabled={!editable} />
<ColorSlider name="G" bind:value={g} disabled={!editable} />
<ColorSlider name="B" bind:value={b} disabled={!editable} />
{#if alphaEnabled}
	<ColorSlider name="A" bind:value={a} max={1} step={0.01} disabled={!editable} />
{:else}
	<div style="width: 100%; height: 20px" />
{/if}
