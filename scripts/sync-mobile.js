#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mobile-friendly configuration
const MOBILE_CONFIG = {
  // Common mobile paths
  MOBILE_PATHS: {
    android: [
      '/storage/emulated/0/Download/Obsidian Personal Notes',
      '/storage/emulated/0/Documents/Obsidian Personal Notes',
      '/sdcard/Download/Obsidian Personal Notes',
      '/sdcard/Documents/Obsidian Personal Notes'
    ],
    ios: [
      // iOS apps are sandboxed, so we need to use app-specific paths
      '/var/mobile/Containers/Data/Application/*/Documents/Obsidian Personal Notes',
      '/private/var/mobile/Containers/Data/Application/*/Documents/Obsidian Personal Notes',
      // Alternative: Files app accessible locations
      '/var/mobile/Containers/Data/Application/*/Documents/',
      '/private/var/mobile/Containers/Data/Application/*/Documents/'
    ],
    // Add more platform-specific paths as needed
  },
  // Astro content directory
  ASTRO_CONTENT_DIR: path.join(__dirname, '../src/content/obsidian'),
  // Files to exclude
  EXCLUDE_PATTERNS: [
    '.obsidian',
    'node_modules',
    '.git',
    'Backup',
    'Templates',
    'Attachments',
    '*.tmp',
    '*.temp',
    '*.DS_Store',
    'Thumbs.db'
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
  // Email configuration
  EMAIL_CONFIG: {
    enabled: process.env.EMAIL_NOTIFICATIONS === 'true',
    recipient: process.env.EMAIL_RECIPIENT || 'bangsluke@gmail.com',
    backendUrl: process.env.BACKEND_URL || 'https://bangsluke-backend-server.herokuapp.com'
  },
  // Error logging
  ERROR_LOG_PATH: path.join(__dirname, '../sync-errors.json'),
  // Sync methods
  SYNC_METHODS: {
    'local': 'Local file system copy',
    'git': 'Git repository sync',
    'cloud': 'Cloud storage sync (Dropbox, Google Drive, etc.)',
    'ssh': 'SSH/SCP sync',
    'files-app': 'iOS Files app sync (iPhone/iPad)',
    'working-copy': 'Working Copy app sync (Git client for iOS)',
    'shortcuts': 'iOS Shortcuts automation'
  }
};

class MobileObsidianSync {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.stats = {
      filesCopied: 0,
      filesSkipped: 0,
      errors: [],
      verificationErrors: []
    };
    this.syncStartTime = new Date();
    this.syncEndTime = null;
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async detectPlatform() {
    const platform = process.platform;
    console.log(`Detected platform: ${platform}`);
    
    if (platform === 'android') {
      return 'android';
    } else if (platform === 'darwin' && process.env.MOBILE === 'true') {
      return 'ios';
    } else {
      return 'unknown';
    }
  }

  async findObsidianPath() {
    const platform = await this.detectPlatform();
    const possiblePaths = MOBILE_CONFIG.MOBILE_PATHS[platform] || [];
    
    console.log('🔍 Searching for Obsidian vault...');
    
    // Check environment variable first
    if (process.env.OBSIDIAN_PATH) {
      try {
        await fs.access(process.env.OBSIDIAN_PATH);
        console.log(`✓ Found vault at: ${process.env.OBSIDIAN_PATH}`);
        return process.env.OBSIDIAN_PATH;
      } catch (e) {
        console.log(`✗ Environment path not accessible: ${process.env.OBSIDIAN_PATH}`);
      }
    }

    // Try to find vault automatically
    for (const possiblePath of possiblePaths) {
      try {
        await fs.access(possiblePath);
        console.log(`✓ Found vault at: ${possiblePath}`);
        return possiblePath;
      } catch (e) {
        // Path doesn't exist, try next one
      }
    }

    // Interactive path selection
    console.log('\n❌ Could not automatically find Obsidian vault.');
    const customPath = await this.question('Please enter the path to your Obsidian vault: ');
    
    try {
      await fs.access(customPath);
      console.log(`✓ Vault found at: ${customPath}`);
      return customPath;
    } catch (e) {
      throw new Error(`Invalid path: ${customPath}`);
    }
  }

  async selectSyncMethod() {
    console.log('\n📱 Select sync method:');
    Object.entries(MOBILE_CONFIG.SYNC_METHODS).forEach(([key, description], index) => {
      console.log(`${index + 1}. ${key} - ${description}`);
    });

    const choice = await this.question('\nEnter your choice (1-7): ');
    const methods = Object.keys(MOBILE_CONFIG.SYNC_METHODS);
    const selectedMethod = methods[parseInt(choice) - 1];

    if (!selectedMethod) {
      throw new Error('Invalid choice');
    }

    return selectedMethod;
  }

  async setupCloudSync() {
    console.log('\n☁️ Setting up cloud sync...');
    
    const cloudType = await this.question('Cloud service (dropbox/google-drive/onedrive/other): ');
    const cloudPath = await this.question('Path to cloud-synced Obsidian folder: ');
    
    // Create a symlink or copy mechanism
    const localPath = path.join(__dirname, '../temp-obsidian-sync');
    
    try {
      await fs.mkdir(localPath, { recursive: true });
      console.log(`✓ Created local sync directory: ${localPath}`);
      
      // For now, we'll just copy files
      // In a real implementation, you might want to use rsync or similar
      return { type: cloudType, localPath, cloudPath };
    } catch (e) {
      throw new Error(`Failed to setup cloud sync: ${e.message}`);
    }
  }

  async setupSSHSync() {
    console.log('\n🔐 Setting up SSH sync...');
    
    const host = await this.question('SSH host (e.g., user@server.com): ');
    const remotePath = await this.question('Remote Obsidian path: ');
    const localPath = path.join(__dirname, '../temp-obsidian-sync');
    
    try {
      await fs.mkdir(localPath, { recursive: true });
      console.log(`✓ Created local sync directory: ${localPath}`);
      
      return { host, remotePath, localPath };
    } catch (e) {
      throw new Error(`Failed to setup SSH sync: ${e.message}`);
    }
  }

  async setupFilesAppSync() {
    console.log('\n📁 Setting up iOS Files app sync...');
    console.log('Note: This requires manual file transfer via Files app');
    
    const localPath = path.join(__dirname, '../temp-obsidian-sync');
    const instructions = `
📱 iOS Files App Sync Instructions:

1. In Obsidian mobile app, export your vault:
   - Go to Settings → About → Export vault
   - Choose "Export as plain text"
   - Save to Files app

2. In Files app:
   - Navigate to the exported folder
   - Copy files to a location accessible by this script
   - Or use AirDrop to transfer to your computer

3. Enter the path where you saved the files:
`;
    
    console.log(instructions);
    const filesPath = await this.question('Path to exported Obsidian files: ');
    
    try {
      await fs.mkdir(localPath, { recursive: true });
      console.log(`✓ Created local sync directory: ${localPath}`);
      
      return { filesPath, localPath };
    } catch (e) {
      throw new Error(`Failed to setup Files app sync: ${e.message}`);
    }
  }

  async setupWorkingCopySync() {
    console.log('\n📚 Setting up Working Copy sync...');
    console.log('Note: This requires Working Copy app and a Git repository');
    
    const repoUrl = await this.question('Git repository URL: ');
    const branch = await this.question('Branch name (default: main): ') || 'main';
    const localPath = path.join(__dirname, '../temp-obsidian-sync');
    
    try {
      await fs.mkdir(localPath, { recursive: true });
      console.log(`✓ Created local sync directory: ${localPath}`);
      
      return { repoUrl, branch, localPath };
    } catch (e) {
      throw new Error(`Failed to setup Working Copy sync: ${e.message}`);
    }
  }

  async setupShortcutsSync() {
    console.log('\n⚡ Setting up iOS Shortcuts sync...');
    console.log('Note: This requires an iOS Shortcut to be created');
    
    const webhookUrl = await this.question('Webhook URL (from Shortcuts app): ');
    const localPath = path.join(__dirname, '../temp-obsidian-sync');
    
    try {
      await fs.mkdir(localPath, { recursive: true });
      console.log(`✓ Created local sync directory: ${localPath}`);
      
      return { webhookUrl, localPath };
    } catch (e) {
      throw new Error(`Failed to setup Shortcuts sync: ${e.message}`);
    }
  }

  async syncViaSSH(config) {
    console.log('📡 Syncing via SSH...');
    
    try {
      // Use scp to copy files
      const scpCommand = `scp -r "${config.host}:${config.remotePath}/*" "${config.localPath}/"`;
      execSync(scpCommand, { stdio: 'inherit' });
      
      console.log('✓ SSH sync completed');
      return config.localPath;
    } catch (e) {
      throw new Error(`SSH sync failed: ${e.message}`);
    }
  }

  async syncViaCloud(config) {
    console.log('☁️ Syncing via cloud storage...');
    
    try {
      // For cloud sync, we assume the files are already synced locally
      // You might want to implement specific cloud API calls here
      await fs.access(config.cloudPath);
      console.log('✓ Cloud sync completed');
      return config.cloudPath;
    } catch (e) {
      throw new Error(`Cloud sync failed: ${e.message}`);
    }
  }

  async syncViaFilesApp(config) {
    console.log('📁 Syncing via iOS Files app...');
    
    try {
      // Copy files from the specified path
      await fs.access(config.filesPath);
      
      // Copy all markdown files
      const entries = await fs.readdir(config.filesPath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
          const sourcePath = path.join(config.filesPath, entry.name);
          const targetPath = path.join(config.localPath, entry.name);
          await fs.copyFile(sourcePath, targetPath);
        }
      }
      
      console.log('✓ Files app sync completed');
      return config.localPath;
    } catch (e) {
      throw new Error(`Files app sync failed: ${e.message}`);
    }
  }

  async syncViaWorkingCopy(config) {
    console.log('📚 Syncing via Working Copy...');
    
    try {
      // Clone or pull the repository
      const repoPath = path.join(config.localPath, 'repo');
      
      if (!fs.existsSync(path.join(repoPath, '.git'))) {
        console.log('Cloning repository...');
        execSync(`git clone -b ${config.branch} ${config.repoUrl} ${repoPath}`, { stdio: 'inherit' });
      } else {
        console.log('Pulling latest changes...');
        execSync(`cd ${repoPath} && git pull origin ${config.branch}`, { stdio: 'inherit' });
      }
      
      console.log('✓ Working Copy sync completed');
      return repoPath;
    } catch (e) {
      throw new Error(`Working Copy sync failed: ${e.message}`);
    }
  }

  async syncViaShortcuts(config) {
    console.log('⚡ Syncing via iOS Shortcuts...');
    
    try {
      // This would typically involve a webhook that receives files
      // For now, we'll assume files are placed in a specific directory
      const shortcutsPath = path.join(config.localPath, 'shortcuts');
      
      // Check if files were placed by the shortcut
      await fs.access(shortcutsPath);
      console.log('✓ Shortcuts sync completed');
      return shortcutsPath;
    } catch (e) {
      throw new Error(`Shortcuts sync failed: ${e.message}`);
    }
  }

  shouldExclude(filePath) {
    const fileName = path.basename(filePath);
    return MOBILE_CONFIG.EXCLUDE_PATTERNS.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(fileName);
      }
      return fileName === pattern || filePath.includes(pattern);
    });
  }

  shouldInclude(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MOBILE_CONFIG.INCLUDE_EXTENSIONS.includes(ext);
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
tags: ["${MOBILE_CONFIG.PORTFOLIO_TAG}"]
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
        targetPath: path.relative(MOBILE_CONFIG.ASTRO_CONTENT_DIR, targetPath),
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
          if (MOBILE_CONFIG.FOLDER_MAPPING[tag]) {
            return MOBILE_CONFIG.FOLDER_MAPPING[tag];
          }
        }
      }
      
      // Check for single tag
      for (const [tag, folder] of Object.entries(MOBILE_CONFIG.FOLDER_MAPPING)) {
        if (frontmatter.includes(`tag: ${tag}`) || frontmatter.includes(`tags: ${tag}`)) {
          return folder;
        }
      }
    }
    
    // Check for inline tags in content
    for (const [tag, folder] of Object.entries(MOBILE_CONFIG.FOLDER_MAPPING)) {
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
        new RegExp(`tags:\\s*\\[.*${MOBILE_CONFIG.PORTFOLIO_TAG}.*\\]`, 'i'),
        new RegExp(`tags:\\s*${MOBILE_CONFIG.PORTFOLIO_TAG}`, 'i'),
        new RegExp(`tag:\\s*${MOBILE_CONFIG.PORTFOLIO_TAG}`, 'i')
      ];
      return tagPatterns.some(pattern => pattern.test(frontmatter));
    }
    
    // Check for inline tags in content (Obsidian style)
    const inlineTagPattern = new RegExp(`#${MOBILE_CONFIG.PORTFOLIO_TAG}\\b`, 'i');
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
        if (!existingTags.includes(MOBILE_CONFIG.PORTFOLIO_TAG)) {
          existingTags.push(MOBILE_CONFIG.PORTFOLIO_TAG);
          newFrontmatter = frontmatter.replace(
            /tags:\s*\[.*?\]/i,
            `tags: [${existingTags.map(tag => `"${tag}"`).join(', ')}]`
          );
        }
      } else {
        // Add new tags array
        newFrontmatter = frontmatter + `\ntags: ["${MOBILE_CONFIG.PORTFOLIO_TAG}"]`;
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
    console.log('📱 Mobile Obsidian Sync');
    console.log('=======================\n');

    try {
      // Find Obsidian vault
      this.sourcePath = await this.findObsidianPath();
      
      // Select sync method
      const syncMethod = await this.selectSyncMethod();
      
      let actualSourcePath = this.sourcePath;
      
      // Handle different sync methods
      switch (syncMethod) {
        case 'ssh':
          const sshConfig = await this.setupSSHSync();
          actualSourcePath = await this.syncViaSSH(sshConfig);
          break;
        case 'cloud':
          const cloudConfig = await this.setupCloudSync();
          actualSourcePath = await this.syncViaCloud(cloudConfig);
          break;
        case 'files-app':
          const filesAppConfig = await this.setupFilesAppSync();
          actualSourcePath = await this.syncViaFilesApp(filesAppConfig);
          break;
        case 'working-copy':
          const workingCopyConfig = await this.setupWorkingCopySync();
          actualSourcePath = await this.syncViaWorkingCopy(workingCopyConfig);
          break;
        case 'shortcuts':
          const shortcutsConfig = await this.setupShortcutsSync();
          actualSourcePath = await this.syncViaShortcuts(shortcutsConfig);
          break;
        case 'git':
          console.log('📚 Git sync - assuming vault is in a git repository');
          break;
        case 'local':
        default:
          console.log('📁 Using local file system');
          break;
      }

      // Update source path for processing
      this.sourcePath = actualSourcePath;
      
      console.log(`\n🔄 Starting sync...`);
      console.log(`Source: ${this.sourcePath}`);
      console.log(`Target: ${MOBILE_CONFIG.ASTRO_CONTENT_DIR}`);
      console.log('');

      // Check if source directory exists
      await fs.access(this.sourcePath);
      
      // Clear target directory
      try {
        await fs.rm(MOBILE_CONFIG.ASTRO_CONTENT_DIR, { recursive: true, force: true });
      } catch (error) {
        // Directory might not exist
      }

      // Copy files
      await this.copyDirectory(this.sourcePath, MOBILE_CONFIG.ASTRO_CONTENT_DIR);

      // Print summary
      console.log('');
      console.log('📊 Sync Summary:');
      console.log(`  Files copied: ${this.stats.filesCopied}`);
      console.log(`  Files skipped: ${this.stats.filesSkipped} (no #${MOBILE_CONFIG.PORTFOLIO_TAG} tag)`);
      console.log(`  Errors: ${this.stats.errors.length}`);
      console.log(`  Portfolio tag filter: #${MOBILE_CONFIG.PORTFOLIO_TAG}`);

      if (this.stats.errors.length > 0) {
        console.log('');
        console.log('❌ Errors:');
        this.stats.errors.forEach(({ file, error }) => {
          console.log(`  ${file}: ${error}`);
        });
      }

      // Ask about deployment
      const shouldDeploy = await this.question('\n🚀 Deploy to production? (y/n): ');
      if (shouldDeploy.toLowerCase() === 'y') {
        await this.deploy();
      }

      // Log errors to JSON file
      await this.logErrorsToFile();
      
      // Send email notification
      if (MOBILE_CONFIG.EMAIL_CONFIG.enabled) {
        await this.sendEmailNotification();
      }

      console.log('');
      console.log('✅ Mobile sync completed successfully!');

    } catch (error) {
      console.error('❌ Mobile sync failed:', error.message);
      
      // Log errors even if sync failed
      await this.logErrorsToFile();
      
      // Send email notification for failure
      if (MOBILE_CONFIG.EMAIL_CONFIG.enabled) {
        await this.sendEmailNotification();
      }
      
      process.exit(1);
    } finally {
      this.rl.close();
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

      await fs.writeFile(MOBILE_CONFIG.ERROR_LOG_PATH, JSON.stringify(errorLog, null, 2), 'utf-8');
      console.log(`📝 Error log saved to: ${MOBILE_CONFIG.ERROR_LOG_PATH}`);
    } catch (error) {
      console.error('Failed to save error log:', error.message);
    }
  }

  async sendEmailNotification() {
    try {
      const isSuccess = this.stats.errors.length === 0 && this.stats.verificationErrors.length === 0;
      const subject = isSuccess ? '✅ Mobile Obsidian Sync Successful' : '❌ Mobile Obsidian Sync Failed';
      
      const emailBody = this.generateEmailBody();
      
      const emailData = {
        to: MOBILE_CONFIG.EMAIL_CONFIG.recipient,
        subject: subject,
        body: emailBody
      };

      // Send email via backend server
      const response = await fetch(`${MOBILE_CONFIG.EMAIL_CONFIG.backendUrl}/send-email`, {
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
<h2>Mobile Obsidian Sync Report</h2>
<p><strong>Status:</strong> ${isSuccess ? '✅ Successful' : '❌ Failed'}</p>
<p><strong>Sync Time:</strong> ${this.syncStartTime.toLocaleString()} - ${new Date().toLocaleString()}</p>
<p><strong>Source Path:</strong> ${this.sourcePath}</p>

<h3>Summary</h3>
<ul>
  <li><strong>Total Files Processed:</strong> ${totalFiles}</li>
  <li><strong>Files Copied:</strong> ${this.stats.filesCopied}</li>
  <li><strong>Files Skipped:</strong> ${this.stats.filesSkipped} (no #${MOBILE_CONFIG.PORTFOLIO_TAG} tag)</li>
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
<p><em>This is an automated notification from your Mobile Obsidian sync script.</em></p>
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
      execSync('git commit -m "Mobile sync: Update Obsidian notes"', { stdio: 'inherit' });
      
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
Usage: node sync-mobile.js [options]

Mobile-friendly Obsidian sync for different devices and platforms.

Options:
  --help, -h           Show this help message
  --path <path>        Specify custom Obsidian vault path
  --method <method>    Specify sync method (local/git/cloud/ssh)

Environment Variables:
  OBSIDIAN_PATH        Path to Obsidian vault
  MOBILE               Set to 'true' for mobile platform detection

Examples:
  node sync-mobile.js
  node sync-mobile.js --path "/path/to/vault"
  MOBILE=true node sync-mobile.js
    `);
    return;
  }

  // Override config based on CLI arguments
  const pathIndex = args.indexOf('--path');
  if (pathIndex !== -1 && args[pathIndex + 1]) {
    process.env.OBSIDIAN_PATH = args[pathIndex + 1];
  }

  const sync = new MobileObsidianSync();
  await sync.sync();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default MobileObsidianSync; 