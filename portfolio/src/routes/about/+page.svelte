<script lang="ts">
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import Code from '$lib/components/Icons/Code.svelte';
	import Handshake from '$lib/components/Icons/Handshake.svelte';
	import Keyboard from '$lib/components/Icons/Keyboard.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { SITE_TITLE, SITE_URL } from '$lib/siteConfig';
	import type { BlogPost } from '$lib/types';

	const content: BlogPost = {
		type: 'blog',
		content: '',
		title: 'About Me',
		subtitle: '',
		description: '',
		frontmatter: {},
		hasToc: false,
		category: 'allCategories',
		language: 'allLanguages',
		categories: [],
		techList: [],
		canonical: `${SITE_URL}/about`,
		slug: 'about',
		href: `${SITE_URL}/about`,
		url: `${SITE_URL}/about`,
		date: '',
		coverImage: {
			src: `${SITE_URL}/AaronLuna.jpg`,
			name: 'Aaron Luna',
			caption: 'Aaron Luna'
		},
		resources: {}
	};
</script>

<SectionLayout section={'about'} title={'About Me'}>
	<div class="my-photo"><img src="{SITE_URL}/AaronLuna.jpg" alt="" /></div>
	<div class="about-me-bullets prose prose-invert">
		<div class="bullet bullet-1"><Keyboard /></div>
		<span class="about-me-1"
			>I am a software engineer living and working in Reno, NV. I enjoy music and sports (especially baseball and
			basketball) and I am especially interested in the changing landscape of legalized gambling on sporting events.</span
		>
		<div class="bullet bullet-2"><Code /></div>
		<span class="about-me-2"
			>I have 10+ years of experience developing software, starting out as a <strong>C#</strong>
			programmer before moving to web development in 2016. Whenever possible, I prefer to work with vanilla
			<strong>JavaScript (ES5/6)</strong>,
			<strong>HTML</strong>
			and
			<strong>CSS</strong>. However, I am comfortable working with JavaScript frameworks such as
			<strong>AngularJS</strong>, <strong>React</strong>, and
			<strong>Svelte</strong>.
			<span
				>Recently, I dove head-first into the world of static-site generators (aka the <strong>JAMStack</strong>),
				creating sites with <strong>Hugo</strong>
				and <strong>Gatsby</strong>. I have migrated Wordpress sites to Gatsby, created entirely new sites with
				<strong>Contentful</strong>/<strong>Sanity</strong>
				and deployed static-sites to <strong>AWS</strong>,
				<strong>Netlify</strong>
				and <strong>Github</strong>. I also have extensive experience developing web applications with
				<strong>Flask</strong>
				and
				<strong>SQLAlchemy</strong>.</span
			></span
		>
		<div class="bullet bullet-3"><Handshake /></div>
		<span class="about-me-3"
			>I am always interested in hearing about new opportunities and taking on new projects, feel free to contact me
			<a href="mailto:contact@aaronluna.dev" target="_blank" rel="noreferrer">via email</a>,
			<a href="https://www.linkedin.com/in/aaron-luna-reno-nv/" target="_blank" rel="noreferrer">LinkedIn</a>
			or <a href="https://twitter.com/alunablog/" target="_blank" rel="noreferrer">Twitter</a>. You can take a look at
			my
			<a href="https://github.com/a-luna" target="_blank" rel="noreferrer">github profile</a> to see my personal projects.</span
		>
	</div>
</SectionLayout>

<style lang="postcss">
	.about-me-bullets {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(3, auto);
		row-gap: 1.5rem;
		column-gap: 1rem;
		margin: 0 auto;
		line-height: 1.6;
		max-width: var(--max-width);
		padding: 0 1rem;
	}
	.my-photo {
		margin: 1rem auto 2rem auto;
		border-radius: 50%;
		width: 150px;
	}
	.bullet {
		width: 25px;
		margin: 4px 0 0 0;
	}
	.bullet-1 {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}
	.about-me-1 {
		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
	}
	.bullet-2 {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
	.about-me-2 {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
	}
	.bullet-3 {
		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}
	.about-me-3 {
		grid-column: 2 / span 1;
		grid-row: 3 / span 1;
	}
</style>
