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

	type FilterSettings = [ProjectType, ProjectCategory, LanguageOrTech];

	let allProjects = Object.values($userRepos.repos);
	// let [projectTypes, categories, languages] = updateFilterSettings(allProjects);
	let [filterType, filterCat, filterLang]: FilterSettings = ['allProjects', 'allCategories', 'allLanguages'];
	let currentSettings: FilterSettings;
	let showFilters = false;

	$: currentSettings = [filterType, filterCat, filterLang];
	$: projects = filterProjects(allProjects, currentSettings);
	$: [projectTypes, categories, languages] = updateFilterSettings(projects);
	$: filterApplied = filterType !== 'allProjects' || filterCat !== 'allCategories' || filterLang !== 'allLanguages';
	$: description = getFilterDescription(projects, currentSettings);

	function getFilterDescription(projects: RepoWithMetaData[], settings: FilterSettings): string {
		const projectPlural = projects.length === 1 ? ' project' : ' projects';
		const involvePlural = projects.length === 1 ? ' involves' : ' involve';
		if (!filterApplied) {
			return `${projects.length} total ${projectPlural}, no filter applied`;
		}
		const [type, category, language] = settings;
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

	function filterProjects(projects: RepoWithMetaData[], settings: FilterSettings): RepoWithMetaData[] {
		const [type, category, language] = settings;
		projects = sortByDate([...projects], { key: 'updatedAt', asc: false });
		if (type !== 'allProjects') {
			projects = projects.filter((project) => project.primaryCategory === type);
		}
		if (category !== 'allCategories') {
			projects = projects.filter((project) => project.categories?.includes(category));
		}
		if (language !== 'allLanguages') {
			projects = projects.filter(
				(project) => project.primaryLanguage === language || project.languages?.includes(language),
			);
		}
		return projects;
	}

	function updateFilterSettings(projects: RepoWithMetaData[]): [ProjectType[], ProjectCategory[], LanguageOrTech[]] {
		const filteredTypes = [...new Set(projects.map((repo) => repo.primaryCategory) ?? [...PROJECT_TYPES])].filter(
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
		filterType = 'allProjects';
		filterCat = 'allCategories';
		filterLang = 'allLanguages';
	}
</script>

<div class="project-list-wrapper">
	<div class="filter-controls-wrapper">
		<FilterControls bind:showFilters {filterApplied} on:resetFilter={() => resetFilter()} />
	</div>
	{#if showFilters}
		<div transition:slide|global={{ duration: 500 }} class="project-list-filter-wrapper">
			<FilterList
				{projectTypes}
				{categories}
				{languages}
				bind:filterProjectType={filterType}
				bind:filterCategory={filterCat}
				bind:filterLanguage={filterLang}
			/>
		</div>
	{/if}
	<span class="total-results">{description}</span>

	<div class="project-list">
		{#each projects as project}
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
