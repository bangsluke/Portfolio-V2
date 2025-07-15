#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  // Default Obsidian vault paths (will be overridden by environment variables)
  OBSIDIAN_PATHS: {
    windows: 'C:\\Users\\bangs\\Documents\\Obsidian Personal Notes\\Personal Notes',
    mobile: '/storage/emulated/0/Download/Obsidian Personal Notes/Personal Notes', // Android
    // Add more paths as needed
  },
  // Astro content directory
  ASTRO_CONTENT_DIR: path.join(__dirname, '../src/content/obsidian'),
  // Files/folders to exclude from sync
  EXCLUDE_PATTERNS: [
    '.obsidian',
    'node_modules',
    '.git',
    'Backup',
    'Templates',
    'Attachments',
    '*.tmp',
    '*.temp'
  ],
  // File extensions to sync
  INCLUDE_EXTENSIONS: ['.md', '.markdown'],
  // Tag to filter for portfolio notes
  PORTFOLIO_TAG: process.env.PORTFOLIO_TAG || 'portfolio',
  // Folder mapping for different tags
  FOLDER_MAPPING: {
    'project': 'projects',
    'client': 'clients', 
    'company': 'companies',
    'education': 'educations',
    'reference': 'references',
    'role': 'roles',
    'skill': 'skills'
  },
  // Whether to auto-deploy after sync
  AUTO_DEPLOY: process.env.AUTO_DEPLOY === 'true',
  // Git commit message
  COMMIT_MESSAGE: 'Sync portfolio notes from Obsidian',
  // Email configuration
  EMAIL_CONFIG: {
    enabled: process.env.EMAIL_NOTIFICATIONS === 'true',
    recipient: process.env.EMAIL_RECIPIENT || 'bangsluke@gmail.com',
    backendUrl: process.env.BACKEND_URL || 'https://bangsluke-backend-server.herokuapp.com'
  },
  // Error logging
  ERROR_LOG_PATH: path.join(__dirname, '../sync-errors.json')
};

class ObsidianSync {
  constructor() {
    this.sourcePath = this.getSourcePath();
    this.stats = {
      filesCopied: 0,
      filesSkipped: 0,
      errors: [],
      verificationErrors: []
    };
    this.syncStartTime = new Date();
    this.syncEndTime = null;
  }

  getSourcePath() {
    // Check environment variable first
    if (process.env.OBSIDIAN_PATH) {
      return process.env.OBSIDIAN_PATH;
    }

    // Detect platform and use appropriate path
    const platform = process.platform;
    if (platform === 'win32') {
      return CONFIG.OBSIDIAN_PATHS.windows;
    } else if (platform === 'android') {
      return CONFIG.OBSIDIAN_PATHS.mobile;
    }

    // Fallback: try to detect automatically
    const possiblePaths = Object.values(CONFIG.OBSIDIAN_PATHS);
    for (const possiblePath of possiblePaths) {
      try {
        if (fs.accessSync(possiblePath)) {
          return possiblePath;
        }
      } catch (e) {
        // Path doesn't exist, try next one
      }
    }

    throw new Error('Could not find Obsidian vault path. Please set OBSIDIAN_PATH environment variable.');
  }

  shouldExclude(filePath) {
    const fileName = path.basename(filePath);
    return CONFIG.EXCLUDE_PATTERNS.some(pattern => {
      if (pattern.includes('*')) {
        // Handle wildcard patterns
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(fileName);
      }
      return fileName === pattern || filePath.includes(pattern);
    });
  }

  shouldInclude(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return CONFIG.INCLUDE_EXTENSIONS.includes(ext);
  }

  async processMarkdownFile(sourcePath, targetPath) {
    try {
      let content = await fs.readFile(sourcePath, 'utf-8');
      
      // Check if file has portfolio tag before processing
      if (!this.hasPortfolioTag(content)) {
        this.stats.filesSkipped++;
        console.log(`- Skipped (no portfolio tag): ${path.relative(this.sourcePath, sourcePath)}`);
        return;
      }
      
      // Process Obsidian-specific syntax
      content = this.processObsidianContent(content);
      
      // Determine target folder based on tags
      const targetFolder = this.getTargetFolder(content);
      const fileName = path.basename(sourcePath, path.extname(sourcePath));
      const finalTargetPath = path.join(path.dirname(targetPath), targetFolder, path.basename(targetPath));
      
      // Ensure target folder exists
      await fs.mkdir(path.dirname(finalTargetPath), { recursive: true });
      
      // Add frontmatter if not present
      if (!content.startsWith('---')) {
        const frontmatter = `---
title: "${fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}"
date: ${new Date().toISOString().split('T')[0]}
tags: ["${CONFIG.PORTFOLIO_TAG}"]
---

`;
        content = frontmatter + content;
      } else {
        // Ensure portfolio tag is in existing frontmatter
        content = this.ensurePortfolioTag(content);
      }
      
      await fs.writeFile(finalTargetPath, content, 'utf-8');
      
      // Verify the file was copied successfully
      await this.verifyFileCopy(sourcePath, finalTargetPath, targetFolder);
      
      this.stats.filesCopied++;
      console.log(`✓ Copied to ${targetFolder}: ${path.relative(this.sourcePath, sourcePath)}`);
    } catch (error) {
      this.stats.errors.push({ file: sourcePath, error: error.message });
      console.error(`✗ Error processing ${sourcePath}:`, error.message);
    }
  }

  async verifyFileCopy(sourcePath, targetPath, targetFolder) {
    try {
      // Check if target file exists
      await fs.access(targetPath);
      
      // Check if target file has content
      const targetContent = await fs.readFile(targetPath, 'utf-8');
      if (!targetContent || targetContent.trim().length === 0) {
        throw new Error('Target file is empty');
      }
      
      // Check if source file still exists (optional verification)
      try {
        await fs.access(sourcePath);
      } catch (e) {
        // Source file no longer exists - this might be expected in some cases
        console.log(`⚠️ Source file no longer exists: ${path.relative(this.sourcePath, sourcePath)}`);
      }
      
    } catch (error) {
      const errorInfo = {
        sourcePath: path.relative(this.sourcePath, sourcePath),
        targetPath: path.relative(CONFIG.ASTRO_CONTENT_DIR, targetPath),
        targetFolder: targetFolder,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      this.stats.verificationErrors.push(errorInfo);
      console.error(`✗ Verification failed for ${path.relative(this.sourcePath, sourcePath)}:`, error.message);
    }
  }

  getTargetFolder(content) {
    // Extract tags from frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      
      // Check for tags array
      const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/i);
      if (tagsMatch) {
        const tags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, '').toLowerCase());
        
        // Find the first matching tag for folder mapping
        for (const tag of tags) {
          if (CONFIG.FOLDER_MAPPING[tag]) {
            return CONFIG.FOLDER_MAPPING[tag];
          }
        }
      }
      
      // Check for single tag
      for (const [tag, folder] of Object.entries(CONFIG.FOLDER_MAPPING)) {
        if (frontmatter.includes(`tag: ${tag}`) || frontmatter.includes(`tags: ${tag}`)) {
          return folder;
        }
      }
    }
    
    // Check for inline tags in content
    for (const [tag, folder] of Object.entries(CONFIG.FOLDER_MAPPING)) {
      const inlineTagPattern = new RegExp(`#${tag}\\b`, 'i');
      if (inlineTagPattern.test(content)) {
        return folder;
      }
    }
    
    // Default to obsidian folder if no specific tag found
    return 'obsidian';
  }

  hasPortfolioTag(content) {
    // Check for portfolio tag in frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      // Check for tags array or single tag
      const tagPatterns = [
        new RegExp(`tags:\\s*\\[.*${CONFIG.PORTFOLIO_TAG}.*\\]`, 'i'),
        new RegExp(`tags:\\s*${CONFIG.PORTFOLIO_TAG}`, 'i'),
        new RegExp(`tag:\\s*${CONFIG.PORTFOLIO_TAG}`, 'i')
      ];
      return tagPatterns.some(pattern => pattern.test(frontmatter));
    }
    
    // Check for inline tags in content (Obsidian style)
    const inlineTagPattern = new RegExp(`#${CONFIG.PORTFOLIO_TAG}\\b`, 'i');
    return inlineTagPattern.test(content);
  }

  ensurePortfolioTag(content) {
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const restOfContent = content.substring(frontmatterMatch[0].length);
      
      // Check if portfolio tag already exists
      if (this.hasPortfolioTag(content)) {
        return content;
      }
      
      // Add portfolio tag to existing frontmatter
      let newFrontmatter = frontmatter;
      
      // Try to add to existing tags array
      const tagsArrayMatch = frontmatter.match(/tags:\s*\[(.*?)\]/i);
      if (tagsArrayMatch) {
        const existingTags = tagsArrayMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, ''));
        if (!existingTags.includes(CONFIG.PORTFOLIO_TAG)) {
          existingTags.push(CONFIG.PORTFOLIO_TAG);
          newFrontmatter = frontmatter.replace(
            /tags:\s*\[.*?\]/i,
            `tags: [${existingTags.map(tag => `"${tag}"`).join(', ')}]`
          );
        }
      } else {
        // Add new tags array
        newFrontmatter = frontmatter + `\ntags: ["${CONFIG.PORTFOLIO_TAG}"]`;
      }
      
      return `---\n${newFrontmatter}\n---${restOfContent}`;
    }
    
    return content;
  }

  processObsidianContent(content) {
    // Convert Obsidian-specific syntax to standard markdown
    return content
      // Convert Obsidian internal links to standard markdown
      .replace(/\[\[([^\]]+)\]\]/g, '[$1]($1)')
      // Convert Obsidian callouts to standard markdown
      .replace(/^>\s*\[!(\w+)\]\s*(.+)$/gm, '> **$1:** $2')
      // Remove Obsidian-specific frontmatter properties
      .replace(/^aliases:\s*\[.*\]$/gm, '')
      .replace(/^tags:\s*\[.*\]$/gm, '')
      // Clean up empty lines
      .replace(/\n\s*\n\s*\n/g, '\n\n');
  }

  async copyDirectory(sourceDir, targetDir) {
    try {
      await fs.mkdir(targetDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const entries = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        if (!this.shouldExclude(sourcePath)) {
          await this.copyDirectory(sourcePath, targetPath);
        }
      } else if (entry.isFile() && this.shouldInclude(sourcePath)) {
        if (!this.shouldExclude(sourcePath)) {
          await this.processMarkdownFile(sourcePath, targetPath);
        } else {
          this.stats.filesSkipped++;
          console.log(`- Skipped: ${path.relative(this.sourcePath, sourcePath)}`);
        }
      }
    }
  }

  async sync() {
    console.log('🔄 Starting Obsidian sync...');
    console.log(`Source: ${this.sourcePath}`);
    console.log(`Target: ${CONFIG.ASTRO_CONTENT_DIR}`);
    console.log('');

    try {
      // Check if source directory exists
      await fs.access(this.sourcePath);
      
      // Clear target directory
      try {
        await fs.rm(CONFIG.ASTRO_CONTENT_DIR, { recursive: true, force: true });
      } catch (error) {
        // Directory might not exist
      }

      // Copy files
      await this.copyDirectory(this.sourcePath, CONFIG.ASTRO_CONTENT_DIR);

      // Print summary
      console.log('');
      console.log('📊 Sync Summary:');
      console.log(`  Files copied: ${this.stats.filesCopied}`);
      console.log(`  Files skipped: ${this.stats.filesSkipped} (no #${CONFIG.PORTFOLIO_TAG} tag)`);
      console.log(`  Errors: ${this.stats.errors.length}`);
      console.log(`  Portfolio tag filter: #${CONFIG.PORTFOLIO_TAG}`);

      if (this.stats.errors.length > 0) {
        console.log('');
        console.log('❌ Errors:');
        this.stats.errors.forEach(({ file, error }) => {
          console.log(`  ${file}: ${error}`);
        });
      }

      // Auto-deploy if enabled
      if (CONFIG.AUTO_DEPLOY && this.stats.filesCopied > 0) {
        await this.deploy();
      }

      console.log('');
      // Log errors to JSON file
      await this.logErrorsToFile();
      
      // Send email notification
      if (CONFIG.EMAIL_CONFIG.enabled) {
        await this.sendEmailNotification();
      }

      console.log('✅ Sync completed successfully!');

    } catch (error) {
      console.error('❌ Sync failed:', error.message);
      
      // Log errors even if sync failed
      await this.logErrorsToFile();
      
      // Send email notification for failure
      if (CONFIG.EMAIL_CONFIG.enabled) {
        await this.sendEmailNotification();
      }
      
      process.exit(1);
    }
  }

  async logErrorsToFile() {
    try {
      const errorLog = {
        syncStartTime: this.syncStartTime.toISOString(),
        syncEndTime: new Date().toISOString(),
        sourcePath: this.sourcePath,
        stats: this.stats,
        summary: {
          totalFiles: this.stats.filesCopied + this.stats.filesSkipped + this.stats.errors.length,
          filesCopied: this.stats.filesCopied,
          filesSkipped: this.stats.filesSkipped,
          processingErrors: this.stats.errors.length,
          verificationErrors: this.stats.verificationErrors.length,
          success: this.stats.errors.length === 0 && this.stats.verificationErrors.length === 0
        }
      };

      await fs.writeFile(CONFIG.ERROR_LOG_PATH, JSON.stringify(errorLog, null, 2), 'utf-8');
      console.log(`📝 Error log saved to: ${CONFIG.ERROR_LOG_PATH}`);
    } catch (error) {
      console.error('Failed to save error log:', error.message);
    }
  }

  async sendEmailNotification() {
    try {
      const isSuccess = this.stats.errors.length === 0 && this.stats.verificationErrors.length === 0;
      const subject = isSuccess ? '✅ Obsidian Sync Successful' : '❌ Obsidian Sync Failed';
      
      const emailBody = this.generateEmailBody();
      
      const emailData = {
        to: CONFIG.EMAIL_CONFIG.recipient,
        subject: subject,
        body: emailBody
      };

      // Send email via backend server
      const response = await fetch(`${CONFIG.EMAIL_CONFIG.backendUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        console.log('📧 Email notification sent successfully');
      } else {
        console.error('Failed to send email notification:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to send email notification:', error.message);
    }
  }

  generateEmailBody() {
    const isSuccess = this.stats.errors.length === 0 && this.stats.verificationErrors.length === 0;
    const totalFiles = this.stats.filesCopied + this.stats.filesSkipped + this.stats.errors.length;
    
    let body = `
<h2>Obsidian Sync Report</h2>
<p><strong>Status:</strong> ${isSuccess ? '✅ Successful' : '❌ Failed'}</p>
<p><strong>Sync Time:</strong> ${this.syncStartTime.toLocaleString()} - ${new Date().toLocaleString()}</p>
<p><strong>Source Path:</strong> ${this.sourcePath}</p>

<h3>Summary</h3>
<ul>
  <li><strong>Total Files Processed:</strong> ${totalFiles}</li>
  <li><strong>Files Copied:</strong> ${this.stats.filesCopied}</li>
  <li><strong>Files Skipped:</strong> ${this.stats.filesSkipped} (no #${CONFIG.PORTFOLIO_TAG} tag)</li>
  <li><strong>Processing Errors:</strong> ${this.stats.errors.length}</li>
  <li><strong>Verification Errors:</strong> ${this.stats.verificationErrors.length}</li>
</ul>
`;

    if (this.stats.errors.length > 0) {
      body += `
<h3>Processing Errors</h3>
<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <th>File</th>
    <th>Error</th>
  </tr>
`;
      this.stats.errors.forEach(error => {
        body += `
  <tr>
    <td>${error.file}</td>
    <td>${error.error}</td>
  </tr>
`;
      });
      body += '</table>';
    }

    if (this.stats.verificationErrors.length > 0) {
      body += `
<h3>Verification Errors</h3>
<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <th>Source File</th>
    <th>Target File</th>
    <th>Target Folder</th>
    <th>Error</th>
    <th>Timestamp</th>
  </tr>
`;
      this.stats.verificationErrors.forEach(error => {
        body += `
  <tr>
    <td>${error.sourcePath}</td>
    <td>${error.targetPath}</td>
    <td>${error.targetFolder}</td>
    <td>${error.error}</td>
    <td>${new Date(error.timestamp).toLocaleString()}</td>
  </tr>
`;
      });
      body += '</table>';
    }

    body += `
<p><em>This is an automated notification from your Obsidian sync script.</em></p>
`;

    return body;
  }

  async deploy() {
    console.log('');
    console.log('🚀 Starting deployment...');
    
    try {
      // Change to project directory
      const projectDir = path.join(__dirname, '..');
      process.chdir(projectDir);

      // Git operations
      console.log('📝 Committing changes...');
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "${CONFIG.COMMIT_MESSAGE}"`, { stdio: 'inherit' });
      
      console.log('📤 Pushing to remote...');
      execSync('git push', { stdio: 'inherit' });

      // Build and deploy (assuming Netlify)
      console.log('🔨 Building project...');
      execSync('npm run build', { stdio: 'inherit' });

      console.log('✅ Deployment completed!');
      
    } catch (error) {
      console.error('❌ Deployment failed:', error.message);
      throw error;
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node sync-obsidian.js [options]

Options:
  --deploy, -d          Auto-deploy after sync
  --help, -h           Show this help message
  --path <path>        Specify custom Obsidian vault path
  --tag <tag>          Specify portfolio tag (default: portfolio)

Environment Variables:
  OBSIDIAN_PATH        Path to Obsidian vault
  AUTO_DEPLOY          Set to 'true' to auto-deploy
  PORTFOLIO_TAG        Tag to filter for portfolio notes (default: portfolio)
  EMAIL_NOTIFICATIONS  Set to 'true' to enable email notifications
  EMAIL_RECIPIENT      Email address for notifications (default: bangsluke@gmail.com)
  BACKEND_URL          Backend server URL for email sending

Examples:
  node sync-obsidian.js
  node sync-obsidian.js --deploy
  node sync-obsidian.js --tag "public"
  OBSIDIAN_PATH="/path/to/vault" node sync-obsidian.js
  PORTFOLIO_TAG="showcase" node sync-obsidian.js
    `);
    return;
  }

  // Override config based on CLI arguments
  if (args.includes('--deploy') || args.includes('-d')) {
    CONFIG.AUTO_DEPLOY = true;
  }

  const pathIndex = args.indexOf('--path');
  if (pathIndex !== -1 && args[pathIndex + 1]) {
    process.env.OBSIDIAN_PATH = args[pathIndex + 1];
  }

  const tagIndex = args.indexOf('--tag');
  if (tagIndex !== -1 && args[tagIndex + 1]) {
    process.env.PORTFOLIO_TAG = args[tagIndex + 1];
  }

  const sync = new ObsidianSync();
  await sync.sync();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default ObsidianSync; 