<script lang="ts">
	import FilterControls from '$lib/components/ProjectList/FilterControls.svelte';
	import FilterList from '$lib/components/ProjectList/FilterList.svelte';
	import { updateProjectMetaData } from '$lib/projectMetaData';
	import type { FilterSetting, RepoWithMetaData } from '$lib/types';
	import { isUserRepo, userRepos } from '$lib/util';
	import FilterResults from './FilterResults.svelte';

	let filterCategory: FilterSetting = 'allProjects';
	let filterLanguage: FilterSetting = 'allLanguages';
	let allRepos: RepoWithMetaData[] = [];
	let filtered: RepoWithMetaData[] = [];
	let initialized = false;
	let showFilters = false;

	$: filterApplied = filterCategory !== 'allProjects' || filterLanguage !== 'allLanguages';
	$: if ($userRepos) {
		allRepos = Object.values($userRepos)
			.filter((r) => isUserRepo(r.name))
			.map(updateProjectMetaData);
		initialized = true;
	}
	$: if (initialized && (filterCategory || filterLanguage)) {
		filterProjects(allRepos, filterCategory, filterLanguage);
	}

	function filterProjects(
		projects: RepoWithMetaData[],
		category: FilterSetting,
		language: FilterSetting
	) {
		filtered = [...projects];
		if (category && category !== 'allProjects') {
			filtered = filtered.filter(
				(project) => project.primaryCategory === category || project.categories.includes(category)
			);
		}
		if (language && language !== 'allLanguages') {
			filtered = filtered.filter(
				(project) => project.primaryLanguage === language || project.languages.includes(language)
			);
		}
	}
</script>

<div class="project-list-wrapper">
	<FilterControls bind:filterCategory bind:filterLanguage bind:showFilters {filterApplied} />
	{#if showFilters}
		<FilterList bind:filterCategory bind:filterLanguage />
	{/if}
	<FilterResults projects={filtered} {filterApplied} {filterCategory} {filterLanguage} />
</div>

<style lang="postcss">
	.project-list-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		z-index: 3;
	}
</style>
