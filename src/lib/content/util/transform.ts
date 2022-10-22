import {
	colorizeToxResults,
	convertAlertBoxes,
	convertInfoBoxes,
	convertLinkedImages,
	convertVideos,
	generateTableOfContents,
	identifyCodeBlocks,
	transformCodeBlocks,
	transformHeadings
} from '$lib/content';
import { highlighter, parseMeta } from '$lib/shiki';
import type { BlogPost, TocSection } from '$lib/types';
import remarkShiki from '@stefanprobst/remark-shiki';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

async function markdownConversions(blogPost: BlogPost): Promise<string> {
	let convertedMarkdown = convertLinkedImages(blogPost.content, blogPost.images);
	convertedMarkdown = await convertInfoBoxes(convertedMarkdown);
	convertedMarkdown = await convertAlertBoxes(convertedMarkdown);
	return convertVideos(convertedMarkdown);
}

function htmlConversions(html: string, blogPost: BlogPost): string {
	let convertedHtml = transformHeadings(html);
	convertedHtml = transformCodeBlocks(convertedHtml, blogPost?.codeBlocks || []);
	return colorizeToxResults(convertedHtml);
}

export async function convertContentToHtml(blogPost: BlogPost): Promise<BlogPost> {
	blogPost.codeBlocks = identifyCodeBlocks(blogPost.content);
	let content = await markdownConversions(blogPost);
	const html = await unified()
		.use(remarkParse)
		.use(remarkShiki, { highlighter, parseMeta })
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeSlug)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(content.trim());
	content = String(html).trim();

	let toc: TocSection[] = [];
	if (blogPost.hasToc) {
		toc = generateTableOfContents(content);
	}
	content = htmlConversions(content, blogPost);
	return { ...blogPost, content, toc };
}
