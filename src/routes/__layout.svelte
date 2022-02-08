<script lang="ts">
	import '../global.css';
</script>

<main>
	<slot />
</main>

<style lang="postcss">
	main {
		position: relative;
		max-width: 35em;
		background-color: #202020;
		padding: 1.25rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
	@media screen and (max-width: 400px) {
		:global(body) {
			background-color: #202020;
		}

		main {
			padding: 1rem;
		}
	}
</style>
