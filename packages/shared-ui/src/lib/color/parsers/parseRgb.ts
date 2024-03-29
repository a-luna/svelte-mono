import { createCssColorBaseFromRgbColor, finalizeRgbColor } from '$lib/color/gamut';
import { getRgbColorFromComponents } from '$lib/color/parsers/util';
import { RGB_VAL_NAME_REGEX } from '$lib/color/regex';
import type { CssColor, ParsedRgbComponent, RgbColor, RgbHexComponent, RgbNumberType } from '$lib/types';

export const parseRgb = (regExpGroups: object): CssColor =>
	cssColorFromRgb(getRgbColorFromComponents(extractRgbComponents(regExpGroups)));

function extractRgbComponents(regExpGroups: object): ParsedRgbComponent[] {
	const components: ParsedRgbComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = RGB_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as RgbHexComponent;
				const numType = match.groups?.numFormat?.toLowerCase() as RgbNumberType;
				const parsed = parseRgbComponentValue(component, numType, value);
				components.push({ component, numType, value: parsed });
			}
		}
	});
	return components;
}

const parseRgbComponentValue = (component: RgbHexComponent, numType: RgbNumberType, value: string): number =>
	component === 'alpha' ? parseRgbAlphaValue(numType, value) : parseRgbChannelValue(numType, value);

const parseRgbAlphaValue = (numType: RgbNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const parseRgbChannelValue = (numType: RgbNumberType, value: string): number =>
	numType === 'decimal' ? parseFloat(value) : (parseFloat(value) / 100) * 255.0;

export const cssColorFromRgb = (rgb: RgbColor): CssColor => finalizeRgbColor(createCssColorBaseFromRgbColor(rgb));
