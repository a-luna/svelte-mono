import { EPSILON, KAPPA, P3_TO_XYZ_MATRIX, REC2020_TO_XYZ_MATRIX, RGB_TO_XYZ_MATRIX } from '$lib/color/converters/util';
import { multiplyMatrix3x3ByVector } from '$lib/color/converters/util/matrix';
import { decimalToOpacityValue } from '$lib/color/util';
import type { LabColor, Matrix1x3, Matrix3x3, RgbColor, XyzColor } from '$lib/types';

export const rgbToLab = (rgb: RgbColor): LabColor => xyzToLab(rgbToXyz(rgb));
export const p3ToLab = (p3: RgbColor): LabColor => xyzToLab(p3ToXyz(p3));
export const rec2020ToLab = (r2020: RgbColor): LabColor => xyzToLab(rec2020ToXyz(r2020));

// Converts sRGB colour given as a triple of 8-bit integers
// into XYZ colour space (with white’s Y value equal 1).
function rgbToXyzInColorSpace(rgb: RgbColor, conversionMatrix: Matrix3x3): XyzColor {
	const { r, g, b } = rgb;
	const linearRgb: Matrix1x3 = [expandGamma(r), expandGamma(g), expandGamma(b)];
	const [x, y, z] = multiplyMatrix3x3ByVector(conversionMatrix, linearRgb);
	return { x, y, z, a: decimalToOpacityValue(rgb.a) };
}

const rgbToXyz = (rgb: RgbColor): XyzColor => rgbToXyzInColorSpace(rgb, RGB_TO_XYZ_MATRIX);
const p3ToXyz = (rgb: RgbColor): XyzColor => rgbToXyzInColorSpace(rgb, P3_TO_XYZ_MATRIX);
const rec2020ToXyz = (rgb: RgbColor): XyzColor => rgbToXyzInColorSpace(rgb, REC2020_TO_XYZ_MATRIX);

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
