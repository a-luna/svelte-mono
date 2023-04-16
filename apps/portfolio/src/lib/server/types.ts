export interface CodeFenceCaptureGroups {
	lang: string;
	linenos: string;
	start1: string;
	start2: string;
	highlight1: string;
	highlight2: string;
}

export interface SvgIcon {
	svg: string;
	height: number;
}

export interface SvgIconMap {
	[k: string]: SvgIcon;
}
