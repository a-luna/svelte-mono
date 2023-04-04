<script lang="ts">
	import NavLink from '$lib/components/Nav/NavLink.svelte';
</script>

<nav>
	<NavLink href="/projects">Projects</NavLink>
	<NavLink href="/blog">Blog</NavLink>
	<NavLink href="/about">About</NavLink>
</nav>

<style lang="postcss">
	nav {
		display: none;
		background-color: inherit;
		line-height: 1;
		flex: 1;
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-evenly;
			align-items: flex-end;
		}
	}
</style>
