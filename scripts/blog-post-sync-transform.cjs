/**
 * Pure transformer for converting Obsidian "blog" notes to Astro blog post files.
 *
 * Implemented as CommonJS so Jest can load it in this repo's test setup.
 */

function extractFrontmatterAndBody(markdown) {
	const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (!match) {
		return { frontmatter: '', body: markdown ?? '' };
	}

	return {
		frontmatter: match[1] ?? '',
		body: match[2] ?? '',
	};
}

function stripWrappingQuotes(value) {
	const v = (value ?? '').trim();
	if (
		(v.startsWith('"') && v.endsWith('"')) ||
		(v.startsWith("'") && v.endsWith("'"))
	) {
		return v.slice(1, -1);
	}
	return v;
}

/**
 * Obsidian internal links like `[[Luke Bangs]]` -> `Luke Bangs`.
 * Intentionally only strips double-square-bracket wrappers.
 */
function stripObsidianDoubleBrackets(value) {
	if (value == null) return '';
	return String(value).replace(/\[\[/g, '').replace(/\]\]/g, '');
}

function escapeYamlDoubleQuotes(value) {
	return String(value ?? '').replace(/"/g, '\\"');
}

function findFirstH1(body) {
	// "first # ..." anywhere in the body, not necessarily at the top.
	const match = (body ?? '').match(/^#\s+(.+?)\s*$/m);
	if (!match) return null;
	return match[1];
}

function removeFirstH1FromBody(body) {
	const h1Regex = /^#\s+.+?\s*$/m;
	const match = (body ?? '').match(h1Regex);
	if (!match) return body ?? '';
	return (body ?? '')
		.replace(h1Regex, '')
		.replace(/^\s*\n/, '')
		.trimStart();
}

function getScalarFromFrontmatter(frontmatter, key) {
	// Capture a single-line scalar.
	// Examples:
	// - blog-pubDate: 2026-03-19
	// - blog-author: "[[Luke Bangs]]"
	// - blog-description: Welcome...
	const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm');
	const match = frontmatter.match(re);
	if (!match) return null;
	return stripWrappingQuotes(match[1]);
}

function getYamlListFromFrontmatter(frontmatter, key) {
	// Supports block lists like:
	// blog-topics:
	//   - "#welcome"
	//   - "[[Astro]]"
	// and simple empty case (`blog-topics:` with no subsequent `- ...` lines).

	const lines = frontmatter.split(/\r?\n/);
	const keyLineIndex = lines.findIndex(line =>
		line.match(new RegExp(`^${key}:\\s*(.*)$`))
	);
	if (keyLineIndex === -1) return [];

	const keyLine = lines[keyLineIndex] ?? '';
	const inlineValue = keyLine.split(':').slice(1).join(':').trim();

	// If it's an inline YAML array: key: ["a", "b"]
	if (inlineValue.startsWith('[')) {
		const inline = inlineValue;
		try {
			// eslint-disable-next-line no-new-func
			return Function(`"use strict"; return (${inline});`)();
		} catch {
			return [];
		}
	}

	const values = [];

	// Parse subsequent `- ...` lines until we hit another non-list line.
	for (let i = keyLineIndex + 1; i < lines.length; i++) {
		const line = lines[i] ?? '';

		// Next key starts -> stop
		if (/^\s*[a-zA-Z0-9_-]+\s*:/.test(line)) break;

		const listMatch = line.match(/^\s*-\s*(.+?)\s*$/);
		if (!listMatch) break;

		values.push(stripWrappingQuotes(listMatch[1]));
	}

	return values;
}

function buildFrontmatterMarkdownOnly({
	layout,
	destTitle,
	author,
	description,
	image,
	pubDate,
	topics,
}) {
	const frontmatterLines = [];
	frontmatterLines.push(`layout: ${layout}`);
	frontmatterLines.push(`title: "${escapeYamlDoubleQuotes(destTitle)}"`);
	frontmatterLines.push(`author: "${escapeYamlDoubleQuotes(author)}"`);
	frontmatterLines.push(
		`description: "${escapeYamlDoubleQuotes(description)}"`
	);

	if (image?.url) {
		frontmatterLines.push('image:');
		frontmatterLines.push(`  url: "${escapeYamlDoubleQuotes(image.url)}"`);
		frontmatterLines.push(
			`  alt: "${escapeYamlDoubleQuotes(image.alt ?? '')}"`
		);
	}

	frontmatterLines.push(`pubDate: ${pubDate ?? ''}`);

	const topicsArray = Array.isArray(topics) ? topics : [];
	frontmatterLines.push(
		`topics: [${topicsArray
			.map(t => `"${escapeYamlDoubleQuotes(t)}"`)
			.join(', ')}]`
	);

	return frontmatterLines.join('\n');
}

function getBlogDestinationFilename(sourceFilename) {
	// Remove exactly the first 9 characters (date ordering prefix + trailing space).
	if (!sourceFilename) return '';
	if (sourceFilename.length <= 9) return sourceFilename;
	return sourceFilename.slice(9);
}

/**
 * Transform an Obsidian markdown note into an Astro blog post markdown file.
 * @param {string} sourceMarkdown
 */
function transformObsidianBlogMarkdown(sourceMarkdown) {
	const { frontmatter, body } = extractFrontmatterAndBody(sourceMarkdown ?? '');

	const rawTitle = findFirstH1(body) ?? '';
	const destTitle = stripObsidianDoubleBrackets(rawTitle).trim();
	let destBody = removeFirstH1FromBody(body ?? '');

	// Every blog note includes a standardized Obsidian "back" callout immediately
	// after the H1. It's not needed on the rendered site.
	// Example: `> [!back] Link back to [[Portfolio Blog Notes]]`
	destBody = destBody.replace(/^>\s*\[!back\][^\r\n]*\r?\n?/, '').trimStart();

	const layout = getScalarFromFrontmatter(frontmatter, 'blog-layout') ?? '';
	const authorRaw =
		getScalarFromFrontmatter(frontmatter, 'blog-author') ?? '';
	const descriptionRaw =
		getScalarFromFrontmatter(frontmatter, 'blog-description') ?? '';
	const imageUrl =
		getScalarFromFrontmatter(frontmatter, 'blog-image-url') ?? '';
	const imageAlt =
		getScalarFromFrontmatter(frontmatter, 'blog-image-alt') ?? '';
	const pubDate = getScalarFromFrontmatter(frontmatter, 'blog-pubDate') ?? '';

	const rawTopics = getYamlListFromFrontmatter(frontmatter, 'blog-topics');

	const author = stripObsidianDoubleBrackets(authorRaw);
	const description = stripObsidianDoubleBrackets(descriptionRaw);
	const topics = rawTopics.map(t => stripObsidianDoubleBrackets(t));

	const destImage =
		imageUrl && imageAlt
			? { url: imageUrl, alt: imageAlt }
			: imageUrl
				? { url: imageUrl, alt: imageAlt }
				: null;

	const frontmatterMarkdown = buildFrontmatterMarkdownOnly({
		layout,
		destTitle,
		author,
		description,
		image: destImage,
		pubDate,
		topics,
	});

	return `---\n${frontmatterMarkdown}\n---\n\n${destBody}`;
}

module.exports = {
	getBlogDestinationFilename,
	transformObsidianBlogMarkdown,
};

