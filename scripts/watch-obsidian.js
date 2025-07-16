#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OBSIDIAN_VAULT_PATH =
	process.env.OBSIDIAN_PATH ||
	'C:/Users/bangs/Documents/Coding Projects/Obsidian-Backups/Obsidian-Personal-Notes/Personal Notes';
const WATCH_INTERVAL = 30000; // 30 seconds
const DEBOUNCE_DELAY = 5000; // 5 seconds

let lastSyncTime = 0;
let syncInProgress = false;
let fileChangeDetected = false;

console.log('👀 Starting Obsidian Watch Mode...');
console.log('📁 Watching:', OBSIDIAN_VAULT_PATH);
console.log('⏱️  Check interval:', WATCH_INTERVAL + 'ms');
console.log('🔄 Debounce delay:', DEBOUNCE_DELAY + 'ms');

// Check if files have changed since last sync
function hasFilesChanged() {
	try {
		const stats = fs.statSync(OBSIDIAN_VAULT_PATH);
		const lastModified = stats.mtime.getTime();

		if (lastModified > lastSyncTime) {
			console.log('📝 File changes detected');
			return true;
		}

		return false;
	} catch (error) {
		console.error('❌ Error checking file changes:', error.message);
		return false;
	}
}

// Run the sync script
function runSync() {
	if (syncInProgress) {
		console.log('⏳ Sync already in progress, skipping...');
		return;
	}

	syncInProgress = true;
	console.log('🔄 Running sync...');

	try {
		execSync('node scripts/sync-production.js', {
			cwd: path.join(__dirname, '..'),
			stdio: 'inherit',
		});

		lastSyncTime = Date.now();
		fileChangeDetected = false;
		console.log('✅ Sync completed');
	} catch (error) {
		console.error('❌ Sync failed:', error.message);
	} finally {
		syncInProgress = false;
	}
}

// Main watch loop
function watchLoop() {
	if (hasFilesChanged()) {
		fileChangeDetected = true;

		// Debounce the sync
		setTimeout(() => {
			if (fileChangeDetected) {
				runSync();
			}
		}, DEBOUNCE_DELAY);
	}
}

// Start watching
console.log('🚀 Watch mode started. Press Ctrl+C to stop.');
setInterval(watchLoop, WATCH_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', () => {
	console.log('\n👋 Stopping watch mode...');
	process.exit(0);
});
