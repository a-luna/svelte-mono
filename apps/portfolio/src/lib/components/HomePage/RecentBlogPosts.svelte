<script lang="ts">
	import { blogPosts } from '$lib/stores';
	import { sortByDate } from '$lib/util';
	import { getCssPropertyHslColorValue } from '@a-luna/shared-ui';
	import { hslToString } from '@a-luna/shared-ui/color/util';
	import { format } from 'date-fns';

	let titleBgColor: string = hslToString({ h: 0, s: 0, l: 0, a: 1 });

	$: recentBlogPosts = sortByDate($blogPosts, { key: 'date', asc: false }).slice(0, 4);
	$: if (typeof window !== 'undefined') {
		const mainElement = document.querySelector('main');
		if (mainElement) {
			const pageBgColor = getCssPropertyHslColorValue(mainElement, '--page-bg-color');
			titleBgColor = hslToString({ ...pageBgColor, a: 0.3 });
		}
	}

	const formatDate = (date: string) => format(new Date(date), 'MMM dd, yyyy');
</script>

<div>
	<h2 class="underline--magical">Recent Blog Posts</h2>
	<ul class="recent-posts" style="--title-bg-color: {titleBgColor}">
		{#each recentBlogPosts as blogPost}
			<li>
				<span class="posted-on"><span>{formatDate(blogPost.date)}</span></span>
				<a class="post-title" href={blogPost.href}><span>{blogPost.title}</span></a>
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
	}
	.posted-on span,
	.post-title span {
		background-color: var(--title-bg-color);
	}
	a:hover {
		color: var(--page-bg-color);
		background-color: var(--link-color);
	}
	a:hover span,
	a:hover span {
		background-color: inherit;
	}

	@media (min-width: 640px) {
		.recent-posts li {
			font-size: 1rem;
		}
	}
</style>
