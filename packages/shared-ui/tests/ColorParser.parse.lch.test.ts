import { ColorParser } from '$lib/color';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse LCH strings in CSS Colors 4 notation', () => {
	test('can parse a string with luminosity as a percentage, chroma as a unitless number, hue as a unitless number, and alpha value as a percentage: lch(L% C H / a%)', () => {
		const lchString = 'lch(18% 0 224 / 85%)';
		const result = ColorParser.parse(lchString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#2C2C2CD9');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 44, g: 44, b: 44, a: 217 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 0, s: 0, l: 17.3, a: 0.85 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 18, a: 0, b: 0, A: 0.85 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 18, c: 0, h: 224, a: 0.85 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 29.31, a: 0, b: 0, A: 0.85 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 29.31, c: 0, h: 257.32, a: 0.85 });
		}
	});

	test('can parse a string with luminosity as a unitless number, chroma as a percentage, hue as an angle repersented in radians, and alpha value as a unitless number: lch(L C% Hrad / a% )', () => {
		const oklchString = 'lch(52.92 16.67% 4.88186rad / 0.5)';
		const result = ColorParser.parse(oklchString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#6C7EA880');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 108, g: 126, b: 168, a: 128 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 222.4, s: 25.7, l: 54.3, a: 0.5 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 52.92, a: 4.22, b: -24.65, A: 0.5 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 52.92, c: 25.01, h: 279.71, a: 0.5 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 59.55, a: -0.0037, b: -0.0684, A: 0.5 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 59.55, c: 0.0685, h: 266.9, a: 0.5 });
		}
	});
});
