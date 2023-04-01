import { get_Cs } from '$lib/color/converters/util/okhsl';
import { decimalToOpacityValue } from '$lib/color/util';
import type { OkhslColor, OklabColor, RgbColor } from '$lib/types';

export function rgbToOkhsl(rgb: RgbColor): OkhslColor {
	const { r, g, b, a } = rgb;
	const lab = linear_srgb_to_oklab({
		r: srgb_transfer_function_inv(r / 255),
		g: srgb_transfer_function_inv(g / 255),
		b: srgb_transfer_function_inv(b / 255),
		a: 1,
	});

	const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
	const a_ = lab.a / C;
	const b_ = lab.b / C;

	const L = lab.l;
	const h = 0.5 + (0.5 * Math.atan2(-lab.b, -lab.a)) / Math.PI;

	const Cs = get_Cs(L, a_, b_);
	const C_0 = Cs[0];
	const C_mid = Cs[1];
	const C_max = Cs[2];

	let s;
	if (C < C_mid) {
		const k_0 = 0;
		const k_1 = 0.8 * C_0;
		const k_2 = 1 - k_1 / C_mid;

		const t = (C - k_0) / (k_1 + k_2 * (C - k_0));
		s = t * 0.8;
	} else {
		const k_0 = C_mid;
		const k_1 = (0.2 * C_mid * C_mid * 1.25 * 1.25) / C_0;
		const k_2 = 1 - k_1 / (C_max - C_mid);

		const t = (C - k_0) / (k_1 + k_2 * (C - k_0));
		s = 0.8 + 0.2 * t;
	}

	const l = toe(L);
	return { h: h * 360.0, s, l, a: decimalToOpacityValue(a) };
}

function toe(x: number): number {
	const k_1 = 0.206;
	const k_2 = 0.03;
	const k_3 = (1 + k_1) / (1 + k_2);

	return 0.5 * (k_3 * x - k_1 + Math.sqrt((k_3 * x - k_1) * (k_3 * x - k_1) + 4 * k_2 * k_3 * x));
}

function linear_srgb_to_oklab(rgb: RgbColor): OklabColor {
	const { r, g, b, a } = rgb;
	const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);

	return {
		l: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
		a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
		b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
		A: decimalToOpacityValue(a),
	};
}

function srgb_transfer_function_inv(a: number) {
	return 0.04045 < a ? Math.pow((a + 0.055) / 1.055, 2.4) : a / 12.92;
}
