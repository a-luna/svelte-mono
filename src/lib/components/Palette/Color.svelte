<script lang="ts">
	import type { CssColor } from '$lib/types';

	export let color: CssColor;

	$: tooltip = color?.name ? `${color.hslString} (${color.name})` : color.hslString;
</script>

<button type="button" on:click>
	<div title={tooltip} class="palette-option" style="background-color: {color.hslString}" />
</button>

<style lang="postcss">
	button:focus {
		outline: 2px solid hsl(240 100% 27%);
	}

	.palette-option {
		height: 20px;
		width: 40px;
		padding: 5px;
		border-width: 2px;
		border-style: inset;
	}
</style>
