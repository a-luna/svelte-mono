<script lang="ts">
	import NavLink from '$lib/components/Nav/NavLink.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';
	import { mobileNavOpen } from '$lib/stores';
	import { fly } from 'svelte/transition';
	import CloseMenuButton from './CloseMenuButton.svelte';

	export let pageWidth = 0;

	$: flyInDuration = Math.min(2 * pageWidth, 700);
	$: flyOutDuration = Math.max(pageWidth, 450);

	const closeSideBar = () => ($mobileNavOpen = false);
</script>

<aside
	in:fly={{ delay: 250, duration: flyInDuration, x: -pageWidth }}
	out:fly={{ delay: 150, duration: flyOutDuration, x: -pageWidth }}
	class="nav-sidebar"
	id="nav-sidebar"
	class:open
>
	<nav>
		<div class="nav-links">
			<NavLink href="/" on:click={() => closeSideBar()} />
			<NavLink href="/projects" on:click={() => closeSideBar()} />
			<NavLink href="/blog" on:click={() => closeSideBar()} />
			<NavLink href="/about" on:click={() => closeSideBar()} />
			<SocialLinks />
		</div>
		<div class="nav-close-button">
			<CloseMenuButton />
		</div>
	</nav>
</aside>

<style lang="postcss">
	.nav-sidebar {
		position: absolute;
		z-index: 4;
		background-color: var(--black-tint2);
		width: 100vw;
		height: 100vh;
		left: -100%;
		transition: left 0.3s ease-in-out;
	}
	.open {
		left: 0;
		top: 0;
	}
	nav {
		display: flex;
		flex-flow: row nowrap;
		background-color: inherit;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 0 0 0 3rem;
	}
	.nav-links {
		display: flex;
		flex: 1;
		flex-flow: column nowrap;
		gap: 3rem;
		padding: 7rem 0 0 0;
	}
	.nav-close-button {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 1rem 2rem 0 0;
	}
</style>
