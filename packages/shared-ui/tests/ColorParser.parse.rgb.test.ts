import { ColorParser } from '$lib/color';
import { clampColorComponents } from '$lib/color/util';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

// TODO: Create test cases that cover all existing AND new color space conversion/parsing processes
//	 const test = [

//	 	// Named Colors
//	 	'PeachPuff', // 50
//	 	'peach puff', // 51
//	 	'Midnight_blue', // 52
//	 	'chartreuse', // 53

//	 	// LCH
//	 	'lch(46% 33 317)', // 67
//	 	'lch(46% 22% 317)', // 68
//	 	'lch(46% 33 0.88turn / 1)', // 69
//	 	'lch(46 22% 5.53269rad / 1)', // 70
//	 	'lch(52.92% 24.25 52.86 / .5)', // 71
//	 	'lch(52.92 16.67% 52.86deg / 50%)', // 72
//	 	'lch(52.61 40.94 4.88186rad)', // 73
//	 	'lch(52.61 27.29% 279.71deg)', // 74
//	 	'lch(52.61% 27.29% 0.776972turn)', // 75
//	 	'lch(88.7% 0.062 .25turn / 50%)', // 76
//	 	'lch(18% 0 224 / 85%)', // 77
//	 	'lch(0 1 1 / 0.4621)', // 78
//	 	'lch(1 1 20deg / 0)', // 79

//	 	// LAB
//	 	'lab(29.2345% 39.3825 20.0664)', // 80
//	 	'lab(52.2345% 40.1645 59.9971)', // 81
//	 	'lab(52.2345% 40.1645 59.9971 / .5)', // 82
//	 	'lab(72.58% -48.24 72.19)', // 83

//	 	// OKLAB
//	 	'oklab(40.1% 0.1143 0.045)', // 84
//	 	'oklab(59.69% 0.1007 0.1191)', // 85
//	 	'oklab(59.69% 0.1007 0.1191 / 0.5)', // 86
//	 	'oklab(74.76% -0.138 0.154)', // 87
//	 ];

describe('ColorParser can parse strings in rbg functional notation', () => {
	test('can parse a string with comma-separated, integer values: rgb(R, B, G)', () => {
		const rbgString = 'rgb(1, 225, 236)';
		const result = ColorParser.parse(rbgString);
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

	test('can parse a string with comma-separated, percent values: rgb(R%, B%, G%)', () => {
		const hexString = 'rgb(47%, 92%, 0%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#78EB00');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.3, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 83.53, a: -62.89, b: 80.7, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 83.53, c: 102.31, h: 127.93, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 83.73, a: -0.1764, b: 0.1729, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 83.73, c: 0.247, h: 135.58, a: 1 });
		}
	});
});

describe('ColorParser can parse strings in rbga functional notation', () => {
	test('can parse a string with color channels as comma-separated, integer values and alpha as a float value: rgba(R,B,G,A)', () => {
		const rbgString = 'rgba(1,225,236,0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#01E1EC82');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 0.51 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 81.79, a: -40.44, b: -18.18, A: 0.51 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 81.79, c: 44.34, h: 204.2, a: 0.51 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 82.76, a: -0.1312, b: -0.0507, A: 0.51 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 82.76, c: 0.1407, h: 201.13, a: 0.51 });
		}
	});

	test('can parse a string with color channels as comma-separated, percent values and alpha as a percent value: rgba(R%,B%,G%,A%)', () => {
		const rbgString = 'rgba(47%,92%,0%,80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.3, s: 100, l: 46, a: 0.8 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 83.53, a: -62.89, b: 80.7, A: 0.8 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 83.53, c: 102.31, h: 127.93, a: 0.8 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 83.73, a: -0.1764, b: 0.1729, A: 0.8 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 83.73, c: 0.247, h: 135.58, a: 0.8 });
		}
	});

	test('can parse a string with color channels as comma-separated, percent values and alpha as a float value: rgba(R%,B%,G%,A)', () => {
		const rbgString = 'rgba(47%,92%,0%,0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.3, s: 100, l: 46, a: 0.8 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 83.53, a: -62.89, b: 80.7, A: 0.8 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 83.53, c: 102.31, h: 127.93, a: 0.8 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 83.73, a: -0.1764, b: 0.1729, A: 0.8 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 83.73, c: 0.247, h: 135.58, a: 0.8 });
		}
	});
});

describe('ColorParser can parse rgb strings in CSS Colors 4 notation', () => {
	test('can parse a string with space-separated, percent values: rgb(R% B% G%)', () => {
		const hexString = 'rgb(0% 0% 27%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#000045');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 69, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13.5, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 3.86, a: 26.42, b: -40.27, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 3.86, c: 48.16, h: 303.27, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 17.62, a: -0.0126, b: -0.1215, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 17.62, c: 0.1221, h: 264.06, a: 1 });
		}
	});

	test('can parse a string with space-separated, integer values: rgb(R B G)', () => {
		const rbgString = 'rgb(238 0 204)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EE00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.6, s: 100, l: 46.7, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 54.6, a: 88.72, b: -41.37, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 54.6, c: 97.89, h: 335, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 64.71, a: 0.2621, b: -0.1132, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 64.71, c: 0.2855, h: 336.65, a: 1 });
		}
	});
});

describe('ColorParser can parse rgba strings in CSS Colors 4 notation', () => {
	test('can parse a string with color channels as space-separated, integer values and alpha as a float value: rgba(R B G / A)', () => {
		const rbgString = 'rgba(1 225 236 / 0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#01E1EC82');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 0.51 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 81.79, a: -40.44, b: -18.18, A: 0.51 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 81.79, c: 44.34, h: 204.2, a: 0.51 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 82.76, a: -0.1312, b: -0.0507, A: 0.51 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 82.76, c: 0.1407, h: 201.13, a: 0.51 });
		}
	});

	test('can parse a string with color channels as space-separated, percent values and alpha as a percent value: rgba(R% B% G% / A%)', () => {
		const rbgString = 'rgba(47% 92% 0% / 80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.3, s: 100, l: 46, a: 0.8 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 83.53, a: -62.89, b: 80.7, A: 0.8 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 83.53, c: 102.31, h: 127.93, a: 0.8 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 83.73, a: -0.1764, b: 0.1729, A: 0.8 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 83.73, c: 0.247, h: 135.58, a: 0.8 });
		}
	});

	test('can parse a string with color channels as space-separated, percent values and alpha as a float value: rgba(R% B% G% / A)', () => {
		const rbgString = 'rgba(47% 92% 0% / 0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = clampColorComponents(result.value);
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.3, s: 100, l: 46, a: 0.8 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 83.53, a: -62.89, b: 80.7, A: 0.8 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 83.53, c: 102.31, h: 127.93, a: 0.8 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 83.73, a: -0.1764, b: 0.1729, A: 0.8 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 83.73, c: 0.247, h: 135.58, a: 0.8 });
		}
	});
});
