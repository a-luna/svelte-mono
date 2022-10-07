<script lang="ts">
	import Code from '$lib/components/Icons/Code.svelte';
	import Handshake from '$lib/components/Icons/Handshake.svelte';
	import Keyboard from '$lib/components/Icons/Keyboard.svelte';
	import { SITE_TITLE } from '$lib/siteConfig';
</script>

<svelte:head>
	<title>About Me | {SITE_TITLE}</title>
	<meta name="description" content={`About Me`} />
</svelte:head>

<div class="about-me-bullets prose prose-invert">
	<div class="bullet"><Keyboard /></div>
	<span
		>I am a software engineer living and working in Reno, NV. I enjoy music and sports (especially
		baseball and basketball) and I am especially interested in the changing landscape of legalized
		gambling on sporting events.</span
	>
	<div class="bullet"><Code /></div>
	<span
		>I have 10+ years of experience developing software, starting out as a <strong>C#</strong>
		programmer before moving to web development in 2016. Whenever possible, I prefer to work with vanilla
		<strong>JavaScript (ES5/6)</strong>,
		<strong>HTML</strong>
		and
		<strong>CSS</strong>. However, I am comfortable working with JavaScript frameworks such as
		<strong>AngularJS</strong>, <strong>React</strong>, and
		<strong>Svelte</strong>.
		<span
			>Recently, I dove head-first into the world of static-site generators (aka the <strong
				>JAMStack</strong
			>), creating sites with <strong>Hugo</strong>
			and <strong>Gatsby</strong>. I have migrated Wordpress sites to Gatsby, created entirely new
			sites with <strong>Contentful</strong>/<strong>Sanity</strong>
			and deployed static-sites to <strong>AWS</strong>,
			<strong>Netlify</strong>
			and <strong>Github</strong>. I also have extensive experience developing web applications with
			<strong>Flask</strong>
			and
			<strong>SQLAlchemy</strong>.</span
		></span
	>
	<div class="bullet"><Handshake /></div>
	<span
		>I am always interested in hearing about new opportunities and taking on new projects, feel free
		to contact me
		<a href="mailto:contact@aaronluna.dev" target="_blank">via email</a>,
		<a href="https://www.linkedin.com/in/aaron-luna-reno-nv/" target="_blank">LinkedIn</a>
		or <a href="https://twitter.com/alunablog/" target="_blank">Twitter</a>. You can take a look at
		my
		<a href="https://github.com/a-luna" target="_blank">github profile</a> to see my personal projects.</span
	>
</div>

<style lang="postcss">
	.about-me-bullets {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(3, auto);
		row-gap: 1.5rem;
		column-gap: 1rem;
		margin: 0 auto;
		line-height: 1.6;
	}
	.bullet {
		width: 25px;
		margin: 4px 0 0 0;
	}
</style>
