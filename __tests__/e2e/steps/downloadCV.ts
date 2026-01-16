// An example of a step file for the home page using Cucumber
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../utils/browserSetup.ts';

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
