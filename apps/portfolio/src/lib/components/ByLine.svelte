<script lang="ts">
	import { AUTHOR_NAME, SITE_URL } from '$lib/siteConfig';
	import { formatDateString } from '$lib/util';

	export let published = new Date(0);
	export let contentType: string;

	$: authorImage = `${SITE_URL}/avatar.png`;
	$: publishDate = contentType === 'tutorial' ? '&nbsp;' : `on ${formatDateString(published)}`;
</script>

<div class="avatar-wrapper">
	<a href="/about" class="avatar"><img src={authorImage} alt="" /></a>
	<div class="by-line">
		<a href="/about" class="author-name">{AUTHOR_NAME}</a>
		<span class="publish-date">{@html publishDate}</span>
	</div>
</div>

<style lang="postcss">
	.avatar-wrapper {
		display: flex;
		gap: 0.3rem;
		align-items: center;
		align-items: center;
		line-height: 0;
		font-family: 'Noto Sans', Inter, Arial, Helvetica, sans-serif;
		font-weight: 500;
	}
	.avatar {
		display: inline-block;
		margin: 0 5px;
		border-width: 2px;
		border-style: solid;
		border-color: oklch(77.2% 0.229 126.4);
		border-color: hsl(75.87 100% 40%);
		border-radius: 50%;
		height: 50px;
		width: 50px;
		transition: border-color 0.3s ease-in;
		flex: 0 0 50px;
	}
	.avatar:has(img:hover),
	.avatar-wrapper:hover .avatar {
		border-color: hsl(76 100% 50%);
		border-color: oklch(92.22% 0.244 126.84);
	}
	.avatar img {
		border-radius: 50%;
		border-color: var(--post-title-text-color);
		background-color: transparent;
		transition: background-color 0.3s ease-in;
	}
	.avatar-wrapper:hover img {
		background-color: var(--dark-gray-shade2);
	}
	.avatar-wrapper:hover .author-name {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
	}
	.by-line {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		gap: 4px;
		height: 40px;
		flex: 1;
	}
	.author-name,
	.publish-date {
		font-size: 1rem;
		font-weight: 400;
		white-space: nowrap;
	}
	.author-name {
		color: oklch(77.2% 0.229 126.4);
		color: hsl(75.87 100% 40%);
		transition: color 0.3s ease-in;
	}
	.publish-date {
		flex: 1;
		color: var(--gray-shade2);
	}
	@media (min-width: 640px) {
		.author-name,
		.publish-date {
			font-size: 0.95rem;
		}
	}
</style>
