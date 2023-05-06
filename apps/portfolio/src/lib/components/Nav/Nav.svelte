<script lang="ts">
	import MenuButton from '$lib/components/Nav/MenuButton.svelte';
	import NavBrand from '$lib/components/Nav/NavBrand.svelte';
	import NavItems from '$lib/components/Nav/NavItems.svelte';
	import SocialLinks from '$lib/components/Nav/SocialLinks.svelte';
	import { initialFadePerformed } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let mounted = false;

	$: fadeInDelay = $initialFadePerformed ? 750 : 0;

	onMount(() => (mounted = true));
</script>

{#if mounted}
	<div class="nav-wrapper">
		<div class="nav-container">
			<NavBrand />
			<NavItems />
			<SocialLinks />
			<div in:fade={{ delay: fadeInDelay }}>
				<MenuButton />
			</div>
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
			align-items: flex-start;
			padding: 1.5rem 0;
			margin: 0;
		}
	}
</style>
