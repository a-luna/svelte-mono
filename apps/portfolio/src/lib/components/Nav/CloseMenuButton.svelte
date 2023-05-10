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
	<BasicIconRenderer icon={'close'} width={'26px'} height={'26px'} />
</button>

<style lang="postcss">
	.menu-button {
		display: block;
		padding: 0.75rem;
		border-width: 3px;
		border-style: solid;
		border-color: var(--white);
		background-color: var(--black-tint2);
		color: var(--white);
		font-size: 2rem;
		z-index: 5;
	}
	.menu-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}

	@media (min-width: 768px) {
		.menu-button {
			display: none;
		}
	}
</style>
