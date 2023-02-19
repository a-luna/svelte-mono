<script lang="ts">
	import Part0 from '/src/images/flask-api-tutorial/part-0.jpg?w=300;500;800;1200;1500&srcset';
	import Part1 from '/src/images/flask-api-tutorial/part-1.jpg?w=300;500;800;1200;1500&srcset';
	import Part2 from '/src/images/flask-api-tutorial/part-2.jpg?w=300;500;800;1200;1500&srcset';
	import Part3 from '/src/images/flask-api-tutorial/part-3.jpg?w=300;500;800;1200;1500&srcset';
	import Part4 from '/src/images/flask-api-tutorial/part-4.jpg?w=300;500;800;1200;1500&srcset';
	import Part5 from '/src/images/flask-api-tutorial/part-5.jpg?w=300;500;800;1200;1500&srcset';
	import Part6 from '/src/images/flask-api-tutorial/part-6.jpg?w=300;500;800;1200;1500&srcset';

	export let slug: string;
	export let caption = '';

	const coverImages: { [k: string]: string } = {
		'part-0': Part0,
		'part-1': Part1,
		'part-2': Part2,
		'part-3': Part3,
		'part-4': Part4,
		'part-5': Part5,
		'part-6': Part6
	};
</script>

<div class="post-image">
	<figure>
		<img srcset={coverImages[slug]} type="image/jpeg" alt={caption} />
		<figcaption><p>{caption}</p></figcaption>
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
