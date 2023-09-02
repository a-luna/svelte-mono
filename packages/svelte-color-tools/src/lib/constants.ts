import type { AppStore, ColorPickerState, ThemeEditorState, UserThemeImported } from '$lib/types';
import {
	defaultColorPalette,
	defaultCssColor,
	defaultCssColorForColorSpace,
	defaultThemeColor,
	defaultX11ColorPalette,
} from '@a-luna/shared-ui/color';

export const LABEL_STATES = ['prerender', 'inactive', 'copied', 'edit', 'pick', 'success', 'error'] as const;
export const VIEW_OPTIONS = ['component', 'css', 'json'] as const;
export const CSS_CUSTOM_PROP_TYPES = ['string', 'color', 'borderStyle'];

export const CSS_STRING_PROPERTIES = [
	'width',
	'height',
	'margin',
	'padding',
	'flex',
	'font-size',
	'display',
	'justify-content',
	'align-items',
	'gap',
	'border-width',
	'border-style',
	'border-radius',
	'box-shadow',
] as const;

export const CSS_COLOR_PROPERTIES = ['color', 'background-color', 'border-color'] as const;
export const SCOPED_CSS_REGEX = /.s-[A-Za-z0-9-_]+/g;

export const alphaBgPattern = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");`;
export const alphaBgPatternSmall = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");`;

export const defaultAppStore: AppStore = {
	x11PalettesShown: false,
	themeColorPalettes: [defaultColorPalette],
	selectedThemePalette: defaultColorPalette,
	themeCurrentColor: defaultThemeColor,
	currentColorInGamut: defaultCssColorForColorSpace,
	currentColorSpace: 'srgb',
	currentColorFormat: 'oklch',
	componentStyles: '',
};

export const defaultUserThemeImported: UserThemeImported = {
	themeName: '',
	usesPrefix: false,
	themePrefix: '',
	createdAt: '',
	modifiedAt: '',
	colorFormatSrgb: 'oklch',
	colorFormatP3: 'oklch',
	uiColor: 'black',
	palettes: [defaultColorPalette],
};

export const defaultThemeEditorState: ThemeEditorState = {
	editorId: 'theme-editor',
	userTheme: defaultUserThemeImported,
	selectedPaletteId: '',
	colorSelected: false,
	selectedColor: defaultThemeColor,
	editMode: false,
	modalOpen: false,
	currentlyViewing: 'component',
};

export const defaultColorPickerState: ColorPickerState = {
	pickerId: '',
	color: defaultCssColor,
	x11PalettesShown: false,
	x11ColorPalettes: [defaultX11ColorPalette],
	colorSpace: defaultCssColor.space,
	colorFormat: 'rgb',
	colorInGamut: defaultCssColor.srbgColor,
	labelState: 'prerender',
	editable: true,
};
