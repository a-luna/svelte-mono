<script lang="ts">
	import MenuButton from '$lib/components/Nav/MenuButton.svelte';
	import NavBrand from '$lib/components/Nav/NavBrand.svelte';
	import NavItems from '$lib/components/Nav/NavItems.svelte';
	import NavSideBar from '$lib/components/Nav/NavSideBar.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';
	import { mobileNavOpen } from '$lib/stores';
	import { onMount } from 'svelte';
	let mounted = false;

	onMount(() => (mounted = true));

	let open = false;
	$: $mobileNavOpen = open;
</script>

{#if mounted}
	<div class="nav-wrapper">
		<div class="nav-container">
			<NavBrand />
			<NavItems />
			<SocialLinks mobile={false} {open} />
			<MenuButton bind:open />
			<NavSideBar bind:open />
		</div>
	</div>
{/if}

<style lang="postcss">
	.nav-wrapper {
		width: 100%;
		padding: 0;
		margin: 0;
		background-color: inherit;
	}

	.nav-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		background-color: inherit;
		margin: 0 auto;
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-left: var(--mobile-page-padding);
		padding-right: var(--mobile-page-padding);
	}

	@media (min-width: 640px) {
		.nav-container {
			margin: 0;
		}
	}

	@media (min-width: 768px) {
		.nav-wrapper {
			max-width: var(--max-width);
			margin: 0 auto;
		}
		.nav-container {
			justify-content: flex-start;
			align-items: center;
			padding: 1.5rem 0;
			margin: 0;
		}
	}
</style>
