/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';
import type { PreviewServer } from 'vite';
import { preview } from 'vite';
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from 'vitest';
import { AlgorithmDemoPage } from './algorithmDemoPage';

// eslint-disable-next-line @typescript-eslint/require-await
describe('verify encoding process using ascii-encoded strings', async () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;
	let algorithmDemoPage: AlgorithmDemoPage | null;

	beforeAll(async () => {
		server = await preview({ preview: { port: 4500 } });
	});

	beforeEach(async () => {
		browser = await chromium.launch({ headless: true });
		page = await browser.newPage();
		algorithmDemoPage = new AlgorithmDemoPage(page);
	});

	afterEach(async () => {
		algorithmDemoPage = null;
		await page.close();
		await browser.close();
	});

	afterAll(async () => {
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()));
		});
	});

	test('encode ascii string, execute all steps manually', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('test');
		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		for await (const _ of Array.from({ length: 4 }, (_, i) => i)) {
			await algorithmDemoPage.goToNextStep();
			await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });
		}

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		for await (const _ of Array.from({ length: 8 }, (_, i) => i)) {
			await algorithmDemoPage.goToNextStep();
			await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });
		}

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'verifyResults', substate: '' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	}, 60_000);

	test('encode ascii string, execute all steps with autoplay', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('test');
		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.startAutoplay();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'idle' });
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'autoPlayEncodeByte' });
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'autoPlayIdle' });
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'autoPlayCreateInputChunk' });
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'autoPlayIdle' });
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'autoPlayCreateOutputChunk' });
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await algorithmDemoPage.verifyMachineState({ state: 'verifyResults', substate: '' });
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, skip demo', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('test');
		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, validation error', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.startAutoplay();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('do§');
		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('dog');
		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, with symbol characters', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('test&^%#*&()');
		await algorithmDemoPage.selectAsciiInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode hex string, execute all steps manually', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('0d47bc37af');
		await algorithmDemoPage.selectHexInputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'verifyResults', substate: '' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode hex string, validation error', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('746573t');
		await algorithmDemoPage.selectHexInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('74657');
		await algorithmDemoPage.selectHexInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('74657374');
		await algorithmDemoPage.selectHexInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, execute all steps manually', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('01110100011001010111001101110100');
		await algorithmDemoPage.selectBinaryInputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'verifyResults', substate: '' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, skip demo', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('01110100011001010111001101110100');
		await algorithmDemoPage.selectBinaryInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, validation error', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('test');
		await algorithmDemoPage.selectBinaryInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.startAutoplay();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('0101');
		await algorithmDemoPage.selectBinaryInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('01110100011001010111001101110100');
		await algorithmDemoPage.selectBinaryInputEncoding();
		await algorithmDemoPage.selectBase64UrlOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode utf8 string, execute all steps manually', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('🦦👨‍🌾🫥🏃🏿‍♀️☝🏾');
		await algorithmDemoPage.selectUtf8InputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		for await (const _ of Array.from({ length: 43 }, (_, i) => i)) {
			await algorithmDemoPage.goToNextStep();
			await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });
		}

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		for await (const _ of Array.from({ length: 14 }, (_, i) => i)) {
			await algorithmDemoPage.goToNextStep();
			await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });
		}

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		for await (const _ of Array.from({ length: 14 }, (_, i) => i)) {
			await algorithmDemoPage.goToNextStep();
			await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });
		}

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		for await (const _ of Array.from({ length: 60 }, (_, i) => i)) {
			await algorithmDemoPage.goToNextStep();
			await algorithmDemoPage.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });
		}

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'verifyResults', substate: '' });

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode multiple utf8 strings, mix of ascii and utf8', async () => {
		if (!algorithmDemoPage) return;
		await algorithmDemoPage.goto();

		await algorithmDemoPage.changeInputText('🦦👨‍🌾🫥🏃🏿‍♀️☝🏾');
		await algorithmDemoPage.selectUtf8InputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });

		await algorithmDemoPage.goToFirstStep();
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('∑ßåœ ≈ ∆c');
		await algorithmDemoPage.selectUtf8InputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });

		await algorithmDemoPage.goToFirstStep();
		await algorithmDemoPage.verifyMachineState({ state: 'inactive', substate: '' });

		await algorithmDemoPage.changeInputText('日本語文字列');
		await algorithmDemoPage.selectUtf8InputEncoding();
		await algorithmDemoPage.selectBase64StandardOutputEncoding();

		await algorithmDemoPage.goToNextStep();
		await algorithmDemoPage.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await algorithmDemoPage.goToLastStep();
		await algorithmDemoPage.verifyMachineState({ state: 'finished', substate: '' });
	});
});
