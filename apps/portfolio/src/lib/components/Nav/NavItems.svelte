<script lang="ts">
	import NavLink from '$lib/components/Nav/NavLink.svelte';
</script>

<nav>
	<NavLink href="/projects" />
	<NavLink href="/blog" />
	<NavLink href="/about" />
</nav>

<style lang="postcss">
	nav {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
		align-items: flex-start;
		flex: 1;
		height: 40px;
		background-color: inherit;
		line-height: 1;
	}
</style>
