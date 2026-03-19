import { expect, test } from '@playwright/test';
import { testData } from '../utils/testData';
import { waitForPageLoad } from '../utils/testHelpers';

test.describe('Blog Tests', () => {
	test('7.1. Blog home page should load and display posts', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/blog/`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const articles = page.locator('article');
		await expect(articles.first()).toBeVisible();
	});

	test('7.2. Blog posts listing page should load without errors', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/blog/`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const articles = page.locator('article');
		const count = await articles.count();
		expect(count).toBeGreaterThanOrEqual(1);
	});

	test('7.3. Individual blog post page should load and display content', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/blog/posts/welcome/`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const heading = page.getByRole('heading', { name: 'Welcome to My Blog' });
		await expect(heading).toBeVisible();

		const content = page.locator('#content');
		await expect(content).toBeVisible();
	});

	test('7.4. Navigation should include Blog link', async ({ page }) => {
		await page.goto(testData.mainPageUrl, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const blogNavLink = page.getByTestId('nav-link-blog');
		await expect(blogNavLink).toBeVisible();
		expect(await blogNavLink.getAttribute('href')).toBe('/blog/');
	});

	test('7.5. Blog post card should use SkillPill-style topic pills', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/blog/`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const skillPills = page.locator('article .skill-pill');
		const count = await skillPills.count();
		expect(count).toBeGreaterThanOrEqual(1);
	});

	test('7.6. Blog topics page should load', async ({ page }) => {
		await page.goto(`${testData.mainPageUrl}/blog/topics/`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const heading = page.getByRole('heading', { name: 'Topics' });
		await expect(heading).toBeVisible();
	});

	test('7.7. Blog post sidebar should display Topics section', async ({
		page,
	}) => {
		await page.goto(`${testData.mainPageUrl}/blog/`, {
			timeout: 30000,
			waitUntil: 'domcontentloaded',
		});
		await waitForPageLoad(page);

		const topicsHeading = page.getByRole('heading', { name: 'Topics' });
		await expect(topicsHeading).toBeVisible();
	});
});
