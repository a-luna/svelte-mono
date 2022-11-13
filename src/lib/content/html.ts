import type { CodeBlock, CodeBlockUpdateDetails, HtmlHeading, TocSection } from '$lib/types';
import {
	CODE_BLOCK_END_REGEX,
	CODE_BLOCK_START_REGEX,
	FA_BULLET_REGEX,
	getSvgIcon,
	HTML_HEADING_REGEX,
	TOX_TEST_RESULTS_REGEX
} from './constants';

export const colorizeToxResults = (html: string): string =>
	html.replace(TOX_TEST_RESULTS_REGEX, (match): string => {
		const colorized = match
			.replace(/PASSED/g, '<span class="tox-passed">$&</span>')
			.replace(/SKIPPED/g, '<span class="tox-skipped">$&</span>')
			.replace(/FAILED/g, '<span class="tox-failed">$&</span>')
			.replace(/ERROR/g, '<span class="tox-error">$&</span>');
		return `<span class="cmd-results">${colorized}</span>`;
	});

export const generateTableOfContents = (html: string): TocSection[] =>
	createTocSection(1, 0, html.length, createHtmlHeadingMap(html));

export function transformHeadings(html: string): string {
	const svgIcon = getSvgIcon('hash');
	return html.replace(
		HTML_HEADING_REGEX,
		`<span class="heading-text level-$<level>"><h$<level> id="$<slug>"><span class="underline--magical">$<text></span></h$<level>><a href="#$<slug>" class="hanchor hanchor-self" title="Link to this section">${svgIcon}</a></span>`
	);
}

function createHtmlHeadingMap(html: string): { [k: number]: HtmlHeading[] } {
	const headings = Array.from(html.matchAll(HTML_HEADING_REGEX)).map((m) => ({
		level: parseInt(m?.groups?.level ?? '0'),
		slug: m?.groups?.slug ?? '',
		text: m?.groups?.text ?? '',
		index: m?.index ?? 0
	}));
	const hmap: { [k: number]: HtmlHeading[] } = {};
	Array.from({ length: 5 }, (_, i) => i + 2).forEach(
		(level) => (hmap[level] = headings.filter((h) => h.level === level).sort((a, b) => a.index - b.index))
	);
	return hmap;
}

function createTocSection(
	level: number,
	sectionStart: number,
	sectionEnd: number,
	hmap: { [k: number]: HtmlHeading[] }
): TocSection[] {
	const levelMap = hmap?.[level + 1]?.filter((h) => h.index >= sectionStart && sectionEnd > h.index);
	if (!levelMap || !levelMap.length) {
		return [];
	}
	return levelMap.map((heading, i) => {
		const end = i < levelMap.length - 1 ? (levelMap?.[i + 1]?.index ?? 0) - 1 : sectionEnd;
		return {
			heading,
			children: createTocSection(level + 1, heading.index, end, hmap)
		};
	});
}

export function transformCodeBlocks(html: string, codeBlocks: CodeBlock[]): string {
	if (!codeBlocks.length) return html;
	const sMatches = Array.from(html.matchAll(CODE_BLOCK_START_REGEX));
	const eMatches = Array.from(html.matchAll(CODE_BLOCK_END_REGEX));
	if (codeBlocks.length !== sMatches.length || codeBlocks.length !== eMatches.length) return html;

	const totalMatches = sMatches.length;
	const updatedBlocks: CodeBlockUpdateDetails[] = Array.from({ length: totalMatches }, (_, i) => i).map((i) => {
		const blockStart = sMatches[i];
		const match = blockStart?.[0];
		const { index, groups } = blockStart || { index: 0, groups: { shiki: false, bgColor: '' } };
		if (groups?.shiki) {
			const codeStart = (index ?? 0) + (match?.length ?? 0);
			const codeEnd = eMatches[i]?.index ?? 0;
			const blockStart = index ?? 0;
			const blockEnd = (eMatches[i]?.index ?? 0) + (eMatches[i]?.[0]?.length ?? 0);
			const originalLength = blockEnd - blockStart;
			const highlighted = html.slice(codeStart, codeEnd);
			const codeBlock = createWrappedCodeBlock(
				highlighted,
				groups?.bgColor ?? '#141414',
				codeBlocks[i]?.id ?? '',
				codeBlocks[i]?.lang ?? '',
				codeBlocks[i]?.lineNumbers ?? false,
				codeBlocks[i]?.lineNumberStart ?? 1
			);
			return {
				codeBlock,
				length: codeBlock.length,
				originalLength,
				offset: codeBlock.length - originalLength,
				shiki: true
			};
		}
		return {
			codeBlock: '',
			length: 0,
			originalLength: 0,
			offset: 0,
			shiki: false
		};
	});

	let totalOffSet = 0;
	Array.from({ length: updatedBlocks.length }, (_, i) => i).forEach((i) => {
		if (updatedBlocks[i]?.shiki) {
			const codeBlock = updatedBlocks[i]?.codeBlock;
			const blockStart = (sMatches[i]?.index ?? 0) + totalOffSet;
			const blockEnd = (eMatches[i]?.index ?? 0) + (eMatches[i]?.[0]?.length ?? 0) + totalOffSet;
			html = `${html.slice(0, blockStart)}${codeBlock}${html.slice(blockEnd)}`;
			totalOffSet += updatedBlocks[i]?.offset ?? 0;
		}
	});
	return html;
}

function createWrappedCodeBlock(
	highlighted: string,
	bgColor: string,
	codeBlockId: string,
	lang: string,
	lineNumbers: boolean,
	lineNumberStart: number
): string {
	const svgIcon = getSvgIcon('copy');
	let topRow = '<span class="top-row">';
	topRow += `<span class="lang-name">${lang}</span>`;
	topRow += `<button class="copy-button" type="button" data-code-block-id="${codeBlockId}" title="Copy code to clipboard">${svgIcon}</button>`;
	topRow += '<span class="space-filler"></span>';
	topRow += `</span>`;

	let newPre = `<pre class="shiki" style="background-color: #141414">`;
	if (lineNumbers) {
		newPre = `<pre class="shiki linenos" style="background-color: ${bgColor}; --start: ${lineNumberStart}">`;
	}

	return `<div class="shiki-wrapper" tabindex="0">${topRow}${newPre}<code id="${codeBlockId}" class="language-${lang}" data-lang="${lang}">${highlighted}</code></pre></div>`;
}

const starSvgMap: { [k: string]: string } = {
	'fa-star': getSvgIcon('fullStar'),
	'fa-star-half-o': getSvgIcon('halfStar'),
	'fa-star-o': getSvgIcon('star')
};

export const transformFaBulletLists = (html: string): string =>
	html.replace(
		FA_BULLET_REGEX,
		(match: string, p1: string, p2: string): string =>
			`<div class="fa-bullet ${p1}">${starSvgMap[p1]}</div><div class="fa-bullet-text ${p1}">${p2}</div>`
	);
