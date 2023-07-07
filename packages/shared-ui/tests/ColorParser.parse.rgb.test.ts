import { describe, expect, test } from 'vitest';
import { ColorParser } from '../src/lib/color';
import type { HslColor, RgbColor } from '../src/lib/types';

// TODO: Create test cases that cover all existing AND new color space conversion/parsing processes
//	 const test = [
//	 	// Hex
//	 	'#ee89aa', // 0
//	 	'#7ac600', // 1
//	 	'#004', // 2
//	 	'#e0cc', // 3
//	 	'#01e1ec', // 4
//	 	'#79eb0082', // 5
//	 	'#E0CC', // 6
//	 	'#01E1EC', // 7
//	 	'#79EB0082', // 8
//	 	// HSL
//	 	'hsl(309, 100%, 46%)', // 9
//	 	'hsl(309deg,100%,46%)', // 10
//	 	'hsl(5.39rad, 100%, 46%)', // 11
//	 	'hsl(0.86turn,100%,46%)', // 12
//	 	'hsla(309,100%,46%,73%)', // 13
//	 	'hsla(309deg, 100%, 46%, 0.73)', // 14
//	 	'hsla(5.39rad,100%,46%,73%)', // 15
//	 	'hsla(0.86turn, 100%, 46%, 0.73)', // 16
//	 	'hsl(309 100% 46%)', // 17
//	 	'hsl(309deg 100% 46%)', // 18
//	 	'hsl(5.39rad 100% 46%)', // 19
//	 	'hsl(0.86turn 100% 46%)', // 20
//	 	'hsla(309 100% 46% / 73%)', // 21
//	 	'hsla(309deg 100% 46% / 0.73)', // 22
//	 	'hsla(5.39rad 100% 46% / 73%)', // 23
//	 	'hsla(309 100% 46% / 73%)', // 24
//	 	'hsl(309deg 100% 46% / 0.73)', // 25
//	 	'hsl(5.39rad 100% 46% / 73%)', // 26
//	 	'hsl(0.86turn 100% 46% / 0.73)', // 27
//	 	'hsl(309,100%,46%,73%)', // 28
//	 	'hsl(309deg, 100%, 46%, 0.73)', // 29
//	 	'hsl(5.39rad,100%,46%,73%)', // 30
//	 	'hsl(0.86turn, 100%, 46%, 0.73)', // 31
//	 	'hsl(1.0708rad 63.5% 26.9% / .47)', // 32
//	 	'hsl(125deg 83.15% 58.79% / 0.47)', // 33
//	 	// RGB
//	 	'rgb(1, 225, 236)', // 34
//	 	'rgb(47%, 92%, 0%)', // 35
//	 	'rgba(1,225,236,0.51)', // 36
//	 	'rgba(47%,92%,0%,80%)', // 37
//	 	'rgba(47%,92%,0%,0.8)', // 38
//	 	'rgb(1,225,236,0.51)', // 39
//	 	'rgb(47%,92%,0%,80%)', // 40
//	 	'rgb(47%,92%,0%,0.8)', // 41
//	 	'rgb(0% 0% 27%)', // 42
//	 	'rgb(238 0 204)', // 43
//	 	'rgba(1 225 236 / 0.51)', // 44
//	 	'rgba(47% 92% 0% / 80%)', // 45
//	 	'rgba(47% 92% 0% / 0.8)', // 46
//	 	'rgb(1 225 236 / 0.51)', // 47
//	 	'rgb(47% 92% 0% / 80%)', // 48
//	 	'rgb(47% 92% 0% / 0.8)', // 49
//	 	// Named Colors
//	 	'PeachPuff', // 50
//	 	'peach puff', // 51
//	 	'Midnight_blue', // 52
//	 	'chartreuse', // 53
//	 	// OKLCH
//	 	'oklch(55% 0.092 317)', // 54
//	 	'oklch(55% 23% 317)', // 55
//	 	'oklch(55% 0.092 0.88turn / 1)', // 56
//	 	'oklch(.55 23% 5.53269rad / 1)', // 57
//	 	'oklch(59.69% 0.0624 49.77 / .5)', // 58
//	 	'oklch(0.5969 15.6% 49.77deg / 50%)', // 59
//	 	'oklch(0.6 0.112 4.71239rad)', // 60
//	 	'oklch(0.6 28% 270deg)', // 61
//	 	'oklch(60.0% 28.0% 0.75turn)', // 62
//	 	'oklch(88.7% 0.062 .25turn / 50%)', // 63
//	 	'oklch(29% 0 0 / 85%)', // 64
//	 	'oklch(0 1 1 / 46.21%)', // 65
//	 	'oklch(1 1 20deg / 0)', // 66
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
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#01E1EC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 1 });
		}
	});

	test('can parse a string with comma-separated, percent values: rgb(R%, B%, G%)', () => {
		const hexString = 'rgb(47%, 92%, 0%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#78EB00');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 1 });
		}
	});
});

describe('ColorParser can parse strings in rbga functional notation', () => {
	test('can parse a string with color channels as comma-separated, integer values and alpha as a float value: rgba(R,B,G,A)', () => {
		const rbgString = 'rgba(1,225,236,0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#01E1EC82');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 0.51 });
		}
	});

	test('can parse a string with color channels as comma-separated, percent values and alpha as a percent value: rgba(R%,B%,G%,A%)', () => {
		const rbgString = 'rgba(47%,92%,0%,80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
		}
	});

	test('can parse a string with color channels as comma-separated, percent values and alpha as a float value: rgba(R%,B%,G%,A)', () => {
		const rbgString = 'rgba(47%,92%,0%,0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
		}
	});
});

describe('ColorParser can parse rgb strings in CSS Colors 4 notation', () => {
	test('can parse a string with space-separated, percent values: rgb(R% B% G%)', () => {
		const hexString = 'rgb(0% 0% 27%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#000045');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 69, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13.5, a: 1 });
		}
	});

	test('can parse a string with space-separated, integer values: rgb(R B G)', () => {
		const rbgString = 'rgb(238 0 204)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EE00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.6, s: 100, l: 46.7, a: 1 });
		}
	});
});

describe('ColorParser can parse rgba strings in CSS Colors 4 notation', () => {
	test('can parse a string with color channels as space-separated, integer values and alpha as a float value: rgba(R B G / A)', () => {
		const rbgString = 'rgba(1 225 236 / 0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#01E1EC82');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 0.51 });
		}
	});

	test('can parse a string with color channels as space-separated, percent values and alpha as a percent value: rgba(R% B% G% / A%)', () => {
		const rbgString = 'rgba(47% 92% 0% / 80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
		}
	});

	test('can parse a string with color channels as space-separated, percent values and alpha as a float value: rgba(R% B% G% / A)', () => {
		const rbgString = 'rgba(47% 92% 0% / 0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#78EB00CC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
		}
	});
});
