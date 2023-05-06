<script lang="ts">
	import { SocialIconRenderer } from '@a-luna/shared-ui';
</script>

<div>
	<h2 class="underline--magical">About Me</h2>
	<p class="normal-text">
		<span>My name is Aaron Luna and I am a full-stack developer from Reno, NV, USA.</span>
	</p>
	<p class="normal-text">
		<span
			>This site contains information about me and blog posts that document problems I encountered working on various
			projects and the solutions that I implemented.</span
		>
	</p>
	<p class="normal-text">
		<span
			>Many of these projects are hosted on my Github account, and you can find more info about each on this site as
			well.</span
		>
	</p>
	<p class="normal-text">
		<span
			>You can contact me through <a href="http://github.com/a-luna" class="icon" target="_blank" rel="noreferrer"
				><SocialIconRenderer icon={'github'} title={'Link to my Github profile'} /></a
			>,
			<a href="https://www.linkedin.com/in/aaron-luna-reno-nv/" class="icon" target="_blank" rel="noreferrer"
				><SocialIconRenderer icon={'linkedinsquare'} title={'Link to my LinkedIn profile'} /></a
			>
			or
			<a href="https://twitter.com/aaronlunadev/" class="icon" target="_blank" rel="noreferrer"
				><SocialIconRenderer icon={'twitter'} title={'Link to my Twitter profile'} /></a
			>, or email me at
			<a href="mailto:contact@aaronluna.dev">contact@aaronluna.dev</a></span
		>
	</p>
</div>

<style lang="postcss">
	h2 {
		margin: 2rem 0 1.5rem 0;
	}
	.normal-text {
		font-size: 0.9rem;
		margin: 1.5rem 0 0 0;
	}
	.normal-text a.icon,
	.normal-text a.icon:hover {
		display: inline-block;
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
		background-color: hsl(0 0% 0% / 0.4);
		height: 16px;
	}
	.normal-text span {
		color: var(--white-shade2);
		background-color: hsl(0 0% 0% / 0.4);
		font-weight: 400;
	}
	.normal-text :global(.icon-wrapper) {
		display: inline;
	}

	@media (min-width: 640px) {
		.normal-text {
			font-size: 1rem;
		}
		.normal-text a.icon,
		.normal-text a.icon:hover {
			height: 16px;
		}
	}

	@media (min-width: 768px) {
		.normal-text {
			font-size: 1rem;
		}
		.normal-text a.icon,
		.normal-text a.icon:hover {
			height: 19.5px;
		}
	}
</style>
