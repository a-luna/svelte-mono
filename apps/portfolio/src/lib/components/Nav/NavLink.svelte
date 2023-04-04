<script lang="ts">
	import { page } from '$app/stores';

	$: isActive = $page.url.pathname === $$props.href;

	export let href: string;
</script>

<a class:active={isActive} {href} on:click><span class="leading-4"><slot /> </span> </a>

<style lang="postcss">
	a {
		font-size: 1.8rem;
		color: var(--white-shade2);
		background-color: var(--black-tint2);
		border-radius: 0;
		transition: color 0.3s, background-color 0.3s;
		line-height: 1;
		letter-spacing: 1.5px;
	}

	a:hover {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
		background-color: var(--black-tint2);
	}

	a.active,
	a.active:hover {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
	}

	@media (min-width: 768px) {
		a {
			font-size: 1rem;
			padding: 0;
			width: 80px;
			text-align: center;
			padding: 0 0 10px 0;
			background-color: var(--page-bg-color);
			border-bottom: 2px solid var(--page-bg-color);
			transition: border-color 0.5s, color 0.5s;
		}

		a:hover {
			color: hsl(76 100% 50%);
			color: oklch(92.22% 0.244 126.84);
			background-color: var(--page-bg-color);
		}
		a.active,
		a.active:hover {
			border-bottom: 2px solid hsl(76 100% 50%);
			border-bottom: 2px solid oklch(92.22% 0.244 126.84);
		}
	}
</style>
