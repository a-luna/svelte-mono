<script lang="ts">
	export let viewBox: string;
	export let stroke: string = 'currentColor';
	export let fill: string = 'currentColor';
	export let strokeWidth = '0';
	export let padding = '0';
	export let title: string = '';
	export let transform: string = '';

	$: strokeStyle = strokeWidth ? `stroke-width: ${strokeWidth}; ` : '';
	$: paddingStyle = padding ? `padding: ${padding}; ` : '';
	$: transformStyle = transform ? `-webkit-transform: ${transform}; transform: ${transform}; ` : '';
	$: style = `${strokeStyle}${paddingStyle}${transformStyle}`;
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox} {stroke} {fill} {style}>
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
