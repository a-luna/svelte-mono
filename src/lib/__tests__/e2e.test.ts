import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';
import type { PreviewServer } from 'vite';
import { preview } from 'vite';
import { afterAll, beforeAll, describe, test } from 'vitest';
import { PageTester } from './testPage';

describe('basic', () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		server = await preview({ preview: { port: 4500 } });
		browser = await chromium.launch();
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()));
		});
	});

	test('smoke test', async () => {
		const pageTester = new PageTester(page);
		await pageTester.goto();
		await pageTester.changeInputText('test');
		await pageTester.selectAsciiInputEncoding();
		await pageTester.selectBase64UrlOutputEncoding();
	}, 60_000);
});
