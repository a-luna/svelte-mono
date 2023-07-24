import { labToLch, oklabToOklch, rgbToHex, rgbToHsl, rgbToLab, rgbToOkhsl, rgbToOklab } from '$lib/color/converters';
import { getRgbColorFromComponents } from '$lib/color/parsers/util';
import { HEX_VAL_NAME_REGEX } from '$lib/color/regex';
import {
	hslToString,
	labToString,
	lchToString,
	okhslToString,
	oklabToString,
	oklchToString,
	rgbToString,
} from '$lib/color/util';
import type {
	CssColor,
	EarlyParsedHexComponent,
	HexStringFormat,
	IsEnumerable,
	ParsedHexComponent,
	RgbHexComponent,
} from '$lib/types';

export function parseHex(regExpGroups: object): CssColor {
	const hex = parseHexString(regExpGroups);
	const hasAlpha = hex.map(({ component }) => component).includes('alpha');
	const components = extractHexComponents(hex, hasAlpha);
	const rgb = getRgbColorFromComponents(components);
	const hsl = rgbToHsl(rgb);
	const lab = rgbToLab(rgb);
	const lch = labToLch(lab);
	const oklab = rgbToOklab(rgb);
	const oklch = oklabToOklch(oklab);
	const okhsl = rgbToOkhsl(rgb);
	return {
		hex: rgbToHex(rgb, hasAlpha),
		rgb,
		hsl,
		lab,
		lch,
		oklab,
		oklch,
		okhsl,
		rgbString: rgbToString(rgb, hasAlpha),
		hslString: hslToString(hsl, hasAlpha),
		labString: labToString(lab, hasAlpha),
		lchString: lchToString(lch, hasAlpha),
		okhslString: okhslToString(okhsl, hasAlpha),
		oklabString: oklabToString(oklab, hasAlpha),
		oklchString: oklchToString(oklch, hasAlpha),
		hasAlpha,
	};
}

function parseHexString(regExpGroups: object): EarlyParsedHexComponent[] {
	const hex: EarlyParsedHexComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = HEX_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as RgbHexComponent;
				hex.push({ component, numType: 'hex', value });
			}
		}
	});
	return hex;
}

const extractHexComponents = (hex: EarlyParsedHexComponent[], hasAlpha: boolean): ParsedHexComponent[] =>
	getHexStringFormat(hex) === 'condensed'
		? convertCondensedHexComponents(hex)
		: convertFullHexComponents(hex, hasAlpha);

function getHexStringFormat<Type extends IsEnumerable>(components: Type): HexStringFormat {
	return components.length === 3 || components.length === 4 ? 'condensed' : 'full';
}

const convertCondensedHexComponents = (hex: EarlyParsedHexComponent[]): ParsedHexComponent[] =>
	hex.map(({ component, value }) => ({ component, numType: 'decimal', value: parseInt(`${value}${value}`, 16) }));

function convertFullHexComponents(earlyHex: EarlyParsedHexComponent[], hasAlpha: boolean): ParsedHexComponent[] {
	const r = earlyHex.filter((c) => c.component === 'red');
	const g = earlyHex.filter((c) => c.component === 'green');
	const b = earlyHex.filter((c) => c.component === 'blue');
	const components: ParsedHexComponent[] = [
		{ component: 'red', numType: 'decimal', value: parseInt(`${r[0]?.value}${r[1]?.value}`, 16) },
		{ component: 'green', numType: 'decimal', value: parseInt(`${g[0]?.value}${g[1]?.value}`, 16) },
		{ component: 'blue', numType: 'decimal', value: parseInt(`${b[0]?.value}${b[1]?.value}`, 16) },
	];
	if (hasAlpha) {
		const a = earlyHex.filter((c) => c.component === 'alpha');
		components.push({ component: 'alpha', numType: 'decimal', value: parseInt(`${a[0]?.value}${a[1]?.value}`, 16) });
	}
	return components;
}
