<script lang="ts">
	import X11ColorSwatch from '$lib/components/ThemeEditor/Palettes/X11Palettes/X11ColorSwatch.svelte';
	import type { ColorPalette } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let x11ColorPalettes: ColorPalette[];
	const dispatch = createEventDispatcher();
</script>

<div class="x11-swatches">
	{#each x11ColorPalettes as palette}
		<X11ColorSwatch
			color={palette.componentColor}
			tooltip={palette.name}
			on:click={() => dispatch('changeX11Palette', palette.componentColor)}
		/>
	{/each}
</div>

<style lang="postcss">
	.x11-swatches {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}
</style>
