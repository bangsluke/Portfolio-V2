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
		'Enthusiastic and personable professional with a passion for data and software, seeking a dynamic role to apply strong organisational skills, logical thinking and effective communication to drive long-term success. Open to positions where I can make a positive impact including Software Developer, DevOps Engineer or Product Owner',
	skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
	downloadCVUrl: `${baseUrl}Luke-Bangs-CV.pdf`,
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
	exampleProjectTechnologies: ['GitHub', 'Netlify', 'Heroku', 'Neo4j Aura'],
	exampleProjectDescriptionText: 'Building on the foundations of the previous',
	exampleProjectLessonsLearnedText: 'To make the chat bot work',
};
