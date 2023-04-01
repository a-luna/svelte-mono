<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let value: FilterSetting;
	export let hovered = false;
	export let selected = false;

	$: details = getFilterSettingDetails(value);
	$: displayName = details.displayName;
</script>

<button class="filter-setting {details.color}" class:hovered class:selected on:click>
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
