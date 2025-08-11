/**
 * Centralized content processing function for all markdown content on the site
 * This function handles Obsidian links, markdown links, and other content transformations
 * Use this function for all content that needs to be processed before rendering
 */

import fs from 'fs';
import path from 'path';

export function processContent(content: string | undefined | null): string {
	if (!content) return '';

	// Get list of existing project names for link conversion
	const existingProjects = getExistingProjectNames();

	let processedContent = content
		// First, handle [[Link Name|AltName]] format - check if it's an existing project
		.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (match, projectName, altText) => {
			const slug = convertProjectNameToSlug(projectName);
			if (existingProjects.includes(projectName)) {
				return `<a href="/projects/${slug}" class="theme-link">${altText}</a>`;
			}
			return `<span class="theme-link">${altText}</span>`;
		})
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
				return `<a href="/projects/${slug}" class="theme-link">${projectName}</a>`;
			}
			return `<span class="theme-link">${projectName}</span>`;
		})
		// Handle existing HTML theme-link tags to ensure they're properly styled
		.replace(
			/<p class="theme-link">([^<]+)<\/p>/g,
			'<span class="theme-link">$1</span>'
		)
		// Convert hardcoded project links to use slugs
		.replace(/href="\/projects\/([^"]+)"/g, (match, projectName) => {
			const slug = convertProjectNameToSlug(projectName);
			return `href="/projects/${slug}"`;
		})
		// Convert markdown headings to HTML headings (must be before newline conversion)
		.replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
		.replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
		.replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
		.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
		.replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
		.replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>');

	// Process callouts before newline conversion
	// Handle Obsidian callouts with types (lines starting with > [!type])
	processedContent = processedContent
		.replace(
			/^> \[!(\w+)\]\s*(.+)$/gm,
			(match, calloutType, calloutContent) => {
				const type = calloutType.toLowerCase();
				let bgColor = 'bg-blue-50';
				let borderColor = 'border-blue-200';
				let textColor = 'text-blue-800';
				let icon = '💡';

				// Map callout types to colors and icons
				switch (type) {
					case 'note':
						bgColor = 'bg-blue-50';
						borderColor = 'border-blue-200';
						textColor = 'text-blue-800';
						icon = '📝';
						break;
					case 'warning':
						bgColor = 'bg-yellow-50';
						borderColor = 'border-yellow-200';
						textColor = 'text-yellow-800';
						icon = '⚠️';
						break;
					case 'error':
						bgColor = 'bg-red-50';
						borderColor = 'border-red-200';
						textColor = 'text-red-800';
						icon = '❌';
						break;
					case 'success':
						bgColor = 'bg-green-50';
						borderColor = 'border-green-200';
						textColor = 'text-green-800';
						icon = '✅';
						break;
					case 'info':
						bgColor = 'bg-cyan-50';
						borderColor = 'border-cyan-200';
						textColor = 'text-cyan-800';
						icon = 'ℹ️';
						break;
					case 'tip':
						bgColor = 'bg-emerald-50';
						borderColor = 'border-emerald-200';
						textColor = 'text-emerald-800';
						icon = '💡';
						break;
					case 'question':
						bgColor = 'bg-purple-50';
						borderColor = 'border-purple-200';
						textColor = 'text-purple-800';
						icon = '❓';
						break;
					case 'example':
						bgColor = 'bg-indigo-50';
						borderColor = 'border-indigo-200';
						textColor = 'text-indigo-800';
						icon = '📖';
						break;
					case 'bug':
						bgColor = 'bg-rose-50';
						borderColor = 'border-rose-200';
						textColor = 'text-rose-800';
						icon = '🐛';
						break;
					case 'quote':
						bgColor = 'bg-gray-50';
						borderColor = 'border-gray-200';
						textColor = 'text-gray-800';
						icon = '💬';
						break;
					default:
						bgColor = 'bg-blue-50';
						borderColor = 'border-blue-200';
						textColor = 'text-blue-800';
						icon = '💡';
				}

				return `<div class="callout ${bgColor} ${borderColor} ${textColor} border-l-4 p-4 my-6 rounded-r-lg"><div class="flex items-start gap-3"><span class="text-lg">${icon}</span><div class="flex-1"><div class="text-lg leading-relaxed">${calloutContent}</div></div></div></div>`;
			}
		)
		// Handle simple callouts (lines starting with >)
		.replace(/^>\s*(.+)$/gm, (match, calloutContent) => {
			return `<div class="callout bg-gray-50 border-gray-200 text-gray-800 border-l-4 p-4 my-6 rounded-r-lg"><div class="flex items-start gap-3"><span class="text-lg">💬</span><div class="flex-1"><div class="text-lg leading-relaxed">${calloutContent}</div></div></div></div>`;
		});

	// Convert newlines to <br> tags for proper HTML rendering
	// If a newline is followed by a dash, use a single <br>, otherwise use double <br><br>
	processedContent = processedContent.replace(/\n-/g, '<br>-');
	processedContent = processedContent.replace(/\n/g, '<br><br>');

	// Finally, convert markdown links to HTML with theme green and underline styling
	// Only add target="_blank" and rel="noopener noreferrer" for external links
	return processedContent.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		(match, linkText, linkUrl) => {
			// Check if it's an external link (starts with http or https)
			if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
				return `<a href="${linkUrl}" class="theme-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
			} else {
				// Internal link - navigate in same tab
				return `<a href="${linkUrl}" class="theme-link">${linkText}</a>`;
			}
		}
	);
}

/**
 * Get list of existing project names from the projects directory
 * This is used to determine if an Obsidian link should be converted to a project link
 */
function getExistingProjectNames(): string[] {
	try {
		// Path to the projects directory
		const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');

		// Read all .md files in the projects directory
		const files = fs.readdirSync(projectsDir);
		const projectNames = files
			.filter((file: string) => file.endsWith('.md'))
			.map((file: string) => file.replace('.md', ''));

		return projectNames;
	} catch (error) {
		console.error('Error reading project names:', error);
		// Fallback to empty array if there's an error
		return [];
	}
}

/**
 * Convert a project name to a slug format
 * This function converts project names like "Portfolio Card" to "portfolio-card"
 */
export function convertProjectNameToSlug(projectName: string): string {
	return projectName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Extract the "About Me Short" section from the Portfolio Site V2 markdown file
 * This function reads the markdown file and extracts the content between "About Me Short" and the end marker
 */
export async function getHeroDescription(): Promise<string> {
	try {
		const fs = await import('fs/promises');
		const path = await import('path');

		// Path to the Portfolio Site V2 markdown file
		const filePath = path.join(
			process.cwd(),
			'src',
			'content',
			'projects',
			'Portfolio Site V2.md'
		);

		const content = await fs.readFile(filePath, 'utf8');

		// Extract content between "About Me Short" and the end marker
		const endMarker = '>[!top] [Back to top](#Table%20of%20Contents)';
		const sectionRegex = new RegExp(
			`####\\s*About Me Short\\s*\\n([\\s\\S]*?)(?=\\s*${endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
			'i'
		);
		const match = content.match(sectionRegex);

		if (match && match[1]) {
			// Clean up the extracted content
			return match[1]
				.trim()
				.replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
				.replace(/\s+$/gm, ''); // Remove trailing whitespace from each line
		}

		return '';
	} catch (error) {
		console.error('Error reading hero description:', error);
		return '';
	}
}

/**
 * Portfolio configuration options interface
 */
export interface PortfolioConfig {
	lookingForWork?: boolean;
	maxProjectsDisplay?: number;
}

/**
 * Extract configuration options from the Portfolio Site V2 markdown file
 * This function reads the markdown file and extracts key-value pairs from the "Portfolio Config Options" section
 */
export async function getPortfolioConfig(): Promise<PortfolioConfig> {
	try {
		const fs = await import('fs/promises');
		const path = await import('path');

		// Path to the Portfolio Site V2 markdown file
		const filePath = path.join(
			process.cwd(),
			'src',
			'content',
			'projects',
			'Portfolio Site V2.md'
		);

		const content = await fs.readFile(filePath, 'utf8');

		// Extract content between "Portfolio Config Options" and the end marker
		const endMarker = '>[!top] [Back to top](#Table%20of%20Contents)';
		const sectionRegex = new RegExp(
			`####\\s*Portfolio Config Options\\s*\\n([\\s\\S]*?)(?=\\s*${endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
			'i'
		);
		const match = content.match(sectionRegex);

		if (match && match[1]) {
			const configContent = match[1].trim();
			const config: PortfolioConfig = {};

			// Parse key-value pairs from bullet points
			const lines = configContent.split('\n');
			for (const line of lines) {
				const trimmedLine = line.trim();
				// Look for pattern "- key: value" (value can include comments after dash)
				const keyValueMatch = trimmedLine.match(
					/^-\s*([a-zA-Z]+):\s*([^-]+?)(?:\s*-\s*(.+))?$/
				);
				if (keyValueMatch) {
					const key = keyValueMatch[1];
					let value: string | boolean | number = keyValueMatch[2].trim();

					// Convert string values to appropriate types
					if (value === 'true') {
						value = true;
					} else if (value === 'false') {
						value = false;
					} else if (!isNaN(Number(value))) {
						value = Number(value);
					}

					(config as any)[key] = value;
				}
			}

			return config;
		}

		return {};
	} catch (error) {
		console.error('Error reading portfolio config:', error);
		return {};
	}
}

/**
 * Get a specific portfolio configuration value with a default fallback
 */
export async function getPortfolioConfigValue<K extends keyof PortfolioConfig>(
	key: K,
	defaultValue: PortfolioConfig[K]
): Promise<PortfolioConfig[K]> {
	const config = await getPortfolioConfig();
	return config[key] ?? defaultValue;
}

/**
 * Process markdown content to handle Obsidian link syntax and markdown links
 * This function should be used when rendering content on the site
 * @deprecated Use processContent instead for consistency
 */
export function processMarkdownContent(content: string): string {
	return processContent(content);
}

/**
 * Process a single string value (like linkedCompany) to remove Obsidian syntax
 * This function removes Obsidian syntax without adding styling
 */
export function processObsidianLink(
	value: string | string[] | undefined
): string {
	if (!value) return '';

	if (Array.isArray(value)) {
		return value.map(v => processObsidianLink(v)).join(', ');
	}

	return value
		.replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, '$2')
		.replace(/\[\[([^\]]+)\]\]/g, '$1');
}

/**
 * Test function to verify content processor is working
 */
export function testContentProcessor() {
	const testContent =
		'built using [[Next.js]], [[Nest.js]], a [[Neo4j]] database and a [[Flask]] [[API]] to call a [[Python]] algorithm';
	const processed = processContent(testContent);
	console.log('Test content:', testContent);
	console.log('Processed result:', processed);
	return processed;
}
