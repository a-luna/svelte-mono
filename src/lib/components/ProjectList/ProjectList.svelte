<script lang="ts">
	import Clear from '$lib/components/Icons/Clear.svelte';
	import Filter from '$lib/components/Icons/Filter.svelte';
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import ProjectFilter from '$lib/components/ProjectList/FilterControls/ProjectFilter.svelte';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import { updateProjectMetaData } from '$lib/projectMetaData';
	import type { FilterSetting, FilterSettingDetails, RepoWithMetaData } from '$lib/types';
	import { isUserRepo, userRepos } from '$lib/util';
	import { fade } from 'svelte/transition';

	let categories: FilterSetting[];
	let languages: FilterSetting[];
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
	$: if (initialized) {
		filtered = filterProjects(allRepos, filterCategory, filterLanguage);
		categories = getCategoryFilterSettings(filtered);
		languages = getLanguageFilterSettings(filtered);
	}
	$: language = getFilterSettingDetails(filterLanguage);
	$: category = getFilterSettingDetails(filterCategory);
	$: settingsDescription = getCurrentFilterSetting(filtered, language, category);
	$: filterResults = `${filtered.length} total ${filtered.length > 1 ? 'projects' : 'project'}`;

	function getLanguageFilterSettings(projects: RepoWithMetaData[]): FilterSetting[] {
		const allPrimaryLanguages = projects.map((p) => p?.primaryLanguage);
		const allLanguages = projects.map((p) => p?.languages).flat();
		return [...new Set([...allPrimaryLanguages, ...allLanguages])].sort();
	}

	function getCategoryFilterSettings(projects: RepoWithMetaData[]): FilterSetting[] {
		const allProjects = projects
			.map((p) => p?.categories)
			.flat()
			.filter((c) => !['frontend', 'backend'].includes(c));
		return [...new Set(allProjects)].sort();
	}

	function filterProjects(
		projects: RepoWithMetaData[],
		category: FilterSetting,
		language: FilterSetting
	): RepoWithMetaData[] {
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
		return filtered;
	}

	function getCurrentFilterSetting(
		results: RepoWithMetaData[],
		lang: FilterSettingDetails,
		cat: FilterSettingDetails
	) {
		if (!filterApplied) {
			return 'No filter applied';
		}
		const langSetting = filterLanguage === 'allLanguages' ? null : `Language = ${lang.displayName}`;
		const catSetting = filterCategory === 'allProjects' ? null : `Category = ${cat.displayName}`;
		const settings = [langSetting, catSetting].filter((s) => s !== null).join(', ');
		return `Filter by: ${settings}`;
	}

	function resetFilter() {
		filterLanguage = 'allLanguages';
		filterCategory = 'allProjects';
	}
</script>

<div class="project-list-wrapper">
	<div class="filter-settings">
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
	{#if showFilters}
		<div in:fade={{ delay: 200 }} out:fade={{ delay: 300 }} class="project-list-filter-wrapper">
			<ProjectFilter
				id={'radio-category'}
				title={'Filter By Project Type'}
				bind:selectedValue={filterCategory}
				filterSettings={['backend', 'frontend']}
				noFilterSetting={'allProjects'}
			/>
			<ProjectFilter
				id={'radio-category'}
				title={'Filter By Category'}
				bind:selectedValue={filterCategory}
				filterSettings={categories}
				startOptionNumber={3}
			/>
			<ProjectFilter
				id={'radio-language'}
				title={'Filter By Language/Tech'}
				bind:selectedValue={filterLanguage}
				noFilterSetting={'allLanguages'}
				filterSettings={languages}
			/>
		</div>
	{/if}
	<div class="filter-results">
		{filterResults} ({settingsDescription})
	</div>
	{#if filtered.length}
		<div class="project-list">
			{#each filtered as project}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<div class="zero-results">None of my projects match the current filter settings!</div>
	{/if}
</div>

<style lang="postcss">
	.project-list-wrapper,
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

	.project-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		gap: 2rem;
	}

	.filter-settings {
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

	.filter-results {
		font-size: 1.1rem;
		color: var(--pink-icon);
	}

	@media (min-width: 767px) {
		.project-list {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
