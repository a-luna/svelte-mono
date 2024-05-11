<script lang="ts">
	import ProjectSummary from '$lib/components/ProjectCard/ProjectSummary.svelte';
	import { userRepos } from '$lib/stores';
	import { isFeaturedProject } from '$lib/typeguards';
	import type { RepoWithMetaData } from '$lib/types';

	let featuredProjects: RepoWithMetaData[] = [];

	$: featuredProjects = $userRepos.repos.filter((project) => isFeaturedProject(project.name));
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
		gap: 0rem;
		margin: 0;
	}

	.featured-projects :global(.project-name) {
		font-size: 1.25rem;
	}

	.featured-projects :global(.project-description) {
		font-size: 0.8rem;
	}

	.featured-projects :global(div.language-list .filter-value) {
		font-size: 0.75rem;
	}

	@media (min-width: 640px) {
		.featured-projects {
			gap: 2rem;
			margin: 1.5rem 0 0 0;
		}

		.featured-projects :global(.project-name) {
			font-size: 1.4rem;
		}

		.featured-projects :global(.project-description) {
			font-size: 0.9rem;
		}

		.featured-projects :global(div.language-list .filter-value) {
			font-size: 0.8rem;
		}
	}
</style>
