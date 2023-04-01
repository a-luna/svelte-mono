import { EPSILON, KAPPA, RGB_TO_XYZ_MATRIX } from '$lib/color/converters/util/constants';
import { multiplyMatrix3x3ByVector, type ColorValues } from '$lib/color/converters/util/matrix';
import { decimalToOpacityValue } from '$lib/color/util';
import type { LabColor, RgbColor, XyzColor } from '$lib/types';

export const rgbToLab = (rgb: RgbColor): LabColor => xyzToLab(rgbToXyz(rgb));

// Converts sRGB colour given as a triple of 8-bit integers
// into XYZ colour space (with white’s Y value equal 1).
function rgbToXyz(rgb: RgbColor): XyzColor {
	const { r, g, b } = rgb;
	const linearRgb: ColorValues = [expandGamma(r), expandGamma(g), expandGamma(b)];
	const [x, y, z] = multiplyMatrix3x3ByVector(RGB_TO_XYZ_MATRIX, linearRgb);
	return { x, y, z, a: decimalToOpacityValue(rgb.a) };
}

const expandGamma = (nonLinear: number): number =>
	nonLinear <= 10 ? nonLinear / 3294.6 : Math.pow((nonLinear + 14.025) / 269.025, 2.4);

/// Converts colour from XYZ space to CIELAB (a.k.a. L*a*b) using
/// D65 reference white point.
function xyzToLab(xyz: XyzColor): LabColor {
	const { x, y, z, a: A } = xyz;
	const fx = transformWithD65Whitepoint(x / 0.9504492182750991);
	const fy = transformWithD65Whitepoint(y);
	const fz = transformWithD65Whitepoint(z / 1.0889166484304715);
	return {
		l: 116.0 * fy - 16.0,
		a: 500.0 * (fx - fy),
		b: 200.0 * (fy - fz),
		A,
	};
}

const transformWithD65Whitepoint = (channelValue: number): number =>
	channelValue > EPSILON ? Math.cbrt(channelValue) : (KAPPA * channelValue + 16.0) / 116.0;
