<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let arrow: 'left' | 'right';
	export let size: 'sm' | 'md' | 'lg' = 'lg';

	$: tooltip = `${arrow.slice(0, 1)?.toUpperCase()}${arrow.slice(1)} Arrow Key`;
	$: iconWidth = size === 'sm' ? '11px' : size === 'md' ? '13px' : '16px';
	$: style = `height: ${iconWidth}; width: ${iconWidth}; line-height: ${iconWidth};`;
</script>

<kbd title={tooltip} {style}>
	{#if arrow === 'left'}
		<BasicIconRenderer icon={'arrowleft'} height={iconWidth} margin={'auto'} />
	{:else if arrow === 'right'}
		<BasicIconRenderer icon={'arrowright'} height={iconWidth} margin={'auto'} />
	{/if}
</kbd>

<style lang="postcss">
	kbd {
		display: inline-flex;
		margin: auto;
		padding: 2px;
	}
</style>
