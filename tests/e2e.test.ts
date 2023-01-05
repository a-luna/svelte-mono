/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, type Locator } from '@playwright/test';
import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';
import type { PreviewServer } from 'vite';
import { preview } from 'vite';
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from 'vitest';

export type MachineState = { state: string; substate: string };

export class AlgoDemoTester {
	readonly page: Page;
	readonly inputTextBox: Locator;
	readonly stringEncodingMenu: Locator;
	readonly asciiEncodingMenuItem: Locator;
	readonly utf8EncodingMenuItem: Locator;
	readonly hexEncodingMenuItem: Locator;
	readonly binaryEncodingMenuItem: Locator;
	readonly base64EncodingMenu: Locator;
	readonly base64StandardEncodingMenuItem: Locator;
	readonly base64UrlEncodingMenuItem: Locator;
	readonly resetDemoButton: Locator;
	readonly startAutoplayButton: Locator;
	readonly stopAutoplayButton: Locator;
	readonly goToFirstStepButton: Locator;
	readonly goToPreviousStepButton: Locator;
	readonly goToNextStepButton: Locator;
	readonly goToLastStepButton: Locator;
	readonly demoTextElement: Locator;

	constructor(page: Page) {
		this.page = page;
		this.inputTextBox = page.locator('[data-testid="input-text"]');
		this.stringEncodingMenu = page.locator('[data-testid="select-string-encoding-open-list-button"]');
		this.asciiEncodingMenuItem = page.locator('[data-testid="select-string-encoding-option-1"]');
		this.utf8EncodingMenuItem = page.locator('[data-testid="select-string-encoding-option-2"]');
		this.hexEncodingMenuItem = page.locator('[data-testid="select-string-encoding-option-3"]');
		this.binaryEncodingMenuItem = page.locator('[data-testid="select-string-encoding-option-4"]');
		this.base64EncodingMenu = page.locator('[data-testid="select-base64-encoding-open-list-button"]');
		this.base64StandardEncodingMenuItem = page.locator('[data-testid="select-base64-encoding-option-1"]');
		this.base64UrlEncodingMenuItem = page.locator('[data-testid="select-base64-encoding-option-2"]');
		this.resetDemoButton = page.locator('[data-testid="reset-button"]');
		this.startAutoplayButton = page.locator('[data-testid="start-autoplay-button"]');
		this.stopAutoplayButton = page.locator('[data-testid="stop-autoplay-button"]');
		this.goToFirstStepButton = page.locator('[data-testid="first-step-button"]');
		this.goToPreviousStepButton = page.locator('[data-testid="previous-step-button"]');
		this.goToNextStepButton = page.locator('[data-testid="next-step-button"]');
		this.goToLastStepButton = page.locator('[data-testid="last-step-button"]');
		this.demoTextElement = page.locator('[data-testid="demo-text"]');
	}

	async goto() {
		await this.page.goto('http://localhost:4500');
	}

	async changeInputText(text: string) {
		await expect(this.inputTextBox).toBeVisible();
		await this.inputTextBox.fill('');
		await this.inputTextBox.fill(text);
	}

	async openInputEncodingMenu() {
		await expect(this.stringEncodingMenu).toBeVisible();
		await this.stringEncodingMenu.click();
	}

	async selectAsciiInputEncoding() {
		await this.openInputEncodingMenu();
		await expect(this.asciiEncodingMenuItem).toBeVisible();
		await this.asciiEncodingMenuItem.click();
	}

	async selectUtf8InputEncoding() {
		await this.openInputEncodingMenu();
		await expect(this.utf8EncodingMenuItem).toBeVisible();
		await this.utf8EncodingMenuItem.click();
	}

	async selectHexInputEncoding() {
		await this.openInputEncodingMenu();
		await expect(this.hexEncodingMenuItem).toBeVisible();
		await this.hexEncodingMenuItem.click();
	}

	async selectBinaryInputEncoding() {
		await this.openInputEncodingMenu();
		await expect(this.binaryEncodingMenuItem).toBeVisible();
		await this.binaryEncodingMenuItem.click();
	}

	async openOutputEncodingMenu() {
		await expect(this.base64EncodingMenu).toBeVisible();
		await this.base64EncodingMenu.click();
	}

	async selectBase64UrlOutputEncoding() {
		await this.openOutputEncodingMenu();
		await expect(this.base64UrlEncodingMenuItem).toBeVisible();
		await this.base64UrlEncodingMenuItem.click();
	}

	async selectBase64StandardOutputEncoding() {
		await this.openOutputEncodingMenu();
		await expect(this.base64StandardEncodingMenuItem).toBeVisible();
		await this.base64StandardEncodingMenuItem.click();
	}

	async resetDemo() {
		await expect(this.resetDemoButton).toBeVisible();
		await this.resetDemoButton.click();
	}

	async startAutoplay() {
		await expect(this.startAutoplayButton).toBeVisible();
		await this.startAutoplayButton.click();
	}

	async stopAutoplay() {
		await expect(this.stopAutoplayButton).toBeVisible();
		await this.stopAutoplayButton.click();
	}

	async goToFirstStep() {
		await expect(this.goToFirstStepButton).toBeVisible();
		await this.goToFirstStepButton.click();
	}

	async goToPreviousStep() {
		await expect(this.goToPreviousStepButton).toBeVisible();
		await this.goToPreviousStepButton.click();
	}

	async goToNextStep() {
		await expect(this.goToNextStepButton).toBeVisible();
		await this.goToNextStepButton.click();
	}

	async goToLastStep() {
		await expect(this.goToLastStepButton).toBeVisible();
		await this.goToLastStepButton.click();
	}

	async verifyMachineState(machineState: MachineState) {
		const { state, substate } = machineState;
		await expect(this.demoTextElement).toHaveAttribute('data-state', state, { timeout: 5000 });
		const expectedSubstate = substate != '' ? substate : 'none';
		await expect(this.demoTextElement).toHaveAttribute('data-sub-state', expectedSubstate, { timeout: 5000 });
	}
}

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
