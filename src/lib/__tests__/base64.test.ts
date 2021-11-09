import { Base64Encoder, Base64Decoder } from '../base64';

describe('Base64Encoder', () => {
	it('can encode a valid ascii string to standard base64', () => {
		const encoder = new Base64Encoder();
		const encoded = encoder.encode('dog', 'ASCII', 'base64');
		expect(encoded.output).toBe('ZG9n');
	});
});

describe('Base64Decoder', () => {
	it('can decode a valid base64 string to ascii', () => {
		const decoder = new Base64Decoder();
		const decoded = decoder.decode('ZG9n', 'base64');
		expect(decoded.output).toBe('dog');
	});
});
