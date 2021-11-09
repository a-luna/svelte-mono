import { BitGroup } from '.';

export interface Base64ByteMap {
	bin: string;
	dec: number;
	b64: string;
	isPad: boolean;
	groupId?: string;
	bitGroups?: BitGroup[];
}
