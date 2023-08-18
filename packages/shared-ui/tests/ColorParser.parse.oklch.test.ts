import { ColorParser } from '$lib/color';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse OKLCH strings in CSS Colors 4 notation', () => {
	test('can parse a string with luminosity as a percent value, chroma as a float value, hue as a unitless number, and alpha value as a unitless number: oklch(L% C H / a)', () => {
		const oklchString = 'oklch(63.8% 0.280 337.72 / 0.73)';
		const result = ColorParser.parse(oklchString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C5BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 99.7, l: 46.1, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.63, a: 87.24, b: -38.91, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.63, c: 95.52, h: 335.96, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.8, a: 0.2591, b: -0.1062, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.8, c: 0.28, h: 337.72, a: 0.73 });
		}
	});

	test('can parse a string with luminosity as a unitless number, chroma as a float value, hue as an angle repersented in turns, and alpha value as a percentage: oklch(L C Hturn / a% )', () => {
		const oklchString = 'oklch(88.7 0.062 .25turn / 50%)';
		const result = ColorParser.parse(oklchString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EAD9AB80');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 234, g: 217, b: 171, a: 128 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 43.7, s: 59.3, l: 79.4, a: 0.5 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 86.93, a: -1.04, b: 24.47, A: 0.5 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 86.93, c: 24.49, h: 92.42, a: 0.5 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 88.7, a: 0, b: 0.062, A: 0.5 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 88.7, c: 0.062, h: 90, a: 0.5 });
		}
	});

	test('can parse a string with luminosity as a unitless number, chroma as a float value, and hue as an angle repersented in radians: oklch(L C Hrad)', () => {
		const oklchString = 'oklch(60 0.112 4.71239rad)';
		const result = ColorParser.parse(oklchString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#667CC3');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 102, g: 124, b: 195, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 226, s: 43.7, l: 58.3, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.12, a: 11.62, b: -39.71, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.12, c: 41.38, h: 286.31, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 60, a: 0, b: -0.112, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 60, c: 0.112, h: 270, a: 1 });
		}
	});
});
