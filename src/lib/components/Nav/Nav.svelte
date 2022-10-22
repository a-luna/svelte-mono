<script lang="ts">
	import MenuButton from '$lib/components/Nav/MenuButton.svelte';
	import NavBrand from '$lib/components/Nav/NavBrand.svelte';
	import NavItems from '$lib/components/Nav/NavItems.svelte';
	import NavSideBar from '$lib/components/Nav/NavSideBar.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';

	let open = false;
</script>

<div class="nav-wrapper">
	<div class="nav-container items-center justify-between md:items-end md:justify-start">
		<NavBrand />
		<NavItems />
		<SocialLinks mobile={false} {open} />
		<MenuButton bind:open />
		<NavSideBar bind:open />
	</div>
</div>

<style lang="postcss">
	.nav-wrapper {
		width: 100%;
		padding: 1.5rem 0;
		background-color: inherit;
	}

	.nav-container {
		background-color: inherit;
		display: flex;
		flex-flow: row nowrap;
		gap: 2rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	@media (min-width: 640px) {
		.nav-container {
			padding: 0 1.5rem;
		}
	}

	@media (min-width: 768px) {
		.nav-container {
			padding: 0;
		}
	}
	@media (min-width: 1024px) {
		.nav-container {
			gap: 3rem;
		}
	}
</style>
