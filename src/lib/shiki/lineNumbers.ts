/* eslint-disable @typescript-eslint/no-unused-vars */
import { dev } from '$app/environment';
import path from 'path';
import type { HtmlRendererOptions, IShikiTheme } from 'shiki';
import { getHighlighter, loadTheme } from 'shiki';
import { fileURLToPath } from 'url';

const theme = await getLocalTheme('just-black');
export const highlighter = await getHighlighter({ theme });

export const parseMeta = (meta: string | undefined): HtmlRendererOptions['lineOptions'] =>
	meta && meta.length ? parseHighlightLines(meta).map((line) => ({ line, classes: ['hl'] })) ?? [] : [];

async function getLocalTheme(themeName: string): Promise<IShikiTheme> {
	const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));
	const themePath = dev
		? path.resolve(path.join(__dirname, 'themes', `${themeName}.json`))
		: path.resolve(path.join(__dirname, '../../', 'client', `${themeName}.json`));
	return await loadTheme(themePath);
}

function parseHighlightLines(meta: string): number[] {
	let lineNumbers: number[] = [];
	const lineRanges = /hl_lines=\[(?<ranges>[\s\S]*)\]/g.exec(meta)?.[1];
	if (!lineRanges) {
		return lineNumbers;
	}
	lineNumbers = lineRanges.split(',').flatMap((s) => {
		const rangeMatch = /"(?:(?<start>[\d]+)-(?<end>[\d]+))"/g.exec(s);
		const singleMatch = /[\d]+/g.exec(s);
		if (rangeMatch) {
			const start = parseInt(rangeMatch.groups?.start ?? '0');
			const end = parseInt(rangeMatch.groups?.end ?? '0');
			const length = end - start + 1;
			return Array.from({ length }, (_, i) => start + i);
		} else if (singleMatch) {
			return [parseInt(singleMatch?.[0] ?? '0')];
		} else {
			return [];
		}
	});
	lineNumbers = [...new Set(lineNumbers)].sort((a, b) => a - b);
	if (lineNumbers.length == 1 && lineNumbers.at(0) == 0) {
		return [];
	}
	return lineNumbers;
}
