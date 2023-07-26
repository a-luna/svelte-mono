import { ColorParser } from '$lib/color';
import type { HslColor, LabColor, LchColor, OklabColor, OklchColor, RgbColor } from '$lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse strings in HSL functional notation', () => {
	test('can parse a string with unitless hue, and comma-separated, percent values: hsl(H, S%, L%)', () => {
		const hexString = 'hsl(309, 100%, 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 1 });
		}
	});

	test('can parse a string with hue in degrees and comma-separated, percent values: hsl(Hdeg, S%, L%)', () => {
		const hexString = 'hsl(309deg,100%,46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 1 });
		}
	});

	test('can parse a string with hue in radians and comma-separated, percent values: hsl(Hrad, S%, L%)', () => {
		const hexString = 'hsl(5.39rad, 100%, 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C8');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.78, a: 87.64, b: -40.44, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.78, c: 96.53, h: 335.23, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.96, a: 0.2593, b: -0.1106, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.96, c: 0.2819, h: 336.91, a: 1 });
		}
	});

	test('can parse a string with hue in turns and comma-separated, percent values: hsl(Hturn, S%, L%)', () => {
		const hexString = 'hsl(0.86turn,100%,46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C5');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.63, a: 87.27, b: -38.93, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.63, c: 95.56, h: 335.96, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.8, a: 0.2592, b: -0.1062, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.8, c: 0.2801, h: 337.72, a: 1 });
		}
	});
});

describe('ColorParser can parse strings in HSLA functional notation', () => {
	test('can parse a string with unitless hue, and comma-separated, percent values, and alpha as a percent value: hsla(H, S%, L%, A%)', () => {
		const hexString = 'hsla(309,100%,46%,73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 0.73 });
		}
	});

	test('can parse a string with hue in degrees and comma-separated, percent values, and alpha as a float value: hsla(Hdeg, S%, L%, A)', () => {
		const hexString = 'hsla(309deg, 100%, 46%, 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 0.73 });
		}
	});

	test('can parse a string with hue in radians and comma-separated, integer values, and alpha as a percent value: hsla(Hrad, S%, L%, A%)', () => {
		const hexString = 'hsla(5.39rad,100%,46%,73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C8BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.78, a: 87.64, b: -40.44, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.78, c: 96.53, h: 335.23, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.96, a: 0.2593, b: -0.1106, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.96, c: 0.2819, h: 336.91, a: 0.73 });
		}
	});

	test('can parse a string with hue in turns and comma-separated, integer values, and alpha as a float value: hsla(Hturn, S%, L%, A)', () => {
		const hexString = 'hsla(0.86turn, 100%, 46%, 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C5BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.63, a: 87.27, b: -38.93, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.63, c: 95.56, h: 335.96, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.8, a: 0.2592, b: -0.1062, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.8, c: 0.2801, h: 337.72, a: 0.73 });
		}
	});
});

describe('ColorParser can parse HSL strings in CSS Colors 4 notation', () => {
	test('can parse a string with unitless hue, and space-separated, percent values: hsl(H S% L%)', () => {
		const hexString = 'hsl(309 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 1 });
		}
	});

	test('can parse a string with hue in degrees and space-separated, percent values: hsl(Hdeg S% L%)', () => {
		const hexString = 'hsl(309deg 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 1 });
		}
	});

	test('can parse a string with hue in radians and space-separated, percent values: hsl(Hrad S% L%)', () => {
		const hexString = 'hsl(5.39rad 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C8');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.78, a: 87.64, b: -40.44, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.78, c: 96.53, h: 335.23, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.96, a: 0.2593, b: -0.1106, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.96, c: 0.2819, h: 336.91, a: 1 });
		}
	});

	test('can parse a string with hue in turns and space-separated, percent values: hsl(Hturn S% L%)', () => {
		const hexString = 'hsl(0.86turn 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(false);
			expect(color.hex).toStrictEqual<string>('#EB00C5');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 1 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.63, a: 87.27, b: -38.93, A: 1 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.63, c: 95.56, h: 335.96, a: 1 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.8, a: 0.2592, b: -0.1062, A: 1 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.8, c: 0.2801, h: 337.72, a: 1 });
		}
	});

	test('can parse a string with unitless hue, and space-separated, percent values, and alpha as a percent value: hsl(H S% L% / A%)', () => {
		const hexString = 'hsl(309 100% 46% / 73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 0.73 });
		}
	});

	test('can parse a string with hue in degrees and space-separated, percent values, and alpha as a float value: hsl(Hdeg S% L% / A)', () => {
		const hexString = 'hsl(309deg 100% 46% / 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.75, a: 87.56, b: -40.1, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.75, c: 96.31, h: 335.39, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.92, a: 0.2593, b: -0.1096, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.92, c: 0.2815, h: 337.09, a: 0.73 });
		}
	});

	test('can parse a string with hue in radians and space-separated, integer values, and alpha as a percent value: hsl(Hrad S% L% / A%)', () => {
		const hexString = 'hsl(5.39rad 100% 46% / 73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C8BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.78, a: 87.64, b: -40.44, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.78, c: 96.53, h: 335.23, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.96, a: 0.2593, b: -0.1106, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.96, c: 0.2819, h: 336.91, a: 0.73 });
		}
	});

	test('can parse a string with hue in turns and space-separated, integer values, and alpha as a float value: hsl(Hturn S% L% / A)', () => {
		const hexString = 'hsl(0.86turn 100% 46% / 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hasAlpha).toStrictEqual<boolean>(true);
			expect(color.hex).toStrictEqual<string>('#EB00C5BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 0.73 });
			expect(color.lab).toStrictEqual<LabColor>({ l: 53.63, a: 87.27, b: -38.93, A: 0.73 });
			expect(color.lch).toStrictEqual<LchColor>({ l: 53.63, c: 95.56, h: 335.96, a: 0.73 });
			expect(color.oklab).toStrictEqual<OklabColor>({ l: 63.8, a: 0.2592, b: -0.1062, A: 0.73 });
			expect(color.oklch).toStrictEqual<OklchColor>({ l: 63.8, c: 0.2801, h: 337.72, a: 0.73 });
		}
	});
});
