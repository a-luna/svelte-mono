<script lang="ts">
	import NavLink from '$lib/components/Nav/NavLink.svelte';
</script>

<nav class="hidden md:grid">
	<div>
		<NavLink href="/">Home</NavLink>
	</div>
	<div>
		<NavLink href="/blog">Blog</NavLink>
	</div>
	<div>
		<NavLink href="/about">About</NavLink>
	</div>
</nav>

<style lang="postcss">
	nav {
		background-color: inherit;
		font-size: 1.1rem;
		grid-template-columns: repeat(3, auto);
		flex: 1;
		justify-items: center;
	}
</style>
