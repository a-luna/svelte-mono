<script lang="ts">
	import DoubleUp from '../Icons/DoubleUp.svelte';
</script>

<a href="#" title="Scroll To Top"><DoubleUp fill="var(--black)" /></a>

<style lang="postcss">
	a {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--accent-color);
		opacity: 0.5;
		z-index: 3;
		padding: 0.5rem 0.25rem;
	}
	a:hover {
		opacity: 0.8;
	}
	a:focus {
		opacity: 0.9;
	}
	a:active {
		opacity: 1;
	}
</style>
