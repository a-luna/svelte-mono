<script lang="ts">
	import { menuButtonWasClicked, mobileNavOpen } from '$lib/stores';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { clickOutside } from '@a-luna/shared-ui/util';

	let icon: { name: 'close' | 'menu'; size: string };
	let debounce = false;

	$: icon = $mobileNavOpen ? { name: 'close', size: '26px' } : { name: 'menu', size: 'auto' };
	$: console.log({ mobileNavOpen: $mobileNavOpen, debounce });

	const isTouchPointer = () => matchMedia('(pointer: coarse)').matches;

	function openNavFlyout() {
		if (!isTouchPointer() && !debounce && !$menuButtonWasClicked) {
			$mobileNavOpen = true;
		}
	}

	function toggleNavFlyout() {
		$menuButtonWasClicked = true;
		if (!isTouchPointer()) {
			debounce = true;
			setTimeout(() => {
				debounce = false;
			}, 100);
		}
		$mobileNavOpen = !$mobileNavOpen;
	}
</script>

<button
	class="menu-button"
	aria-label="menu"
	tabindex="0"
	aria-controls="nav-sidebar"
	aria-haspopup="menu"
	aria-expanded={$mobileNavOpen}
	on:mouseenter={() => openNavFlyout()}
	on:click|self={() => toggleNavFlyout()}
	on:click={(e) => console.log(e)}
	use:clickOutside={{ enabled: $mobileNavOpen, cb: () => ($mobileNavOpen = !$mobileNavOpen) }}
>
	<BasicIconRenderer icon={icon.name} width={icon.size} height={icon.size} />
</button>

<style lang="postcss">
	.menu-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 56px;
		width: 56px;
		padding: 0.75rem;
		border-width: 3px;
		border-style: solid;
		border-color: var(--white);
		background-color: var(--page-bg-color);
		color: var(--white);
		font-size: 2rem;
	}
	.menu-button:hover {
		border-color: var(--link-color);
		color: var(--link-color);
	}
</style>
