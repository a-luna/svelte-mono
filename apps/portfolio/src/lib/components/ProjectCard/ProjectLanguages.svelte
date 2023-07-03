<script lang="ts">
	import type { RepoWithMetaData } from '$lib/types';
	import FilterSettingWithIcon from '../ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';

	export let project: RepoWithMetaData;
	export let showPrimaryLang = false;

	$: languages = showPrimaryLang ? [project.primaryLanguage, ...(project?.languages || [])] : project?.languages || [];
</script>

{#if languages.length > 0}
	<div class="all-language-list">
		{#each languages as language}
			<FilterSettingWithIcon value={language} />
		{/each}
	</div>
{/if}

<style lang="postcss">
	.all-language-list {
		display: flex;
		flex-flow: row wrap;
		font-size: 0.8rem;
		gap: 0.25rem;
	}

	.all-language-list :global(.filter-setting) {
		margin: 0.5rem 1rem 0 0;
	}

	.all-language-list :global(.filter-value) {
		font-size: 0.9rem;
		color: var(--white-shade5);
	}
</style>
