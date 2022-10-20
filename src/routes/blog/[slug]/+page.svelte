<script lang="ts">
	import CoverImage from '$lib/components/BlogPost/CoverImage.svelte';
	import TableOfContents from '$lib/components/BlogPost/TableOfContents/TableOfContents.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import Reactions from '$lib/components/Reactions.svelte';
	import { GH_USER, MY_TWITTER_HANDLE, SITE_URL } from '$lib/siteConfig';
	import type { BlogPost, Result } from '$lib/types';
	import { formatDateString } from '$lib/util';
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
	<meta
		name="twitter:card"
		content={blogPost?.coverImage.src ? 'summary_large_image' : 'summary'}
	/>
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={blogPost?.title} />
	<meta name="twitter:description" content={blogPost?.description} />
	{#if blogPost?.coverImage}
		<meta property="og:image" content={blogPost.coverImage.src} />
		<meta name="twitter:image" content={blogPost.coverImage.src} />
	{/if}
</svelte:head>

<article
	class="mx-auto mb-16 mt-8 flex w-full max-w-2xl flex-col items-start justify-center px-4 sm:px-8"
>
	<h1>{blogPost?.title}</h1>
	<div class="bg mtd-6 mt-4 flex w-full justify-between sm:flex-row sm:items-center">
		<p class="flex items-center">{GH_USER}</p>
		<p class="min-w-32 flex items-center text-gray-600 dark:text-gray-400 md:mt-0">
			{#if blogPost?.ghMetadata?.issueUrl}
				<a href={blogPost.ghMetadata.issueUrl} rel="external" class="no-underline" target="_blank">
					<span class="mr-4 font-mono text-xs text-gray-700 text-opacity-70 dark:text-gray-300"
						>{blogPost.ghMetadata?.reactions?.total_count} reactions</span
					>
				</a>
			{/if}
			{formatDateString(published)}
		</p>
	</div>
	<CoverImage coverImage={blogPost.coverImage} />
	<div class="gradient -mx-4 my-4 flex h-1 w-[100vw] sm:mx-0 sm:w-full" />
	{#if blogPost.hasToc && blogPost.toc}
		<TableOfContents toc={blogPost.toc} />
	{/if}
	<div
		class="prose prose-invert mb-8 w-full max-w-none prose-headings:m-0 prose-headings:flex-1 prose-headings:font-normal prose-headings:leading-none prose-figure:mx-auto prose-figure:mb-4 prose-strong:inline prose-video:mx-auto prose-video:my-0"
	>
		{@html blogPost?.content}
	</div>
</article>
<div class="mx-auto max-w-2xl">
	<div class="prose mb-12 border-t border-b border-blue-800 p-4 dark:prose-invert">
		{#if blogPost?.ghMetadata?.reactions?.total_count > 0}
			Reactions: <Reactions
				issueUrl={blogPost.ghMetadata?.issueUrl}
				reactions={blogPost.ghMetadata?.reactions}
			/>
		{:else}
			<a href={blogPost?.ghMetadata?.issueUrl}>Leave a reaction </a>
			if you liked this post! 🧡
		{/if}
	</div>
	<div class="mb-8">
		<Comments ghMetadata={blogPost?.ghMetadata} />
	</div>
</div>

<style lang="postcss">
	h1 {
		font-size: 1.9rem;
		font-weight: 400;
		line-height: 1.2;
		color: var(--tw-prose-headings);
	}
</style>
