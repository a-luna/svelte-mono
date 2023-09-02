export interface CssCustomPropertyBase {
	id: string;
	name: string;
	selector: string;
	addToTheme: boolean;
}

export interface CssCustomStringProperty extends CssCustomPropertyBase {
	type: 'string';
	value: string;
}

export interface CssCustomColorProperty extends CssCustomPropertyBase {
	type: 'color';
	value: string;
}

interface CssCustomBorderStyleProperty extends CssCustomPropertyBase {
	type: 'borderStyle';
	value: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
}

export type CssCustomProperty = CssCustomStringProperty | CssCustomColorProperty | CssCustomBorderStyleProperty;
