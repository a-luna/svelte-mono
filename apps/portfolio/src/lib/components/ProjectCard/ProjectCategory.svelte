<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting } from '$lib/types';

	export let category: FilterSetting;

	$: details = getFilterSettingDetails(category);
	$: categoryColor = details ? details.color : 'accent-color';
	$: displayName = details?.displayName;
</script>

<div class="project-category {categoryColor}" style="border-width: 1px; border-style: solid;">
	{displayName}
</div>

<style lang="postcss">
	.project-category {
		padding: 0.5rem;
		background-color: inherit;
		font-weight: 500;
		line-height: 1;
		
	}
</style>
