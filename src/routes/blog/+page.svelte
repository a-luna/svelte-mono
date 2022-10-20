<script lang="ts">
	import { browser } from '$app/environment';
	import BlogSummary from '$lib/components/BlogPost/BlogSummary.svelte';
	import { SITE_TITLE } from '$lib/siteConfig';
	import { blogPosts } from '$lib/stores';
	import type { BlogPost } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	$: allBlogPosts = data.allBlogPosts;

	$: if (browser && Object.keys(allBlogPosts).length) $blogPosts = allBlogPosts;
	let list: BlogPost[];

	let inputEl: HTMLInputElement;
	function focusSearch(e: KeyboardEvent) {
		if (e.key === '/' && inputEl) inputEl.select();
	}

	let isTruncated = $blogPosts.length > 20;
	let search: string;
	$: list = $blogPosts
		.filter((item) => {
			if (search) {
				return item.title.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		})
		.slice(0, isTruncated ? 2 : $blogPosts.length);
</script>

<svelte:head>
	<title>{SITE_TITLE} Blog Index</title>
	<meta name="description" content={`Latest ${SITE_TITLE} posts`} />
</svelte:head>

<svelte:window on:keyup={focusSearch} />

<section class="portfolio">
	<h1>Blog</h1>
	<p class="search-desc">Use the search below to filter by title.</p>
	<div class="input-wrapper">
		<input
			aria-label="Search articles"
			type="text"
			bind:value={search}
			bind:this={inputEl}
			placeholder="Hit / to search"
		/><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></svg
		>
	</div>
	{#if !search}
		<h3>All Posts</h3>
	{/if}
	{#if list.length}
		<ul class="">
			{#each list as item}
				<li>
					<BlogSummary
						slug={item.slug}
						title={item.title}
						publishDate={new Date(item.date)}
						ghMetadata={item.ghMetadata}
					>
						{item.description}
					</BlogSummary>
				</li>
			{/each}
		</ul>
		{#if isTruncated}
			<div class="button-wrapper">
				<button on:click={() => (isTruncated = false)} class="load-more-button">
					Load More Posts...
				</button>
			</div>
		{/if}
	{:else if search}
		<div class="prose dark:prose-invert">
			No posts found for
			<code>{search}</code>.
		</div>
		<button class="bg-slate-500 p-2" on:click={() => (search = '')}>Clear your search</button>
	{:else}
		<div class="prose dark:prose-invert">No blogposts found!</div>
	{/if}
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-flow: column nowrap;
		padding: 0 1rem;
		margin: 2rem auto 4rem auto;
		justify-content: center;
		align-items: flex-start;
		max-width: 42rem;
	}
	h1 {
		margin: 0 0 1rem 0;
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-weight: 700;
		letter-spacing: -0.025em;
	}
	.search-desc {
		margin: 0 0 1rem 0;
		color: var(--gray);
	}
	.input-wrapper {
		position: relative;
		margin: 0 0 1rem 0;
		width: 100%;
	}
	input {
		display: block;
		background-color: var(--black-tint1);
		color: var(--white-shade2);
		border-radius: 0.375rem;
		border: 1px solid var(--gray-shade6);
		padding: 0.5rem 1rem;
		width: 100%;
	}
	svg {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		color: var(--gray);
		width: 1.25rem;
		height: 1.25rem;
	}
	h3 {
		color: var(--body-text);
		margin: 2rem 0 1rem 0;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		letter-spacing: -0.025em;
	}
	li {
		margin: 0 0 2rem 0;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
	.button-wrapper {
		background-color: var(--page-bg-color);
		border: 1px solid var(--accent-color);
		padding: 0.75rem 1rem;
	}
	.load-more-button {
		color: var(--accent-color);
		background-color: var(--page-bg-color);
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		line-height: 1;
	}

	@media (min-width: 640px) {
		section {
			padding: 0 2rem;
		}
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 3rem;
			line-height: 1;
		}
		h3 {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}
	}
</style>
