<script lang="ts">
	import NavLink from '$lib/components/Nav/NavLink.svelte';
</script>

<nav class="hidden md:grid">
	<NavLink href="/projects">Projects</NavLink>
	<NavLink href="/blog">Blog</NavLink>
	<NavLink href="/about">About</NavLink>
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
