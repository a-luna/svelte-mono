import type { AppStore, ColorPalette, CssColor, ThemeColor, ThemeEditorState, UserThemeImported } from './types';

export const CSS_COLOR_FORMATS = ['hex', 'rgb', 'hsl'] as const;
export const COMPONENT_COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo'] as const;
export const COLOR_SPACES = ['hex', 'rgb', 'rgba', 'hsl', 'hsla'] as const;
export const LABEL_STATES = ['prerender', 'inactive', 'copied', 'edit', 'pick', 'success', 'error'] as const;
export const VIEW_OPTIONS = ['component', 'css', 'json'] as const;

export const SCOPED_CSS_REGEX = /.s-[A-Za-z0-9-_]+/g;

export const alphaBgPattern = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");`;

const defaultColorPalette: ColorPalette = {
	id: '',
	colors: [],
	propName: '',
	displayName: '',
	componentColor: 'black',
	updated: false,
};

const defaultCssColor: CssColor = {
	hex: '',
	rgb: {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
	},
	rgbString: '',
	hsl: {
		h: 0,
		s: 0,
		l: 0,
		a: 0,
	},
	hslString: '',
	hasAlpha: false,
	hexAlpha: '',
	rgbaString: '',
	hslaString: '',
};

const defaultThemeColor: ThemeColor = {
	color: defaultCssColor,
};

export const defaultAppStore: AppStore = {
	x11PalettesShown: false,
	themeColorPalettes: [defaultColorPalette],
	selectedThemePalette: defaultColorPalette,
	themeCurrentColor: defaultThemeColor,
	themeColorHasAlpha: false,
	pickerColorHasAlpha: false,
	componentStyles: '',
};

const defaultUserThemeImported: UserThemeImported = {
	themeName: '',
	usesPrefix: false,
	themePrefix: '',
	createdAt: '',
	modifiedAt: '',
	colorFormat: 'hsl',
	uiColor: 'black',
	palettes: [],
};

export const defaultThemeEditorState: ThemeEditorState = {
	editorId: '',
	userTheme: defaultUserThemeImported,
	selectedPaletteId: '',
	colorSelected: false,
	selectedColor: {
		color: defaultCssColor,
	},
	editMode: false,
	modalOpen: false,
	currentlyViewing: 'component',
};
