import {
	extractNameFromFilename,
	extractNameFromFilenameString,
} from '../utils/filename-utils';

describe('extractNameFromFilename', () => {
	test('removes .md extension from filename', () => {
		expect(extractNameFromFilename('project-name.md')).toBe('project-name');
		expect(extractNameFromFilename('My Project.md')).toBe('My Project');
		expect(extractNameFromFilename('skill.md')).toBe('skill');
	});

	test('handles filenames without .md extension', () => {
		expect(extractNameFromFilename('project-name')).toBe('project-name');
		expect(extractNameFromFilename('My Project')).toBe('My Project');
		expect(extractNameFromFilename('skill')).toBe('skill');
	});

	test('handles filenames with multiple .md occurrences', () => {
		expect(extractNameFromFilename('project.md.name.md')).toBe(
			'project.md.name'
		);
		expect(extractNameFromFilename('file.md.md')).toBe('file.md');
	});

	test('handles edge cases', () => {
		expect(extractNameFromFilename('')).toBe('');
		expect(extractNameFromFilename('.md')).toBe('');
		expect(extractNameFromFilename('md')).toBe('md');
		expect(extractNameFromFilename('file.MD')).toBe('file.MD'); // Case sensitive
	});

	test('handles complex filenames', () => {
		expect(extractNameFromFilename('Portfolio Site V2.md')).toBe(
			'Portfolio Site V2'
		);
		expect(extractNameFromFilename('Dorkinians Website V2.md')).toBe(
			'Dorkinians Website V2'
		);
		expect(extractNameFromFilename('Cost Model Translation File.md')).toBe(
			'Cost Model Translation File'
		);
	});
});

describe('extractNameFromFilenameString', () => {
	test('removes .md extension from filename', () => {
		expect(extractNameFromFilenameString('project-name.md')).toBe(
			'project-name'
		);
		expect(extractNameFromFilenameString('My Project.md')).toBe('My Project');
		expect(extractNameFromFilenameString('skill.md')).toBe('skill');
	});

	test('handles filenames without .md extension', () => {
		expect(extractNameFromFilenameString('project-name')).toBe('project-name');
		expect(extractNameFromFilenameString('My Project')).toBe('My Project');
		expect(extractNameFromFilenameString('skill')).toBe('skill');
	});

	test('handles filenames with multiple .md occurrences', () => {
		expect(extractNameFromFilenameString('project.md.name.md')).toBe(
			'project.name.md'
		); // Removes only first occurrence
		expect(extractNameFromFilenameString('file.md.md')).toBe('file.md'); // Removes only first occurrence
	});

	test('handles edge cases', () => {
		expect(extractNameFromFilenameString('')).toBe('');
		expect(extractNameFromFilenameString('.md')).toBe('');
		expect(extractNameFromFilenameString('md')).toBe('md');
		expect(extractNameFromFilenameString('file.MD')).toBe('file.MD'); // Case sensitive
	});

	test('handles complex filenames', () => {
		expect(extractNameFromFilenameString('Portfolio Site V2.md')).toBe(
			'Portfolio Site V2'
		);
		expect(extractNameFromFilenameString('Dorkinians Website V2.md')).toBe(
			'Dorkinians Website V2'
		);
		expect(
			extractNameFromFilenameString('Cost Model Translation File.md')
		).toBe('Cost Model Translation File');
	});
});

describe('function comparison', () => {
	test('both functions produce same result for simple cases', () => {
		const testCases = [
			'project-name.md',
			'My Project.md',
			'skill.md',
			'project-name',
			'My Project',
			'skill',
			'Portfolio Site V2.md',
			'Dorkinians Website V2.md',
		];

		testCases.forEach(filename => {
			expect(extractNameFromFilename(filename)).toBe(
				extractNameFromFilenameString(filename)
			);
		});
	});

	test('functions differ for multiple .md occurrences', () => {
		expect(extractNameFromFilename('project.md.name.md')).toBe(
			'project.md.name'
		);
		expect(extractNameFromFilenameString('project.md.name.md')).toBe(
			'project.name.md'
		);

		expect(extractNameFromFilename('file.md.md')).toBe('file.md');
		expect(extractNameFromFilenameString('file.md.md')).toBe('file.md');
	});
});
