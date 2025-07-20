#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { SCRIPTS_PATH, SPACING_LEVEL_1 } from './config.js';

// Functions to track with their expected names
const FUNCTIONS_TO_TRACK = [
	'processMarkdownFile',
	'processObsidianLinksInContentOnly',
	'extractSectionsToFrontmatter',
];

function findFunctionLine(filePath, functionName) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		const lines = content.split('\n');

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			// Look for function declarations
			if (
				line.includes(`function ${functionName}`) ||
				line.includes(`const ${functionName}`) ||
				line.includes(`let ${functionName}`)
			) {
				return i + 1; // Line numbers are 1-indexed
			}
		}
		return null;
	} catch (error) {
		console.error(
			SPACING_LEVEL_1 + `Error reading ${filePath}:`,
			error.message
		);
		return null;
	}
}

function updateReadmeLinks() {
	const syncJsPath = path.join(process.cwd(), SCRIPTS_PATH, 'sync.js');
	const readmePath = path.join(process.cwd(), 'README.md');

	if (!fs.existsSync(syncJsPath)) {
		console.error(SPACING_LEVEL_1 + 'sync.js not found');
		return;
	}

	if (!fs.existsSync(readmePath)) {
		console.error(SPACING_LEVEL_1 + 'README.md not found');
		return;
	}

	let readmeContent = fs.readFileSync(readmePath, 'utf8');
	let updated = false;

	// Update each function link
	for (const funcName of FUNCTIONS_TO_TRACK) {
		const lineNumber = findFunctionLine(syncJsPath, funcName);

		if (lineNumber) {
			// Create the new link pattern
			const newLink = `([${funcName}()](./scripts/sync.js#L${lineNumber}))`;

			// Find and replace the old link pattern
			const oldPattern = new RegExp(
				`\\(\\[${funcName}\\(\\)\\]\\(\\./scripts/sync\\.js#L\\d+\\)\\)`,
				'g'
			);

			if (oldPattern.test(readmeContent)) {
				readmeContent = readmeContent.replace(oldPattern, newLink);
				console.log(
					SPACING_LEVEL_1 + `✅ Updated ${funcName} link to line ${lineNumber}`
				);
				updated = true;
			} else {
				console.log(
					SPACING_LEVEL_1 + `⚠️  No existing link found for ${funcName}`
				);
			}
		} else {
			console.log(
				SPACING_LEVEL_1 + `❌ Function ${funcName} not found in sync.js`
			);
		}
	}

	if (updated) {
		fs.writeFileSync(readmePath, readmeContent, 'utf8');
		console.log(
			SPACING_LEVEL_1 + '📝 README.md updated with new function links'
		);
	} else {
		console.log(SPACING_LEVEL_1 + 'ℹ️  No updates needed');
	}
}

// Run the update
updateReadmeLinks();
