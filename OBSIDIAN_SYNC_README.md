# Obsidian Sync for Astro Portfolio

This system allows you to selectively sync Obsidian notes with the `#portfolio` tag to your Astro portfolio site, making only your chosen notes publicly accessible with a beautiful interface.

## Features

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

## Quick Start

### 1. Basic Sync

```bash
# Navigate to your portfolio directory
cd Portfolio-V2

# Run the sync script
npm run sync-obsidian
```

### 2. Sync and Deploy

```bash
# Sync and automatically deploy
npm run sync-obsidian:deploy
```

### 3. Mobile Sync

```bash
# Use the mobile-friendly sync script
node scripts/sync-mobile.js
```

### 4. Custom Tag

```bash
# Use a different tag (e.g., "public" instead of "portfolio")
npm run sync-obsidian -- --tag "public"
# or
PORTFOLIO_TAG="showcase" npm run sync-obsidian
```

### 5. With Email Notifications

```bash
# Sync with email notifications
npm run sync-obsidian:email

# Sync, deploy, and send email notification
npm run sync-obsidian:deploy-email
```

## Configuration

### Environment Variables

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

### Default Paths

The script automatically detects common Obsidian vault locations:

- **Windows**: `C:\Users\bangs\Documents\Obsidian Personal Notes`
- **Android**: `/storage/emulated/0/Download/Obsidian Personal Notes`
- **iOS**: Various paths in the app sandbox

### Custom Configuration

Edit `scripts/sync-obsidian.js` to modify:

- Excluded files/folders
- Included file extensions
- Sync behavior
- Deployment settings

## Usage Examples

### Local Development

```bash
# Sync without deploying
npm run sync-obsidian

# Start development server
npm run dev

# Visit http://localhost:4321/notes to see your notes
```

### Production Deployment

```bash
# Sync and deploy to production
npm run sync-obsidian:deploy
```

### Custom Path

```bash
# Specify a custom Obsidian vault path
OBSIDIAN_PATH="/custom/path/to/vault" npm run sync-obsidian
```

### Custom Tag

```bash
# Use a different tag for filtering
PORTFOLIO_TAG="public" npm run sync-obsidian
# or
npm run sync-obsidian -- --tag "showcase"
```

### Email Notifications

```bash
# Enable email notifications
EMAIL_NOTIFICATIONS="true" npm run sync-obsidian

# Custom email recipient
EMAIL_NOTIFICATIONS="true" EMAIL_RECIPIENT="custom@email.com" npm run sync-obsidian
```

### Mobile Sync

```bash
# Interactive mobile sync
node scripts/sync-mobile.js

# With custom path
node scripts/sync-mobile.js --path "/mobile/path/to/vault"
```

**📱 iOS Users**: Since Obsidian mobile files are not stored in iCloud by default, see the [iOS Sync Guide](scripts/ios-sync-guide.md) for detailed instructions on syncing from iPhone.

## GitHub Actions Integration

### Manual Trigger

1. Go to your GitHub repository
2. Navigate to Actions → "Obsidian Sync & Deploy"
3. Click "Run workflow"
4. Optionally specify:
   - Obsidian vault path
   - Auto-deploy setting

### Automated Deployment

The workflow can be triggered by:

- **Manual**: Using the workflow dispatch
- **Scheduled**: Daily at 2 AM UTC
- **Push**: When changes are made to `src/content/obsidian/` or `scripts/`

### Setup GitHub Secrets

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

## Portfolio Tag Filtering

The sync system only copies notes that contain the `#portfolio` tag. You can add this tag to your Obsidian notes in several ways:

### In Frontmatter
```yaml
---
title: "My Project"
date: 2024-01-01
tags: ["portfolio", "project", "web-development"]
---
```

### In Content (Obsidian Style)
```markdown
# My Project

This is a project I want to showcase on my portfolio.

#portfolio #project #web-development
```

### Multiple Tags for Organization
```markdown
# Company Experience

Working with this amazing company.

#portfolio #company #tech #leadership
```

This note would be placed in the `companies/` folder due to the `#company` tag.

## Error Logging & Email Notifications

### Error Log File
The sync script creates a detailed error log at `sync-errors.json` containing:
- Sync start/end times
- Source path information
- Processing and verification errors
- Summary statistics
- Success/failure status

### Email Notifications
When enabled, the script sends detailed HTML email reports including:
- Sync status (success/failure)
- File processing summary
- Error details in formatted tables
- Timestamps and source information

### File Verification
The script verifies each copied file by:
- Checking if the target file exists
- Ensuring the file has content (not empty)
- Logging verification errors separately
- Providing detailed error information

## File Structure

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

### Tag to Folder Mapping

| Tag | Folder | Description |
|-----|--------|-------------|
| `#project` | `projects/` | Project showcases and case studies |
| `#client` | `clients/` | Client work and relationships |
| `#company` | `companies/` | Company experiences and collaborations |
| `#education` | `educations/` | Educational background and certifications |
| `#reference` | `references/` | Reference materials and resources |
| `#role` | `roles/` | Job roles and positions |
| `#skill` | `skills/` | Skills and competencies |

Notes without these specific tags will be placed in the `obsidian/` folder.

## Website Features

### Notes Index (`/notes`)

- Grid layout of all notes
- Search functionality
- Tag filtering
- Responsive design

### Individual Notes (`/notes/[slug]`)

- Full markdown rendering
- Syntax highlighting
- Responsive layout
- Navigation breadcrumbs

### Companies Section (Homepage)

- Displays company notes above the hero section
- Grid layout with company cards
- Links to individual company pages
- Shows company tags and descriptions

### Companies Index (`/companies`)

- Complete list of all companies
- Search and filter functionality
- Individual company detail pages
- Responsive design

## Obsidian Syntax Conversion

The sync script automatically converts Obsidian-specific syntax:

| Obsidian | Standard Markdown |
|----------|-------------------|
| `[[Internal Link]]` | `[Internal Link](Internal Link)` |
| `> [!NOTE] Text` | `> **NOTE:** Text` |
| `aliases: [alias1, alias2]` | *(removed)* |
| `tags: [tag1, tag2]` | *(preserved, portfolio tag added)* |
| `#portfolio` | *(detected for filtering)* |

## Troubleshooting

### Common Issues

#### 1. "Could not find Obsidian vault path"

**Solution**: Set the `OBSIDIAN_PATH` environment variable:

```bash
export OBSIDIAN_PATH="/path/to/your/vault"
npm run sync-obsidian
```

#### 2. "No files copied - all files skipped"

**Solution**: Add the `#portfolio` tag to your notes:

```yaml
---
title: "My Note"
tags: ["portfolio"]
---
```

Or add `#portfolio` anywhere in your note content.

#### 3. Permission denied errors

**Solution**: Check file permissions and ensure the script has read access to your Obsidian vault.

#### 4. Git authentication errors

**Solution**: Ensure your Git credentials are properly configured:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 5. Build errors

**Solution**: Check that all markdown files have valid frontmatter:

```yaml
---
title: "Note Title"
date: 2024-01-01
tags: ["portfolio"]
---
```

### Debug Mode

Run with verbose logging:

```bash
DEBUG=true npm run sync-obsidian
```

### Manual File Processing

If automatic sync fails, you can manually copy files:

```bash
# Create the target directory
mkdir -p src/content/obsidian

# Copy files manually
cp -r "/path/to/obsidian/vault"/* src/content/obsidian/

# Build the project
npm run build
```

## Advanced Configuration

### Custom Exclusions

Edit the `EXCLUDE_PATTERNS` array in `scripts/sync-obsidian.js`:

```javascript
EXCLUDE_PATTERNS: [
  '.obsidian',
  'node_modules',
  '.git',
  'Backup',
  'Templates',
  'Attachments',
  '*.tmp',
  '*.temp',
  'your-custom-folder'  // Add custom exclusions
],
```

### Custom File Extensions

Modify the `INCLUDE_EXTENSIONS` array:

```javascript
INCLUDE_EXTENSIONS: ['.md', '.markdown', '.txt'],  // Add more extensions
```

### Custom Deployment

Edit the `deploy()` method in the sync script to customize deployment behavior.

## Mobile Usage

### Android

1. Install Termux or similar terminal app
2. Clone your repository
3. Run the mobile sync script:

```bash
cd Portfolio-V2
node scripts/sync-mobile.js
```

### iOS

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

### Cloud Sync

For cloud-synced vaults (Dropbox, Google Drive, etc.):

1. Use the mobile sync script
2. Select "cloud" as the sync method
3. Provide the cloud storage path

**Note**: Obsidian mobile does not automatically sync to cloud storage. You need to manually export and transfer files, or use third-party sync solutions.

## Security Considerations

- **Public Notes**: Only sync notes you want to make public
- **Sensitive Data**: Never sync notes containing passwords, API keys, or personal information
- **Git History**: Consider using `.gitignore` to exclude sensitive files
- **Access Control**: Use proper authentication for your deployment platform

## Contributing

To contribute to this sync system:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This sync system is part of your portfolio project and follows the same license terms.

## Support

If you encounter issues:

1. Check the troubleshooting section
2. Review the GitHub Actions logs
3. Create an issue with detailed error information
4. Include your platform and Obsidian vault structure

---

**Happy syncing!** 🚀 