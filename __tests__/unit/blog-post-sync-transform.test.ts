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

	test('deriveBlogBaseSlugFromFilename removes date prefix then kebab-cases', async () => {
		const mod = await import('../../scripts/blog-post-sync-transform.cjs');
		const transformer = mod.default ?? mod;
		const { deriveBlogBaseSlugFromFilename } = transformer;

		expect(deriveBlogBaseSlugFromFilename('20260320 Second Post.md')).toBe(
			'second-post'
		);
		expect(deriveBlogBaseSlugFromFilename('Blog Welcome.md')).toBe(
			'blog-welcome'
		);
	});

	test('resolveUniqueSlug appends -2, -3 for collisions', async () => {
		const mod = await import('../../scripts/blog-post-sync-transform.cjs');
		const transformer = mod.default ?? mod;
		const { resolveUniqueSlug } = transformer;

		const counts = new Map();
		expect(resolveUniqueSlug('second-post', counts)).toBe('second-post');
		expect(resolveUniqueSlug('second-post', counts)).toBe('second-post-2');
		expect(resolveUniqueSlug('second-post', counts)).toBe('second-post-3');
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

		const destination = transformObsidianBlogMarkdown(sourceMarkdown, 'welcome');

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
		expect(frontmatter).toContain('slug: "welcome"');
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

	test('transform converts wikilinks in the body to links/spans', async () => {
		const mod = await import('../../scripts/blog-post-sync-transform.cjs');
		const transformer = mod.default ?? mod;
		const { transformObsidianBlogMarkdown } = transformer;

		const sourceMarkdown = `---
blog-layout: /src/layouts/MarkdownPostLayout.astro
blog-author: "[[Luke Bangs]]"
blog-description: Test description
blog-image-url: https://example.com/test.png
blog-image-alt: Test image
blog-pubDate: 2026-03-10
blog-topics:
  - "#welcome"
---

# Welcome
Check [[Homepage Website]] and [[Homepage Website|Homepage]] and [[Non Existent Project]] and [[Non Existent Project|alt]].
`;

		const destination = transformObsidianBlogMarkdown(sourceMarkdown, 'welcome');

		const match = destination.match(/^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/);
		expect(match).not.toBeNull();
		if (!match) return;

		const body = match[2];

		expect(body).toContain(
			'<a href="/projects/homepage-website" class="theme-link">Homepage Website</a>'
		);
		expect(body).toContain(
			'<a href="/projects/homepage-website" class="theme-link">Homepage</a>'
		);
		expect(body).toContain(
			'<span class="theme-link">Non Existent Project</span>'
		);
		expect(body).toContain('<span class="theme-link">alt</span>');

		expect(body).not.toContain('[[Homepage Website]]');
		expect(body).not.toContain('[[Non Existent Project]]');
	});
});

