/**
 * Centralized content processing function for all markdown content on the site
 * This function handles Obsidian links, markdown links, and other content transformations
 * Use this function for all content that needs to be processed before rendering
 */
export function processContent(content: string | undefined | null): string {
	if (!content) return '';

	return (
		content
			// First, handle [[CompanyName|AltName]] format to extract AltName and make it bold and theme green
			.replace(
				/\[\[([^|]+)\|([^\]]+)\]\]/g,
				'<span class="theme-link">$2</span>'
			)
			// Then handle simple Obsidian links [[text]] -> bold and theme green text
			.replace(/\[\[([^\]]+)\]\]/g, '<span class="theme-link">$1</span>')
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
			// Finally, convert markdown links to HTML with theme green and underline styling
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/g,
				'<a href="$2" class="theme-link" target="_blank" rel="noopener noreferrer">$1</a>'
			)
	);
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
