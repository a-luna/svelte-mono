import { labToLch, oklabToRgb, oklchToOklab, rgbToHex, rgbToHsl, rgbToLab, rgbToOkhsl } from '$lib/color/converters';
import { parseHueValue } from '$lib/color/parsers/util';
import { LCH_VAL_NAME_REGEX } from '$lib/color/regex';
import {
	hslToString,
	labToString,
	lchToString,
	okhslToString,
	oklabToString,
	oklchToString,
	rgbToString,
} from '$lib/color/util';
import type { CssColor, HslLabNumberType, LchComponent, OklchColor, ParsedLchComponent } from '$lib/types';

export function parseOklch(regExpGroups: object): CssColor {
	const components = extractOklchComponents(regExpGroups);
	const hasAlpha = components.map(({ component }) => component).includes('alpha');
	return cssColorFromOklch(getOklchColorFromComponents(components), hasAlpha);
}

function extractOklchComponents(regExpGroups: object): ParsedLchComponent[] {
	const components: ParsedLchComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = LCH_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as LchComponent;
				const numTypeIn = match.groups?.numFormat?.toLowerCase() as HslLabNumberType;
				const numTypeOut = getOklchNumberTypeForComponent(component);
				const parsed = parseOklchComponentValue(component, numTypeIn, value);
				components.push({ component, numType: numTypeOut, value: parsed });
			}
		}
	});
	return components;
}

const getOklchNumberTypeForComponent = (component: LchComponent): HslLabNumberType =>
	component === 'hue' ? 'degree' : component === 'light' ? 'percent' : 'float';

const parseOklchComponentValue = (component: LchComponent, numType: HslLabNumberType, value: string): number =>
	component === 'hue'
		? parseHueValue(numType, value)
		: component === 'alpha'
		? parseOklchAlphaValue(numType, value)
		: component === 'chroma'
		? parseOklchChromaValue(numType, value)
		: parseFloat(value);

const parseOklchAlphaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const parseOklchChromaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : (parseFloat(value) / 100) * 0.4;

const getOklchColorFromComponents = (components: ParsedLchComponent[]): OklchColor => ({
	l: components.find((c) => c.component === 'light')?.value ?? 0,
	c: components.find((c) => c.component === 'chroma')?.value ?? 0,
	h: components.find((c) => c.component === 'hue')?.value ?? 0,
	a: components.find((c) => c.component === 'alpha')?.value ?? 1.0,
});

export function cssColorFromOklch(oklch: OklchColor, hasAlpha: boolean): CssColor {
	const oklab = oklchToOklab(oklch);
	const rgb = oklabToRgb(oklab);
	const hex = rgbToHex(rgb, hasAlpha);
	const hsl = rgbToHsl(rgb);
	const lab = rgbToLab(rgb);
	const lch = labToLch(lab);
	const okhsl = rgbToOkhsl(rgb);
	return {
		hex,
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
