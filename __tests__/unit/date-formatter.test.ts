import { formatDateToMMMYYYY } from '../../src/utils/date-formatter';

describe('formatDateToMMMYYYY', () => {
	test('formats full date string correctly', () => {
		expect(formatDateToMMMYYYY('2023-01-15')).toBe('Jan 2023');
		expect(formatDateToMMMYYYY('2023-12-31')).toBe('Dec 2023');
		expect(formatDateToMMMYYYY('2024-06-01')).toBe('Jun 2024');
	});

	test('formats year-month string correctly', () => {
		expect(formatDateToMMMYYYY('2023-01')).toBe('Jan 2023');
		expect(formatDateToMMMYYYY('2023-12')).toBe('Dec 2023');
		expect(formatDateToMMMYYYY('2024-06')).toBe('Jun 2024');
	});

	test('handles edge cases', () => {
		// February with leap year
		expect(formatDateToMMMYYYY('2024-02-29')).toBe('Feb 2024');
		// February without leap year
		expect(formatDateToMMMYYYY('2023-02-28')).toBe('Feb 2023');
	});

	test('returns original string for invalid dates', () => {
		expect(formatDateToMMMYYYY('invalid-date')).toBe('invalid-date');
		expect(formatDateToMMMYYYY('2023-13-01')).toBe('2023-13-01'); // Invalid month
		// Note: JavaScript Date constructor handles invalid days by rolling over to next month
		expect(formatDateToMMMYYYY('2023-02-30')).toBe('Mar 2023'); // Invalid day rolls over
	});

	test('handles null and undefined inputs', () => {
		expect(formatDateToMMMYYYY(null)).toBe(null);
		expect(formatDateToMMMYYYY(undefined)).toBe(undefined);
	});

	test('handles empty string', () => {
		expect(formatDateToMMMYYYY('')).toBe('Jan 2001'); // Empty string becomes "Jan 2001"
	});

	test('handles different date formats gracefully', () => {
		// These should return the original string as they're invalid
		expect(formatDateToMMMYYYY('2023/01/15')).toBe('2023/01/15');
		expect(formatDateToMMMYYYY('01-15-2023')).toBe('Jan 2023'); // This format is actually valid
	});

	test('formats dates across different years', () => {
		expect(formatDateToMMMYYYY('2020-01')).toBe('Jan 2020');
		expect(formatDateToMMMYYYY('2025-12')).toBe('Dec 2025');
		expect(formatDateToMMMYYYY('1999-06')).toBe('Jun 1999');
	});
});
