import { Locator, Page } from '@playwright/test';

export class ProjectsPageObjects {
	public readonly seeMoreProjectsButton: Locator;
	public readonly projectsGrid: Locator;
	public readonly categoryFilter: Locator;
	public readonly categoryFilterMobile: Locator;
	public readonly projectCards: Locator;
	public readonly projectCount: Locator;

	constructor(public readonly page: Page) {
		this.seeMoreProjectsButton = page.getByRole('link', {
			name: 'See more projects',
		});
		this.projectsGrid = page.locator('#projectsGrid');
		this.categoryFilter = page.locator('#categoryFilter');
		this.categoryFilterMobile = page.locator('#categoryFilterMobile');
		this.projectCards = page.locator('#projectsGrid > div');
		this.projectCount = page.locator('#projectCount');
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
