<script lang="ts">
	import ProjectCategories from '$lib/components/ProjectCard/ProjectCategories.svelte';
	import ProjectLanguages from '$lib/components/ProjectCard/ProjectLanguages.svelte';
	import { ICON_COLORS } from '$lib/constants';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { IconColor, RepoWithMetaData } from '$lib/types';
	import { getRandomArrayItem } from '$lib/util';
	import { formatDistance } from 'date-fns';

	export let project: RepoWithMetaData;
	const otherLangsTitle = 'Other Languages/Technologies Used:';

	$: categories = project?.categories || [];
	$: categoryColors = categories.map((c) => getFilterSettingDetails(c).color);
	$: lastUpdated = formatDistance(new Date(project?.updatedAt), new Date(), { addSuffix: true });

	function getAllLanguageListTitleColor() {
		let titleColor: IconColor;
		const verbotenColors = [...categoryColors, 'red', 'dark-blue', 'purple'];
		do {
			titleColor = getRandomArrayItem<IconColor>(
				ICON_COLORS.filter((icon) => icon !== 'default'),
				'blue',
			);
		} while (verbotenColors.some((color) => color?.includes(titleColor)));
		return titleColor ?? 'blue';
	}
</script>

{#if project}
	<div class="project-card-details">
		<div class="details-top">
			<h2 class="project-name">{project.name}</h2>
			<p class="last-updated">last updated {lastUpdated}</p>
		</div>
		<ProjectCategories {project} />
		<p class="project-description">{project.description}</p>
		{#if project?.languages?.length}
			<div class="language-list">
				<span class="langage-list-title {getAllLanguageListTitleColor()}">{otherLangsTitle}</span>
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
		gap: 1.5rem;

		grid-column: 2 / span 1;
		grid-row: 4 / span 1;
	}

	.details-top {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}

	.project-name,
	.last-updated {
		line-height: 1;
	}

	.last-updated {
		color: var(--gray);
		font-size: 0.8rem;
		font-weight: 300;
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
		font-weight: 300;
		letter-spacing: 0.75px;
		line-height: 1.5;
		max-width: 40rem;
		color: var(--gray);
		margin: 0;
	}

	.langage-list-title {
		font-size: 0.9rem;
		font-style: italic;
	}

	.langage-list {
		font-size: 0.8rem;
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
		.last-updated {
			font-size: 0.9rem;
		}
		.project-description {
			font-size: 1rem;
		}
	}
</style>
