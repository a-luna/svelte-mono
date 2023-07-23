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
	<div class="post-nav-next top-gradient">
		{#if next}
			<a href={next.slug}>
				<span class="next-post-title post-title">{next?.title}</span>
				<div class="icon icon-next"><BasicIconRenderer icon={'arrowright'} /></div>
			</a>
			<span class="next-title">Next</span>
		{/if}
	</div>
	<div class="post-nav-prev bottom-gradient">
		{#if previous}
			<span class="prev-title">Previous</span>
			<a href={previous.slug}>
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
		background-color: var(--page-bg-color);
		font-size: inherit;
		line-height: 1.3;
		width: 100%;
		border: none;
		padding: 0;
	}
	.post-nav-prev,
	.post-nav-next {
		display: flex;
		flex: 1;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.post-nav-prev {
		justify-content: flex-start;
		padding: 0.5rem 0.5rem 0.75rem 0.5rem;
	}
	.post-nav-next {
		justify-content: flex-end;
		padding: 0.75rem 0.5rem 0.5rem 0.5rem;
	}
	.post-nav-next a {
		justify-content: flex-end;
	}
	.post-nav-prev a,
	.post-nav-next a,
	.post-nav-prev a:hover,
	.post-nav-next a:hover {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		font-weight: 400;
		color: var(--accent-color);
		text-decoration: none;
		transition: background-color 350ms ease-out, color 350ms ease-out;
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
	.next-title,
	.prev-title {
		display: none;
	}
	.next-title,
	.next-post-title {
		text-align: right;
	}
	@media (min-width: 640px) {
		.next-title,
		.prev-title {
			display: block;
			flex: 1;
			color: var(--dark-gray);
		}
		.post-nav-prev {
			padding-top: 0;
		}
		.post-nav-next {
			padding-bottom: 0;
		}
	}
</style>
