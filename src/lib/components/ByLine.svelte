<script lang="ts">
	import { AUTHOR_NAME, SITE_URL } from '$lib/siteConfig';
	import { formatDateString } from '$lib/util';

	export let published = new Date(0);
	export let nameOnly = false;

	$: authorImage = `${SITE_URL}/AaronLuna.jpg`;
</script>

<div class="author">
	<div class="avatar"><img height="40px" width="40px" src={authorImage} alt="" /></div>
	<span class="author-name">{AUTHOR_NAME}</span>
	{#if !nameOnly}
		<span class="publish-date">on {formatDateString(published)}</span>
	{/if}
</div>

<style lang="postcss">
	.author {
		display: flex;
		gap: 0.3rem;
		align-items: center;
		margin: 0.5rem 0 0 0;
	}
	.avatar {
		line-height: 0;
		display: inline-block;
		margin: 5px;
		border: 2px solid var(--black-tint3);
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}
	.avatar img {
		border-radius: 50%;
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
