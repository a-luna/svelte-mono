import { ColorParser } from '$lib/parser';
import type { HslColor, RgbColor } from '$lib/types';

describe('ColorParser can parse strings in rbg functional notation', () => {
	it('can parse a string with comma-separated, integer values: rgb(R, B, G)', () => {
		const rbgString = 'rgb(1, 225, 236)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#01e1ec');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 183, s: 99, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with comma-separated, percent values: rgb(R%, B%, G%)', () => {
		const hexString = 'rgb(47%, 92%, 0%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#78eb00');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});
});

describe('ColorParser can parse strings in rbga functional notation', () => {
	it('can parse a string with color channels as comma-separated, integer values and alpha as a float value: rgba(R,B,G,A)', () => {
		const rbgString = 'rgba(1,225,236,0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#01e1ec82');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 183, s: 99, l: 46, a: 0.51 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with color channels as comma-separated, percent values and alpha as a percent value: rgba(R%,B%,G%,A%)', () => {
		const rbgString = 'rgba(47%,92%,0%,80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#78eb00cc');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89, s: 100, l: 46, a: 0.8 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with color channels as comma-separated, percent values and alpha as a float value: rgba(R%,B%,G%,A)', () => {
		const rbgString = 'rgba(47%,92%,0%,0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#78eb00cc');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89, s: 100, l: 46, a: 0.8 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});
});

describe('ColorParser can parse rgb strings in CSS Colors 4 notation', () => {
	it('can parse a string with space-separated, percent values: rgb(R% B% G%)', () => {
		const hexString = 'rgb(0% 0% 27%)';
		const result = ColorParser.parse(hexString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#000045');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 0, g: 0, b: 69 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 240, s: 100, l: 13 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});

	it('can parse a string with space-separated, integer values: rgb(R B G)', () => {
		const rbgString = 'rgb(238 0 204)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#ee00cc');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 238, g: 0, b: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 309, s: 100, l: 46 });
		expect(color.hasAlpha).toStrictEqual<boolean>(false);
	});
});

describe('ColorParser can parse rgba strings in CSS Colors 4 notation', () => {
	it('can parse a string with color channels as space-separated, integer values and alpha as a float value: rgba(R B G / A)', () => {
		const rbgString = 'rgba(1 225 236 / 0.51)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#01e1ec82');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 1, g: 225, b: 236, a: 130 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 183, s: 99, l: 46, a: 0.51 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with color channels as space-separated, percent values and alpha as a percent value: rgba(R% B% G% / A%)', () => {
		const rbgString = 'rgba(47% 92% 0% / 80%)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#78eb00cc');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89, s: 100, l: 46, a: 0.8 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});

	it('can parse a string with color channels as space-separated, percent values and alpha as a float value: rgba(R% B% G% / A)', () => {
		const rbgString = 'rgba(47% 92% 0% / 0.8)';
		const result = ColorParser.parse(rbgString);
		expect(result.success).toStrictEqual<boolean>(true);
		const color = result.value;
		expect(color.hex).toStrictEqual<string>('#78eb00cc');
		expect(color.rgb).toStrictEqual<RgbColor>({ r: 120, g: 235, b: 0, a: 204 });
		expect(color.hsl).toStrictEqual<HslColor>({ h: 89, s: 100, l: 46, a: 0.8 });
		expect(color.hasAlpha).toStrictEqual<boolean>(true);
	});
});
