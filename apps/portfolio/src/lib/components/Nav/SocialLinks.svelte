<script lang="ts">
	import { BasicIconRenderer, SocialIconRenderer } from '@a-luna/shared-ui';

	export let mobile = false;
	export let open = false;
</script>

<div class:mobile={mobile && open} class:desktop={!mobile} class="social">
	<a href="http://github.com/a-luna" target="_blank" rel="noreferrer">
		<SocialIconRenderer icon={'github'} title={'Link to my Github profile'} />
	</a>
	<a href="https://www.linkedin.com/in/aaron-luna-reno-nv/" target="_blank" rel="noreferrer">
		<SocialIconRenderer icon={'linkedin'} title={'Link to my LinkedIn profile'} />
	</a>
	<a href="https://twitter.com/aaronlunadev/" target="_blank" rel="noreferrer">
		<SocialIconRenderer icon={'twitter'} title={'Link to my Twitter profile'} />
	</a>
	<a href="https://codepen.io/a-luna/" target="_blank" rel="noreferrer">
		<SocialIconRenderer icon={'codepen'} title={'Link to my Codepen profile'} />
	</a>
	<a href="mailto:contact@aaronluna.dev" target="_blank" rel="noreferrer" title={'Link to send me an email'}>
		<BasicIconRenderer icon={'email'} />
	</a>
</div>

<style lang="postcss">
	.social {
		flex-flow: row nowrap;
		align-items: center;
		gap: 1.25rem;
		padding: 0.5rem 1rem;
		background-color: hsl(261, 100%, 55%);
		background-color: oklch(51.8% 0.304 286.07);
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
