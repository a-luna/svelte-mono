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
	</a>
	<div class="details">
		<a href="/about" class="author author-name">{AUTHOR_NAME}</a>
		<span class="publish-date">{@html publishDate}</span>
	</div>
</div>

<style lang="postcss">
	.by-line {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		line-height: 1;
		font-weight: 500;
	}
	.author {
		display: flex;
		gap: 0.5rem;
		background-color: var(--black-tint2);
	}
	.avatar {
		display: inline-block;
		border-width: 1px;
		border-style: solid;
		border-color: var(--gray);
		border-radius: 50%;
		height: 45px;
		width: 45px;
		transition: border-color 0.3s ease-in;
		flex: 0 0 45px;
	}
	.author:hover .avatar {
		border-color: var(--white-shade3);
	}
	.avatar img {
		border-radius: 50%;
		background-color: transparent;
		transition: background-color 0.3s ease-in;
	}
	.author:hover img {
		background-color: var(--dark-gray-shade2);
	}
	.details {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.375rem;
	}
	.author-name,
	.publish-date {
		color: var(--gray);
		font-size: 0.75rem;
		font-weight: 400;
		white-space: nowrap;
	}
	.author-name {
		transition: color 0.3s ease-in;
	}

	.author-name:hover {
		color: var(--white-shade3);
	}
	.publish-date {
		flex: 1;
	}
	@media (min-width: 640px) {
		.by-line {
			gap: 1rem;
		}
		.avatar {
			height: 50px;
			width: 50px;
			flex: 0 0 50px;
		}
		.author-name,
		.publish-date {
			font-size: 0.9rem;
		}
		.details {
			gap: 0.5rem;
		}
	}
</style>
