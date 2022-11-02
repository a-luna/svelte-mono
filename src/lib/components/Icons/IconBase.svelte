<script lang="ts">
	export let viewBox: string;
	export let stroke: string = 'currentColor';
	export let x: string = '';
	export let y: string = '';
	export let width: string = 'auto';
	export let height: string = 'auto';
	export let fill: string = 'currentColor';
	export let strokeWidth = '0';
	export let padding = '0';
	export let title: string = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	{x}
	{y}
	{width}
	{height}
	{stroke}
	{fill}
	style="stroke-width: {strokeWidth}; padding: {padding};"
>
	{#if title}
		<title>{title}</title>
	{/if}
	<slot />
</svg>

<style>
	svg {
		width: 100%;
		height: auto;
		max-height: 100%;
	}
</style>
