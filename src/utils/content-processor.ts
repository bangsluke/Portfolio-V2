/**
 * Process markdown content to handle Obsidian link syntax and markdown links
 * This function should be used when rendering content on the site
 */
export function processMarkdownContent(content: string): string {
  if (!content) return '';
  
  return content
    // First, handle [[CompanyName|AltName]] format to extract AltName
    .replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, '$2')
    // Then handle simple Obsidian links [[text]] -> text
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    // Finally, convert markdown links to HTML
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>');
}

/**
 * Process a single string value (like linkedCompany) to remove Obsidian syntax
 */
export function processObsidianLink(value: string | string[] | undefined): string {
  if (!value) return '';
  
  if (Array.isArray(value)) {
    return value.map(v => processObsidianLink(v)).join(', ');
  }
  
  return value
    .replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1');
} 