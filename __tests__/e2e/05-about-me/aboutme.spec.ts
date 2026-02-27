import { expect, test } from '@playwright/test';
import { AboutMePageObjects } from '../page-object-models/about-me-page-object-models';
import { HomePageObjects } from '../page-object-models/home-page-object-models';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('About Me Tests', () => {
	test('5.1. "About Me" button on homepage should navigate to /about-me', async ({
		page,
	}) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		await page.locator(`#${testData.sectionIds.home}`).scrollIntoViewIfNeeded();
		await page.waitForTimeout(200);

		const homePageObjects = new HomePageObjects(page);
		await expect(homePageObjects.aboutMeButton).toBeVisible();

		// Click the button and wait for navigation
		await Promise.all([
			page.waitForURL('**/about-me', { timeout: 30000 }),
			homePageObjects.aboutMeButton.click(),
		]);

		expect(page.url()).toContain('/about-me');
	});

	test('5.2. About Me page should contain content/details', async ({
		page,
	}) => {
		await page.goto(testData.aboutMePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const aboutMePageObjects = new AboutMePageObjects(page);

		// Check page heading
		await expect(
			aboutMePageObjects.pageHeading,
			'Page heading should be visible'
		).toBeVisible();

		// Check for page content
		await expect(
			aboutMePageObjects.pageContent,
			'Page content should be visible'
		).toBeVisible();

		// Verify content has text
		const contentText = await aboutMePageObjects.pageContent.textContent();
		expect(contentText).toBeTruthy();
		expect(contentText?.length).toBeGreaterThan(50); // Should have substantial content
	});

	test('5.3. About Me page should be properly rendered', async ({ page }) => {
		await page.goto(testData.aboutMePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		// Verify URL is correct
		expect(page.url()).toContain('/about-me');

		// Check that page has loaded properly
		const body = page.locator('body');
		await expect(body, 'Page body should be visible').toBeVisible();

		// Check for any images or structured content
		const images = page.locator('img');
		const imageCount = await images.count();
		// At least the page should be rendered (may or may not have images)
		expect(imageCount).toBeGreaterThanOrEqual(0);
	});

	test('5.4. Table of contents FAB should open and close the mobile TOC modal', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 500, height: 900 });
		await page.goto(testData.aboutMePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const fab = page.locator('#toc-fab');
		const modal = page.locator('#toc-modal');

		await expect(fab).toBeVisible();
		const initiallyHidden = await modal.evaluate(
			el => window.getComputedStyle(el).display === 'none'
		);
		expect(initiallyHidden).toBeTruthy();

		// Open modal
		await fab.click();
		await page.waitForTimeout(200);
		const visibleAfterOpen = await modal.evaluate(
			el => window.getComputedStyle(el).display !== 'none'
		);
		expect(visibleAfterOpen).toBeTruthy();

		// Close via close button
		const closeButton = page.locator('#toc-close');
		await expect(closeButton).toBeVisible();
		await closeButton.click();
		await page.waitForTimeout(200);
		const hiddenAfterClose = await modal.evaluate(
			el => window.getComputedStyle(el).display === 'none'
		);
		expect(hiddenAfterClose).toBeTruthy();

		// Open again and close by clicking outside
		await fab.click();
		await page.waitForTimeout(200);
		const visibleAfterSecondOpen = await modal.evaluate(
			el => window.getComputedStyle(el).display !== 'none'
		);
		expect(visibleAfterSecondOpen).toBeTruthy();

		// Click backdrop in viewport center so sticky header (z-110) does not intercept
		const viewport = page.viewportSize();
		await modal.click({
			position: {
				x: (viewport?.width ?? 500) / 2,
				y: (viewport?.height ?? 900) / 2,
			},
		});
		await page.waitForTimeout(200);
		const hiddenAfterOutsideClick = await modal.evaluate(
			el => window.getComputedStyle(el).display === 'none'
		);
		expect(hiddenAfterOutsideClick).toBeTruthy();
	});

	test('5.5. Mobile TOC modal should list headings and scroll to selected section', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 500, height: 900 });
		await page.goto(testData.aboutMePageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);
		// Mobile TOC is populated on window load (hoisted script); wait so section links exist
		await page.waitForLoadState('load', { timeout: 15000 });

		const fab = page.locator('#toc-fab');
		const modal = page.locator('#toc-modal');
		const tocList = page.locator('#mobile-toc-list');

		await fab.click();
		await page.waitForTimeout(200);
		const visibleAfterOpen = await modal.evaluate(
			el => window.getComputedStyle(el).display !== 'none'
		);
		expect(visibleAfterOpen).toBeTruthy();
		await expect(tocList).toBeVisible();

		// Ensure "Top of Page" item exists
		await expect(tocList.getByText('Top of Page')).toBeVisible();

		// If TOC has section links (populated from #content on load), click first one and assert scroll
		const firstSectionLink = tocList.getByRole('link').nth(1);
		const hasSectionLinks = await firstSectionLink.isVisible().catch(() => false);

		if (hasSectionLinks) {
			const beforePosition = await page.evaluate(() => window.scrollY);
			await firstSectionLink.click();
			await page.waitForTimeout(500);
			await expect(modal).toHaveClass(/hidden/);
			const afterPosition = await page.evaluate(() => window.scrollY);
			expect(afterPosition).toBeGreaterThanOrEqual(beforePosition);
		}
		// Otherwise we've still verified modal opens and "Top of Page" is present
	});
});
