<script lang="ts">
	import { SITE_URL } from '$lib/siteConfig';
	import type { RepoWithMetaData } from '$lib/types';
	import GithubStats from './GithubStats.svelte';
	import ProjectCategories from './ProjectCategories.svelte';
	import ProjectLanguages from './ProjectLanguages.svelte';

	export let project: RepoWithMetaData;

	$: projectImage = `${SITE_URL}/images/projects/${project.name}.jpg`;
	$: projectUrl = `/projects/${project.name}`;
</script>

<div class="project-summary-wrapper">
	<a href={projectUrl} class="project-image">
		<img src={projectImage} alt="" />
	</a>
	<a href={projectUrl} class="project-summary">
		<div class="top">
			<div class="name-and-stats">
				<h3 class="project-name">{project.name}</h3>
				<div class="github-stats-wrapper">
					<GithubStats {project} iconSize={'13px'} />
				</div>
			</div>
			<ProjectCategories {project} />
		</div>
		<p class="project-description">{project.description}</p>
		<div class="language-list">
			<ProjectLanguages {project} />
		</div>
	</a>
</div>

<style lang="postcss">
	:global(.featured-projects) + .project-summary-wrapper {
		margin: 0 0 0.75rem 0;
	}

	.project-summary-wrapper {
		display: flex;
		gap: 2rem;
		margin: 0.75rem 0;
	}
	.project-image {
		display: none;
	}
	img {
		margin: 0;
		border: 1px solid var(--dark-gray);
	}
	.project-summary {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 1rem;

		border-width: 2px;
		border-style: solid;
		border-color: var(--dark-gray);
	}
	.project-summary:hover {
		border-color: var(--link-color);
	}
	.project-image,
	.project-image:hover,
	.project-summary,
	.project-summary:hover {
		background-color: inherit;
	}
	.top {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
	}
	.name-and-stats {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.project-name {
		color: var(--tw-prose-headings);
		line-height: 1;
		margin: 0 0 0.25rem 0;
	}
	h3 {
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
		letter-spacing: 0.8px;
		line-height: 1.4;
		font-weight: 400;
		margin: 0.5rem 0;
	}
	.github-stats-wrapper {
		display: none;
	}
	.project-description {
		flex: 1;
		color: var(--tw-prose-invert-body);
		font-size: 0.8rem;
		letter-spacing: 0.75px;
		line-height: 1.5;
		max-width: 40rem;
		margin: 0.25rem 0 0 0;
	}

	@media (min-width: 640px) {
		.project-summary-wrapper {
			margin: 0;
			padding: 1rem;
			border-width: 2px;
			border-style: solid;
			border-color: var(--dark-gray);
			background-color: var(--black);
		}
		.project-summary-wrapper:hover {
			border-color: var(--link-color);
		}
		.project-image {
			display: block;
			height: 175px;
			width: 225px;
			border: 1px solid var(--dark-gray);
		}
		.project-summary {
			padding: 0;
		}
		.project-summary,
		.project-summary:hover {
			border: none;
		}

		.github-stats-wrapper {
			display: block;
		}
	}
</style>
