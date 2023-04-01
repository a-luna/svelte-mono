import { ColorParser } from '$lib/parser';
import type { HslColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse strings in rbg functional notation', () => {
	test('can parse a string with comma-separated, integer values: rgb(R, B, G)', () => {
		const rbgString = 'rgb(1, 225, 236)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#01E1EC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 255 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 1 });
	});

	test('can parse a string with comma-separated, percent values: rgb(R%, B%, G%)', () => {
		const hexString = 'rgb(47%, 92%, 0%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#78EB00');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 255 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 1 });
	});
});

describe('ColorParser can parse strings in rbga functional notation', () => {
	test('can parse a string with color channels as comma-separated, integer values and alpha as a float value: rgba(R,B,G,A)', () => {
		const rbgString = 'rgba(1,225,236,0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#01E1EC82');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 0.51 });
	});

	test('can parse a string with color channels as comma-separated, percent values and alpha as a percent value: rgba(R%,B%,G%,A%)', () => {
		const rbgString = 'rgba(47%,92%,0%,80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#78EB00CC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
	});

	test('can parse a string with color channels as comma-separated, percent values and alpha as a float value: rgba(R%,B%,G%,A)', () => {
		const rbgString = 'rgba(47%,92%,0%,0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#78EB00CC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
	});
});

describe('ColorParser can parse rgb strings in CSS Colors 4 notation', () => {
	test('can parse a string with space-separated, percent values: rgb(R% B% G%)', () => {
		const hexString = 'rgb(0% 0% 27%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#000045');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 69, a: 255 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13.5, a: 1 });
	});

	test('can parse a string with space-separated, integer values: rgb(R B G)', () => {
		const rbgString = 'rgb(238 0 204)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#EE00CC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204, a: 255 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 308.6, s: 100, l: 46.7, a: 1 });
	});
});

describe('ColorParser can parse rgba strings in CSS Colors 4 notation', () => {
	test('can parse a string with color channels as space-separated, integer values and alpha as a float value: rgba(R B G / A)', () => {
		const rbgString = 'rgba(1 225 236 / 0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#01E1EC82');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 0.51 });
	});

	test('can parse a string with color channels as space-separated, percent values and alpha as a percent value: rgba(R% B% G% / A%)', () => {
		const rbgString = 'rgba(47% 92% 0% / 80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#78EB00CC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
	});

	test('can parse a string with color channels as space-separated, percent values and alpha as a float value: rgba(R% B% G% / A)', () => {
		const rbgString = 'rgba(47% 92% 0% / 0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#78EB00CC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89.4, s: 100, l: 46.1, a: 0.8 });
	});
});
