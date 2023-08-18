import { ColorParser } from '$lib/color';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse OKLAB strings in CSS Colors 4 notation', () => {
	test('can parse a string with lightness as a percentage, a-axis as a unitless number, and b-axis as a unitless number: lab(L% A B)', () => {
		const oklabString = 'oklab(59.69% 0.1007 0.1191 / 0.5)';
		const result = ColorParser.parse(oklabString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#C65D0780');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 198, g: 93, b: 7, a: 128 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 27, s: 93.3, l: 40.1, a: 0.5 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 51.59, a: 38.03, b: 59.06, A: 0.5 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 51.59, c: 70.25, h: 57.22, a: 0.5 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 59.69, a: 0.1007, b: 0.1191, A: 0.5 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 59.69, c: 0.156, h: 49.79, a: 0.5 });
		}
	});

	test('can parse a string with lightness as a unitless number,a-axis as a percentage, b-axis as a percentage, and alpha as a unitless number: lab(L A% B% / a)', () => {
		const oklabString = 'oklab(74.76% -0.138 0.154)';
		const result = ColorParser.parse(oklabString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#7AC601');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 122, g: 198, b: 1, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 83.3, s: 99, l: 39, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 72.59, a: -48.39, b: 72.09, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 72.59, c: 86.82, h: 123.87, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 74.76, a: -0.138, b: 0.154, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 74.76, c: 0.2068, h: 131.86, a: 1 });
		}
	});
});
