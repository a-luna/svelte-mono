<script lang="ts">
	import type { BlogImage } from '$lib/types';

	export let coverImage: BlogImage;
</script>

<div class="post-image">
	<figure>
		<img src={coverImage?.src} alt={coverImage?.caption} />
		<figcaption><p>{coverImage?.caption}</p></figcaption>
	</figure>
</div>

<style lang="postcss">
	.post-image {
		margin: 0.5rem 0 0 0;
	}
	figcaption {
		color: var(--body-text-color);
		font-size: 0.95em;
		text-align: center;
		font-weight: 400;
		font-style: italic;
		margin: 10px 0 0;
	}
</style>
