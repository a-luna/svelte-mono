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
		border-width: 2px;
		border-style: solid;
		border-color: var(--white);
		background-color: var(--page-bg-color);
		color: var(--white);
		font-size: 1.5rem;
		z-index: 5;
		transition: all 350ms ease-out;
	}
	.menu-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
		background-color: var(--black-tint2);
	}
	.menu-button.open {
		border-color: var(--accent-color);
		background-color: var(--accent-color);
		color: var(--black-tint2);
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
