import { expect, test } from '@playwright/test';
import { HomePageObjects } from '../page-object-models/home-page-object-models';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Home Page Tests', () => {
	// Before each test, navigate to the home page and wait for it to load
	test.beforeEach(async ({ page }) => {
		await page.goto('https://bangsluke-portfolio.netlify.app/', {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);
	});

	test('Home page should show "Contact Me" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButton).toBeVisible();
	});
});
