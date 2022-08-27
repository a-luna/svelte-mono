<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let value: FilterSetting;
	export let hovered = false;
	export let selected = false;
	let iconColor: string;

	$: details = getFilterSettingDetails(value);
	$: iconColor = details ? `var(--${details.color}-icon)` : '--accent-color';
	$: displayName = details.displayName;
	$: iconSize = details?.size ?? 16;
	$: marginRight = Math.max(5, 23 - iconSize);
	$: marginLeft = marginRight - 7;
	$: iconStyle = `height: ${iconSize}px; width: ${iconSize}px; color: ${iconColor}; margin: 0 ${marginRight}px 0 ${marginLeft}px;`;
</script>

<div class="filter-setting" class:selected class:hovered>
	<div class="icon-wrapper" style={iconStyle}>
		<svelte:component this={details?.icon} {...{ fill: iconColor }} />
	</div>
	<span class="filter-value">{displayName}</span>
</div>

<style lang="postcss">
	.filter-setting {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		background-color: inherit;
		font-weight: 400;
	}
	.hovered,
	.hovered.selected {
		color: var(--accent-color);
	}
	.selected {
		background-color: var(--dark-gray-shade1);
		color: var(--white-shade1);
	}
	.icon-wrapper {
		object-fit: contain;
		vertical-align: middle;
	}
	.filter-value {
		white-space: nowrap;
	}
</style>
