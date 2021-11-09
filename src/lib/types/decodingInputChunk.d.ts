import type { Base64ByteMap, Base64Encoding } from '.';

export interface DecodingInputChunk {
	base64: string;
	binary: string;
	encoding: Base64Encoding;
	isPadded: boolean;
	padLength: number;
	inputMap: Base64ByteMap[];
}
