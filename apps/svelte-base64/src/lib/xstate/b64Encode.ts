import { b64Encode } from '$lib/base64';
import {
	defaultBase64ByteMap,
	defaultEncoderInput,
	defaultEncoderInputChunk,
	defaultEncoderOutput,
	defaultHexByteMap,
	defaultOutputChunk,
} from '$lib/constants';
import { validateEncoderInput } from '$lib/dataPrep';
import { isTextEncoding } from '$lib/typeguards';
import type {
	Base64ByteMap,
	Base64Encoding,
	EncoderInput,
	EncoderInputChunk,
	EncoderOutput,
	HexByteMap,
	OutputChunk,
	StringEncoding,
} from '$lib/types';
import { assign, createMachine } from 'xstate';

export interface EncodingContext {
	resetForm: boolean;
	autoplay: boolean;
	skipDemo: boolean;
	byteMaps: HexByteMap[];
	byteIndex: number;
	updatedByteMaps: HexByteMap[];
	currentByte: HexByteMap;
	remainingBytes: number;
	updatedInputChunks: EncoderInputChunk[];
	inputChunkIndex: number;
	currentInputChunk: EncoderInputChunk;
	remainingInputChunks: number;
	updatedOutputChunks: OutputChunk[];
	outputChunkIndex: number;
	currentOutputChunk: OutputChunk;
	remainingOutputChunks: number;
	base64Maps: Base64ByteMap[];
	updatedBase64Maps: Base64ByteMap[];
	base64CharIndex: number;
	currentBase64Char: Base64ByteMap;
	remainingBase64Chars: number;
	input: EncoderInput;
	output: EncoderOutput;
}

export interface EncodingSchema {
	states: {
		inactive: Record<string, unknown>;
		validateInputText: {
			states: {
				validate: Record<string, unknown>;
				error: Record<string, unknown>;
				success: Record<string, unknown>;
				validationComplete: Record<string, unknown>;
			};
		};
		encodeInput: {
			states: {
				idle: Record<string, unknown>;
				autoPlayEncodeByte: Record<string, unknown>;
				encodeByte: Record<string, unknown>;
				explainByteMapping: Record<string, unknown>;
				encodingComplete: Record<string, unknown>;
			};
		};
		createInputChunks: {
			states: {
				idle: Record<string, unknown>;
				autoPlayIdle: Record<string, unknown>;
				regularIdle: Record<string, unknown>;
				autoPlayCreateInputChunk: Record<string, unknown>;
				createInputChunk: Record<string, unknown>;
				explainLastPaddedChunk: Record<string, unknown>;
				createLastPaddedChunk: Record<string, unknown>;
				createdAllInputChunks: Record<string, unknown>;
			};
		};
		createOutputChunks: {
			states: {
				idle: Record<string, unknown>;
				autoPlayIdle: Record<string, unknown>;
				regularIdle: Record<string, unknown>;
				autoPlayCreateOutputChunk: Record<string, unknown>;
				createOutputChunk: Record<string, unknown>;
				explainLastPaddedChunk: Record<string, unknown>;
				explainPadCharacter: Record<string, unknown>;
				createLastPaddedChunk: Record<string, unknown>;
				createdAllOutputChunks: Record<string, unknown>;
			};
		};
		encodeOutput: {
			states: {
				idle: Record<string, unknown>;
				autoPlayEncodeBase64: Record<string, unknown>;
				encodeBase64: Record<string, unknown>;
				encodingComplete: Record<string, unknown>;
			};
		};
		verifyResults: Record<string, unknown>;
		finished: Record<string, unknown>;
	};
}

export type EncodingEvent =
	| { type: 'RESET' }
	| { type: 'UPDATE_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'VALIDATE_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'START_AUTOPLAY'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'SKIP_DEMO'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'GO_TO_FIRST_STEP' }
	| { type: 'GO_TO_PREV_STEP' }
	| { type: 'GO_TO_NEXT_STEP' }
	| { type: 'GO_TO_LAST_STEP' }
	| { type: 'RESUME_AUTO_PLAY' }
	| { type: 'STOP_AUTO_PLAY' };

export type EncodingTypeStates = {
	value:
		| 'inactive'
		| 'validateInputText'
		| { validateInputText: 'validate' }
		| { validateInputText: 'error' }
		| { validateInputText: 'success' }
		| { validateInputText: 'validationComplete' }
		| 'encodeInput'
		| { encodeInput: 'idle' }
		| { encodeInput: 'autoPlayEncodeByte' }
		| { encodeInput: 'encodeByte' }
		| { encodeInput: 'explainByteMapping' }
		| { encodeInput: 'encodingComplete' }
		| 'createInputChunks'
		| { createInputChunks: 'idle' }
		| { createInputChunks: 'regularIdle' }
		| { createInputChunks: 'autoPlayIdle' }
		| { createInputChunks: 'autoPlayCreateInputChunk' }
		| { createInputChunks: 'createInputChunk' }
		| { createInputChunks: 'explainLastPaddedChunk' }
		| { createInputChunks: 'createLastPaddedChunk' }
		| { createInputChunks: 'createdAllInputChunks' }
		| 'createOutputChunks'
		| { createOutputChunks: 'idle' }
		| { createOutputChunks: 'regularIdle' }
		| { createOutputChunks: 'autoPlayIdle' }
		| { createOutputChunks: 'autoPlayCreateOutputChunk' }
		| { createOutputChunks: 'createOutputChunk' }
		| { createOutputChunks: 'explainLastPaddedChunk' }
		| { createOutputChunks: 'explainPadCharacter' }
		| { createOutputChunks: 'createLastPaddedChunk' }
		| { createOutputChunks: 'createdAllOutputChunks' }
		| 'encodeOutput'
		| { encodeOutput: 'idle' }
		| { encodeOutput: 'autoPlayEncodeBase64' }
		| { encodeOutput: 'encodeBase64' }
		| { encodeOutput: 'encodingComplete' }
		| 'verifyResults'
		| 'finished';
	context: EncodingContext;
};

export const initialEncodingContext: EncodingContext = {
	resetForm: false,
	autoplay: false,
	skipDemo: false,
	byteMaps: [defaultHexByteMap],
	byteIndex: 0,
	currentByte: defaultHexByteMap,
	updatedByteMaps: [],
	remainingBytes: 0,
	updatedInputChunks: [],
	inputChunkIndex: 0,
	currentInputChunk: defaultEncoderInputChunk,
	remainingInputChunks: 0,
	updatedOutputChunks: [],
	outputChunkIndex: 0,
	currentOutputChunk: defaultOutputChunk,
	remainingOutputChunks: 0,
	base64Maps: [defaultBase64ByteMap],
	updatedBase64Maps: [],
	base64CharIndex: 0,
	currentBase64Char: defaultBase64ByteMap,
	remainingBase64Chars: 0,
	input: defaultEncoderInput,
	output: defaultEncoderOutput,
};

export const encodingMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QCMBsAWAogOwMYHsIwA6AS2wENcAXUgNzAGIBlAFQEEAlVgfXYFVWAeQAKAGXYBNRKAAO+WKVr5sMkAA9EATgCMAJgDsxAMwAOA8YCsO9MYAMqLXoA0IAJ6Jj6dHeJP0lnaGBlqoeqYAvhGuaFh4hCTkVLQMjABq7GIAkgAi7KyYPAUAGqxq8orKqkga2jrGRmYW1rYOTq4eCFaGxOaoqOamqA526FExGDgERGSUNPRM-CJ5BUWYpeUKSqQqapoIOvqWpsSOGGamWqOoxh2eWrbEOqYv+qboNjp2xuMgsVMJWbJBYsADSWREPBymAAskJNpUdtVQPstKEdMR0Gi7HZrDZvFo7ggsaNenoMAY7JdLAZHL9-vEZkl5qlOJhmJgyjUKttdjV9odnkZTJYfHpLFpTF9jKgiQ0hsRDKZvsMsWidPTJozEnMUkx1LBqBRqCQKAAzE0AJwAFF8AJSMBnTHXAhgI3nI2oHQ5o07oUx6OwWF4fWXuTxhLQmAbnAOigw6AyauLO4h0CgAG1IEGNYCy2FkAFdqKwwOpqGnM9nc4x3VU9toPhibAY1eZdPUid4g8RvkEca9DKhkwCZumszmTfmiyWyxWwJbLfhLYw2RyuXItvX+dp1ZjsbjDt4sV3wnpiNZ+jobpYaTotCPtZWJ7np8XS+XiAulyuAOJCIoAIAMSyTg2B4NhMBEOskQbA4cTsDE1RxPFj0JcNiRlKN0EpZ4dECAN-UfVNx2rKcC3fOcv0XZdGH-QCeBENk0gggpoO5LdYJ3eDEKQg9UIJLt-UaSVdAMVsLksYjAVIyc8wo2dP2-WiDSNE1iHNK1bQQh0nRkqs5LfRT5xoy0YL5FFEC+Xj9yuQ98RPDD0GGSwTCHSxjC0EJLD0PRpLHAzXwUj8K1gQtcFwOBYFXdl+BhQoBGERiJGkDjEQsr0HkOJ4cLbEJDluDCzHQc9wn0LRLEjRwH2iP4tRIwLyJnELiDCiKopi9dzM9VF0VslCj0EoqXijAw8UMPQZXqKx-JIWSguaqi2si2BovopKQLA3hIPYzd0p63cE36+y0K7a5TglGwLmPWxZufMj5MWz9lo69aAKYzAWJ27q4LRKVjoExzOlDdAL0GZV9AHfC7vmprKOe8KVrWgCkoAOXWba2J+7isubXK-vyzsirRKN7wcQZRT0RMk1qvSApfOHjNaxHXpRgCJHA760o9X6mxy1sCY7QrgcOIwfRKnxLhFYdafq-SGce+HQpZ1bGFU3MNItBdtJxXS5fph6jJal7VuxyyEFx-m8qFuUDD0UGrE82xQjsUJyRhxrFeMxgIBUEhDQ1um5s9o25zNzK+uQk6hs6YNUF7O3TGK+39DusBtSMsgIAzJg1zihLBHelLw-2cSvgvHEHgCe8fJcYmnCeCrxK8u3AzGtOM4UrOc5YYRIUSoupBLxBW0DfdUB869XeMYx8LlEVjGIMaPKlbx8LtjvnUz7Me7XTlh4QF5aTJFtnJ9fQ5XKi9AlH2xE5qiYU0BdOt67nemDenhNs5rHue3c2XgKgDKfVA5866dGMOEeOzlEJeCvMqJOm8Ejb2zh-NmjFmKsSggfQB8dgG5VAfeC+TlZ6gxpEESBnkQihCQUQFBPdP7o1KFg3aIAeT-y9GXXwgRXbeGsBVXycpuiYlGDPLy-RHBjFlk-GYL9kFv1QXRdBHNMbYL-lxc2XCK68OrgI8BiB7Y4iXpSGeMofADD8tI0cJA5F0IUT3dW6lNLa2snYPWMibGdxnN3MAB8tE8Krvw2uXYbCk0PAmNEqA7Y00ftYr8XjiwaWLPgEQGYKBuGsQAITcCaXuog+CF2SkPdRGV9hxlBomb4Pgm4ih0HKK8JhZ6OCupTCqtCvZJOoCktJGTtTZNyY400WsbSuPcXE2xHSKDJNSekrJOTfElIOofDyGJolUhuO8LEBg5ROEXqKK89RymQPaZnCZ-Tc6xXigUpK4hil7R5txOMzZQGBgqhPBMph57PEVB8KkMoJQPAfnVDx8TX7eLOfMzq+9FlwReJVE+BCwFEnCKKJe9Q-qih8F4KRsSnwTNOX0yFn9v6qNYewjRXoXj9ARa2Qhuh9FdBsmEMRQYBi3gaCcruELcmfw+l9X+9yOGlwEYqMIrZRSBPQJfEqFdHB9CpNYIYnLwWEp5egphpK-EVQxA4Cx00k7fGRVoGepwZ7XB8EcH4Vi8UJPnKqtBDEVEsJweKZ5kM3l3k+RhcUrYl7iiCF5HyWUrW4tTPirl6hZBpPIOcmEFBZCyHIFATq+drmD1SoKilpcEzcMrnwmugiML3kcL2FOcLIFU08sqxJZYo0UBjfMuNCak15P7oU25Ga2GcVKSPWw8dKTRK8lTUSyL6i+A7M8d4ZgBjt2tWG21X5I3RuwLG+NibsDJr3huLt+1YXSxpWfIhDKfVRnMMcSkfzBjVvnEu+tK7G1rpbcS0CP81GZp7YfIYeCqaIqPciiw-av3OTPXoLyIbgXjIXbW5dq7m0bqUQxPlzqYXcX8Xm3RwSiqTVBjhSq3wVm4hiRBm1YKa23obSaJt67k2MIxsh99Sy0M6KCYWzoVNxR+ArYeZUPkaTXsXXWijYAqNPuUewV9ZLu2MZzdowJBbj320XkMXhnxQE3H49Bu9sHqNqwDk44ZOs3GOn1p40jN7BP3so4+jdfiZMBPzXookzxrC9gqgEXyoQaRROvT7P2rU1IkCDqC+RM4cH7vwbSpFGExrUv4ThCeDRQgy1DYCXAlowALWLAAYQABaFmwAAa1gD42sKHzYBEQhdAMyoPi0ilESMVYtxLiXCFKO20M52pfS5l6guX8tFc6d09JWRFFsHyQPIpnbyUfrVP2kxM7fIxga4cVyZ53iXAlhyzrMw0sZcZn1wrxWpldJmW4EbDi9NDK0qM4zILds9YOwN47Q2zuoIPrN4xKpzCLaGA1lFTxaRHEqfoZLxHUz3f23lw7xB0tQELGky052LnMFTRNjt73ImfZlN98kv2MKBGyv67E1gExSW2yQCHXtHvFdh-DigiPRt9zTZN97Fgow-sgQEXCScuwbd6BYBovkLBU1B0FynRlqcw7AHDhHSOoXbum4x12JxKqtkTP8yUYZOj4V9PhBwEsV7rbuuLhSkvaey8Uc+ra9Gd0PM0VSFXUTasa7x9r-0GJfJkzCM8e2tJjfdch-1mn0u6cM4YegpDXMGNwRzY7tXAGJSu4MZNVyAbxQ0iruKf3e2qdQ4G+b+ncvaPMKj7boViAPviS+63Jb+OHiuTME3QwICycpZ2wH3PQepcy8L5bsTEmMehCxwt3HWvEA0heJiAw7YJSTUgURsXHeJd56O9MnpWWl+m7z625n6OytejvEYXEzkJ6u1AT4SwRJAjOSXh8AIX7DAzXJ8QE3M5JfPdOxvnPy-+u6YC5ra7HSW7OJV-bLFfQbT-TfN-PPA+HycwXsY4f0V2SqSUOpJyVsIwRbG4U-bwMIVvMHLrb-LfLvUA3rbfPOK5NHYufffYY4fCC8adPsZTerJyEaXoewAYIUeoDrNvCnKAsAkg-gsg3-LdPxZXC8J3dXCeTXK-GweOe2OfPCQUSxXgl-IQyXUgx7BDDaF9TVGgkeB3CQ+PF3MfBAQIcIEwUJCGEqBoBfEzNQog6AwQxwgQwrbQ96TBUvRXOCQheOCfLwafMIJOL1ToQIewMkTzewfZAYbPB7cAzQ7fYvPQ6PbiYYBUL4bwahUYIYNA4GCwHVV2fQSaB3CwWIwPaHBI3-T+J1LwqTHwwIeOL4QMDg0DDyKVfHc-C8X3JwXhRVfAxfFw4Q6HTTcgMQCgQ0EQCgCAIgCALQigguG5aglI82Q-BAk-QIdEC-BrAkXoY1Y4TgtXDUZ-So4Y8jbAMYiYqYmYrQsbNtRYu5MvLNcfbHRUafQMb4eoSaEIxAc-c8A1OAqhHFAg9vQYyXEY848Y6gSY6YyAOY9kaFZYzhQw1XZ3aQpPMw+wRefCRMQxKwG4FQ4Evg0E8A8Ei4qEq42ExI9BElG3bw1DZEyQhPGQ-HGBXsQha8ckRCawMozvU4izMk6E64qkxDTwgVR4j9VY4-foDY8-XEK-Zoi6BVEo8UIEgYuIrvUkyEwUykqo9VOjWo3dbiSU6ImUmwOUjCfoBwXoURbAh3KInkn-Pk5dAUik2Y4UpKGosUuklYhMI-E0s-M0y-C0-QReKkCqGeEIA1I41Qk4gbTUy4mEt03-QZAAlxIAtU8ouMs4l0xMx7WA30tY6UgMrYi0u2UGfI0nYISqUXew2M4rSnHMoUkQy5BY9NA+U-Ro-sFo8M9ozod5E4LCJwY1O+GeB04giojvRsnUtw243fJY8UpZUBSkaMQ5CwLFY1BrADdg3EYqGkS6McpwicnPKcpMtw0Q-QhASkSfFEqQxPUwkxE4Dkhwa8SBOVA81wgbBsrU10rQq3AfC8q8uPVEu8hrHoxUAI12UITydTY49Q+Iyc783M90jwz6Wkuoo0gsqU0-TY80vswwKMP6JwYYXyAMd8oYz8hChMpstwpItCw082Dsp4LshwVorwTcqwV441KmSqOMAkjM3kii48xC6igrdwngT0t9Bc+oq0povsSMNohrBeRUXVYXLCF4MijQyi8kpC5My7VMkZdM2suC5w3ME8vMi8xi2S7shSi01ktee8WeKkM-DSlfXzbAf2f-fix0orMQ68xkkwokcSG-JLI8CePCHkoQYsQ8gbd+UrRE-YWwReJwUUA1VecSdErEeA41LwcwQ8dzCKqKj81fE7HpOXWcqgh470zKUDXsMwCaS0sIUw-0ckWq9sWeQxY1Aq6gaK4ql7OXFM5xAy3WYAp8SnSK7qoqiA0qt7C8oc1q+q4YRqrsNEVyLitoKwRMUi2CnPcanq7vUPOXeYucyq9C82Oa74AMO2Bq8kQKmuLo93GBFa6Mwkhw3MXayagvMPJgcq9tecqq-YKJJCAMEigifQWwQK1rC8XQGkQMFbPhLqvaz6w6+EhXU6r0Mwb4EwfZQNdUZ4JzewTAqJKmRCXESUS4BGj6kPC3cPBiGkg0u3dGkIReKwZyHGjsb470S4RpSURAwXDyfooynawq8i4PHvL6sSyPL0tG-YMweoLG1msaXGjmzg0GSae2SqeoG4WeCmkW-a6mh1NGfUqW+i6qqMC6hali0wy8VyOMLwW8EIHCPiwWt64Ws3Km3vGmj08TZIqSnGGq82q6xam6i04mro44BwN4ponW9-NfdJL-F2ia8infCqqbaWqyfoc8AIII1o+MDACG2eXsfCM8ZeDyGsu7Dvd63Wj-dfCu127fAagzG7fiyumOkquO2uxO8y+KqyYdNychKeEXDyUCgunhGBCUK61U52k0Fu+CoWzu8gls461Ok2gUIKhOFZB4CMw4BlAdCpXES4Hcr4RMaO2ehO6K+XA+Ww5m7GxW9mokXQMhD4mwUUTyUSE+ky6euu3U2m3QuihmmW6fa+hWgFQ4Dmr4I6D4f1KJNlcK7as+yasar+miiPUUyS-6gxBwVyAqKJUIWwVXe874UqUBjI2eLzd+o8+BpO2i+m8vBAZo0GDAUYQFQBnCZW4XEwKWbVSdSIOBz++ej+sAGe7+r2-87uuh5yIwMuRWsINeIMvs4qTEHjIIDbKachrM-k4S6c0So6lOg+a8MITESqM8CqXO3sivB+xUIc5UV1f0MukAjuva+M7SkS5O36k6leqyAmp4cqSkQMH1K-ChKfLyf0ZUJ3AW8uuexx7MzR087RlGy+2kIBxwW+0BwKmkKGwXSae8HCGhXhwRpB9R50mJ386k3+mhp4roBMJJtm1JjCLm7EAqCwURGwNR4rJx7U2JiW1ByTDxg4DOwx7Okx+LMxhAGMVbKIikHi7kvJoRp0u9My5CngDVP+2h-RzOoxgMIZ2kEZm+D3ChMs2kHEOx0ahxya9pn8xZiSnp-+9OgxrO4x28YZhrFUC8BMQ4XVSUW6GZgptp6JqirRv-DWQawzMZE5yJs5v55xrRvR-p+5zZx57Z2Qrm7gr4cwQ4c4VpgTZdaE3LenZIBcFNSgtx5em58RqJYxRMCUGRj4OR8fa8UGQNQHWkStTF8EnFnLPFmgAln6+4kl2hytP01eb4Q59zAJrELo4YKkafZyW8Vls49lzlq0C+i8wXaplJvG71HsXQEMSJRapVb5-huZ8gBVy0fFv8Up63cpj9BoE1Fm5JkBjViBDAMkQiYdfe6VuVizE1s1rp1Cq1pZamUGIMDexKt5hlHJ+Of5II44QwaZmM053WtlqY3F01rl81hiZZ-1uCe2clqRql+2Glq-SBDEOFfCTyIDHh+N8FxN+V5Njl1NpV6o72lZipnNyR30-N2Rq-IYc8NTO-e244cDZun5rFu9b1tNwF-TQA4a4dw1wpsdutxVhcA+Ntil6RgtueFkzyXoQ5K4XyEGzFr8-5zpnR4ly+8BpeCVTW-0S8YWcfD4JTe2YJ28QMOkA1vao9qFzpnltsi8lFXwe8KlQFYYOQ+UryTEHCPE+wKUJ-KtyhzSoS49uErqFViSeW+1pW3nc8Eu41EULi45d9hBrSjpkpn+y1420lhoDydDmpx1n47d-oTKtI5OcJ+x6thD0y4pxZyWtBtOsl9tylt2LtpyFa3sQiEUNo7wQ94ji54RgCTNij2hxyyRq9sxWpG4K-chJeLwGUKJWkY4Stl6xBud+smTnS5Bx1ZtrN7iZTy9rEa99Tu9swgYE4K8D5PhTnaTxDr9rQhu6dozWdj9szkS89nsMaeztT29sDm2t2MwJpWwJ2iJ+D1y32dy-zQOKe-Jkzy+mDmj9Vjmu2XEU4ckd4xyocdpSukrU93l1nAc3yKhS6m92li2THGeMdKliUMwCr4WkrH9lnC87Ejhja9badNEBlI+m-D4kJ8wC1brxOqr+Jgb0eEwZuaUuL5UdCbXQhjEY4XOpyyBVjkjBISr2Kv8n29Bg4Zb2wpLFeDGzbqyLsi6KJct3A9S5-CZE7vvEUv1xTipsIIkdsftAidjUDbDOb7xU7vUkvX7mbafNySaLyRriT++hBXsWwM0oYAIHCcHxJSHyz0R328rOHitBrwwJr++z404EmlAm1v3d77UT7i7f-YFpu+wj7nr9+Wr+H0n1sZHotLkxeBHitX4rEHHisau2ZPpcYsADAVxmrgb5A3oTr0YXmgDe+6UzEaU0Dd4L4WV+n50SriX3pZ0TJaX2XvztMmdtnhnnro3rJM39APRnTzEOQieY8H0BlSUKkTEcUKJdZPhRLyDA3nrs5B3wl1s-rsRr4BuEURCfIpwL4jmyUXyFb2fV9+2yekFdn+b0P2AGX9AZVqPq71bhLYI12e++zi8I4bi68S4OwrPm3nPqXvP2Xs7ltj9RMGVa7tbsv+7i2G1sGeUOAkHMX4LIgU3lvgv3lbpvxMeIML9Hc93JziqSUHKCfXKm4DefX47kP5v-PsShT3j3pj5XoF4MnjARqiUe+xvV464UDLjQ7+dYPpvk3sPptgni76Pv4gneP+rl4a-q0reD3L2AsQN4MXm5Q8oZcG+z-ULEtxT7d9S+d3QKk4CMCQMxo7kCeI-xkgLhSAZoNwJwDgDw5qA0Uarr+zEYp5hQVSIMA8AFwNAAevkVyIEVHgpVJoxzEiDgLwEECwoGYYgYX0J5egKB1pLwNQMg4RknMTDVyB5AeCbJRgREZ-AwEtC4D8BhAngcjDI4f8+O2GSgcIIdq0Dtk-PCeJnRCa0hIwMMDgcoO4G8Dp+P3I-qSxxLngEBt3DbgD2ZRLx0Qrqa8IGjMGKDOBKgqwVD3O6aCZQ2gnwLoNMT6DOgwRXtuiACLRJKo3gpQVwKIFqCRGgQ3ppNHEhCDQhNA8IQDx4TFccqGAO-LoASG+DLB0UC3kNQC72EFBiQvwfAD-a2EshIgvQS4PSYeRwggRS0s9SCxmhyApAWADlkgB8DP+3wcIlElrha1AUO9CqCcBoETwhgAKGUHdD6HYABhQwiAGJTpow8A2Yw3wBMMWxiIsQDKKUPQRFCUgCImyPXqoVWHrDhh1g-lLYP5YBFmhYQsQXUwvZ4dPIUrNpM-luGDDhhlQ7SKC1TD-CNhejXEK7G05KgDUrqZAWNBd45FmWD7KRLVGwAJAGhKAewsyD1AQjnuPyelscKIpOcsUWDGws3GNQPBcQHsBWKHE-CwwFkYjMSA4PMAbVWgjgcNreAIocFqEWKcmvIJDjBQqIykMyLNWnwEVxUXJIAZcC7C7cfenxINFYDjYvUGRdI5WO1FNizVDEpwLKCiKpi5EK82KVqrUmCGhIaRhsIUfSMahIgss+AAALZRowAJoA+KEBCCnALE7yEMn3zFDYd9ivCckHbAeDmjDIlo6gC6JsADlWRLQDgu0CKiGDow6tLknX1nSqFw0EPGamIzZwnBsimyI4IETOj0FGO4kXTsMD3b8Y7e9qHBEAO8Z1VG8xaA0cSHqCoDh0DQfCIDQ0yViAKwTQxlAgnjMpEwQieFLWP1S44sBsiKDGcW0xJo-EWdBgrxmLFfB-u3qUHmSH3q6pIEQYDsdMCTS2iHROcZ0ReQk5YNDkXxXQOiGRTDAlMnzHEPhB8hDtreZmPxA0CDYhM14PqdEtTDCQeQzA1ZZ+veKS6ZlisnPC8qGGFAxty2zwUIH3xuA9hVyUrMuPyLg6ASpqw2DMfwISrT5GBkRAIC-V0ANYZ4vbe-qKDHSwcjOxlaHEjTQkXccmgvZAknAzpH0Am8KN4tsy2RrkXKXeI3vHUzKwExEfoaDtxRnigImJ54bIreDwik5DOXlccoJXVKFZ2yhyU4AfVOGIQFC8pbwEvCYbT5qsScTPmxzknztRiXHfrLxIY6tBgE344SRaRAHacxuLFIhECmklBdvOJHGAhZUpbeMXgs8Q5KIkUqr82cxqcmPqI4kUMTQEAdgBmAzDeVMR6En4hDHdEhAgw3gJONeEUr-RasimcLiDjHFEkDJMU6iVdCV4BgIJlwRwF2GkKF07I5wzZIHzBbJcu8wEsRuYACaJhdi3gDzKzVqng4E2rdPqlRL44n99cdkRCM5G8litmaU6N4ucG+CYtKJOcWfq5Bwi89DmOIQttFgqyyYMArA-XJiy4k9S3JUfZvH4ADKHgNioofOpG3q6K1IKEoLzvVPkl-spWiof1Gi3eBVId6ObMTlUzCCEYvmSErLlEw0ZIcDpsUg4EdKuDohTpyBHZs5g4YP1pQIOPSXVL4aAzsWi7Btsuz-a3j9wIod4I81CDolJ4SEFmiTUKKtg7pJoBZiZL-YigGW1ZCVD4FEROdRQEoLGk7gXjkgPIFMyABFIzCzMfKKrB9m5GoHXBAxdsbYtlCpGjS4um9Vpu2RJFlkVuKI6fKyhylj8AZuPfqb0yaLiCvGlIwIC+zVo9CHxO-ebhWNf6T8ne1KBMBSDZTuYBx-PIIKVEiSQxfS14Ufrn3z4zjzwkE4qG8R8gjNUCok-UfiB4xddt+RASrrYh3H2jHRB4qPrpzRS2zaZk8CIdoDgSF1JWLcVUGLz8RJ8RgVPN5LPEdiOSah5gpIaoJXaIQza+uTWmriGBpzD4FIUVHiCuCos+Mfw-oQCIgAQj14TFUDOqAHBOcYOjQcIJXHWwJZZoOXJzNmIQhzy55liKIEAA */
	createMachine(
		{
			predictableActionArguments: true,
			context: initialEncodingContext,
			tsTypes: {} as import('./b64Encode.typegen').Typegen0,
			schema: { context: {} as EncodingContext, events: {} as EncodingEvent },
			id: 'b64Encode',
			initial: 'inactive',
			states: {
				inactive: {
					entry: ['stopAutoPlay', 'resetContext'],
					after: {
						'10': {
							actions: 'clearResetFlag',
							cond: 'formResetRequested',
						},
					},
					on: {
						START_AUTOPLAY: {
							actions: 'startAutoPlay',
							target: 'validateInputText',
						},
						VALIDATE_TEXT: {
							target: 'validateInputText',
						},
						UPDATE_TEXT: {
							actions: 'validate',
						},
						SKIP_DEMO: {
							actions: 'setFlagSkipDemo',
							target: 'validateInputText',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'defaultSettingsChanged',
							target: 'inactive',
							internal: false,
						},
					},
				},
				validateInputText: {
					initial: 'validate',
					states: {
						validate: {
							entry: 'validate',
							always: [
								{
									cond: 'inputTextIsInvalid',
									target: 'error',
								},
								{
									actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
									cond: 'yesSkipDemo',
									target: 'validationComplete',
								},
								{
									actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
									target: 'success',
								},
							],
						},
						error: {
							after: {
								'1000': {
									target: '#b64Encode.inactive',
								},
							},
							on: {
								RESET: {
									actions: 'resetInput',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
							},
						},
						success: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'validationComplete',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'validationComplete',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'validationComplete',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'validationComplete',
								},
							},
						},
						validationComplete: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'encodeInput',
						},
					],
				},
				encodeInput: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingBytes',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'autoPlayEncodeByte',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeByte',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.validateInputText.success',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodeByte',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						autoPlayEncodeByte: {
							entry: 'getCurrentByte',
							after: {
								'1000': [
									{
										actions: 'mapNextByte',
										cond: 'bytesRemaining',
										target: 'autoPlayEncodeByte',
										internal: false,
									},
									{
										cond: 'noBytesRemaining',
										target: 'explainByteMapping',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'encodeByte',
								},
							},
						},
						encodeByte: {
							entry: 'getCurrentByte',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeByte',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousByte',
										cond: 'hasPreviousByte',
										target: 'encodeByte',
										internal: false,
									},
									{
										cond: 'allBytesRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextByte',
										cond: 'bytesRemaining',
										target: 'encodeByte',
										internal: false,
									},
									{
										cond: 'noBytesRemaining',
										target: 'explainByteMapping',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						explainByteMapping: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'encodingComplete',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodeByte',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						encodingComplete: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'createInputChunks',
						},
					],
				},
				createInputChunks: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingInputChunks',
							always: [
								{
									cond: 'autoPlayEnabled',
									target: 'autoPlayIdle',
								},
								{
									target: 'regularIdle',
								},
							],
						},
						autoPlayIdle: {
							after: {
								'1000': [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'autoPlayCreateInputChunk',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'createInputChunk',
									},
								],
							},
						},
						regularIdle: {
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateInputChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									actions: 'resetNoBytesRemaining',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.encodeInput.explainByteMapping',
								},
								GO_TO_NEXT_STEP: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'autoPlayDisabled',
										target: 'createInputChunk',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						autoPlayCreateInputChunk: {
							entry: 'getCurrentInputChunk',
							after: {
								'1000': [
									{
										actions: 'mapNextInputChunk',
										cond: 'inputChunksRemaining',
										target: 'autoPlayCreateInputChunk',
										internal: false,
									},
									{
										actions: 'mapNextInputChunk',
										cond: 'finalPaddedInputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noInputChunksRemaining',
										target: 'createdAllInputChunks',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'createInputChunk',
								},
							},
						},
						createInputChunk: {
							entry: 'getCurrentInputChunk',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateInputChunk',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousInputChunk',
										cond: 'hasPreviousInputChunk',
										target: 'createInputChunk',
										internal: false,
									},
									{
										cond: 'allInputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextInputChunk',
										cond: 'inputChunksRemaining',
										target: 'createInputChunk',
										internal: false,
									},
									{
										actions: 'mapNextInputChunk',
										cond: 'finalPaddedInputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noInputChunksRemaining',
										target: 'createdAllInputChunks',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						explainLastPaddedChunk: {
							entry: 'getCurrentInputChunk',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createLastPaddedChunk',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousInputChunk',
										cond: 'hasPreviousInputChunk',
										target: 'createInputChunk',
									},
									{
										cond: 'allInputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						createLastPaddedChunk: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createdAllInputChunks',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										cond: 'lastChunkIsPadded',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'allInputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllInputChunks',
								},
							},
						},
						createdAllInputChunks: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'createOutputChunks',
						},
					],
				},
				createOutputChunks: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingOutputChunks',
							always: [
								{
									cond: 'autoPlayEnabled',
									target: 'autoPlayIdle',
								},
								{
									target: 'regularIdle',
								},
							],
						},
						autoPlayIdle: {
							after: {
								'1000': [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'autoPlayCreateOutputChunk',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										target: 'createOutputChunk',
									},
								],
							},
						},
						regularIdle: {
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateOutputChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'resetNoInputChunksRemaining',
										cond: 'currentInputChunkIsPadded',
										target: '#b64Encode.createInputChunks.createLastPaddedChunk',
									},
									{
										actions: 'resetNoInputChunksRemaining',
										cond: 'autoPlayDisabled',
										target: '#b64Encode.createInputChunks.createInputChunk',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										cond: 'onlyOnePaddedChunk',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'autoPlayDisabled',
										target: 'createOutputChunk',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						autoPlayCreateOutputChunk: {
							entry: 'getCurrentOutputChunk',
							after: {
								'1000': [
									{
										actions: 'mapNextOutputChunk',
										cond: 'outputChunksRemaining',
										target: 'autoPlayCreateOutputChunk',
										internal: false,
									},
									{
										actions: 'mapNextOutputChunk',
										cond: 'finalPaddedOutputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noOutputChunksRemaining',
										target: 'createdAllOutputChunks',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'createOutputChunk',
								},
							},
						},
						createOutputChunk: {
							entry: 'getCurrentOutputChunk',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayCreateOutputChunk',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousOutputChunk',
										cond: 'hasPreviousOutputChunk',
										target: 'createOutputChunk',
										internal: false,
									},
									{
										cond: 'allOutputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextOutputChunk',
										cond: 'outputChunksRemaining',
										target: 'createOutputChunk',
										internal: false,
									},
									{
										actions: 'mapNextOutputChunk',
										cond: 'finalPaddedOutputChunkRemaining',
										target: 'explainLastPaddedChunk',
									},
									{
										cond: 'noOutputChunksRemaining',
										target: 'createdAllOutputChunks',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						explainLastPaddedChunk: {
							entry: 'getCurrentOutputChunk',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'explainPadCharacter',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'explainPadCharacter',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousOutputChunk',
										cond: 'hasPreviousOutputChunk',
										target: 'createOutputChunk',
									},
									{
										cond: 'allOutputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'explainPadCharacter',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						explainPadCharacter: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createLastPaddedChunk',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: {
									cond: 'autoPlayDisabled',
									target: 'explainLastPaddedChunk',
								},
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createLastPaddedChunk',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						createLastPaddedChunk: {
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'createdAllOutputChunks',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										cond: 'lastChunkIsPadded',
										target: 'explainPadCharacter',
									},
									{
										cond: 'allOutputChunksRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'createdAllOutputChunks',
								},
							},
						},
						createdAllOutputChunks: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'encodeOutput',
						},
					],
				},
				encodeOutput: {
					initial: 'idle',
					states: {
						idle: {
							entry: 'resetRemainingBase64Chars',
							after: {
								'1000': {
									cond: 'autoPlayEnabled',
									target: 'autoPlayEncodeBase64',
								},
							},
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeBase64',
								},
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'resetNoOutputChunksRemaining',
										cond: 'currentOutputChunkIsPadded',
										target: '#b64Encode.createOutputChunks.createLastPaddedChunk',
									},
									{
										actions: 'resetNoOutputChunksRemaining',
										cond: 'autoPlayDisabled',
										target: '#b64Encode.createOutputChunks.createOutputChunk',
									},
								],
								GO_TO_NEXT_STEP: {
									cond: 'autoPlayDisabled',
									target: 'encodeBase64',
								},
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						autoPlayEncodeBase64: {
							entry: 'getCurrentBase64Char',
							after: {
								'1000': [
									{
										actions: 'mapNextBase64Char',
										cond: 'base64CharsRemaining',
										target: 'autoPlayEncodeBase64',
										internal: false,
									},
									{
										cond: 'noBase64CharsRemaining',
										target: 'encodingComplete',
									},
								],
							},
							on: {
								STOP_AUTO_PLAY: {
									actions: 'stopAutoPlay',
									cond: 'autoPlayEnabled',
									target: 'encodeBase64',
								},
							},
						},
						encodeBase64: {
							entry: 'getCurrentBase64Char',
							on: {
								RESUME_AUTO_PLAY: {
									actions: 'startAutoPlay',
									cond: 'autoPlayDisabled',
									target: 'autoPlayEncodeBase64',
								},
								RESET: {
									actions: 'resetInput',
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_FIRST_STEP: {
									cond: 'autoPlayDisabled',
									target: '#b64Encode.inactive',
								},
								GO_TO_PREV_STEP: [
									{
										actions: 'mapPreviousBase64Char',
										cond: 'hasPreviousBase64Char',
										target: 'encodeBase64',
										internal: false,
									},
									{
										cond: 'allBase64CharsRemaining',
										target: 'idle',
									},
								],
								GO_TO_NEXT_STEP: [
									{
										actions: 'mapNextBase64Char',
										cond: 'base64CharsRemaining',
										target: 'encodeBase64',
										internal: false,
									},
									{
										cond: 'noBase64CharsRemaining',
										target: 'encodingComplete',
									},
								],
								GO_TO_LAST_STEP: {
									actions: 'setFlagSkipDemo',
									cond: 'autoPlayDisabled',
									target: 'encodingComplete',
								},
							},
						},
						encodingComplete: {
							type: 'final',
						},
					},
					onDone: [
						{
							cond: 'yesSkipDemo',
							target: 'finished',
						},
						{
							target: 'verifyResults',
						},
					],
				},
				verifyResults: {
					entry: 'updateContextForLastStep',
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'finished',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'finished',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_PREV_STEP: {
							actions: 'resetNoBase64CharsRemaining',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.encodeOutput.encodeBase64',
						},
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'finished',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'finished',
						},
					},
				},
				finished: {
					after: {
						'10': {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
					},
					on: {
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: 'inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: 'verifyResults',
						},
					},
				},
			},
		},
		{
			actions: {
				resetContext: assign({
					resetForm: (context: EncodingContext) => context.resetForm,
					autoplay: false,
					skipDemo: false,
					byteMaps: [defaultHexByteMap],
					updatedByteMaps: [],
					byteIndex: 0,
					currentByte: defaultHexByteMap,
					remainingBytes: 0,
					updatedInputChunks: [],
					inputChunkIndex: 0,
					currentInputChunk: defaultEncoderInputChunk,
					remainingInputChunks: 0,
					updatedOutputChunks: [],
					outputChunkIndex: 0,
					currentOutputChunk: defaultOutputChunk,
					remainingOutputChunks: 0,
					base64Maps: [defaultBase64ByteMap],
					updatedBase64Maps: [],
					base64CharIndex: 0,
					currentBase64Char: defaultBase64ByteMap,
					remainingBase64Chars: 0,
					input: (context: EncodingContext) => context.input,
					output: defaultEncoderOutput,
				}),
				resetInput: assign({
					resetForm: (_) => true,
					input: (_) => defaultEncoderInput,
				}),
				clearResetFlag: assign({ resetForm: (_) => false }),
				startAutoPlay: assign({ autoplay: (_) => true }),
				stopAutoPlay: assign({ autoplay: (_) => false }),
				setFlagSkipDemo: assign({ skipDemo: (_) => true }),
				validate: assign({
					input: (context: EncodingContext, event: EncodingEvent) => {
						if (
							event.type === 'VALIDATE_TEXT' ||
							event.type === 'UPDATE_TEXT' ||
							event.type === 'START_AUTOPLAY' ||
							event.type === 'SKIP_DEMO'
						) {
							return validateEncoderInput(event.inputText, event.inputEncoding, event.outputEncoding);
						}
						return context.input;
					},
				}),
				encode: assign({
					inputChunkIndex: 0,
					remainingInputChunks: (context: EncodingContext) => context.input.totalChunks ?? 0,
					output: (context: EncodingContext) => {
						if (context.input.validationResult.success) {
							return b64Encode(context.input);
						}
						return context.output;
					},
				}),
				getCurrentByte: assign({
					currentByte: (context: EncodingContext) => context.byteMaps[context.byteIndex] ?? defaultHexByteMap,
					updatedByteMaps: (context: EncodingContext) => context.byteMaps.slice(0, context.byteIndex + 1),
				}),
				generateByteMaps: assign({
					byteMaps: (context: EncodingContext) => {
						if (isTextEncoding(context.input.inputEncoding)) {
							return context.output.utf8?.hexMap ?? [];
						} else {
							return context.input.chunks?.map((chunk) => chunk.inputMap.map((map) => map)).flat() ?? [];
						}
					},
					updatedByteMaps: (_) => [],
				}),
				resetRemainingBytes: assign({
					byteIndex: (_) => 0,
					updatedByteMaps: (_) => [],
					currentByte: (_) => defaultHexByteMap,
					remainingBytes: (context: EncodingContext) => context.byteMaps.length - 1,
				}),
				resetNoBytesRemaining: assign({
					byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
					remainingBytes: (_) => 0,
				}),
				mapNextByte: assign({
					byteIndex: (context: EncodingContext) => context.byteIndex + 1,
					remainingBytes: (context: EncodingContext) => context.remainingBytes - 1,
				}),
				mapPreviousByte: assign({
					byteIndex: (context: EncodingContext) => context.byteIndex - 1,
					remainingBytes: (context: EncodingContext) => context.remainingBytes + 1,
				}),
				getCurrentInputChunk: assign({
					currentInputChunk: (context: EncodingContext) =>
						context.input.chunks?.[context.inputChunkIndex] ?? defaultEncoderInputChunk,
					updatedInputChunks: (context: EncodingContext) =>
						context.input.chunks?.slice(0, context.inputChunkIndex + 1) ?? [],
				}),
				resetRemainingInputChunks: assign({
					updatedInputChunks: (_) => [],
					inputChunkIndex: (_) => 0,
					currentInputChunk: (_) => defaultEncoderInputChunk,
					remainingInputChunks: (context: EncodingContext) =>
						context.input.totalChunks ? context.input.totalChunks - 1 : 0,
				}),
				resetNoInputChunksRemaining: assign({
					inputChunkIndex: (context: EncodingContext) =>
						context.input.totalChunks ? context.input.totalChunks - 1 : 0,
					remainingInputChunks: (_) => 0,
				}),
				mapNextInputChunk: assign({
					inputChunkIndex: (context: EncodingContext) => context.inputChunkIndex + 1,
					remainingInputChunks: (context: EncodingContext) => context.remainingInputChunks - 1,
				}),
				mapPreviousInputChunk: assign({
					inputChunkIndex: (context: EncodingContext) => context.inputChunkIndex - 1,
					remainingInputChunks: (context: EncodingContext) => context.remainingInputChunks + 1,
				}),
				getCurrentOutputChunk: assign({
					currentOutputChunk: (context: EncodingContext) =>
						context.output.chunks?.[context.outputChunkIndex] ?? defaultOutputChunk,
					updatedOutputChunks: (context: EncodingContext) =>
						context.output.chunks.slice(0, context.outputChunkIndex + 1),
				}),
				resetRemainingOutputChunks: assign({
					updatedOutputChunks: (_) => [],
					outputChunkIndex: (_) => 0,
					currentOutputChunk: (_) => defaultOutputChunk,
					remainingOutputChunks: (context: EncodingContext) =>
						context.input.totalChunks ? context.input.totalChunks - 1 : 0,
				}),
				resetNoOutputChunksRemaining: assign({
					outputChunkIndex: (context: EncodingContext) =>
						context.input.totalChunks ? context.input.totalChunks - 1 : 0,
					remainingOutputChunks: (_) => 0,
				}),
				mapNextOutputChunk: assign({
					outputChunkIndex: (context: EncodingContext) => context.outputChunkIndex + 1,
					remainingOutputChunks: (context: EncodingContext) => context.remainingOutputChunks - 1,
				}),
				mapPreviousOutputChunk: assign({
					outputChunkIndex: (context: EncodingContext) => context.outputChunkIndex - 1,
					remainingOutputChunks: (context: EncodingContext) => context.remainingOutputChunks + 1,
				}),
				getCurrentBase64Char: assign({
					currentBase64Char: (context: EncodingContext) =>
						context.base64Maps?.[context.base64CharIndex] ?? defaultBase64ByteMap,
					updatedBase64Maps: (context: EncodingContext) => context.base64Maps.slice(0, context.base64CharIndex + 1),
				}),
				generateBase64Maps: assign({
					base64Maps: (context: EncodingContext) =>
						context.output.chunks.map((chunk) => chunk.base64Map.map((map) => map)).flat(),
					updatedBase64Maps: (_) => [],
				}),
				resetRemainingBase64Chars: assign({
					base64CharIndex: (_) => 0,
					updatedBase64Maps: (_) => [],
					currentBase64Char: (_) => defaultBase64ByteMap,
					remainingBase64Chars: (context: EncodingContext) => context.base64Maps.length - 1,
				}),
				resetNoBase64CharsRemaining: assign({
					base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
					remainingBase64Chars: (_) => 0,
				}),
				mapNextBase64Char: assign({
					base64CharIndex: (context: EncodingContext) => context.base64CharIndex + 1,
					remainingBase64Chars: (context: EncodingContext) => context.remainingBase64Chars - 1,
				}),
				mapPreviousBase64Char: assign({
					base64CharIndex: (context: EncodingContext) => context.base64CharIndex - 1,
					remainingBase64Chars: (context: EncodingContext) => context.remainingBase64Chars + 1,
				}),
				updateContextForLastStep: assign({
					updatedByteMaps: (context: EncodingContext) => context.byteMaps.slice(0),
					updatedInputChunks: (context: EncodingContext) => context.input.chunks?.slice(0) ?? [],
					updatedOutputChunks: (context: EncodingContext) => context.output.chunks.slice(0),
					updatedBase64Maps: (context: EncodingContext) => context.base64Maps.slice(0),
					byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
					inputChunkIndex: (context: EncodingContext) => (context.input.chunks ? context.input.chunks.length - 1 : 0),
					outputChunkIndex: (context: EncodingContext) => context.output.chunks.length - 1,
					base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
					currentByte: (context: EncodingContext) => context.byteMaps[context.byteMaps.length - 1] ?? defaultHexByteMap,
					currentInputChunk: (context: EncodingContext) =>
						context.input.chunks?.[context.input.chunks.length - 1] ?? defaultEncoderInputChunk,
					currentOutputChunk: (context: EncodingContext) =>
						context.output.chunks?.[context.output.chunks.length - 1] ?? defaultOutputChunk,
					currentBase64Char: (context: EncodingContext) =>
						context.base64Maps[context.base64Maps.length - 1] ?? defaultBase64ByteMap,
					remainingInputChunks: (_) => 0,
				}),
			},
			guards: {
				defaultSettingsChanged: (context: EncodingContext) =>
					context.input.inputText !== '' ||
					context.input.inputEncoding !== 'ascii' ||
					context.input.outputEncoding !== 'base64',
				formResetRequested: (context: EncodingContext) => context.resetForm,
				autoPlayEnabled: (context: EncodingContext) => context.autoplay,
				autoPlayDisabled: (context: EncodingContext) => !context.autoplay,
				yesSkipDemo: (context: EncodingContext) => context.skipDemo,
				inputTextIsInvalid: (context: EncodingContext) => !context.input.validationResult.success,
				bytesRemaining: (context: EncodingContext) => context.remainingBytes > 0,
				noBytesRemaining: (context: EncodingContext) => context.remainingBytes === 0,
				allBytesRemaining: (context: EncodingContext) => context.remainingBytes + 1 === context.byteMaps.length,
				hasPreviousByte: (context: EncodingContext) => context.byteIndex > 0,
				inputChunksRemaining: (context: EncodingContext) =>
					context.input.lastChunkPadded ? context.remainingInputChunks > 1 : context.remainingInputChunks > 0,
				lastChunkIsPadded: (context: EncodingContext) => (!context.autoplay && context.input.lastChunkPadded) || false,
				finalPaddedInputChunkRemaining: (context: EncodingContext) =>
					(context.remainingInputChunks === 1 && context.input.lastChunkPadded) || false,
				onlyOnePaddedChunk: (context: EncodingContext) =>
					(context.input.totalChunks === 1 && context.input.lastChunkPadded) || false,
				noInputChunksRemaining: (context: EncodingContext) => context.remainingInputChunks === 0,
				allInputChunksRemaining: (context: EncodingContext) =>
					context.remainingInputChunks + 1 === context.input.totalChunks,
				currentInputChunkIsPadded: (context: EncodingContext) =>
					!context.autoplay && context.currentInputChunk.bytes.length !== 3,
				hasPreviousInputChunk: (context: EncodingContext) => !context.autoplay && context.inputChunkIndex > 0,
				outputChunksRemaining: (context: EncodingContext) =>
					context.input.lastChunkPadded ? context.remainingOutputChunks > 1 : context.remainingOutputChunks > 0,
				finalPaddedOutputChunkRemaining: (context: EncodingContext) =>
					(context.remainingOutputChunks === 1 && context.input.lastChunkPadded) || false,
				noOutputChunksRemaining: (context: EncodingContext) => context.remainingOutputChunks === 0,
				allOutputChunksRemaining: (context: EncodingContext) =>
					!context.autoplay && context.remainingOutputChunks + 1 === context.input.totalChunks,
				currentOutputChunkIsPadded: (context: EncodingContext) =>
					!context.autoplay && context.currentOutputChunk.bytes.length !== 3,
				hasPreviousOutputChunk: (context: EncodingContext) => !context.autoplay && context.outputChunkIndex > 0,
				base64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars > 0,
				noBase64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars === 0,
				allBase64CharsRemaining: (context: EncodingContext) =>
					context.remainingBase64Chars + 1 === context.base64Maps.length,
				hasPreviousBase64Char: (context: EncodingContext) => context.base64CharIndex > 0,
			},
		},
	);
