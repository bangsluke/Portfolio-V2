/**
 * Builds netlify/functions/umami-report-content.json for the weekly Umami email:
 * project slug → portfolioOrder, blog slug → pubDate (ISO date string).
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const projectsDir = path.join(root, 'src', 'content', 'projects');
const blogPostsDir = path.join(root, 'src', 'pages', 'blog', 'posts');
const outDir = path.join(root, 'netlify', 'functions');
const outFile = path.join(outDir, 'umami-report-content.json');

function nameToSlug(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

function parseFrontmatter(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	return m ? m[1] : '';
}

function parseScalarLine(fm, key) {
	const re = new RegExp(`^${key}:\\s*(.*)$`, 'm');
	const match = fm.match(re);
	if (!match) return null;
	let v = match[1].trim();
	if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
		v = v.slice(1, -1);
	return v || null;
}

async function* walkMarkdownFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) yield* walkMarkdownFiles(full);
		else if (e.name.endsWith('.md')) yield full;
	}
}

async function buildProjectSlugToOrder() {
	const map = {};
	for await (const filePath of walkMarkdownFiles(projectsDir)) {
		const raw = await readFile(filePath, 'utf8');
		const fm = parseFrontmatter(raw);
		const baseName = path.basename(filePath).replace(/\.md$/i, '');
		const slug = nameToSlug(baseName);
		const poLine = fm.match(/^portfolioOrder:\s*(\d+)\s*$/m);
		map[slug] = poLine ? Number(poLine[1]) : null;
	}
	return map;
}

async function buildBlogSlugToPubDate() {
	const map = {};
	for await (const filePath of walkMarkdownFiles(blogPostsDir)) {
		const raw = await readFile(filePath, 'utf8');
		const fm = parseFrontmatter(raw);
		const slug = parseScalarLine(fm, 'slug');
		const pubDate = parseScalarLine(fm, 'pubDate');
		if (slug && pubDate) map[slug] = pubDate;
	}
	return map;
}

async function main() {
	const [projectSlugToOrder, blogSlugToPubDate] = await Promise.all([
		buildProjectSlugToOrder(),
		buildBlogSlugToPubDate(),
	]);
	await mkdir(outDir, { recursive: true });
	await writeFile(
		outFile,
		JSON.stringify({ projectSlugToOrder, blogSlugToPubDate }, null, 0) + '\n',
		'utf8'
	);
	console.log('Wrote', path.relative(root, outFile));
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
