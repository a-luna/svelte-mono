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
			font-family: 'Noto Sans', Inter, Arial, Helvetica, sans-serif;
			font-size: 1.1rem;
			font-weight: 500;
			padding: 0;
			text-align: center;
			padding: 12px 0;
			background-color: var(--page-bg-color);
			border-bottom: 1px solid var(--page-bg-color);
			transition: border-color 0.5s, color 0.5s;
		}

		a.home.active {
			color: hsl(76 100% 50%);
			color: oklch(92.22% 0.244 126.84);
		}

		a.home.active,
		a.home.active:hover {
			border-bottom: 1.5px solid hsl(76 100% 50%);
			border-bottom: 1.5px solid oklch(92.22% 0.244 126.84);
		}

		a.blog.active {
			color: hsl(173.22 100% 65%);
			color: oklch(90.73% 0.159 184.005);
		}

		a.blog.active,
		a.blog.active:hover {
			border-bottom: 1px solid hsl(173.22 100% 65%);
			border-bottom: 1px solid oklch(90.73% 0.159 184.005);
		}

		a.projects.active {
			color: hsl(161.67 100% 49%);
			color: oklch(86.7% 0.257 162.2);
		}

		a.projects.active,
		a.projects.active:hover {
			border-bottom: 1px solid hsl(161.67 100% 49%);
			border-bottom: 1px solid oklch(86.7% 0.257 162.2);
		}

		a.about.active {
			color: hsl(31.45 100% 60%);
			color: oklch(78% 0.203 62.72);
		}

		a.about.active,
		a.about.active:hover {
			border-bottom: 1px solid hsl(31.45 100% 60%);
			border-bottom: 1px solid oklch(78% 0.203 62.72);
		}

		a:hover {
			background-color: var(--page-bg-color);
		}
	}
</style>
