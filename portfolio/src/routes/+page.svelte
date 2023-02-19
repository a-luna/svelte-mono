<script lang="ts">
	import Mandala from '$lib/components/Mandala.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { DEFAULT_OG_IMAGE, MY_TWITTER_HANDLE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '$lib/siteConfig';
</script>

<svelte:head>
	<title>Welcome! | {SITE_TITLE}</title>
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
	<div class="intro-content">
		<SectionLayout section={'home'} title={'Hello'}>
			<p class="subheading"><span>I'm a full-stack developer from Reno, NV.</span></p>
			<p class="normal-text">
				The projects listed below range from REST APIs and CLI apps on the backend to component libraries and web
				applications on the frontend.
			</p>
			<p class="normal-text">The list is filterable by language/technology used and project type.</p>
			<p class="normal-text"><a href="series/flask-api-tutorial/overview">Flask API Tutorial</a></p>
		</SectionLayout>
	</div>
	<Mandala />
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

	.subheading {
		color: var(--accent-color);
		padding: 0.25rem;
		font-size: 1.3rem;
		font-weight: 500;
		line-height: 1;
	}
	.intro-content .normal-text {
		font-size: 0.9rem;
		margin: 1.5rem 0 0 0;
	}

	@media (min-width: 640px) {
		.intro {
			padding: 0;
		}
		.subheading {
			font-size: 1.4rem;
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
