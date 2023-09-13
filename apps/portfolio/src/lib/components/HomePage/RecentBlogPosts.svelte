<script lang="ts">
	import { browser } from '$app/environment';
	import { blogPosts } from '$lib/stores';
	import type { BlogPost } from '$lib/types';
	import { format } from 'date-fns';

	export let allBlogPosts: BlogPost[];
	let recentBlogPosts: BlogPost[] = [];

	$: if (browser && Object.keys(allBlogPosts).length) $blogPosts = allBlogPosts;
	$: recentBlogPosts = $blogPosts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()).slice(0, 4);
</script>

<div>
	<h2 class="underline--magical">Recent Blog Posts</h2>
	<ul class="recent-posts">
		{#each recentBlogPosts as blogPost}
			<li>
				<span class="posted-on">{format(new Date(blogPost.date), 'MMM dd, yyyy')}</span>
				<a class="post-title" href={blogPost.href}>{blogPost.title}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	ul.recent-posts {
		display: flex;
		flex-flow: column nowrap;
		margin: 0;
		padding: 0;
		gap: 1rem;
	}
	.recent-posts li {
		display: flex;
		flex-flow: column nowrap;
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 0;
		padding: 0;
	}
	.posted-on {
		color: var(--tw-prose-invert-body);
	}
	.post-title {
		color: var(--link-color);
		background-color: var(--page-bg-color);
	}
	a:hover {
		color: var(--page-bg-color);
		background-color: var(--link-color);
	}
</style>
