import type { ColorFormat, ColorPalette, CssColor, UserThemeImported } from './types';

export const CSS_COLOR_FORMATS = ['hex', 'rgb', 'hsl'] as const;
export const COMPONENT_COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo'] as const;
export const COLOR_SPACES = ['hex', 'rgb', 'rgba', 'hsl', 'hsla'] as const;
export const LABEL_STATES = ['prerender', 'inactive', 'copied', 'edit', 'pick', 'success', 'error'] as const;

const defaultColorPalette: ColorPalette = {
	id: '',
	propName: '',
	displayName: '',
	colors: [],
	componentColor: 'black',
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

const defaultUserThemeImported: UserThemeImported = {
	themeName: '',
	usesPrefix: false,
	themePrefix: '' as ColorFormat,
	createdAt: '',
	modifiedAt: '',
	colorFormat: 'hsl',
	palettes: [],
};

export const defaultThemeEditorState = {
	editorId: '',
	userTheme: defaultUserThemeImported,
	selectedPaletteId: '',
	selectedColor: {
		color: defaultCssColor,
	},
	editMode: false,
	showX11Palettes: false,
	modalOpen: false,
	selectedPalette: defaultColorPalette,
	alphaEnabled: false,
};
