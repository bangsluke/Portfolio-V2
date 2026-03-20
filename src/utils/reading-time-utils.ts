export const DEFAULT_READING_WPM = 200;

function stripContentToText(input: string): string {
	if (!input) return '';

	let text = input;

	// Remove fenced code blocks entirely.
	text = text.replace(/```[\s\S]*?```/g, ' ');

	// Keep inline code content but drop the backticks.
	text = text.replace(/`([^`]+)`/g, '$1');

	// Images: keep alt text.
	text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1 ');

	// Links: keep label text.
	text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

	// Drop HTML tags.
	text = text.replace(/<[^>]*>/g, ' ');

	// Drop common markdown syntax punctuation.
	text = text.replace(/[>#*_~\-+]/g, ' ');

	// Collapse whitespace.
	return text.replace(/\s+/g, ' ').trim();
}

function countWords(text: string): number {
	if (!text) return 0;
	const matches = text.match(/\b[\w']+\b/g);
	return matches ? matches.length : 0;
}

export function estimateReadingTimeMinutesFromWords(
	words: number,
	readingWpm: number = DEFAULT_READING_WPM,
): number {
	if (!Number.isFinite(words) || words <= 0) return 1;
	if (!Number.isFinite(readingWpm) || readingWpm <= 0) readingWpm = DEFAULT_READING_WPM;
	return Math.max(1, Math.ceil(words / readingWpm));
}

export function formatReadingTimeLabel(minutes: number): string {
	const safeMinutes = Number.isFinite(minutes) ? minutes : 1;
	return safeMinutes === 1 ? '1 minute read' : `${safeMinutes} minutes read`;
}

export function estimateReadingTimeLabelFromHtml(
	html: string,
	readingWpm: number = DEFAULT_READING_WPM,
): string {
	const text = stripContentToText(html);
	const words = countWords(text);
	const minutes = estimateReadingTimeMinutesFromWords(words, readingWpm);
	return formatReadingTimeLabel(minutes);
}

/**
 * Attempts to compute reading time from a Markdown module (Astro Markdown pages imported via `import.meta.glob`).
 * Falls back to `frontmatter.description` when render output is not available.
 */
export async function estimateReadingTimeLabelForPostModule(
	postModule: any,
	readingWpm: number = DEFAULT_READING_WPM,
): Promise<string | null> {
	if (!postModule) return null;

	// Astro Markdown modules commonly expose `rawContent` which is the original Markdown text.
	// Using it avoids relying on `render()` internals/shape differences.
	const rawContent = postModule?.rawContent;
	if (typeof rawContent === 'string' && rawContent.trim().length > 0) {
		return estimateReadingTimeLabelFromHtml(rawContent, readingWpm);
	}

	let html: unknown;
	try {
		if (typeof postModule.render === 'function') {
			const rendered = await postModule.render();
			html =
				rendered?.html ??
				rendered?.default?.html ??
				rendered?.body ??
				rendered?.default?.body;
		} else {
			html =
				postModule?.html ??
				postModule?.body ??
				postModule?.content ??
				postModule?.default?.html ??
				postModule?.default?.body ??
				postModule?.default?.content;
		}
	} catch {
		// If render fails for any reason, we'll fall back below.
		html = undefined;
	}

	if (typeof html === 'string' && html.trim().length > 0) {
		return estimateReadingTimeLabelFromHtml(html, readingWpm);
	}

	const fallback =
		(postModule?.frontmatter?.description as string | undefined) ??
		(postModule?.frontmatter?.content as string | undefined) ??
		(postModule?.frontmatter?.title as string | undefined);

	if (typeof fallback === 'string' && fallback.trim().length > 0) {
		return estimateReadingTimeLabelFromHtml(fallback, readingWpm);
	}

	return null;
}

