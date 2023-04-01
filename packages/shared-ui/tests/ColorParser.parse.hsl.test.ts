import { ColorParser } from '../src/lib/parser';
import type { HslColor, RgbColor } from '../src/lib/types';
import { describe, expect, test } from 'vitest';

describe('ColorParser can parse strings in hsl functional notation', () => {
	test('can parse a string with unitless hue, and comma-separated, percent values: hsl(H, S%, L%)', () => {
		const hexString = 'hsl(309, 100%, 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
		}
	});

	test('can parse a string with hue in degrees and comma-separated, percent values: hsl(Hdeg, S%, L%)', () => {
		const hexString = 'hsl(309deg,100%,46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
		}
	});

	test('can parse a string with hue in radians and comma-separated, percent values: hsl(Hrad, S%, L%)', () => {
		const hexString = 'hsl(5.39rad, 100%, 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C8');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 1 });
		}
	});

	test('can parse a string with hue in turns and comma-separated, percent values: hsl(Hturn, S%, L%)', () => {
		const hexString = 'hsl(0.86turn,100%,46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C5');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 1 });
		}
	});
});

describe('ColorParser can parse strings in hsla functional notation', () => {
	test('can parse a string with unitless hue, and comma-separated, percent values, and alpha as a percent value: hsla(H, S%, L%, A%)', () => {
		const hexString = 'hsla(309,100%,46%,73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		}
	});

	test('can parse a string with hue in degrees and comma-separated, percent values, and alpha as a float value: hsla(Hdeg, S%, L%, A)', () => {
		const hexString = 'hsla(309deg, 100%, 46%, 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		}
	});

	test('can parse a string with hue in radians and comma-separated, integer values, and alpha as a percent value: hsla(Hrad, S%, L%, A%)', () => {
		const hexString = 'hsla(5.39rad,100%,46%,73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C8BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 0.73 });
		}
	});

	test('can parse a string with hue in turns and comma-separated, integer values, and alpha as a float value: hsla(Hturn, S%, L%, A)', () => {
		const hexString = 'hsla(0.86turn, 100%, 46%, 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C5BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 0.73 });
		}
	});
});

describe('ColorParser can parse hsl strings in CSS Colors 4 notation', () => {
	test('can parse a string with unitless hue, and space-separated, percent values: hsl(H S% L%)', () => {
		const hexString = 'hsl(309 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
		}
	});

	test('can parse a string with hue in degrees and space-separated, percent values: hsl(Hdeg S% L%)', () => {
		const hexString = 'hsl(309deg 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 1 });
		}
	});

	test('can parse a string with hue in radians and space-separated, percent values: hsl(Hrad S% L%)', () => {
		const hexString = 'hsl(5.39rad 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C8');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 1 });
		}
	});

	test('can parse a string with hue in turns and space-separated, percent values: hsl(Hturn S% L%)', () => {
		const hexString = 'hsl(0.86turn 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C5');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 255 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 1 });
		}
	});
});

describe('ColorParser can parse hsla strings in CSS Colors 4 notation', () => {
	test('can parse a string with unitless hue, and space-separated, percent values, and alpha as a percent value: hsla(H S% L% / A%)', () => {
		const hexString = 'hsla(309 100% 46% / 73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		}
	});

	test('can parse a string with hue in degrees and space-separated, percent values, and alpha as a float value: hsla(Hdeg S% L% / A)', () => {
		const hexString = 'hsla(309deg 100% 46% / 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C7BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		}
	});

	test('can parse a string with hue in radians and space-separated, integer values, and alpha as a percent value: hsla(Hrad S% L% / A%)', () => {
		const hexString = 'hsla(5.39rad 100% 46% / 73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C8BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 200, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 308.82, s: 100, l: 46, a: 0.73 });
		}
	});

	test('can parse a string with hue in turns and space-separated, integer values, and alpha as a float value: hsla(Hturn S% L% / A)', () => {
		const hexString = 'hsla(0.86turn 100% 46% / 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		if (result.success) {
			const color = result.value;
			expect(color.hex).toStrictEqual<string>('#EB00C5BA');
			expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 197, a: 186 });
			expect(color.hsl).toStrictEqual<HslColor>({ h: 309.6, s: 100, l: 46, a: 0.73 });
		}
	});
});
