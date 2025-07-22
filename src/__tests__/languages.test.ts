import { getLanguage, languages } from '../utils/languages';

describe('languages', () => {
	test('contains expected language definitions', () => {
		expect(languages).toHaveProperty('angular');
		expect(languages).toHaveProperty('astro');
		expect(languages).toHaveProperty('javascript');
		expect(languages).toHaveProperty('ts');
		expect(languages).toHaveProperty('python');
	});

	test('language objects have correct structure', () => {
		const angular = languages.angular;
		expect(angular).toHaveProperty('name');
		expect(angular).toHaveProperty('iconName');
		expect(typeof angular.name).toBe('string');
		expect(typeof angular.iconName).toBe('string');
	});

	test('some languages have className property', () => {
		expect(languages.mysql).toHaveProperty('className');
		expect(languages.mysql.className).toBe('bg-[#f6ece1]!');
	});

	test('some languages do not have className property', () => {
		expect(languages.angular).not.toHaveProperty('className');
		expect(languages.javascript).not.toHaveProperty('className');
	});
});

describe('getLanguage', () => {
	test('returns correct language for valid keys', () => {
		expect(getLanguage('angular')).toEqual(languages.angular);
		expect(getLanguage('javascript')).toEqual(languages.javascript);
		expect(getLanguage('python')).toEqual(languages.python);
	});

	test('returns html language as fallback for invalid keys', () => {
		expect(getLanguage('nonexistent')).toEqual(languages.html);
		expect(getLanguage('invalid')).toEqual(languages.html);
		expect(getLanguage('')).toEqual(languages.html);
	});

	test('returns html language for case-sensitive mismatches', () => {
		expect(getLanguage('Angular')).toEqual(languages.html);
		expect(getLanguage('JAVASCRIPT')).toEqual(languages.html);
		expect(getLanguage('TypeScript')).toEqual(languages.html);
	});

	test('handles edge cases', () => {
		expect(getLanguage(null as any)).toEqual(languages.html);
		expect(getLanguage(undefined as any)).toEqual(languages.html);
		expect(getLanguage(123 as any)).toEqual(languages.html);
	});

	test('returns correct language names', () => {
		expect(getLanguage('angular').name).toBe('Angular');
		expect(getLanguage('javascript').name).toBe('JavaScript');
		expect(getLanguage('ts').name).toBe('TypeScript');
		expect(getLanguage('python').name).toBe('Python');
	});

	test('returns correct icon names', () => {
		expect(getLanguage('angular').iconName).toBe('angular');
		expect(getLanguage('javascript').iconName).toBe('javascript');
		expect(getLanguage('ts').iconName).toBe('typescript');
		expect(getLanguage('python').iconName).toBe('python');
	});
});
