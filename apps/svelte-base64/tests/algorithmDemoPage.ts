import { expect, type Locator, type Page } from '@playwright/test';

export type MachineState = { state: string; substate: string };

export class AlgorithmDemoPage {
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
		await expect(this.demoTextElement).toHaveAttribute('data-state', state, { timeout: 15000 });
		const expectedSubstate = substate != '' ? substate : 'none';
		await expect(this.demoTextElement).toHaveAttribute('data-sub-state', expectedSubstate, { timeout: 15000 });
	}
}
