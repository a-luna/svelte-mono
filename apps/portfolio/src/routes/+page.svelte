<script lang="ts">
	import { browser } from '$app/environment';
	import Mandala from '$lib/components/Mandala.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { DEFAULT_OG_IMAGE, MY_TWITTER_HANDLE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import { initialFadePerformed } from '$lib/stores';
	import { ColorParser, SocialIconRenderer } from '@a-luna/shared-ui';
	import { onMount } from 'svelte';

	const test = [
		// Hex
		'#ee89aa', // 0
		'#7ac600', // 1
		'#004', // 2
		'#e0cc', // 3
		'#01e1ec', // 4
		'#79eb0082', // 5
		'#E0CC', // 6
		'#01E1EC', // 7
		'#79EB0082', // 8
		// HSL
		'hsl(309, 100%, 46%)', // 9
		'hsl(309deg,100%,46%)', // 10
		'hsl(5.39rad, 100%, 46%)', // 11
		'hsl(0.86turn,100%,46%)', // 12
		'hsla(309,100%,46%,73%)', // 13
		'hsla(309deg, 100%, 46%, 0.73)', // 14
		'hsla(5.39rad,100%,46%,73%)', // 15
		'hsla(0.86turn, 100%, 46%, 0.73)', // 16
		'hsl(309 100% 46%)', // 17
		'hsl(309deg 100% 46%)', // 18
		'hsl(5.39rad 100% 46%)', // 19
		'hsl(0.86turn 100% 46%)', // 20
		'hsla(309 100% 46% / 73%)', // 21
		'hsla(309deg 100% 46% / 0.73)', // 22
		'hsla(5.39rad 100% 46% / 73%)', // 23
		'hsla(309 100% 46% / 73%)', // 24
		'hsl(309deg 100% 46% / 0.73)', // 25
		'hsl(5.39rad 100% 46% / 73%)', // 26
		'hsl(0.86turn 100% 46% / 0.73)', // 27
		'hsl(309,100%,46%,73%)', // 28
		'hsl(309deg, 100%, 46%, 0.73)', // 29
		'hsl(5.39rad,100%,46%,73%)', // 30
		'hsl(0.86turn, 100%, 46%, 0.73)', // 31
		'hsl(1.0708rad 63.5% 26.9% / .47)', // 32
		'hsl(125deg 83.15% 58.79% / 0.47)', // 33
		// RGB
		'rgb(1, 225, 236)', // 34
		'rgb(47%, 92%, 0%)', // 35
		'rgba(1,225,236,0.51)', // 36
		'rgba(47%,92%,0%,80%)', // 37
		'rgba(47%,92%,0%,0.8)', // 38
		'rgb(1,225,236,0.51)', // 39
		'rgb(47%,92%,0%,80%)', // 40
		'rgb(47%,92%,0%,0.8)', // 41
		'rgb(0% 0% 27%)', // 42
		'rgb(238 0 204)', // 43
		'rgba(1 225 236 / 0.51)', // 44
		'rgba(47% 92% 0% / 80%)', // 45
		'rgba(47% 92% 0% / 0.8)', // 46
		'rgb(1 225 236 / 0.51)', // 47
		'rgb(47% 92% 0% / 80%)', // 48
		'rgb(47% 92% 0% / 0.8)', // 49
		// Named Colors
		'PeachPuff', // 50
		'peach puff', // 51
		'Midnight_blue', // 52
		'chartreuse', // 53
		// OKLCH
		'oklch(55% 0.092 317)', // 54
		'oklch(55% 23% 317)', // 55
		'oklch(55% 0.092 0.88turn / 1)', // 56
		'oklch(.55 23% 5.53269rad / 1)', // 57
		'oklch(59.69% 0.0624 49.77 / .5)', // 58
		'oklch(0.5969 15.6% 49.77deg / 50%)', // 59
		'oklch(0.6 0.112 4.71239rad)', // 60
		'oklch(0.6 28% 270deg)', // 61
		'oklch(60.0% 28.0% 0.75turn)', // 62
		'oklch(88.7% 0.062 .25turn / 50%)', // 63
		'oklch(29% 0 0 / 85%)', // 64
		'oklch(0 1 1 / 46.21%)', // 65
		'oklch(1 1 20deg / 0)', // 66
		// LCH
		'lch(46% 33 317)', // 67
		'lch(46% 22% 317)', // 68
		'lch(46% 33 0.88turn / 1)', // 69
		'lch(46 22% 5.53269rad / 1)', // 70
		'lch(52.92% 24.25 52.86 / .5)', // 71
		'lch(52.92 16.67% 52.86deg / 50%)', // 72
		'lch(52.61 40.94 4.88186rad)', // 73
		'lch(52.61 27.29% 279.71deg)', // 74
		'lch(52.61% 27.29% 0.776972turn)', // 75
		'lch(88.7% 0.062 .25turn / 50%)', // 76
		'lch(18% 0 224 / 85%)', // 77
		'lch(0 1 1 / 0.4621)', // 78
		'lch(1 1 20deg / 0)', // 79
		// LAB
		'lab(29.2345% 39.3825 20.0664)', // 80
		'lab(52.2345% 40.1645 59.9971)', // 81
		'lab(52.2345% 40.1645 59.9971 / .5)', // 82
		'lab(72.58% -48.24 72.19)', // 83

		// OKLAB
		'oklab(40.1% 0.1143 0.045)', // 84
		'oklab(59.69% 0.1007 0.1191)', // 85
		'oklab(59.69% 0.1007 0.1191 / 0.5)', // 86
		'oklab(74.76% -0.138 0.154)', // 87
	];

	let mounted = false;
	$: if (browser) {
		console.log({ results: test.map((t) => ColorParser.parse(t)) });
	}

	onMount(() => {
		mounted = true;
		setTimeout(() => ($initialFadePerformed = true), 1000);
	});
</script>

<svelte:head>
	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<div class="intro">
	<div class="intro-content prose prose-invert">
		{#if mounted}
			<SectionLayout section={'home'} title={'Home'}>
				<p class="normal-text">
					<span>My name is Aaron Luna and I am a full-stack developer from Reno, NV, USA.</span>
				</p>
				<p class="normal-text">
					<span
						>This site contains information about me and blog posts that document problems I encountered working on
						various projects and the solutions that I implemented.</span
					>
				</p>
				<p class="normal-text">
					<span
						>Many of these projects are hosted on my Github account, and you can find more info about each on this site
						as well.</span
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
				<p class="normal-text">
					<span
						><a href="series/flask-api-tutorial/overview" target="_blank" rel="noreferrer">Flask API Tutorial</a></span
					>
				</p>
			</SectionLayout>
		{/if}
	</div>
	{#if $initialFadePerformed}
		<Mandala />
	{/if}
</div>

<style lang="postcss">
	.intro {
		background: var(--page-bg-color);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 100%;
		max-height: 365px;
		margin: 0 auto;
	}
	.intro-content {
		font-family: 'Roboto Mono', menlo, consolas, monospace;
		margin: 0 auto;
		z-index: 2;
		position: relative;
		max-width: var(--max-width);
		grid-column: 1;
		grid-row: 1;
		padding: 0;
	}
	.normal-text a.icon,
	.normal-text a.icon:hover {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
		background-color: var(--page-bg-color);
	}
	.normal-text span {
		color: var(--white-shade2);
	}
	.normal-text :global(.icon-wrapper) {
		display: inline;
	}
	.intro-content .normal-text {
		font-size: 0.9rem;
		margin: 1.5rem 0 0 0;
	}

	@media (min-width: 640px) {
		.intro {
			padding: 0;
		}
		.intro-content .normal-text {
			font-size: 1rem;
		}
	}

	@media (min-width: 768px) {
		.intro {
			padding: 0;
		}
	}

	@media (min-width: 1024px) {
		.intro {
			max-height: 450px;
		}
	}
</style>
