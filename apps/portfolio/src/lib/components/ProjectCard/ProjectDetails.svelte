<script lang="ts">
	import ProjectCategory from '$lib/components/ProjectCard/ProjectCategory.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';
	import type { RepoWithMetaData } from '$lib/types';

	export let project: RepoWithMetaData;
	const otherLangsTitle = 'Other Languages/Technologies Used:';

	$: categories = project?.categories || [];
	$: languages = project?.languages || [];
</script>

{#if project}
	<div class="project-card-details">
		<div class="details-top">
			<h2 class="project-name">{project.name}</h2>
			<div class="category-list">
				{#each categories as category}
					{#if !['frontend', 'backend'].includes(category)}
						<ProjectCategory {category} />
					{/if}
				{/each}
			</div>
			<p class="project-description">{project.description}</p>
		</div>
		<div class="details-bottom">
			{#if languages.length > 0}
				<div class="language-list-wrapper">
					<span class="all-langage-list-title green">{otherLangsTitle}</span>
					<div class="all-language-list">
						{#each languages as language}
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
		grid-row: 4 / span 1;
	}

	.details-top,
	.details-bottom {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 100%;
	}

	.project-name {
		line-height: 1;
	}

	h2 {
		font-size: 1.4rem;
		letter-spacing: 0.8px;
		line-height: 1.4;
		font-weight: 400;
		margin: 0.5rem 0;
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
		gap: 0.5rem;
	}

	.all-langage-list-title {
		font-size: 0.9rem;
		font-style: italic;
	}

	.category-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
		gap: 0.75rem;
	}

	.all-language-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
		gap: 0.25rem;
	}

	.all-language-list :global(.filter-setting) {
		margin: 0.5rem 1rem 0 0;
	}

	@media screen and (min-width: 640px) {
		h2 {
			font-size: 1.5rem;
		}
	}

	@media screen and (min-width: 768px) {
		h2 {
			font-size: 1.75rem;
		}
		.project-description {
			font-size: 1rem;
		}
	}
</style>
