<script lang="ts">
	import { tutorialSectionNumberMap } from '$lib/stores';
	import type { OrderedNavItem } from '$lib/types';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let slug: string;

	const part0: OrderedNavItem = {
		slug: 'overview',
		title: 'Project Overview',
		titleCompact: 'Overview',
		weight: 0,
	};

	$: postIndex = $tutorialSectionNumberMap.findIndex((post) => post.slug === slug);
	$: previous = postIndex > 0 ? $tutorialSectionNumberMap.at(postIndex - 1) : part0;
	$: next = postIndex < $tutorialSectionNumberMap.length - 1 ? $tutorialSectionNumberMap.at(postIndex + 1) : null;
</script>

<div class="post-nav">
	<div class="post-nav-prev">
		{#if previous}
			<a href={previous.slug} class="top-gradient">
				<div class="icon icon-prev"><BasicIconRenderer icon={'arrowleft'} /></div>
				<span class="prev-post-title post-title">{previous?.titleCompact}</span>
			</a>
		{/if}
	</div>
	<div class="post-nav-next">
		{#if next}
			<a href={next.slug} class="bottom-gradient">
				<span class="prev-post-title post-title">{next?.titleCompact}</span>
				<div class="icon icon-next"><BasicIconRenderer icon={'arrowright'} /></div>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.post-nav {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		font-size: 1.1rem;
		border: none;
		padding: 0;
		line-height: 1;
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
		align-items: center;
		gap: 0.5rem;
		font-weight: 400;
		color: var(--accent-color);
		background-color: var(--page-bg-color);
		padding: 0;
		text-decoration: none;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}
	.post-nav-prev a {
		justify-content: flex-start;
	}
	.post-nav-next a {
		justify-content: flex-end;
		text-align: right;
	}
	.icon {
		height: 16px;
		flex: 0 0 14px;
		margin: 0;
	}

	@media (min-width: 640px) {
		.post-nav {
			font-size: 1.25rem;
		}
	}
</style>
