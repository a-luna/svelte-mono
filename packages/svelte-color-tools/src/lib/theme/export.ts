import type { UserThemeFromFile, UserThemeImported } from '$lib/types';
import { slugify } from '$lib/util';
import type { ThemeColor } from '@a-luna/shared-ui';
import { getCssValueForColor } from '.';

const getThemeColorCss = (userTheme: UserThemeImported, color: ThemeColor): string =>
	`${color.cssVarName}: ${getCssValueForColor(color, userTheme.colorFormat)}`;

export function downloadUserThemeJson(userTheme: UserThemeImported): void {
	userTheme.modifiedAt = new Date().toISOString();
	const filename = `${slugify(userTheme.themeName)}.json`;
	const blob = new Blob([JSON.stringify(exportUserThemeToFile(userTheme))], { type: 'text/json' });
	const link = document.createElement('a');
	link.download = filename;
	link.href = window.URL.createObjectURL(blob);
	link.dataset.downloadurl = `text/json:${link.download}:${link.href}`;

	link.dispatchEvent(
		new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		}),
	);
	link.remove();
}

export function exportUserThemeToFile(userTheme: UserThemeImported): UserThemeFromFile {
	const palettes = userTheme.palettes.map(({ id, propName, displayName, colors, componentColor }) => ({
		id,
		propName,
		displayName,
		componentColor,
		colors: colors.map((color) => ({
			propName: color.propName,
			cssVarName: color.cssVarName,
			displayName: color.displayName,
			value: getCssValueForColor(color, userTheme.colorFormat),
		})),
	}));
	return { ...userTheme, palettes };
}

export const convertThemePalettesToCss = (userTheme: UserThemeImported, withNewLines = false): string =>
	userTheme?.palettes
		.map((palette) => palette.colors.map((color) => getThemeColorCss(userTheme, color)))
		.flat()
		.join(withNewLines ? '\n;' : '; ');
