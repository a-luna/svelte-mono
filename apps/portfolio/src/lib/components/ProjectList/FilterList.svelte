<script lang="ts">
	import ProjectFilter from '$lib/components/ProjectList/ProjectFilter/ProjectFilter.svelte';
	import type { LanguageOrTech, ProjectCategory, ProjectType } from '$lib/types';

	export let projectTypes: ProjectType[];
	export let categories: ProjectCategory[];
	export let languages: LanguageOrTech[];
	export let filterProjectType: ProjectType;
	export let filterCategory: ProjectCategory;
	export let filterLanguage: LanguageOrTech;
</script>

<ProjectFilter
	bind:selectedValue={filterProjectType}
	id={'radio-type'}
	title={'Filter By Project Type'}
	filterGroup={'icon'}
	filterSettings={projectTypes}
	noFilterSetting={'allProjects'}
/>
<ProjectFilter
	bind:selectedValue={filterCategory}
	id={'radio-category'}
	title={'Filter By Category'}
	filterGroup={'no-icon'}
	filterSettings={categories}
	noFilterSetting={'allCategories'}
/>
<ProjectFilter
	bind:selectedValue={filterLanguage}
	id={'radio-language'}
	title={'Filter By Language/Tech'}
	filterGroup={'icon'}
	filterSettings={languages}
	noFilterSetting={'allLanguages'}
/>
