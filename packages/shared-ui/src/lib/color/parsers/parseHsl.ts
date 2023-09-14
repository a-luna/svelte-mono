import { hslToRgb } from '$lib/color/converters';
import { createCssColorBaseFromRgbColor, finalizeRgbColor } from '$lib/color/gamut';
import { parseHueValue } from '$lib/color/parsers/util';
import { HSL_VAL_NAME_REGEX } from '$lib/color/regex';
import type { CssColor, HslColor, HslComponent, HslLabNumberType, ParsedHslComponent } from '$lib/types';

export const parseHsl = (regExpGroups: object): CssColor =>
	cssColorFromHsl(getHslColorFromComponents(extractHslComponents(regExpGroups)));

function extractHslComponents(regExpGroups: object): ParsedHslComponent[] {
	const components: ParsedHslComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = HSL_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as HslComponent;
				const numTypeIn = match.groups?.numFormat?.toLowerCase() as HslLabNumberType;
				const numTypeOut = getHslLabNumberTypeForComponent(component);
				const parsed = parseHslComponentValue(component, numTypeIn, value);
				components.push({ component, numType: numTypeOut, value: parsed });
			}
		}
	});
	return components;
}

const getHslLabNumberTypeForComponent = (component: HslComponent): HslLabNumberType =>
	component === 'hue' ? 'degree' : component === 'alpha' ? 'float' : 'percent';

const parseHslComponentValue = (component: HslComponent, numType: HslLabNumberType, value: string): number =>
	component === 'hue'
		? parseHueValue(numType, value)
		: component === 'alpha'
		? parseHslAlphaValue(numType, value)
		: parseFloat(value);

const parseHslAlphaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const getHslColorFromComponents = (components: ParsedHslComponent[]): HslColor => ({
	h: components.find((c) => c.component === 'hue')?.value ?? 0,
	s: components.find((c) => c.component === 'sat')?.value ?? 0,
	l: components.find((c) => c.component === 'light')?.value ?? 0,
	a: components.find((c) => c.component === 'alpha')?.value ?? 1.0,
});

export const cssColorFromHsl = (hsl: HslColor): CssColor =>
	finalizeRgbColor({ ...createCssColorBaseFromRgbColor(hslToRgb(hsl)), hsl });
