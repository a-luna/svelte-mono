import type { UserThemeImported, ViewOption } from '$lib/types';
import type { ThemeColor } from '@a-luna/shared-ui';

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
