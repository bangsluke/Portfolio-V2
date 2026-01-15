// Configuration file for scripts
// Contains spacing levels and other constants used across multiple scripts

// Spacing levels for console log messages
export const SPACING_LEVEL_1 = ' '.repeat(2);
export const SPACING_LEVEL_2 = ' '.repeat(4);
export const SPACING_LEVEL_3 = ' '.repeat(6);

// Common configuration constants
export const DEFAULT_PORTFOLIO_TAG = 'portfolio';
export const DEFAULT_DEBUG_MODE = false;

// File paths
export const ASTRO_CONTENT_PATH = './src/content';
export const SCRIPTS_PATH = './scripts';

// Protected file patterns
export const PROTECTED_PATTERNS = [
	'.DS_Store',
	'Thumbs.db',
	'desktop.ini',
	'.git',
	'.gitignore',
	'node_modules',
	'package-lock.json',
	'yarn.lock',
	'.env',
	'.env.local',
	'.env.production',
	'.env.development',
];

// Content type mappings with section definitions
export const CONTENT_TYPE_MAPPINGS = {
	projects: {
		sections: [
			{
				name: 'Short Description',
				property: 'shortDescription',
			},
			{
				name: 'Long Description',
				property: 'longDescription',
			},
			{
				name: 'Lessons Learned',
				property: 'lessonsLearned',
			},
		],
	},
	companies: {
		sections: [
			{
				name: 'Company Description',
				property: 'companyDescription',
			},
			{
				name: 'Key Achievement',
				property: 'keyAchievement',
			},
		],
	},
	clients: {
		sections: [
			{
				name: 'Client Description',
				property: 'clientDescription',
			},
			{
				name: 'Key Achievement',
				property: 'keyAchievement',
			},
		],
	},
	roles: {
		sections: [
			{
				name: 'Short Role Description',
				property: 'shortRoleDescription',
			},
			{
				name: 'Full Role Description',
				property: 'fullRoleDescription',
			},
			{
				name: 'Role Description', // legacy fallback
				property: 'roleDescription',
			},
			{
				name: 'Key Achievement',
				property: 'keyAchievement',
			},
		],
	},
	educations: {
		sections: [
			{
				name: 'Qualifications',
				property: 'qualifications',
			},
			{
				name: 'Additional Details',
				property: 'additionalDetails',
			},
		],
	},
};
