import { expect, test } from '@playwright/test';
import { WorkExperiencePageObjects } from '../page-object-models/work-experience-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Work Experience Tests', () => {
	test('3.1. "See more items" button for Experience should navigate to /work-experience', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
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
			page.waitForURL('**/work-experience', { timeout: 30000 }),
			seeMoreButton.click(),
		]);

		expect(page.url()).toContain('/work-experience');
	});

	test('3.2. Work experience page should display multiple items', async ({
		page,
	}) => {
		await page.goto(testData.workExperiencePageUrl, {
			timeout: 30000,
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

	test('3.3. Work experience items should show relevant details', async ({
		page,
	}) => {
		await page.goto(testData.workExperiencePageUrl, {
			timeout: 30000,
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

	test('3.4. Voluntary roles section should be visible and contain items when present', async ({
		page,
	}) => {
		await page.goto(testData.workExperiencePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const voluntarySection = page.locator('#voluntary-roles');

		// If there are no voluntary roles configured, do not assert further
		if (await voluntarySection.count() === 0) {
			return;
		}

		await expect(voluntarySection).toBeVisible();

		// "View Voluntary Roles" link should scroll to the voluntary section
		const viewVoluntaryLink = page.getByRole('link', {
			name: 'View Voluntary Roles',
		});
		await expect(viewVoluntaryLink).toBeVisible();

		await viewVoluntaryLink.click();
		await page.waitForTimeout(500);

		const boundingBox = await voluntarySection.boundingBox();
		expect(boundingBox).not.toBeNull();

		// Section should contain at least one article
		const voluntaryItems = voluntarySection.locator('article[role="article"], article');
		const voluntaryCount = await voluntaryItems.count();
		expect(voluntaryCount).toBeGreaterThan(0);
	});

	test('3.5. Back to Portfolio links on work experience page should return to home', async ({
		page,
	}) => {
		await page.goto(testData.workExperiencePageUrl, {
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
		await page.goto(testData.workExperiencePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Bottom back link (last occurrence)
		const bottomBackLink = page.getByRole('link', { name: 'Back to Portfolio' }).last();
		await expect(bottomBackLink).toBeVisible();
		await bottomBackLink.click();
		await expect(page).toHaveURL(testData.mainPageUrl);
	});
});
