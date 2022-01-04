import { ColorParser } from '$lib/parser';
import type { HslColor, RgbColor } from '$lib/types';

describe('ColorParser can parse strings in hsl functional notation', () => {
	it('can parse a string with unitless hue, and comma-separated, percent values: hsl(H, S%, L%)', () => {
		const hexString = 'hsl(309, 100%, 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with hue in degrees and comma-separated, percent values: hsl(Hdeg, S%, L%)', () => {
		const hexString = 'hsl(309deg,100%,46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with hue in radians and comma-separated, percent values: hsl(Hrad, S%, L%)', () => {
		const hexString = 'hsl(5.39rad, 100%, 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00cb');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 203 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 308, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with hue in turns and comma-separated, percent values: hsl(Hturn, S%, L%)', () => {
		const hexString = 'hsl(0.86turn,100%,46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});
});

describe('ColorParser can parse strings in hsla functional notation', () => {
	it('can parse a string with unitless hue, and comma-separated, percent values, and alpha as a percent value: hsla(H, S%, L%, A%)', () => {
		const hexString = 'hsla(309,100%,46%,73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7ba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with hue in degrees and comma-separated, percent values, and alpha as a float value: hsla(Hdeg, S%, L%, A)', () => {
		const hexString = 'hsla(309deg, 100%, 46%, 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7ba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with hue in radians and comma-separated, integer values, and alpha as a percent value: hsla(Hrad, S%, L%, A%)', () => {
		const hexString = 'hsla(5.39rad,100%,46%,73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00cbba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 203, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 308, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with hue in turns and comma-separated, integer values, and alpha as a float value: hsla(Hturn, S%, L%, A)', () => {
		const hexString = 'hsla(0.86turn, 100%, 46%, 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7ba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});
});

describe('ColorParser can parse hsl strings in CSS Colors 4 notation', () => {
	it('can parse a string with unitless hue, and space-separated, percent values: hsl(H S% L%)', () => {
		const hexString = 'hsl(309 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with hue in degrees and space-separated, percent values: hsl(Hdeg S% L%)', () => {
		const hexString = 'hsl(309deg 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with hue in radians and space-separated, percent values: hsl(Hrad S% L%)', () => {
		const hexString = 'hsl(5.39rad 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00cb');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 203 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 308, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with hue in turns and space-separated, percent values: hsl(Hturn S% L%)', () => {
		const hexString = 'hsl(0.86turn 100% 46%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});
});

describe('ColorParser can parse hsla strings in CSS Colors 4 notation', () => {
	it('can parse a string with unitless hue, and space-separated, percent values, and alpha as a percent value: hsla(H S% L% / A%)', () => {
		const hexString = 'hsla(309 100% 46% / 73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7ba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with hue in degrees and space-separated, percent values, and alpha as a float value: hsla(Hdeg S% L% / A)', () => {
		const hexString = 'hsla(309deg 100% 46% / 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7ba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with hue in radians and space-separated, integer values, and alpha as a percent value: hsla(Hrad S% L% / A%)', () => {
		const hexString = 'hsla(5.39rad 100% 46% / 73%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00cbba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 203, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 308, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with hue in turns and space-separated, integer values, and alpha as a float value: hsla(Hturn S% L% / A)', () => {
		const hexString = 'hsla(0.86turn 100% 46% / 0.73)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#eb00c7ba');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 235, g: 0, b: 199, a: 186 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46, a: 0.73 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});
});
