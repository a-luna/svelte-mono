import { OKLAB_M1, OKLAB_M2, RGB_TO_XYZ_MATRIX } from '$lib/color/converters/util/constants';
import { multiplyMatrix3x3ByVector, type ColorValues } from '$lib/color/converters/util/matrix';
import { decimalToOpacityValue } from '$lib/color/util';
import type { OklabColor, RgbColor, XyzColor } from '$lib/types';

export const rgbToOklab = (rgb: RgbColor): OklabColor => xyzToOklab(rgbToXyz(rgb));

function rgbToXyz(rgb: RgbColor): XyzColor {
	const { r, g, b } = rgb;
	const linearRgb: ColorValues = [expandGamma(r / 255), expandGamma(g / 255), expandGamma(b / 255)];
	const [x, y, z] = multiplyMatrix3x3ByVector(RGB_TO_XYZ_MATRIX, linearRgb);
	return { x, y, z, a: decimalToOpacityValue(rgb.a) };
}

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
