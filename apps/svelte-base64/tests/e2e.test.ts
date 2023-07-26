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
	let pageTester: AlgoDemoTester | null;

	beforeAll(async () => {
		server = await preview({ preview: { port: 4500 } });
	});

	beforeEach(async () => {
		browser = await chromium.launch({ headless: true });
		page = await browser.newPage();
		pageTester = new AlgoDemoTester(page);
	});

	afterEach(async () => {
		pageTester = null;
		await page.close();
		await browser.close();
	});

	afterAll(async () => {
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()));
		});
	});

	test('encode ascii string, execute all steps manually', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('test');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		for await (const _ of Array.from({ length: 4 }, (_, i) => i)) {
			await pageTester.goToNextStep();
			await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });
		}

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		for await (const _ of Array.from({ length: 8 }, (_, i) => i)) {
			await pageTester.goToNextStep();
			await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });
		}

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	}, 60_000);

	test('encode ascii string, execute all steps with autoplay', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('test');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.startAutoplay();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'autoPlayEncodeByte' });
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'autoPlayIdle' });
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'autoPlayCreateInputChunk' });
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'autoPlayIdle' });
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'autoPlayCreateOutputChunk' });
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'autoPlayEncodeBase64' });
		await pageTester.verifyMachineState({ state: 'verifyResults', substate: '' });
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, skip demo', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('test');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, validation error', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.startAutoplay();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('do§');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('dog');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode ascii string, with symbol characters', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('test&^%#*&()');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode hex string, execute all steps manually', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('0d47bc37af');
		await pageTester.selectHexInputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode hex string, validation error', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('746573t');
		await pageTester.selectHexInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('74657');
		await pageTester.selectHexInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('74657374');
		await pageTester.selectHexInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, execute all steps manually', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('01110100011001010111001101110100');
		await pageTester.selectBinaryInputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, skip demo', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('01110100011001010111001101110100');
		await pageTester.selectBinaryInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode bin string, validation error', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('test');
		await pageTester.selectBinaryInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.startAutoplay();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('0101');
		await pageTester.selectBinaryInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'error' });
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('01110100011001010111001101110100');
		await pageTester.selectBinaryInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode utf8 string, execute all steps manually', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('🦦👨‍🌾🫥🏃🏿‍♀️☝🏾');
		await pageTester.selectUtf8InputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'idle' });

		for await (const _ of Array.from({ length: 43 }, (_, i) => i)) {
			await pageTester.goToNextStep();
			await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'encodeByte' });
		}

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeInput', substate: 'explainByteMapping' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'regularIdle' });

		for await (const _ of Array.from({ length: 14 }, (_, i) => i)) {
			await pageTester.goToNextStep();
			await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createInputChunk' });
		}

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createInputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'regularIdle' });

		for await (const _ of Array.from({ length: 14 }, (_, i) => i)) {
			await pageTester.goToNextStep();
			await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createOutputChunk' });
		}

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'explainPadCharacter' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'createOutputChunks', substate: 'createLastPaddedChunk' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'idle' });

		for await (const _ of Array.from({ length: 60 }, (_, i) => i)) {
			await pageTester.goToNextStep();
			await pageTester.verifyMachineState({ state: 'encodeOutput', substate: 'encodeBase64' });
		}

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'verifyResults', substate: '' });

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});

	test('encode multiple utf8 strings, mix of ascii and utf8', async () => {
		if (!pageTester) return;
		await pageTester.goto();

		await pageTester.changeInputText('🦦👨‍🌾🫥🏃🏿‍♀️☝🏾');
		await pageTester.selectUtf8InputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });

		await pageTester.goToFirstStep();
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('∑ßåœ ≈ ∆c');
		await pageTester.selectUtf8InputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });

		await pageTester.goToFirstStep();
		await pageTester.verifyMachineState({ state: 'inactive', substate: '' });

		await pageTester.changeInputText('日本語文字列');
		await pageTester.selectUtf8InputEncoding();
		await pageTester.selectBase64StandardOutputEncoding();

		await pageTester.goToNextStep();
		await pageTester.verifyMachineState({ state: 'validateInputText', substate: 'success' });

		await pageTester.goToLastStep();
		await pageTester.verifyMachineState({ state: 'finished', substate: '' });
	});
});
