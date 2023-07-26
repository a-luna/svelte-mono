import { ColorParser } from '$lib/color';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse named X11 colors', () => {
	test('can parse the string "Peach Puff"', () => {
		const namedColorString = 'Peach Puff';
		const result = ColorParser.parse(namedColorString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#FFDAB9');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 255, g: 218, b: 185, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 28.3, s: 100, l: 86.3, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 89.35, a: 8.08, b: 21.02, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 89.35, c: 22.52, h: 68.97, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 91.13, a: 0.0266, b: 0.0537, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 91.13, c: 0.0599, h: 63.68, a: 1 });
		}
	});

	test.skip('can parse the string "chartreuse"', () => {
		const namedColorString = 'chartreuse';
		const result = ColorParser.parse(namedColorString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#7FFF00');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 127, g: 255, b: 0, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 90.1, s: 100, l: 50, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 89.87, a: -68.07, b: 85.78, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 89.87, c: 109.51, h: 128.43, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 89.03, a: -0.1905, b: 0.1838, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 89.03, c: 0.2648, h: 136.02, a: 1 });
		}
	});
});
