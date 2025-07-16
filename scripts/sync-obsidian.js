#!/usr/bin/env node

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
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

// Validate OBSIDIAN_PATH
if (!OBSIDIAN_VAULT_PATH) {
  console.error('❌ OBSIDIAN_PATH environment variable is not set!');
  console.error('Please set OBSIDIAN_PATH in your .env file to the path of your Obsidian vault.');
  console.error('Expected .env file location:', envPath);
  console.error('Available environment variables:', Object.keys(process.env).filter(key => key.includes('OBSIDIAN') || key.includes('EMAIL') || key.includes('PORTFOLIO')));
  process.exit(1);
}

// Check if the Obsidian vault path exists
if (!fs.existsSync(OBSIDIAN_VAULT_PATH)) {
  console.error('❌ Obsidian vault path does not exist:', OBSIDIAN_VAULT_PATH);
  console.error('Please check your OBSIDIAN_PATH in the .env file.');
  process.exit(1);
}

// Folder mapping based on tags
const FOLDER_MAPPING = {
  'project': 'projects',
  'company': 'companies',
  'client': 'clients',
  'skill': 'skills',
  'role': 'roles',
  'education': 'educations',
  'reference': 'references'
};

// Protected items that should never be deleted or overwritten
const PROTECTED_ITEMS = [
  'staticData',
  'config.ts',
  'allStaticData.json'
];

console.log('Starting Obsidian sync...');
console.log('Obsidian vault path:', OBSIDIAN_VAULT_PATH);
console.log('Astro content path:', ASTRO_CONTENT_PATH);

// Ensure content directories exist
function ensureDirectories() {
  Object.values(FOLDER_MAPPING).forEach(folder => {
    const folderPath = path.join(ASTRO_CONTENT_PATH, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created directory: ${folderPath}`);
    }
  });
  
  // Ensure staticData directory exists and is protected
  const staticDataPath = path.join(ASTRO_CONTENT_PATH, 'staticData');
  if (!fs.existsSync(staticDataPath)) {
    fs.mkdirSync(staticDataPath, { recursive: true });
    console.log(`Created protected directory: ${staticDataPath}`);
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

// Process a markdown file
function processMarkdownFile(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { tags } = parseFrontmatter(content);
    
    console.log(`Processing: ${relativePath}`);
    console.log(`  Tags found: ${tags.join(', ')}`);
    
    // Check if file has portfolio tag
    if (!tags.includes('portfolio')) {
      console.log(`  Skipping - no portfolio tag`);
      return;
    }
    
    const targetFolder = getTargetFolder(tags);
    if (!targetFolder) {
      console.log(`  Skipping - no matching folder for tags: ${tags.join(', ')}`);
      return;
    }
    
    const fileName = path.basename(filePath);
    const targetPath = path.join(ASTRO_CONTENT_PATH, targetFolder, fileName);
    
    // Check if target file is protected
    if (isProtected(fileName)) {
      console.log(`  Skipping - file is protected: ${fileName}`);
      return;
    }
    
    // Copy file to target folder
    fs.copyFileSync(filePath, targetPath);
    console.log(`  Copied to: ${targetPath}`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Recursively process directory
function processDirectory(dirPath, relativePath = '') {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const itemRelativePath = path.join(relativePath, item);
      const stat = fs.statSync(fullPath);
      
      // Skip protected items
      if (isProtected(item)) {
        console.log(`Skipping protected item: ${itemRelativePath}`);
        continue;
      }
      
      if (stat.isDirectory()) {
        processDirectory(fullPath, itemRelativePath);
      } else if (item.endsWith('.md')) {
        processMarkdownFile(fullPath, itemRelativePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Check if an item should be protected
function isProtected(itemName) {
  return PROTECTED_ITEMS.includes(itemName);
}

// Post-process all markdown files in the content directory to remove image references
function postProcessContentImages(contentDir) {
  function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove Obsidian-style image references
    content = content.replace(
      /!\[([^\]]*)\]\(#([^)]+)\)/g,
      (match, altText, imageName) => `<!-- Image removed during sync: ${altText} (${imageName}) -->`
    );
    // Remove standard markdown images (relative, Obsidian-style, or non-http)
    content = content.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, altText, imagePath) => {
        if (imagePath.startsWith('#') || imagePath.startsWith('./') || imagePath.startsWith('../') || (!imagePath.startsWith('http') && !imagePath.startsWith('/') && !imagePath.startsWith('data:'))) {
          return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
        }
        return match;
      }
    );
    // Extra pass for any remaining Obsidian-style
    content = content.replace(
      /!\[([^\]]*)\]\(#([^)]+)\)/g,
      (match, altText, imageName) => `<!-- Image removed during sync: ${altText} (${imageName}) -->`
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

// Clean up old files while protecting important ones
function cleanupOldFiles() {
  console.log('Cleaning up old files...');
  
  Object.values(FOLDER_MAPPING).forEach(folder => {
    const folderPath = path.join(ASTRO_CONTENT_PATH, folder);
    if (!fs.existsSync(folderPath)) return;
    
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && file.endsWith('.md')) {
        // Check if this file was created by our sync script
        // For now, we'll just log what we find
        console.log(`  Found file in ${folder}: ${file}`);
      }
    });
  });
  
  console.log('Cleanup completed (no files deleted - protection enabled)');
}

// Verify protected items still exist
function verifyProtectedItems() {
  console.log('Verifying protected items...');
  
  const staticDataPath = path.join(ASTRO_CONTENT_PATH, 'staticData');
  const configPath = path.join(ASTRO_CONTENT_PATH, 'config.ts');
  const allStaticDataPath = path.join(staticDataPath, 'allStaticData.json');
  
  if (!fs.existsSync(staticDataPath)) {
    console.error('ERROR: staticData folder is missing!');
    return false;
  }
  
  if (!fs.existsSync(configPath)) {
    console.error('ERROR: config.ts is missing!');
    return false;
  }
  
  if (!fs.existsSync(allStaticDataPath)) {
    console.error('ERROR: allStaticData.json is missing!');
    return false;
  }
  
  console.log('  ✓ staticData folder exists');
  console.log('  ✓ config.ts exists');
  console.log('  ✓ allStaticData.json exists');
  return true;
}

// Main function
async function main() {
  const startTime = new Date();
  const syncStats = {
    filesCopied: 0,
    filesSkipped: 0,
    errors: []
  };
  
  try {
    // Initialize email service
    await emailService.initialize();
    
    console.log('Ensuring directories exist...');
    ensureDirectories();
    
    console.log('Processing Obsidian vault...');
    processDirectory(OBSIDIAN_VAULT_PATH);

    console.log('Post-processing content images...');
    postProcessContentImages(ASTRO_CONTENT_PATH);
    
    console.log('Cleaning up old files...');
    cleanupOldFiles();
    
    console.log('Verifying protected items...');
    if (!verifyProtectedItems()) {
      console.error('CRITICAL ERROR: Protected items are missing!');
      process.exit(1);
    }
    
    console.log('Sync completed successfully!');
    
    // Send email notification if enabled
    if (process.env.EMAIL_NOTIFICATIONS === 'true') {
      const syncData = {
        success: true,
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString(),
        sourcePath: OBSIDIAN_VAULT_PATH,
        summary: {
          totalFiles: syncStats.filesCopied + syncStats.filesSkipped,
          copiedFiles: syncStats.filesCopied,
          skippedFiles: syncStats.filesSkipped,
          errors: syncStats.errors.length,
          duration: Date.now() - startTime.getTime()
        },
        errors: syncStats.errors
      };
      
      await emailService.sendSyncNotification(syncData);
    }
    
  } catch (error) {
    console.error('Sync failed:', error.message);
    
    // Send error notification if enabled
    if (process.env.EMAIL_NOTIFICATIONS === 'true') {
      const syncData = {
        success: false,
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString(),
        sourcePath: OBSIDIAN_VAULT_PATH,
        summary: {
          totalFiles: syncStats.filesCopied + syncStats.filesSkipped,
          copiedFiles: syncStats.filesCopied,
          skippedFiles: syncStats.filesSkipped,
          errors: syncStats.errors.length + 1,
          duration: Date.now() - startTime.getTime()
        },
        errors: [...syncStats.errors, { type: 'main', error: error.message, timestamp: new Date().toISOString() }]
      };
      
      await emailService.sendSyncNotification(syncData);
    }
  }
}

// Run the script
main().catch(console.error); 