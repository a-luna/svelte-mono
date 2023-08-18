import { byteIntToHexString } from '$lib/color/util';
import type { RgbColor } from '$lib/types';

export const rgbToHex = ({ r, g, b, a }: RgbColor): string =>
	a !== 255
		? `#${byteIntToHexString(r)}${byteIntToHexString(g)}${byteIntToHexString(b)}${byteIntToHexString(a)}`
		: `#${byteIntToHexString(r)}${byteIntToHexString(g)}${byteIntToHexString(b)}`;
