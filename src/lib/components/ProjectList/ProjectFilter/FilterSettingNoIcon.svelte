<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let value: FilterSetting;
	export let hovered = false;
	export let selected = false;

	$: details = getFilterSettingDetails(value);
	$: color = hovered || selected ? 'var(--black)' : `var(--${details.color}-icon)`;
	$: bgColor = hovered || selected ? `var(--${details.color}-icon)` : 'var(--black)';
	$: displayName = details.displayName;
	$: style = `color: ${color}; background-color: ${bgColor}`;
</script>

<button class="filter-setting" class:hovered class:selected {style} on:click>
	<span class="filter-value">{displayName}</span>
</button>

<style lang="postcss">
	.filter-setting {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		line-height: 1;
	}
	.filter-value {
		white-space: nowrap;
	}
</style>
