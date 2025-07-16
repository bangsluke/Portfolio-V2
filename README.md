<p align="center">
  <img src="https://i.imgur.com/QL72TPw.png" alt="bangsluke Logo" width="200"/>
</p>

# Portfolio Site V2

> A personal portfolio website for displaying my skills and past projects, with integrated Obsidian note syncing.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9ed7eb9-789c-4a7c-b069-b9aebb73c553/deploy-status)](https://app.netlify.com/projects/bangsluke-portfolio/deploys)

> Also see the backend server repo <https://github.com/bangsluke/bangsluke-backend-server> for more details and instructions

## Table of Contents

- [Portfolio Site V2](#portfolio-site-v2)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Quick start](#quick-start)
    - [Development Start](#development-start)
    - [Production Start](#production-start)
  - [Obsidian Sync System](#obsidian-sync-system)
    - [Features](#features)
    - [Quick Sync Commands](#quick-sync-commands)
    - [Configuration](#configuration)
      - [Environment Variables](#environment-variables)
      - [Default Paths](#default-paths)
    - [Usage Examples](#usage-examples)
      - [Local Development](#local-development)
      - [Production Deployment](#production-deployment)
      - [Custom Path](#custom-path)
      - [Custom Tag](#custom-tag)
      - [Email Notifications](#email-notifications)
    - [Mobile Sync](#mobile-sync)
      - [Android](#android)
      - [iOS](#ios)
    - [GitHub Actions Integration](#github-actions-integration)
      - [Manual Trigger](#manual-trigger)
      - [Automated Deployment](#automated-deployment)
      - [Setup GitHub Secrets](#setup-github-secrets)
    - [File Organization](#file-organization)
      - [Tag to Folder Mapping](#tag-to-folder-mapping)
    - [Portfolio Tag Filtering](#portfolio-tag-filtering)
      - [In Frontmatter](#in-frontmatter)
      - [In Content (Obsidian Style)](#in-content-obsidian-style)
      - [Multiple Tags for Organization](#multiple-tags-for-organization)
    - [Error Logging \& Email Notifications](#error-logging--email-notifications)
      - [Error Log File](#error-log-file)
      - [Email Notifications](#email-notifications-1)
      - [File Verification](#file-verification)
    - [Troubleshooting](#troubleshooting)
      - [Common Issues](#common-issues)
      - [Debug Mode](#debug-mode)
      - [Manual File Processing](#manual-file-processing)
    - [Obsidian Syntax Conversion](#obsidian-syntax-conversion)
    - [Security Considerations](#security-considerations)
  - [How it Works](#how-it-works)
    - [GraphQL Connection](#graphql-connection)
    - [Example Usage](#example-usage)
    - [Error Handling](#error-handling)
  - [GraphQL Setup](#graphql-setup)
    - [Schema and Updates](#schema-and-updates)
      - [Current Schema Structure](#current-schema-structure)
      - [Adding New Fields](#adding-new-fields)
      - [Schema Validation](#schema-validation)
    - [Extending the Schema](#extending-the-schema)
      - [Adding New Types](#adding-new-types)
      - [Adding New Queries](#adding-new-queries)
      - [Adding Query Parameters](#adding-query-parameters)
      - [Best Practices](#best-practices)
      - [Debugging Schema Changes](#debugging-schema-changes)
  - [Debugging Problems](#debugging-problems)
    - [Connection Problems](#connection-problems)
  - [Email Service Setup](#email-service-setup)
    - [Overview](#overview)
    - [Prerequisites](#prerequisites)
    - [Step 1: Install Dependencies](#step-1-install-dependencies)
    - [Step 2: Set Up Gmail App Password](#step-2-set-up-gmail-app-password)
      - [2.1 Enable 2-Factor Authentication](#21-enable-2-factor-authentication)
      - [2.2 Generate App Password](#22-generate-app-password)
    - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
      - [Environment Variable Details:](#environment-variable-details)
    - [Step 4: Test the Email Service](#step-4-test-the-email-service)
      - [4.1 Test Email Configuration](#41-test-email-configuration)
      - [4.2 Test with Sync Script](#42-test-with-sync-script)
    - [Step 5: Troubleshooting](#step-5-troubleshooting)
      - [Common Issues and Solutions](#common-issues-and-solutions)
        - [1. "Invalid login" Error](#1-invalid-login-error)
        - [2. "Less secure app access" Error](#2-less-secure-app-access-error)
        - [3. "Connection timeout" Error](#3-connection-timeout-error)
        - [4. "Authentication failed" Error](#4-authentication-failed-error)
      - [Debug Mode](#debug-mode-1)
    - [Step 6: Security Best Practices](#step-6-security-best-practices)
      - [1. Environment Variables](#1-environment-variables)
      - [2. Email Content](#2-email-content)
      - [3. Access Control](#3-access-control)
    - [Step 7: Production Deployment](#step-7-production-deployment)
      - [For Netlify/Vercel Deployment](#for-netlifyvercel-deployment)
        - [Netlify](#netlify)
        - [Vercel](#vercel)
      - [For Local Development](#for-local-development)
    - [Step 8: Email Templates](#step-8-email-templates)
    - [Step 9: Monitoring and Maintenance](#step-9-monitoring-and-maintenance)
      - [Regular Tasks](#regular-tasks)
      - [Logs](#logs)
    - [Support](#support)
    - [Example .env Configuration](#example-env-configuration)

## Introduction

A modern portfolio website built with Astro, featuring:

- **Obsidian Integration**: Sync selected notes from your Obsidian vault
- **GraphQL Backend**: Dynamic content from Neo4j database
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Auto-Deployment**: GitHub Actions for continuous deployment
- **Email Notifications**: Automated sync reports via Gmail

> [Back to Table of Contents](#table-of-contents)

## Quick start

### Development Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:4321 to see the development site
```

> [Back to Table of Contents](#table-of-contents)

### Production Start

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

> [Back to Table of Contents](#table-of-contents)

## Obsidian Sync System

### Features

- 🔄 **Selective Sync**: Copy only Obsidian notes with `#portfolio` tag
- 📱 **Mobile Support**: Sync from different devices and platforms
- 🚀 **Auto-Deploy**: Automatically deploy changes to production
- 🏷️ **Tag Filtering**: Filter notes by tags on the website
- 🔍 **Search**: Search through your notes
- 📝 **Markdown Processing**: Convert Obsidian-specific syntax to standard markdown
- 🤖 **CI/CD Integration**: GitHub Actions for automated deployment
- 🎯 **Smart Filtering**: Only sync notes you want to make public
- 📝 **Error Logging**: Comprehensive error tracking and JSON logging
- 📧 **Email Notifications**: Automated email reports via Gmail
- ✅ **File Verification**: Ensures copied files exist and have content

> [Back to Table of Contents](#table-of-contents)

### Quick Sync Commands

```bash
# Basic sync (copies files without deploying)
npm run sync-obsidian

# Sync and automatically deploy
npm run sync-obsidian:deploy

# Sync with email notifications
npm run sync-obsidian:email

# Sync, deploy, and send email notification
npm run sync-obsidian:deploy-email

# Use custom tag (e.g., "public" instead of "portfolio")
npm run sync-obsidian:custom -- "public"

# Mobile-friendly interactive sync
node scripts/sync-mobile.js
```

> [Back to Table of Contents](#table-of-contents)

### Configuration

#### Environment Variables

Set these environment variables to customize the sync behavior:

```bash
# Path to your Obsidian vault
export OBSIDIAN_PATH="/path/to/your/obsidian/vault"

# Tag to filter for portfolio notes (default: portfolio)
export PORTFOLIO_TAG="portfolio"

# Auto-deploy after sync
export AUTO_DEPLOY="true"

# For mobile detection
export MOBILE="true"

# Email notifications
export EMAIL_NOTIFICATIONS="true"
export EMAIL_RECIPIENT="your-email@gmail.com"
export BACKEND_URL="https://bangsluke-backend-server.herokuapp.com"
```

> [Back to Table of Contents](#table-of-contents)

#### Default Paths

The script automatically detects common Obsidian vault locations:

- **Windows**: `C:\Users\bangs\Documents\Obsidian Personal Notes`
- **Android**: `/storage/emulated/0/Download/Obsidian Personal Notes`
- **iOS**: Various paths in the app sandbox

> [Back to Table of Contents](#table-of-contents)

### Usage Examples

#### Local Development

```bash
# Sync without deploying
npm run sync-obsidian

# Start development server
npm run dev

# Visit http://localhost:4321/notes to see your notes
```

> [Back to Table of Contents](#table-of-contents)

#### Production Deployment

```bash
# Sync and deploy to production
npm run sync-obsidian:deploy
```

> [Back to Table of Contents](#table-of-contents)

#### Custom Path

```bash
# Specify a custom Obsidian vault path
OBSIDIAN_PATH="/custom/path/to/vault" npm run sync-obsidian
```

> [Back to Table of Contents](#table-of-contents)

#### Custom Tag

```bash
# Use a different tag for filtering
PORTFOLIO_TAG="public" npm run sync-obsidian
# or
npm run sync-obsidian:custom -- "showcase"
```

> [Back to Table of Contents](#table-of-contents)

#### Email Notifications

```bash
# Enable email notifications
EMAIL_NOTIFICATIONS="true" npm run sync-obsidian

# Custom email recipient
EMAIL_NOTIFICATIONS="true" EMAIL_RECIPIENT="custom@email.com" npm run sync-obsidian
```

> [Back to Table of Contents](#table-of-contents)

### Mobile Sync

#### Android

1. Install Termux or similar terminal app
2. Clone your repository
3. Run the mobile sync script:

```bash
cd Portfolio-V2
node scripts/sync-mobile.js
```

#### iOS

**Important**: Obsidian mobile files are not stored in iCloud by default and are sandboxed within the app.

**Recommended Method**: Export and transfer files

1. In Obsidian mobile: **Settings** → **About** → **Export vault** → **Export as plain text**
2. Save to Files app
3. Transfer to computer via AirDrop, iCloud Drive, or USB
4. Run sync script on computer

**Alternative Methods**:

- Use **Working Copy** app for Git-based sync
- Create **iOS Shortcuts** automation
- Use **GitHub Actions** for automated deployment

See the [iOS Sync Guide](scripts/ios-sync-guide.md) for detailed instructions.

### GitHub Actions Integration

#### Manual Trigger

1. Go to your GitHub repository
2. Navigate to Actions → "Obsidian Sync & Deploy"
3. Click "Run workflow"
4. Optionally specify:
   - Obsidian vault path
   - Auto-deploy setting

#### Automated Deployment

The workflow can be triggered by:

- **Manual**: Using the workflow dispatch
- **Scheduled**: Daily at 2 AM UTC
- **Push**: When changes are made to `src/content/obsidian/` or `scripts/`

#### Setup GitHub Secrets

Add these secrets to your GitHub repository:

```bash
# For Netlify deployment
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id

# For Vercel deployment (alternative)
VERCEL_TOKEN=your_vercel_token

# For notifications (optional)
SLACK_WEBHOOK_URL=your_slack_webhook
DISCORD_WEBHOOK_URL=your_discord_webhook
```

### File Organization

After sync, notes with the portfolio tag will be organized into specific folders based on their tags:

```
src/content/
├── obsidian/          # Notes without specific category tags
├── projects/          # Notes with #project tag
├── clients/           # Notes with #client tag
├── companies/         # Notes with #company tag
├── educations/        # Notes with #education tag
├── references/        # Notes with #reference tag
├── roles/            # Notes with #role tag
└── skills/           # Notes with #skill tag
```

#### Tag to Folder Mapping

| Tag          | Folder        | Description                               |
| ------------ | ------------- | ----------------------------------------- |
| `#project`   | `projects/`   | Project showcases and case studies        |
| `#client`    | `clients/`    | Client work and relationships             |
| `#company`   | `companies/`  | Company experiences and collaborations    |
| `#education` | `educations/` | Educational background and certifications |
| `#reference` | `references/` | Reference materials and resources         |
| `#role`      | `roles/`      | Job roles and positions                   |
| `#skill`     | `skills/`     | Skills and competencies                   |

Notes without these specific tags will be placed in the `obsidian/` folder.

### Portfolio Tag Filtering

The sync system only copies notes that contain the `#portfolio` tag. You can add this tag to your Obsidian notes in several ways:

#### In Frontmatter

```yaml
---
title: 'My Project'
date: 2024-01-01
tags: ['portfolio', 'project', 'web-development']
---
```

#### In Content (Obsidian Style)

```markdown
# My Project

This is a project I want to showcase on my portfolio.

#portfolio #project #web-development
```

#### Multiple Tags for Organization

```markdown
# Company Experience

Working with this amazing company.

#portfolio #company #tech #leadership
```

This note would be placed in the `companies/` folder due to the `#company` tag.

### Error Logging & Email Notifications

#### Error Log File

The sync script creates a detailed error log at `sync-errors.json` containing:

- Sync start/end times
- Source path information
- Processing and verification errors
- Summary statistics
- Success/failure status

#### Email Notifications

When enabled, the script sends detailed HTML email reports including:

- Sync status (success/failure)
- File processing summary
- Error details in formatted tables
- Timestamps and source information

#### File Verification

The script verifies each copied file by:

- Checking if the target file exists
- Ensuring the file has content (not empty)
- Logging verification errors separately
- Providing detailed error information

### Troubleshooting

#### Common Issues

**1. "Could not find Obsidian vault path"**

Solution: Set the `OBSIDIAN_PATH` environment variable:

```bash
export OBSIDIAN_PATH="/path/to/your/vault"
npm run sync-obsidian
```

**2. "No files copied - all files skipped"**

Solution: Add the `#portfolio` tag to your notes:

```yaml
---
title: 'My Note'
tags: ['portfolio']
---
```

Or add `#portfolio` anywhere in your note content.

**3. Permission denied errors**

Solution: Check file permissions and ensure the script has read access to your Obsidian vault.

**4. Git authentication errors**

Solution: Ensure your Git credentials are properly configured:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**5. Build errors**

Solution: Check that all markdown files have valid frontmatter:

```yaml
---
title: 'Note Title'
date: 2024-01-01
tags: ['portfolio']
---
```

#### Debug Mode

Run with verbose logging:

```bash
DEBUG=true npm run sync-obsidian
```

#### Manual File Processing

If automatic sync fails, you can manually copy files:

```bash
# Create the target directory
mkdir -p src/content/obsidian

# Copy files manually
cp -r "/path/to/obsidian/vault"/* src/content/obsidian/

# Build the project
npm run build
```

### Obsidian Syntax Conversion

The sync script automatically converts Obsidian-specific syntax:

| Obsidian                    | Standard Markdown                  |
| --------------------------- | ---------------------------------- |
| `[[Internal Link]]`         | `[Internal Link](Internal Link)`   |
| `> [!NOTE] Text`            | `> **NOTE:** Text`                 |
| `aliases: [alias1, alias2]` | _(removed)_                        |
| `tags: [tag1, tag2]`        | _(preserved, portfolio tag added)_ |
| `#portfolio`                | _(detected for filtering)_         |

### Security Considerations

- **Public Notes**: Only sync notes you want to make public
- **Sensitive Data**: Never sync notes containing passwords, API keys, or personal information
- **Git History**: Consider using `.gitignore` to exclude sensitive files
- **Access Control**: Use proper authentication for your deployment platform

> [Back to Table of Contents](#table-of-contents)

## How it Works

### GraphQL Connection

The GraphQL client (`src/utils/graphql-client.ts`) automatically detects the environment:

- **Development**: Uses `PUBLIC_APP_BACKEND_URL_DEV`
- **Production**: Uses `PUBLIC_APP_BACKEND_URL_PROD`

### Example Usage

```typescript
import { graphqlClient } from '../utils/graphql-client';
import { fetchCompanies } from '../utils/companies';

// Make GraphQL requests
const companies = await fetchCompanies({ limit: 10, offset: 0 });
```

### Error Handling

If the environment variables are not set, the client will throw a descriptive error indicating which variable is missing.

> [Back to Table of Contents](#table-of-contents)

## GraphQL Setup

### Schema and Updates

The GraphQL schema is defined in the backend server and can be updated by modifying the schema files. The frontend automatically adapts to schema changes through the GraphQL client.

#### Current Schema Structure

The backend provides the following main types:

- **Company**: `{ nodeId, name, dateStart, dateEnd }`
- **Role**: `{ nodeId, name, dateStart, dateEnd, roleDescription }`
- **Project**: `{ nodeId, title, description, technologies, githubUrl, liveUrl, imageUrl }`

#### Adding New Fields

To add new fields to existing types:

1. **Backend**: Update the GraphQL schema in the backend server
2. **Frontend**: Update the corresponding TypeScript interfaces in the utils files
3. **Frontend**: Update any queries that use the modified type

Example - Adding a `description` field to Company:

```typescript
// Backend schema update
type Company {
  nodeId: String!
  name: String!
  dateStart: String!
  dateEnd: String
  description: String  # New field
}

// Frontend interface update (src/utils/companies.ts)
export interface Company {
  nodeId: string;
  name: string;
  dateStart: string;
  dateEnd: string | null;
  description?: string;  // New field
}

// Frontend query update
const GET_COMPANIES_QUERY = `
  query GetCompanies {
    companies {
      nodeId
      name
      dateStart
      dateEnd
      description  # New field
    }
  }
`;
```

#### Schema Validation

The GraphQL client automatically validates queries against the backend schema. If a query requests a field that doesn't exist, the backend will return an error with details about the missing field.

### Extending the Schema

#### Adding New Types

To add completely new types to the schema:

1. **Backend**: Define the new type in the GraphQL schema
2. **Frontend**: Create a new utility file for the type
3. **Frontend**: Define TypeScript interfaces and queries
4. **Frontend**: Create fetch functions

Example - Adding a `Skill` type:

```typescript
// 1. Backend schema (in backend server)
type Skill {
  nodeId: String!
  name: String!
  category: String!
  proficiency: Int!
  yearsOfExperience: Int!
}

// 2. Frontend utility file (src/utils/skills.ts)
export interface Skill {
  nodeId: string;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
}

export interface GetSkillsResponse {
  skills: Skill[];
}

const GET_SKILLS_QUERY = `
  query GetSkills {
    skills {
      nodeId
      name
      category
      proficiency
      yearsOfExperience
    }
  }
`;

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const response = await graphqlClient.request<GetSkillsResponse>(GET_SKILLS_QUERY);

    if (!response.skills) {
      throw new Error('Invalid response format: missing skills array');
    }

    return response.skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}
```

#### Adding New Queries

To add new queries for existing types:

1. **Frontend**: Add the new query to the appropriate utility file
2. **Frontend**: Create a new fetch function
3. **Frontend**: Update components to use the new function

Example - Adding a query to get companies by date range:

```typescript
// In src/utils/companies.ts
const GET_COMPANIES_BY_DATE_RANGE_QUERY = `
  query GetCompaniesByDateRange($startDate: String!, $endDate: String!) {
    companies(where: { dateStart: { gte: $startDate }, dateEnd: { lte: $endDate } }) {
      nodeId
      name
      dateStart
      dateEnd
    }
  }
`;

export async function fetchCompaniesByDateRange(
	startDate: string,
	endDate: string
): Promise<Company[]> {
	try {
		const response = await graphqlClient.request<GetCompaniesResponse>(
			GET_COMPANIES_BY_DATE_RANGE_QUERY,
			{ startDate, endDate }
		);

		if (!response.companies) {
			throw new Error('Invalid response format: missing companies array');
		}

		return response.companies;
	} catch (error) {
		console.error('Error fetching companies by date range:', error);
		throw error;
	}
}
```

#### Adding Query Parameters

To add parameters to existing queries:

1. **Frontend**: Update the query to include variables
2. **Frontend**: Update the fetch function to accept parameters
3. **Frontend**: Pass parameters to the GraphQL client

Example - Adding pagination to companies query:

```typescript
// Updated query with parameters
const GET_COMPANIES_PAGINATED_QUERY = `
  query GetCompanies($limit: Int, $offset: Int) {
    companies(limit: $limit, offset: $offset) {
      nodeId
      name
      dateStart
      dateEnd
    }
  }
`;

// Updated fetch function
export async function fetchCompanies(
	options: { limit?: number; offset?: number } = {}
): Promise<Company[]> {
	try {
		const { limit, offset } = options;
		const response = await graphqlClient.request<GetCompaniesResponse>(
			GET_COMPANIES_PAGINATED_QUERY,
			{ limit, offset }
		);

		if (!response.companies) {
			throw new Error('Invalid response format: missing companies array');
		}

		return response.companies;
	} catch (error) {
		console.error('Error fetching companies:', error);
		throw error;
	}
}
```

#### Best Practices

1. **Type Safety**: Always define TypeScript interfaces for your GraphQL types
2. **Error Handling**: Include proper error handling in fetch functions
3. **Query Organization**: Keep related queries in the same utility file
4. **Naming Conventions**: Use descriptive names for queries and functions
5. **Documentation**: Add comments explaining complex queries or business logic
6. **Testing**: Test new queries in the GraphQL playground before implementing

#### Debugging Schema Changes

If you encounter issues after schema changes:

1. **Check the GraphQL Playground**: Test queries directly in the backend GraphQL playground
2. **Review Error Messages**: GraphQL provides detailed error messages for schema mismatches
3. **Use the Debug Page**: Navigate to `/debug` to test the connection and see detailed error information
4. **Check Console Logs**: Look for GraphQL errors in the browser console

> [Back to Table of Contents](#table-of-contents)

## Debugging Problems

### Connection Problems

If the problem is a connection issue between the backend server and front end website, navigate to `http://localhost:4321/debug` to see a connection test

> [Back to Table of Contents](#table-of-contents)

## Email Service Setup

This guide will help you set up a self-contained email service for your Obsidian sync notifications using Gmail SMTP.

### Overview

The email service has been updated to use Nodemailer with Gmail SMTP instead of relying on your backend server. This makes it completely self-contained within your Portfolio-V2 project.

### Prerequisites

1. A Gmail account
2. Node.js and npm installed
3. Access to your Portfolio-V2 project

### Step 1: Install Dependencies

First, install the required Nodemailer package:

```bash
npm install nodemailer
```

### Step 2: Set Up Gmail App Password

**Important**: You cannot use your regular Gmail password. You need to create an "App Password" for security.

#### 2.1 Enable 2-Factor Authentication

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security"
3. Enable "2-Step Verification" if not already enabled

#### 2.2 Generate App Password

1. In your Google Account settings, go to "Security"
2. Find "2-Step Verification" and click on it
3. Scroll down to "App passwords"
4. Click "Create new app password"
5. Select "Mail" as the app type
6. Choose "Other (Custom name)" and enter "Portfolio Sync"
7. Click "Generate"
8. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

**Important**: Save this password securely. You won't be able to see it again.

### Step 3: Configure Environment Variables

Add the following variables to your `.env` file:

```env
# Email Configuration
EMAIL_NOTIFICATIONS=true
EMAIL_RECIPIENT=your-email@gmail.com
EMAIL_SENDER=your-email@gmail.com
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

#### Environment Variable Details:

- `EMAIL_NOTIFICATIONS`: Set to `true` to enable email notifications
- `EMAIL_RECIPIENT`: The email address that will receive sync notifications
- `EMAIL_SENDER`: The email address that will send notifications (usually same as GMAIL_USER)
- `GMAIL_USER`: Your Gmail address
- `GMAIL_APP_PASSWORD`: The 16-character app password you generated

### Step 4: Test the Email Service

#### 4.1 Test Email Configuration

Use the provided test script to verify your email setup:

```bash
npm run test-email
```

#### 4.2 Test with Sync Script

You can also test email notifications with your sync scripts:

```bash
# Test with basic sync
npm run sync-obsidian:email

# Test with production sync
npm run sync-production:email
```

### Step 5: Troubleshooting

#### Common Issues and Solutions

##### 1. "Invalid login" Error

**Problem**: `535-5.7.8 Username and Password not accepted`

**Solution**:

- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Factor Authentication is enabled
- Check that the GMAIL_USER matches the account where you generated the App Password

##### 2. "Less secure app access" Error

**Problem**: Gmail blocks the connection

**Solution**:

- This shouldn't happen with App Passwords, but if it does, make sure you're using the App Password correctly
- Double-check that you copied the entire 16-character password

##### 3. "Connection timeout" Error

**Problem**: Network connectivity issues

**Solution**:

- Check your internet connection
- Verify firewall settings aren't blocking SMTP (port 587)
- Try again in a few minutes

##### 4. "Authentication failed" Error

**Problem**: Incorrect credentials

**Solution**:

- Verify all environment variables are set correctly
- Make sure there are no extra spaces in your .env file
- Regenerate the App Password if needed

#### Debug Mode

To see more detailed error information, you can add debug logging:

```javascript
// In your sync script, add this before emailService.initialize():
process.env.DEBUG = 'true';
```

### Step 6: Security Best Practices

#### 1. Environment Variables

- Never commit your `.env` file to version control
- Use different App Passwords for different environments
- Rotate App Passwords periodically

#### 2. Email Content

- The email service sends HTML emails with detailed sync reports
- Sensitive information is not included in emails
- All sync data is logged locally in `sync-errors.json`

#### 3. Access Control

- Only authorized email addresses should receive notifications
- Consider using a dedicated email address for notifications

### Step 7: Production Deployment

#### For Netlify/Vercel Deployment

When deploying to production platforms, you'll need to set the environment variables in your deployment platform:

##### Netlify

1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add all the email-related environment variables

##### Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add all the email-related environment variables

#### For Local Development

Make sure your `.env` file is in the root of your project and contains all necessary variables.

### Step 8: Email Templates

The email service automatically generates beautiful HTML emails with:

- Sync status (success/failure)
- Detailed timing information
- File processing statistics
- Error reports (if any)
- Professional styling

You can customize the email templates by modifying the `generateSyncReport` method in `scripts/email-service.js`.

### Step 9: Monitoring and Maintenance

#### Regular Tasks

1. **Monthly**: Check that emails are being received
2. **Quarterly**: Rotate your Gmail App Password
3. **As needed**: Update email templates or recipient lists

#### Logs

- Email service logs are included in your sync script output
- Failed email attempts are logged to the console
- Sync errors are saved to `sync-errors.json`

### Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your Gmail App Password is correct
3. Test with the provided test script
4. Check your `.env` file configuration
5. Review the console output for detailed error messages

### Example .env Configuration

Here's a complete example of what your `.env` file should look like:

```env
# Obsidian Configuration
OBSIDIAN_PATH=C:/Users/bangs/Documents/Coding Projects/Obsidian-Backups/Obsidian-Personal-Notes/Personal Notes
PORTFOLIO_TAG=portfolio

# Email Configuration
EMAIL_NOTIFICATIONS=true
EMAIL_RECIPIENT=bangsluke@gmail.com
EMAIL_SENDER=bangsluke@gmail.com
GMAIL_USER=bangsluke@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Deployment Configuration
AUTO_DEPLOY=true
NETLIFY_SITE_ID=your-netlify-site-id
NETLIFY_AUTH_TOKEN=your-netlify-token

# Optional: Debug mode
DEBUG=false
```

Remember to replace the placeholder values with your actual configuration!

> [Back to Table of Contents](#table-of-contents)
