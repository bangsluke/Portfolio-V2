import { Locator, Page } from '@playwright/test';

export class HomePageObjects {
	public readonly contactMeButtonTopSection: Locator;
	public readonly contactMeButtonBottomSection: Locator;
	public readonly aboutMeButton: Locator;
	public readonly skillsTableSection: Locator;
	public readonly downloadCVButton: Locator;
	public readonly scrollToTopButton: Locator;
	public readonly scrollToTopContainer: Locator;
	public readonly headerGitHubIcon: Locator;
	public readonly headerLinkedInIcon: Locator;
	public readonly headerThemeIcon: Locator;
	public readonly footerEmailIcon: Locator;
	public readonly footerGitHubIcon: Locator;
	public readonly footerLinkedInIcon: Locator;

	constructor(public readonly page: Page) {
		this.contactMeButtonTopSection = page.getByTestId(
			'contact-me-button-top-section'
		);
		this.contactMeButtonBottomSection = page.getByTestId(
			'contact-me-button-bottom-section'
		);
		this.aboutMeButton = page.getByRole('button', {
			name: 'About Me person',
		});
		this.skillsTableSection = page.getByTestId('skills-table-view');
		this.downloadCVButton = page.getByRole('button', {
			name: 'Download CV',
		});
		this.scrollToTopButton = page.getByRole('button', {
			name: 'Scroll to top',
		});
		this.scrollToTopContainer = page.locator('#scroll-to-top');
		this.headerGitHubIcon = page
			.locator('header')
			.locator('a[href*="github.com"]')
			.first();
		this.headerLinkedInIcon = page
			.locator('header')
			.locator('a[href*="linkedin.com"]')
			.first();
		this.headerThemeIcon = page.locator('header').locator('#themeToggle');
		this.footerEmailIcon = page
			.locator('footer')
			.locator('a[href^="mailto:"]')
			.first();
		this.footerGitHubIcon = page
			.locator('footer')
			.locator('a[href*="github.com"]')
			.first();
		this.footerLinkedInIcon = page
			.locator('footer')
			.locator('a[href*="linkedin.com"]')
			.first();
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
