import { Locator, Page } from '@playwright/test';

export class HomePageObjects {
	public readonly contactMeButton: Locator;
	public readonly aboutMeButton: Locator;
	public readonly downloadCVButton: Locator;

	constructor(page: Page) {
		this.contactMeButton = page.getByRole('button', {
			name: 'Contact Me envelope',
		});
		this.aboutMeButton = page.getByRole('link', {
			name: 'About Me person',
		});
		this.downloadCVButton = page.getByRole('button', {
			name: 'Download CV',
		});
	}
}
