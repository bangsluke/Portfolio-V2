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
	description:
		'Enthusiastic and personable professional with a passion for data and software, seeking a dynamic role to apply strong organisational skills, logical thinking and effective communication to drive long-term success. Open to positions where I can make a positive impact including Software Developer, DevOps Engineer or Product Owner',
	skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
	downloadCVUrl: `${baseUrl}Luke-Bangs-CV.pdf`,
};
