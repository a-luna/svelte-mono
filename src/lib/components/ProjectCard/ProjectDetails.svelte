<script lang="ts">
	import type { RepoWithMetaData } from '$lib/types';
	import FilterSettingWithIcon from '../ProjectList/FilterControls/FilterSettingWithIcon.svelte';
	import ProjectCategory from './ProjectCategory.svelte';

	export let project: RepoWithMetaData;
	const otherLangsTitle = 'Other Languages/Technologies Used:';
</script>

{#if project}
	<div class="project-card-details">
		<div class="details-top">
			<FilterSettingWithIcon value={project.primaryLanguage} />
			<h2 class="project-name">{project.name}</h2>
			<div class="all-category-list">
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
		gap: 0.25rem;
		margin: 1rem 0 0 0;
	}

	.all-langage-list-title {
		font-size: 0.85rem;
		font-style: italic;
		color: var(--white-shade5);
	}

	.all-category-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
		gap: 0.5rem;
	}

	.all-language-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
	}

	.all-language-list :global(.filter-setting) {
		margin: 0.5rem 1rem 0 0;
	}

	@media screen and (min-width: 767px) {
		h2 {
			font-size: 1.75rem;
		}
		.project-description {
			font-size: 0.9rem;
		}
	}
</style>
