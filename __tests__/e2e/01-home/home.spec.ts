import { expect, test } from '@playwright/test';
import { HomePageObjects } from '../page-object-models/home-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Home Page Tests', () => {
	// Before each test, navigate to the home page and wait for it to load
	test.beforeEach(async ({ page }) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);
	});

	test('Home page should show "Contact Me" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButton).toBeVisible();
	});

	test('Home page should show "About Me" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.aboutMeButton).toBeVisible();
	});

	// Checks for several skills defined in the test data
	test('Home page should show each skill in the skills section', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);

		await homePageObjects.openSkillsTable();

		// Re-acquire the locator after table is opened
		const skillsTableSection = page.getByTestId('skills-table-view');

		for (const skill of testData.skills) {
			const skillTableItem = skillsTableSection.getByTestId(
				`skills-table-item-${skill}`
			);
			await expect(
				skillTableItem,
				`Skill table item missing for skill: ${skill}`
			).toBeVisible();
		}
	});

	test('Home page should show "Download CV" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.downloadCVButton).toBeVisible();
	});
});
