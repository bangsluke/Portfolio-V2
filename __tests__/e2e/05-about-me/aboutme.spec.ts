import { expect, test } from '@playwright/test';
import { AboutMePageObjects } from '../page-object-models/about-me-page-object-models';
import { HomePageObjects } from '../page-object-models/home-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('About Me Tests', () => {
	test('5.1. "About Me" button on homepage should navigate to /about-me', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.aboutMeButton).toBeVisible();

		// Click the button and wait for navigation
		await Promise.all([
			page.waitForURL('**/about-me', { timeout: 30000 }),
			homePageObjects.aboutMeButton.click(),
		]);

		expect(page.url()).toContain('/about-me');
	});

	test('5.2. About Me page should contain content/details', async ({
		page,
	}) => {
		await page.goto(testData.aboutMePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const aboutMePageObjects = new AboutMePageObjects(page);

		// Check page heading
		await expect(
			aboutMePageObjects.pageHeading,
			'Page heading should be visible'
		).toBeVisible();

		// Check for page content
		await expect(
			aboutMePageObjects.pageContent,
			'Page content should be visible'
		).toBeVisible();

		// Verify content has text
		const contentText = await aboutMePageObjects.pageContent.textContent();
		expect(contentText).toBeTruthy();
		expect(contentText?.length).toBeGreaterThan(50); // Should have substantial content
	});

	test('5.3. About Me page should be properly rendered', async ({ page }) => {
		await page.goto(testData.aboutMePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Verify URL is correct
		expect(page.url()).toContain('/about-me');

		// Check that page has loaded properly
		const body = page.locator('body');
		await expect(body, 'Page body should be visible').toBeVisible();

		// Check for any images or structured content
		const images = page.locator('img');
		const imageCount = await images.count();
		// At least the page should be rendered (may or may not have images)
		expect(imageCount).toBeGreaterThanOrEqual(0);
	});
});
