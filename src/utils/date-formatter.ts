/* eslint-disable no-console */
/**
 * Formats a date string to "MMM YYYY" format
 * @param dateString - The date string to format (e.g., "2023-01-15" or "2023-01")
 * @returns Formatted date string (e.g., "Jan 2023")
 */
export function formatDateToMMMYYYY(
	dateString: string | null | undefined
): string | null | undefined {
	// Handle null and undefined inputs
	if (dateString === null || dateString === undefined) {
		return dateString;
	}

	try {
		// Handle different date formats
		let date: Date;

		if (dateString.includes('-')) {
			// If it's a full date like "2023-01-15", use it as is
			date = new Date(dateString);
		} else {
			// If it's just "2023-01", append "-01" to make it a valid date
			date = new Date(`${dateString}-01`);
		}

		// Check if the date is valid
		if (isNaN(date.getTime())) {
			console.warn(`Invalid date string: ${dateString}`);
			return dateString; // Return original string if invalid
		}

		// Format to "MMM YYYY"
		return date.toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric',
		});
	} catch (error) {
		console.error(`Error formatting date ${dateString}:`, error);
		return dateString; // Return original string if error
	}
}
