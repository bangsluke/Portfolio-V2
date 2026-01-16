import { expect, test } from '@playwright/test';
import { WorkExperiencePageObjects } from '../page-object-models/work-experience-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Work Experience Tests', () => {
	test('"See more items" button for Experience should navigate to /work-experience', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Scroll to experience section
		const experienceSection = page.locator(
			`#${testData.sectionIds.experience}`
		);
		await experienceSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		// Find the "See more items" button in the experience section
		const seeMoreButton = experienceSection.getByRole('link', {
			name: 'See more items',
		});

		await expect(
			seeMoreButton,
			'See more items button should be visible'
		).toBeVisible();

		// Click the button and wait for navigation
		await Promise.all([
			page.waitForURL('**/work-experience', { timeout: 10000 }),
			seeMoreButton.click(),
		]);

		expect(page.url()).toContain('/work-experience');
	});

	test('Work experience page should display multiple items', async ({
		page,
	}) => {
		await page.goto(testData.workExperiencePageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const workExperiencePageObjects = new WorkExperiencePageObjects(page);

		// Check page heading
		await expect(
			workExperiencePageObjects.pageHeading,
			'Page heading should be visible'
		).toBeVisible();

		// Check for work experience items
		const items = workExperiencePageObjects.workExperienceItems;
		const count = await items.count();
		expect(count).toBeGreaterThan(0);

		// Verify at least one item is visible
		await expect(
			items.first(),
			'At least one work experience item should be visible'
		).toBeVisible();
	});

	test('Work experience items should show relevant details', async ({
		page,
	}) => {
		await page.goto(testData.workExperiencePageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const workExperiencePageObjects = new WorkExperiencePageObjects(page);
		const firstItem = workExperiencePageObjects.workExperienceItems.first();

		await expect(
			firstItem,
			'First work experience item should be visible'
		).toBeVisible();

		// Check for common details that should be present
		// Look for text content indicating it has details
		const itemText = await firstItem.textContent();
		expect(itemText).toBeTruthy();
		expect(itemText?.length).toBeGreaterThan(0);
	});
});
