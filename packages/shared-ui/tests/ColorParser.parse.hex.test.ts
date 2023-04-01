import { ColorParser } from '../src/lib/parser';
import type { HslColor, RgbColor } from '../src/lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse strings in hexadecimal notation', () => {
	test('can parse a 3-digit hex string: #RGB', () => {
		const hexString = '#004';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#000044');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 68, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13.3, a: 1 });
		}
	});

	test('can parse a 4-digit hex string: #RGBA', () => {
		const hexString = '#e0cc';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EE00CCCC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204, a: 204 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.6, s: 100, l: 46.7, a: 0.8 });
		}
	});

	test('can parse a 6-digit hex string: #RRGGBB', () => {
		const hexString = '#01e1ec';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#01E1EC');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 182.8, s: 99.2, l: 46.5, a: 1 });
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
		}
	});

	test('can parse a 8-digit hex string: #RRGGBBAA', () => {
		const hexString = '#79eb0082';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#79EB0082');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 121, g: 235, b: 0, a: 130 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 89.1, s: 100, l: 46.1, a: 0.51 });
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
		}
	});
});
