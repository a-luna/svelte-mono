<script lang="ts">
	import { formatDateString } from '$lib/util';

	export let slug = '';
	export let title = 'Untitled post';
	export let publishDate: Date = new Date(0);

	$: href = `blog/${slug}`;
</script>

<div class="blog-summary">
	<div class="blog-summary-top">
		<a {href} class="post-title"><h4>{title}</h4></a>
		<div class="published">{formatDateString(publishDate)}</div>
	</div>
	<p class="description"><slot /></p>
</div>

<style lang="postcss">
	.blog-summary {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		border-width: 2px;
		border-style: solid;
		border-color: var(--dark-gray);
		color: var(--white);
		background-color: var(--black);
		padding: 1rem;
	}

	.blog-summary:hover {
		border-color: var(--accent-color);
	}

	.blog-summary-top {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.25rem;
	}

	.post-title,
	.post-title:hover {
		font-size: 1.4rem;
		font-weight: 400;
		color: var(--accent-color);
		text-decoration: none;
		line-height: 1.3;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}

	.published {
		font-size: 0.95rem;
		color: var(--gray-shade3);
	}

	.description {
		font-size: 0.9rem;
		color: var(--white-shade3);
		line-height: 1.5;
	}

	@media (min-width: 640px) {
		.blog-summary {
			padding: 2rem;
		}
	}
</style>
