<script lang="ts">
	import { page } from '$app/stores';

	$: isActive = $page.url.pathname === $$props.href;

	export let href: string;
</script>

<a
	class="m-0 inline-block rounded-lg p-0 leading-none tracking-wider transition-all md:mx-2 md:px-3 md:py-2"
	class:active={isActive}
	{href}
	><span class="leading-4"><slot /> </span>
</a>

<style lang="postcss">
	a {
		font-size: 1.8rem;
		color: var(--white-shade2);
		border-radius: 0;
	}
	a:hover,
	a.active,
	a.active:hover {
		color: var(--accent-color);
	}

	@media (min-width: 768px) {
		a {
			font-size: 1.1rem;
		}
		a.active {
			border-bottom: 1px solid var(--accent-color);
		}
	}
</style>
