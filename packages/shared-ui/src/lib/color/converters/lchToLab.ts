import { TAU } from '$lib/color/converters/util/constants';
import type { LabColor, LchColor, OklabColor, OklchColor } from '$lib/types';

/// Converts colour given in CIELCh(ab) space with hue
/// expressed in degrees to CIELAB (a.k.a. L*a*b*).
export function lchToLab({ l, c, h, a }: LchColor): LabColor {
	const hRad = (h * TAU) / 360.0;
	return {
		l: l,
		a: c * Math.cos(hRad),
		b: c * Math.sin(hRad),
		A: a,
	};
}
export const oklchToOklab = ({ l, c, h, a }: OklchColor): OklabColor => lchToLab({ l, c, h, a });
