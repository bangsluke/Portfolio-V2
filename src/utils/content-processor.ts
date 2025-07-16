/**
 * Process markdown content to handle Obsidian link syntax and markdown links
 * This function should be used when rendering content on the site
 */
export function processMarkdownContent(content: string): string {
	if (!content) return '';

	return (
		content
			// First, handle [[CompanyName|AltName]] format to extract AltName and make it bold and mint green
			.replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, '<strong class="mint-link">$2</strong>')
			// Then handle simple Obsidian links [[text]] -> bold and mint green text
			.replace(/\[\[([^\]]+)\]\]/g, '<strong class="mint-link">$1</strong>')
			// Finally, convert markdown links to HTML with mint green and underline styling
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/g,
				'<a href="$2" class="mint-link">$1</a>'
			)
	);
}

/**
 * Process a single string value (like linkedCompany) to remove Obsidian syntax
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
