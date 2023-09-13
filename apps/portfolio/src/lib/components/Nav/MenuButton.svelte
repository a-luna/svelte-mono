<script lang="ts">
	import { mobileNavOpen } from '$lib/stores';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
</script>

<button
	class="menu-button"
	aria-label="menu"
	tabindex="0"
	aria-controls="nav-sidebar"
	aria-haspopup="menu"
	aria-expanded={$mobileNavOpen}
	on:click={() => ($mobileNavOpen = !$mobileNavOpen)}
>
	<div class="icon-wrapper">
		<BasicIconRenderer icon={'menu'} />
	</div>
</button>

<style lang="postcss">
	.menu-button {
		display: block;
		padding: 0.75rem;
		border-width: 3px;
		border-style: solid;
		border-color: var(--white);
		background-color: var(--page-bg-color);
		color: var(--white);
		font-size: 2rem;
		z-index: 5;
	}
	.menu-button:hover {
		border-color: var(--link-color);
		color: var(--link-color);
	}
	.icon-wrapper {
		width: 26px;
		height: 26px;
	}

	@media (min-width: 768px) {
		.menu-button {
			display: none;
		}
	}
</style>
