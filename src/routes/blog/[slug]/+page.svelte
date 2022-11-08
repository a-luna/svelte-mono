<script lang="ts">
	import CoverImage from '$lib/components/BlogPost/CoverImage.svelte';
	import PostNav from '$lib/components/BlogPost/PostNav.svelte';
	import ByLine from '$lib/components/ByLine.svelte';
	import TableOfContents from '$lib/components/TableOfContents/TableOfContents.svelte';
	import { MY_TWITTER_HANDLE, SITE_URL } from '$lib/siteConfig';
	import type { BlogPost, Result } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let pageLoaded = false;
	let buttonsEnabled = false;
	let blogPost: BlogPost;

	$: blogPost = data.blogPost;
	$: published = blogPost?.date ? new Date(blogPost.date) : new Date(0);
	$: if (pageLoaded && !buttonsEnabled) enableCopyCodeButtons();

	async function copyCodeToClipboard(codeToCopy: string, button: HTMLElement) {
		let resultClass: string;
		try {
			let result = await copyToClipboard(codeToCopy);
			if (!result.success) {
				result = await copyToClipboardSafari(codeToCopy);
			}
			if (!result.success) {
				console.error(`Failed to copy: ${result.error}`);
			}
			resultClass = result.success ? 'success' : 'error';
		} catch (err) {
			console.error(`Failed to copy: ${err}`);
			resultClass = 'error';
		}
		toggleClass(button.parentNode as HTMLElement, resultClass);
	}
	async function copyToClipboard(text: string): Promise<Result> {
		if (typeof window !== 'undefined') {
			await navigator.clipboard.writeText(text);
			return { success: true };
		}
		return { success: false, error: 'Error! Failed to copy text to clipboard.' };
	}

	async function copyToClipboardSafari(textToCopy: string): Promise<Result> {
		if (typeof ClipboardItem && navigator.clipboard.write) {
			const clipboardItem = new ClipboardItem({
				'text/plain': new Promise((r) => setTimeout(r, 10)).then(() => {
					return new Promise(async (resolve) => {
						resolve(new Blob([textToCopy]));
					});
				})
			});
			navigator.clipboard.write([clipboardItem]);
			return { success: true };
		} else {
			return { success: false, error: 'Error! Failed to copy text to clipboard.' };
		}
	}

	function toggleClass(element: HTMLElement | null, className: string) {
		if (element) {
			element.blur();
			element.classList.add(className);
			setTimeout(function () {
				element.classList.remove(className);
			}, 2000);
		}
	}

	function enableCopyCodeButtons() {
		document.querySelectorAll<HTMLElement>('[data-code-block-id]').forEach((e) => {
			const codeBlockId = e.dataset.codeBlockId;
			const codeToCopy = document.querySelector<HTMLElement>(`#${codeBlockId}`)?.innerText ?? '';
			e.addEventListener('click', () => copyCodeToClipboard(codeToCopy, e));
		});
		buttonsEnabled = true;
	}

	onMount(() => (pageLoaded = true));
</script>

<svelte:head>
	<title>{blogPost?.title}</title>
	<meta name="description" content="swyxkit blog" />

	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={blogPost?.title} />
	<meta name="Description" content={blogPost?.description} />
	<meta property="og:description" content={blogPost?.description} />
	<meta name="twitter:card" content={blogPost?.coverImage.src ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={blogPost?.title} />
	<meta name="twitter:description" content={blogPost?.description} />
	{#if blogPost?.coverImage}
		<meta property="og:image" content={blogPost.coverImage.src} />
		<meta name="twitter:image" content={blogPost.coverImage.src} />
	{/if}
</svelte:head>

<article class="blog">
	<h1>{blogPost?.title}</h1>
	<ByLine {published} />
	<CoverImage slug={blogPost.slug} caption={blogPost.coverImage?.caption ?? ''} />
	{#if blogPost.hasToc && blogPost.toc}
		<TableOfContents toc={blogPost.toc} />
	{:else}
		<div class="gradient -mx-4 mt-4 mb-8 flex h-1 w-[100vw] sm:mx-0 sm:w-full" />
	{/if}
	<div
		class="prose prose-invert mb-8 w-full max-w-none prose-headings:m-0 prose-headings:flex-1 prose-headings:font-normal prose-headings:leading-none prose-figure:mx-auto prose-figure:mb-4 prose-strong:inline prose-video:mx-auto prose-video:my-0"
	>
		{@html blogPost?.content}
	</div>
	<PostNav slug={blogPost.slug} />
</article>

<style lang="postcss">
	article {
		display: flex;
		flex-flow: column nowrap;
		padding: 0 1.5rem;
		margin: 1rem auto;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		max-width: var(--max-width);
	}
	h1 {
		font-size: 2rem;
		font-weight: 500;
		line-height: 1.2;
		color: var(--post-title-text-color);
		-webkit-text-fill-color: var(--post-title-text-color);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: var(--post-title-text-stroke);
		line-height: 1.3;
		/* text-shadow: 2px 2px var(--post-title-text-shadow-color),
			1.75px 1.75px var(--post-title-text-shadow-color),
			1.5px 1.5px var(--post-title-text-shadow-color),
			1.25px 1.25px var(--post-title-text-shadow-color), 1px 1px var(--post-title-text-shadow-color),
			0.75px 0.75px var(--post-title-text-shadow-color),
			0.5px 0.5px var(--post-title-text-shadow-color),
			0.25px 0.25px var(--post-title-text-shadow-color); */
	}
	@media (min-width: 640px) {
		article {
			padding: 0 2rem;
		}
		h1 {
			font-size: 2.25rem;
		}
	}
	@media (min-width: 640px) {
		article {
			padding: 0 1.5rem;
		}
	}
	@media (min-width: 768px) {
		article {
			margin: 2rem auto;
			padding: 0;
		}
	}
</style>
