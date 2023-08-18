import { labToLch, labToRgb, oklabToOklch, rgbToHex, rgbToHsl, rgbToOkhsl, rgbToOklab } from '$lib/color/converters';
import { LAB_VAL_NAME_REGEX } from '$lib/color/regex';
import type { CssColorPreview, HslLabNumberType, LabColor, LabComponent, ParsedLabComponent } from '$lib/types';

export const parseLab = (regExpGroups: object): CssColorPreview =>
	cssColorFromLab(getLabColorFromComponents(extractLabComponents(regExpGroups)));

function extractLabComponents(regExpGroups: object): ParsedLabComponent[] {
	const components: ParsedLabComponent[] = [];
	Object.entries(regExpGroups).forEach(([groupName, value]) => {
		if (groupName && value) {
			const match = LAB_VAL_NAME_REGEX.exec(groupName);
			if (match) {
				const component = match.groups?.value as LabComponent;
				const numTypeIn = match.groups?.numFormat?.toLowerCase() as HslLabNumberType;
				const numTypeOut: HslLabNumberType = 'float';
				const parsed = parseLabComponentValue(component, numTypeIn, value);
				components.push({ component, numType: numTypeOut, value: parsed });
			}
		}
	});
	return components;
}

const parseLabComponentValue = (component: LabComponent, numType: HslLabNumberType, value: string): number =>
	component === 'alpha'
		? parseLabAlphaValue(numType, value)
		: component === 'light'
		? parseFloat(value)
		: parseLabAxisValue(numType, value);

const parseLabAlphaValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : parseFloat(value) / 100.0;

const parseLabAxisValue = (numType: HslLabNumberType, value: string): number =>
	numType === 'float' ? parseFloat(value) : (parseFloat(value) / 100.0) * 125.0;

const getLabColorFromComponents = (components: ParsedLabComponent[]): LabColor => ({
	l: components.find((c) => c.component === 'light')?.value ?? 0,
	a: components.find((c) => c.component === 'aaxis')?.value ?? 0,
	b: components.find((c) => c.component === 'baxis')?.value ?? 0,
	A: components.find((c) => c.component === 'alpha')?.value ?? 1.0,
});

export function cssColorFromLab(lab: LabColor): CssColorPreview {
	const lch = labToLch(lab);
	const rgb = labToRgb(lab);
	const hex = rgbToHex(rgb);
	const hsl = rgbToHsl(rgb);
	const oklab = rgbToOklab(rgb);
	const oklch = oklabToOklch(oklab);
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
		name: hex,
	};
}
