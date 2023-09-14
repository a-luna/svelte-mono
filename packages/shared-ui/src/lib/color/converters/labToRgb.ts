import {
	CBRT_EPSILON,
	KAPPA,
	XYZ_TO_P3_MATRIX,
	XYZ_TO_REC2020_MATRIX,
	XYZ_TO_RGB_MATRIX,
	multiplyMatrix3x3ByVector,
} from '$lib/color/converters/util';
import type { LabColor, Matrix3x3, RgbColor, XyzColor } from '$lib/types';

export const labToRgb = (lab: LabColor): RgbColor => xyzToSrgb(labToXyz(lab));
export const labToP3 = (lab: LabColor): RgbColor => xyzToP3(labToXyz(lab));
export const labToRec2020 = (lab: LabColor): RgbColor => xyzToRec2020(labToXyz(lab));

/// Converts colour from CIELAB (a.k.a. L*a*b*) space
/// using D65 reference white point to XYZ.
function labToXyz(lab: LabColor): XyzColor {
	const { l, a, b, A } = lab;
	const fy = (l + 16.0) / 116.0;
	const fx = a / 500.0 + fy;
	const fz = fy - b / 200.0;

	return {
		x: inverseTransformWithD65Whitepoint(fx) * 0.9504492182750991,
		y: l > 8 ? Math.pow(fy, 3) : l / KAPPA,
		z: inverseTransformWithD65Whitepoint(fz) * 1.0889166484304715,
		a: A,
	};
}

const inverseTransformWithD65Whitepoint = (channelValue: number): number =>
	channelValue > CBRT_EPSILON ? channelValue ** 3 : (channelValue * 116.0 - 16.0) / KAPPA;

// Converts colour given in XYZ colour space (with white’s Y value
// equal 1) into a color within the specified color space as a triple of 8-bit integers.
function xyzToRgbInColorSpace(xyz: XyzColor, conversionMatrix: Matrix3x3): RgbColor {
	const { x, y, z, a } = xyz;
	const nonLinearRgb = multiplyMatrix3x3ByVector(conversionMatrix, [x, y, z]);
	return {
		r: compressGamma(nonLinearRgb[0]),
		g: compressGamma(nonLinearRgb[1]),
		b: compressGamma(nonLinearRgb[2]),
		a,
	};
}

const compressGamma = (linearValue: number): number =>
	linearValue <= 0.0031306684425006078 ? 3294.6 * linearValue : 269.025 * Math.pow(linearValue, 5.0 / 12.0) - 14.025;

const xyzToSrgb = (xyz: XyzColor): RgbColor => xyzToRgbInColorSpace(xyz, XYZ_TO_RGB_MATRIX);
const xyzToP3 = (xyz: XyzColor): RgbColor => xyzToRgbInColorSpace(xyz, XYZ_TO_P3_MATRIX);
const xyzToRec2020 = (xyz: XyzColor): RgbColor => xyzToRgbInColorSpace(xyz, XYZ_TO_REC2020_MATRIX);
