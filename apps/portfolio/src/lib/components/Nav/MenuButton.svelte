<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let open = false;
</script>

<button
	class="menu-button block md:hidden"
	class:open
	aria-label="menu"
	tabindex="0"
	aria-controls="nav-sidebar"
	aria-haspopup="menu"
	aria-expanded={open}
	on:click={() => (open = !open)}
>
	<div class="icon-wrapper">
		<BasicIconRenderer icon={'menu'} />
	</div>
</button>

<style lang="postcss">
	.menu-button {
		padding: 0.7rem;
		border-width: 3px;
		border-style: solid;
		border-color: var(--white);
		background-color: var(--page-bg-color);
		color: var(--white);
		font-size: 2rem;
		z-index: 5;
		transition: color 350ms ease-out, background-color 350ms ease-out;
	}
	.menu-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}
	.menu-button.open {
		border-color: var(--accent-color);
		background-color: var(--accent-color);
		color: var(--black-tint2);
	}
	.icon-wrapper {
		width: 26px;
		height: 26px;
	}
</style>
