<script lang="ts">
	import Part0 from '../../../images/flask-api-tutorial/part-0.jpg?w=707&h=200';
	import Part1 from '../../../images/flask-api-tutorial/part-1.jpg?w=707&h=200';
	import Part2 from '../../../images/flask-api-tutorial/part-2.jpg?w=707&h=200';
	import Part3 from '../../../images/flask-api-tutorial/part-3.jpg?w=707&h=200';
	import Part4 from '../../../images/flask-api-tutorial/part-4.jpg?w=707&h=200';
	import Part5 from '../../../images/flask-api-tutorial/part-5.jpg?w=707&h=200';
	import Part6 from '../../../images/flask-api-tutorial/part-6.jpg?w=707&h=200';

	export let slug: string;
	$: src = images?.[slug];

	const images: { [k: string]: string } = {
		'part-0': Part0,
		'part-1': Part1,
		'part-2': Part2,
		'part-3': Part3,
		'part-4': Part4,
		'part-5': Part5,
		'part-6': Part6
	};
</script>

<img {src} type="image/jpeg" alt="Click to read the blog post" />
