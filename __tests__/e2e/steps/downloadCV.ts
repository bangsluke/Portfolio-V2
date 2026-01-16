import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { type Browser, chromium, expect, type Page } from '@playwright/test';

let page: Page;
let browser: Browser;

Before(async () => {
	browser = await chromium.launch({ headless: false });
	const context = await browser.newContext();
	page = await context.newPage();
});

After(async () => {
	await browser.close();
});

Given('the user is on the {string} page', async (url: string) => {
	await page.goto(url);
});

When('the user clicks the {string} button', async (buttonName: string) => {
	await page.getByRole('button', { name: buttonName }).click();
});

Then(
	'the user should be navigated to the {string} page',
	async (expectedUrl: string) => {
		await expect(page).toHaveURL(expectedUrl);
	}
);
