import { defaultCssColor, defaultCssColorForColorSpace } from '$lib/color/constants';
import { parseNamedColor } from '$lib/color/parsers';
import { changeColorName, sortColors } from '$lib/color/util';
import { X11_NAMED_COLORS } from '$lib/constants';
import type { ComponentColor, CssColorForColorSpace, HueRange, X11ColorPalette } from '$lib/types';
import { getRandomHexString, groupByProperty } from '$lib/util';

export function getX11ColorPalettes(): X11ColorPalette[] {
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
	const colorPalettes: X11ColorPalette[] = hueRanges.map(({ hueStart, hueEnd, name, componentColor }) => ({
		id: getRandomHexString({ length: 4 }),
		displayName: name,
		colors: getColorsInHueRange(hueStart, hueEnd, colors),
		componentColor,
	}));
	const grayPalette: X11ColorPalette = {
		id: getRandomHexString({ length: 4 }),
		displayName: 'black - white',
		colors: grays,
		componentColor: 'black' as ComponentColor,
	};
	return [...colorPalettes, grayPalette];
}

function getX11ColorsOrderedByHue(): [CssColorForColorSpace[], CssColorForColorSpace[]] {
	const allColorsWithDupes = X11_NAMED_COLORS.filter((name) => name !== 'currentcolor' && name !== 'inherit')
		.map((name) => {
			const result = parseNamedColor(name);
			const color = result.success ? { ...result.value, name } : defaultCssColor;
			return result.success ? { ...color.srbgColor, name } : defaultCssColorForColorSpace;
		})
		.filter((color) => color !== defaultCssColorForColorSpace);

	const allColors = removeDuplicateColors(allColorsWithDupes);
	const colors = allColors.filter(({ hsl }) => hsl.s > 0 && hsl.l < 95).sort(sortColors);
	const noSaturation = allColors.filter(({ hsl }) => hsl.s === 0).sort(sortColors);
	const maxLightness = allColors.filter(({ hsl }) => hsl.l >= 95).sort(sortColors);
	return [colors, [...noSaturation, ...maxLightness]];
}

function getColorsInHueRange(
	hueStart: number,
	hueEnd: number,
	colors: CssColorForColorSpace[],
): CssColorForColorSpace[] {
	if (hueStart < 0 && hueEnd > 0) {
		return [...getColorsInHueRange(hueStart + 360, 360, colors), ...getColorsInHueRange(0, hueEnd, colors)];
	}
	return colors.filter((c) => hueStart < c.hsl.h && c.hsl.h <= hueEnd);
}

const combineColorNames = (colors: CssColorForColorSpace[]): string =>
	[...new Set(colors.filter((c) => Boolean(c?.name)).map((c) => c.name))].join('/');

export function removeDuplicateColors(colors: CssColorForColorSpace[]): CssColorForColorSpace[] {
	const dupesRemoved: CssColorForColorSpace[] = [];
	Object.values(groupByProperty<CssColorForColorSpace>(colors, 'hex')).forEach((group) => {
		if (group.length === 1) {
			dupesRemoved.push(group.at(0) || defaultCssColorForColorSpace);
		}
		if (group.length > 1) {
			dupesRemoved.push(changeColorName(group.at(0) || defaultCssColorForColorSpace, combineColorNames(group)));
		}
	});
	return dupesRemoved;
}
