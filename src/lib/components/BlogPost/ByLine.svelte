<script lang="ts">
	import { AUTHOR_NAME, SITE_URL } from '$lib/siteConfig';
	import { formatDateString } from '$lib/util';

	export let published: Date;

	$: authorImage = `${SITE_URL}/AaronLuna.jpg`;
</script>

<p class="author">
	<img href={authorImage} alt="" /><span class="author-name">{AUTHOR_NAME}</span><span
		class="publish-date">on {formatDateString(published)}</span
	>
</p>

<style lang="postcss">
	.author {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--gray-shade2);
	}
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	@media (min-width: 640px) {
		.author {
			font-size: 0.95rem;
		}
	}
</style>
