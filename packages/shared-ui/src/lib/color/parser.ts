import { parseColorFromString } from '$lib/color/parsers';
import type { CssColor, Result } from '$lib/types';

export class ColorParser {
	public static parse = (s: string, clamped = true): Result<CssColor> => parseColorFromString(s, clamped);
}
