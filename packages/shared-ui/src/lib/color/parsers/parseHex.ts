import { labToLch, oklabToOklch, rgbToHex, rgbToHsl, rgbToLab, rgbToOkhsl, rgbToOklab } from '$lib/color/converters';
import { finalizeRgbColor, getRgbColorFromComponents } from '$lib/color/parsers/util';
import { HEX_VAL_NAME_REGEX } from '$lib/color/regex';
import type {
	CssColor,
	EarlyParsedHexComponent,
	HexStringFormat,
	IsEnumerable,
	ParsedHexComponent,
	RgbHexComponent,
} from '$lib/types';

export function parseHex(regExpGroups: object): CssColor {
	const hexComponents = parseHexString(regExpGroups);
	const hasAlpha = hexComponents.map(({ component }) => component).includes('alpha');
	return cssColorFromHexComponents(extractHexComponents(hexComponents, hasAlpha));
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

export function cssColorFromHexComponents(components: ParsedHexComponent[]): CssColor {
	const rgb = getRgbColorFromComponents(components);
	const hex = rgbToHex(rgb);
	const hsl = rgbToHsl(rgb);
	const lab = rgbToLab(rgb);
	const lch = labToLch(lab);
	const oklab = rgbToOklab(rgb);
	const oklch = oklabToOklch(oklab);
	const okhsl = rgbToOkhsl(rgb);
	const color = {
		hex,
		rgb,
		hsl,
		lab,
		lch,
		oklab,
		oklch,
		okhsl,
		name: hex,
	};
	return finalizeRgbColor(color);
}
