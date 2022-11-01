import type { BlogResource, CodeBlock } from '$lib/types';
import { getRandomHexString, replaceAsync } from '$lib/util';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import {
	ALERT_BOX_REGEX,
	CODE_BLOCK_START_REGEX,
	CODE_FENCE_REGEX,
	INFO_BOX_REGEX,
	LINKED_IMAGE_REGEX,
	VIDEO_REGEX
} from './constants';

const simpleMarkdownToHtmlProcessor = unified()
	.use(remarkParse)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeFormat)
	.use(rehypeStringify);

export function identifyCodeBlocks(markdown: string): CodeBlock[] {
	const cfMatches = Array.from(markdown.matchAll(CODE_FENCE_REGEX)).map((m) => ({
		shiki: true,
		id: `code-block-${getRandomHexString(4)}`,
		index: m.index ?? 0,
		groups: m.groups
	}));
	const htmlMatches = Array.from(markdown.matchAll(CODE_BLOCK_START_REGEX)).map((m) => ({
		shiki: false,
		id: '',
		index: m.index ?? 0,
		groups: {}
	}));
	return [...cfMatches, ...htmlMatches]
		.sort((a, b) => a.index - b.index)
		.map(({ shiki, id, index, groups }) => ({
			shiki,
			id,
			index,
			lang: groups?.lang ?? '',
			lineNumbers: Boolean(groups?.linenos),
			lineNumberStart: parseInt(groups?.start1 || groups?.start2 || '1')
		}));
}

export const convertInfoBoxes = async (markdown: string): Promise<string> =>
	await replaceAsync(markdown, INFO_BOX_REGEX, convertInfoBoxToHtml);

export const convertAlertBoxes = async (markdown: string): Promise<string> =>
	await replaceAsync(markdown, ALERT_BOX_REGEX, convertAlertBoxToHtml);

async function convertInfoBoxToHtml(match: RegExpMatchArray): Promise<string> {
	const html = await convertMarkdownSnippetToHtml(match);
	return `<div class="note note-flex"><div class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="currentColor" fill="currentColor" style="stroke-width: 0; padding: 0;" class="s-x0McpB_FEdHb"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg></div><div class="note-message" style="flex-flow:column wrap"><p>${html}</p></div></div>`;
}

async function convertAlertBoxToHtml(match: RegExpMatchArray): Promise<string> {
	const html = await convertMarkdownSnippetToHtml(match);
	return `<div class="alert alert-flex"><div class="alert-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" stroke="currentColor" fill="currentColor" class="s-x0McpB_FEdHb" style="stroke-width: 0; padding: 0px;"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg></div><div class="alert-message"><p>${html}</p></div></div>`;
}

async function convertMarkdownSnippetToHtml(match: RegExpMatchArray): Promise<string> {
	const markdown = match[1] ?? '';
	const file = await simpleMarkdownToHtmlProcessor.process(markdown);
	return String(file);
}

export const convertLinkedImages = (
	markdown: string,
	resources: { [k: string]: BlogResource }
): string =>
	markdown.replace(
		LINKED_IMAGE_REGEX,
		(match: string, p1: string): string =>
			`<figure id="${resources[p1]?.name}"><a href="${resources[p1]?.src}"><img src="${resources[p1]?.src}" loading="lazy" alt="${resources[p1]?.caption}"></a><figcaption><p>${resources[p1]?.caption}</p></figcaption></figure>`
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
