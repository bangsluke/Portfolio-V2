#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Process Obsidian-specific syntax to standard markdown
function processObsidianSyntax(content) {
  let processedContent = content;

  // Remove or disable Obsidian image references that could cause build errors
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(#([^)]+)\)/g,
    (match, altText, imageName) => {
      // Convert to a comment that won't cause build errors
      return `<!-- Image removed during sync: ${altText} (${imageName}) -->`;
    }
  );

  // Also handle standard markdown images that might reference non-existent files
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, altText, imagePath) => {
      // If it's an Obsidian-style reference (starts with #), convert to comment
      if (imagePath.startsWith('#')) {
        return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
      }
      // If it's a relative path that might not exist, also convert to comment
      if (imagePath.startsWith('./') || imagePath.startsWith('../') || !imagePath.startsWith('http')) {
        return `<!-- Image removed during sync: ${altText} (${imagePath}) -->`;
      }
      // Keep external URLs (http/https)
      return match;
    }
  );

  // Convert Dataview code blocks to plain text or remove them
  processedContent = processedContent.replace(
    /```dataview\n([\s\S]*?)```/g,
    (match, dataviewContent) => {
      // Convert to a comment block that won't cause syntax highlighting issues
      return `\n<!-- Dataview Query (hidden in production):\n${dataviewContent}\n-->\n`;
    }
  );

  // Convert Obsidian internal links to standard markdown
  processedContent = processedContent.replace(
    /\[\[([^\]]+)\]\]/g,
    (match, linkText) => {
      // Extract the display text and link
      const parts = linkText.split('|');
      const displayText = parts[1] || parts[0];
      const link = parts[0].replace(/\s+/g, '-').toLowerCase();
      return `[${displayText}](#${link})`;
    }
  );

  // Convert Obsidian callouts to standard markdown
  processedContent = processedContent.replace(
    /> \[!([^\]]+)\](.*?)\n/g,
    (match, calloutType, content) => {
      return `> **${calloutType.toUpperCase()}:**${content}\n`;
    }
  );

  // Remove Obsidian-specific frontmatter fields
  processedContent = processedContent.replace(
    /^---\s*\n([\s\S]*?)\n---\s*\n/,
    (match, frontmatter) => {
      // Remove Obsidian-specific fields but keep standard ones
      const lines = frontmatter.split('\n');
      const filteredLines = lines.filter(line => {
        const trimmed = line.trim();
        // Keep standard frontmatter fields
        if (trimmed.startsWith('title:') || 
            trimmed.startsWith('date:') || 
            trimmed.startsWith('tags:') ||
            trimmed.startsWith('description:') ||
            trimmed.startsWith('image:') ||
            trimmed.startsWith('---')) {
          return true;
        }
        // Remove Obsidian-specific fields
        if (trimmed.startsWith('aliases:') ||
            trimmed.startsWith('created:') ||
            trimmed.startsWith('modified:') ||
            trimmed.startsWith('viewCount:') ||
            trimmed.startsWith('projectURL:') ||
            trimmed.startsWith('codeURL:') ||
            trimmed.startsWith('codeMultipleRepos:') ||
            trimmed.startsWith('folderURL:') ||
            trimmed.startsWith('logoURL:') ||
            trimmed.startsWith('imageURL:') ||
            trimmed.startsWith('dateStart:') ||
            trimmed.startsWith('dateEnd:') ||
            trimmed.startsWith('technologies:') ||
            trimmed.startsWith('projectCategory:') ||
            trimmed.startsWith('linkedCompany:') ||
            trimmed.startsWith('toolOwner:') ||
            trimmed.startsWith('developers:') ||
            trimmed.startsWith('topicTags:') ||
            trimmed.startsWith('powerShellAlias:') ||
            trimmed.startsWith('version:') ||
            trimmed.startsWith('skillRating:') ||
            trimmed.startsWith('skillDescription:') ||
            trimmed.startsWith('referenceRole:') ||
            trimmed.startsWith('referenceEmail:') ||
            trimmed.startsWith('referenceNumber:') ||
            trimmed.startsWith('referenceAddress:') ||
            trimmed.startsWith('birthday:') ||
            trimmed.startsWith('died:') ||
            trimmed.startsWith('partneredWith:') ||
            trimmed.startsWith('marriageDate:') ||
            trimmed.startsWith('relatedTo:') ||
            trimmed.startsWith('friendOf:') ||
            trimmed.startsWith('education:')) {
          return false;
        }
        return true;
      });
      return `---\n${filteredLines.join('\n')}\n---\n`;
    }
  );

  return processedContent;
}

// Process a single markdown file
function processMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const processedContent = processObsidianSyntax(content);
    fs.writeFileSync(filePath, processedContent, 'utf8');
    console.log(`✅ Processed: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Recursively process all markdown files in a directory
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        processMarkdownFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }
}

// Main function
function main() {
  const contentPath = path.join(__dirname, '../src/content');
  
  console.log('🔄 Processing Obsidian markdown files...');
  console.log('📁 Content path:', contentPath);
  
  if (!fs.existsSync(contentPath)) {
    console.error('❌ Content directory not found:', contentPath);
    return;
  }
  
  processDirectory(contentPath);
  console.log('✅ Markdown processing completed!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processObsidianSyntax, processMarkdownFile, processDirectory }; 