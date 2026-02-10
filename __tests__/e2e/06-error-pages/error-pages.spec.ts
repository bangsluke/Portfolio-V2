import { expect, test } from '@playwright/test';
import { testData } from '../utils/testData';

test.describe('Error Pages', () => {
	test('6.1. 404 page should render and link back to site', async ({ page }) => {
		await page.goto(`${testData.mainPageUrl}/this-page-does-not-exist`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});

		const heading = page.getByRole('heading', { name: '404 Error...' });
		await expect(heading).toBeVisible();

		const backLink = page.getByRole('link', { name: 'Back to Site' });
		await expect(backLink).toBeVisible();
		await backLink.click();

		await expect(page).toHaveURL(testData.mainPageUrl);
	});

	test('6.2. 500 page should render generic message and link back to site', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/500`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});

		const heading = page.getByRole('heading', { name: '500 Error...' });
		await expect(heading).toBeVisible();

		const backLink = page.getByRole('link', { name: 'Back to Site' });
		await expect(backLink).toBeVisible();
		await backLink.click();

		await expect(page).toHaveURL(testData.mainPageUrl);
	});
});

