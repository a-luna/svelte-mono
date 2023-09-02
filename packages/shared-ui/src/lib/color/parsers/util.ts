import {
	constrainOutOfGamutColorToRec2020,
	constrainP3ColorToSRGB,
	constrainRec2020ColorToP3,
	getColorSpace,
} from '$lib/color/converters/util';
import { addStringValuesToCssColor, clampColorComponents, copyCssColor } from '$lib/color/util';
import type { CssColor, HslLabNumberType, ParsedHexComponent, ParsedRgbComponent, RgbColor } from '$lib/types';
import type { CssColorBase, CssColorForColorSpace } from '$lib/types/CssColor';

export function parseHueValue(numType: HslLabNumberType, value: string): number {
	let hue = parseFloat(value);
	if (numType === 'degree') {
		if (hue < 0) hue += 360;
	} else {
		hue = numType === 'rad' ? hue * (180.0 / Math.PI) : hue * 360.0;
	}
	return hue;
}

export const getRgbColorFromComponents = (components: (ParsedHexComponent | ParsedRgbComponent)[]): RgbColor => ({
	r: components.find((c) => c.component === 'red')?.value ?? 0,
	g: components.find((c) => c.component === 'green')?.value ?? 0,
	b: components.find((c) => c.component === 'blue')?.value ?? 0,
	a: components.find((c) => c.component === 'alpha')?.value ?? 255,
});

export function finalizeLabColor(color: CssColorBase): CssColor {
	const space = getColorSpace(color);
	if (space === 'out') {
		// if (color.lch.l > 99) {
		// 	return {
		// 		...copyCssColor(color),
		// 		space,
		// 		rec2020Color: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
		// 		p3Color: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
		// 		srbgColor: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
		// 	};
		// }
		const rec2020 = constrainOutOfGamutColorToRec2020(copyCssColor(color));
		const p3 = constrainRec2020ColorToP3(copyCssColor(rec2020));
		const srbg = constrainP3ColorToSRGB(copyCssColor(p3));
		return {
			...copyCssColor(color),
			space,
			rec2020Color: clampColorComponents(addStringValuesToCssColor(rec2020)) as CssColorForColorSpace,
			p3Color: clampColorComponents(addStringValuesToCssColor(p3)) as CssColorForColorSpace,
			srbgColor: clampColorComponents(addStringValuesToCssColor(srbg)) as CssColorForColorSpace,
		};
	}
	if (space === 'rec2020') {
		const p3 = constrainRec2020ColorToP3(copyCssColor(color));
		const srbg = constrainP3ColorToSRGB(copyCssColor(p3));
		return {
			...copyCssColor(color),
			space,
			rec2020Color: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
			p3Color: clampColorComponents(addStringValuesToCssColor(p3)) as CssColorForColorSpace,
			srbgColor: clampColorComponents(addStringValuesToCssColor(srbg)) as CssColorForColorSpace,
		};
	}
	if (space === 'p3') {
		const srbg = constrainP3ColorToSRGB(copyCssColor(color));
		return {
			...copyCssColor(color),
			space,
			p3Color: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
			srbgColor: clampColorComponents(addStringValuesToCssColor(srbg)) as CssColorForColorSpace,
		};
	}
	return {
		...copyCssColor(color),
		space,
		srbgColor: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
	};
}

export const finalizeRgbColor = (color: CssColorBase): CssColor => ({
	...copyCssColor(color),
	space: 'srgb',
	srbgColor: clampColorComponents(addStringValuesToCssColor(copyCssColor(color))) as CssColorForColorSpace,
});
