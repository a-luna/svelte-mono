import { byteIntToHexString } from '$lib/color/util';
import type { RgbColor } from '$lib/types';

export function rgbToHex({ r, g, b, a }: RgbColor): string {
	const a_ = Math.floor(a * 255.0);
	return a < 1.0
		? `#${byteIntToHexString(r)}${byteIntToHexString(g)}${byteIntToHexString(b)}${byteIntToHexString(a_)}`
		: `#${byteIntToHexString(r)}${byteIntToHexString(g)}${byteIntToHexString(b)}`;
}
