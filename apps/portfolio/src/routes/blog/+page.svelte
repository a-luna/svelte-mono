<script lang="ts">
	import BlogSummary from '$lib/components/BlogPost/BlogSummary.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { SITE_TITLE } from '$lib/siteConfig';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let mounted = false;

	onMount(() => (mounted = true));
</script>

<svelte:head>
	<title>Blog | {SITE_TITLE}</title>
	<meta name="description" content={`Latest Blog Posts`} />
</svelte:head>

{#if mounted}
	<SectionLayout section={'blog'}>
		<section class="article-list">
			{#if data.allBlogPosts.length}
				<ul>
					{#each data.allBlogPosts as item}
						<BlogSummary
							slug={item.slug}
							href={item.href}
							title={item.title}
							publishDate={new Date(item.date)}
							categories={item.categories}
							language={item.language || 'allLanguages'}
						>
							{item.description}
						</BlogSummary>
					{/each}
				</ul>
			{/if}
		</section>
	</SectionLayout>
{/if}

<style lang="postcss">
	section {
		display: flex;
		flex-flow: column nowrap;
		margin: 0 auto 4rem auto;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
	}
	ul {
		list-style: none;
		padding: 0;
	}
</style>
