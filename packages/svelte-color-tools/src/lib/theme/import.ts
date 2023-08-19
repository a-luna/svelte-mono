import type { ColorPalleteFromFile, UserThemeFromFile, UserThemeImported } from '$lib/types';
import { ColorParser, type ColorPalette, type Result } from '@a-luna/shared-ui';

export function importUserThemeFromFile(theme: UserThemeFromFile): Result<UserThemeImported> {
	const palettes = [];
	for (const palette of theme.palettes) {
		const result = importColorPalette(palette);
		if (result.success) {
			palettes.push(result.value);
		} else {
			return { success: false, error: result.error };
		}
	}
	return { success: true, value: { ...theme, palettes } };
}

function importColorPalette(palette: ColorPalleteFromFile): Result<ColorPalette> {
	const colors = [];
	for (const color of palette.colors) {
		const result = ColorParser.parse(color?.value ?? '');
		if (result.success) {
			colors.push({ ...color, color: { ...result.value, name: color?.displayName || '' }, isSelected: false });
		} else {
			return { success: false, error: Error(`Unable to parse "${color.value}" as a valid CSS color value`) };
		}
	}
	return { success: true, value: { ...palette, colors } };
}
