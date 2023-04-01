import type { ThemeColor, UserThemeImported } from '.';
import type { ViewOption } from './Literals';

export interface ThemeEditorState {
	editorId: string;
	userTheme: UserThemeImported;
	selectedPaletteId: string;
	colorSelected: boolean;
	selectedColor: ThemeColor;
	editMode: boolean;
	modalOpen: boolean;
	currentlyViewing: ViewOption;
}
