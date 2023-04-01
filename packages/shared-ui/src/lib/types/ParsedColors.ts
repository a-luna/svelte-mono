import type {
	HexNumberType,
	HslComponent,
	HslLabNumberType,
	LabComponent,
	LchComponent,
	RgbHexComponent,
	RgbNumberType,
} from '$lib/types/Literals';

export type EarlyParsedHexComponent = {
	component: RgbHexComponent;
	numType: 'hex';
	value: string;
};

export type ParsedHexComponent = {
	component: RgbHexComponent;
	numType: HexNumberType;
	value: number;
};

export type ParsedRgbComponent = {
	component: RgbHexComponent;
	numType: RgbNumberType;
	value: number;
};

export type ParsedHslComponent = {
	component: HslComponent;
	numType: HslLabNumberType;
	value: number;
};

export type ParsedLabComponent = {
	component: LabComponent;
	numType: HslLabNumberType;
	value: number;
};

export type ParsedLchComponent = {
	component: LchComponent;
	numType: HslLabNumberType;
	value: number;
};
