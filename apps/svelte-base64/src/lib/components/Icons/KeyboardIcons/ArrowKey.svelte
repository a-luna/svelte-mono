<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let arrow: 'left' | 'right';
	export let size: 'sm' | 'md' | 'lg' = 'lg';

	$: tooltip = `${arrow.slice(0, 1)?.toUpperCase()}${arrow.slice(1)} Arrow Key`;
	$: iconWidth = size === 'sm' ? '13px' : size === 'md' ? '14px' : '16px';
	$: style = `height: ${iconWidth}; width: ${iconWidth}; line-height: ${iconWidth};`;
</script>

<kbd title={tooltip} {style}>
	{#if arrow === 'left'}
		<BasicIconRenderer icon={'arrowleft'} />
	{:else if arrow === 'right'}
		<BasicIconRenderer icon={'arrowright'} />
	{/if}
</kbd>

<style lang="postcss">
	kbd {
		display: inline-flex;
		margin: auto;
		padding: 0;
	}
</style>
