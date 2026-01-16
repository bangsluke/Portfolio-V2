import { expect, test } from '@playwright/test';
import { EducationPageObjects } from '../page-object-models/education-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Education Tests', () => {
	test('"See more items" button for Education should navigate to /education', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Scroll to education section
		const educationSection = page.locator(`#${testData.sectionIds.education}`);
		await educationSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		// Find the "See more items" button in the education section
		const seeMoreButton = educationSection.getByRole('link', {
			name: 'See more items',
		});

		await expect(
			seeMoreButton,
			'See more items button should be visible'
		).toBeVisible();

		// Click the button and wait for navigation
		await Promise.all([
			page.waitForURL('**/education', { timeout: 10000 }),
			seeMoreButton.click(),
		]);

		expect(page.url()).toContain('/education');
	});

	test('Education page should display multiple items', async ({ page }) => {
		await page.goto(testData.educationPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const educationPageObjects = new EducationPageObjects(page);

		// Check page heading
		await expect(
			educationPageObjects.pageHeading,
			'Page heading should be visible'
		).toBeVisible();

		// Check for education items
		const items = educationPageObjects.educationItems;
		const count = await items.count();
		expect(count).toBeGreaterThan(0);

		// Verify at least one item is visible
		await expect(
			items.first(),
			'At least one education item should be visible'
		).toBeVisible();
	});

	test('Education items should show relevant details', async ({ page }) => {
		await page.goto(testData.educationPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const educationPageObjects = new EducationPageObjects(page);
		const firstItem = educationPageObjects.educationItems.first();

		await expect(
			firstItem,
			'First education item should be visible'
		).toBeVisible();

		// Check for common details that should be present
		// Look for text content indicating it has details
		const itemText = await firstItem.textContent();
		expect(itemText).toBeTruthy();
		expect(itemText?.length).toBeGreaterThan(0);
	});
});
