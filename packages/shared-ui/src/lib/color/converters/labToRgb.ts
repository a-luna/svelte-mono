import { CBRT_EPSILON, KAPPA, XYZ_TO_RGB_MATRIX } from '$lib/color/converters/util/constants';
import { multiplyMatrix3x3ByVector } from '$lib/color/converters/util/matrix';
import type { LabColor, RgbColor, XyzColor } from '$lib/types';

export const labToRgb = (lab: LabColor): RgbColor => xyzToRgb(labToXyz(lab));

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
// equal 1) into an sRGB colour specified as a triple of 8-bit integers.
function xyzToRgb(xyz: XyzColor): RgbColor {
	const { x, y, z, a } = xyz;
	const nonLinearRgb = multiplyMatrix3x3ByVector(XYZ_TO_RGB_MATRIX, [x, y, z]);
	return {
		r: compressGamma(nonLinearRgb[0]),
		g: compressGamma(nonLinearRgb[1]),
		b: compressGamma(nonLinearRgb[2]),
		a: a * 255.0,
	};
}

function compressGamma(linearValue: number): number {
	const nonLinear =
		linearValue <= 0.0031306684425006078 ? 3294.6 * linearValue : 269.025 * Math.pow(linearValue, 5.0 / 12.0) - 14.025;
	return Math.max(0.0, Math.min(255.0, nonLinear || 0));
}
