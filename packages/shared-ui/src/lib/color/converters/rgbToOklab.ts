import {
	OKLAB_M1,
	OKLAB_M2,
	P3_TO_XYZ_MATRIX,
	REC2020_TO_XYZ_MATRIX,
	RGB_TO_XYZ_MATRIX,
} from '$lib/color/converters/util';
import { multiplyMatrix3x3ByVector } from '$lib/color/converters/util/matrix';
import type { ColorSpace, Matrix1x3, Matrix3x3, OklabColor, RgbColor, XyzColor } from '$lib/types';

export const rgbToOklab = (rgb: RgbColor): OklabColor => xyzToOklab(rgbToXyz(rgb));
export const p3ToOklab = (p3: RgbColor): OklabColor => xyzToOklab(p3ToXyz(p3));
export const rec2020ToOklab = (r2020: RgbColor): OklabColor => xyzToOklab(rec2020ToXyz(r2020));

export function oklabFromRgbInColorSpace(rgb: RgbColor, colorSpace: ColorSpace): OklabColor {
	if (colorSpace === 'srgb') return rgbToOklab(rgb);
	if (colorSpace === 'p3') return p3ToOklab(rgb);
	return rec2020ToOklab(rgb);
}

function rgbToXyzInColorSpace(rgb: RgbColor, conversionMatrix: Matrix3x3): XyzColor {
	const { r, g, b, a } = rgb;
	const linearRgb: Matrix1x3 = [expandGamma(r / 255), expandGamma(g / 255), expandGamma(b / 255)];
	const [x, y, z] = multiplyMatrix3x3ByVector(RGB_TO_XYZ_MATRIX, linearRgb);
	return { x, y, z, a };
}

const rgbToXyz = (rgb: RgbColor): XyzColor => rgbToXyzInColorSpace(rgb, RGB_TO_XYZ_MATRIX);
const p3ToXyz = (rgb: RgbColor): XyzColor => rgbToXyzInColorSpace(rgb, P3_TO_XYZ_MATRIX);
const rec2020ToXyz = (rgb: RgbColor): XyzColor => rgbToXyzInColorSpace(rgb, REC2020_TO_XYZ_MATRIX);

const expandGamma = (x: number): number => (x >= 0.04045 ? Math.pow((x + 0.055) / (1 + 0.055), 2.4) : x / 12.92);

function xyzToOklab(xyz: XyzColor): OklabColor {
	const { x, y, z, a: A } = xyz;
	const coneResponse = multiplyMatrix3x3ByVector(OKLAB_M1, [x, y, z]);
	const l_ = Math.cbrt(coneResponse[0]);
	const m_ = Math.cbrt(coneResponse[1]);
	const s_ = Math.cbrt(coneResponse[2]);
	const [l, a, b] = multiplyMatrix3x3ByVector(OKLAB_M2, [l_, m_, s_]);
	return { l: l * 100.0, a, b, A };
}
