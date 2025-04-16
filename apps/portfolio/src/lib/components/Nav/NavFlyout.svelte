<script lang="ts">
	import { menuButtonWasClicked } from '$lib/stores';
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
</script>

<nav
	class="nav-flyout"
	transition:slide|local={{ duration: 300, delay: 50, easing: sineInOut, axis: 'x' }}
	on:outroend={() => ($menuButtonWasClicked = false)}
>
	<a href="/" class="nav-flyout-link">Home</a>
	<a href="/blog" class="nav-flyout-link">Blog</a>
	<a href="/projects" class="nav-flyout-link">Projects</a>
	<a href="/about" class="nav-flyout-link">About</a>
</nav>

<style lang="postcss">
	.nav-flyout {
		display: flex;
		flex-flow: column nowrap;
		position: absolute;
		top: calc(
			calc(var(--mobile-page-padding) * 2) +
				calc(var(--mobile-menu-button-size) - var(--mobile-nav-flyout-border-width))
		);
		right: calc(var(--mobile-page-padding) - var(--mobile-nav-flyout-border-width));
		z-index: 10;
		background-color: var(--purple);
		border-color: var(--page-bg-color);
		border-width: var(--mobile-nav-flyout-border-width);
	}

	.nav-flyout-link {
		white-space: pre;
		color: var(--white);
		padding: 1rem;
	}
</style>
