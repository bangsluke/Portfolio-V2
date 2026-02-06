import { expect, test } from '@playwright/test';
import { HomePageObjects } from '../page-object-models/home-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Home Page Tests', () => {
	// Before each test, navigate to the home page and wait for it to load
	test.beforeEach(async ({ page }) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 60000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);
	});

	test('1.1. Home page should show "Contact Me" buttons in top section', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButtonTopSection).toBeVisible();
	});

	test('1.2. Home page should show "Contact Me" buttons in bottom section', async ({
		page,
	}) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.contactMeButtonBottomSection).toBeVisible();
	});

	test('1.3. Home page should show "About Me" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.aboutMeButton).toBeVisible();
	});

	// Checks for several skills defined in the test data
	test('1.4. Home page should show each skill in the skills section', async ({
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

	test('1.5. Home page should show "Download CV" button', async ({ page }) => {
		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.downloadCVButton).toBeVisible();
	});

	test('1.6.All main sections should be visible', async ({ page }) => {
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

	test('1.7. Header anchor links should work correctly', async ({ page }) => {
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

	test('1.8.Header icons should be visible and clickable', async ({ page }) => {
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

	test('1.9. Scroll to top button should appear on scroll and work', async ({
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

	test('1.10. Contact Me button in top section should prepare email correctly', async ({
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

	test('1.11.Contact Me button in bottom section should prepare email correctly', async ({
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

	test('1.12. Footer icons should be visible and have correct links', async ({
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
});
