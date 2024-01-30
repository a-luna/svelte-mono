<script lang="ts">
	import { menuButtonWasClicked } from '$lib/stores';
	import { slide } from 'svelte/transition';
</script>

<nav
	class="nav-flyout"
	transition:slide|local={{ duration: 400, delay: 50, axis: 'x' }}
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
		right: calc(1.5rem - 3px);
		z-index: 10;
		background-color: var(--purple);
		border-color: var(--black);
		border-width: 3px;
		margin-top: calc(1.5rem + calc(56px - 3px));
	}

	.nav-flyout-link {
		white-space: pre;
		color: var(--white);
		padding: 1rem;
	}
</style>
