<script lang="ts">
	import { ICON_COLORS } from '$lib/constants';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { IconColor, RepoWithMetaData } from '$lib/types';
	import { getRandomArrayItem } from '$lib/util';
	import ProjectCategories from './ProjectCategories.svelte';
	import ProjectLanguages from './ProjectLanguages.svelte';

	export let project: RepoWithMetaData;
	const otherLangsTitle = 'Other Languages/Technologies Used:';

	$: categories = project?.categories || [];
	$: categoryColors = categories.map((c) => getFilterSettingDetails(c).color);

	const getRandomIconColor = () =>
		getRandomArrayItem<IconColor>(
			ICON_COLORS.filter((icon) => icon !== 'default'),
			'blue',
		);

	function getAllLanguageListTitleColor() {
		let titleColor: IconColor;
		const verbotenColors = [...categoryColors, 'red', 'dark-blue'];
		do {
			titleColor = getRandomIconColor();
		} while (verbotenColors.some((color) => color.includes(titleColor)));
		return titleColor;
	}
</script>

{#if project}
	<div class="project-card-details">
		<div class="details-top">
			<h2 class="project-name">{project.name}</h2>
			<ProjectCategories {project} />
			<p class="project-description">{project.description}</p>
		</div>
		<div class="details-bottom">
			{#if project?.languages?.length}
				<div class="language-list-wrapper">
					<span class="all-langage-list-title {getAllLanguageListTitleColor()}">{otherLangsTitle}</span>
					<ProjectLanguages {project} />
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
