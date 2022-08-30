<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let value: FilterSetting;
	export let hovered = false;
	export let selected = false;

	$: details = getFilterSettingDetails(value);
	$: color = `var(--${details.color}-icon)`;
	$: displayName = details.displayName;
	$: style = `--category-color: ${color}`;
</script>

<div class="filter-setting" class:hovered class:selected {style}>
	<span class="filter-value">{displayName}</span>
</div>

<style lang="postcss">
	.filter-setting {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		line-height: 1;

		color: var(--category-color);
		background-color: inherit;
	}
	.hovered {
		background-color: inherit;
	}
	.selected,
	.hovered.selected {
		color: var(--page-bg-color);
		background-color: var(--category-color);
	}
	.filter-value {
		white-space: nowrap;
	}
</style>
