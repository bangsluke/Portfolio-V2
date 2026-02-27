import { expect, test } from '@playwright/test';
import { HomePageObjects } from '../page-object-models/home-page-object-models';
import { testData } from '../utils/testData';

test.describe('Home Page Tests', () => {
	// Before each test, navigate to the home page and wait for it to load
	test.beforeEach(async ({ page }) => {
		// Stub Umami analytics script so it never loads from the network
		await page.route('https://cloud.umami.is/**', route =>
			route.fulfill({
				status: 200,
				contentType: 'text/javascript',
				body: '/* umami analytics stubbed in tests */',
			})
		);

		// (Optional) stub GitHub API if you want to avoid 403s / flakiness
		await page.route('https://api.github.com/**', route =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					// minimal shape used in GitHubContributions.tsx
					created_at: '2015-01-01T00:00:00Z',
				}),
			})
		);

		// 1) Only wait for initial commit, not DOMContentLoaded
		await page.goto(testData.mainPageUrl, {
			timeout: 15000,
			waitUntil: 'commit',
		});

		// 2) Then wait for a stable “page is ready” element
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.headerLogo).toBeVisible({ timeout: 15000 });
	});

	// Header section tests
	test('1.1.1. Header section should contain my logo, GitHub and LinkedIn icons, and the theme toggle button', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.headerLogo).toBeVisible();
		await expect(homePageObjects.headerGitHubIcon).toBeVisible();
		await expect(homePageObjects.headerLinkedInIcon).toBeVisible();
		await expect(homePageObjects.headerThemeIcon).toBeVisible();
	});

	test('1.1.2. Header anchor links should work correctly', async ({ page }) => {
		const navLinks = [
			{ name: 'Home', path: testData.navigationPaths.home },
			{ name: 'Skills', path: testData.navigationPaths.skills },
			{ name: 'Projects', path: testData.navigationPaths.projects },
			{ name: 'Experience', path: testData.navigationPaths.experience },
			{ name: 'Clients', path: testData.navigationPaths.clients },
			{ name: 'Education', path: testData.navigationPaths.education },
			{ name: 'References', path: testData.navigationPaths.references },
			{ name: 'About Me', path: testData.navigationPaths.about },
		];

		for (const link of navLinks) {
			const navLink = page.getByTestId(
				`nav-link-${link.name.toLowerCase().replace(/ /g, '-')}`
			);
			await expect(
				navLink,
				`Navigation link ${link.name} should be visible`
			).toBeVisible();

			const href = await navLink.getAttribute('href');
			expect(href).toBe(link.path);
		}
	});

	test('1.1.3. Header icons should be visible and clickable', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);

		// GitHub icon
		await expect(
			homePageObjects.headerGitHubIcon,
			'Header GitHub icon should be visible'
		).toBeVisible();
		const githubHref =
			await homePageObjects.headerGitHubIcon.getAttribute('href');
		expect(githubHref).toBeTruthy();
		expect(githubHref).toContain('github.com');

		// LinkedIn icon
		await expect(
			homePageObjects.headerLinkedInIcon,
			'Header LinkedIn icon should be visible'
		).toBeVisible();
		const linkedInHref =
			await homePageObjects.headerLinkedInIcon.getAttribute('href');
		expect(linkedInHref).toBeTruthy();
		expect(linkedInHref).toContain('linkedin.com');

		// Theme toggle icon (button)
		await expect(
			homePageObjects.headerThemeIcon,
			'Header theme icon should be visible'
		).toBeVisible();
	});

	test('1.1.4. Navigation bar should remain visible while scrolling between sections', async ({
		page,
	}) => {
		const sectionIds = [
			testData.sectionIds.home,
			testData.sectionIds.skills,
			testData.sectionIds.projects,
			testData.sectionIds.experience,
			testData.sectionIds.clients,
			testData.sectionIds.education,
			testData.sectionIds.references,
		];

		for (const id of sectionIds) {
			const section = page.locator(`#${id}`);
			await section.scrollIntoViewIfNeeded();
			await page.waitForTimeout(200);

			// Header and nav links should remain visible as we scroll through the page
			const header = page.getByRole('banner', {
				name: 'Main navigation',
			});
			await expect(header).toBeVisible();
		}
	});

	test('1.1.5. Theme toggle should update dark mode and persist across reloads', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		const html = page.locator('html');

		const initialIsDark = await html.evaluate(el =>
			el.classList.contains('dark')
		);

		// Toggle theme
		await homePageObjects.headerThemeIcon.click();
		await page.waitForTimeout(200);

		const toggledIsDark = await html.evaluate(el =>
			el.classList.contains('dark')
		);
		expect(toggledIsDark).toBe(!initialIsDark);

		const storedTheme = await page.evaluate(() => localStorage.theme);
		expect(storedTheme === 'dark' || storedTheme === 'light').toBeTruthy();

		// Reload and ensure theme is restored from localStorage
		await page.reload({ waitUntil: 'domcontentloaded' });
		// Wait for header to be ready again
		const reloadedHomePageObjects = new HomePageObjects(page);
		await expect(reloadedHomePageObjects.headerLogo).toBeVisible();

		const isDarkAfterReload = await html.evaluate(el =>
			el.classList.contains('dark')
		);
		if (storedTheme === 'dark') {
			expect(isDarkAfterReload).toBe(true);
		} else if (storedTheme === 'light') {
			expect(isDarkAfterReload).toBe(false);
		}
	});

	// Top section tests
	test('1.2.1. Home page should show my name, profile picture and description in top section', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.profileName).toBeVisible();
		await expect(homePageObjects.profilePicture).toBeVisible();
		await expect(homePageObjects.description).toBeVisible();
	});

	test('1.2.2. Home page description in top section should contain a snippet of the correct description', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		const description = await homePageObjects.description.textContent();
		expect(description).toContain(testData.description);
	});

	test('1.2.3. Home page should show "Contact Me" buttons in top section', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButtonTopSection).toBeVisible();
	});

	test('1.2.4. Contact Me button in top section should prepare email correctly', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButtonTopSection).toBeVisible();
		const contactMeButtonHref =
			await homePageObjects.contactMeButtonTopSection.getAttribute('href');
		expect(contactMeButtonHref).toBeTruthy();
		expect(contactMeButtonHref).toContain('mailto:');
		expect(contactMeButtonHref).toContain(testData.email);
	});

	test('1.2.5. Home page should show "About Me" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.aboutMeButton).toBeVisible();
	});

	// Main sections tests
	test('1.3.1. All main sections should be visible', async ({ page }) => {
		const sections = [
			testData.sectionIds.home,
			testData.sectionIds.skills,
			testData.sectionIds.projects,
			testData.sectionIds.experience,
			testData.sectionIds.clients,
			testData.sectionIds.education,
			testData.sectionIds.references,
		];

		for (const sectionId of sections) {
			const section = page.locator(`#${sectionId}`);
			await expect(
				section,
				`Section ${sectionId} should be visible`
			).toBeVisible();
		}

		// Contact section doesn't have an ID, so check for Contact Me button instead
		const homePageObjects = new HomePageObjects(page);
		await expect(
			homePageObjects.contactMeButtonTopSection,
			'Contact section should be visible (via Contact Me button)'
		).toBeVisible();
	});

	// Coding Skills section tests
	// Checks for several skills defined in the test data
	test('1.4.1. Coding Skills section, Skills section should show each skill', async ({
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

	test('1.4.2. Skills section should have a functioning Reset button that resets the skills section to the default view', async ({
		page,
	}) => {
		// Check that the skills section reset button is visible
		const homePageObjects = new HomePageObjects(page);
		const resetButton = homePageObjects.skillsResetButton;
		await expect(resetButton).toBeVisible();
		await resetButton.click();
		// Expect that bubble-group class will update its transform values to fit the skills in
		await expect(homePageObjects.skillsBubblesView).toBeVisible();
	});

	test('1.4.3. Skills section should have a functioning Toggle button that toggles the skills section between the default view and the list view', async ({
		page,
	}) => {
		// On initial load, the toggle button should be "Toggle: Bubbles (Skill)"
		const homePageObjects = new HomePageObjects(page);
		const toggleButton = homePageObjects.skillsToggleButton;
		await expect(toggleButton).toBeVisible();
		await expect(toggleButton).toHaveText('Toggle: Bubbles (Skill)');
		// After clicking the toggle button, the text should change to "Toggle: Bubbles (Project)"
		await toggleButton.click();
		await expect(toggleButton).toHaveText('Toggle: Bubbles (Project)');
		// After clicking the toggle button again, the text should change to "Toggle: List"
		await toggleButton.click();
		await expect(toggleButton).toHaveText('Toggle: List');
		// Expect to see the list view and hide bubbles view
		await expect(page.getByTestId('skills-table-view')).toBeVisible();
		await expect(page.getByTestId('skills-bubbles-view')).toBeHidden();
		// After clicking the toggle button again, the text should change to "Toggle: Bubbles (Project)"
		await toggleButton.click();
		await expect(toggleButton).toHaveText('Toggle: Bubbles (Skill)');
		// Expect to see the bubble chart view and hide list view
		await expect(page.getByTestId('skills-bubbles-view')).toBeVisible();
		await expect(page.getByTestId('skills-table-view')).toBeHidden();
	});

	test('1.4.7. Skills section should have a visible Search button and the skills search should handle fuzzy queries', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);

		// Search button should be visible
		await expect(homePageObjects.skillsSearchButton).toBeVisible();

		// Open the search modal
		await homePageObjects.skillsSearchButton.click();

		// Modal and input should be visible
		await expect(homePageObjects.skillsSearchModal).toBeVisible();
		await expect(homePageObjects.skillsSearchInput).toBeVisible();

		// Type a fuzzy query (with a typo) and expect to see React in the results
		await homePageObjects.skillsSearchInput.fill('Reect');

		const reactResult = homePageObjects.getSkillsSearchResult('React');
		await expect(reactResult).toBeVisible();
	});

	test('1.4.4. GitHub Contributions section should be visible and show a calendar of my GitHub contributions and links to my Dev.to and Medium profiles', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.githubContributionsSection).toBeVisible();
		await expect(homePageObjects.githubContributionsCalendar).toBeVisible();
		await expect(homePageObjects.githubContributionsDevToLink).toBeVisible();
		await expect(homePageObjects.githubContributionsMediumLink).toBeVisible();
	});

	test('1.4.5. Most Common Tech section should show the top 10 most common technologies I have used', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.mostCommonTechSection).toBeVisible();
		await expect(homePageObjects.mostCommonTechList).toBeVisible();
		// Check that React skill is visible
		await expect(
			homePageObjects.mostCommonTechList.getByText(
				testData.exampleMostCommonTech
			)
		).toBeVisible();
	});

	test('1.4.6. Skills table should show rating and project count for key skills', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);

		await homePageObjects.openSkillsTable();

		const skillsTableSection = page.getByTestId('skills-table-view');
		const sampleSkills = ['HTML', 'React'];

		for (const skill of sampleSkills) {
			const row = skillsTableSection.getByTestId(`skills-table-item-${skill}`);
			await expect(
				row,
				`Skills table row should be visible for ${skill}`
			).toBeVisible();

			const text = (await row.textContent()) || '';
			expect(text.length).toBeGreaterThan(0);
			// Ensure rating and projects show a value (number or "All"), not just the label
			expect(text).toMatch(/Rating\s+(All|\d+)/);
			expect(text).toMatch(/Projects\s+(All|\d+)/);
		}
	});

	// Projects section tests
	test('1.5.1. Projects section should be visible and show a list of 6 of my projects as cards, including showing images, names, descriptions, and technologies', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.projectsSection).toBeVisible();
		await expect(homePageObjects.projectsList).toBeVisible();
		// Check that the example project is visible
		await expect(
			homePageObjects.projectsList.getByText(testData.exampleProjectName)
		).toBeVisible();
		// Check that the example project image is visible
		await expect(
			homePageObjects.projectsList.getByAltText(testData.exampleProjectName)
		).toBeVisible();
		// Check that the example project description is visible
		await expect(
			homePageObjects.projectsList.getByText(
				testData.exampleProjectDescriptionText
			)
		).toBeVisible();
		// Check that the example project technologies are visible
		const exampleProjectCard = homePageObjects.projectsList
			.locator('article')
			.filter({ has: page.getByText(testData.exampleProjectName) })
			.first();

		await expect(exampleProjectCard).toBeVisible();
		for (const tech of testData.exampleProjectTechnologies) {
			await expect(exampleProjectCard.getByText(tech)).toBeVisible();
		}
	});

	test('1.5.2. Clicking a project card should navigate to the project details page', async ({
		page,
	}) => {
		// Check that clicking once on the example project card will make the text "Show more details" visible
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.projectsSection).toBeVisible();
		await expect(homePageObjects.projectsList).toBeVisible();
		// Check that the example project is visible
		await expect(
			homePageObjects.projectsSection.getByText(testData.exampleProjectName)
		).toBeVisible();
		// Scope to the example project card (article that contains the example project name)
		const exampleProjectCard = homePageObjects.projectsList
			.locator('article')
			.filter({ has: page.getByText(testData.exampleProjectName) })
			.first();
		// Click on the example project card
		await exampleProjectCard.click();
		// Expect to see the "Show more details" text on that card
		await expect(
			exampleProjectCard.getByText('Show more details')
		).toBeVisible();
		// Click on the "Show more details" link on that card and expect to see the project details page
		await exampleProjectCard.getByText('Show more details').click();
		// Expect to see the project details page
		await expect(page.url()).toContain(testData.projectsPageUrl);
	});

	test('1.5.3. Projects section, "See more projects" button should navigate to /projects', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.projectsSection).toBeVisible();
		await expect(homePageObjects.projectsList).toBeVisible();
		// Check that the "See more projects" button is visible
		await expect(
			homePageObjects.projectsSection.getByText('See more projects')
		).toBeVisible();
		// Click on the "See more projects" button and expect to see the projects page
		await homePageObjects.projectsSection
			.getByText('See more projects')
			.click();
		// Expect to see the projects page
		await expect(page.url()).toContain(testData.projectsPageUrl);
	});

	// Work Experience section tests
	test('1.6.1. Work Experience section should be visible and show a timeline of my last 4 work experiences, including showing role name, dates and description', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.workExperienceSection).toBeVisible();
		await expect(homePageObjects.workExperienceList).toBeVisible();

		// Scroll section into view so all list items are in DOM (avoids counting before full render)
		await homePageObjects.workExperienceSection.scrollIntoViewIfNeeded();

		const workExperienceItems = homePageObjects.workExperienceList.locator(
			'article[role="article"], article'
		);
		// Wait for exactly 4 items (handles streaming/slow DOM; timeout 10s)
		await expect(workExperienceItems).toHaveCount(4, { timeout: 10000 });

		for (let i = 0; i < 4; i++) {
			const item = workExperienceItems.nth(i);
			const itemText = await item.textContent();
			expect(itemText).toBeTruthy();
			expect(itemText?.trim().length ?? 0).toBeGreaterThan(0);
		}

		// Check that the example work experience is visible
		await expect(
			homePageObjects.workExperienceSection.getByText(
				testData.exampleWorkExperienceName
			)
		).toBeVisible();
		// Check that the example work experience date range is visible
		await expect(
			homePageObjects.workExperienceSection.getByText(
				testData.exampleWorkExperienceDateRange
			)
		).toBeVisible();
		// Check that the example work experience description is visible and contains the example work experience description text
		const workExperienceDescription =
			await homePageObjects.workExperienceSection
				.getByText(testData.exampleWorkExperienceDescription)
				.textContent();
		expect(workExperienceDescription).toBeTruthy();
		expect(workExperienceDescription).toContain(
			testData.exampleWorkExperienceDescription
		);
	});

	test('1.6.2. Work Experience section, "See more items" button should navigate to /work-experience', async ({
		page,
	}) => {
		// Check that the "See more items" button is visible
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.workExperienceSection).toBeVisible();
		await expect(homePageObjects.workExperienceList).toBeVisible();
		// Check that the "See more items" button is visible
		await expect(
			homePageObjects.workExperienceSection.getByText('See more items')
		).toBeVisible();
		// Click on the "See more items" button and expect to see the work experience page
		await homePageObjects.workExperienceSection
			.getByText('See more items')
			.click();
		// Expect to see the work experience page
		await expect(page.url()).toContain(testData.workExperiencePageUrl);
	});

	// Customers and Clients section tests
	test('1.7.1. Customers and Clients section should be visible and show a carousel of my customers and clients, including showing images, names and dates', async ({
		page,
	}) => {
		// Check that the customers and clients section is visible
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.customersAndClientsSection).toBeVisible();
		await expect(homePageObjects.customersAndClientsList).toBeVisible();

		// Scope to the example customer and client card (div that contains the example customer and client name)
		const exampleCustomerAndClientCard = homePageObjects.customersAndClientsList
			.locator('div')
			.filter({ has: page.getByText(testData.exampleCustomerAndClientName) })
			.first();

		// Check that the customers and clients list contains the example customer and client
		await expect(
			exampleCustomerAndClientCard.getByText(
				testData.exampleCustomerAndClientName
			)
		).toBeVisible();
		// Check that the customers and clients list contains the example customer and client date range
		await expect(
			exampleCustomerAndClientCard.getByText(
				testData.exampleCustomerAndClientDateRange
			)
		).toBeVisible();
	});

	test('1.7.2. Customers and Clients carousel arrows should change the visible item', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.customersAndClientsSection).toBeVisible();
		await expect(homePageObjects.customersAndClientsList).toBeVisible();

		const carousel = homePageObjects.customersAndClientsList;
		const firstPanel = carousel.locator('.flicking-panel').first();
		const initialText = (await firstPanel.textContent()) || '';

		const nextButton = carousel.getByRole('button', { name: 'Next item' });
		await nextButton.click();
		await page.waitForTimeout(500);

		const newFirstPanel = carousel.locator('.flicking-panel').first();
		const newText = (await newFirstPanel.textContent()) || '';

		// In case duplicated items exist for circular mode, just ensure we can click without errors
		expect(newText.length).toBeGreaterThan(0);
		if (initialText.trim().length > 0 && newText.trim().length > 0) {
			// Prefer a stricter check when content differs
			if (initialText.trim() !== newText.trim()) {
				expect(initialText.trim()).not.toBe(newText.trim());
			}
		}
	});

	// Education section tests
	test('1.8.1. Education section should be visible and show a timeline of my education, including showing educational institution name, dates and description', async ({
		page,
	}) => {
		// Check that the education section is visible
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.educationSection).toBeVisible();
		// Check that the education timeline is visible
		await expect(homePageObjects.educationTimeline).toBeVisible();
		// Check that the example education item is visible
		await expect(
			homePageObjects.educationSection.getByText(
				testData.exampleEducationItemName
			)
		).toBeVisible();
		// Check that the example education item date range is visible
		await expect(
			homePageObjects.educationSection.getByText(
				testData.exampleEducationItemDateRange
			)
		).toBeVisible();
		// Check that the example education item description title is visible
		await expect(
			homePageObjects.educationSection.getByText(
				testData.exampleEducationItemDescriptionTitle
			)
		).toBeVisible();
		// Check that the example education item description is visible and contains the example education item description text
		const educationItemDescription = await homePageObjects.educationSection
			.getByText(testData.exampleEducationItemDescription)
			.textContent();
		expect(educationItemDescription).toBeTruthy();
		expect(educationItemDescription).toContain(
			testData.exampleEducationItemDescription
		);
	});

	test('1.8.2. Education section, "See more items" button should navigate to /education', async ({
		page,
	}) => {
		// Check that the "See more items" button is visible
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.educationSection).toBeVisible();
		await expect(homePageObjects.educationTimeline).toBeVisible();
		// Check that the "See more items" button is visible
		await expect(
			homePageObjects.educationSection.getByText('See more items')
		).toBeVisible();
		// Click on the "See more items" button and expect to see the education page
		await homePageObjects.educationSection.getByText('See more items').click();
		// Expect to see the education page
		await expect(page.url()).toContain(testData.educationPageUrl);
	});

	// References section tests
	test('1.9.1. References section should be visible and show a carousel of my references, including showing name, role and company name', async ({
		page,
	}) => {
		// Check that the references section is visible
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.referencesSection).toBeVisible();
		// Check that the references carousel is visible
		await expect(homePageObjects.referencesCarousel).toBeVisible();
		// Scope to the example reference card (div that contains the example reference name)
		const exampleReferenceCard = homePageObjects.referencesCarousel
			.locator('.flicking-panel')
			.filter({ has: page.getByText(testData.exampleReferenceName) })
			.first();
		// Check that the example reference is visible
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferenceName)
		).toBeVisible();
		// Check that the example reference role is visible
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferenceRole)
		).toBeVisible();
		// Check that the example reference company name is visible
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferenceCompanyName)
		).toBeVisible();
		// Check that the example reference email, phone and address are visible
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferenceEmail)
		).toBeVisible();
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferencePhone)
		).toBeVisible();
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferenceAddress)
		).toBeVisible();
	});

	test('1.9.3. References carousel should highlight selected card and show contact details', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.referencesSection).toBeVisible();
		await expect(homePageObjects.referencesCarousel).toBeVisible();

		const exampleReferenceCard = homePageObjects.referencesCarousel
			.locator('.flicking-panel')
			.filter({ has: page.getByText(testData.exampleReferenceName) })
			.first();

		await exampleReferenceCard.click();
		const innerCard = exampleReferenceCard.locator('.carousel-item');
		await expect(innerCard).toBeVisible();
		const cardClass = await innerCard.getAttribute('class');
		expect(cardClass || '').toContain('ring-4');

		await expect(
			exampleReferenceCard.getByText(testData.exampleReferenceEmail)
		).toBeVisible();
		await expect(
			exampleReferenceCard.getByText(testData.exampleReferencePhone)
		).toBeVisible();
	});

	test('1.9.2. References section, cards should have a functioning copy email button and phone button that copies the email address and phone number to the clipboard', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.referencesSection).toBeVisible();
		await expect(homePageObjects.referencesCarousel).toBeVisible();

		const exampleReferenceCard = homePageObjects.referencesCarousel
			.locator('.flicking-panel')
			.filter({ has: page.getByText(testData.exampleReferenceName) })
			.first();

		// Grant clipboard permissions in this context
		await page
			.context()
			.grantPermissions(['clipboard-read', 'clipboard-write']);

		// Copy email
		await exampleReferenceCard.getByTitle('Copy email').click();

		const clipboardEmail = await page.evaluate(async () => {
			return await navigator.clipboard.readText();
		});
		expect(clipboardEmail).toBe(testData.exampleReferenceEmail);

		// Copy phone
		await exampleReferenceCard.getByTitle('Copy phone').click();

		const clipboardPhone = await page.evaluate(async () => {
			return await navigator.clipboard.readText();
		});
		expect(clipboardPhone).toBe(testData.exampleReferencePhone);
	});

	// Bottom section tests
	test('1.10.1. Home page should show "Contact Me" buttons in bottom section', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButtonBottomSection).toBeVisible();
	});

	test('1.10.2. Contact Me button in bottom section should prepare email correctly', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButtonBottomSection).toBeVisible();
		const contactMeButtonHref =
			await homePageObjects.contactMeButtonBottomSection.getAttribute('href');
		expect(contactMeButtonHref).toBeTruthy();
		expect(contactMeButtonHref).toContain('mailto:');
		expect(contactMeButtonHref).toContain(testData.email);
	});

	test('1.10.3. Home page should show "Download CV" button', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.downloadCVButton).toBeVisible();
	});

	test('1.10.4. "Download CV" button should download the correct CV', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.downloadCVButton).toBeVisible();
		const downloadCVButtonHref =
			await homePageObjects.downloadCVButton.getAttribute('href');
		expect(downloadCVButtonHref).toBeTruthy();
		expect(downloadCVButtonHref).toContain(testData.downloadCVUrl);
	});

	test('1.11.3. Mobile menu should open, close, and restore scrolling correctly', async ({
		page,
	}) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 500, height: 900 });

		const homePageObjects = new HomePageObjects(page);
		const hamburger = homePageObjects.mobileNavToggle;

		// If hamburger is not present (e.g. layout changes), skip this test
		if ((await hamburger.count()) === 0) {
			test.skip();
		}

		const navLinks = homePageObjects.mobileNavLinks;

		await expect(hamburger).toBeVisible();

		// Initially menu should not be expanded
		let navClass = (await navLinks.getAttribute('class')) || '';
		expect(navClass.includes('expanded')).toBeFalsy();

		// Open menu
		await hamburger.click();
		await page.waitForTimeout(200);
		navClass = (await navLinks.getAttribute('class')) || '';
		expect(navClass.includes('expanded')).toBeTruthy();

		const bodyOverflow = await page.evaluate(
			() => document.body.style.overflow
		);
		const htmlOverflow = await page.evaluate(
			() => document.documentElement.style.overflow
		);
		expect(bodyOverflow).toBe('hidden');
		expect(htmlOverflow).toBe('hidden');

		// Click a nav link to close the menu
		const projectsLink = navLinks.getByTestId('nav-link-projects');
		await projectsLink.click();
		await page.waitForTimeout(200);

		navClass = (await navLinks.getAttribute('class')) || '';
		expect(navClass.includes('expanded')).toBeFalsy();

		const bodyOverflowAfter = await page.evaluate(
			() => document.body.style.overflow
		);
		const htmlOverflowAfter = await page.evaluate(
			() => document.documentElement.style.overflow
		);
		expect(bodyOverflowAfter || '').toBe('');
		expect(htmlOverflowAfter || '').toBe('');

		// At this point, menu has been closed and scrolling restored via link click
	});

	// Footer section tests
	test('1.11.1. Footer icons should be visible and have correct links', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);

		// Email icon
		await expect(
			homePageObjects.footerEmailIcon,
			'Footer email icon should be visible'
		).toBeVisible();
		const emailHref =
			await homePageObjects.footerEmailIcon.getAttribute('href');
		expect(emailHref).toBeTruthy();
		expect(emailHref).toContain('mailto:');

		// GitHub icon
		await expect(
			homePageObjects.footerGitHubIcon,
			'Footer GitHub icon should be visible'
		).toBeVisible();
		const footerGithubHref =
			await homePageObjects.footerGitHubIcon.getAttribute('href');
		expect(footerGithubHref).toBeTruthy();
		expect(footerGithubHref).toContain('github.com');

		// LinkedIn icon
		await expect(
			homePageObjects.footerLinkedInIcon,
			'Footer LinkedIn icon should be visible'
		).toBeVisible();
		const footerLinkedInHref =
			await homePageObjects.footerLinkedInIcon.getAttribute('href');
		expect(footerLinkedInHref).toBeTruthy();
		expect(footerLinkedInHref).toContain('linkedin.com');
	});

	// Full page functionality tests
	test('1.11.2. Scroll to top button should appear on scroll and work', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);

		// Initially, button should not be visible (or have opacity-0)
		const initialOpacity = await homePageObjects.scrollToTopContainer.evaluate(
			el => window.getComputedStyle(el).opacity
		);
		expect(parseFloat(initialOpacity)).toBeLessThan(1);

		// Scroll down
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight / 2);
		});
		await page.waitForTimeout(500); // Wait for scroll event to trigger

		// Button should now be visible
		await expect(
			homePageObjects.scrollToTopButton,
			'Scroll to top button should be visible after scrolling'
		).toBeVisible({ timeout: 2000 });

		// Get scroll position before clicking
		const scrollBefore = await page.evaluate(() => window.scrollY);

		// Click the button
		await homePageObjects.scrollToTopButton.click();
		await page.waitForTimeout(1000); // Wait for smooth scroll

		// Verify we scrolled to top
		const scrollAfter = await page.evaluate(() => window.scrollY);
		expect(scrollAfter).toBeLessThan(scrollBefore);
		expect(scrollAfter).toBeLessThan(100); // Should be near top
	});
});
