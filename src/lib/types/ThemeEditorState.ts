import type { ColorPalette, ThemeColor, UserThemeImported } from '.';

export interface ThemeEditorState {
	editorId: string;
	userTheme: UserThemeImported;
	selectedPaletteId: string;
	selectedColor: ThemeColor;
	editMode: boolean;
	showX11Palettes: boolean;
	modalOpen: boolean;

	selectedPalette: ColorPalette;
	alphaEnabled: boolean;
}
