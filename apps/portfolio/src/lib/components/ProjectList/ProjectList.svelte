<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import FilterControls from '$lib/components/ProjectList/FilterControls.svelte';
	import FilterList from '$lib/components/ProjectList/FilterList.svelte';
	import { PROJECT_TYPES } from '$lib/constants';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import { userRepos } from '$lib/stores';
	import type { LanguageOrTech, ProjectCategory, ProjectType, RepoWithMetaData } from '$lib/types';
	import { slugify, sortByDate } from '$lib/util';
	import { slide } from 'svelte/transition';

	let filterProjectType: ProjectType = 'allProjects';
	let filterCategory: ProjectCategory = 'allCategories';
	let filterLanguage: LanguageOrTech = 'allLanguages';
	let filtered: RepoWithMetaData[] = [];
	let showFilters = false;

	let projectTypes = [...PROJECT_TYPES].filter((type) => type !== 'allProjects');
	let categories = [...new Set($userRepos.repos.map((repo) => repo.categories).flat())]
		.filter((category): category is ProjectCategory => !!category)
		.filter((category) => !PROJECT_TYPES.includes(category as ProjectType));
	let languages = [...new Set($userRepos.repos.map((repo) => repo.languages).flat())].filter(
		(lang): lang is LanguageOrTech => !!lang,
	);

	$: filterApplied =
		filterProjectType !== 'allProjects' || filterCategory !== 'allCategories' || filterLanguage !== 'allLanguages';
	$: if (filterProjectType || filterCategory || filterLanguage) {
		filtered = filterProjects($userRepos.repos, filterProjectType, filterCategory, filterLanguage);
		[projectTypes, categories, languages] = updateFilterSettings(filtered);
	}
	$: description = getFilterDescription(filtered, filterProjectType, filterCategory, filterLanguage);

	function getFilterDescription(
		projects: RepoWithMetaData[],
		type: ProjectType,
		category: ProjectCategory,
		language: LanguageOrTech,
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
				: ` ${getFilterSettingDetails(type).displayName}, ${getFilterSettingDetails(category).displayName}`;
		return language === 'allLanguages'
			? `${projects.length}${projectType}${projectPlural}`
			: `${projects.length}${projectType}${projectPlural} that ${involvePlural} ${
					getFilterSettingDetails(language).displayName
			  }`;
	}

	function filterProjects(
		projects: RepoWithMetaData[],
		type: ProjectType,
		category: ProjectCategory,
		language: LanguageOrTech,
	): RepoWithMetaData[] {
		filtered = [...projects].sort(sortByDate('updatedAt', false));
		if (type && type !== 'allProjects') {
			filtered = filtered.filter((project) => project.primaryCategory === type);
		}
		if (category && category !== 'allCategories') {
			filtered = filtered.filter((project) => project.categories?.includes(category));
		}
		if (language && language !== 'allLanguages') {
			filtered = filtered.filter(
				(project) => project.primaryLanguage === language || project.languages?.includes(language),
			);
		}
		return filtered;
	}

	function updateFilterSettings(projects: RepoWithMetaData[]): [ProjectType[], ProjectCategory[], LanguageOrTech[]] {
		const filteredTypes = [...new Set(projects.map((repo) => repo.primaryCategory))].filter(
			(type) => type !== 'allProjects',
		);

		const filteredCategories = [...new Set(projects.map((repo) => repo.categories).flat())]
			.filter((category): category is ProjectCategory => !!category)
			.filter((category) => !PROJECT_TYPES.includes(category as ProjectType))
			.sort((a, b) => slugify(a).localeCompare(slugify(b)));

		const filteredLanguages = [
			...new Set([...projects.map((repo) => repo.languages).flat(), ...projects.map((repo) => repo.primaryLanguage)]),
		]
			.filter((lang): lang is LanguageOrTech => !!lang)
			.sort((a, b) => slugify(a).localeCompare(slugify(b)));

		return [filteredTypes, filteredCategories, filteredLanguages];
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
			<FilterList
				{projectTypes}
				{categories}
				{languages}
				bind:filterProjectType
				bind:filterCategory
				bind:filterLanguage
			/>
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
