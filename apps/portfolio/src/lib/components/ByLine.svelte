<script lang="ts">
	import { AUTHOR_NAME, SITE_URL } from '$lib/siteConfig';
	import { formatDateString } from '$lib/util';

	export let published = new Date(0);

	$: authorImage = `${SITE_URL}/avatar.png`;
</script>

<div class="author">
	<div class="avatar"><img src={authorImage} alt="" /></div>
	<span class="author-name">{AUTHOR_NAME}</span>
	<span class="publish-date">on {formatDateString(published)}</span>
</div>

<style lang="postcss">
	.author {
		display: flex;
		gap: 0.3rem;
		align-items: center;
		line-height: 0;
	}
	.avatar {
		display: inline-block;
		margin: 0 5px;
		border-width: 2px;
		border-style: solid;
		border-color: var(--accent-color-dim);
		border-radius: 50%;
		height: 50px;
		width: 50px;
		transition: border-color 0.3s ease-in;
	}
	.avatar:has(img:hover) {
		border-color: var(--accent-color);
	}
	.avatar img {
		border-radius: 50%;
		border-color: var(--post-title-text-color);
		background-color: var(--gray-shade6);
	}
	:global(.tutorial) .publish-date {
		display: none;
	}
	.author-name,
	.publish-date {
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--gray-shade2);
	}
	@media (min-width: 640px) {
		.author-name,
		.publish-date {
			font-size: 0.95rem;
		}
	}
</style>
