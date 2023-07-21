<script lang="ts">
	import { blogPostDateMap, tutorialSectionNumberMap } from '$lib/stores';
	import type { ContentType, OrderedNavItem } from '$lib/types';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let contentType: ContentType;
	export let slug: string;

	const part0: OrderedNavItem = {
		slug: 'overview',
		title: 'Project Overview',
		titleCompact: 'Overview',
		weight: 0,
	};

	$: tutorialSections = [part0, ...$tutorialSectionNumberMap];
	$: navItems = contentType == 'blog' ? $blogPostDateMap : contentType == 'tutorial' ? tutorialSections : [];
	$: postIndex = navItems.findIndex((post) => post.slug === slug);
	$: previous = postIndex > 0 ? navItems.at(postIndex - 1) : null;
	$: next = postIndex < navItems.length - 1 ? navItems.at(postIndex + 1) : null;
</script>

<div class="post-nav">
	<div class="post-nav-next">
		{#if next}
			<a href={next.slug} class="top-gradient">
				<span class="prev-post-title post-title">{next?.title}</span>
				<div class="icon icon-next"><BasicIconRenderer icon={'arrowright'} /></div>
			</a>
		{/if}
	</div>
	<div class="post-nav-titles">
		<span class="prev-title">Previous</span>
		<span class="next-title">Next</span>
	</div>
	<div class="post-nav-prev">
		{#if previous}
			<a href={previous.slug} class="bottom-gradient">
				<div class="icon icon-prev"><BasicIconRenderer icon={'arrowleft'} /></div>
				<span class="prev-post-title post-title">{previous?.title}</span>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.post-nav {
		display: flex;
		flex-flow: column nowrap;
		font-size: inherit;
		line-height: 1.3;
		width: 100%;
		border: none;
		padding: 0;
	}
	.post-nav-prev,
	.post-nav-next {
		flex: 1;
	}
	.post-nav-prev a,
	.post-nav-next a,
	.post-nav-prev a:hover,
	.post-nav-next a:hover {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		gap: 0.5rem;
		font-weight: 400;
		color: var(--accent-color);
		background-color: var(--page-bg-color);
		text-decoration: none;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}
	.post-nav-prev a {
		justify-content: flex-start;
		padding: 0.75rem 0 1.5rem 0.5rem;
	}
	.post-nav-next a {
		justify-content: flex-end;
		text-align: right;
		padding: 1.5rem 0.75rem 0.5rem 0;
	}
	.icon {
		height: 16px;
		flex: 0 0 14px;
		margin: 2px 0 0 0;
	}
	.top-gradient {
		background-image: linear-gradient(to right, var(--purple), var(--sea-green));
		background-repeat: no-repeat;
		background-size: 100% 1px;
		background-position: 0 0%;
		transition: background-size 0.25s ease-in;
	}
	.bottom-gradient {
		background-image: linear-gradient(to right, var(--purple), var(--sea-green));
		background-repeat: no-repeat;
		background-size: 100% 1px;
		background-position: 0 100%;
		transition: background-size 0.25s ease-in;
	}
	.post-nav-titles {
		display: flex;
		gap: 1rem;
	}
	.next-title,
	.prev-title {
		flex: 1;
		color: var(--dark-gray);
	}
	.next-title {
		text-align: right;
	}
</style>
