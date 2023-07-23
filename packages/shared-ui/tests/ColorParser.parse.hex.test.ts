import { ColorParser } from '$lib/color';
import { clampColorComponents } from '$lib/color/util';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse strings in hexadecimal notation', () => {
	test('can parse a 3-digit hex string: #RGB', () => {
		const hexString = '#004';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#000044');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 68, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13.3, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 3.77, a: 25.9, b: -39.82, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 3.77, c: 47.5, h: 303.05, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 17.48, a: -0.0125, b: -0.1205, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 17.48, c: 0.1211, h: 264.06, a: 1 });
		}
	});

	test('can parse a 4-digit hex string: #RGBA', () => {
		const hexString = '#e0cc';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EE00CCCC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.6, s: 100, l: 46.7, a: 0.8 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 54.6, a: 88.72, b: -41.37, A: 0.8 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 54.6, c: 97.89, h: 335, a: 0.8 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 64.71, a: 0.2621, b: -0.1132, A: 0.8 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 64.71, c: 0.2855, h: 336.65, a: 0.8 });
		}
	});

	test('can parse a 6-digit hex string: #RRGGBB', () => {
		const hexString = '#01e1ec';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#01E1EC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 81.79, a: -40.44, b: -18.18, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 81.79, c: 44.34, h: 204.2, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 82.76, a: -0.1312, b: -0.0507, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 82.76, c: 0.1407, h: 201.13, a: 1 });
		}
	});

	test('can parse a 8-digit hex string: #RRGGBBAA', () => {
		const hexString = '#79eb0082';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#79EB0082');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 121, g: 235, b: 0, a: 130 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.1, s: 100, l: 46.1, a: 0.51 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 83.69, a: -62.69, b: 80.84, A: 0.51 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 83.69, c: 102.3, h: 127.79, a: 0.51 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 83.87, a: -0.1759, b: 0.1732, A: 0.51 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 83.87, c: 0.2469, h: 135.46, a: 0.51 });
		}
	});
});
