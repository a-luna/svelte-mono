<script lang="ts">
	import PreviewImage from '$lib/components/BlogPost/PreviewImage.svelte';
	import ProjectCategory from '$lib/components/ProjectCard/ProjectCategory.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';
	import type { LanguageOrTech, ProjectCategory as ProjectCategoryType } from '$lib/types';
	import { formatDateString } from '$lib/util';

	export let slug = '';
	export let href = '/';
	export let title = 'Untitled post';
	export let publishDate: Date = new Date(0);
	export let categories: ProjectCategoryType[] = [];
	export let language: LanguageOrTech = 'allLanguages';
	let pageWidth: number;

	$: mobileDisplay = pageWidth < 640;
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="blog-summary">
	<div class="summary-top">
		<div class="top-left">
			<div class="image">
				<a {href}><PreviewImage {slug} /></a>
			</div>
		</div>
		<div class="top-right">
			<div class="top-right-wrapper">
				<div class="top-right-row">
					{#if language}
						<FilterSettingWithIcon value={language} />
					{/if}
					<div class="published">{formatDateString(publishDate)}</div>
				</div>
				<a {href} class="post-title"><h4>{title}</h4></a>
			</div>
			{#if !mobileDisplay}
				<div class="tags">
					{#each categories as category}
						<ProjectCategory {category} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
	{#if mobileDisplay}
		<div class="tags">
			{#each categories as category}
				<ProjectCategory {category} />
			{/each}
		</div>
	{/if}
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

	.summary-top {
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
	}

	.image {
		height: 150px;
		width: 100%;
		background-color: var(--black-tint2);
	}

	.image :global(img) {
		height: 100%;
		margin: 0;
	}

	.top-right {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1rem;
	}

	.blog-summary :global(.filter-value) {
		color: var(--gray);
	}

	.blog-summary:hover {
		border-color: var(--link-color);
	}

	.top-right-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
	}

	.top-right-row {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		gap: 0.75rem;
		line-height: 1;
	}

	h4 {
		color: inherit;
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		margin: 0;
		line-height: 1.3;
	}

	.post-title,
	.post-title:hover {
		font-size: 1.3rem;
		font-weight: 400;
		color: var(--link-color);
		background-color: var(--black);
		text-decoration: none;
		line-height: 1.3;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}

	.published {
		font-size: 1rem;
		color: var(--gray);
	}

	.description {
		font-size: 0.9rem;
		color: var(--gray);
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-flow: row wrap;
		gap: 0.5rem;
		font-size: 0.9rem;
		align-items: center;
	}

	@media (min-width: 640px) {
		.top-left {
			flex: 0 1 150px;
		}
		.top-right {
			flex: 1;
		}
		.image {
			height: 150px;
			width: 150px;
		}
		.summary-top {
			flex-flow: row nowrap;
		}
	}

	@media (min-width: 768px) {
		.blog-summary {
			padding: 1.5rem;
		}
		.post-title,
		.post-title:hover {
			font-size: 1.5rem;
		}
		.description {
			font-size: 0.95rem;
		}
	}

	@media (min-width: 400px) {
		.top-right-row {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
		}
	}
</style>
