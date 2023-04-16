import {
	CODE_BLOCK_START_REGEX,
	CODE_FENCE_END_REGEX,
	CODE_FENCE_START_REGEX,
	getSvgIcon,
	INFO_BOX_REGEX,
	LINKED_IMAGE_REGEX,
	VIDEO_REGEX,
	WARNING_BOX_REGEX,
} from '$lib/server';
import { getRandomHexString, replaceAsync } from '$lib/server/util';
import type { BlogResource, CodeBlock } from '$lib/types';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { CodeFenceCaptureGroups } from './types';

const simpleMarkdownToHtmlProcessor = unified()
	.use(remarkParse)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeFormat)
	.use(rehypeStringify);

export function identifyCodeBlocks(markdown: string): CodeBlock[] {
	const cfsMatches = Array.from(markdown.matchAll(CODE_FENCE_START_REGEX)).map((m) => ({
		shiki: true,
		id: `code-block-${getRandomHexString(4)}`,
		index: m.index ?? 0,
		groups: m.groups as unknown as CodeFenceCaptureGroups,
	}));
	const cfeMatches = Array.from(markdown.matchAll(CODE_FENCE_END_REGEX)).map((m) => ({
		index: m.index ?? 0,
	}));
	let htmlMatches = Array.from(markdown.matchAll(CODE_BLOCK_START_REGEX)).map((m) => ({
		shiki: false,
		id: '',
		index: m.index ?? 0,
		groups: {} as CodeFenceCaptureGroups,
	}));
	if (cfsMatches.length !== cfeMatches.length) return [];

	const cfBoundaries = Array.from({ length: cfsMatches.length }, (_, i) => i).map((i) => ({
		start: cfsMatches[i]?.index ?? 0,
		end: cfeMatches[i]?.index ?? 0,
	}));
	htmlMatches = htmlMatches.filter((m) => !cfBoundaries.some((cf) => m.index > cf.start && cf.end > m.index));

	return [...cfsMatches, ...htmlMatches]
		.sort((a, b) => a.index - b.index)
		.map(({ shiki, id, index, groups }) => ({
			shiki,
			id,
			index,
			lang: groups?.lang ?? '',
			lineNumbers: Boolean(groups?.linenos),
			lineNumberStart: parseInt(groups?.start1 || groups?.start2 || '1'),
		}));
}

export const convertInfoBoxes = async (markdown: string): Promise<string> =>
	await replaceAsync(markdown, INFO_BOX_REGEX, convertInfoBoxToHtml);

export const convertWarningBoxes = async (markdown: string): Promise<string> =>
	await replaceAsync(markdown, WARNING_BOX_REGEX, convertWarningBoxToHtml);

async function convertInfoBoxToHtml(match: RegExpMatchArray): Promise<string> {
	const html = await convertMarkdownSnippetToHtml(match);
	const svgIcon = getSvgIcon('note');
	return `<div class="note custom-block"><div class="custom-block-top"><div class="custom-block-icon">${svgIcon}</div>\n<span class="custom-block-title">NOTE</span></div><div class="custom-block-message"><p>${html}</p></div></div>`;
}

async function convertWarningBoxToHtml(match: RegExpMatchArray): Promise<string> {
	const html = await convertMarkdownSnippetToHtml(match);
	const svgIcon = getSvgIcon('warning');
	return `<div class="warning custom-block"><div class="custom-block-top"><div class="custom-block-icon">${svgIcon}</div>\n<span class="custom-block-title">WARNING</span></div><div class="custom-block-message"><p>${html}</p></div></div>`;
}

async function convertMarkdownSnippetToHtml(match: RegExpMatchArray): Promise<string> {
	const markdown = match[1] ?? '';
	const file = await simpleMarkdownToHtmlProcessor.process(markdown);
	return String(file);
}

export const convertLinkedImages = (markdown: string, resources: { [k: string]: BlogResource }): string =>
	markdown.replace(
		LINKED_IMAGE_REGEX,
		(match: string, p1: string): string =>
			`<figure id="${resources[p1]?.name}"><a href="${resources[p1]?.src}"><img src="${resources[p1]?.src}" loading="lazy" alt="${resources[p1]?.caption}"></a><figcaption><p>${resources[p1]?.caption}</p></figcaption></figure>`,
	);

export const convertVideos = (markdown: string, resources: { [k: string]: BlogResource }): string =>
	markdown.replace(VIDEO_REGEX, (match: string, p1: string, p2: string, p3: string): string => {
		let videoElement = `<video`;
		if (p2) {
			videoElement += ` class="${p2}-device-mock"`;
		}
		if (p3) {
			videoElement += ` style="width:${p3}px"`;
		}
		videoElement += ` autoplay="" playsinline="" loop="" muted="" controls="">`;
		videoElement += `<source src="${resources[p1]?.src}" type="video/mp4">Sorry, your browser doesn't support embedded videos, but don't worry, you can <a href="${resources[p1]?.src}">download it</a> and watch it with your favorite video player!</video>`;
		if (p2 === 'desktop') {
			videoElement = `<div class="mac-book-screen">${videoElement}</div><div class="mac-book-bottom"><div class="mac-book-indent-wrapper"><div class="mac-book-indent-top"></div><div class="mac-book-indent-bottom"></div></div></div>`;
		}
		if (p2 === 'mobile') {
			videoElement = `<div class="mobile-device">${videoElement}</div>`;
		}
		const figureElement = `<figure id="vid-${resources[p1]?.name}">${videoElement}<figcaption><p>${resources[p1]?.caption}</p></figcaption></figure>`;
		return `<div class="${p2 ? 'device-mock' : 'vid-wrapper'}">${figureElement}</div>`;
	});
