import type { HslColor, RgbColor } from '$lib/types';

export function hslToRgb(hsl: HslColor): RgbColor {
	const s = hsl.s / 100;
	const l = hsl.l / 100;
	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const x = chroma * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
	const match = l - chroma / 2;
	let [r, g, b, a] = [0, 0, 0, 0];

	if (0 <= hsl.h && hsl.h < 60) {
		r = chroma;
		g = x;
		b = 0;
	} else if (60 <= hsl.h && hsl.h < 120) {
		r = x;
		g = chroma;
		b = 0;
	} else if (120 <= hsl.h && hsl.h < 180) {
		r = 0;
		g = chroma;
		b = x;
	} else if (180 <= hsl.h && hsl.h < 240) {
		r = 0;
		g = x;
		b = chroma;
	} else if (240 <= hsl.h && hsl.h < 300) {
		r = x;
		g = 0;
		b = chroma;
	} else if (300 <= hsl.h && hsl.h < 360) {
		r = chroma;
		g = 0;
		b = x;
	}
	r = (r + match) * 255.0;
	g = (g + match) * 255.0;
	b = (b + match) * 255.0;
	a = hsl.a * 255.0;
	return { r, g, b, a };
}
