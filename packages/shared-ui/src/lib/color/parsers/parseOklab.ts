import { createCssColorBaseFromOklabColor, finalizeOklabColor } from '$lib/color/gamut';
import { LAB_VAL_NAME_REGEX } from '$lib/color/regex';
import type { CssColor, HslLabNumberType, LabColor, LabComponent, OklabColor, ParsedLabComponent } from '$lib/types';

export const parseOklab = (regExpGroups: object): CssColor =>
	cssColorFromOklab(getOklabColorFromComponents(extractOklabComponents(regExpGroups)));

function extractOklabComponents(regExpGroups: object): ParsedLabComponent[] {
	const components: ParsedLabComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = LAB_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as LabComponent;
				const numTypeIn = match.groups?.numFormat?.toLowerCase() as HslLabNumberType;
				const numTypeOut: HslLabNumberType = 'float';
				const parsed = parseOklabComponentValue(component, numTypeIn, value);
				components.push({ component, numType: numTypeOut, value: parsed });
			}
		}
	});
	return components;
}

const parseOklabComponentValue = (component: LabComponent, numType: HslLabNumberType, value: string): number =>
	component === 'alpha'
		? parseOklabAlphaValue(numType, value)
		: component === 'light'
		? parseFloat(value)
		: parseOklabAxisValue(numType, value);

const parseOklabAlphaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const parseOklabAxisValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : (parseFloat(value) / 100.0) * 125.0;

const getOklabColorFromComponents = (components: ParsedLabComponent[]): LabColor => ({
	l: components.find((c) => c.component === 'light')?.value ?? 0,
	a: components.find((c) => c.component === 'aaxis')?.value ?? 0,
	b: components.find((c) => c.component === 'baxis')?.value ?? 0,
	A: components.find((c) => c.component === 'alpha')?.value ?? 1.0,
});

export const cssColorFromOklab = (oklab: OklabColor): CssColor =>
	finalizeOklabColor(createCssColorBaseFromOklabColor(oklab));
