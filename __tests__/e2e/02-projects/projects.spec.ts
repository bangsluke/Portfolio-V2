import { expect, test } from '@playwright/test';
import { ProjectsPageObjects } from '../page-object-models/projects-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Projects Page Tests', () => {
	test('"See more projects" button should navigate to /projects', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);
		await expect(projectsPageObjects.seeMoreProjectsButton).toBeVisible();

		// Click the button and wait for navigation
		await Promise.all([
			page.waitForNavigation({
				url: testData.projectsPageUrl,
				waitUntil: 'domcontentloaded',
			}),
			projectsPageObjects.seeMoreProjectsButton.click(),
		]);

		expect(page.url()).toContain(testData.projectsPageUrl);
	});

	test('Projects page should display multiple projects', async ({ page }) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);
		await expect(projectsPageObjects.projectsGrid).toBeVisible();

		// Wait for project cards to be visible
		const projectCards = projectsPageObjects.projectCards;
		const count = await projectCards.count();
		expect(count).toBeGreaterThan(0);

		// Verify at least one project card is visible
		await expect(projectCards.first()).toBeVisible();
	});

	test('Projects should be filterable by category', async ({ page }) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);

		// Get initial project count
		const initialCountText =
			await projectsPageObjects.projectCount.textContent();
		const initialCount = parseInt(initialCountText || '0', 10);

		// Check if category filter exists (may not exist if no categories)
		const categoryFilterExists = await projectsPageObjects.categoryFilter
			.isVisible()
			.catch(() => false);
		const categoryFilterMobileExists =
			await projectsPageObjects.categoryFilterMobile
				.isVisible()
				.catch(() => false);

		if (categoryFilterExists || categoryFilterMobileExists) {
			const filter = categoryFilterExists
				? projectsPageObjects.categoryFilter
				: projectsPageObjects.categoryFilterMobile;

			// Get available options
			const options = await filter.locator('option').all();
			if (options.length > 1) {
				// Select a category (skip the first "All Categories" option)
				const categoryValue = await options[1].getAttribute('value');
				if (categoryValue) {
					await filter.selectOption(categoryValue);
					await page.waitForTimeout(500); // Wait for filter to apply

					// Verify project count changed or stayed the same
					const filteredCountText =
						await projectsPageObjects.projectCount.textContent();
					const filteredCount = parseInt(filteredCountText || '0', 10);
					expect(filteredCount).toBeLessThanOrEqual(initialCount);
				}
			}
		}
	});

	test('Single project card click should navigate to project details page', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);

		// Get the first project card
		const firstProjectCard = await projectsPageObjects.getProjectCardByIndex(0);
		await expect(firstProjectCard).toBeVisible();

		// Find the link within the project card
		const projectLink = firstProjectCard.locator('a').first();
		const href = await projectLink.getAttribute('href');

		if (href && href.startsWith('/projects/')) {
			// Click the link and wait for navigation
			await Promise.all([
				page.waitForURL(`**${href}`, { timeout: 10000 }),
				projectLink.click(),
			]);

			expect(page.url()).toContain('/projects/');
		}
	});

	test('Project details page should show correct information', async ({
		page,
	}) => {
		// Navigate to a known project page
		const projectUrl = `${testData.projectsPageUrl}/${testData.sampleProjectSlug}`;
		await page.goto(projectUrl, {
			timeout: 10000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Verify URL is correct
		expect(page.url()).toContain(`/projects/${testData.sampleProjectSlug}`);

		// Check for project name/title
		const heading = page.locator('h1, h2').first();
		await expect(heading, 'Project heading should be visible').toBeVisible();

		// Check for project description or content
		const mainContent = page.locator('main, article, [role="main"]').first();
		await expect(
			mainContent,
			testData.exampleProjectDescriptionText
		).toBeVisible();
	});
});
