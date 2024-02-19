<script lang="ts">
	import { mobileNavOpen } from '$lib/stores';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	let hovering = false;
	let icon: { name: 'close' | 'menu'; size: string };

	$: icon = $mobileNavOpen ? { name: 'close', size: '26px' } : { name: 'menu', size: 'auto' };

	const isTouchPointer = () => matchMedia('(pointer: coarse)').matches;

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (node && event.target instanceof Node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('clickOutside', { detail: event }));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			},
		};
	}
</script>

<button
	aria-label="menu"
	tabindex="0"
	aria-controls="nav-sidebar"
	aria-haspopup="menu"
	aria-expanded={$mobileNavOpen}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click={() => ($mobileNavOpen = !$mobileNavOpen)}
>
	<div
		class="menu-button"
		class:active={isTouchPointer() ? $mobileNavOpen : hovering || $mobileNavOpen}
		use:clickOutside
		on:clickOutside={() => ($mobileNavOpen = false)}
	>
		<BasicIconRenderer icon={icon.name} width={icon.size} height={icon.size} />
	</div>
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
	.active {
		border-color: var(--link-color);
		color: var(--link-color);
	}
</style>
