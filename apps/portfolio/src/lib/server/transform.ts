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
} from '$lib/server';
import { highlighter, parseMeta } from '$lib/shiki';
import { SITE_URL } from '$lib/siteConfig';
import type {
	BlogPost,
	CodeBlock,
	ProjectReadme,
	RepoWithMetaData,
	ResourceMap,
	TocSection,
	TutorialSection,
} from '$lib/types';
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

export async function convertReadmeToHtml(markdown: string, repo: RepoWithMetaData): Promise<ProjectReadme> {
	const readme = initializeReadme(repo);
	const codeBlocks = identifyCodeBlocks(markdown);
	const htmlFile = await markdownToHtmlProcessor.process(markdown.trim());
	const html = String(htmlFile).trim();
	const title = extractPageTitle(html) || repo.name;

	let toc: TocSection[] = [];
	if (readmeHasToc(html)) {
		toc = generateTableOfContents(html);
	}
	let content = transformHeadings(html);
	content = transformCodeBlocks(content, codeBlocks);
	return { ...readme, title, content, codeBlocks, toc };
}

function initializeReadme(repo: RepoWithMetaData): ProjectReadme {
	const href = `projects/${repo.name}`;
	return {
		content: '',
		title: repo.name,
		description: repo.description,
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
	title?.trim();
	return title;
}
