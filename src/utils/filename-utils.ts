/**
 * Utility functions for handling filenames
 */

/**
 * Extracts a name from a filename by removing the .md extension
 * @param filename - The filename with or without .md extension, may include path
 * @returns The filename without the .md extension and without path
 */
export function extractNameFromFilename(filename: string): string {
	// Extract just the filename from path if present
	const basename = filename.split('/').pop() || filename;
	// Remove .md extension
	return basename.replace(/\.md$/, '');
}

/**
 * Converts a name (e.g. from a filename without extension) to a URL-safe kebab-case slug.
 * Used for project and other content routes so URLs are consistent (e.g. "Dorkinians Website V3" -> "dorkinians-website-v3").
 * @param name - Display name or filename base
 * @returns Lowercase slug with non-alphanumerics replaced by hyphens, no leading/trailing hyphens
 */
export function nameToSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Extracts a name from a filename by removing the .md extension (string replace version)
 * This is an alternative implementation that uses string replace instead of regex
 * @param filename - The filename with or without .md extension
 * @returns The filename without the .md extension
 */
export function extractNameFromFilenameString(filename: string): string {
	return filename.replace('.md', '');
}
