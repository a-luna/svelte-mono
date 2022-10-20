<script lang="ts">
	import { nullGHMetadata } from '$lib/constants';
	import type { GHMetadata } from '$lib/types';
	import { formatDateString } from '$lib/util';

	export let slug = '';
	export let ghMetadata: GHMetadata = nullGHMetadata;
	export let title = 'Untitled post';
	export let publishDate: Date = new Date(0);

	$: href = `blog/${slug}`;
</script>

<div class="blog-summary">
	<div class="flex-wrapper">
		<a {href}>
			<h4>{title}</h4>
		</a>
		<div class="blog-meta">
			{#if ghMetadata && ghMetadata.reactions.total_count}
				<span class="reaction-count">{ghMetadata.reactions.total_count} ♥</span>
			{/if}
			<p class="published">{formatDateString(publishDate)}</p>
		</div>
	</div>
	<p class="description">
		<slot />
	</p>
</div>

<style lang="postcss">
	.blog-summary {
		margin: 0 0 2rem 0;
		width: 100%;
	}
	.flex-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		line-height: 1;
		margin: 0 0 1rem 0;
	}
	a {
		width: 100%;
	}
	h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 500;
		flex: 1 1 auto;
	}
	.blog-meta {
		display: inline-flex;
		flex: 1 1 0%;
		align-items: center;
	}
	.reaction-count {
		margin: 0 0.5rem 0 0;
		color: var(--white-shade2);
		font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
		font-size: 0.75rem;
		line-height: 1rem;
		min-width: 2rem;
	}
	.published {
		margin-bottom: 1rem;
		color: #6b7280;
		text-align: left;
		white-space: nowrap;
		width: 8rem;
	}
	.description {
		color: var(--white-shade5);
	}

	@media (min-width: 768px) {
		h4 {
			font-size: 1.25rem;
		}
		.published {
			margin-bottom: 0;
			text-align: right;
		}
	}
</style>
