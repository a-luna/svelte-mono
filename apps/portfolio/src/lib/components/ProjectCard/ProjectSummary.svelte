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
				<GithubStats {project} iconSize={'13px'} />
			</div>
			<ProjectCategories {project} />
		</div>
		<p class="project-description">{project.description}</p>
		<ProjectLanguages {project} showPrimaryLang={true} />
	</a>
</div>

<style lang="postcss">
	.project-summary-wrapper {
		display: flex;
		gap: 2rem;
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
		border-color: hsl(76 100% 50%);
		border-color: oklch(92.22% 0.244 126.84);
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
		line-height: 1;
		margin: 0 0 0.25rem 0;
	}
	h3 {
		font-size: 1.15rem;
		letter-spacing: 0.8px;
		line-height: 1.4;
		font-weight: 400;
		margin: 0.5rem 0;
	}
	.project-description {
		flex: 1;
		font-size: 0.85rem;
		letter-spacing: 0.75px;
		line-height: 1.5;
		max-width: 40rem;
		color: var(--white-shade5);
		margin: 0.25rem 0 0 0;
	}
	.project-name,
	.project-description {
		color: var(--white-shade2);
	}

	@media (min-width: 640px) {
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
	}
</style>
