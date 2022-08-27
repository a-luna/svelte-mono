<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let category: FilterSetting;

	$: details = getFilterSettingDetails(category);
	$: categoryColor = details ? `var(--${details.color}-icon)` : '--accent-color';
	$: displayName = details?.displayName;
</script>

<div class="project-category" style="color: {categoryColor}; border: 0.75px solid {categoryColor};">
	{displayName}
</div>

<style lang="postcss">
	.project-category {
		padding: 0.25rem 0.5rem;
		background-color: var(--page-bg-color);
		font-weight: 400;
	}
</style>
