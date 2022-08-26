<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';

	import ProjectFilter from '$lib/components/ProjectList/FilterControls/ProjectFilter.svelte';
	import { getIconDetails } from '$lib/iconDatabase';
	import { getCategoryDetails, updateProjectMetaData } from '$lib/projectMetaData';
	import type { FilterSetting, IconDetails, RepoWithMetaData } from '$lib/types';
	import { isUserRepo, userRepos } from '$lib/util';
	import FilterByCategory from './Filters/FilterByCategory.svelte';

	let allCategories: FilterSetting[] = [];
	let allLanguages: FilterSetting[];
	let filterLanguage: FilterSetting = 'allLanguages';
	let filterCategory: FilterSetting = 'allCategories';
	let allRepos: RepoWithMetaData[] = [];
	let filtered: RepoWithMetaData[] = [];
	let initialized = false;

	$: if ($userRepos) {
		allRepos = Object.values($userRepos)
			.filter((r) => isUserRepo(r.name))
			.map(updateProjectMetaData);
		allCategories = getCategoryFilterSettings(allRepos);
		allLanguages = getLanguageFilterSettings(allRepos);
		initialized = true;
	}
	$: if (initialized) {
		filtered = filterProjects(allRepos, filterCategory, filterLanguage);
	}
	$: language = getIconDetails(filterLanguage);
	$: category = getCategoryDetails(filterCategory);
	$: settingsDescription = getFilterSettingsDescriptin(filtered, language, category);

	function getLanguageFilterSettings(projects: RepoWithMetaData[]): FilterSetting[] {
		const allPrimaryLanguages = projects.map((p) => p?.primaryLanguage);
		const allLanguages = projects.map((p) => p?.languages).flat();
		return [...new Set([...allPrimaryLanguages, ...allLanguages])].sort();
	}

	function getCategoryFilterSettings(projects: RepoWithMetaData[]): FilterSetting[] {
		const allCategories = projects.map((p) => p?.categories).flat();
		return [...new Set(allCategories)].sort();
	}

	function filterProjects(
		projects: RepoWithMetaData[],
		category: FilterSetting,
		language: FilterSetting
	): RepoWithMetaData[] {
		filtered = [...projects];
		if (category && category !== 'allCategories') {
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

	function getFilterSettingsDescriptin(
		results: RepoWithMetaData[],
		lang: IconDetails,
		cat: IconDetails
	) {
		const langSetting = filterLanguage === 'allLanguages' ? null : `Language = ${lang.displayName}`;
		const catSetting = filterCategory === 'allCategories' ? null : `Category = ${cat.displayName}`;
		if (!langSetting && !catSetting) {
			return `${results.length} total projects`;
		}
		const settings = [langSetting, catSetting].filter((s) => s !== null).join(', ');
		return `${results.length} projects match: ${settings}`;
	}
</script>

<div class="project-list-wrapper">
	<FilterByCategory bind:filterCategory />
	<ProjectFilter
		id={'radio-language'}
		title={'Filter By Language/Tech'}
		bind:selectedValue={filterLanguage}
		showIcons={true}
		noFilterSetting={'allLanguages'}
		filterSettings={allLanguages}
	/>
	<div class="filter-settings">{settingsDescription}</div>
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
	.project-list-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
	}

	.project-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		gap: 2rem;
		z-index: 3;
		margin: 2rem 0 0 0;
	}

	@media (min-width: 767px) {
		.project-list {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
