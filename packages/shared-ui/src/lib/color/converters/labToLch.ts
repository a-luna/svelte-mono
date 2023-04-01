import { TAU } from '$lib/color/converters/util/constants';
import type { LabColor, LchColor, OklabColor, OklchColor } from '$lib/types';

/// Converts colour given in CIELAB (a.k.a. L*a*b) space to
/// CIELCh(ab) with hue expressed in degrees.
export function labToLch({ l, a, b, A }: LabColor): LchColor {
	const lch = {
		l,
		c: Math.hypot(a, b),
		h: (Math.atan2(b, a) * 360.0) / TAU,
		a: A,
	};
	if (lch.h < 0) {
		lch.h += 360;
	}
	return lch;
}

export const oklabToOklch = ({ l, a, b, A }: OklabColor): OklchColor => labToLch({ l, a, b, A });
