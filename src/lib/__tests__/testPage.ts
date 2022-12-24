import { expect, type Locator, type Page } from '@playwright/test';

export class PageTester {
	readonly page: Page;
	readonly inputTextBox: Locator;
	readonly stringEncodingMenu: Locator;
	readonly asciiEncodingMenuItem: Locator;
	readonly base64EncodingMenu: Locator;
	readonly base64EncodingMenuItem: Locator;

	constructor(page: Page) {
		this.page = page;
		this.inputTextBox = page.locator('[data-testid="input-text"]');
		this.stringEncodingMenu = page.locator('[data-testid="select-string-encoding-open-list-button"]');
		this.asciiEncodingMenuItem = page.locator('[data-testid="select-string-encoding-option-1"]');
		this.base64EncodingMenu = page.locator('[data-testid="select-base64-encoding-open-list-button"]');
		this.base64EncodingMenuItem = page.locator('[data-testid="select-base64-encoding-option-2"]');
	}

	async goto() {
		await this.page.goto('http://localhost:4500');
	}

	async changeInputText(text: string) {
		await expect(this.inputTextBox).toBeVisible();
		await this.inputTextBox.type(text);
	}

	async selectAsciiInputEncoding() {
		await expect(this.stringEncodingMenu).toBeVisible();
		await this.stringEncodingMenu.click();

		await expect(this.asciiEncodingMenuItem).toBeVisible();
		await this.asciiEncodingMenuItem.click();
	}

	async selectBase64UrlOutputEncoding() {
		await expect(this.base64EncodingMenu).toBeVisible();
		await this.base64EncodingMenu.click();

		await expect(this.base64EncodingMenuItem).toBeVisible();
		await this.base64EncodingMenuItem.click();
	}
}
