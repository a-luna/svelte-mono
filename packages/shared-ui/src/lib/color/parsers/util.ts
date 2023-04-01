import type { HslLabNumberType, ParsedHexComponent, ParsedRgbComponent, RgbColor } from '$lib/types';

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
