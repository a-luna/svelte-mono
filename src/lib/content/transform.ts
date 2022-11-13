import {
	colorizeToxResults,
	convertInfoBoxes,
	convertLinkedImages,
	convertVideos,
	convertWarningBoxes,
	FA_BULLET_LIST_REGEX,
	generateTableOfContents,
	identifyCodeBlocks,
	transformCodeBlocks,
	transformFaBulletLists,
	transformHeadings
} from '$lib/content';
import { highlighter, parseMeta } from '$lib/shiki';
import type { BlogPost, CodeBlock, ResourceMap, TocSection, TutorialSection } from '$lib/types';
import remarkShiki from '@stefanprobst/remark-shiki';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const markdownToHtmlProcessor = unified()
	.use(remarkParse)
	.use(remarkShiki, { highlighter, parseMeta })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeSlug)
	.use(rehypeFormat)
	.use(rehypeStringify);

async function convertMarkdownToHtml(content: string, resources: ResourceMap): Promise<string> {
	let markdown = convertLinkedImages(content, resources);
	markdown = await convertInfoBoxes(markdown);
	markdown = await convertWarningBoxes(markdown);
	markdown = convertVideos(markdown, resources);
	const html = await markdownToHtmlProcessor.process(markdown.trim());
	return String(html).trim();
}

function transformHtml(html: string, codeBlocks: CodeBlock[]): string {
	let content = transformHeadings(html);
	content = transformCodeBlocks(content, codeBlocks);
	if (FA_BULLET_LIST_REGEX.test(html)) {
		content = transformFaBulletLists(content);
	}
	return colorizeToxResults(content);
}

export async function convertContentToHtml(blogPost: BlogPost): Promise<BlogPost | TutorialSection> {
	const codeBlocks = identifyCodeBlocks(blogPost.content);
	let html = await convertMarkdownToHtml(blogPost.content, blogPost.resources);

	let toc: TocSection[] = [];
	if (blogPost.hasToc) {
		toc = generateTableOfContents(html);
	}
	html = transformHtml(html, codeBlocks);
	return { ...blogPost, content: html, codeBlocks, toc };
}
