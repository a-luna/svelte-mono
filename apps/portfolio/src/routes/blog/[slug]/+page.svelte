<script lang="ts">
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import TableOfContents from '$lib/components/TableOfContents/TableOfContents.svelte';
	import type { BlogPost } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let blogPost: BlogPost;

	$: blogPost = data.blogPost;
</script>

<ContentLayout content={blogPost} contentType={'blog'}>
	{#if blogPost.hasToc && blogPost.toc}
		<TableOfContents toc={blogPost.toc} />
	{/if}
	{@html blogPost?.content}
</ContentLayout>
