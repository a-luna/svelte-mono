<script lang="ts">
	export let title: string = null;
	export let viewBox: string;
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox}>
	{#if title}
		<title>{title}</title>
	{/if}
	<slot />
</svg>

<style>
	svg {
		stroke: currentcolor;
		fill: currentcolor;
		stroke-width: 0;
		width: 100%;
		height: auto;
		max-height: 100%;
	}
</style>
