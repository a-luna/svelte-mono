import type { ThemeColor, UserThemeImported } from '.';

export interface ThemeEditorState {
	editorId: string;
	userTheme: UserThemeImported;
	selectedPaletteId: string;
	selectedColor: ThemeColor;
	editMode: boolean;
	modalOpen: boolean;
}
