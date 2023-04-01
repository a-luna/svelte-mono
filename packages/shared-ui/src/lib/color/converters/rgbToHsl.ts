import { decimalToOpacityValue } from '$lib/color/util';
import type { HslColor, RgbColor } from '$lib/types';

export function rgbToHsl(rgb: RgbColor): HslColor {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const cmax = Math.max(r, g, b);
	const cmin = Math.min(r, g, b);
	const delta = cmax - cmin;
	const l = (cmax + cmin) / 2;
	const s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	return {
		h: calculateHue(r, g, b, cmax, delta),
		s: parseFloat((s * 100).toFixed(1)),
		l: parseFloat((l * 100).toFixed(1)),
		a: decimalToOpacityValue(rgb.a),
	};
}

function calculateHue(r: number, g: number, b: number, cmax: number, delta: number): number {
	let h = 0;
	if (delta > 0) {
		if (cmax === r) {
			h = ((g - b) / delta) % 6;
		} else if (cmax === g) {
			h = (b - r) / delta + 2;
		} else if (cmax === b) {
			h = (r - g) / delta + 4;
		}
	}
	h = h * 60;
	h = h >= 0 ? h : h + 360;
	return parseFloat(h.toFixed(1));
}
