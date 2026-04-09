// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- CJS pure module for Jest
const { extractStarStoriesFromMarkdown, isSectionDelimiterLine } = require('../../scripts/extract-star-stories-pure.cjs');

describe('extract-star-stories', () => {
	test('isSectionDelimiterLine detects Cagan and back-to-top callouts', () => {
		expect(
			isSectionDelimiterLine(
				"> **Cagan's Four Risks (Value, Usability, Feasibility, and Viability) Lens**:"
			)
		).toBe(true);
		expect(
			isSectionDelimiterLine(
				'>[!top] [Back to top](#Table%20of%20Contents)'
			)
		).toBe(true);
		expect(isSectionDelimiterLine('- **Result**: still going')).toBe(false);
	});

	test('extractStarStoriesFromMarkdown keeps body until delimiter for 12 sections', () => {
		const titles = [
			'Alpha',
			'Beta',
			'Gamma',
			'Delta',
			'Epsilon',
			'Zeta',
			'Eta',
			'Theta',
			'Iota',
			'Kappa',
			'Lambda',
			'Mu',
		];

		let body = '# Interview prep\n\n## STAR Stories\n\n>[!top] junk before table\n\n';
		for (let i = 0; i < titles.length; i++) {
			const n = i + 1;
			body += `### ${n}. ${titles[i]}\n`;
			body += `- **Question**: Q${n} with [[Link${n}]]?\n`;
			body += `- **Situation**: S${n}\n`;
			body += `- **Task**: T${n}\n`;
			body += `- **Action**: A${n}\n`;
			body += `- **Result**: R${n}\n`;
			body += `>[!top] [Back to top](#Table%20of%20Contents)\n\n`;
		}
		body += '## Case Study Responses\n\n### CS1\nignored\n';

		const r = extractStarStoriesFromMarkdown(body);
		expect(r.ok).toBe(true);
		if (!r.ok) {
			return;
		}
		expect(r.sectionCount).toBe(12);
		expect(r.sectionTitles).toHaveLength(12);
		expect(r.sectionTitles[0]).toBe('### 1. Alpha');
		expect(r.sectionTitles[11]).toBe('### 12. Mu');

		expect(r.markdown).toContain('## STAR Stories');
		expect(r.markdown).toContain('- **Question**: Q1 with [[Link1]]?');
		expect(r.markdown).not.toContain('junk before table');
		expect(r.markdown).not.toContain('Back to top');
		expect(r.markdown).not.toContain('## Case Study Responses');

		const h3Count = (r.markdown.match(/^###\s+/gm) ?? []).length;
		expect(h3Count).toBe(12);
	});

	test('extractStarStoriesFromMarkdown preserves - **Result:** (colon inside bold)', () => {
		const md = `## STAR Stories

### 1. Story One
- **Question**: Q?
- **Situation**: S
- **Task**: T
- **Action**: A
- **Result:** outcome with [[link]]
> **Cagan's Four Risks (Value, Usability, Feasibility, and Viability) Lens**:
> - note

### 2. Story Two
- **Question**: q2
- **Situation**: s2
- **Task**: t2
- **Action**: a2
- **Result**: r2
>[!top] [Back to top](#Table%20of%20Contents)

### 3. Three
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 4. Four
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 5. Five
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 6. Six
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 7. Seven
- **Question**: q
- **Situation**: s
- **Response**: not a STAR task line
>[!top] [Back to top](#Table%20of%20Contents)

### 8. Eight
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 9. Nine
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 10. Ten
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 11. Eleven
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

### 12. Twelve
- **Question**: q
- **Situation**: s
- **Task**: t
- **Action**: a
- **Result**: r
>[!top] [Back to top](#Table%20of%20Contents)

## Case Study Responses
`;

		const r = extractStarStoriesFromMarkdown(md);
		expect(r.ok).toBe(true);
		if (!r.ok) {
			return;
		}
		expect(r.markdown).toContain('- **Result:** outcome with [[link]]');
		expect(r.markdown).toContain('- **Response**: not a STAR task line');
		expect(r.markdown).not.toContain('Cagan');
	});

	test('extractStarStoriesFromMarkdown fails when section count is not 12', () => {
		let body = '## STAR Stories\n\n';
		for (let n = 1; n <= 3; n++) {
			body += `### ${n}. Only\n`;
			body += `- **Question**: q\n>[!top] [Back to top](#Table%20of%20Contents)\n\n`;
		}
		body += '## Case Study Responses\n';

		const r = extractStarStoriesFromMarkdown(body);
		expect(r.ok).toBe(false);
		if (r.ok) {
			return;
		}
		expect(r.errors.some(e => e.includes('found 3'))).toBe(true);
	});

	test('extractStarStoriesFromMarkdown succeeds when Result bullet omitted but body remains before delimiter', () => {
		const titles = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
		];
		let body = '## STAR Stories\n\n';
		for (let i = 0; i < titles.length; i++) {
			const n = i + 1;
			body += `### ${n}. ${titles[i]}\n`;
			body += `- **Question**: q\n`;
			body += `- **Situation**: s\n`;
			body += `- **Task**: t\n`;
			body += `- **Action**: a\n`;
			if (n !== 5) {
				body += `- **Result**: r\n`;
			} else {
				body += 'Raw paragraph when Result was forgotten.\n';
			}
			body += '>[!top] [Back to top](#Table%20of%20Contents)\n\n';
		}
		body += '## Case Study Responses\n';

		const r = extractStarStoriesFromMarkdown(body);
		expect(r.ok).toBe(true);
		if (!r.ok) {
			return;
		}
		expect(r.markdown).toContain('Raw paragraph when Result was forgotten.');
	});
});
