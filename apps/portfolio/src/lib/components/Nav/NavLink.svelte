<script lang="ts">
	import { page } from '$app/stores';

	$: isActive = $page.url.pathname === $$props.href;

	export let href: string;
</script>

<a
	class:active={isActive}
	{href}
	on:click
	><span class="leading-4"><slot /> </span>
</a>

<style lang="postcss">
	a {
		font-size: 1.8rem;
		color: var(--white-shade2);
		background-color: var(--page-bg-color);
		border-radius: 0;
		transition: color 0.3s, background-color 0.3s;
		line-height: 1;
		letter-spacing: 1.5px;
		place-self: center;
	}

	a:hover {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
		background-color: var(--page-bg-color);
	}

	a.active,
	a.active:hover {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
	}

	@media (min-width: 768px) {
		a {
			font-size: 1.1rem;
		}
		a.active,
		a.active:hover {
			color: var(--page-bg-color);
			background-color: hsl(76 100% 50%);
			background-color: oklch(92.22% 0.244 126.84);
		}
	}
</style>
