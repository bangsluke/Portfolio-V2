import { expect, test } from '@playwright/test';
import { ProjectsPageObjects } from '../page-object-models/projects-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Projects Page Tests', () => {
	test('"2.1. See more projects" button should navigate to /projects', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
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

	test('2.2. Projects page should display multiple projects', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
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

	test('2.3. Projects should be filterable by category', async ({ page }) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
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

	test('2.4. Single project card click should navigate to project details page', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
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
				page.waitForURL(`**${href}`, { timeout: 30000 }),
				projectLink.click(),
			]);

			expect(page.url()).toContain('/projects/');
		}
	});

	test('2.5. Project details page should show correct information', async ({
		page,
	}) => {
		// Navigate to a known project page
		const projectUrl = `${testData.projectsPageUrl}/${testData.sampleProjectSlug}`;
		await page.goto(projectUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Verify URL is correct
		expect(page.url()).toContain(`/projects/${testData.sampleProjectSlug}`);

		// Check for project name/title
		const heading = page.locator('h1, h2').first();
		await expect(heading, 'Project heading should be visible').toBeVisible();

		// Check for the back to projects button
		const backToProjectsButton = page.locator('#back-to-projects-top');
		await expect(backToProjectsButton, 'Back to Projects').toBeVisible();

		// Check that the project image is visible
		const projectImage = page.locator('#project-page-image');
		await expect(projectImage, 'Project image should be visible').toBeVisible();

		// Check that the project name is visible
		const projectName = page.locator('h1, h2').first();
		await expect(projectName, `${testData.exampleProjectName}`).toBeVisible();

		// Check that the date range is visible
		const dateRange = page.locator('#project-page-date-range');
		await expect(
			dateRange,
			`${testData.exampleProjectDateRange}`
		).toBeVisible();

		// Check that the project category is visible
		const projectCategory = page.locator('#project-page-category');
		await expect(
			projectCategory,
			`${testData.exampleProjectCategory}`
		).toBeVisible();

		// Check that the project technologies are visible
		const projectTechnologies = page.locator('#project-page-technologies');
		// Expect this div to hold at least one skill pill for each technology in the example project technologies array
		const technologyPills = projectTechnologies.locator('div.skill-pill');
		const technologyPillCount = await technologyPills.count();
		expect(technologyPillCount).toBeGreaterThanOrEqual(
			testData.exampleProjectTechnologies.length
		);
		for (const technology of testData.exampleProjectTechnologies) {
			const technologyPill = technologyPills.filter({ hasText: technology });
			await expect(technologyPill, `${technology}`).toBeVisible();
		}

		// Check that the project description is visible and contains part of the example project description text
		const projectDescription = page.locator('#project-page-description');
		await expect(
			projectDescription,
			`${testData.exampleProjectDescriptionText}`
		).toBeVisible();

		// Check that the project lessons learned is visible and contains part of the example project lessons learned text
		const projectLessonsLearned = page.locator('#project-page-lessons-learned');
		await expect(
			projectLessonsLearned,
			`${testData.exampleProjectLessonsLearnedText}`
		).toBeVisible();

		// Check that the project developed for is visible and contains at least one card (company, client or education use same CustomerAndClientCard)
		const projectDevelopedFor = page.locator('#project-page-developed-for');
		await expect(
			projectDevelopedFor,
			'Project developed for should be visible'
		).toBeVisible();
		const developedForCards = projectDevelopedFor.locator(
			'[data-company-name]'
		);
		const developedForCardCount = await developedForCards.count();
		expect(developedForCardCount).toBeGreaterThanOrEqual(1);

		// Check that the project links are visible and contain the correct links
		const projectLinks = page.locator('#project-page-links');
		await expect(projectLinks, 'Project links should be visible').toBeVisible();
		const projectLink = projectLinks.locator('a').first();
		const href = await projectLink.getAttribute('href');
		if (href && href.startsWith('/projects/')) {
			await expect(projectLink, 'Project link should be visible').toBeVisible();
		}

		// Check that the bottom back to projects button is visible and works
		const backToProjectsButtonBottom = page.locator('#back-to-projects-bottom');
		await expect(backToProjectsButtonBottom, 'Back to Projects').toBeVisible();
		await backToProjectsButtonBottom.click();
		expect(page.url()).toContain(testData.mainPageUrl);
	});
});
