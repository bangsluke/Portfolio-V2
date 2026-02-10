import { Locator, Page } from '@playwright/test';

export class HomePageObjects {
	public readonly headerLogo: Locator;
	public readonly headerGitHubIcon: Locator;
	public readonly headerLinkedInIcon: Locator;
	public readonly headerThemeIcon: Locator;
	public readonly profileName: Locator;
	public readonly profilePicture: Locator;
	public readonly description: Locator;
	public readonly contactMeButtonTopSection: Locator;
	public readonly contactMeButtonBottomSection: Locator;
	public readonly aboutMeButton: Locator;
	public readonly skillsSearchButton: Locator;
	public readonly skillsResetButton: Locator;
	public readonly skillsToggleButton: Locator;
	public readonly skillsTableSection: Locator;
	public readonly skillsBubblesView: Locator;
	public readonly skillsSearchModal: Locator;
	public readonly skillsSearchInput: Locator;
	public readonly githubContributionsSection: Locator;
	public readonly githubContributionsCalendar: Locator;
	public readonly githubContributionsDevToLink: Locator;
	public readonly githubContributionsMediumLink: Locator;
	public readonly mostCommonTechSection: Locator;
	public readonly mostCommonTechList: Locator;
	public readonly projectsSection: Locator;
	public readonly projectsList: Locator;
	public readonly workExperienceSection: Locator;
	public readonly workExperienceList: Locator;
	public readonly customersAndClientsSection: Locator;
	public readonly customersAndClientsList: Locator;
	public readonly educationSection: Locator;
	public readonly educationTimeline: Locator;
	public readonly referencesSection: Locator;
	public readonly referencesCarousel: Locator;
	public readonly downloadCVButton: Locator;
	public readonly scrollToTopButton: Locator;
	public readonly scrollToTopContainer: Locator;
	public readonly footerEmailIcon: Locator;
	public readonly footerGitHubIcon: Locator;
	public readonly footerLinkedInIcon: Locator;
	public readonly mobileNavToggle: Locator;
	public readonly mobileNavLinks: Locator;

	constructor(public readonly page: Page) {
		this.profileName = page.getByTestId('profile-name');
		this.profilePicture = page.getByTestId('profile-picture');
		this.description = page.getByTestId('profile-description');
		this.contactMeButtonTopSection = page.getByTestId(
			'contact-me-button-top-section'
		);
		this.contactMeButtonBottomSection = page.getByTestId(
			'contact-me-button-bottom-section'
		);
		this.aboutMeButton = page.getByRole('button', {
			name: 'About Me person',
		});
		this.skillsSearchButton = page.getByRole('button', { name: 'Search' });
		this.skillsResetButton = page.getByTestId('skills-reset-btn');
		this.skillsToggleButton = page.getByTestId('skills-toggle-btn');
		this.skillsTableSection = page.getByTestId('skills-table-view');
		this.skillsBubblesView = page.getByTestId('skills-bubbles-view');
		this.skillsSearchModal = page.locator('[role="dialog"][aria-label="Search skills"]');
		this.skillsSearchInput = page.getByPlaceholder('Search skills');
		this.githubContributionsSection = page.getByTestId(
			'github-contributions-section'
		);
		this.githubContributionsCalendar = page.getByTestId(
			'github-contributions-calendar'
		);
		this.githubContributionsDevToLink = page.getByTestId(
			'github-contributions-dev-to-link'
		);
		this.githubContributionsMediumLink = page.getByTestId(
			'github-contributions-medium-link'
		);
		this.mostCommonTechSection = page.getByTestId('most-common-techs-section');
		this.mostCommonTechList = page.getByTestId('most-common-techs-list');
		this.projectsSection = page.getByTestId('projects-section');
		this.projectsList = page.getByTestId('projects-list');
		this.workExperienceSection = page.getByTestId('work-experience-section');
		this.workExperienceList = page.getByTestId('work-experience-list');
		this.customersAndClientsSection = page.getByTestId(
			'customers-and-clients-section'
		);
		this.customersAndClientsList = page.getByTestId(
			'customers-and-clients-list'
		);
		this.educationSection = page.getByTestId('education-section');
		this.educationTimeline = page.getByTestId('education-timeline');
		this.downloadCVButton = page.getByRole('button', {
			name: 'Download CV',
		});
		this.referencesSection = page.getByTestId('references-section');
		this.referencesCarousel = page.getByTestId('references-carousel');
		this.projectsSection = page.getByTestId('projects-section');
		this.projectsList = page.getByTestId('projects-list');
		this.scrollToTopButton = page.getByRole('button', {
			name: 'Scroll to top',
		});
		this.scrollToTopContainer = page.locator('#scroll-to-top');
		this.headerLogo = page.getByTestId('header-logo');
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
		this.mobileNavToggle = page.getByTestId('mobile-nav-toggle');
		this.mobileNavLinks = page.getByTestId('mobile-nav-links');
	}

	getSkillsSearchResult(skillName: string): Locator {
		const normalizedName = skillName;
		return this.page.getByTestId(`skills-search-result-${normalizedName}`);
	}

	async openSkillsTable() {
		const toggleButton = this.page.locator('#skills-toggle-btn');

		// Click twice to cycle: bubbles-skill → bubbles-project → list
		await toggleButton.click();
		await this.page.waitForTimeout(2000);
		await toggleButton.click();

		// Wait for the 'hidden' class to be removed from the table view
		await this.page.waitForFunction(
			() => {
				const tableView = document.getElementById('skills-table-view');
				return tableView && !tableView.classList.contains('hidden');
			},
			{ timeout: 30000 }
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
