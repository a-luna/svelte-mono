<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let value: FilterSetting;
	export let hovered = false;
	export let selected = false;

	$: details = getFilterSettingDetails(value);
	$: displayName = details.displayName;
	$: style =
		hovered || selected
			? `background-color: var(--${details.color}); color: var(--black);`
			: `background-color: var(--black); color: var(--${details.color});`;
</script>

<button class="filter-setting" class:hovered class:selected {style} on:click>
	<span class="filter-value">{displayName}</span>
</button>

<style lang="postcss">
	.filter-setting {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		line-height: 1;
	}
	.filter-value {
		white-space: nowrap;
	}
</style>
