<script lang="ts">
	import GithubStats from '$lib/components/ProjectCard/GithubStats.svelte';
	import ProjectCardLink from '$lib/components/ProjectCard/ProjectCardLink.svelte';
	import ProjectDetails from '$lib/components/ProjectCard/ProjectDetails.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';
	import type { RepoWithMetaData } from '$lib/types';

	export let project: RepoWithMetaData;

	$: projectUrl = `/projects/${project.name}`;
</script>

<a href={projectUrl} class="project-card">
	<div class="lang-stats-wrapper">
		<FilterSettingWithIcon value={project.primaryLanguage} />
		<GithubStats {project} />
	</div>
	<ProjectDetails {project} />
	<ProjectCardLink />
</a>

<style lang="postcss">
	.lang-stats-wrapper {
		display: flex;
		justify-content: space-between;

		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	.project-card:hover {
		color: var(--body-text);
		border-color: var(--link-color);
	}
	.project-card {
		display: grid;
		grid-template-columns: 2rem 1fr auto 48px;
		grid-template-rows: 1.5rem calc(48px - 2.5rem) 1rem 1fr 1.5rem;
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
