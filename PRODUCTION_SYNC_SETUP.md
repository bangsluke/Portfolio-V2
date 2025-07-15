# Production Obsidian Sync Setup Guide

This guide will help you set up automatic syncing of your Obsidian notes to your Astro portfolio while it's running in production.

## 🎯 Overview

Your setup includes:
- **Real-time file watching** - Automatically detects changes in Obsidian
- **Selective syncing** - Only syncs notes with `#portfolio` tag
- **Automatic deployment** - Deploys changes to production
- **Email notifications** - Sends status updates
- **Error logging** - Tracks sync issues

## 📋 Prerequisites

1. **Obsidian vault** with notes tagged with `#portfolio`
2. **GitHub repository** for your portfolio
3. **Deployment platform** (Netlify/Vercel)
4. **Environment variables** configured (already done!)

## 🚀 Step-by-Step Setup

### Step 1: Verify Your Environment Variables

Your `.env` file already contains most of what you need:

```bash
# Obsidian Sync Configuration
OBSIDIAN_PATH="C:\Users\bangs\Documents\Obsidian Personal Notes"
PORTFOLIO_TAG="portfolio"
AUTO_DEPLOY="true"

# Email Notifications
EMAIL_NOTIFICATIONS="true"
EMAIL_RECIPIENT="bangsluke@gmail.com"
BACKEND_URL="https://bangsluke-backend-server.herokuapp.com"

# Deployment
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_netlify_site_id
VERCEL_TOKEN=your_vercel_token
```

**Action Required**: Replace the placeholder values with your actual tokens:
- `your_netlify_token` → Your actual Netlify auth token
- `your_netlify_site_id` → Your actual Netlify site ID
- `your_vercel_token` → Your actual Vercel token (if using Vercel)

### Step 2: Test the Sync System

Run these commands to test your setup:

```bash
# Navigate to your portfolio directory
cd Portfolio-V2

# Test basic sync (no deployment)
npm run sync-production

# Test sync with deployment
npm run sync-production:deploy

# Test sync with email notifications
npm run sync-production:email
```

### Step 3: Set Up Real-time Watching

For continuous syncing while you work:

```bash
# Start watch mode (monitors files every 30 seconds)
npm run sync-production:watch
```

This will:
- Watch your Obsidian vault for changes
- Automatically sync when files are modified
- Deploy to production if `AUTO_DEPLOY=true`
- Send email notifications if enabled

### Step 4: Set Up GitHub Actions (Optional)

Create `.github/workflows/obsidian-sync.yml`:

```yaml
name: Obsidian Sync & Deploy

on:
  workflow_dispatch:  # Manual trigger
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  push:
    paths:
      - 'src/content/**'
      - 'scripts/**'

jobs:
  sync-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run Obsidian sync
      env:
        OBSIDIAN_PATH: ${{ secrets.OBSIDIAN_PATH }}
        PORTFOLIO_TAG: ${{ secrets.PORTFOLIO_TAG }}
        AUTO_DEPLOY: ${{ secrets.AUTO_DEPLOY }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        EMAIL_NOTIFICATIONS: ${{ secrets.EMAIL_NOTIFICATIONS }}
        EMAIL_RECIPIENT: ${{ secrets.EMAIL_RECIPIENT }}
      run: npm run sync-production:deploy-email
    
    - name: Deploy to Netlify
      if: success()
      run: npm run build
```

### Step 5: Configure GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `OBSIDIAN_PATH`: Your Obsidian vault path
   - `PORTFOLIO_TAG`: "portfolio"
   - `AUTO_DEPLOY`: "true"
   - `NETLIFY_AUTH_TOKEN`: Your Netlify token
   - `NETLIFY_SITE_ID`: Your Netlify site ID
   - `EMAIL_NOTIFICATIONS`: "true"
   - `EMAIL_RECIPIENT`: "bangsluke@gmail.com"

## 🔧 Available Commands

### Basic Sync Commands
```bash
# Sync without deployment
npm run sync-production

# Sync with deployment
npm run sync-production:deploy

# Sync with email notifications
npm run sync-production:email

# Sync with deployment and email
npm run sync-production:deploy-email
```

### Watch Mode
```bash
# Start watching for changes (runs continuously)
npm run sync-production:watch
```

### Debug Mode
```bash
# Run with debug logging
DEBUG=true npm run sync-production
```

## 📁 File Organization

After sync, your notes will be organized into folders based on tags:

| Tag | Folder | Example |
|-----|--------|---------|
| `#project` | `projects/` | Project showcases |
| `#company` | `companies/` | Company experiences |
| `#client` | `clients/` | Client work |
| `#skill` | `skills/` | Skills & competencies |
| `#role` | `roles/` | Job positions |
| `#education` | `educations/` | Education background |
| `#reference` | `references/` | Reference materials |

## 🏷️ Tagging Your Notes

Add the `#portfolio` tag to any Obsidian note you want to sync:

### In Frontmatter
```yaml
---
title: "My Project"
date: 2024-01-01
tags: ["portfolio", "project", "web-development"]
---
```

### In Content
```markdown
# My Amazing Project

This is a project I want to showcase.

#portfolio #project #web-development
```

## 📊 Monitoring & Troubleshooting

### Error Log
Check `sync-errors.json` for detailed error information:
```bash
cat sync-errors.json
```

### Debug Mode
Enable verbose logging:
```bash
DEBUG=true npm run sync-production
```

### Manual Sync
If automatic sync fails:
```bash
# Manual sync
npm run sync-production

# Check build
npm run build

# Manual deployment
npx netlify deploy --prod
```

## 🔄 Workflow Examples

### Daily Workflow
1. **Edit notes in Obsidian** with `#portfolio` tag
2. **Watch mode automatically detects changes**
3. **Sync script processes files**
4. **Build and deploy automatically**
5. **Email notification sent**

### Manual Workflow
1. **Edit notes in Obsidian**
2. **Run sync manually**: `npm run sync-production:deploy`
3. **Check deployment status**
4. **Review error log if needed**

### GitHub Actions Workflow
1. **Push changes to GitHub**
2. **GitHub Actions triggers automatically**
3. **Sync and deploy in cloud**
4. **Email notification sent**

## 🛡️ Security Considerations

- **Only sync public content** - Never sync sensitive information
- **Use environment variables** - Keep tokens secure
- **Review before deployment** - Check what's being synced
- **Backup your vault** - Keep local backups

## 📧 Email Notifications

When enabled, you'll receive emails with:
- Sync status (success/failure)
- Number of files processed
- Error details
- Deployment status

## 🚨 Common Issues

### "No files copied"
- Check that notes have `#portfolio` tag
- Verify Obsidian path is correct
- Check file permissions

### "Build failed"
- Check markdown syntax
- Verify frontmatter format
- Review error logs

### "Deployment failed"
- Check deployment tokens
- Verify site IDs
- Check network connectivity

## 🎉 Success!

Once set up, your workflow will be:
1. **Edit notes in Obsidian** → 
2. **Automatic sync** → 
3. **Build and deploy** → 
4. **Live portfolio updated**

Your portfolio will stay up-to-date with your latest notes automatically! 