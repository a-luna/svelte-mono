import type { CodeBlock, HtmlHeading, TocSection } from '$lib/types';
import {
	CODE_BLOCK_END_REGEX,
	CODE_BLOCK_START_REGEX,
	FA_BULLET_REGEX,
	getSvgIcon,
	HTML_HEADING_REGEX,
	TOX_TEST_RESULTS_REGEX
} from './constants';

export const transformHeadings = (html: string): string =>
	html.replace(
		HTML_HEADING_REGEX,
		'<span class="heading-text level-$<level>"><a href="#$<slug>" class="hanchor hanchor-self" title="Link to this section"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" stroke="currentColor" fill="currentColor" class="s-x0McpB_FEdHb" style="stroke-width: 0; padding: 0px;"><path d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"></path></svg></a><h$<level> id="$<slug>"><span class="underline--magical">$<text></span></h$<level>></span>'
	);

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

function createHtmlHeadingMap(html: string): { [k: number]: HtmlHeading[] } {
	const headings = Array.from(html.matchAll(HTML_HEADING_REGEX)).map((m) => ({
		level: parseInt(m?.groups?.level ?? '0'),
		slug: m?.groups?.slug ?? '',
		text: m?.groups?.text ?? '',
		index: m?.index ?? 0
	}));
	const hmap: { [k: number]: HtmlHeading[] } = {};
	Array.from({ length: 5 }, (_, i) => i + 2).forEach(
		(level) =>
			(hmap[level] = headings.filter((h) => h.level === level).sort((a, b) => a.index - b.index))
	);
	return hmap;
}

function createTocSection(
	level: number,
	sectionStart: number,
	sectionEnd: number,
	hmap: { [k: number]: HtmlHeading[] }
): TocSection[] {
	const levelMap = hmap?.[level + 1]?.filter(
		(h) => h.index >= sectionStart && sectionEnd > h.index
	);
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
