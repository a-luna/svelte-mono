<script lang="ts">
	import Codepen from '$lib/components/Icons/Social/Codepen.svelte';
	import Email from '$lib/components/Icons/Social/Email.svelte';
	import Github from '$lib/components/Icons/Social/Github.svelte';
	import LinkedIn from '$lib/components/Icons/Social/LinkedIn.svelte';
	import Twitter from '$lib/components/Icons/Social/Twitter.svelte';

	export let mobile = false;
	export let open = false;
</script>

<div class:mobile={mobile && open} class:desktop={!mobile} class="social">
	<a href="http://github.com/a-luna"><Github title={'Link to my Github profile'} /></a>
	<a href="https://www.linkedin.com/in/aaron-luna-reno-nv/"
		><LinkedIn title={'Link to my LinkedIn profile'} /></a
	>
	<a href="https://twitter.com/aaronlunadev/"><Twitter title={'Link to my Twitter profile'} /></a>
	<a href="https://codepen.io/a-luna/"><Codepen title={'Link to my Codepen profile'} /></a>
	<a href="mailto:contact@aaronluna.dev"><Email title={'Link to send me an email'} /></a>
</div>

<style lang="postcss">
	.social {
		flex-flow: row nowrap;
		align-items: center;
		gap: 1.25rem;
		padding: 0.5rem;
		background-color: var(--cmd-purple2);
	}
	.desktop {
		display: none;
	}
	.mobile {
		display: flex;
		justify-content: flex-start;
		width: min-content;
	}
	a {
		color: var(--page-bg-color);
		text-decoration: none;
		width: 1.7rem;
	}
	a:hover,
	a:focus,
	a:active,
	a:active:focus {
		color: var(--page-bg-color);
		text-decoration: none;
	}

	@media (min-width: 768px) {
		.desktop {
			display: flex;
			justify-content: center;
		}
		.mobile {
			display: none;
		}
		a {
			width: 18px;
		}
	}
</style>
