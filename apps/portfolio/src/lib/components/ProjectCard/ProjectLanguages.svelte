<script lang="ts">
	import type { RepoWithMetaData } from '$lib/types';
	import FilterSettingWithIcon from '../ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';

	export let project: RepoWithMetaData;
	export let showPrimaryLang = false;

	$: languages = showPrimaryLang ? [project.primaryLanguage, ...(project?.languages || [])] : project?.languages || [];
</script>

{#if languages.length > 0}
	{#each languages as language}
		<FilterSettingWithIcon value={language} />
	{/each}
{/if}

<style lang="postcss">
</style>
