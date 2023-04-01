<script lang="ts">
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import TableOfContents from '$lib/components/TableOfContents/TableOfContents.svelte';
	import type { ProjectReadme } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let project: ProjectReadme;

	$: project = data.readme;
</script>

<ContentLayout content={project} contentType={'readme'}>
	{#if project.hasToc && project.toc}
		<TableOfContents toc={project.toc} />
	{/if}
	{@html project?.content}
</ContentLayout>
