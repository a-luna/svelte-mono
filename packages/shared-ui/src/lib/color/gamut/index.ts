import {
	createCssColorBaseFromLabColor,
	createCssColorBaseFromLchColor,
	finalizeLabColor,
} from '$lib/color/gamut/processLabColor';
import {
	createCssColorBaseFromOklabColor,
	createCssColorBaseFromOklchColor,
	finalizeOklabColor,
} from '$lib/color/gamut/processOklabColor';
import { createCssColorBaseFromRgbColor, finalizeRgbColor } from '$lib/color/gamut/processSrgbColor';

export {
	createCssColorBaseFromLabColor,
	createCssColorBaseFromLchColor,
	createCssColorBaseFromOklabColor,
	createCssColorBaseFromOklchColor,
	createCssColorBaseFromRgbColor,
	finalizeLabColor,
	finalizeOklabColor,
	finalizeRgbColor,
};
