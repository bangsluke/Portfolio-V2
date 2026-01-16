import { Locator, Page } from '@playwright/test';

export class WorkExperiencePageObjects {
	public readonly seeMoreItemsButton: Locator;
	public readonly workExperienceItems: Locator;
	public readonly pageHeading: Locator;

	constructor(public readonly page: Page) {
		this.seeMoreItemsButton = page.getByRole('link', {
			name: 'See more items',
		});
		this.workExperienceItems = page.locator('article, [role="article"]');
		this.pageHeading = page.getByRole('heading', { level: 1 });
	}
}
