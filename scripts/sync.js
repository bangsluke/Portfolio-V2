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

// Sync mode configuration
const SYNC_MODE = process.env.SYNC_MODE || 'development'; // 'development', 'production', 'mobile'
const EMAIL_NOTIFICATIONS = process.env.EMAIL_NOTIFICATIONS === 'true';
const AUTO_DEPLOY = process.env.AUTO_DEPLOY === 'true';
const DEBUG_MODE = process.env.DEBUG === 'true';

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
      .replace(/\[\[([^\]]+)\]\]/g, '$1'); // Remove Obsidian-style links [[text]] -> text
  }
  return null;
}

// Extract sections and add to frontmatter based on content type
function extractSectionsToFrontmatter(content, contentType) {
  // Define sections to extract based on content type
  const sectionsToExtract = [
    // Role-specific sections
    { name: 'Role Description', property: 'roleDescription', contentType: 'role' },
    { name: 'Key Achievement', property: 'keyAchievement', contentType: 'role' },
    
    // Project-specific sections
    { name: 'Short Description', property: 'shortDescription', contentType: 'project' },
    { name: 'Long Description', property: 'longDescription', contentType: 'project' },
    { name: 'Lessons Learned', property: 'lessonsLearned', contentType: 'project' },
    
    // Education-specific sections
    { name: 'Qualifications', property: 'qualifications', contentType: 'education' },
    { name: 'Additional Details', property: 'additionalDetails', contentType: 'education' },
    
    // Company-specific sections
    { name: 'Company Description', property: 'companyDescription', contentType: 'company' },
    { name: 'Key Achievement', property: 'keyAchievement', contentType: 'company' },
    
    // Skill-specific sections (excluding skillDescription - should come from YAML frontmatter)
    { name: 'Key Achievement', property: 'keyAchievement', contentType: 'skill' },
    
    // Client-specific sections
    { name: 'Client Description', property: 'clientDescription', contentType: 'client' },
    { name: 'Key Achievement', property: 'keyAchievement', contentType: 'client' },
    
    // Reference-specific sections
    { name: 'Reference Description', property: 'referenceDescription', contentType: 'reference' },
    { name: 'Key Achievement', property: 'keyAchievement', contentType: 'reference' }
  ];

  const extractedData = {};
  const endMarker = '>[!top] [Back to top](#Table%20of%20Contents)';

  // Extract content from each section that matches the content type
  sectionsToExtract.forEach(({ name, property, contentType: sectionContentType }) => {
    if (sectionContentType === contentType) {
      const sectionContent = extractSectionContent(content, name, endMarker);
      if (sectionContent) {
        extractedData[property] = sectionContent;
        if (DEBUG_MODE) {
          console.log(`📝 Extracted ${property} for ${contentType}: ${sectionContent.substring(0, 50)}...`);
        }
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
            console.log(`✅ Added ${property} to frontmatter`);
          }
        } else {
          if (DEBUG_MODE) {
            console.log(`⚠️  Skipped ${property} - already exists in frontmatter`);
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

// Error tracking (only for production mode)
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

console.log(`🚀 Starting ${SYNC_MODE.toUpperCase()} Obsidian Sync...`);
console.log('📁 Obsidian vault path:', OBSIDIAN_VAULT_PATH);
console.log('🎯 Astro content path:', ASTRO_CONTENT_PATH);
console.log('⚙️  Sync mode:', SYNC_MODE);
console.log('📧 Email notifications:', EMAIL_NOTIFICATIONS ? 'enabled' : 'disabled');
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
    'roles': 'role',
    'projects': 'project',
    'educations': 'education',
    'companies': 'company',
    'skills': 'skill',
    'clients': 'client',
    'references': 'reference'
  };
  return folderToTypeMap[targetFolder] || null;
}

// Process a markdown file
function processMarkdownFile(filePath, relativePath) {
  try {
    if (SYNC_MODE === 'production') {
      syncErrors.summary.totalFiles++;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const { tags } = parseFrontmatter(content);
    
    if (DEBUG_MODE) {
      console.log(`📄 Processing: ${relativePath}`);
      console.log(`🏷️  Tags found: ${tags.join(', ')}`);
    }
    
    // Check if file has portfolio tag
    const portfolioTag = process.env.PORTFOLIO_TAG || 'portfolio';
    if (!tags.includes(portfolioTag)) {
      if (SYNC_MODE === 'production') {
        syncErrors.summary.skippedFiles++;
      }
      if (DEBUG_MODE) {
        console.log(`⏭️  Skipping - no ${portfolioTag} tag`);
      }
      return;
    }
    
    const targetFolder = getTargetFolder(tags);
    if (!targetFolder) {
      if (SYNC_MODE === 'production') {
        syncErrors.summary.skippedFiles++;
      }
      if (DEBUG_MODE) {
        console.log(`⏭️  Skipping - no matching folder for tags: ${tags.join(', ')}`);
      }
      return;
    }
    
    const fileName = path.basename(filePath);
    const targetPath = path.join(ASTRO_CONTENT_PATH, targetFolder, fileName);
    
    // Check if target file is protected
    if (isProtected(fileName)) {
      if (SYNC_MODE === 'production') {
        syncErrors.summary.skippedFiles++;
      }
      if (DEBUG_MODE) {
        console.log(`🛡️  Skipping - file is protected: ${fileName}`);
      }
      return;
    }
    
    // Extract sections based on content type
    const contentType = getContentType(targetFolder);
    if (contentType) {
      content = extractSectionsToFrontmatter(content, contentType);
      if (DEBUG_MODE) {
        console.log(`🔍 Applied section extraction for content type: ${contentType}`);
      }
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
    
    // Write the filtered content to target folder
    fs.writeFileSync(targetPath, content, 'utf8');
    
    if (SYNC_MODE === 'production') {
      syncErrors.summary.copiedFiles++;
    }
    
    if (DEBUG_MODE) {
      console.log(`✅ Copied to: ${targetPath}`);
    }
    
  } catch (error) {
    if (SYNC_MODE === 'production') {
      syncErrors.summary.errors++;
      const errorInfo = {
        file: filePath,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      syncErrors.errors.push(errorInfo);
    }
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
        if (DEBUG_MODE) {
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
    if (SYNC_MODE === 'production') {
      syncErrors.summary.errors++;
      const errorInfo = {
        directory: dirPath,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      syncErrors.errors.push(errorInfo);
    }
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
    // Generic deployment
    else {
      console.log('📤 Running generic deployment...');
      execSync('npm run deploy', {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
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
    console.log('📧 Sending email notification...');
    
    const subject = `Portfolio Sync ${syncErrors.success ? '✅ Success' : '❌ Failed'}`;
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
        <li>Errors: ${syncErrors.summary.errors}</li>
      </ul>
      
      ${syncErrors.errors.length > 0 ? `
        <h3>Errors</h3>
        <ul>
          ${syncErrors.errors.map(error => `
            <li><strong>${error.file || error.directory}:</strong> ${error.error}</li>
          `).join('')}
        </ul>
      ` : ''}
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
    
    // Ensure directories exist
    ensureDirectories();
    
    // Process Obsidian vault
    console.log('📁 Processing Obsidian vault...');
    processDirectory(OBSIDIAN_VAULT_PATH);
    
    // Post-process content (only for production mode)
    if (SYNC_MODE === 'production') {
      console.log('🔧 Post-processing content...');
      postProcessContentImages(ASTRO_CONTENT_PATH);
    }
    
    // Build project (only for production mode or when auto deploy is enabled)
    let buildSuccess = true;
    if (SYNC_MODE === 'production' || AUTO_DEPLOY) {
      buildSuccess = buildProject();
    }
    
    // Deploy to production (only when auto deploy is enabled)
    let deploySuccess = true;
    if (AUTO_DEPLOY) {
      deploySuccess = deployToProduction();
    }
    
    // Update sync status
    if (SYNC_MODE === 'production') {
      syncErrors.success = buildSuccess && deploySuccess && syncErrors.summary.errors === 0;
    }
    
    // Save error log (only for production mode)
    if (SYNC_MODE === 'production') {
      saveErrorLog();
    }
    
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
    
    if (SYNC_MODE === 'production') {
      syncErrors.success = false;
      saveErrorLog();
      await sendEmailNotification();
    }
    
    process.exit(1);
  }
}

// Run the main function
main(); 