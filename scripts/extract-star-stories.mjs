#!/usr/bin/env node

/**
 * Extract STAR story blocks from the interview prep Obsidian note into
 * src/content/star-stories/star-stories.md (generated for downstream use).
 */

import { createRequire } from 'module';
import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const require = createRequire(import.meta.url);
const { extractStarStoriesFromMarkdown } = require('./extract-star-stories-pure.cjs');

export { extractStarStoriesFromMarkdown };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTE_SEGMENTS = [
	'01 Notes',
	'02 Areas',
	'Work Notes',
	'Career Notes',
	'Interview Notes',
	'Interview Preparation and Prompt.md',
];

/** Same default vault root as scripts/watch-obsidian.js */
const WATCH_OBSIDIAN_FALLBACK =
	'C:/Users/bangs/Documents/Coding Projects/Obsidian-Backups/Obsidian-Personal-Notes/Personal Notes';

/**
 * @param {string | undefined} cliVaultOverride --vault value if present
 */
export function resolveVaultPathForStarExtract(cliVaultOverride) {
	if (cliVaultOverride) {
		return cliVaultOverride;
	}
	if (process.env.OBSIDIAN_PATH) {
		return process.env.OBSIDIAN_PATH;
	}
	return WATCH_OBSIDIAN_FALLBACK;
}

export function interviewPrepNoteAbsolutePath(vaultPath) {
	return path.join(vaultPath, ...NOTE_SEGMENTS);
}

/**
 * @param {{ vaultPath: string, repoRoot?: string }} opts
 */
export async function extractStarStoriesToContext({ vaultPath, repoRoot }) {
	const root = repoRoot ?? path.join(__dirname, '..');
	const notePath = interviewPrepNoteAbsolutePath(vaultPath);
	let raw;
	try {
		raw = await fs.readFile(notePath, 'utf8');
	} catch (e) {
		if (e && e.code === 'ENOENT') {
			return {
				ok: false,
				errors: [`Interview prep note not found:\n${notePath}`],
			};
		}
		throw e;
	}

	const result = extractStarStoriesFromMarkdown(raw);
	if (!result.ok) {
		return result;
	}

	const outDir = path.join(root, 'src', 'content', 'star-stories');
	const outFile = path.join(outDir, 'star-stories.md');
	await fs.mkdir(outDir, { recursive: true });
	await fs.writeFile(outFile, result.markdown, 'utf8');

	return {
		ok: true,
		sectionCount: result.sectionCount,
		sectionTitles: result.sectionTitles,
		destination: outFile,
		sourceNotePath: notePath,
	};
}

function parseCliVault() {
	const args = process.argv.slice(2);
	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--vault' && args[i + 1]) {
			return args[i + 1];
		}
	}
	return undefined;
}

async function runCli() {
	dotenv.config({ path: path.join(__dirname, '../.env') });
	const vault = resolveVaultPathForStarExtract(parseCliVault());
	if (!fsSync.existsSync(vault)) {
		console.error('❌ Obsidian vault path does not exist:', vault);
		process.exit(1);
	}
	const repoRoot = path.join(__dirname, '..');
	const r = await extractStarStoriesToContext({ vaultPath: vault, repoRoot });
	if (!r.ok) {
		console.error('❌ STAR stories extraction failed:\n' + r.errors.join('\n'));
		process.exit(1);
	}
	console.log('✅ STAR stories:', r.sectionCount, 'sections');
	console.log('   Source:', r.sourceNotePath);
	console.log('   Wrote:', r.destination);
	console.log('   Titles:');
	for (const t of r.sectionTitles) {
		console.log('   -', t.replace(/^###\s+/, ''));
	}
}

const invokedDirectly =
	process.argv[1] &&
	path.resolve(process.argv[1]) === path.resolve(__filename);

if (invokedDirectly) {
	runCli().catch(err => {
		console.error(err);
		process.exit(1);
	});
}
