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

		await page.locator(`#${testData.sectionIds.projects}`).scrollIntoViewIfNeeded();
		await page.waitForTimeout(200);

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

	test('2.3.1. Category filter should only show projects from the selected category', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);

		// Determine which category filter is visible (desktop vs mobile)
		const desktopFilterVisible = await projectsPageObjects.categoryFilter
			.isVisible()
			.catch(() => false);
		const mobileFilterVisible = await projectsPageObjects.categoryFilterMobile
			.isVisible()
			.catch(() => false);

		if (!desktopFilterVisible && !mobileFilterVisible) {
			test.skip();
		}

		const filter = desktopFilterVisible
			? projectsPageObjects.categoryFilter
			: projectsPageObjects.categoryFilterMobile;

		// Choose a concrete category option (skip "All Categories")
		const options = await filter.locator('option').all();
		if (options.length <= 1) {
			test.skip();
		}

		const categoryValue = await options[1].getAttribute('value');
		expect(categoryValue).toBeTruthy();

		await filter.selectOption(categoryValue!);
		await page.waitForTimeout(500);

		// All visible cards should match the selected category
		const allMatchSelectedCategory = await page.evaluate(
			selectedCategory => {
				const wrappers = Array.from(
					document.querySelectorAll<HTMLElement>('#projectsGrid > div')
				);

				let visibleCount = 0;
				for (const el of wrappers) {
					const style = window.getComputedStyle(el);
					if (style.display === 'none' || style.visibility === 'hidden') {
						continue;
					}
					visibleCount++;
					if (selectedCategory && el.dataset.category !== selectedCategory) {
						return { allMatch: false, visibleCount };
					}
				}
				return { allMatch: true, visibleCount };
			},
			categoryValue
		);

		expect(allMatchSelectedCategory.allMatch).toBeTruthy();

		// Project count text should match number of visible cards
		const countLocator = desktopFilterVisible
			? projectsPageObjects.projectCount
			: page.locator('#projectCountMobile');
		const countText = await countLocator.textContent();
		const parsedCount = parseInt(countText || '0', 10);
		expect(parsedCount).toBe(allMatchSelectedCategory.visibleCount);
	});

	test('2.3.2. Project card tooltips should use dark description background in dark mode', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Ensure dark mode is enabled via the theme toggle if available
		const themeToggle = page.locator('#themeToggle');
		if (await themeToggle.isVisible().catch(() => false)) {
			const html = page.locator('html');
			const hasDarkClass = await html.evaluate(el =>
				el.classList.contains('dark')
			);
			if (!hasDarkClass) {
				await themeToggle.click();
			}
		}

		const projectsPageObjects = new ProjectsPageObjects(page);
		const firstProjectCard =
			await projectsPageObjects.getProjectCardByIndex(0);
		await expect(firstProjectCard).toBeVisible();

		// Hover the info icon to trigger the date range tooltip
		const infoButton = firstProjectCard.locator(
			'a[aria-label^="View details"]'
		);
		await infoButton.hover();

		const tooltip = page.locator('.global-tooltip').first();
		await expect(tooltip).toBeVisible();

		const bgColor = await tooltip.evaluate(element =>
			window.getComputedStyle(element).backgroundColor
		);
		// #18181B in rgb
		expect(bgColor).toBe('rgb(24, 24, 27)');
	});

	test('2.3.2. Date range filters should only show projects within selected range', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Choose a start and end date that are likely to be in range of existing projects
		const startDateValue = '2010-01-01';
		const endDateValue = '2100-12-31';

		await page.fill('#startDateInput', startDateValue);
		await page.fill('#endDateInput', endDateValue);
		await page.waitForTimeout(500);

		const { allMatch } = await page.evaluate(
			({ startDateValue, endDateValue }) => {
				const wrappers = Array.from(
					document.querySelectorAll<HTMLElement>('#projectsGrid > div')
				);
				const startDate = new Date(startDateValue);
				const endDate = new Date(endDateValue);

				for (const el of wrappers) {
					const style = window.getComputedStyle(el);
					if (style.display === 'none' || style.visibility === 'hidden') {
						continue;
					}

					const cardStart = el.dataset.startDate
						? new Date(el.dataset.startDate)
						: null;
					const cardEnd = el.dataset.endDate
						? new Date(el.dataset.endDate)
						: null;

					const projectStart =
						cardStart || cardEnd || new Date(0); // mirrors filter logic
					const projectEnd =
						cardEnd || cardStart || new Date(9999, 11, 31);

					const matches =
						projectStart <= endDate && projectEnd >= startDate;
					if (!matches) {
						return { allMatch: false };
					}
				}

				return { allMatch: true };
			},
			{ startDateValue, endDateValue }
		);

		expect(allMatch).toBeTruthy();
	});

	test('2.3.3. Clear filters should reset project visibility and counts', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);
		const totalWrappers = await projectsPageObjects.projectCards.count();

		// Apply a simple filter
		const desktopFilterVisible = await projectsPageObjects.categoryFilter
			.isVisible()
			.catch(() => false);
		const mobileFilterVisible = await projectsPageObjects.categoryFilterMobile
			.isVisible()
			.catch(() => false);

		const filter = desktopFilterVisible
			? projectsPageObjects.categoryFilter
			: projectsPageObjects.categoryFilterMobile;

		if (!desktopFilterVisible && !mobileFilterVisible) {
			test.skip();
		}

		const options = await filter.locator('option').all();
		if (options.length <= 1) {
			test.skip();
		}

		const categoryValue = await options[1].getAttribute('value');
		expect(categoryValue).toBeTruthy();

		await filter.selectOption(categoryValue!);
		await page.waitForTimeout(500);

		// Now clear filters
		const clearButtonDesktop = page.locator('#clearFilters');
		const clearButtonMobile = page.locator('#clearFiltersMobile');

		if (await clearButtonDesktop.isVisible().catch(() => false)) {
			await clearButtonDesktop.click();
		} else if (await clearButtonMobile.isVisible().catch(() => false)) {
			await clearButtonMobile.click();
		}

		await page.waitForTimeout(500);

		// All wrappers should be visible again
		const visibleCount = await page.evaluate(() => {
			const wrappers = Array.from(
				document.querySelectorAll<HTMLElement>('#projectsGrid > div')
			);
			return wrappers.filter(el => {
				const style = window.getComputedStyle(el);
				return style.display !== 'none' && style.visibility !== 'hidden';
			}).length;
		});

		expect(visibleCount).toBeGreaterThan(0);
		expect(visibleCount).toBeLessThanOrEqual(totalWrappers);

		// Project count should reflect visible wrappers
		const desktopCountText = await projectsPageObjects.projectCount
			.textContent()
			.catch(() => null);
		const mobileCountText = await page
			.locator('#projectCountMobile')
			.textContent()
			.catch(() => null);

		const parsedDesktop = desktopCountText
			? parseInt(desktopCountText, 10)
			: NaN;
		const parsedMobile = mobileCountText
			? parseInt(mobileCountText, 10)
			: NaN;

		if (!Number.isNaN(parsedDesktop)) {
			expect(parsedDesktop).toBe(visibleCount);
		}
		if (!Number.isNaN(parsedMobile)) {
			expect(parsedMobile).toBe(visibleCount);
		}
	});

	test('2.3.4. URL category parameter should pre-select filters and show matching projects', async ({
		page,
	}) => {
		// First, discover a valid category value
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);
		const desktopFilterVisible = await projectsPageObjects.categoryFilter
			.isVisible()
			.catch(() => false);
		const mobileFilterVisible = await projectsPageObjects.categoryFilterMobile
			.isVisible()
			.catch(() => false);

		if (!desktopFilterVisible && !mobileFilterVisible) {
			test.skip();
		}

		const initialFilter = desktopFilterVisible
			? projectsPageObjects.categoryFilter
			: projectsPageObjects.categoryFilterMobile;
		const options = await initialFilter.locator('option').all();
		if (options.length <= 1) {
			test.skip();
		}

		const categoryValue = await options[1].getAttribute('value');
		expect(categoryValue).toBeTruthy();

		// Now navigate with category query param
		const urlWithParam = `${testData.projectsPageUrl}?category=${encodeURIComponent(
			categoryValue!
		)}`;
		await page.goto(urlWithParam, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const desktopFilterAfter = projectsPageObjects.categoryFilter;
		const mobileFilterAfter = projectsPageObjects.categoryFilterMobile;

		if (await desktopFilterAfter.isVisible().catch(() => false)) {
			await expect(desktopFilterAfter).toHaveValue(categoryValue!);
		}
		if (await mobileFilterAfter.isVisible().catch(() => false)) {
			await expect(mobileFilterAfter).toHaveValue(categoryValue!);
		}

		// All visible cards should match selected category
		const { allMatch } = await page.evaluate(selectedCategory => {
			const wrappers = Array.from(
				document.querySelectorAll<HTMLElement>('#projectsGrid > div')
			);

			for (const el of wrappers) {
				const style = window.getComputedStyle(el);
				if (style.display === 'none' || style.visibility === 'hidden') {
					continue;
				}
				if (selectedCategory && el.dataset.category !== selectedCategory) {
					return { allMatch: false };
				}
			}
			return { allMatch: true };
		}, categoryValue);

		expect(allMatch).toBeTruthy();
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

	test('2.4.1. Back to projects links should point to projects page when coming from index', async ({
		page,
	}) => {
		await page.goto(testData.projectsPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectsPageObjects = new ProjectsPageObjects(page);

		const firstProjectCard =
			await projectsPageObjects.getProjectCardByIndex(0);
		await expect(firstProjectCard).toBeVisible();

		const projectLink = firstProjectCard.locator('a').first();
		const href = await projectLink.getAttribute('href');
		expect(href).toBeTruthy();

		await Promise.all([
			page.waitForURL(`**${href}`, { timeout: 30000 }),
			projectLink.click(),
		]);

		await expect(page.locator('#back-to-projects-top')).toHaveAttribute(
			'href',
			'/projects'
		);
		await expect(page.locator('#back-to-projects-bottom')).toHaveAttribute(
			'href',
			'/projects'
		);
		await expect(page.locator('#back-to-projects-top')).toContainText(
			'Back to Project Gallery'
		);
		await expect(page.locator('#back-to-projects-bottom')).toContainText(
			'Back to Project Gallery'
		);
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

		// Check for the back to projects button (default text when no referrer)
		const backToProjectsButton = page.locator('#back-to-projects-top');
		await expect(
			backToProjectsButton,
			'Back to Projects Section'
		).toBeVisible();
		await expect(backToProjectsButton).toContainText(
			'Back to Projects Section'
		);

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
		await expect(
			backToProjectsButtonBottom,
			'Back to Projects Section'
		).toBeVisible();
		await expect(backToProjectsButtonBottom).toContainText(
			'Back to Projects Section'
		);
		await backToProjectsButtonBottom.click();
		expect(page.url()).toContain(testData.mainPageUrl);
	});

	test('2.6. Back to projects links should point to projects section when coming from home', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/#projects`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		await page.locator(`#${testData.sectionIds.projects}`).scrollIntoViewIfNeeded();
		await page.waitForTimeout(200);

		const exampleProjectCard = page
			.getByTestId('projects-list')
			.locator('article')
			.filter({ has: page.getByText(testData.exampleProjectName) })
			.first();
		await expect(exampleProjectCard).toBeVisible();

		// Ensure card is selected so that desktop detail link is interactive
		await exampleProjectCard.click();
		const detailsLink = exampleProjectCard.getByText('Show more details');

		await Promise.all([
			page.waitForURL('**/projects/**', { timeout: 30000 }),
			detailsLink.click(),
		]);

		// Back buttons should resolve to /#projects and show "Back to Projects Section"
		await expect(page.locator('#back-to-projects-top')).toHaveAttribute(
			'href',
			'/#projects'
		);
		await expect(page.locator('#back-to-projects-bottom')).toHaveAttribute(
			'href',
			'/#projects'
		);
		await expect(page.locator('#back-to-projects-top')).toContainText(
			'Back to Projects Section'
		);
		await expect(page.locator('#back-to-projects-bottom')).toContainText(
			'Back to Projects Section'
		);
	});

	test('2.7. Project links should open in a new tab with safe attributes when present', async ({
		page,
	}) => {
		const projectUrl = `${testData.projectsPageUrl}/${testData.sampleProjectSlug}`;
		await page.goto(projectUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const projectLinks = page.locator('#project-page-links a');
		const linkCount = await projectLinks.count();

		expect(linkCount).toBeGreaterThan(0);

		for (let i = 0; i < linkCount; i++) {
			const link = projectLinks.nth(i);
			await expect(link).toHaveAttribute('target', '_blank');
			const rel = await link.getAttribute('rel');
			expect(rel || '').toContain('noopener');
			expect(rel || '').toContain('noreferrer');
		}
	});
});
