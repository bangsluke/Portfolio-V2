// Determine base URL based on environment
const getBaseUrl = (): string => {
	if (process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL) {
		return process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL || '';
	}
	// Use localhost for development, production URL for CI
	return process.env.CI || process.env.NODE_ENV === 'production'
		? 'https://bangsluke-portfolio.netlify.app/'
		: 'http://localhost:4321';
};

const baseUrl = getBaseUrl();

export const testData = {
	mainPageUrl: baseUrl,
	email: 'bangsluke@gmail.com',
	description:
		'Technical Product Owner with 3 years leading internal software development, able to effectively communicate with both developers and stakeholders',
	skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
	downloadCVUrl: `Luke-Bangs-CV.pdf`,
	sectionIds: {
		home: 'home',
		skills: 'skills',
		projects: 'projects',
		experience: 'experience',
		clients: 'customers-and-clients',
		education: 'education',
		references: 'references',
	},
	navigationPaths: {
		home: '/#home',
		skills: '/#skills',
		projects: '/#projects',
		experience: '/#experience',
		clients: '/#customers-and-clients',
		education: '/#education',
		references: '/#references',
		about: '/about-me',
	},
	projectsPageUrl: `${baseUrl}/projects`,
	workExperiencePageUrl: `${baseUrl}/work-experience`,
	educationPageUrl: `${baseUrl}/education`,
	aboutMePageUrl: `${baseUrl}/about-me`,
	sampleProjectSlug: 'dorkinians-website-v3',
	exampleProjectName: 'Dorkinians Website V3',
	exampleProjectDateRange: 'Aug 2025 - Jan 2026',
	exampleProjectCategory: 'Personal Design',
	exampleProjectTechnologies: ['GitHub', 'Netlify', 'Heroku'],
	exampleProjectDescriptionText:
		'Serving over 600 players, the Dorkinians FC stats',
	exampleProjectLessonsLearnedText: 'To make the chat bot work',
	exampleMostCommonTech: 'React',
	exampleWorkExperienceName: 'VHE2 Integration Engineer',
	exampleWorkExperienceDateRange: 'Sep 2025 - Present',
	exampleWorkExperienceDescription: 'developing numerous tracking documents',
	exampleCustomerAndClientName: 'Aston Martin',
	exampleCustomerAndClientDateRange: 'Mar 2016 - Apr 2016',
	exampleEducationItemName: 'Loughborough University',
	exampleEducationItemDateRange: 'Sep 2011 - Jun 2014',
	exampleEducationItemDescriptionTitle:
		'BEng. Automotive Engineering. Second Class Honours, Upper Division (2:1)',
	exampleEducationItemDescription:
		'Large range of engineering topics, exploring multiple engineering fundamentals',
	exampleReferenceName: 'Taryn Auchecorne',
	exampleReferenceRole: 'Head of Client Services',
	exampleReferenceCompanyName: 'Opus 2 International',
	exampleReferenceEmail: 'tauchecorne@opus2.com',
	exampleReferencePhone: '07912 945265',
	exampleReferenceAddress: 'London, EC4A 3BF',
};
