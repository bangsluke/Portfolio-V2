import { Page } from '@playwright/test';

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
	// Wait for DOM - networkidle is unreliable with continuous requests (analytics, websockets, etc.)
	await page.waitForLoadState('domcontentloaded', { timeout: 40000 });
}
