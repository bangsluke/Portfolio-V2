import { Page } from '@playwright/test';

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
	// Wait for DOM; 'load' can hang on this app (analytics/resources). networkidle is unreliable (websockets, etc.)
	await page.waitForLoadState('domcontentloaded', { timeout: 40000 });
}
