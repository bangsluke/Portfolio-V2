'use strict';

const EXPECTED_SECTIONS = 12;

const STAR_REGION_RE =
	/^##\s+STAR Stories\s*\n([\s\S]*?)(?=^##\s+Case Study Responses\s*$)/m;

/**
 * End-of-section markers: drop Cagan lens blocks and Obsidian back-to-top callouts.
 * Matches user note: `> **Cagan's Four Risks...` and `>[!top] [Back to top](#Table%20of%20Contents)`.
 * @param {string} line
 */
function isSectionDelimiterLine(line) {
	const s = line.trimStart();
	if (!s.startsWith('>')) {
		return false;
	}
	if (s.includes('Cagan') && s.includes('Four Risks')) {
		return true;
	}
	if (/\>\s*\[!top\]/.test(s) && s.includes('Back to top')) {
		return true;
	}
	return false;
}

/**
 * Lines after ### title until first delimiter (exclusive). If none, rest of chunk.
 * @param {string[]} lines full section chunk split by \n, first line is ### title
 */
function extractSectionBodyLines(lines) {
	if (lines.length <= 1) {
		return [];
	}
	const body = lines.slice(1);
	for (let i = 0; i < body.length; i++) {
		if (isSectionDelimiterLine(body[i])) {
			return body.slice(0, i);
		}
	}
	return body;
}

/**
 * @param {string} fullMarkdown
 */
function extractStarStoriesFromMarkdown(fullMarkdown) {
	const regionMatch = fullMarkdown.match(STAR_REGION_RE);
	if (!regionMatch) {
		return {
			ok: false,
			errors: [
				'Could not find region between "## STAR Stories" and "## Case Study Responses".',
			],
		};
	}

	const region = regionMatch[1].trimEnd();
	const chunks = region.split(/(?=^###\s+\d+\.\s+)/m);
	const sections = chunks
		.map(c => c.trimStart())
		.filter(c => /^###\s+\d+\.\s+/.test(c));

	if (sections.length !== EXPECTED_SECTIONS) {
		return {
			ok: false,
			errors: [
				`Expected ${EXPECTED_SECTIONS} STAR sections (### headings), found ${sections.length}.`,
			],
		};
	}

	const titles = [];
	const builtSections = [];
	const errors = [];

	for (let i = 0; i < sections.length; i++) {
		const chunk = sections[i];
		const lines = chunk.split(/\r?\n/);
		const titleLine = lines[0].replace(/\s+$/, '');
		const titleMatch = titleLine.match(/^###\s+(\d+)\.\s+(.+)$/);
		if (!titleMatch) {
			errors.push(`Section ${i + 1}: invalid ### title line.`);
			continue;
		}
		titles.push(titleLine);
		const bodyLines = extractSectionBodyLines(lines);
		const bodyText = bodyLines.join('\n').replace(/\s+$/, '');
		builtSections.push({ titleLine, bodyText });
	}

	if (errors.length > 0) {
		return { ok: false, errors };
	}

	if (builtSections.length !== EXPECTED_SECTIONS) {
		return {
			ok: false,
			errors: [
				`Expected ${EXPECTED_SECTIONS} valid STAR sections after parsing, found ${builtSections.length}.`,
			],
		};
	}

	let md = '## STAR Stories\n\n';
	for (const { titleLine, bodyText } of builtSections) {
		md += `${titleLine}\n\n`;
		if (bodyText.length > 0) {
			md += `${bodyText}\n\n`;
		}
	}

	return {
		ok: true,
		markdown: `${md.trimEnd()}\n`,
		sectionCount: builtSections.length,
		sectionTitles: titles,
	};
}

module.exports = {
	EXPECTED_SECTIONS,
	extractStarStoriesFromMarkdown,
	isSectionDelimiterLine,
};
