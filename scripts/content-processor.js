/**
 * Node.js compatible version of the content processor for use in sync scripts
 * This is a simplified version that handles the core Obsidian link processing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert a project name to a slug format
 */
function convertProjectNameToSlug(projectName) {
	return projectName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Get list of existing project names from the projects directory
 */
function getExistingProjectNames() {
	try {
		// Path to the projects directory
		const projectsDir = path.join(__dirname, '../src/content/projects');

		// Read all .md files in the projects directory
		const files = fs.readdirSync(projectsDir);
		const projectNames = files
			.filter(file => file.endsWith('.md'))
			.map(file => file.replace('.md', ''));

		return projectNames;
	} catch (error) {
		console.error('Error reading project names:', error);
		// Fallback to empty array if there's an error
		return [];
	}
}

/**
 * Centralized content processing function for all markdown content
 */
function processContent(content) {
	if (!content) return '';

	// Get list of existing project names for link conversion
	const existingProjects = getExistingProjectNames();

	return (
		content
			// First, handle [[Link Name|AltName]] format - check if it's an existing project
			.replace(
				/\[\[([^|\]]+)\|([^\]]+)\]\]/g,
				(match, projectName, altText) => {
					const slug = convertProjectNameToSlug(projectName);
					if (existingProjects.includes(projectName)) {
						return `<a href="/portfolio/projects/${slug}" class="theme-link">${altText}</a>`;
					}
					return `<span class="theme-link">${altText}</span>`;
				}
			)
			// Handle external Obsidian images ![[https://...]] (must be before simple links)
			.replace(/!\[\[(https?:\/\/[^\]]+)\]\]/g, (match, imageUrl) => {
				return `<img src="${imageUrl}" alt="External Obsidian image">`;
			})
			// Handle internal Obsidian images ![[filename]] (must be before simple links)
			.replace(/!\[\[([^\]]+)\]\]/g, (match, filename) => {
				return `<!-- Image removed during sync: ${filename} -->`;
			})
			// Then handle simple Obsidian links [[text]] - check if it's an existing project
			.replace(/\[\[([^\]]+)\]\]/g, (match, projectName) => {
				const slug = convertProjectNameToSlug(projectName);
				if (existingProjects.includes(projectName)) {
					return `<a href="/portfolio/projects/${slug}" class="theme-link">${projectName}</a>`;
				}
				return `<span class="theme-link">${projectName}</span>`;
			})
			// Handle existing HTML theme-link tags to ensure they're properly styled
			.replace(
				/<p class="theme-link">([^<]+)<\/p>/g,
				'<span class="theme-link">$1</span>'
			)
			// Convert hardcoded project links to use slugs
			.replace(
				/href="\/portfolio\/projects\/([^"]+)"/g,
				(match, projectName) => {
					const slug = convertProjectNameToSlug(projectName);
					return `href="/portfolio/projects/${slug}"`;
				}
			)
			// Convert markdown headings to HTML headings (must be before newline conversion)
			.replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
			.replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
			.replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
			.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
			.replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
			.replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
			// Convert newlines to <br> tags for proper HTML rendering (but not for headings)
			.replace(/\n/g, '<br>')
			// Finally, convert markdown links to HTML with theme green and underline styling
			// Only add target="_blank" and rel="noopener noreferrer" for external links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, linkUrl) => {
				// Check if it's an external link (starts with http or https)
				if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
					return `<a href="${linkUrl}" class="theme-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
				} else {
					// Internal link - navigate in same tab
					return `<a href="${linkUrl}" class="theme-link">${linkText}</a>`;
				}
			})
	);
}

export { convertProjectNameToSlug, getExistingProjectNames, processContent };
