<script lang="ts">
	import NavLink from '$lib/components/Nav/NavLink.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';
	import { fade, fly } from 'svelte/transition';

	export let open: boolean;
</script>

{#if open}
	<aside
		in:fly|local={{ duration: 1000, delay: 200, x: -300 }}
		out:fade={{ duration: 750, delay: 750 }}
		class="nav-sidebar absolute md:hidden"
		id="nav-sidebar"
		class:open
	>
		<nav>
			<div on:click={() => (open = false)}>
				<NavLink href="/">Home</NavLink>
			</div>
			<div on:click={() => (open = false)}>
				<NavLink href="/projects">Projects</NavLink>
			</div>
			<div on:click={() => (open = false)}>
				<NavLink href="/blog">Blog</NavLink>
			</div>
			<div on:click={() => (open = false)}>
				<NavLink href="/about">About</NavLink>
			</div>
			<SocialLinks mobile={true} {open} />
		</nav>
	</aside>
{/if}

<style lang="postcss">
	.nav-sidebar {
		z-index: 4;
		background-color: var(--black-tint2);
		width: 100%;
		height: 100%;
		left: -100%;
		transition: left 0.3s ease-in-out;
	}
	.open {
		left: 0;
		top: 0;
	}
	nav {
		display: flex;
		flex-flow: column nowrap;
		background-color: inherit;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 5rem 0 0 3rem;
		gap: 3rem;
	}
</style>
