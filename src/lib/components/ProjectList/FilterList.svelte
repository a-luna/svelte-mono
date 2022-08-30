<script lang="ts">
	import ProjectFilter from '$lib/components/ProjectList/ProjectFilter/ProjectFilter.svelte';
	import { BACKEND_CATEGORIES, FRONTEND_CATEGORIES, TECH_LIST } from '$lib/constants';
	import type { FilterSetting } from '$lib/types';
	import { slide } from 'svelte/transition';

	export let filterProjectType: FilterSetting;
	export let filterCategory: FilterSetting;
	export let filterLanguage: FilterSetting;
	const categories: FilterSetting[] = [...BACKEND_CATEGORIES, ...FRONTEND_CATEGORIES].sort();
	const languages: FilterSetting[] = [...TECH_LIST]
		.filter((lang) => lang !== 'allLanguages')
		.sort();
</script>

<div in:slide={{ delay: 200 }} out:slide={{ delay: 300 }} class="project-list-filter-wrapper">
	<ProjectFilter
		bind:selectedValue={filterProjectType}
		id={'radio-type'}
		title={'Filter By Project Type'}
		filterSettings={['backend', 'frontend']}
		noFilterSetting={'allProjects'}
	/>
	<ProjectFilter
		bind:selectedValue={filterCategory}
		id={'radio-category'}
		title={'Filter By Category'}
		filterSettings={categories}
		noFilterSetting={'allCategories'}
	/>
	<ProjectFilter
		bind:selectedValue={filterLanguage}
		id={'radio-language'}
		title={'Filter By Language/Tech'}
		filterSettings={languages}
		noFilterSetting={'allLanguages'}
	/>
</div>

<style lang="postcss">
	.project-list-filter-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 2rem;
		background-color: inherit;
		border: 2px solid var(--accent-color);
		line-height: 1;
		padding: 2rem;
		z-index: 3;
	}
</style>
