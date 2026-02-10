import { expect, test } from '@playwright/test';
import { EducationPageObjects } from '../page-object-models/education-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Education Tests', () => {
	test('4.1."See more items" button for Education should navigate to /education', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
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
			page.waitForURL('**/education', { timeout: 30000 }),
			seeMoreButton.click(),
		]);

		expect(page.url()).toContain('/education');
	});

	test('4.2. Education page should display multiple items', async ({
		page,
	}) => {
		await page.goto(testData.educationPageUrl, {
			timeout: 30000,
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

	test('4.3. Education items should show relevant details', async ({
		page,
	}) => {
		await page.goto(testData.educationPageUrl, {
			timeout: 30000,
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

	test('4.4. Education timeline items should be ordered from newest to oldest', async ({
		page,
	}) => {
		await page.goto(testData.educationPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const educationPageObjects = new EducationPageObjects(page);
		const items = educationPageObjects.educationItems;

		const maxItemsToCheck = Math.min(await items.count(), 3);
		const dateRanges: string[] = [];

		for (let i = 0; i < maxItemsToCheck; i++) {
			const item = items.nth(i);
			const timeElement = item.locator('time');
			const timeText = (await timeElement.textContent())?.trim() || '';
			dateRanges.push(timeText);
		}

		// Parse dates and ensure they are not increasing (newest first)
		const parsedStartDates = dateRanges.map(range => {
			const [startStr] = range.split('-').map(p => p.trim());
			return startStr || '';
		});

		for (let i = 1; i < parsedStartDates.length; i++) {
			const prev = parsedStartDates[i - 1];
			const curr = parsedStartDates[i];
			if (!prev || !curr) continue;

			const prevDate = new Date(prev);
			const currDate = new Date(curr);

			if (!isNaN(prevDate.getTime()) && !isNaN(currDate.getTime())) {
				expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime());
			}
		}
	});

	test('4.5. Back to Portfolio links on education page should return to home', async ({
		page,
	}) => {
		await page.goto(testData.educationPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Top back link
		const topBackLink = page.getByRole('link', { name: 'Back to Portfolio' }).first();
		await expect(topBackLink).toBeVisible();
		await topBackLink.click();
		await expect(page).toHaveURL(testData.mainPageUrl);

		// Navigate again for bottom link
		await page.goto(testData.educationPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const bottomBackLink = page.getByRole('link', { name: 'Back to Portfolio' }).last();
		await expect(bottomBackLink).toBeVisible();
		await bottomBackLink.click();
		await expect(page).toHaveURL(testData.mainPageUrl);
	});
});
