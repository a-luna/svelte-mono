<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting, FilterSettingDetails, RepoWithMetaData } from '$lib/types';

	export let projects: RepoWithMetaData[] = [];
	export let filterApplied: boolean;
	export let filterCategory: FilterSetting;
	export let filterLanguage: FilterSetting;

	$: language = getFilterSettingDetails(filterLanguage);
	$: category = getFilterSettingDetails(filterCategory);

	const getFilterResults = (
		filtered: RepoWithMetaData[],
		lang: FilterSettingDetails,
		cat: FilterSettingDetails
	): string =>
		filterApplied
			? `${getTotalFiltered(filtered)} (${getCurrentFilterSetting(lang, cat)})`
			: getTotalFiltered(filtered);

	const getTotalFiltered = (filtered: RepoWithMetaData[]): string =>
		`${filtered.length} total ${filtered.length > 1 ? 'projects' : 'project'}`;

	function getCurrentFilterSetting(lang: FilterSettingDetails, cat: FilterSettingDetails) {
		if (!filterApplied) {
			return 'No filter applied';
		}
		const langSetting = filterLanguage === 'allLanguages' ? null : `Language = ${lang.displayName}`;
		const catSetting = filterCategory === 'allProjects' ? null : `Category = ${cat.displayName}`;
		const settings = [langSetting, catSetting].filter((s) => s !== null).join(', ');
		return `Filter by: ${settings}`;
	}
</script>

{#if projects.length}
	<div class="filter-results">{getFilterResults(projects, language, category)}</div>
	<div class="project-list">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
{:else}
	<div class="zero-results">None of my projects match the current filter settings!</div>
{/if}

<style lang="postcss">
	.project-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		gap: 2rem;
	}

	.filter-results,
	.zero-results {
		font-size: 1.2rem;
	}

	.filter-results {
		color: var(--white);
	}

	.zero-results {
		color: var(--pink-icon);
		margin: 0 auto;
	}

	@media (min-width: 767px) {
		.project-list {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
