<script lang="ts">
	import ProjectCategory from '$lib/components/ProjectCard/ProjectCategory.svelte';
	import type { RepoWithMetaData } from '$lib/types';

	export let project: RepoWithMetaData;

	$: categories = project?.categories || [];
</script>

<div class="category-list">
	{#each categories as category}
		{#if !['frontend', 'backend'].includes(category)}
			<ProjectCategory {category} />
		{/if}
	{/each}
</div>

<style lang="postcss">
	.category-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.85rem;
		gap: 0.75rem;
	}
</style>
