import { Locator, Page } from '@playwright/test';

export class HomePageObjects {
	public readonly contactMeButton: Locator;
	public readonly aboutMeButton: Locator;
	public readonly skillsTableSection: Locator;
	public readonly downloadCVButton: Locator;

	constructor(public readonly page: Page) {
		this.contactMeButton = page.getByRole('button', {
			name: 'Contact Me envelope',
		});
		this.aboutMeButton = page.getByRole('button', {
			name: 'About Me person',
		});
		this.skillsTableSection = page.getByTestId('skills-table-view');
		this.downloadCVButton = page.getByRole('button', {
			name: 'Download CV',
		});
	}

	async openSkillsTable() {
		const toggleButton = this.page.locator('#skills-toggle-btn');

		// Click twice to cycle: bubbles-skill → bubbles-project → list
		await toggleButton.click();
		await this.page.waitForTimeout(200);
		await toggleButton.click();

		// Wait for the 'hidden' class to be removed from the table view
		await this.page.waitForFunction(
			() => {
				const tableView = document.getElementById('skills-table-view');
				return tableView && !tableView.classList.contains('hidden');
			},
			{ timeout: 10000 }
		);

		// Wait for button text to change to "Toggle: List" to confirm state change
		await this.page.waitForFunction(
			() => {
				const btn = document.getElementById('skills-toggle-btn');
				return btn?.textContent?.includes('List') ?? false;
			},
			{ timeout: 5000 }
		);

		// Small delay to ensure DOM is fully updated after class removal
		await this.page.waitForTimeout(300);
	}
}
