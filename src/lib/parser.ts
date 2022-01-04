import { parseColorFromCssValue } from '$lib/color';
import type { CssColor, Result } from '$lib/types';

export class ColorParser {
	public static parse = (s: string): Result<CssColor> => parseColorFromCssValue(s);
}
