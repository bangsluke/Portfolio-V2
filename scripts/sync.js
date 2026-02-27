#!/usr/bin/env node

import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { emailService } from './email-service.js';
import {
	CONTENT_TYPE_MAPPINGS,
	DEFAULT_DEBUG_MODE,
	DEFAULT_PORTFOLIO_TAG,
	PROTECTED_PATTERNS,
	SPACING_LEVEL_1,
	SPACING_LEVEL_2,
	SPACING_LEVEL_3,
} from './repoConfig.js';
// Utility function for extracting name from filename
function extractNameFromFilename(filename) {
	return filename.replace(/\.md$/, '');
}

// Add name property to project frontmatter
function addProjectNameToFrontmatter(content, fileName) {
	// Extract the name from filename (remove .md extension)
	const projectName = extractNameFromFilename(fileName);

	// Check if name property already exists in frontmatter
	const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

	if (frontmatterMatch) {
		const existingFrontmatter = frontmatterMatch[1];

		// Check if name property already exists
		if (existingFrontmatter.includes('name:')) {
			if (DEBUG_MODE) {
				console.log(
					SPACING_LEVEL_3 +
						`⏭️ Project already has name property in frontmatter`
				);
			}
			return content;
		}

		// Add name property to existing frontmatter
		const newFrontmatter = existingFrontmatter + `\nname: "${projectName}"`;
		content = content.replace(
			/^---\s*\n([\s\S]*?)\n---\s*\n/,
			`---\n${newFrontmatter}\n---\n`
		);

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`✅ Added name property to project frontmatter: "${projectName}"`
			);
		}
	} else {
		// No existing frontmatter, create new one
		const newFrontmatter = `name: "${projectName}"`;
		content = `---\n${newFrontmatter}\n---\n\n${content}`;

		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`✅ Created new frontmatter with name property: "${projectName}"`
			);
		}
	}

	return content;
}

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
const DEBUG_MODE = process.env.DEBUG === 'true' || DEFAULT_DEBUG_MODE;

// Import configuration

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
const PROTECTED_ITEMS = [
	'staticData',
	'config.ts',
	'allStaticData.json',
	...PROTECTED_PATTERNS,
];

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
		const cleanedContent = match[1]
			.trim()
			.replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
			.replace(/\s+$/gm, '') // Remove trailing whitespace from each line
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'); // Convert markdown links to HTML (keep Obsidian links for processing)

		return cleanedContent;
	}
	return null;
}

// Extract sections and add to frontmatter based on content type
async function extractSectionsToFrontmatter(content, contentType) {
	// Get sections to extract from config based on content type
	const contentTypeConfig = CONTENT_TYPE_MAPPINGS[contentType];
	if (!contentTypeConfig) {
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`⏭️  No section extraction config found for content type: ${contentType}`
			);
		}
		return content;
	}

	const sectionsToExtract = contentTypeConfig.sections;
	const extractedData = {};
	const endMarker = '>[!top] [Back to top](#Table%20of%20Contents)';

	// Import the new content processor
	const { processContent } = await import('./content-processor.js');

	// Extract content from each section defined in config
	sectionsToExtract.forEach(({ name, property }) => {
		const sectionContent = extractSectionContent(content, name, endMarker);
		if (sectionContent) {
			// Process the extracted section content using the new content processor
			const processedSectionContent = processContent(sectionContent);
			extractedData[property] = processedSectionContent;
			if (DEBUG_MODE) {
				console.log(
					SPACING_LEVEL_3 +
						`📝 Extracted ${property} for ${contentType}: ${processedSectionContent.substring(0, 50)}...`
				);
			}
		}
	});

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
	// Return the folder name directly to match CONTENT_TYPE_MAPPINGS keys
	return targetFolder || null;
}

async function processMarkdownFile(filePath, relativePath) {
	try {
		syncErrors.summary.totalFiles++;

		let content = fs.readFileSync(filePath, 'utf8');
		const { tags } = parseFrontmatter(content);

		if (DEBUG_MODE) {
			console.log(`📄 1. Processing: ${relativePath}`);
		}

		// Check if file has portfolio tag
		const portfolioTag = process.env.PORTFOLIO_TAG || DEFAULT_PORTFOLIO_TAG;
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

		// Extract sections based on content type (BEFORE Obsidian links are processed)
		const contentType = getContentType(targetFolder);
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`🔍 7: Checking for section extraction and skipping if not found...`
			);
		}
		if (contentType) {
			content = await extractSectionsToFrontmatter(content, contentType);
		} else if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_3 +
					`⏭️ 7. No section extraction needed for this content type`
			);
		}

		// Add name property to project frontmatter if it's a project and doesn't already have one
		if (targetFolder === 'projects') {
			content = addProjectNameToFrontmatter(content, fileName);
		}

		// NOTE: We no longer process Obsidian links in the content body
		// This preserves the original Obsidian syntax in the markdown files
		// The processed HTML is stored in frontmatter properties for display on the website
		if (DEBUG_MODE) {
			console.log(
				SPACING_LEVEL_2 +
					`⏭️ 8: Skipping content body processing to preserve original Obsidian syntax`
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
		syncErrors.summary.processedFiles++;

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
async function processDirectory(dirPath, relativePath = '') {
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

				await processDirectory(fullPath, itemRelativePath);
			} else if (item.endsWith('.md')) {
				if (DEBUG_MODE && item.includes('Documentation')) {
					console.log(`🔍 Found Documentation file: ${itemRelativePath}`);
				}
				await processMarkdownFile(fullPath, itemRelativePath);
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
				'�� Projects directory does not exist, skipping project link processing'
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
				: extractNameFromFilename(projectFile);

			// Generate slug from filename (remove .md extension)
			const slug = extractNameFromFilename(projectFile);

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
				return `<a href="/projects/${slug}" class="theme-link">${altText}</a>`;
			}
			// If not a project, keep as bold text
			return `<span class="theme-link">${altText}</span>`;
		}
	);

	// Process [[ProjectName]] format
	// console.log(SPACING_LEVEL_3 + 'Processing [[ProjectName]] formats');
	content = content.replace(/\[\[([^\]]+)\]\]/g, (match, projectName) => {
		const slug = projectMappings[projectName];
		if (slug) {
			return `<a href="/projects/${slug}" class="theme-link">${projectName}</a>`;
		}
		// If not a project, keep as bold text
		return `<span class="theme-link">${projectName}</span>`;
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
		const iconsPath = path.join(__dirname, '../public/icons');

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
					const skillName = extractNameFromFilename(skillFile);
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

// Create skill name to icon mapping
function createSkillIconMapping() {
	try {
		const skillsPath = path.join(ASTRO_CONTENT_PATH, 'skills');
		const iconUtilsFile = path.join(__dirname, '../src/utils/icon-utils.ts');

		if (!fs.existsSync(skillsPath)) {
			console.log(
				'📁 Skills directory does not exist, skipping skill icon mapping'
			);
			return;
		}

		const skillFiles = fs
			.readdirSync(skillsPath)
			.filter(file => file.endsWith('.md'));

		const skillIconMapping = {};

		skillFiles.forEach(skillFile => {
			const skillPath = path.join(skillsPath, skillFile);
			const content = fs.readFileSync(skillPath, 'utf8');

			// Extract skill name from frontmatter or filename
			const nameMatch = content.match(/^#\s*(.+)$/m);
			const skillName = nameMatch
				? nameMatch[1].trim()
				: extractNameFromFilename(skillFile);

			// Extract logoFileName from frontmatter
			const logoFileNameMatch = content.match(/logoFileName:\s*(.+)/);
			if (logoFileNameMatch) {
				const logoFileName = logoFileNameMatch[1].trim();
				// Remove .svg extension if present
				const iconName = logoFileName.replace(/\.svg$/, '');
				skillIconMapping[skillName] = iconName;
			}
		});

		// Read the current icon-utils file
		let content = fs.readFileSync(iconUtilsFile, 'utf8');

		// Create the skill icon mapping string
		const mappingEntries = Object.entries(skillIconMapping)
			.map(([skillName, iconName]) => `\t'${skillName}': '${iconName}'`)
			.join(',\n');

		// Replace or add the skill icon mapping
		if (content.includes('skillIconMapping')) {
			// Update existing mapping
			content = content.replace(
				/const skillIconMapping: Record<string, string> = \{[\s\S]*?\};/,
				`const skillIconMapping: Record<string, string> = {\n${mappingEntries},\n};`
			);
		} else {
			// Add new mapping before the export functions
			content = content.replace(
				/(let knownIconsCache: string\[\] = \[[\s\S]*?\];)/,
				`$1\n\n// Skill name to icon mapping (auto-generated by sync process)\nconst skillIconMapping: Record<string, string> = {\n${mappingEntries},\n};`
			);
		}

		// Write the updated content back to the file
		fs.writeFileSync(iconUtilsFile, content, 'utf8');

		console.log(
			`✅ Successfully updated icon-utils.ts with ${Object.keys(skillIconMapping).length} skill icon mappings`
		);
	} catch (error) {
		console.error('❌ Error creating skill icon mapping:', error.message);
		syncErrors.errors.push({
			file: 'skill icon mapping',
			error: `Failed to create skill icon mapping: ${error.message}`,
			type: 'skill_mapping_error',
			timestamp: new Date().toISOString(),
		});
		syncErrors.summary.errors++;
	}
}

// Update icon-utils with current icons from the icons directory
function updateIconUtils() {
	try {
		const iconsDir = path.join(__dirname, '../public/icons');
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
		const statusBg = syncErrors.success ? '#d1fae5' : '#fee2e2';
		const statusColor = syncErrors.success ? '#065f46' : '#991b1b';
		const statusText = syncErrors.success
			? '&#10003; Portfolio Sync Completed Successfully'
			: '&#10007; Portfolio Sync Failed';

		const body = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Sync Report</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ff;font-family:Montserrat,Arial,sans-serif;color:#171717;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #ddd6fe;">
          <tr><td>

            <!-- HEADER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#2e1065 0%,#4c1d95 40%,#6d28d9 100%);border-radius:8px 8px 0 0;">
              <tr>
                <td style="padding:24px 28px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:16px;">
                        <img src="https://bangsluke-assets.netlify.app/images/project-logos/Portfolio-Site-V2.png" alt="Portfolio Site V2" width="48" height="48" style="display:block;border-radius:8px;" />
                      </td>
                      <td style="vertical-align:middle;">
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#c4b5fd;margin-bottom:4px;">Portfolio Site V2</div>
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">Portfolio Sync Report</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- STATUS BANNER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${statusBg};border-bottom:1px solid #ddd6fe;">
              <tr>
                <td style="padding:14px 28px;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;color:${statusColor};">
                  ${statusText}
                </td>
              </tr>
            </table>

            <!-- SYNC DETAILS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:24px 28px 8px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Sync Details</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;width:140px;">Mode</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${SYNC_MODE}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Timestamp</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${syncErrors.timestamp}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Source</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;word-break:break-all;">${syncErrors.source}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- FILE SUMMARY SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:16px 28px 24px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">File Summary</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ddd6fe;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <tr style="background-color:#f5f3ff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;width:60%;">Total Files</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${syncErrors.summary.totalFiles}</td>
                    </tr>
                    <tr style="background-color:#ffffff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;">Processed Files</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${syncErrors.summary.processedFiles}</td>
                    </tr>
                    <tr style="background-color:#f5f3ff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;">Copied Files</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#065f46;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${syncErrors.summary.copiedFiles}</td>
                    </tr>
                    <tr style="background-color:#ffffff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;">Skipped Files</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${syncErrors.summary.skippedFiles}</td>
                    </tr>
                    <tr style="background-color:#f5f3ff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;">Errors</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${errors.length > 0 ? '#991b1b' : '#065f46'};font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${errors.length}</td>
                    </tr>
                    <tr style="background-color:#ffffff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Warnings</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${warnings.length > 0 ? '#92400e' : '#065f46'};font-weight:700;text-align:right;">${warnings.length}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            ${
							errors.length > 0
								? `
            <!-- ERRORS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 28px 24px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#991b1b;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #fee2e2;">Errors</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #fca5a5;border-radius:6px;border-collapse:collapse;">
                    ${errors
											.map(
												(error, i) => `
                    <tr style="background-color:${i % 2 === 0 ? '#fff' : '#fff5f5'};">
                      <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;border-bottom:1px solid #fee2e2;width:35%;word-break:break-all;">${error.file || error.directory}</td>
                      <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#991b1b;border-bottom:1px solid #fee2e2;">${error.error}</td>
                    </tr>
                    `
											)
											.join('')}
                  </table>
                </td>
              </tr>
            </table>
            `
								: ''
						}

            ${
							warnings.length > 0
								? `
            <!-- WARNINGS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 28px 24px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#92400e;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #fde68a;">Warnings</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #fcd34d;border-radius:6px;border-collapse:collapse;">
                    ${warnings
											.map(
												(warning, i) => `
                    <tr style="background-color:${i % 2 === 0 ? '#fffbeb' : '#fef9ee'};">
                      <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;border-bottom:1px solid #fde68a;width:35%;word-break:break-all;">${warning.file}</td>
                      <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#92400e;border-bottom:1px solid #fde68a;">${warning.error}</td>
                    </tr>
                    `
											)
											.join('')}
                  </table>
                </td>
              </tr>
            </table>
            `
								: ''
						}

            <!-- FOOTER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ddd6fe;">
              <tr>
                <td style="padding:16px 28px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;">
                  <em>Automated notification from Portfolio-V2 sync script.</em>
                </td>
              </tr>
            </table>

          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

		await emailService.sendEmail(subject, body);
		console.log('✅ Email notification sent successfully');
	} catch (error) {
		console.error('❌ Failed to send email notification:', error.message);
	}
}

// Sync Portfolio About Me file specifically
async function syncPortfolioAboutMe() {
	try {
		// Search for the file recursively in the Obsidian vault
		const aboutMePath = findFileRecursively(
			OBSIDIAN_VAULT_PATH,
			'Portfolio About Me.md'
		);
		const targetAboutMePath = path.join(__dirname, '../src/pages/about-me.md');

		if (!aboutMePath) {
			console.warn(
				SPACING_LEVEL_2 +
					`⚠️  Portfolio About Me file not found in Obsidian vault: ${OBSIDIAN_VAULT_PATH}`
			);
			return;
		}

		// Read content from Obsidian
		let content = fs.readFileSync(aboutMePath, 'utf8');

		// Process content using the new content processor (only process the body, not frontmatter)
		const processedContent =
			await processObsidianLinksInContentOnlyWithNewProcessor(content);

		// Remove "about-me-" from frontmatter
		content = removeAboutMeFromFrontmatter(processedContent);

		// Remove the first line of about me content (Portfolio About Me heading)
		// This removes the "<h1>Portfolio About Me</h1><br><br>" line
		content = content.replace(
			'<h1>Portfolio About Me</h1><br><br><br><br>',
			''
		);

		// Replace four <br> tags with a single <br> tag to stop the spacing on the processed About Me file from being too large
		// Use global regex to replace all occurrences throughout the file
		content = content.replace(/<br><br><br>/g, '<br>');

		// Write content to Astro
		fs.writeFileSync(targetAboutMePath, content, 'utf8');
		console.log(
			SPACING_LEVEL_2 +
				`✅ Synced Portfolio About Me file from: ${aboutMePath} to: ${targetAboutMePath}`
		);
	} catch (error) {
		console.error(
			SPACING_LEVEL_2 +
				`❌ Error syncing Portfolio About Me file: ${error.message}`
		);
		syncErrors.errors.push({
			file: 'Portfolio About Me sync',
			error: `Failed to sync Portfolio About Me file: ${error.message}`,
			timestamp: new Date().toISOString(),
		});
		syncErrors.summary.errors++;
	}
}

// Process Obsidian links only in the content body using the new content processor
async function processObsidianLinksInContentOnlyWithNewProcessor(content) {
	try {
		// Import the new content processor
		const { processContent } = await import('./content-processor.js');

		// Split content into frontmatter and body
		const frontmatterMatch = content.match(
			/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
		);

		if (frontmatterMatch) {
			const frontmatter = frontmatterMatch[1];
			const body = frontmatterMatch[2];

			// Only process Obsidian links in the body, not in frontmatter
			const processedBody = processContent(body);

			// Reconstruct the content with processed body but unchanged frontmatter
			return `---\n${frontmatter}\n---\n\n${processedBody}`;
		} else {
			// If no frontmatter found, process the entire content
			return processContent(content);
		}
	} catch (error) {
		console.error(
			'Error using new content processor, falling back to old method:',
			error.message
		);
		// Fallback to old method if new processor fails
		return processObsidianLinksInContentOnly(content);
	}
}

// Helper function to find a file recursively
function findFileRecursively(dirPath, fileName) {
	try {
		const items = fs.readdirSync(dirPath);

		for (const item of items) {
			const fullPath = path.join(dirPath, item);
			const stat = fs.statSync(fullPath);

			if (stat.isDirectory()) {
				// Skip protected directories
				if (
					item.startsWith('03 Attachments') ||
					item.startsWith('04 Templates')
				) {
					continue;
				}

				// Recursively search in subdirectories
				const found = findFileRecursively(fullPath, fileName);
				if (found) {
					return found;
				}
			} else if (item === fileName) {
				return fullPath;
			}
		}
	} catch (error) {
		if (DEBUG_MODE) {
			console.log(
				`⚠️  Error searching in directory ${dirPath}: ${error.message}`
			);
		}
	}

	return null;
}

// Remove "about-me-" from frontmatter
function removeAboutMeFromFrontmatter(content) {
	// Split content into frontmatter and body
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return content; // No frontmatter found, return as is
	}

	const frontmatter = match[1];
	const body = content.substring(match[0].length);

	// Remove "about-me-" from frontmatter lines
	const cleanedFrontmatter = frontmatter
		.split('\n')
		.map(line => {
			// Remove "about-me-" from the entire line
			return line.replace(/about-me-/g, '');
		})
		.join('\n');

	// Reconstruct the content with cleaned frontmatter
	return `---\n${cleanedFrontmatter}\n---\n${body}`;
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
		await processDirectory(OBSIDIAN_VAULT_PATH);

		// Check for missing SVG files (for production mode or when email notifications are enabled)
		if (SYNC_MODE === 'production' || EMAIL_NOTIFICATIONS) {
			console.log('🔍 Step 6: Checking for missing SVG files...');
			checkMissingSvgFiles();
		}

		// Create skill icon mapping (always run)
		console.log('🎨 Creating skill icon mapping...');
		createSkillIconMapping();

		// Update icon-utils with current icons (always run)
		console.log('🎨 Updating icon-utils with current icons...');
		updateIconUtils();

		// Sync Portfolio About Me file specifically
		console.log('📄 Syncing Portfolio About Me file...');
		await syncPortfolioAboutMe();

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
