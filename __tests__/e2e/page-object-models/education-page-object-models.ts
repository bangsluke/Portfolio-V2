import { Locator, Page } from '@playwright/test';

export class EducationPageObjects {
	public readonly seeMoreItemsButton: Locator;
	public readonly educationItems: Locator;
	public readonly pageHeading: Locator;

	constructor(public readonly page: Page) {
		this.seeMoreItemsButton = page.getByRole('link', {
			name: 'See more items',
		});
		this.educationItems = page.locator('article, [role="article"]');
		this.pageHeading = page.getByRole('heading', { level: 1 });
	}
}
