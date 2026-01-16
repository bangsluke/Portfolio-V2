import { Locator, Page } from '@playwright/test';

export class AboutMePageObjects {
	public readonly aboutMeButton: Locator;
	public readonly pageContent: Locator;
	public readonly pageHeading: Locator;

	constructor(public readonly page: Page) {
		this.aboutMeButton = page.getByRole('button', {
			name: 'About Me person',
		});
		this.pageContent = page.locator('main, article, [role="main"]');
		this.pageHeading = page.getByRole('heading', { level: 1 });
	}
}
