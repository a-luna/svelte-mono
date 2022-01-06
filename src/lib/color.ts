import { namedColors } from './namedColors';
import type { CssColor, HslColor, Result, RgbColor } from './types';

const RGB_REGEX =
	/^rgb\(((((((?<redDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))(((?<greenDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))|(((?<redDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s))(((?<greenDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)))(?<blueDec>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((?<redPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)((?<greenPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)|((?<redPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)((?<greenPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s))(?<bluePerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;

const RGBA_REGEX =
	/^rgba\(((((((?<redDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))(((?<greenDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))(((?<blueDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)))|(((?<redPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)((?<greenPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)((?<bluePercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)))|((((?<redDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)((?<greenDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)((?<blueDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s))|(((?<redPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)((?<greenPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)((?<bluePercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)))\/\s)((?<alphaFloatA>0?\.\d+)|(?<alphaFloatB>[01])|(?<alphaPerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

const HEX_REGEX =
	/^#((?<redHexA>[\da-f])(?<greenHexA>[\da-f])(?<blueHexA>[\da-f]))$|^#((?<redHexB>[\da-f])(?<redHexC>[\da-f])(?<greenHexB>[\da-f])(?<greenHexC>[\da-f])(?<blueHexB>[\da-f])(?<blueHexC>[\da-f]))$/i;

const HEXA_REGEX =
	/^#((?<redHexA>[\da-f])(?<greenHexA>[\da-f])(?<blueHexA>[\da-f])(?<alphaHexA>[\da-f]))$|^#((?<redHexB>[\da-f])(?<redHexC>[\da-f])(?<greenHexB>[\da-f])(?<greenHexC>[\da-f])(?<blueHexB>[\da-f])(?<blueHexC>[\da-f])(?<alphaHexB>[\da-f])(?<alphaHexC>[\da-f]))$/i;

const HSL_REGEX =
	/^hsl\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)|(\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;

const HSLA_REGEX =
	/^hsla\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)(((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%),\s?)|((\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\s\/\s))((?<alphaFloatA>0?\.\d+)|(?<alphaFloatB>[01])|(?<alphaPerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

const percentToDecimalValue = (percent: number): number => Math.round((percent / 100) * 255);
const decimalToOpacityValue = (decimal: number): number => parseFloat((decimal / 255).toFixed(2));

const rgbToString = (rgb: RgbColor, hasAlpha: boolean): string =>
	hasAlpha ? `rgba(${rgb.r} ${rgb.g} ${rgb.b} / ${decimalToOpacityValue(rgb.a)})` : `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;

const hslToString = (hsl: HslColor, hasAlpha: boolean): string =>
	hasAlpha ? `hsla(${hsl.h} ${hsl.s}% ${hsl.l}% / ${hsl.a})` : `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`;

const normalize = (s: string): string => s.replaceAll(/[\s-_]/g, '').toLowerCase();

const colorNameIsValid = (name: string): boolean =>
	Boolean(namedColors.map((c) => c.toLowerCase()).find((c) => c === normalize(name))) || false;

export function parseColorFromCssValue(s: string): Result<CssColor> {
	let match = RGB_REGEX.exec(s);
	if (match) {
		return parseRgb(match, false);
	}
	match = RGBA_REGEX.exec(s);
	if (match) {
		return parseRgb(match, true);
	}

	match = HEX_REGEX.exec(s);
	if (match) {
		return parseHex(match, false);
	}
	match = HEXA_REGEX.exec(s);
	if (match) {
		return parseHex(match, true);
	}

	match = HSL_REGEX.exec(s);
	if (match) {
		return parseHsl(match, false);
	}
	match = HSLA_REGEX.exec(s);
	if (match) {
		return parseHsl(match, true);
	}

	if (colorNameIsValid(s)) {
		return parseNamedColor(s);
	}
	return { success: false, error: `Unable to parse "${s}" as a valid color value` };
}

function parseRgb(match: RegExpExecArray, hasAlpha: boolean): Result<CssColor> {
	let rgb: RgbColor = { r: 0, g: 0, b: 0 };
	let hsl: HslColor = { h: 0, s: 0, l: 0 };
	const redDec = match.groups.redDecA ?? match.groups.redDecB;
	const greenDec = match.groups.greenDecA ?? match.groups.greenDecB;
	const blueDec = match.groups.blueDec ?? match.groups.blueDecA ?? match.groups.blueDecB;
	if (redDec && greenDec && blueDec) {
		rgb = { r: parseInt(redDec), g: parseInt(greenDec), b: parseInt(blueDec) };
	} else {
		const redPerc = match.groups.redPercA ?? match.groups.redPercB;
		const greenPerc = match.groups.greenPercA ?? match.groups.greenPercB;
		const bluePerc = match.groups.bluePerc ?? match.groups.bluePercA ?? match.groups.bluePercB;
		if (redPerc && greenPerc && bluePerc) {
			rgb = {
				r: percentToDecimalValue(parseInt(redPerc)),
				g: percentToDecimalValue(parseInt(greenPerc)),
				b: percentToDecimalValue(parseInt(bluePerc)),
			};
		}
	}

	if (hasAlpha) {
		const alphaFloat = match.groups.alphaFloatA ?? match.groups.alphaFloatB;
		if (alphaFloat) {
			rgb.a = Math.round(parseFloat(alphaFloat) * 255);
		} else {
			const alphaPerc = match.groups.alphaPerc;
			if (alphaPerc) {
				rgb.a = percentToDecimalValue(parseInt(alphaPerc));
			}
		}
		hsl = rgbaToHsla(rgb);
	} else {
		hsl = rgbToHsl(rgb);
	}

	const hex = rgbToHex(rgb, hasAlpha);
	const rgbString = rgbToString(rgb, hasAlpha);
	const hslString = hslToString(hsl, hasAlpha);
	const color = { rgb, hsl, hex, hasAlpha, rgbString, hslString };
	return { success: true, value: color };
}

export function rgbaToHsla(rgb: RgbColor): HslColor {
	const hsl = rgbToHsl(rgb);
	return { ...hsl, a: decimalToOpacityValue(rgb.a) };
}

export function rgbToHsl(rgb: RgbColor): HslColor {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const cmax = Math.max(r, g, b);
	const cmin = Math.min(r, g, b);
	const delta = cmax - cmin;

	const h = calculateHue(r, g, b, cmax, delta);
	const l = (cmax + cmin) / 2;
	const s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	return { h, s: parseInt((s * 100).toFixed(1)), l: parseInt((l * 100).toFixed(1)) };
}

function calculateHue(r: number, g: number, b: number, cmax: number, delta: number): number {
	let h: number;
	if (delta == 0) {
		h = 0;
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax === g) {
		h = (b - r) / delta + 2;
	} else if (cmax === b) {
		h = (r - g) / delta + 4;
	}
	h = Math.round(h * 60);
	return h >= 0 ? h : h + 360;
}

function rgbToHex(rgb: RgbColor, hasAlpha: boolean): string {
	const r = rgb.r.toString(16).padStart(2, '0');
	const g = rgb.g.toString(16).padStart(2, '0');
	const b = rgb.b.toString(16).padStart(2, '0');
	if (!hasAlpha) {
		return `#${r}${g}${b}`;
	}
	const a = rgb.a.toString(16).padStart(2, '0');
	return `#${r}${g}${b}${a}`;
}

function parseHex(match: RegExpExecArray, hasAlpha: boolean): Result<CssColor> {
	let { didParse, rgb, hsl, hex } = parseHexCondensedFormat(match, hasAlpha);
	if (didParse) {
		const rgbString = rgbToString(rgb, hasAlpha);
		const hslString = hslToString(hsl, hasAlpha);
		const color = { rgb, hsl, hex, hasAlpha, rgbString, hslString };
		return { success: true, value: color };
	}
	({ didParse, rgb, hsl, hex } = parseHexFullFormat(match, hasAlpha));
	if (didParse) {
		const rgbString = rgbToString(rgb, hasAlpha);
		const hslString = hslToString(hsl, hasAlpha);
		const color = { rgb, hsl, hex, hasAlpha, rgbString, hslString };
		return { success: true, value: color };
	}
}

function parseHexCondensedFormat(
	match: RegExpExecArray,
	hasAlpha: boolean,
): { didParse: boolean; rgb: RgbColor; hsl: HslColor; hex: string } {
	let didParse = false;
	let rgb: RgbColor;
	let hsl: HslColor;
	let hex: string;
	const redHex = match.groups.redHexA;
	const greenHex = match.groups.greenHexA;
	const blueHex = match.groups.blueHexA;
	if (redHex && greenHex && blueHex) {
		rgb = {
			r: parseInt(`${redHex}${redHex}`, 16),
			g: parseInt(`${greenHex}${greenHex}`, 16),
			b: parseInt(`${blueHex}${blueHex}`, 16),
		};
		if (hasAlpha) {
			const alphaHex = match.groups.alphaHexA;
			rgb.a = parseInt(`${alphaHex}${alphaHex}`, 16);
			hsl = rgbaToHsla(rgb);
			hex = `#${redHex}${redHex}${greenHex}${greenHex}${blueHex}${blueHex}${alphaHex}${alphaHex}`;
		} else {
			hsl = rgbToHsl(rgb);
			hex = `#${redHex}${redHex}${greenHex}${greenHex}${blueHex}${blueHex}`;
		}
		didParse = true;
	}
	return { didParse, rgb, hsl, hex };
}

function parseHexFullFormat(
	match: RegExpExecArray,
	hasAlpha: boolean,
): { didParse: boolean; rgb: RgbColor; hsl: HslColor; hex: string } {
	let didParse = false;
	let rgb: RgbColor;
	let hsl: HslColor;
	let hex: string;
	const redHex1 = match.groups.redHexB;
	const redHex2 = match.groups.redHexC;
	const greenHex1 = match.groups.greenHexB;
	const greenHex2 = match.groups.greenHexC;
	const blueHex1 = match.groups.blueHexB;
	const blueHex2 = match.groups.blueHexC;
	if (redHex1 && redHex2 && greenHex1 && greenHex2 && blueHex1 && blueHex2) {
		rgb = {
			r: parseInt(`${redHex1}${redHex2}`, 16),
			g: parseInt(`${greenHex1}${greenHex2}`, 16),
			b: parseInt(`${blueHex1}${blueHex2}`, 16),
		};
		if (hasAlpha) {
			const alphaHex1 = match.groups.alphaHexB;
			const alphaHex2 = match.groups.alphaHexC;
			rgb.a = parseInt(`${alphaHex1}${alphaHex2}`, 16);
			hex = `#${redHex1}${redHex2}${greenHex1}${greenHex2}${blueHex1}${blueHex2}${alphaHex1}${alphaHex2}`;
			hsl = rgbaToHsla(rgb);
		} else {
			hex = `#${redHex1}${redHex2}${greenHex1}${greenHex2}${blueHex1}${blueHex2}`;
			hsl = rgbToHsl(rgb);
		}
		didParse = true;
	}
	return { didParse, rgb, hsl, hex };
}

function parseHsl(match: RegExpExecArray, hasAlpha: boolean): Result<CssColor> {
	let rgb: RgbColor;
	const hsl: HslColor = { h: parseHue(match), ...parseSaturationAndLightness(match) };

	if (hasAlpha) {
		let alpha = match.groups.alphaFloatA ?? match.groups.alphaFloatB;
		if (!alpha) {
			alpha = (parseInt(match.groups.alphaPerc) / 100).toFixed(2);
		}
		hsl.a = parseFloat(alpha);
		rgb = hslaToRgba(hsl);
	} else {
		rgb = hslToRgb(hsl);
	}

	const hex = rgbToHex(rgb, hasAlpha);
	const rgbString = rgbToString(rgb, hasAlpha);
	const hslString = hslToString(hsl, hasAlpha);
	const color = { rgb, hsl, hex, hasAlpha, rgbString, hslString };
	return { success: true, value: color };
}

function parseHue(match: RegExpExecArray): number {
	const hueDeg = match.groups.hueDeg;
	const hueRad = match.groups.hueRad;
	const hueTurn = match.groups.hueTurn;
	let hue: string;
	if (hueDeg) {
		hue = hueDeg;
	} else if (hueRad) {
		hue = (parseFloat(hueRad) * (180 / Math.PI)).toFixed(2);
	} else if (hueTurn) {
		hue = (parseFloat(hueTurn) * 360).toFixed(2);
	}
	return parseInt(hue);
}

function parseSaturationAndLightness(match: RegExpExecArray): { s: number; l: number } {
	const satPerc = match.groups.satPercA ?? match.groups.satPercB;
	const lightPerc = match.groups.lightPercA ?? match.groups.lightPercB;
	return { s: parseInt(satPerc), l: parseInt(lightPerc) };
}

function hslaToRgba(hsl: HslColor) {
	const rgb = hslToRgb(hsl);
	return { ...rgb, a: Math.round(hsl.a * 255) };
}

function hslToRgb(hsl: HslColor) {
	const s = hsl.s / 100;
	const l = hsl.l / 100;
	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const x = chroma * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
	const match = l - chroma / 2;
	let [r, g, b] = [0, 0, 0];

	if (0 <= hsl.h && hsl.h < 60) {
		r = chroma;
		g = x;
		b = 0;
	} else if (60 <= hsl.h && hsl.h < 120) {
		r = x;
		g = chroma;
		b = 0;
	} else if (120 <= hsl.h && hsl.h < 180) {
		r = 0;
		g = chroma;
		b = x;
	} else if (180 <= hsl.h && hsl.h < 240) {
		r = 0;
		g = x;
		b = chroma;
	} else if (240 <= hsl.h && hsl.h < 300) {
		r = x;
		g = 0;
		b = chroma;
	} else if (300 <= hsl.h && hsl.h < 360) {
		r = chroma;
		g = 0;
		b = x;
	}
	r = Math.round((r + match) * 255);
	g = Math.round((g + match) * 255);
	b = Math.round((b + match) * 255);
	return { r, g, b };
}

function parseNamedColor(name: string): Result<CssColor> {
	const rgb = namedColorToRgb(name);
	if (rgb) {
		const match = RGB_REGEX.exec(rgb);
		if (match) {
			const result = parseRgb(match, false);
			if (result.success) {
				const color = result.value;
				color.hasAlpha = true;
				color.rgb.a = 255;
				return { success: true, value: color };
			}
		}
	}
	return { success: false, error: `Unable to parse "${name}" as a valid color value` };
}

function namedColorToRgb(name: string): string {
	if (typeof window !== 'undefined') {
		const testDiv = document.createElement('div');
		testDiv.style.color = name;
		document.body.appendChild(testDiv);
		const compStyles = window.getComputedStyle(testDiv);
		const colorRgb = compStyles.getPropertyValue('color');
		document.body.removeChild(testDiv);
		return colorRgb;
	}
}
