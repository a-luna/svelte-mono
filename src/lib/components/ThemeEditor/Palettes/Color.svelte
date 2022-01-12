<script lang="ts">
	import type { CssColor } from '$lib/types';

	export let color: CssColor;
	export let displayName = false;

	$: tooltip = color?.name ? `${color.hslString} (${color.name})` : color.hslString;
</script>

<button type="button" on:click>
	<div title={tooltip} class="color-swatch" style="background-color: {color.hslString}" />
	{#if displayName}
		<span class="color-name">{color.name}</span>
	{/if}
</button>

<style lang="postcss">
	button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		gap: 0.5rem;
		white-space: nowrap;
	}

	button:focus {
		outline: none;
	}

	button:focus .color-swatch {
		outline: 2px solid hsl(240 100% 27%);
		outline-offset: 2px;
	}

	.color-swatch {
		flex: 0 1 auto;
		height: 20px;
		width: 40px;
		padding: 5px;
		border-width: 2px;
		border-style: inset;
	}

	.color-name {
		flex: 1;
		font-size: 0.875rem;
		line-height: 1;
		margin: auto 0;
		text-align: left;
	}
</style>
