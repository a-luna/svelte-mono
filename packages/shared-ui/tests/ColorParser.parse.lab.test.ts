import { ColorParser } from '$lib/color';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse LAB strings in CSS Colors 4 notation', () => {
	test('can parse a string with lightness as a percentage, a-axis as a unitless number, and b-axis as a unitless number: lab(L% A B)', () => {
		const labString = 'lab(72.58% -48.24 72.19)';
		const result = ColorParser.parse(labString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#7AC600');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 122, g: 198, b: 0, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 83, s: 99.9, l: 38.8, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 72.58, a: -48.24, b: 72.19, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 72.58, c: 86.82, h: 123.75, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 74.76, a: -0.1376, b: 0.1541, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 74.76, c: 0.2066, h: 131.77, a: 1 });
		}
	});

	test('can parse a string with lightness as a unitless number,a-axis as a percentage, b-axis as a percentage, and alpha as a unitless number: lab(L A% B% / a)', () => {
		const labString = 'lab(72.58 -38.592% 57.752% / 0.66)';
		const result = ColorParser.parse(labString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#7AC600A8');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 122, g: 198, b: 0, a: 168 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 83, s: 99.9, l: 38.8, a: 0.66 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 72.58, a: -48.24, b: 72.19, A: 0.66 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 72.58, c: 86.82, h: 123.75, a: 0.66 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 74.76, a: -0.1376, b: 0.1541, A: 0.66 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 74.76, c: 0.2066, h: 131.77, a: 0.66 });
		}
	});
});
