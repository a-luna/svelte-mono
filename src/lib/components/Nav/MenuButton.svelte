<script lang="ts">
	import Menu from '$lib/components/Icons/Menu.svelte';

	export let open = false;
</script>

<div
	class="menu-button block md:hidden"
	class:open
	aria-label="menu"
	role="button"
	tabindex="0"
	aria-controls="nav-sidebar"
	aria-haspopup="menu"
	aria-expanded={open}
	on:click={() => (open = !open)}
>
	<div class="icon-wrapper">
		<Menu />
	</div>
</div>

<style lang="postcss">
	.menu-button {
		padding: 0.5rem;
		border: 2px solid var(--white);
		background-color: var(--page-bg-color);
		color: var(--white);
		font-size: 1.5rem;
		z-index: 5;
	}
	.menu-button:hover {
		border: 3px solid var(--accent-color);
		color: var(--accent-color);
	}
	.menu-button.open {
		border-color: var(--accent-color);
		background-color: var(--accent-color);
		color: var(--page-bg-color);
	}
	.icon-wrapper {
		width: 28px;
		height: 28px;
	}

	@media (min-width: 640px) {
		.menu-button {
			border-width: 3px;
			padding: 0.7rem;
			font-size: 2rem;
		}
		.icon-wrapper {
			width: 32px;
			height: 32px;
		}
	}
</style>
