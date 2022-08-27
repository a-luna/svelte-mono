<script lang="ts">
	import ProjectFilter from '$lib/components/ProjectList/ProjectFilter/ProjectFilter.svelte';
	import { BACKEND_CATEGORIES, FRONTEND_CATEGORIES, TECH_LIST } from '$lib/constants';
	import type { FilterSetting } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let filterCategory: FilterSetting;
	export let filterLanguage: FilterSetting;
	let projectTypeFilter: ProjectFilter;
	let categoryFilter: ProjectFilter;
	const categories: FilterSetting[] = [...BACKEND_CATEGORIES, ...FRONTEND_CATEGORIES].sort();
	const languages: FilterSetting[] = [...TECH_LIST]
		.filter((lang) => lang !== 'allLanguages')
		.sort();
</script>

<div in:fade={{ delay: 200 }} out:fade={{ delay: 300 }} class="project-list-filter-wrapper">
	<ProjectFilter
		bind:this={projectTypeFilter}
		bind:selectedValue={filterCategory}
		id={'radio-category'}
		title={'Filter By Project Type'}
		filterSettings={['backend', 'frontend']}
		noFilterSetting={'allProjects'}
		on:filterSettingChanged={(e) => categoryFilter.changeFilterSetting(e.detail, false)}
	/>
	<ProjectFilter
		bind:this={categoryFilter}
		bind:selectedValue={filterCategory}
		id={'radio-category'}
		title={'Filter By Category'}
		filterSettings={categories}
		startOptionNumber={3}
		on:filterSettingChanged={(e) => projectTypeFilter.changeFilterSetting(e.detail, false)}
	/>
	<ProjectFilter
		bind:selectedValue={filterLanguage}
		id={'radio-language'}
		title={'Filter By Language/Tech'}
		noFilterSetting={'allLanguages'}
		filterSettings={languages}
	/>
</div>

<style lang="postcss">
	.project-list-filter-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		z-index: 3;
	}

	.project-list-filter-wrapper {
		padding: 1rem;
		background-color: var(--black-tint2);
	}
</style>
