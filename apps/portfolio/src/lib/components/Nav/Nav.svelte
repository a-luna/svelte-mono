<script lang="ts">
	import MenuButton from '$lib/components/Nav/MenuButton.svelte';
	import NavBrand from '$lib/components/Nav/NavBrand.svelte';
	import NavItems from '$lib/components/Nav/NavItems.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';
	import { mobileDisplay } from '$lib/stores';
	import { onMount } from 'svelte';
	let mounted = false;

	onMount(() => (mounted = true));
</script>

{#if mounted}
	<div class="nav-container">
		<NavBrand />
		{#if !$mobileDisplay}
			<NavItems />
			<SocialLinks />
		{/if}
		<MenuButton />
	</div>
{/if}

<style lang="postcss">
	.nav-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: baseline;
		width: 100%;
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
		.nav-container {
			justify-content: flex-start;
			align-items: flex-start;
			max-width: var(--max-width);
			margin: 0 auto;
			padding: 1.5rem 0;
		}
	}
</style>
