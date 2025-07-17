/**
 * Centralized content processing function for all markdown content on the site
 * This function handles Obsidian links, markdown links, and other content transformations
 * Use this function for all content that needs to be processed before rendering
 */
export function processContent(content: string | undefined | null): string {
	if (!content) return '';

	return (
		content
			// First, handle [[CompanyName|AltName]] format to extract AltName and make it bold and mint green
			.replace(
				/\[\[([^|]+)\|([^\]]+)\]\]/g,
				'<strong class="mint-link">$2</strong>'
			)
			// Then handle simple Obsidian links [[text]] -> bold and mint green text
			.replace(/\[\[([^\]]+)\]\]/g, '<strong class="mint-link">$1</strong>')
			// Finally, convert markdown links to HTML with mint green and underline styling
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/g,
				'<a href="$2" class="mint-link" target="_blank" rel="noopener noreferrer">$1</a>'
			)
	);
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
