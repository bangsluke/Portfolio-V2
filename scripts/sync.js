#!/usr/bin/env node

import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { emailService } from './email-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file (absolute path to ensure it's found)
const envPath = path.join(__dirname, '../.env');
console.log('🔍 Looking for .env file at:', envPath);
dotenv.config({ path: envPath });

// Configuration
const OBSIDIAN_VAULT_PATH = process.env.OBSIDIAN_PATH;
const ASTRO_CONTENT_PATH = path.join(__dirname, '../src/content');
const ERROR_LOG_PATH = path.join(__dirname, '../sync-errors.json');

// Sync mode configuration
const SYNC_MODE = process.env.SYNC_MODE || 'development'; // 'development', 'production', 'mobile'
const EMAIL_NOTIFICATIONS = process.env.EMAIL_NOTIFICATIONS === 'true';
const AUTO_DEPLOY = process.env.AUTO_DEPLOY === 'true';
const DEBUG_MODE = process.env.DEBUG === 'true';

// Add spacings for console log messages
const SPACING_LEVEL_1 = ' '.repeat(2);
const SPACING_LEVEL_2 = ' '.repeat(4);
const SPACING_LEVEL_3 = ' '.repeat(6);

// Validate OBSIDIAN_PATH
if (!OBSIDIAN_VAULT_PATH) {
	console.error('❌ OBSIDIAN_PATH environment variable is not set!');
	console.error(
		SPACING_LEVEL_1 +
			'Please set OBSIDIAN_PATH in your .env file to the path of your Obsidian vault.'
	);
	console.error(SPACING_LEVEL_1 + 'Expected .env file location:', envPath);
	console.error(
		'Available environment variables:',
		Object.keys(process.env).filter(
			key =>
				key.includes('OBSIDIAN') ||
				key.includes('EMAIL') ||
				key.includes('PORTFOLIO')
		)
	);
	process.exit(1);
}

// Check if the Obsidian vault path exists
if (!fs.existsSync(OBSIDIAN_VAULT_PATH)) {
	console.error('❌ Obsidian vault path does not exist:', OBSIDIAN_VAULT_PATH);
	console.error(
		SPACING_LEVEL_1 + 'Please check your OBSIDIAN_PATH in the .env file.'
	);
	process.exit(1);
}

// Folder mapping based on tags
const FOLDER_MAPPING = {
	project: 'projects',
	company: 'companies',
	client: 'clients',
	skill: 'skills',
	role: 'roles',
	education: 'educations',
	reference: 'references',
};

// Protected items that should never be deleted or overwritten
const PROTECTED_ITEMS = ['staticData', 'config.ts', 'allStaticData.json'];

// Cache for project name to slug mappings
let projectNameToSlugCache = null;

// Extract content between specific markdown sections
function extractSectionContent(content, sectionName, endMarker) {
	const sectionRegex = new RegExp(
		`##\\s*${sectionName}\\s*\\n([\\s\\S]*?)(?=\\s*${endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
		'i'
	);

	const match = content.match(sectionRegex);
	if (match && match[1]) {
		// Clean up the extracted content
		return match[1]
			.trim()
			.replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
			.replace(/\s+$/gm, '') // Remove trailing whitespace from each line
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'); // Convert markdown links to HTML (keep Obsidian links for processing)
	}
	return null;
}

// Extract sections and add to frontmatter based on content type
function extractSectionsToFrontmatter(content, contentType) {
	// Define sections to extract based on content type
	const sectionsToExtract = [
		// Role-specific sections
		{
			name: 'Role Description',
			property: 'roleDescription',
			contentType: 'role',
		},
		{
			name: 'Key Achievement',
			property: 'keyAchievement',
			contentType: 'role',
		},

		// Project-specific sections
		{
			name: 'Short Description',
			property: 'shortDescription',
			contentType: 'project',
		},
		{
			name: 'Long Description',
			property: 'longDescription',
			contentType: 'project',
		},
		{
			name: 'Lessons Learned',
			property: 'lessonsLearned',
			contentType: 'project',
		},

		// Education-specific sections
		{
			name: 'Qualifications',
			property: 'qualifications',
			contentType: 'education',
		},
		{
			name: 'Additional Details',
			property: 'additionalDetails',
			contentType: 'education',
		},

		// Company-specific sections
		{
			name: 'Company Description',
			property: 'companyDescription',
			contentType: 'company',
		},
		{
			name: 'Key Achievement',
			property: 'keyAchievement',
			contentType: 'company',
		},
	];

	const extractedData = {};
	const endMarker = '>[!top] [Back to top](#Table%20of%20Contents)';

	// Extract content from each section that matches the content type
	sectionsToExtract.forEach(
		({ name, property, contentType: sectionContentType }) => {
			if (sectionContentType === contentType) {
				const sectionContent = extractSectionContent(content, name, endMarker);
				if (sectionContent) {
					extractedData[property] = sectionContent;
					if (DEBUG_MODE) {
						console.log(
							SPACING_LEVEL_3 +
								`📝 Extracted ${property} for ${contentType}: ${sectionContent.substring(0, 50)}...`
						);
					}
				}
			}
		}
	);

	// If we found any sections, add them to frontmatter
	if (Object.keys(extractedData).length > 0) {
		// Find the frontmatter section
		const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

		if (frontmatterMatch) {
			const existingFrontmatter = frontmatterMatch[1];
			const newFrontmatterLines = [];

			// Parse existing frontmatter to check for duplicates
			const existingFields = new Set();
			const existingLines = existingFrontmatter.split('\n');

			existingLines.forEach(line => {
				const trimmedLine = line.trim();
				if (trimmedLine && !trimmedLine.startsWith('#')) {
					const colonIndex = trimmedLine.indexOf(':');
					if (colonIndex > 0) {
						const fieldName = trimmedLine.substring(0, colonIndex).trim();
						existingFields.add(fieldName);
					}
				}
				newFrontmatterLines.push(line);
			});

			// Add extracted data as new frontmatter fields (only if they don't already exist)
			Object.entries(extractedData).forEach(([property, value]) => {
				if (!existingFields.has(property)) {
					// Escape any quotes in the value and wrap in quotes
					const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n');
					newFrontmatterLines.push(`${property}: "${escapedValue}"`);
					if (DEBUG_MODE) {
						console.log(
							SPACING_LEVEL_3 + `✅ Added ${property} to frontmatter`
						);
					}
				} else {
					if (DEBUG_MODE) {
						console.log(
							SPACING_LEVEL_3 +
								`⚠️  Skipped ${property} - already exists in frontmatter`
						);
					}
				}
			});

			// Replace the frontmatter section
			const newFrontmatter = newFrontmatterLines.join('\n');
			content = content.replace(
				/^---\s*\n([\s\S]*?)\n---\s*\n/,
				`---\n${newFrontmatter}\n---\n`
			);
		} else {
			// No existing frontmatter, create new one
			const frontmatterLines = [];
			Object.entries(extractedData).forEach(([property, value]) => {
				const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n');
				frontmatterLines.push(`${property}: "${escapedValue}"`);
			});

			const newFrontmatter = frontmatterLines.join('\n');
			content = `---\n${newFrontmatter}\n---\n\n${content}`;
		}
	}

	return content;
}

// Error tracking (for all modes)
let syncErrors = {
	timestamp: new Date().toISOString(),
	source: OBSIDIAN_VAULT_PATH,
	syncMode: SYNC_MODE,
	debugMode: DEBUG_MODE,
	errors: [],
	summary: {
		totalFiles: 0,
		processedFiles: 0,
		copiedFiles: 0,
		skippedFiles: 0,
		errors: 0,
	},
	success: false,
};

// Track skills with missing SVG files (warnings, not errors)
const missingSvgFiles = [];

console.log(`🚀 Starting ${SYNC_MODE.toUpperCase()} Obsidian Sync...`);
console.log('📁 Obsidian vault path:', OBSIDIAN_VAULT_PATH);
console.log('🎯 Astro content path:', ASTRO_CONTENT_PATH);
console.log('⚙️ Sync mode:', SYNC_MODE);
console.log(
	'📧 Email notifications:',
	EMAIL_NOTIFICATIONS ? 'enabled' : 'disabled'
);
console.log('🚀 Auto deploy:', AUTO_DEPLOY ? 'enabled' : 'disabled');
console.log('🐛 Debug mode:', DEBUG_MODE ? 'enabled' : 'disabled');

// Ensure content directories exist
function ensureDirectories() {
	Object.values(FOLDER_MAPPING).forEach(folder => {
		const folderPath = path.join(ASTRO_CONTENT_PATH, folder);
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
			console.log(`✅ Created directory: ${folderPath}`);
		}
	});

	// Ensure staticData directory exists and is protected
	const staticDataPath = path.join(ASTRO_CONTENT_PATH, 'staticData');
	if (!fs.existsSync(staticDataPath)) {
		fs.mkdirSync(staticDataPath, { recursive: true });
		console.log(`✅ Created protected directory: ${staticDataPath}`);
	}
}

// Parse frontmatter to extract tags
function parseFrontmatter(content) {
	const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
	if (!frontmatterMatch) return { tags: [] };

	const frontmatter = frontmatterMatch[1];
	const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*[^\n]+\n?)*)/);

	if (!tagsMatch) return { tags: [] };

	const tagsText = tagsMatch[1];
	const tags = tagsText
		.split('\n')
		.filter(line => line.trim().startsWith('-'))
		.map(line => line.trim().substring(1).trim())
		.filter(tag => tag.length > 0);

	return { tags };
}

// Determine target folder based on tags
function getTargetFolder(tags) {
	for (const tag of tags) {
		// Check for project/ prefix first
		if (tag.startsWith('project/')) {
			return 'projects';
		}

		// Check other mappings
		for (const [tagPrefix, folder] of Object.entries(FOLDER_MAPPING)) {
			if (tag === tagPrefix || tag.startsWith(tagPrefix + '/')) {
				return folder;
			}
		}
	}
	return null;
}

// Determine content type based on target folder
function getContentType(targetFolder) {
	const folderToTypeMap = {
		roles: 'role',
		projects: 'project',
		educations: 'education',
		companies: 'company',
		skills: 'skill',
		clients: 'client',
		references: 'reference',
	};
	return folderToTypeMap[targetFolder] || null;
}

// Process a markdown file
function processMarkdownFile(filePath, relativePath) {
	try {
		syncErrors.summary.totalFiles++;

		let content = fs.readFileSync(filePath, 'utf8');
		const { tags } = parseFrontmatter(content);

		if (DEBUG_MODE) {
			console.log(`📄 1. Processing: ${relativePath}`);
		}

		// Check if file has portfolio tag
		const portfolioTag = process.env.PORTFOLIO_TAG || 'portfolio';
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 2: Checking for portfolio tag '${portfolioTag}' and skipping if not found...`
			);
		}
		if (!tags.includes(portfolioTag)) {
			syncErrors.summary.skippedFiles++;
			return;
		}
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`✅ 2. Portfolio tag found. Tags found: ${tags.join(', ')}`
			);
		}

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 3: Determining target folder based on tags and skipping if not found...`
			);
		}
		const targetFolder = getTargetFolder(tags);
		if (!targetFolder) {
			syncErrors.summary.skippedFiles++;
			return;
		}
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`✅ 3. Target folder: ${targetFolder} and skipping if not found...`
			);
		}

		const fileName = path.basename(filePath);
		const targetPath = path.join(ASTRO_CONTENT_PATH, targetFolder, fileName);

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 4: Checking if file is protected and skipping if found...`
			);
		}
		// Check if target file is protected
		if (isProtected(fileName)) {
			syncErrors.summary.skippedFiles++;
			return;
		}

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 5: Removing Obsidian image references and skipping if not found...`
			);
		}
		// Filter out image references that could cause build errors
		content = content.replace(
			/!\[([^\]]*)\]\(#([^)]+)\)/g,
			(match, altText, imageName) => {
				return `<!-- Image removed during sync: ${altText} (${imageName}) -->`;
			}
		);
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 + `✅ 5. Obsidian image references processed`
			);
		}

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 6: Processing problematic markdown images and skipping if not found...`
			);
		}
		// Also handle standard markdown images that might reference non-existent files
		content = content.replace(
			/!\[([^\]]*)\]\(([^)]+)\)/g,
			(match, altText, imagePath) => {
				// If it's an Obsidian-style reference (starts with #), convert to comment
				if (imagePath.startsWith('#')) {
					return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
				}
				// If it's a relative path that might not exist, also convert to comment
				if (
					imagePath.startsWith('./') ||
					imagePath.startsWith('../') ||
					(!imagePath.startsWith('http') &&
						!imagePath.startsWith('/') &&
						!imagePath.startsWith('data:'))
				) {
					return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
				}
				// Keep external URLs (http/https), absolute paths, and data URLs
				return match;
			}
		);
		if (DEBUG_MODE) {
			console.log(SPACING_LEVEL_3 + `✅ 6. Markdown images processed`);
		}

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 7: Processing Obsidian links (content body only) and skipping if not found...`
			);
		}
		// Process Obsidian links only in the content body (not in frontmatter)
		content = processObsidianLinksInContentOnly(content);
		if (DEBUG_MODE) {
			console.log(SPACING_LEVEL_3 + `✅ 7. Obsidian links processed`);
		}

		// Extract sections based on content type (after Obsidian links are processed)
		const contentType = getContentType(targetFolder);
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 8: Checking for section extraction and skipping if not found...`
			);
		}
		if (contentType) {
			content = extractSectionsToFrontmatter(content, contentType);
		} else if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`⏭️ 8. No section extraction needed for this content type`
			);
		}

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 9: Writing processed content to target folder and skipping if not found...`
			);
		}
		// Write the filtered content to target folder
		fs.writeFileSync(targetPath, content, 'utf8');

		syncErrors.summary.copiedFiles++;

		if (DEBUG_MODE) {
			console.log(SPACING_LEVEL_2 + `✅ 9. Content written to: ${targetPath}`);
		}
	} catch (error) {
		syncErrors.summary.errors++;
		const errorInfo = {
			file: filePath,
			error: error.message,
			timestamp: new Date().toISOString(),
		};
		syncErrors.errors.push(errorInfo);
		console.error(`❌ Error processing ${filePath}:`, error.message);
	}
}

// Recursively process directory
function processDirectory(dirPath, relativePath = '') {
	if (DEBUG_MODE) {
		console.log(`📂 Entering directory: ${relativePath || dirPath}`);
	}

	try {
		const items = fs.readdirSync(dirPath);

		for (const item of items) {
			const fullPath = path.join(dirPath, item);
			const itemRelativePath = path.join(relativePath, item);
			const stat = fs.statSync(fullPath);

			// Skip protected items
			if (isProtected(item)) {
				continue;
			}

			// Skip directories starting with "03 Attachments" or "04 Templates"
			if (stat.isDirectory()) {
				if (
					item.startsWith('02 Tags') ||
					item.startsWith('03 Attachments') ||
					item.startsWith('04 Templates')
				) {
					if (DEBUG_MODE) {
						console.log(
							`⏭️  Skipping directory: ${itemRelativePath} (attachments/templates)`
						);
					}
					continue;
				}

				if (DEBUG_MODE && item.includes('Projects')) {
					console.log(`🔍 Found Projects directory: ${itemRelativePath}`);
				}

				processDirectory(fullPath, itemRelativePath);
			} else if (item.endsWith('.md')) {
				if (DEBUG_MODE && item.includes('Documentation')) {
					console.log(`🔍 Found Documentation file: ${itemRelativePath}`);
				}
				processMarkdownFile(fullPath, itemRelativePath);
			}
		}
	} catch (error) {
		console.error(`❌ Error processing directory ${dirPath}:`, error.message);
		syncErrors.errors.push({
			file: relativePath || dirPath,
			error: `Failed to process directory: ${error.message}`,
		});
		syncErrors.summary.errors++;
	}
}

// Check if an item should be protected
function isProtected(itemName) {
	return PROTECTED_ITEMS.includes(itemName);
}

// Get project name to slug mappings
function getProjectNameToSlugMappings() {
	if (projectNameToSlugCache) {
		return projectNameToSlugCache;
	}

	try {
		const projectsPath = path.join(ASTRO_CONTENT_PATH, 'projects');
		if (!fs.existsSync(projectsPath)) {
			console.log(
				'📁 Projects directory does not exist, skipping project link processing'
			);
			return {};
		}

		const projectFiles = fs
			.readdirSync(projectsPath)
			.filter(file => file.endsWith('.md'));

		const mappings = {};

		projectFiles.forEach(projectFile => {
			const projectPath = path.join(projectsPath, projectFile);
			const content = fs.readFileSync(projectPath, 'utf8');

			// Extract project name from frontmatter or filename
			const nameMatch = content.match(/^#\s*(.+)$/m);
			const projectName = nameMatch
				? nameMatch[1].trim()
				: projectFile.replace('.md', '');

			// Generate slug from filename (remove .md extension)
			const slug = projectFile.replace('.md', '');

			mappings[projectName] = slug;
		});

		projectNameToSlugCache = mappings;

		if (DEBUG_MODE) {
			console.log(
				`📋 Loaded ${Object.keys(mappings).length} project name mappings`
			);
		}

		return mappings;
	} catch (error) {
		console.error('❌ Error loading project name mappings:', error.message);
		return {};
	}
}

// Process Obsidian links to convert project references to portfolio links
function processObsidianLinks(content) {
	const projectMappings = getProjectNameToSlugMappings();

	// Process [[ProjectName|AltText]] format
	// console.log(SPACING_LEVEL_3 + 'Processing [[ProjectName|AltText]] formats');
	content = content.replace(
		/\[\[([^|]+)\|([^\]]+)\]\]/g,
		(match, projectName, altText) => {
			// First check if the main project name matches
			let slug = projectMappings[projectName];
			// console.log(slug);

			// If not found, check if the alt text matches a project slug
			if (!slug) {
				// Convert alt text to slug format and check if it matches any project
				const altTextSlug = altText
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)/g, '');

				// Find project by slug
				const projectEntry = Object.entries(projectMappings).find(
					([name, slug]) => slug === altTextSlug
				);

				if (projectEntry) {
					slug = projectEntry[1]; // Use the found slug
				}
			}

			if (slug) {
				return `<a href="/portfolio/projects/${slug}" class="mint-link">${altText}</a>`;
			}
			// If not a project, keep as bold text
			return `<span class="mint-link">${altText}</span>`;
		}
	);

	// Process [[ProjectName]] format
	// console.log(SPACING_LEVEL_3 + 'Processing [[ProjectName]] formats');
	content = content.replace(/\[\[([^\]]+)\]\]/g, (match, projectName) => {
		const slug = projectMappings[projectName];
		if (slug) {
			return `<a href="/portfolio/projects/${slug}" class="mint-link">${projectName}</a>`;
		}
		// If not a project, keep as bold text
		return `<span class="mint-link">${projectName}</span>`;
	});

	return content;
}

// Process Obsidian links only in the content body (not in frontmatter)
function processObsidianLinksInContentOnly(content) {
	// Split content into frontmatter and body
	const frontmatterMatch = content.match(
		/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
	);

	if (frontmatterMatch) {
		const frontmatter = frontmatterMatch[1];
		const body = frontmatterMatch[2];

		// Only process Obsidian links in the body, not in frontmatter
		const processedBody = processObsidianLinks(body);

		// Reconstruct the content with processed body but unchanged frontmatter
		return `---\n${frontmatter}\n---\n\n${processedBody}`;
	} else {
		// If no frontmatter found, process the entire content
		return processObsidianLinks(content);
	}
}

// Check for missing SVG files for skills
function checkMissingSvgFiles() {
	try {
		const skillsPath = path.join(ASTRO_CONTENT_PATH, 'skills');
		const iconsPath = path.join(__dirname, '../src/icons');

		if (!fs.existsSync(skillsPath)) {
			console.log('📁 Skills directory does not exist, skipping SVG check');
			return;
		}

		const skillFiles = fs
			.readdirSync(skillsPath)
			.filter(file => file.endsWith('.md'));

		skillFiles.forEach(skillFile => {
			const skillPath = path.join(skillsPath, skillFile);
			const content = fs.readFileSync(skillPath, 'utf8');

			// Extract logoFileName from frontmatter
			const logoFileNameMatch = content.match(/logoFileName:\s*(.+)/);
			if (logoFileNameMatch) {
				const logoFileName = logoFileNameMatch[1].trim();

				// Check if the SVG file exists
				const svgPath = path.join(iconsPath, logoFileName);
				if (!fs.existsSync(svgPath)) {
					const skillName = skillFile.replace('.md', '');
					missingSvgFiles.push({
						skill: skillName,
						logoFileName: logoFileName,
						file: skillFile,
					});

					if (DEBUG_MODE) {
						console.log(
							`⚠️  Missing SVG file for skill ${skillName}: ${logoFileName}`
						);
					}
				}
			}
		});

		// Add missing SVG warnings to syncErrors (don't affect success status)
		if (missingSvgFiles.length > 0) {
			missingSvgFiles.forEach(missing => {
				syncErrors.errors.push({
					file: missing.file,
					error: `Missing SVG file: ${missing.logoFileName} for skill ${missing.skill}`,
					type: 'missing_svg_warning',
					timestamp: new Date().toISOString(),
				});
			});
			// Don't increment error count for missing SVG warnings
		}
	} catch (error) {
		console.error('❌ Error checking for missing SVG files:', error.message);
		syncErrors.errors.push({
			file: 'SVG check',
			error: `Failed to check for missing SVG files: ${error.message}`,
		});
		syncErrors.summary.errors++;
	}
}

// Update icon-utils with current icons from the icons directory
function updateIconUtils() {
	try {
		const iconsDir = path.join(__dirname, '../src/icons');
		const iconUtilsFile = path.join(__dirname, '../src/utils/icon-utils.ts');

		// Check if icons directory exists
		if (!fs.existsSync(iconsDir)) {
			console.warn('📁 Icons directory not found:', iconsDir);
			return;
		}

		// Read all files in the icons directory
		const files = fs.readdirSync(iconsDir);

		// Filter for SVG files and remove the .svg extension
		const icons = files
			.filter(file => file.endsWith('.svg'))
			.map(file => file.replace('.svg', ''))
			.sort(); // Sort alphabetically for consistency

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_1 + `🎨 Found ${icons.length} SVG icons:`,
				icons
			);
		}

		// Read the current icon-utils file
		let content = fs.readFileSync(iconUtilsFile, 'utf8');

		// Create the new icons array string
		const iconsArrayString = icons.map(icon => `\t'${icon}'`).join(',\n');

		// Replace the existing icons array
		const updatedContent = content.replace(
			/let knownIconsCache: string\[\] = \[[\s\S]*?\];/,
			`let knownIconsCache: string[] = [\n${iconsArrayString},\n];`
		);

		// Write the updated content back to the file
		fs.writeFileSync(iconUtilsFile, updatedContent, 'utf8');

		console.log(
			`✅ Successfully updated icon-utils.ts with ${icons.length} icons`
		);
	} catch (error) {
		console.error('❌ Error updating icon-utils:', error.message);
		syncErrors.errors.push({
			file: 'icon-utils update',
			error: `Failed to update icon-utils: ${error.message}`,
			type: 'icon_update_error',
			timestamp: new Date().toISOString(),
		});
		syncErrors.summary.errors++;
	}
}

// Post-process all markdown files in the content directory to remove image references
function postProcessContentImages(contentDir) {
	function processFile(filePath) {
		let content = fs.readFileSync(filePath, 'utf8');
		// Remove Obsidian-style image references
		content = content.replace(
			/!\[([^\]]*)\]\(#([^)]+)\)/g,
			(match, altText, imageName) =>
				`<!-- Image removed during sync: ${altText} (${imageName}) -->`
		);
		// Remove standard markdown images (relative, Obsidian-style, or non-http)
		content = content.replace(
			/!\[([^\]]*)\]\(([^)]+)\)/g,
			(match, altText, imagePath) => {
				if (
					imagePath.startsWith('#') ||
					imagePath.startsWith('./') ||
					imagePath.startsWith('../') ||
					(!imagePath.startsWith('http') &&
						!imagePath.startsWith('/') &&
						!imagePath.startsWith('data:'))
				) {
					return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
				}
				return match;
			}
		);
		// Extra pass for any remaining Obsidian-style
		content = content.replace(
			/!\[([^\]]*)\]\(#([^)]+)\)/g,
			(match, altText, imageName) =>
				`<!-- Image removed during sync: ${altText} (${imageName}) -->`
		);
		fs.writeFileSync(filePath, content, 'utf8');
	}

	function processDir(dir) {
		const items = fs.readdirSync(dir);
		for (const item of items) {
			const fullPath = path.join(dir, item);
			const stat = fs.statSync(fullPath);
			if (stat.isDirectory()) {
				processDir(fullPath);
			} else if (item.endsWith('.md')) {
				processFile(fullPath);
			}
		}
	}

	processDir(contentDir);
}

// Build the Astro project
function buildProject() {
	try {
		console.log('🔨 Building Astro project...');
		execSync('npm run build', {
			cwd: path.join(__dirname, '..'),
			stdio: 'inherit',
		});
		console.log('✅ Build completed successfully');
		return true;
	} catch (error) {
		console.error('❌ Build failed:', error.message);
		return false;
	}
}

// Deploy to production
function deployToProduction() {
	try {
		console.log('🚀 Deploying to production...');

		// Check if we're using Netlify
		if (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_AUTH_TOKEN) {
			console.log('📤 Deploying to Netlify...');
			execSync('npx netlify deploy --prod', {
				cwd: path.join(__dirname, '..'),
				stdio: 'inherit',
				env: {
					...process.env,
					NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
					NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN,
				},
			});
		}
		// Check if we're using Vercel
		else if (process.env.VERCEL_TOKEN) {
			console.log('📤 Deploying to Vercel...');
			execSync('npx vercel --prod', {
				cwd: path.join(__dirname, '..'),
				stdio: 'inherit',
				env: {
					...process.env,
					VERCEL_TOKEN: process.env.VERCEL_TOKEN,
				},
			});
		}
		// Generic deployment
		else {
			console.log('📤 Running generic deployment...');
			execSync('npm run deploy', {
				cwd: path.join(__dirname, '..'),
				stdio: 'inherit',
			});
		}

		console.log('✅ Deployment completed successfully');
		return true;
	} catch (error) {
		console.error('❌ Deployment failed:', error.message);
		return false;
	}
}

// Save error log to file
function saveErrorLog() {
	try {
		fs.writeFileSync(ERROR_LOG_PATH, JSON.stringify(syncErrors, null, 2));
		console.log(`📝 Error log saved to: ${ERROR_LOG_PATH}`);
	} catch (error) {
		console.error('❌ Failed to save error log:', error.message);
	}
}

// Send email notification
async function sendEmailNotification() {
	if (!EMAIL_NOTIFICATIONS) {
		console.log('📧 Email notifications disabled, skipping...');
		return;
	}

	try {
		console.log('📧 Initializing email service...');
		const emailInitialized = await emailService.initialize();

		if (!emailInitialized) {
			console.log(
				'📧 Email service initialization failed, skipping email notification'
			);
			return;
		}

		console.log('📧 Sending email notification...');

		// Separate errors from warnings
		const errors = syncErrors.errors.filter(
			error => error.type !== 'missing_svg_warning'
		);
		const warnings = syncErrors.errors.filter(
			error => error.type === 'missing_svg_warning'
		);

		// Build subject line with warning count if there are warnings
		let subject = `Portfolio Sync ${syncErrors.success ? '✅ Success' : '❌ Failed'}`;
		if (warnings.length > 0) {
			subject += ` (${warnings.length} warning${warnings.length > 1 ? 's' : ''})`;
		}
		const body = `
      <h2>Portfolio Sync Report</h2>
      <p><strong>Mode:</strong> ${SYNC_MODE}</p>
      <p><strong>Timestamp:</strong> ${syncErrors.timestamp}</p>
      <p><strong>Source:</strong> ${syncErrors.source}</p>
      
      <h3>Summary</h3>
      <ul>
        <li>Total Files: ${syncErrors.summary.totalFiles}</li>
        <li>Processed Files: ${syncErrors.summary.processedFiles}</li>
        <li>Copied Files: ${syncErrors.summary.copiedFiles}</li>
        <li>Skipped Files: ${syncErrors.summary.skippedFiles}</li>
        <li>Errors: ${errors.length}</li>
        <li>Warnings: ${warnings.length}</li>
      </ul>
      
      ${
				errors.length > 0
					? `
        <h3>Errors</h3>
        <ul>
          ${errors
						.map(
							error => `
            <li><strong>${error.file || error.directory}:</strong> ${error.error}</li>
          `
						)
						.join('')}
        </ul>
      `
					: ''
			}
      
      ${
				warnings.length > 0
					? `
        <h3>Warnings</h3>
        <ul>
          ${warnings
						.map(
							warning => `
            <li><strong>${warning.file}:</strong> ${warning.error}</li>
          `
						)
						.join('')}
        </ul>
      `
					: ''
			}
    `;

		await emailService.sendEmail(subject, body);
		console.log('✅ Email notification sent successfully');
	} catch (error) {
		console.error('❌ Failed to send email notification:', error.message);
	}
}

// Main sync function
async function main() {
	try {
		console.log('🔄 Starting sync process...');
		console.log('📋 SYNC PROCESS ORDER:');
		console.log(SPACING_LEVEL_1 + '1. Validate paths and create directories');
		console.log(
			SPACING_LEVEL_1 + '2. Load project name mappings for Obsidian links'
		);
		console.log(
			SPACING_LEVEL_1 + '3. Process Obsidian vault files (recursive scan)'
		);
		console.log(
			SPACING_LEVEL_1 + '4. Apply markdown processing rules to each file'
		);
		console.log(
			SPACING_LEVEL_1 + '5. Copy processed files to Astro content folders'
		);
		console.log(
			SPACING_LEVEL_1 + '6. Post-process images and check for missing SVGs'
		);
		console.log(SPACING_LEVEL_1 + '7. Build and deploy (production mode only)');
		console.log('');
		console.log('📋 MARKDOWN PROCESSING RULES ORDER:');
		console.log(SPACING_LEVEL_1 + '1. Parse frontmatter and extract tags');
		console.log(SPACING_LEVEL_1 + '2. Check for portfolio tag');
		console.log(SPACING_LEVEL_1 + '3. Determine target folder based on tags');
		console.log(SPACING_LEVEL_1 + '4. Check if file is protected');
		console.log(SPACING_LEVEL_1 + '5. Remove Obsidian image references');
		console.log(SPACING_LEVEL_1 + '6. Remove problematic markdown images');
		console.log(
			SPACING_LEVEL_1 + '7. Process Obsidian links (content body only)'
		);
		console.log(
			SPACING_LEVEL_1 + '8. Extract sections to frontmatter (if applicable)'
		);
		console.log(
			SPACING_LEVEL_1 + '9. Write processed content to target folder'
		);
		console.log('');

		// Ensure directories exist
		console.log('📁 Step 1: Creating/validating directories...');
		ensureDirectories();

		// Load project name mappings for Obsidian link processing
		console.log(
			'📋 Step 2: Loading project name mappings for Obsidian links...'
		);
		getProjectNameToSlugMappings();

		// Process Obsidian vault
		console.log('📁 Step 3: Processing Obsidian vault files...');
		console.log(
			SPACING_LEVEL_1 + '📂 Scanning directory structure recursively...'
		);
		processDirectory(OBSIDIAN_VAULT_PATH);

		// Check for missing SVG files (for production mode or when email notifications are enabled)
		if (SYNC_MODE === 'production' || EMAIL_NOTIFICATIONS) {
			console.log('🔍 Step 6: Checking for missing SVG files...');
			checkMissingSvgFiles();
		}

		// Update icon-utils with current icons (always run)
		console.log('🎨 Updating icon-utils with current icons...');
		updateIconUtils();

		// Post-process content (only for production mode)
		if (SYNC_MODE === 'production') {
			console.log('🔧 Post-processing content images...');
			postProcessContentImages(ASTRO_CONTENT_PATH);
		}

		// Build project (only for production mode or when auto deploy is enabled)
		let buildSuccess = true;
		if (SYNC_MODE === 'production' || AUTO_DEPLOY) {
			console.log('🔨 Building project...');
			buildSuccess = buildProject();
		}

		// Deploy to production (only when auto deploy is enabled)
		let deploySuccess = true;
		if (AUTO_DEPLOY) {
			console.log('🚀 Deploying to production...');
			deploySuccess = deployToProduction();
		}

		// Update sync status
		if (SYNC_MODE === 'production') {
			syncErrors.success =
				buildSuccess && deploySuccess && syncErrors.summary.errors === 0;
		} else {
			// For development mode, success is based on whether files were processed
			syncErrors.success =
				syncErrors.summary.totalFiles > 0 && syncErrors.summary.errors === 0;
		}

		// Save error log (for all modes)
		saveErrorLog();

		// Send email notification (only for production mode or when explicitly enabled)
		if (SYNC_MODE === 'production' || EMAIL_NOTIFICATIONS) {
			await sendEmailNotification();
		}

		console.log('✅ Sync process completed successfully!');

		// Exit with error code if there were issues in production mode
		if (SYNC_MODE === 'production' && !syncErrors.success) {
			process.exit(1);
		}
	} catch (error) {
		console.error('❌ Sync process failed:', error.message);

		// Capture the error in syncErrors
		syncErrors.success = false;
		syncErrors.errors.push({
			type: 'sync_failure',
			error: error.message,
			timestamp: new Date().toISOString(),
			stack: error.stack,
		});

		// Save error log for all modes
		saveErrorLog();

		// Send email notification (only for production mode or when explicitly enabled)
		if (SYNC_MODE === 'production' || EMAIL_NOTIFICATIONS) {
			await sendEmailNotification();
		}

		process.exit(1);
	}
}

// Run the main function
main();
