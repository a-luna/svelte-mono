<script lang="ts">
	import { blogPostDateMap } from '$lib/stores';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let slug: string;

	$: postIndex = $blogPostDateMap.findIndex((post) => post.slug === slug);
	$: previous = postIndex > 0 ? $blogPostDateMap.at(postIndex - 1) : null;
	$: next = postIndex < $blogPostDateMap.length - 1 ? $blogPostDateMap.at(postIndex + 1) : null;
</script>

<div class="post-nav">
	<div class="post-nav-next">
		{#if next}
			<a href={next.slug}>
				<span class="prev-post-title post-title">{next.title}</span>
				<div class="icon icon-next"><BasicIconRenderer icon="arrowright" /></div>
			</a>
		{/if}
	</div>
	<div class="post-nav-prev">
		{#if previous}
			<a href={previous.slug}>
				<div class="icon icon-prev"><BasicIconRenderer icon={'arrowleft'} /></div>
				<span class="prev-post-title post-title">{previous.title}</span>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.post-nav {
		display: flex;
		flex-flow: column nowrap;
		background-color: var(--black-tint2);
		line-height: 1.3;
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
	}
	.post-nav-prev a,
	.post-nav-next a,
	.post-nav-prev a:hover,
	.post-nav-next a:hover {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		align-items: flex-start;
		font-weight: 400;
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
		background-color: var(--black-tint2);
		text-decoration: none;
		transition: all 350ms ease-out;
	}
	.post-nav-prev a {
		justify-content: flex-start;
		margin: 0 2rem 0 0;
		padding: 1rem 0 1rem 0.5rem;
	}
	.post-nav-next a {
		text-align: right;
		justify-content: flex-end;
		margin: 0 0 0 2rem;
		padding: 1rem 0.5rem 1rem 0;
	}
	.icon {
		height: 16px;
		margin: 2px 0 0 0;
		flex: 0 0 14px;
	}
</style>
