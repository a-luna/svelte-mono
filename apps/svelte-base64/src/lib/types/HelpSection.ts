import type {
	Base64OutputEncoding,
	Base64References1,
	Base64References2,
	Base64StandardAlphabet,
	Base64UrlAlphabet,
	KeyboardShortcuts,
	NavButtons,
	StringInputEncoding1,
	StringInputEncoding2,
	StringInputEncodingAscii,
	StringInputEncodingBinary,
	StringInputEncodingHex,
	StringInputEncodingUtf8,
	WhatIsBase64,
	WhatIsntBase64,
	WhyBase641,
	WhyBase642,
} from '$lib/components/AlgorithmDemo/HelpDocs/Sections';

export type HelpSectionComponent =
	| typeof WhyBase641
	| typeof WhyBase642
	| typeof WhatIsBase64
	| typeof WhatIsntBase64
	| typeof Base64StandardAlphabet
	| typeof Base64UrlAlphabet
	| typeof StringInputEncoding1
	| typeof StringInputEncoding2
	| typeof StringInputEncodingAscii
	| typeof StringInputEncodingUtf8
	| typeof StringInputEncodingHex
	| typeof StringInputEncodingBinary
	| typeof Base64OutputEncoding
	| typeof NavButtons
	| typeof KeyboardShortcuts
	| typeof Base64References1
	| typeof Base64References2;

export interface HelpSection {
	index: number;
	id: string;
	title: string;
	component: HelpSectionComponent;
}

export type HelpSectionMap = Record<string, HelpSection>;

export interface HelpSectionReference {
	title: string;
	url: string;
	description: string[];
}
