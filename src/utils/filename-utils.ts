/**
 * Utility functions for handling filenames
 */

/**
 * Extracts a name from a filename by removing the .md extension
 * @param filename - The filename with or without .md extension
 * @returns The filename without the .md extension
 */
export function extractNameFromFilename(filename: string): string {
	return filename.replace(/\.md$/, '');
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
