<script lang="ts">
	import ProjectLanguages from '$lib/components/ProjectCard/ProjectLanguages.svelte';
	import type { RepoWithMetaData } from '$lib/types';
	import { formatDistance } from 'date-fns';
	import ProjectCategories from './ProjectCategories.svelte';

	export let project: RepoWithMetaData;

	$: lastUpdated = formatDistance(new Date(project?.updatedAt), new Date(), { addSuffix: true });
</script>

{#if project}
	<div class="project-card-details">
		<div class="details-top">
			<h2 class="project-name">{project.name}</h2>
			<p class="last-updated">last updated {lastUpdated}</p>
			<ProjectCategories {project} />
		</div>
		<p class="project-description">{project.description}</p>
		{#if project?.languages?.length}
			<div class="language-list">
				<ProjectLanguages {project} />
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.project-card-details {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		justify-items: start;
		align-items: flex-start;
		gap: 1.25rem;

		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}

	.details-top {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
	}

	.project-name,
	.last-updated {
		line-height: 1;
	}

	.last-updated {
		color: var(--gray);
		font-size: 0.8rem;
	}

	.details-top :global(.category-list) {
		margin: 3px 0 0 0;
	}

	h2 {
		font-size: 1.4rem;
		letter-spacing: 0.8px;
		line-height: 1.4;
		font-weight: 400;
		margin: 0;
	}

	.project-description {
		font-size: 0.9rem;
		font-weight: 400;
		letter-spacing: 0.75px;
		line-height: 1.5;
		max-width: 40rem;
		color: var(--tw-prose-invert-body);
		margin: 0;
	}

	@media screen and (min-width: 640px) {
		.details-top {
			gap: 1rem;
		}
		h2 {
			font-size: 1.5rem;
		}
	}

	@media screen and (min-width: 768px) {
		.project-card-details {
			gap: 1.5rem;
		}
		h2 {
			font-size: 1.75rem;
		}
		.last-updated {
			font-size: 0.9rem;
		}
		.project-description {
			font-size: 1rem;
		}
	}
</style>
