<script lang="ts">
	import { dev } from '$app/environment';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import PostNav from '$lib/components/PostNav.svelte';
	import TableOfContents from '$lib/components/TableOfContents/TableOfContents.svelte';
	import type { BlogPost } from '$lib/types';
	import { sortByDate } from '$lib/util';
	import Giscus from '@giscus/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let blogPost: BlogPost;

	$: blogPost = data.blogPost;
	$: navItems = sortByDate(data.allPosts, { key: 'date' }).map(({ slug, title }, i) => ({
		slug,
		title,
		titleCompact: title,
		weight: i,
	}));
</script>

<ContentLayout content={blogPost} contentType={'blog'}>
	<svelte:fragment slot="toc">
		{#if blogPost.hasToc && blogPost.toc}
			<TableOfContents toc={blogPost.toc} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="content">
		{@html blogPost?.content}
	</svelte:fragment>
	<svelte:fragment slot="content_item_nav">
		<PostNav {navItems} slug={blogPost.slug} />
	</svelte:fragment>
	<svelte:fragment slot="comments">
		{#if !dev}
			<Giscus
				repo="a-luna/svelte-mono"
				repoId="R_kgDOJRXMQw"
				category="Giscus"
				categoryId="DIC_kwDOJRXMQ84CYIYD"
				mapping="og:title"
				strict="1"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="transparent_dark"
				lang="en"
				loading="lazy"
			/>
		{/if}
	</svelte:fragment>
</ContentLayout>
