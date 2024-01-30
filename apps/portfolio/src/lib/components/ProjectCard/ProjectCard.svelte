<script lang="ts">
	import ProjectCardLink from '$lib/components/ProjectCard/ProjectCardLink.svelte';
	import ProjectDetails from '$lib/components/ProjectCard/ProjectDetails.svelte';
	import type { RepoWithMetaData } from '$lib/types';

	export let project: RepoWithMetaData;

	$: projectUrl = `/projects/${project.name}`;
</script>

<a href={projectUrl} class="project-card">
	<ProjectDetails {project} />
	<ProjectCardLink />
</a>

<style lang="postcss">
	.project-card:hover {
		color: var(--body-text);
		border-color: var(--link-color);
	}
	.project-card {
		display: grid;
		grid-template-columns: 1.5rem 1fr 48px;
		grid-template-rows: 1.5rem 1fr 1.5rem;
		align-content: flex-start;

		width: 100%;
		height: 100%;
		border-width: 2px;
		border-style: solid;
		border-color: var(--project-card-border-color);
		color: var(--white);
		background-color: var(--black);
		text-decoration: none;
		line-height: 1;
	}
</style>
