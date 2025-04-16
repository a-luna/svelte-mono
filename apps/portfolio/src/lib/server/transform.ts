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
	transformHeadings,
	transformLockIcons,
	transformUnlockIcons,
} from '$lib/server';
import { highlighter, parseMeta } from '$lib/shiki';
import { SITE_URL } from '$lib/siteConfig';
import type { BlogPost, CodeBlock, ProjectReadme, RepoWithMetaData, ResourceMap, TutorialSection } from '$lib/types';
import remarkShiki from '@stefanprobst/remark-shiki';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const markdownToHtmlProcessor = unified()
	.use(remarkParse)
	.use(remarkGfm)
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
	content = transformLockIcons(content);
	content = transformUnlockIcons(content);
	if (FA_BULLET_LIST_REGEX.test(html)) {
		content = transformFaBulletLists(content);
	}
	return colorizeToxResults(content);
}

export async function convertContentToHtml(blogPost: BlogPost): Promise<BlogPost | TutorialSection> {
	const html = await convertMarkdownToHtml(blogPost.content, blogPost.resources);
	const codeBlocks = identifyCodeBlocks(blogPost.content);
	return {
		...blogPost,
		content: transformHtml(html, codeBlocks),
		codeBlocks,
		toc: blogPost.hasToc ? generateTableOfContents(html) : [],
	};
}

export async function convertReadmeToHtml(markdown: string, repo: RepoWithMetaData): Promise<ProjectReadme> {
	const htmlFile = await markdownToHtmlProcessor.process(markdown.trim());
	const html = String(htmlFile).trim();
	const codeBlocks = identifyCodeBlocks(markdown);
	return {
		...initializeReadme(repo),
		title: extractPageTitle(html) || repo.name,
		toc: readmeHasToc(html) ? generateTableOfContents(html) : [],
		codeBlocks,
		content: transformCodeBlocks(transformHeadings(html), codeBlocks),
	};
}

function initializeReadme(repo: RepoWithMetaData): ProjectReadme {
	const href = `projects/${repo.name}`;
	return {
		content: '',
		title: repo.name,
		description: repo.description,
		toc: [],
		hasToc: true,
		category: repo.primaryCategory,
		language: repo.primaryLanguage,
		categories: repo.categories || ['allCategories'],
		techList: repo.languages || ['allLanguages'],
		slug: repo.name,
		href,
		url: `${SITE_URL}/${href}`,
		date: repo.updatedAt,
		coverImage: {
			name: '',
			src: '',
			caption: '',
		},
		resources: {},
		codeBlocks: [],
		deployedUrl: repo.deployedUrl,
		projectSiteTitle: repo.projectSiteTitle,
	};
}

const readmeHasToc = (html: string): boolean => /<ul class="toc">/m.test(html);

function extractPageTitle(html: string): string | null {
	const matches = [
		...html.matchAll(/<h(?<level>1|2|3|4|5|6) id="(?<slug>[0-9a-z-_]+)">(?<text>.+)<\/(?:h1|h2|h3|h4|h5|h6)>/g),
	];
	let title = null;
	if (matches) {
		title = matches[0]?.groups?.text || null;
		if (title?.includes('<!--')) {
			title = title.slice(0, title.indexOf('<!--'));
		}
	}
	return title?.trim() || null;
}
