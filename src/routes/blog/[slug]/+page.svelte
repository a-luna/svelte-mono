<script lang="ts">
	import Comments from '$lib/components/Comments.svelte';
	import Reactions from '$lib/components/Reactions.svelte';
	import { GH_USER, MY_TWITTER_HANDLE, SITE_URL } from '$lib/siteConfig';
	import type { PageData } from './$types';

	export let data: PageData;

	$: blogPost = data.blogPost;
</script>

<svelte:head>
	<title>{blogPost?.title}</title>
	<meta name="description" content="swyxkit blog" />

	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={blogPost?.title} />
	<meta name="Description" content={blogPost?.description} />
	<meta property="og:description" content={blogPost?.description} />
	<meta name="twitter:card" content={blogPost?.image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={blogPost?.title} />
	<meta name="twitter:description" content={blogPost?.description} />
	{#if blogPost?.image}
		<meta property="og:image" content={blogPost.image} />
		<meta name="twitter:image" content={blogPost.image} />
	{/if}
</svelte:head>

<article
	class="mx-auto mb-16 mt-8 flex w-full max-w-2xl flex-col items-start justify-center px-4 sm:px-8"
>
	<h1 class="tracking-tightmmd:text-5xl mb-8 text-3xl font-bold ">
		{blogPost?.title}
	</h1>
	<div class="bg mt-2 flex w-full justify-between sm:flex-row sm:items-center">
		<p class="flex items-center text-sm">{GH_USER}</p>
		<p class="min-w-32 flex items-center text-sm text-gray-600 dark:text-gray-400 md:mt-0">
			{#if blogPost?.ghMetadata?.issueUrl}
				<a href={blogPost.ghMetadata.issueUrl} rel="external" class="no-underline" target="_blank">
					<span class="mr-4 font-mono text-xs text-gray-700 text-opacity-70 dark:text-gray-300"
						>{blogPost.ghMetadata?.reactions?.total_count} reactions</span
					>
				</a>
			{/if}
			{blogPost?.date}
		</p>
	</div>
	<div class="gradient -mx-4 my-2 flex h-1 w-[100vw] sm:mx-0 sm:w-full" />

	<div class="prose prose-invert my-8 w-full max-w-none prose-strong:text-current">
		{@html blogPost?.content}
	</div>
</article>
<div class="mx-auto max-w-2xl">
	<div class="prose mb-12 border-t border-b border-blue-800 p-4 dark:prose-invert">
		{#if blogPost?.ghMetadata?.reactions?.total_count > 0}
			Reactions: <Reactions
				issueUrl={blogPost.ghMetadata?.issueUrl}
				reactions={blogPost.ghMetadata?.reactions}
			/>
		{:else}
			<a href={blogPost?.ghMetadata?.issueUrl}>Leave a reaction </a>
			if you liked this post! 🧡
		{/if}
	</div>
	<div class="mb-8">
		<Comments ghMetadata={blogPost?.ghMetadata} />
	</div>
</div>
