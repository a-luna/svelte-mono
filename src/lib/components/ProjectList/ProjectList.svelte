<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import FilterControls from '$lib/components/ProjectList/FilterControls.svelte';
	import FilterList from '$lib/components/ProjectList/FilterList.svelte';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import { updateProjectMetaData } from '$lib/projectMetaData';
	import type { FilterSetting, RepoWithMetaData } from '$lib/types';
	import { isUserRepo, userRepos } from '$lib/util';
	import { slide } from 'svelte/transition';

	let filterProjectType: FilterSetting = 'allProjects';
	let filterCategory: FilterSetting = 'allCategories';
	let filterLanguage: FilterSetting = 'allLanguages';
	let allRepos: RepoWithMetaData[] = [];
	let filtered: RepoWithMetaData[] = [];
	let initialized = false;
	let showFilters = false;

	$: filterApplied =
		filterProjectType !== 'allProjects' ||
		filterCategory !== 'allCategories' ||
		filterLanguage !== 'allLanguages';
	$: if ($userRepos) {
		allRepos = Object.values($userRepos)
			.filter((r) => isUserRepo(r.name))
			.map(updateProjectMetaData);
		initialized = true;
	}
	$: if (initialized && (filterProjectType || filterCategory || filterLanguage)) {
		filterProjects(allRepos, filterProjectType, filterCategory, filterLanguage);
	}
	$: description = getFilterDescription(
		filtered,
		filterProjectType,
		filterCategory,
		filterLanguage
	);

	function getFilterDescription(
		projects: RepoWithMetaData[],
		type: FilterSetting,
		category: FilterSetting,
		language: FilterSetting
	): string {
		const projectPlural = projects.length === 1 ? ' project' : ' projects';
		const involvePlural = projects.length === 1 ? ' involves' : ' involve';
		if (!filterApplied) {
			return `${projects.length} total ${projectPlural}, no filter applied`;
		}
		const projectType =
			type === 'allProjects' && category === 'allCategories'
				? ''
				: category === 'allCategories'
				? ` ${getFilterSettingDetails(type).displayName}`
				: type === 'allProjects'
				? ` ${getFilterSettingDetails(category).displayName}`
				: ` ${getFilterSettingDetails(type).displayName}, ${
						getFilterSettingDetails(category).displayName
				  }`;
		return language === 'allLanguages'
			? `${projects.length}${projectType}${projectPlural}`
			: `${projects.length}${projectType}${projectPlural} that ${involvePlural} ${
					getFilterSettingDetails(language).displayName
			  }`;
	}

	function filterProjects(
		projects: RepoWithMetaData[],
		type: FilterSetting,
		category: FilterSetting,
		language: FilterSetting
	) {
		filtered = [...projects];
		if (type && type !== 'allProjects') {
			filtered = filtered.filter((project) => project.primaryCategory === type);
		}
		if (category && category !== 'allCategories') {
			filtered = filtered.filter((project) => project.categories.includes(category));
		}
		if (language && language !== 'allLanguages') {
			filtered = filtered.filter(
				(project) => project.primaryLanguage === language || project.languages.includes(language)
			);
		}
	}

	function resetFilter() {
		filterProjectType = 'allProjects';
		filterCategory = 'allCategories';
		filterLanguage = 'allLanguages';
	}
</script>

<div class="project-list-wrapper">
	<div class="filter-controls-wrapper">
		<FilterControls bind:showFilters {filterApplied} on:resetFilter={() => resetFilter()} />
	</div>
	{#if showFilters}
		<div transition:slide={{ duration: 500 }} class="project-list-filter-wrapper">
			<FilterList bind:filterProjectType bind:filterCategory bind:filterLanguage />
		</div>
	{/if}
	<span class="total-results">{description}</span>

	<div class="project-list">
		{#each filtered as project}
			<ProjectCard {project} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.project-list-wrapper {
		--project-card-border-color: var(--dark-gray);

		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
		z-index: 3;
	}

	.filter-controls-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
	}

	.project-list-filter-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 2rem;
		background-color: var(--black);
		border: 2px solid var(--project-card-border-color);
		line-height: 1;
		padding: 2rem;
		z-index: 3;
	}

	.project-list {
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
	}

	.total-results {
		font-size: 1.3rem;
	}

	@media (min-width: 640px) {
		.project-list {
			gap: 2rem;
		}
		.total-results {
			font-size: 1.4rem;
		}
	}

	@media (min-width: 768px) {
		.project-list {
			gap: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.filter-controls-wrapper {
			display: flex;
			flex-flow: row nowrap;
			align-items: flex-end;
		}
	}
</style>
