import { createCssColorBaseFromLchColor, finalizeLabColor } from '$lib/color/gamut';
import { parseHueValue } from '$lib/color/parsers/util';
import { LCH_VAL_NAME_REGEX } from '$lib/color/regex';
import type { CssColor, HslLabNumberType, LchColor, LchComponent, ParsedLchComponent } from '$lib/types';

export const parseLch = (regExpGroups: object): CssColor =>
	cssColorFromLch(getLchColorFromComponents(extractLchComponents(regExpGroups)));

function extractLchComponents(regExpGroups: object): ParsedLchComponent[] {
	const components: ParsedLchComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = LCH_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as LchComponent;
				const numTypeIn = match.groups?.numFormat?.toLowerCase() as HslLabNumberType;
				const numTypeOut = getLchNumberTypeForComponent(component);
				const parsed = parseLchComponentValue(component, numTypeIn, value);
				components.push({ component, numType: numTypeOut, value: parsed });
			}
		}
	});
	return components;
}

const getLchNumberTypeForComponent = (component: LchComponent): HslLabNumberType =>
	component === 'hue' ? 'degree' : 'float';

const parseLchComponentValue = (component: LchComponent, numType: HslLabNumberType, value: string): number =>
	component === 'hue'
		? parseHueValue(numType, value)
		: component === 'alpha'
		? parseLchAlphaValue(numType, value)
		: component === 'chroma'
		? parseLchChromaValue(numType, value)
		: parseFloat(value);

const parseLchAlphaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const parseLchChromaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : (parseFloat(value) / 100.0) * 150.0;

const getLchColorFromComponents = (components: ParsedLchComponent[]): LchColor => ({
	l: components.find((c) => c.component === 'light')?.value ?? 0,
	c: components.find((c) => c.component === 'chroma')?.value ?? 0,
	h: components.find((c) => c.component === 'hue')?.value ?? 0,
	a: components.find((c) => c.component === 'alpha')?.value ?? 1.0,
});

export const cssColorFromLch = (lch: LchColor): CssColor => finalizeLabColor(createCssColorBaseFromLchColor(lch));
