/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';
import type { PreviewServer } from 'vite';
import { preview } from 'vite';
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from 'vitest';
import { AlgoDemoTester } from './algoDemoTester';

// eslint-disable-next-line @typescript-eslint/require-await
describe('verify encoding process using ascii-encoded strings', async () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		server = await preview({ preview: { port: 4500 } });
	});

	beforeEach(async () => {
		browser = await chromium.launch({ headless: true });
		page = await browser.newPage();
	});

	afterEach(async () => {
		await page.close();
		await browser.close();
	});

	afterAll(async () => {
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()));
		});
	});

	test('encode ascii string, execute all steps manually', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('test');
		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		for await (const _ of Array.from({ length: 4 }, (_, i) => i)) {
			await demoTester.goToNextStep();
			await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });
		}

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		for await (const _ of Array.from({ length: 8 }, (_, i) => i)) {
			await demoTester.goToNextStep();
			await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });
		}

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	}, 60_000);

	test.skip('encode ascii string, execute all steps with autoplay', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('test');
		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.startAutoplay();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'autoPlayEncodeByte' });
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'autoPlayEncodeByte' });
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'autoPlayEncodeByte' });
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'autoPlayEncodeByte' });
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'autoPlayIdle' });
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'autoPlayCreateInputChunk' });
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'autoPlayIdle' });
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'autoPlayCreateOutputChunk' });
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await demoTester.verifyMachineState({ state: 'verifyResults', substate: '' });
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, skip demo', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('test');
		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, validation error', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.startAutoplay();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('do§');
		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('dog');
		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, with symbol characters', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('test&^%#*&()');
		await demoTester.selectAsciiInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode hex string, execute all steps manually', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('0d47bc37af');
		await demoTester.selectHexInputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode hex string, validation error', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('746573t');
		await demoTester.selectHexInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('74657');
		await demoTester.selectHexInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('74657374');
		await demoTester.selectHexInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, execute all steps manually', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('01110100011001010111001101110100');
		await demoTester.selectBinaryInputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, skip demo', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('01110100011001010111001101110100');
		await demoTester.selectBinaryInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, validation error', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('test');
		await demoTester.selectBinaryInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.startAutoplay();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('0101');
		await demoTester.selectBinaryInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('01110100011001010111001101110100');
		await demoTester.selectBinaryInputEncoding();
		await demoTester.selectBase64UrlOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode utf8 string, execute all steps manually', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('🦦👨‍🌾🫥🏃🏿‍♀️☝🏾');
		await demoTester.selectUtf8InputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		for await (const _ of Array.from({ length: 43 }, (_, i) => i)) {
			await demoTester.goToNextStep();
			await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });
		}

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		for await (const _ of Array.from({ length: 14 }, (_, i) => i)) {
			await demoTester.goToNextStep();
			await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });
		}

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		for await (const _ of Array.from({ length: 14 }, (_, i) => i)) {
			await demoTester.goToNextStep();
			await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });
		}

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		for await (const _ of Array.from({ length: 60 }, (_, i) => i)) {
			await demoTester.goToNextStep();
			await demoTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });
		}

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode multiple utf8 strings, mix of ascii and utf8', async () => {
		const demoTester = new AlgoDemoTester(page);
		await demoTester.goto();

		await demoTester.changeInputText('🦦👨‍🌾🫥🏃🏿‍♀️☝🏾');
		await demoTester.selectUtf8InputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });

		await demoTester.goToFirstStep();
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('∑ßåœ ≈ ∆c');
		await demoTester.selectUtf8InputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });

		await demoTester.goToFirstStep();
		await demoTester.verifyMachineState({ state: 'inactive', substate: '' });

		await demoTester.changeInputText('日本語文字列');
		await demoTester.selectUtf8InputEncoding();
		await demoTester.selectBase64StandardOutputEncoding();

		await demoTester.goToNextStep();
		await demoTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await demoTester.goToLastStep();
		await demoTester.verifyMachineState({ state: 'finished', substate: '' });
	});
});
