<script lang="ts">
	import MenuButton from '$lib/components/Nav/MenuButton.svelte';
	import NavBrand from '$lib/components/Nav/NavBrand.svelte';
	import NavFlyout from '$lib/components/Nav/NavFlyout.svelte';
	import NavItems from '$lib/components/Nav/NavItems.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';
	import { getAppContext, mobileNavOpen, navMounted } from '$lib/stores';
	import { onMount } from 'svelte';

	let state = getAppContext();

	onMount(() => ($navMounted = true));
</script>

{#if $navMounted}
	<div class="nav-container">
		<NavBrand />
		{#if $state.screenSize === 'lg'}
			<NavItems />
			<SocialLinks />
		{:else}
			<MenuButton />
			{#if $mobileNavOpen}
				<NavFlyout />
			{/if}
		{/if}
	</div>
{/if}

<style lang="postcss">
	.nav-container {
		--mobile-menu-button-size: 50px;
		--mobile-menu-button-padding: 0.75rem;
		--mobile-menu-button-border-width: 2px;
		--mobile-nav-flyout-border-width: 3px;

		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: var(--max-width);
		background-color: inherit;
		margin: 0 auto;
		padding-top: var(--mobile-page-padding);
		padding-bottom: 0;
		padding-left: var(--mobile-page-padding);
		padding-right: var(--mobile-page-padding);
	}

	/* @media (min-width: 640px) {
		.nav-container {
			margin: 0;
		}
	} */

	@media (min-width: 768px) {
		.nav-container {
			justify-content: flex-start;
			align-items: flex-start;
			max-width: var(--max-width);
			padding: 1.5rem 0;
		}
	}
	@media (min-width: 848px) {
		:global(#svelte:has(article.readme)) .nav-container {
			--max-width: 800px;
		}
	}
</style>
