import { OKLAB_M1, OKLAB_M2, XYZ_TO_RGB_MATRIX } from '$lib/color/converters/util/constants';
import { invertMatrix3x3, multiplyMatrix3x3ByVector } from '$lib/color/converters/util/matrix';
import type { OklabColor, RgbColor, XyzColor } from '$lib/types';

export const oklabToRgb = (oklab: OklabColor): RgbColor => xyzToRgb(OklabToXyz(oklab));

function OklabToXyz(oklab: OklabColor): XyzColor {
	const { l, a, b, A } = oklab;
	const nonLinear = multiplyMatrix3x3ByVector(invertMatrix3x3(OKLAB_M2), [l / 100.0, a, b]);
	const l_ = nonLinear[0] ** 3;
	const m_ = nonLinear[1] ** 3;
	const s_ = nonLinear[2] ** 3;
	const [x, y, z] = multiplyMatrix3x3ByVector(invertMatrix3x3(OKLAB_M1), [l_, m_, s_]);
	return { x, y, z, a: A };
}

function xyzToRgb(xyz: XyzColor): RgbColor {
	const { x, y, z, a } = xyz;
	const nonLinearRgb = multiplyMatrix3x3ByVector(XYZ_TO_RGB_MATRIX, [x, y, z]);
	return {
		r: compressGamma(nonLinearRgb[0]) * 255,
		g: compressGamma(nonLinearRgb[1]) * 255,
		b: compressGamma(nonLinearRgb[2]) * 255,
		a: a * 255.0,
	};
}

const compressGamma = (x: number): number => (x >= 0.0031308 ? 1.055 * Math.pow(x, 1.0 / 2.4) - 0.055 : 12.92 * x);
