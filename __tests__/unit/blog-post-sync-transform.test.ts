describe('blog-post-sync-transform', () => {
	test('getBlogDestinationFilename slices first 9 characters', async () => {
		const mod = await import('../../scripts/blog-post-sync-transform.cjs');
		const transformer = mod.default ?? mod;

		expect(transformer.getBlogDestinationFilename('10032026 Welcome.md')).toBe(
			'Welcome.md'
		);
		expect(transformer.getBlogDestinationFilename('123456789Title.md')).toBe(
			'Title.md'
		);
	});

	test('transform maps blog-* frontmatter keys, derives title from first H1, and removes that H1', async () => {
		const mod = await import('../../scripts/blog-post-sync-transform.cjs');
		const transformer = mod.default ?? mod;
		const { transformObsidianBlogMarkdown } = transformer;

		const sourceMarkdown = `---
tags:
  - blog
  - portfolio
blog-layout: /src/layouts/MarkdownPostLayout.astro
blog-author: "[[Luke Bangs]]"
blog-description: Welcome to my blog where I share my transition into Product.
blog-image-url: https://bangsluke-assets.netlify.app/images/blog-images/10032026 Welcome.png
blog-image-alt: Blog Launch
blog-pubDate: 2026-03-10
blog-topics:
  - "#welcome"
  - "#portfolio"
  - "[[Astro]]"
---

# Welcome
> [!back] Link back to [[Portfolio Blog Notes]]
This is the post body.
`;

		const destination = transformObsidianBlogMarkdown(sourceMarkdown);

		const match = destination.match(/^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/);
		expect(match).not.toBeNull();
		if (!match) return;

		const frontmatter = match[1];
		const body = match[2];

		// Frontmatter mapping
		expect(frontmatter).toContain(
			'layout: /src/layouts/MarkdownPostLayout.astro'
		);
		expect(frontmatter).toContain('title: "Welcome"');
		expect(frontmatter).toContain('author: "Luke Bangs"');
		expect(frontmatter).toContain(
			'description: "Welcome to my blog where I share my transition into Product."'
		);
		expect(frontmatter).toContain(
			'url: "https://bangsluke-assets.netlify.app/images/blog-images/10032026 Welcome.png"'
		);
		expect(frontmatter).toContain('alt: "Blog Launch"');
		expect(frontmatter).toContain('pubDate: 2026-03-10');
		expect(frontmatter).toContain(
			'topics: ["#welcome", "#portfolio", "Astro"]'
		);

		// Body should have the first H1 removed
		expect(body).not.toContain('# Welcome');
		expect(body.trim()).toBe('This is the post body.');
	});
});

