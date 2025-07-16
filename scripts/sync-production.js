#!/usr/bin/env node

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { processDirectory as processMarkdownFiles } from './process-obsidian-markdown.js';
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

// Error tracking
let syncErrors = {
  timestamp: new Date().toISOString(),
  source: OBSIDIAN_VAULT_PATH,
  errors: [],
  summary: {
    totalFiles: 0,
    processedFiles: 0,
    copiedFiles: 0,
    skippedFiles: 0,
    errors: 0
  },
  success: false
};

console.log('🚀 Starting Production Obsidian Sync...');
console.log('📁 Obsidian vault path:', OBSIDIAN_VAULT_PATH);
console.log('🎯 Astro content path:', ASTRO_CONTENT_PATH);

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

// Process a markdown file
function processMarkdownFile(filePath, relativePath) {
  try {
    syncErrors.summary.totalFiles++;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const { tags } = parseFrontmatter(content);
    
    if (process.env.DEBUG) {
      console.log(`📄 Processing: ${relativePath}`);
      console.log(`🏷️  Tags found: ${tags.join(', ')}`);
    }
    
    // Check if file has portfolio tag
    const portfolioTag = process.env.PORTFOLIO_TAG || 'portfolio';
    if (!tags.includes(portfolioTag)) {
      syncErrors.summary.skippedFiles++;
      if (process.env.DEBUG) {
        console.log(`⏭️  Skipping - no ${portfolioTag} tag`);
      }
      return;
    }
    
    const targetFolder = getTargetFolder(tags);
    if (!targetFolder) {
      syncErrors.summary.skippedFiles++;
      if (process.env.DEBUG) {
        console.log(`⏭️  Skipping - no matching folder for tags: ${tags.join(', ')}`);
      }
      return;
    }
    
    const fileName = path.basename(filePath);
    const targetPath = path.join(ASTRO_CONTENT_PATH, targetFolder, fileName);
    
    // Check if target file is protected
    if (isProtected(fileName)) {
      syncErrors.summary.skippedFiles++;
      if (process.env.DEBUG) {
        console.log(`🛡️  Skipping - file is protected: ${fileName}`);
      }
      return;
    }
    
    // Filter out image references that could cause build errors
    content = content.replace(
      /!\[([^\]]*)\]\(#([^)]+)\)/g,
      (match, altText, imageName) => {
        return `<!-- Image removed during sync: ${altText} (${imageName}) -->`;
      }
    );
    
    // Also handle standard markdown images that might reference non-existent files
    content = content.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, altText, imagePath) => {
        // If it's an Obsidian-style reference (starts with #), convert to comment
        if (imagePath.startsWith('#')) {
          return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
        }
        // If it's a relative path that might not exist, also convert to comment
        if (imagePath.startsWith('./') || imagePath.startsWith('../') || (!imagePath.startsWith('http') && !imagePath.startsWith('/') && !imagePath.startsWith('data:'))) {
          return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
        }
        // Keep external URLs (http/https), absolute paths, and data URLs
        return match;
      }
    );
    
    // Additional filter for any remaining Obsidian-style image references
    content = content.replace(
      /!\[([^\]]*)\]\(#([^)]+)\)/g,
      (match, altText, imageName) => {
        return `<!-- Image removed during sync: ${altText} (${imageName}) -->`;
      }
    );
    
    // Write the filtered content to target folder
    fs.writeFileSync(targetPath, content, 'utf8');
    syncErrors.summary.copiedFiles++;
    
    if (process.env.DEBUG) {
      console.log(`✅ Copied to: ${targetPath}`);
    }
    
  } catch (error) {
    syncErrors.summary.errors++;
    const errorInfo = {
      file: filePath,
      error: error.message,
      timestamp: new Date().toISOString()
    };
    syncErrors.errors.push(errorInfo);
    console.error(`❌ Error processing ${filePath}:`, error.message);
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
        if (process.env.DEBUG) {
          console.log(`🛡️ Skipping protected item: ${itemRelativePath}`);
        }
        continue;
      }
      
      if (stat.isDirectory()) {
        processDirectory(fullPath, itemRelativePath);
      } else if (item.endsWith('.md')) {
        processMarkdownFile(fullPath, itemRelativePath);
      }
    }
  } catch (error) {
    syncErrors.summary.errors++;
    const errorInfo = {
      directory: dirPath,
      error: error.message,
      timestamp: new Date().toISOString()
    };
    syncErrors.errors.push(errorInfo);
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
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

// Build the Astro project
function buildProject() {
  try {
    console.log('🔨 Building Astro project...');
    execSync('npm run build', { 
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
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
          NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN
        }
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
          VERCEL_TOKEN: process.env.VERCEL_TOKEN
        }
      });
    }
    else {
      console.log('⚠️  No deployment configuration found. Skipping deployment.');
      return false;
    }
    
    console.log('✅ Deployment completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    return false;
  }
}

// Save error log
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
  console.log('📧 Preparing email notification...');
  console.log('📧 Email notifications enabled:', process.env.EMAIL_NOTIFICATIONS === 'true');
  
  const syncData = {
    success: syncErrors.success,
    startTime: syncErrors.timestamp,
    endTime: new Date().toISOString(),
    sourcePath: OBSIDIAN_VAULT_PATH,
    summary: syncErrors.summary,
    errors: syncErrors.errors
  };
  
  try {
    const emailResult = await emailService.sendSyncNotification(syncData);
    console.log('📧 Email notification result:', emailResult);
    return emailResult;
  } catch (error) {
    console.error('❌ Failed to send email notification:', error.message);
    return false;
  }
}

// Main sync function
async function main() {
  const startTime = Date.now();
  
  try {
    // Step 0: Initialize email service
    console.log('📧 Initializing email service...');
    const emailInitialized = await emailService.initialize();
    console.log('📧 Email service initialized:', emailInitialized);
    
    // Step 1: Ensure directories exist
    ensureDirectories();
    
    // Step 2: Process Obsidian files
    console.log('🔄 Processing Obsidian files...');
    processDirectory(OBSIDIAN_VAULT_PATH);
    
    // Step 3: Process markdown syntax
    console.log('📝 Processing markdown syntax...');
    processMarkdownFiles(ASTRO_CONTENT_PATH);
    console.log('🧹 Post-processing markdown files to remove image references...');
    postProcessContentImages(ASTRO_CONTENT_PATH);
    
    // Step 4: Build project
    const buildSuccess = buildProject();
    
    // Step 5: Deploy if configured and build was successful
    let deploySuccess = false;
    const autoDeploy = process.env.AUTO_DEPLOY === 'true';
    if (buildSuccess && autoDeploy) {
      deploySuccess = deployToProduction();
    }
    
    // Step 6: Update sync status - consider it successful if files were processed, even if build failed
    const filesProcessed = syncErrors.summary.copiedFiles > 0 || syncErrors.summary.processedFiles > 0;
    syncErrors.success = filesProcessed && buildSuccess && (!autoDeploy || deploySuccess);
    syncErrors.summary.processedFiles = syncErrors.summary.totalFiles;
    
    // Step 7: Save error log
    saveErrorLog();
    
    // Step 8: Send email notification (always send if files were processed)
    if (filesProcessed) {
      await sendEmailNotification();
    } else {
      console.log('📧 Skipping email notification - no files were processed');
    }
    
    // Step 9: Print summary
    const duration = Date.now() - startTime;
    console.log('\n📊 Sync Summary:');
    console.log(`⏱️  Duration: ${duration}ms`);
    console.log(`📄 Total files: ${syncErrors.summary.totalFiles}`);
    console.log(`✅ Copied files: ${syncErrors.summary.copiedFiles}`);
    console.log(`⏭️  Skipped files: ${syncErrors.summary.skippedFiles}`);
    console.log(`❌ Errors: ${syncErrors.summary.errors}`);
    console.log(`🎯 Success: ${syncErrors.success ? '✅' : '❌'}`);
    console.log(`📧 Email sent: ${filesProcessed ? '✅' : '❌'}`);
    
    if (syncErrors.success) {
      console.log('🎉 Sync completed successfully!');
    } else {
      console.log('⚠️  Sync completed with errors. Check the error log for details.');
    }
    
  } catch (error) {
    syncErrors.success = false;
    syncErrors.errors.push({
      type: 'main',
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    console.error('❌ Sync failed:', error.message);
    saveErrorLog();
    
    // Try to send error email
    try {
      await sendEmailNotification();
    } catch (emailError) {
      console.error('❌ Failed to send error email:', emailError.message);
    }
  }
}

// Run the sync
main().catch(console.error); 