import { cssColorFromHsl, cssColorFromLch, cssColorFromOkhsl, cssColorFromOklch } from '$lib/color/parsers';
import { getCssColorString } from '$lib/color/util';
import { COLOR_FORMATS } from '$lib/constants';
import { isAdjustableColorFormat, isHslColor, isLchColor, isOkhslColor, isOklchColor } from '$lib/typeguards';
import type {
	AdjustableColorFormat,
	ColorFormat,
	ColorSchemeSet,
	ColorSpace,
	CssColor,
	CssColorForColorSpace,
	Result,
} from '$lib/types';
import type { HasHueAndLightness } from '$lib/types/ColorFormats';
import type { ColorSchemeComparisonForAllColorFormats, ColorSchemeSetForColorFormat } from '$lib/types/ColorScheme';
import { defaultColorSchemeSet } from './constants';

// oklch(91.47% 0.274 126.84)

export function getColorSchemesForAllColorFormats(color: CssColor): ColorSchemeComparisonForAllColorFormats {
	const schemeComparison: { [k: string]: ColorSchemeSet } = {
		hsl: defaultColorSchemeSet,
		lch: defaultColorSchemeSet,
		okhsl: defaultColorSchemeSet,
		oklch: defaultColorSchemeSet,
	};
	for (const format of COLOR_FORMATS) {
		if (isAdjustableColorFormat(format)) {
			schemeComparison[format] = getColorSchemes(color, format);
		}
	}
	return {
		hex: getCssColorStrings(schemeComparison.hsl ?? defaultColorSchemeSet, 'hex'),
		rgb: getCssColorStrings(schemeComparison.hsl ?? defaultColorSchemeSet, 'rgb'),
		hsl: getCssColorStrings(schemeComparison.hsl ?? defaultColorSchemeSet, 'hsl'),
		lab: getCssColorStrings(schemeComparison.lch ?? defaultColorSchemeSet, 'lab'),
		lch: getCssColorStrings(schemeComparison.lch ?? defaultColorSchemeSet, 'lch'),
		okhsl: getCssColorStrings(schemeComparison.okhsl ?? defaultColorSchemeSet, 'okhsl'),
		oklab: getCssColorStrings(schemeComparison.oklch ?? defaultColorSchemeSet, 'oklab'),
		oklch: getCssColorStrings(schemeComparison.oklch ?? defaultColorSchemeSet, 'oklch'),
	};
}

export function getColorSchemes(color: CssColor, colorFormat: AdjustableColorFormat): ColorSchemeSet {
	const schemes: ColorSchemeSet = {
		base: [],
		complementary: [],
		split: [],
		analogous: [],
		triadic: [],
		tetradic: [],
		square: [],
		monochrome: [],
	};
	schemes.base = [color];
	const result1 = getComplementaryColor(color, colorFormat);
	if (result1.success && result1.value) {
		schemes.complementary = [result1.value];
	}
	const result2 = getSplitComplementaryColors(color, colorFormat);
	if (result2.success && result2.value) {
		schemes.split = result2.value;
	}
	const result3 = getAnalogousColors(color, colorFormat);
	if (result3.success && result3.value) {
		schemes.analogous = result3.value;
	}
	const result4 = getTriadicColors(color, colorFormat);
	if (result4.success && result4.value) {
		schemes.triadic = result4.value;
	}
	const result5 = getRectangularColors(color, colorFormat, { hueChange: -60 });
	if (result5.success && result5.value) {
		schemes.tetradic = result5.value;
	}
	const result6 = getSquareColors(color, colorFormat);
	if (result6.success && result6.value) {
		schemes.square = result6.value;
	}
	schemes.monochrome = getMonochromePalette(color, colorFormat, { paletteSize: 10, stepSize: 5 });

	return schemes;
}

export const getComplementaryColor = (color: CssColor, colorFormat: AdjustableColorFormat): Result<CssColor> =>
	adjustHue(color, colorFormat, { hueChange: 180 });

export function getTriadicColors(color: CssColor, colorFormat: AdjustableColorFormat): Result<CssColor[]> {
	let [r1, r2]: [CssColor | undefined, CssColor | undefined] = [undefined, undefined];
	let result = adjustHue(color, colorFormat, { hueChange: 120 });
	if (result.success && result.value) {
		r1 = result.value;
	}
	result = adjustHue(color, colorFormat, { hueChange: 240 });
	if (result.success && result.value) {
		r2 = result.value;
	}
	if (r1 && r2) {
		return { success: true, value: [r1, r2] };
	}
	return {
		success: false,
		error: Error(`Error calculating getAnalogousColors(color=${color}, colorFormat=${colorFormat}`),
	};
}

export function getAnalogousColors(color: CssColor, colorFormat: AdjustableColorFormat): Result<[CssColor, CssColor]> {
	let [r1, r2]: [CssColor | undefined, CssColor | undefined] = [undefined, undefined];
	const result1 = adjustHue(color, colorFormat, { hueChange: 30 });
	if (result1.success && result1.value) {
		r1 = result1.value;
	}
	const result2 = adjustHue(color, colorFormat, { hueChange: -30 });
	if (result2.success && result2.value) {
		r2 = result2.value;
	}
	if (r1 && r2) {
		return { success: true, value: [r1, r2] };
	}
	return {
		success: false,
		error: Error(`Error calculating getAnalogousColors(color=${color}, colorFormat=${colorFormat}`),
	};
}
export const getTetradicColors = (
	color: CssColor,
	colorFormat: AdjustableColorFormat,
): Result<[CssColor, CssColor, CssColor]> => getRectangularColors(color, colorFormat, { hueChange: -60 });

export const getSquareColors = (
	color: CssColor,
	colorFormat: AdjustableColorFormat,
): Result<[CssColor, CssColor, CssColor]> => getRectangularColors(color, colorFormat, { hueChange: 90 });

export function getSplitComplementaryColors(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
): Result<[CssColor, CssColor]> {
	const result = getComplementaryColor(color, colorFormat);
	if (result.success) {
		const complement = result.value;
		return getAnalogousColors(complement, colorFormat);
	}
	return {
		success: false,
		error: Error(`Error occurred calculating getSplitComplementaryColors(color=${color}, colorFormat=${colorFormat})`),
	};
}

function getRectangularColors(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
	options: { hueChange: number },
): Result<[CssColor, CssColor, CssColor]> {
	const { hueChange } = options;
	let [r1, r2, r3]: [CssColor | undefined, CssColor | undefined, CssColor | undefined] = [
		undefined,
		undefined,
		undefined,
	];
	let result = adjustHue(color, colorFormat, { hueChange });
	if (result.success && result.value) {
		r1 = result.value;
	}
	result = adjustHue(color, colorFormat, { hueChange: 180 });
	if (result.success && result.value) {
		r2 = result.value;
	}
	result = adjustHue(color, colorFormat, { hueChange: 80 + hueChange });
	if (result.success && result.value) {
		r3 = result.value;
	}
	if (r1 && r2 && r3) {
		return { success: true, value: [r1, r2, r3] };
	}
	return {
		success: false,
		error: Error(`Error calculating adjustHue(color=${color}, colorFormat=${colorFormat}, { hueChange=${hueChange} })`),
	};
}

function getMonochromePalette(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
	options: {
		paletteSize?: number;
		stepSize?: number;
	},
): CssColor[] {
	const defaultOptions = { paletteSize: 10, stepSize: 5 };
	const { paletteSize, stepSize } = { ...defaultOptions, ...options };
	const idealNumberOfShadesAndTints = Math.floor(paletteSize / 2);
	const palette = getShadesAndTintsForColor(color, colorFormat, { stepSize });
	const colorIndex = palette.findIndex((pColor) => pColor[colorFormat].l === color[colorFormat].l);
	if (colorIndex < idealNumberOfShadesAndTints) return palette.slice(0, paletteSize + 1);
	if (colorIndex >= palette.length - idealNumberOfShadesAndTints) return palette.slice(-(paletteSize + 1));
	return palette.slice(colorIndex - idealNumberOfShadesAndTints, colorIndex + idealNumberOfShadesAndTints + 1);
}

function getShadesAndTintsForColor(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
	options: { stepSize: number },
): CssColor[] {
	const { stepSize } = options;
	const colorInGamut = getColorInGamut(color, colorFormat);
	const [totalShades, totalTints] = [~~(colorInGamut[colorFormat].l / 5), ~~((100 - colorInGamut[colorFormat].l) / 5)];
	const shades = Array.from({ length: totalShades }, (_, i) => i)
		.flatMap((i) => {
			const lightChange = stepSize * (i + 1);
			const result = adjustLightness(color, colorFormat, { lightChange: -lightChange });
			return result.success ? [result.value] : [];
		})
		.sort((a: CssColor, b: CssColor) => a[colorFormat].l - b[colorFormat].l);
	const tints = Array.from({ length: totalTints }, (_, i) => i)
		.flatMap((i) => {
			const lightChange = stepSize * (i + 1);
			const result = adjustLightness(color, colorFormat, { lightChange });
			return result.success ? [result.value] : [];
		})
		.sort((a: CssColor, b: CssColor) => a[colorFormat].l - b[colorFormat].l);
	const monoUnsorted = [...shades, color, ...tints];
	console.log({
		color: colorInGamut[colorFormat],
		colorInGamut,
		colorInGamut2: colorInGamut[colorFormat],
		shades: shades.map((c) => c[colorFormat]),
		tints: tints.map((c) => c[colorFormat]),
		monoUnsorted: monoUnsorted.map((c) => c[colorFormat]),
	});
	return [...shades, color, ...tints];
}

function adjustHue(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
	options: { hueChange: number },
): Result<CssColor> {
	const { hueChange } = options;
	const _color = getColorByFormat(color, colorFormat);
	const { h } = _color;
	let adjustedHue = h + hueChange;
	while (adjustedHue >= 360) adjustedHue -= 360;
	while (adjustedHue < 0) adjustedHue += 360;
	return createAdjustedColor(color, colorFormat, { adjustedHue });
}

function adjustLightness(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
	options: { lightChange: number },
): Result<CssColor> {
	const { lightChange } = options;
	const _color = getColorByFormat(color, colorFormat);
	const { l } = _color;
	const adjustedLight = l + lightChange;
	if (0 > adjustedLight || adjustedLight > 100) {
		return { success: false, error: Error(`Lightness must be within range 0-100`) };
	}
	return createAdjustedColor(color, colorFormat, { adjustedLight });
}

function getColorInGamut(color: CssColor, colorFormat: ColorFormat): CssColorForColorSpace {
	if (colorFormat === 'hsl' || colorFormat === 'okhsl') {
		return color.srbgColor;
	}
	return color.space === 'p3' ? color.p3Color : color.srbgColor;
}

const getColorByFormat = (color: CssColor, colorFormat: AdjustableColorFormat): HasHueAndLightness =>
	getColorInGamut(color, colorFormat)[colorFormat];

function createAdjustedColor(
	color: CssColor,
	colorFormat: AdjustableColorFormat,
	options: { adjustedLight?: number; adjustedHue?: number },
): Result<CssColor> {
	if (colorFormat === 'hsl') {
		const hsl = getColorByFormat(color, colorFormat);
		const defaultOptions = { adjustedLight: hsl.l, adjustedHue: hsl.h };
		const { adjustedLight, adjustedHue } = { ...defaultOptions, ...options };
		if (isHslColor(hsl)) {
			const newColor = cssColorFromHsl({ ...hsl, h: adjustedHue, l: adjustedLight });
			return { success: true, value: newColor };
		}
		return {
			success: false,
			error: Error(
				`Failed to calculate createAdjustedColor(color=${color}, colorFormat=${colorFormat}, { adjustedHue=${adjustedHue}, adjustedLight=${adjustedLight} })`,
			),
		};
	}
	if (colorFormat === 'okhsl') {
		const okhsl = getColorByFormat(color, colorFormat);
		const defaultOptions = { adjustedLight: okhsl.l, adjustedHue: okhsl.h };
		const { adjustedLight, adjustedHue } = { ...defaultOptions, ...options };
		if (isOkhslColor(okhsl)) {
			const newColor = cssColorFromOkhsl({ ...okhsl, h: adjustedHue, l: adjustedLight });
			return { success: true, value: newColor };
		}
		return {
			success: false,
			error: Error(
				`Failed to calculate createAdjustedColor(color=${color}, colorFormat=${colorFormat}, { adjustedHue=${adjustedHue}, adjustedLight=${adjustedLight} })`,
			),
		};
	}
	if (colorFormat === 'lch') {
		const lch = getColorByFormat(color, colorFormat);
		const defaultOptions = { adjustedLight: lch.l, adjustedHue: lch.h };
		const { adjustedLight, adjustedHue } = { ...defaultOptions, ...options };
		if (isLchColor(lch)) {
			const newColor = cssColorFromLch({ ...lch, h: adjustedHue, l: adjustedLight });
			return { success: true, value: newColor };
		}
		return {
			success: false,
			error: Error(
				`Failed to calculate createAdjustedColor(color=${color}, colorFormat=${colorFormat}, { adjustedHue=${adjustedHue}, adjustedLight=${adjustedLight} })`,
			),
		};
	}
	if (colorFormat === 'oklch') {
		const oklch = getColorByFormat(color, colorFormat);
		const defaultOptions = { adjustedLight: oklch.l, adjustedHue: oklch.h };
		const { adjustedLight, adjustedHue } = { ...defaultOptions, ...options };
		if (isOklchColor(oklch)) {
			const newColor = cssColorFromOklch({ ...oklch, h: adjustedHue, l: adjustedLight });
			return { success: true, value: newColor };
		}
		return {
			success: false,
			error: Error(
				`Failed to calculate createAdjustedColor(color=${color}, colorFormat=${colorFormat}, { adjustedHue=${adjustedHue}, adjustedLight=${adjustedLight} })`,
			),
		};
	}
	return { success: false };
}

function getCssColorStrings(schemes: ColorSchemeSet, format: ColorFormat): ColorSchemeSetForColorFormat {
	const colorSpaceMap: { [k: string]: ColorSpace } = {
		hex: 'srgb',
		rgb: 'srgb',
		hsl: 'srgb',
		lab: 'p3',
		lch: 'p3',
		okhsl: 'srgb',
		oklab: 'p3',
		oklch: 'p3',
	};
	const space = colorSpaceMap[format] ?? 'srgb';
	return {
		base: schemes.base?.map((c) => getCssColorString(c, space, format)) ?? [],
		complementary: schemes.complementary?.map((c) => getCssColorString(c, space, format)) ?? [],
		split: schemes.split?.map((c) => getCssColorString(c, space, format)) ?? [],
		analogous: schemes.analogous?.map((c) => getCssColorString(c, space, format)) ?? [],
		triadic: schemes.triadic?.map((c) => getCssColorString(c, space, format)) ?? [],
		tetradic: schemes.tetradic?.map((c) => getCssColorString(c, space, format)) ?? [],
		square: schemes.square?.map((c) => getCssColorString(c, space, format)) ?? [],
		monochrome: schemes.monochrome?.map((c) => getCssColorString(c, space, format)) ?? [],
	};
}
