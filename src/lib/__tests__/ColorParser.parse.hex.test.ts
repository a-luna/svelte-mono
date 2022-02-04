import { ColorParser } from '$lib/parser';
import type { HslColor, RgbColor } from '$lib/types';

describe('ColorParser can parse strings in hexadecimal notation', () => {
	it('can parse a 3-digit hex string: #RGB', () => {
		const hexString = '#004';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#000044');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 68, a: 255 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13, a: 1 });
	});

	it('can parse a 4-digit hex string: #RGBA', () => {
		const hexString = '#e0cc';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#EE00CCCC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.8 });
	});

	it('can parse a 6-digit hex string: #RRGGBB', () => {
		const hexString = '#01e1ec';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#01E1EC');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 255 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 183, s: 99, l: 46, a: 1 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a 8-digit hex string: #RRGGBBAA', () => {
		const hexString = '#79eb0082';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hexAlpha).toStrictEqual<string>('#79EB0082');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 121, g: 235, b: 0, a: 130 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89, s: 100, l: 46, a: 0.51 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});
});
