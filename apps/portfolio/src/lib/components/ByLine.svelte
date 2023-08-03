<script lang="ts">
	import { AUTHOR_NAME, SITE_URL } from '$lib/siteConfig';
	import type { ContentType } from '$lib/types';
	import { formatDateString } from '$lib/util';

	export let published = new Date(0);
	export let contentType: ContentType;

	$: authorImage = `${SITE_URL}/avatar.png`;
	$: publishDate = contentType === 'tutorial' ? '&nbsp;' : formatDateString(published);
</script>

<div class="by-line">
	<a href="/about" class="author">
		<div class="avatar">
			<img src={authorImage} alt="" />
		</div>
		<span class="author-name">{AUTHOR_NAME}</span>
	</a>
	<span class="publish-date">{@html publishDate}</span>
</div>

<style lang="postcss">
	.by-line {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		line-height: 1;
		font-family: 'Noto Sans', Inter, Arial, Helvetica, sans-serif;
		font-weight: 500;
	}
	.author {
		display: flex;
		gap: 0.5rem;
		background-color: var(--black-tint2);
	}
	.avatar {
		display: inline-block;
		border-width: 2px;
		border-style: solid;
		border-color: var(--gray-shade2);
		border-radius: 50%;
		height: 50px;
		width: 50px;
		transition: border-color 0.3s ease-in;
		flex: 0 0 50px;
	}
	.author:hover .avatar {
		border-color: var(--white);
	}
	.avatar img {
		border-radius: 50%;
		background-color: transparent;
		transition: background-color 0.3s ease-in;
	}
	.author:hover img {
		background-color: var(--dark-gray-shade2);
	}
	.author-name,
	.publish-date {
		font-size: 0.875rem;
		font-weight: 400;
		white-space: nowrap;
	}
	.author-name {
		color: var(--gray-shade2);
		transition: color 0.3s ease-in;
		align-self: center;
	}

	.author:hover .author-name {
		color: var(--white);
	}
	.publish-date {
		flex: 1;
		color: var(--gray-shade2);
	}
	@media (min-width: 640px) {
		.avatar {
			height: 65px;
			width: 65px;
			flex: 0 0 65px;
		}
		.author-name,
		.publish-date {
			font-size: 1rem;
		}
	}
</style>
