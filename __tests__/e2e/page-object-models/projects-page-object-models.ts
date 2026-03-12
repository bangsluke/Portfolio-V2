import { Locator, Page } from '@playwright/test';

export class ProjectsPageObjects {
	public readonly seeMoreProjectsButton: Locator;
	public readonly projectsGrid: Locator;
	public readonly categoryFilter: Locator;
	public readonly categoryFilterMobile: Locator;
	public readonly projectCards: Locator;
	public readonly projectCount: Locator;
	public readonly mobileFiltersToggle: Locator;
	public readonly mobileFiltersContent: Locator;
	public readonly sortModeDesktop: Locator;
	public readonly sortDirectionDesktop: Locator;
	public readonly sortModeMobile: Locator;
	public readonly sortDirectionMobile: Locator;

	constructor(public readonly page: Page) {
		this.seeMoreProjectsButton = page.getByRole('link', {
			name: 'See more projects',
		});
		this.projectsGrid = page.locator('#projectsGrid');
		this.categoryFilter = page.locator('#categoryFilter');
		this.categoryFilterMobile = page.locator('#categoryFilterMobile');
		this.projectCards = page.locator('#projectsGrid > div');
		this.projectCount = page.locator('#projectCount');
		this.mobileFiltersToggle = page.locator('#mobileFiltersToggle');
		this.mobileFiltersContent = page.locator('#mobileFiltersContent');
		this.sortModeDesktop = page.locator('#sortModeDesktop');
		this.sortDirectionDesktop = page.locator('#sortDirectionDesktop');
		this.sortModeMobile = page.locator('#sortModeMobile');
		this.sortDirectionMobile = page.locator('#sortDirectionMobile');
	}

	async getProjectCardByIndex(index: number): Promise<Locator> {
		return this.projectCards.nth(index);
	}

	async getProjectCardByName(name: string): Promise<Locator> {
		return this.page
			.locator('article.project-card')
			.filter({ hasText: name })
			.first();
	}
}
