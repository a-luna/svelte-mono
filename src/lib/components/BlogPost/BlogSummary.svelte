<script lang="ts">
	import type { LanguageOrTech, ProjectCategory as ProjectCategoryType } from '$lib/types';
	import { formatDateString } from '$lib/util';
	import ProjectCategory from '$lib/components/ProjectCard/ProjectCategory.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';

	export let href = '/';
	export let title = 'Untitled post';
	export let publishDate: Date = new Date(0);
	export let categories: ProjectCategoryType[] = [];
	export let language: LanguageOrTech = 'allLanguages';
</script>

<div class="blog-summary">
	<div class="blog-summary-top">
		<div class="published">{formatDateString(publishDate)}</div>
		{#if language}
			<FilterSettingWithIcon value={language} />
		{/if}
	</div>
	<a {href} class="post-title"><h4>{title}</h4></a>
	<div class="tags">
		{#each categories as category}
			<ProjectCategory {category} />
		{/each}
	</div>
	<p class="description"><slot /></p>
</div>

<style lang="postcss">
	.blog-summary {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		border-width: 2px;
		border-style: solid;
		border-color: var(--dark-gray);
		color: var(--white);
		background-color: var(--black);
		padding: 1.5rem;
	}

	.blog-summary:hover {
		border-color: var(--accent-color);
	}

	.blog-summary-top {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.post-title,
	.post-title:hover {
		font-size: 1.5rem;
		font-weight: 400;
		color: var(--accent-color);
		text-decoration: none;
		line-height: 1.3;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}

	.published {
		font-size: 1rem;
		color: var(--white);
	}

	.description {
		font-size: 0.9rem;
		color: var(--white-shade5);
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-flow: row wrap;
		gap: 0.5rem;
		font-size: 0.9rem;
		align-items: center;
	}

	@media (min-width: 768px) {
		.blog-summary {
			padding: 1.5rem;
		}
		.post-title,
		.post-title:hover {
			font-size: 1.6rem;
		}
		.description {
			font-size: 1rem;
		}
	}
</style>
