<script lang="ts">
	import BlogSummary from '$lib/components/BlogPost/BlogSummary.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { SITE_TITLE } from '$lib/siteConfig';
	import type { BlogPost } from '$lib/types';
	import { sortByDate } from '$lib/util';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let list: BlogPost[];
	let inputEl: HTMLInputElement;
	let isTruncated = data.allBlogPosts.length > 20;
	let search: string;
	let mounted = false;
	// let filteredCategory: string;

	$: list = sortByDate(data.allBlogPosts, { key: 'date', asc: false })
		.filter((item) => {
			if (search) {
				return item.title.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		})
		.slice(0, isTruncated ? 2 : data.allBlogPosts.length);

	const focusSearch = (e: KeyboardEvent) => {
		if (e.key === '/' && inputEl) inputEl.select();
	};

	onMount(() => (mounted = true));
</script>

<svelte:head>
	<title>Blog | {SITE_TITLE}</title>
	<meta name="description" content={`Latest Blog Posts`} />
</svelte:head>

<svelte:window on:keyup={focusSearch} />

{#if mounted}
	<SectionLayout section={'blog'}>
		<section class="article-list">
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
				<ul>
					{#each list as item}
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
				{#if isTruncated}
					<div class="button-wrapper">
						<button on:click={() => (isTruncated = false)} class="load-more-button"> Load More Posts... </button>
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
		background-color: var(--black);
		color: var(--white-shade2);
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
	ul {
		list-style: none;
		padding: 0;
	}
	.button-wrapper {
		background-color: var(--page-bg-color);
		border: 1px solid var(--link-color);
		padding: 0.75rem 1rem;
	}
	.load-more-button {
		color: var(--link-color);
		background-color: var(--page-bg-color);
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		line-height: 1;
	}

	@media (min-width: 768px) {
		h3 {
			font-size: 1.75rem;
			line-height: 2.5rem;
		}
	}
</style>
