import { labToLch, okhslToRgb, oklabToOklch, rgbToHex, rgbToHsl, rgbToLab, rgbToOklab } from '$lib/color/converters';
import { finalizeRgbColor, parseHueValue } from '$lib/color/parsers/util';
import { HSL_VAL_NAME_REGEX } from '$lib/color/regex';
import type { CssColor, HslColor, HslComponent, HslLabNumberType, OkhslColor, ParsedHslComponent } from '$lib/types';

export const parseOkhsl = (regExpGroups: object): CssColor =>
	cssColorFromOkhsl(getOkhslColorFromComponents(extractOkhslComponents(regExpGroups)));

function extractOkhslComponents(regExpGroups: object): ParsedHslComponent[] {
	const components: ParsedHslComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = HSL_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as HslComponent;
				const numTypeIn = match.groups?.numFormat?.toLowerCase() as HslLabNumberType;
				const numTypeOut = getHslLabNumberTypeForComponent(component);
				const parsed = parseOkhslComponentValue(component, numTypeIn, value);
				components.push({ component, numType: numTypeOut, value: parsed });
			}
		}
	});
	return components;
}

const getHslLabNumberTypeForComponent = (component: HslComponent): HslLabNumberType =>
	component === 'hue' ? 'degree' : component === 'alpha' ? 'float' : 'percent';

const parseOkhslComponentValue = (component: HslComponent, numType: HslLabNumberType, value: string): number =>
	component === 'hue'
		? parseHueValue(numType, value)
		: component === 'alpha'
		? parseHslAlphaValue(numType, value)
		: parseFloat(value);

const parseHslAlphaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const getOkhslColorFromComponents = (components: ParsedHslComponent[]): HslColor => ({
	h: components.find((c) => c.component === 'hue')?.value ?? 0,
	s: components.find((c) => c.component === 'sat')?.value ?? 0,
	l: components.find((c) => c.component === 'light')?.value ?? 0,
	a: components.find((c) => c.component === 'alpha')?.value ?? 1.0,
});

export function cssColorFromOkhsl(okhsl: OkhslColor): CssColor {
	const rgb = okhslToRgb(okhsl);
	const hsl = rgbToHsl(rgb);
	const hex = rgbToHex(rgb);
	const lab = rgbToLab(rgb);
	const lch = labToLch(lab);
	const oklab = rgbToOklab(rgb);
	const oklch = oklabToOklch(oklab);
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
