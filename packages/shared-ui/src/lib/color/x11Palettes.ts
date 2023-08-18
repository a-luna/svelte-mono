import { parseNamedColor } from '$lib/color/parsers';
import { addStringValuesToCssColor, changeColorName, sortColors } from '$lib/color/util';
import { X11_NAMED_COLORS, defaultCssColor } from '$lib/constants';
import type { ColorPalette, ComponentColor, CssColor, HueRange } from '$lib/types';
import { getRandomHexString, groupByProperty } from '$lib/util';

export function getX11ColorPalettes(): ColorPalette[] {
	const hueRanges: HueRange[] = [
		{ hueStart: -30, hueEnd: 30, name: 'red - orange', componentColor: 'red' },
		{ hueStart: 30, hueEnd: 45, name: 'orange', componentColor: 'orange' },
		{ hueStart: 45, hueEnd: 60, name: 'yellow', componentColor: 'yellow' },
		{ hueStart: 60, hueEnd: 150, name: 'green', componentColor: 'green' },
		{ hueStart: 150, hueEnd: 195, name: 'teal - light blue', componentColor: 'teal' },
		{ hueStart: 195, hueEnd: 240, name: 'light blue - blue', componentColor: 'blue' },
		{ hueStart: 240, hueEnd: 330, name: 'blue - magenta', componentColor: 'indigo' },
	];
	const [colors, grays] = getX11ColorsOrderedByHue();
	const colorPalettes = hueRanges.map(({ hueStart, hueEnd, name, componentColor }) => ({
		id: getRandomHexString(4),
		propName: String(componentColor),
		displayName: name,
		colors: getColorsInHueRange(hueStart, hueEnd, colors).map((c) => ({ color: c })),
		componentColor,
	}));
	const grayPalette = {
		id: getRandomHexString(4),
		propName: 'grayPalette',
		displayName: 'black - white',
		colors: grays.map((c) => ({ color: c })),
		componentColor: 'black' as ComponentColor,
	};
	return [...colorPalettes, grayPalette];
}

function getX11ColorsOrderedByHue(): [CssColor[], CssColor[]] {
	const allColorsWithDupes = X11_NAMED_COLORS.filter((name) => name !== 'currentcolor' && name !== 'inherit')
		.map((name) => {
			const result = parseNamedColor(name);
			return result.success ? addStringValuesToCssColor({ ...result.value, name }) : defaultCssColor;
		})
		.filter((color) => color !== defaultCssColor);

	const allColors = removeDuplicateColors(allColorsWithDupes);
	const colors = allColors.filter(({ hsl }) => hsl.s > 0 && hsl.l < 95).sort(sortColors);
	const noSaturation = allColors.filter(({ hsl }) => hsl.s === 0).sort(sortColors);
	const maxLightness = allColors.filter(({ hsl }) => hsl.l >= 95).sort(sortColors);
	return [colors, [...noSaturation, ...maxLightness]];
}

function getColorsInHueRange(hueStart: number, hueEnd: number, colors: CssColor[]): CssColor[] {
	if (hueStart < 0 && hueEnd > 0) {
		return [...getColorsInHueRange(hueStart + 360, 360, colors), ...getColorsInHueRange(0, hueEnd, colors)];
	}
	return colors.filter((c) => hueStart < c.hsl.h && c.hsl.h <= hueEnd);
}

const combineColorNames = (colors: CssColor[]): string =>
	[...new Set(colors.filter((c) => Boolean(c?.name)).map((c) => c.name))].join('/');

export function removeDuplicateColors(colors: CssColor[]): CssColor[] {
	const dupesRemoved: CssColor[] = [];
	Object.values(groupByProperty<CssColor>(colors, 'hex')).forEach((group) => {
		if (group.length === 1) {
			dupesRemoved.push(group.at(0) || defaultCssColor);
		}
		if (group.length > 1) {
			dupesRemoved.push(changeColorName(group.at(0) || defaultCssColor, combineColorNames(group)));
		}
	});
	return dupesRemoved;
}
