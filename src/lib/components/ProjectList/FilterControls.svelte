<script lang="ts">
	import Clear from '$lib/components/Icons/Clear.svelte';
	import Filter from '$lib/components/Icons/Filter.svelte';
	import type { FilterSetting } from '$lib/types';

	export let filterCategory: FilterSetting;
	export let filterLanguage: FilterSetting;
	export let showFilters: boolean;
	export let filterApplied: boolean;

	function resetFilter() {
		filterLanguage = 'allLanguages';
		filterCategory = 'allProjects';
	}
</script>

<div class="filter-controls">
	<button
		class="show-filters"
		class:open={showFilters}
		title="Show/Hide Project Filters"
		on:click={() => (showFilters = !showFilters)}
	>
		<div class="icon"><Filter /></div>
	</button>
	<button
		class="reset-filters"
		disabled={!filterApplied}
		title="Reset Filters"
		on:click={() => resetFilter()}
	>
		<div class="icon"><Clear /></div>
	</button>
</div>

<style lang="postcss">
	.filter-controls {
		display: grid;
		grid-template-columns: 40px 40px;
		align-items: flex-start;
		gap: 1rem;
	}

	.show-filters,
	.reset-filters {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--page-bg-color);
		border: 2px solid var(--white);
		color: var(--white);
		width: 2.5rem;
		height: 2.5rem;
	}

	.show-filters.open {
		border-color: var(--accent-color);
		background-color: var(--white);
		color: var(--page-bg-color);
	}

	.reset-filters[disabled] {
		border-color: var(--dark-gray-shade2);
		color: var(--dark-gray-shade2);
	}

	.reset-filters:not([disabled]) {
		border-color: var(--pink-icon);
		color: var(--pink-icon);
	}

	.show-filters:hover,
	.reset-filters:not([disabled]):hover {
		border-color: var(--accent-color);
	}

	.icon {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
