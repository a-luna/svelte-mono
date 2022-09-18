<script lang="ts">
	import GithubStats from '$lib/components/ProjectCard/GithubStats.svelte';
	import ProjectCategory from '$lib/components/ProjectCard/ProjectCategory.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';
	import type { RepoWithMetaData } from '$lib/types';

	export let project: RepoWithMetaData;
	const otherLangsTitle = 'Other Languages/Technologies Used:';
</script>

{#if project}
	<div class="project-card-details">
		<div class="details-top">
			<div class="lang-stats-wrapper">
				<FilterSettingWithIcon value={project.primaryLanguage} />
				<GithubStats {project} />
			</div>
			<h2 class="project-name">{project.name}</h2>
			<div class="category-list">
				{#each project.categories as category}
					{#if !['frontend', 'backend'].includes(category)}
						<ProjectCategory {category} />
					{/if}
				{/each}
			</div>
			<p class="project-description">{project.description}</p>
		</div>
		<div class="details-bottom">
			{#if project.languages.length > 0}
				<div class="language-list-wrapper">
					<span class="all-langage-list-title">{otherLangsTitle}</span>
					<div class="all-language-list">
						{#each project.languages as language}
							<FilterSettingWithIcon value={language} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.project-card-details {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		justify-items: start;
		align-items: flex-start;
		gap: 1rem;

		grid-column: 2 / span 1;
		grid-row: 2 / span 2;
	}

	.details-top,
	.details-bottom {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
		width: 100%;
	}

	.lang-stats-wrapper {
		display: flex;
		justify-content: space-between;
	}

	h2 {
		font-size: 1.75rem;
		letter-spacing: 0.8px;
		line-height: 1.4;
		font-weight: 400;
	}

	.project-description {
		font-size: 0.9rem;
		letter-spacing: 0.75px;
		line-height: 1.5;
		max-width: 40rem;
		color: var(--white-shade5);
		margin: 0;
	}

	.language-list-wrapper {
		display: flex;
		flex-flow: column nowrap;
		line-height: 1;
		gap: 0.3rem;
		margin: 1rem 0 0 0;
	}

	.all-langage-list-title {
		font-size: 0.85rem;
		font-style: italic;
		color: var(--accent-color);
	}

	.category-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
		gap: 0.5rem;
		margin: 0.25rem 0;
	}

	.all-language-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
	}

	.all-language-list :global(.filter-setting) {
		margin: 0.5rem 1rem 0 0;
	}

	@media screen and (min-width: 768px) {
		h2 {
			font-size: 1.75rem;
		}
		.project-description {
			font-size: 0.9rem;
		}
	}
</style>
