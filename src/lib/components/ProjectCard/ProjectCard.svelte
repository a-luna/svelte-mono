<script lang="ts">
	import type { RepoWithMetaData } from '$lib/types';
	import ProjectCardLink from './ProjectCardLink.svelte';
	import ProjectDetails from './ProjectDetails.svelte';

	export let project: RepoWithMetaData;
</script>

<a href={project?.repoUrl} class="project-card">
	<ProjectDetails {project} />
	<ProjectCardLink />
</a>

<style lang="postcss">
	.project-card:hover {
		border-color: var(--accent-color);
	}
	.project-card {
		display: grid;
		grid-template-columns: 2rem 1fr auto 48px;
		grid-template-rows: 2rem calc(48px - 2rem) 1fr 2rem;
		align-content: flex-start;

		width: 100%;
		height: 100%;
		border: 2px solid var(--black-tint3);
		color: var(--white);
		background-color: var(--black-tint1);
		text-decoration: none;
		line-height: 1;
	}
</style>
