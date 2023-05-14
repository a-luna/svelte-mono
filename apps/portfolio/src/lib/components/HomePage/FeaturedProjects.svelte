<script lang="ts">
	import { browser } from '$app/environment';
	import { FEATURED_PROJECTS } from '$lib/constants';
	import { userRepos } from '$lib/stores';
	import type { RepoWithMetaData } from '$lib/types';
	import ProjectSummary from '../ProjectCard/ProjectSummary.svelte';

	let featuredProjects: RepoWithMetaData[] = [];

	$: if (browser && Object.keys(userRepos).length)
		featuredProjects = $userRepos.repos.filter((project) => FEATURED_PROJECTS.includes(project.name));
</script>

<div>
	<h2 class="underline--magical">Featured Projects</h2>
	<div class="featured-projects">
		{#each featuredProjects as project}
			<ProjectSummary {project} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.featured-projects {
		display: flex;
		flex-flow: column nowrap;
		gap: 3rem;
		margin: 0;
	}
</style>
