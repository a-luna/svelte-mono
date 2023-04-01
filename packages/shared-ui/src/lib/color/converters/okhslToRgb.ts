import { get_Cs, oklab_to_linear_srgb } from '$lib/color/converters/util/okhsl';
import type { OkhslColor, RgbColor } from '$lib/types';

export function okhslToRgb(okhsl: OkhslColor): RgbColor {
	const { h, s, l, a } = okhsl;
	if (l == 1) {
		return { r: 255, g: 255, b: 255, a: 1 };
	} else if (l == 0) {
		return { r: 0, g: 0, b: 0, a: 1 };
	}

	const a_ = Math.cos(2 * Math.PI * h);
	const b_ = Math.sin(2 * Math.PI * h);
	const L = toe_inv(l);

	const Cs = get_Cs(L, a_, b_);
	const C_0 = Cs[0];
	const C_mid = Cs[1];
	const C_max = Cs[2];

	let t, k_0, k_1, k_2;
	if (s < 0.8) {
		t = 1.25 * s;
		k_0 = 0;
		k_1 = 0.8 * C_0;
		k_2 = 1 - k_1 / C_mid;
	} else {
		t = 5 * (s - 0.8);
		k_0 = C_mid;
		k_1 = (0.2 * C_mid * C_mid * 1.25 * 1.25) / C_0;
		k_2 = 1 - k_1 / (C_max - C_mid);
	}

	const C = k_0 + (t * k_1) / (1 - k_2 * t);

	// If we would only use one of the Cs:
	//C = s*C_0;
	//C = s*1.25*C_mid;
	//C = s*C_max;

	const rgb = oklab_to_linear_srgb({ l: L, a: C * a_, b: C * b_, A: a });
	return {
		r: srgb_transfer_function(rgb.r) * 255.0,
		g: srgb_transfer_function(rgb.g) * 255.0,
		b: srgb_transfer_function(rgb.b) * 255.0,
		a: rgb.a * 255.0,
	};
}

function toe_inv(x: number): number {
	const k_1 = 0.206;
	const k_2 = 0.03;
	const k_3 = (1 + k_1) / (1 + k_2);
	return (x * x + k_1 * x) / (k_3 * (x + k_2));
}

function srgb_transfer_function(a: number): number {
	return 0.0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, 0.4166666666666667) - 0.055;
}
