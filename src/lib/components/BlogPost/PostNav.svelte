<script lang="ts">
	import ArrowLeft from '$lib/components/Icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/Icons/ArrowRight.svelte';
	import { blogPostDateMap } from '$lib/stores';

	export let slug: string;

	$: postIndex = $blogPostDateMap.findIndex((post) => post.slug === slug);
	$: previous = postIndex > 0 ? $blogPostDateMap.at(postIndex - 1) : null;
	$: next = postIndex < $blogPostDateMap.length - 1 ? $blogPostDateMap.at(postIndex + 1) : null;
</script>

<div class="post-nav">
	<div class="post-nav-prev">
		{#if previous}
			<a href={previous.slug}>
				<div class="icon icon-prev"><ArrowLeft /></div>
				<span class="prev-post-title post-title">{previous.title}</span>
			</a>
		{/if}
	</div>
	<div class="post-nav-next">
		{#if next}
			<a href={next.slug}>
				<span class="prev-post-title post-title">{next.title}</span>
				<div class="icon icon-next"><ArrowRight /></div>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.post-nav {
		display: flex;
		flex-flow: column nowrap;
		border-top: 1px solid var(--white);
		border-bottom: 1px solid var(--white);
		padding: 1rem 0;
		line-height: 1.3;
		width: 100%;
	}
	.post-nav-prev a,
	.post-nav-next a {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		align-items: flex-start;
		font-weight: 400;
		color: var(--accent-color);
		text-decoration: none;
		transition: all 350ms ease-out;
	}
	.post-nav-prev a:hover,
	.post-nav-next a:hover {
		font-weight: 400;
		color: var(--black-tint3);
		background-color: var(--accent-color);
		text-decoration: none;
		border-bottom: none;
		box-shadow: none;
	}
	.post-nav-prev a {
		justify-content: flex-start;
		margin: 0 2rem 0 0;
		padding: 0.5rem 0.5rem 0.5rem 0;
	}
	.post-nav-next a {
		justify-content: flex-end;
		margin: 0 0 0 2rem;
		padding: 0.5rem 0 0.5rem 0.5rem;
		text-align: right;
	}
	.icon {
		height: 16px;
		margin: 2px 0 0 0;
		flex: 0 0 14px;
	}
</style>
