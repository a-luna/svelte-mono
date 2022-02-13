const HSL_COLOR_REGEX = /hsl\((?<hue>\d{1,3}), (?<saturation>\d{1,3})%, (?<lightness>\d{1,3})%\)/;

export class HslColor {
	constructor(public hue: number, public saturation: number, public lightness: number) {}
	public toString = (): string => `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
	public changeHue = (newHue: number): HslColor => new HslColor(newHue, this.saturation, this.lightness);
	public adjustSaturation = (dim: number): HslColor =>
		new HslColor(this.hue, Math.floor(this.saturation * dim), this.lightness);
	public adjustLightness = (dim: number): HslColor =>
		new HslColor(this.hue, this.saturation, Math.floor(this.lightness * dim));
	public static fromString = (hsl_color: string): HslColor => {
		const match = HSL_COLOR_REGEX.exec(hsl_color);
		return match
			? new HslColor(parseInt(match.groups.hue), parseInt(match.groups.saturation), parseInt(match.groups.lightness))
			: new HslColor(0, 0, 0);
	};
}
