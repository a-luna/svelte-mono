<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	$: isActive = $page.url.pathname === $$props.href;
	$: section = href === '/' ? 'home' : href.slice(1);
</script>

<a class:active={isActive} class={section} {href} on:click>{section}</a>

<style lang="postcss">
	a {
		font-size: 1.8rem;
		color: var(--white-shade2);
		background-color: var(--black-tint2);
		border-radius: 0;
		line-height: 1;
		letter-spacing: 1.5px;
	}

	a:hover {
		color: var(--link-color);
	}

	a.active,
	a.active:hover {
		color: var(--link-color);
	}

	@media (min-width: 768px) {
		a {
			font-size: 1.1rem;
			font-weight: 400;
			padding: 0;
			text-align: center;
			padding: 12px 0;
			background-color: var(--page-bg-color);
			border-bottom: 1px solid var(--page-bg-color);
		}

		a:hover {
			background-color: var(--page-bg-color);
		}

		a.active,
		a.active:hover {
			color: var(--white-shade2);
			border-bottom: 1.5px solid var(--white-shade2);
		}
	}
</style>
