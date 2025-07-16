# Portfolio V2 Setup Guide

This guide covers the complete setup and configuration of the Portfolio V2 site with Obsidian sync integration.

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+ installed
- Git configured with credentials
- Obsidian vault with notes
- GitHub repository (for deployment)
- Backend server running (for GraphQL and email notifications)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/Portfolio-V2.git
cd Portfolio-V2

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# GraphQL Backend URLs
PUBLIC_APP_BACKEND_URL_DEV=http://localhost:5000
PUBLIC_APP_BACKEND_URL_PROD=https://bangsluke-backend-server.herokuapp.com

# Obsidian Sync Configuration
OBSIDIAN_PATH="/path/to/your/obsidian/vault"
PORTFOLIO_TAG="portfolio"
AUTO_DEPLOY="true"

# Email Notifications (Optional)
EMAIL_NOTIFICATIONS="true"
EMAIL_RECIPIENT="your-email@gmail.com"
BACKEND_URL="https://bangsluke-backend-server.herokuapp.com"

# Deployment (Optional)
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
VERCEL_TOKEN=your_vercel_token
```

### 3. Initial Sync

```bash
# Run the first sync
npm run sync-obsidian

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your portfolio with synced notes.

## 📁 Project Structure

```
Portfolio-V2/
├── src/
│   ├── content/           # Synced Obsidian notes
│   │   ├── obsidian/      # General notes
│   │   ├── companies/     # Company notes
│   │   ├── projects/      # Project notes
│   │   ├── clients/       # Client notes
│   │   ├── educations/    # Education notes
│   │   ├── references/    # Reference notes
│   │   ├── roles/         # Role notes
│   │   └── skills/        # Skill notes
│   ├── components/        # React/Preact components
│   ├── layouts/           # Astro layouts
│   ├── pages/             # Astro pages
│   └── utils/             # Utility functions
├── scripts/               # Sync and deployment scripts
│   ├── sync-obsidian.js   # Main sync script
│   ├── sync-mobile.js     # Mobile-friendly sync
│   ├── deploy.sh          # Deployment script
│   ├── ios-sync-guide.md  # iOS sync instructions
│   └── ios-shortcut-template.json
├── .github/workflows/     # GitHub Actions
│   └── obsidian-sync.yml  # Automated sync workflow
├── public/                # Static assets
└── dist/                  # Build output
```

## 🔄 Obsidian Sync System

### Features Implemented

1. **Selective Sync**: Only copies notes with `#portfolio` tag
2. **Tag-based Organization**: Automatically organizes notes into folders
3. **Markdown Processing**: Converts Obsidian syntax to standard markdown
4. **File Verification**: Ensures copied files exist and have content
5. **Error Logging**: Comprehensive error tracking in JSON format
6. **Email Notifications**: Automated sync reports via Gmail
7. **Mobile Support**: Sync from different devices and platforms
8. **Auto-Deployment**: GitHub Actions for continuous deployment

### Tag System

| Tag | Folder | Description |
|-----|--------|-------------|
| `#portfolio` | *(required)* | Main filter tag |
| `#project` | `projects/` | Project showcases |
| `#client` | `clients/` | Client work |
| `#company` | `companies/` | Company experiences |
| `#education` | `educations/` | Educational background |
| `#reference` | `references/` | Reference materials |
| `#role` | `roles/` | Job roles |
| `#skill` | `skills/` | Skills and competencies |

### Sync Commands

```bash
# Basic sync (copies files without deploying)
npm run sync-obsidian

# Sync and automatically deploy
npm run sync-obsidian:deploy

# Sync with email notifications
npm run sync-obsidian:email

# Sync, deploy, and send email notification
npm run sync-obsidian:deploy-email

# Use custom tag
npm run sync-obsidian:custom -- "public"

# Mobile-friendly interactive sync
node scripts/sync-mobile.js
```

## 📱 Mobile Sync Setup

### Android

1. Install Termux or similar terminal app
2. Clone your repository
3. Run the mobile sync script:

```bash
cd Portfolio-V2
node scripts/sync-mobile.js
```

### iOS

Since Obsidian mobile files are sandboxed, use one of these methods:

1. **Files App Export** (Recommended)
   - Export vault as plain text from Obsidian mobile
   - Save to Files app
   - Transfer via AirDrop, iCloud Drive, or USB

2. **Working Copy App**
   - Install Working Copy from App Store
   - Clone repository to iPhone
   - Export and commit changes

3. **iOS Shortcuts**
   - Import the provided template
   - Create automation for file transfer

4. **GitHub Actions**
   - Use automated workflow
   - Manual trigger from GitHub

See [iOS Sync Guide](scripts/ios-sync-guide.md) for detailed instructions.

## 🤖 GitHub Actions Setup

### 1. Repository Secrets

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

### 2. Workflow Triggers

The workflow can be triggered by:

- **Manual**: Using the workflow dispatch
- **Scheduled**: Daily at 2 AM UTC
- **Push**: When changes are made to `src/content/obsidian/` or `scripts/`

### 3. Manual Trigger

1. Go to your GitHub repository
2. Navigate to Actions → "Obsidian Sync & Deploy"
3. Click "Run workflow"
4. Optionally specify:
   - Obsidian vault path
   - Portfolio tag
   - Auto-deploy setting

## 📧 Email Notifications Setup

### 1. Backend Server Configuration

Ensure your backend server has the email endpoint configured:

```python
# In your backend server (app.py)
@app.route('/send-email', methods=['POST'])
def send_email():
    # Email sending logic
    pass
```

### 2. Environment Variables

```bash
# Enable email notifications
EMAIL_NOTIFICATIONS="true"
EMAIL_RECIPIENT="your-email@gmail.com"
BACKEND_URL="https://bangsluke-backend-server.herokuapp.com"
```

### 3. Email Content

The sync script sends detailed HTML emails including:
- Sync status (success/failure)
- File processing summary
- Error details in formatted tables
- Timestamps and source information

## 🎨 Frontend Components

### Companies Section

The homepage displays company notes above the hero section:

```typescript
// src/components/CompaniesList.tsx
import { fetchCompanies } from '../utils/companies';

// Displays company cards in a grid layout
// Links to individual company pages
// Shows company tags and descriptions
```

### Notes Index

All synced notes are available at `/notes` with:
- Grid layout
- Search functionality
- Tag filtering
- Responsive design

### Individual Note Pages

Each note has its own page at `/notes/[slug]` with:
- Full markdown rendering
- Syntax highlighting
- Responsive layout
- Navigation breadcrumbs

## 🔧 Configuration Options

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
  'your-custom-folder'
],
```

### Custom File Extensions

Modify the `INCLUDE_EXTENSIONS` array:

```javascript
INCLUDE_EXTENSIONS: ['.md', '.markdown', '.txt'],
```

### Custom Deployment

Edit the `deploy()` method in the sync script to customize deployment behavior.

## 🛠️ Troubleshooting

### Common Issues

1. **"Could not find Obsidian vault path"**
   - Set the `OBSIDIAN_PATH` environment variable
   - Check that the path exists and is accessible

2. **"No files copied - all files skipped"**
   - Add the `#portfolio` tag to your notes
   - Check tag format (frontmatter or inline)

3. **Permission denied errors**
   - Check file permissions
   - Ensure script has read access to vault

4. **Git authentication errors**
   - Configure Git credentials
   - Check SSH keys or personal access tokens

5. **Build errors**
   - Ensure all markdown files have valid frontmatter
   - Check for syntax errors in markdown

### Debug Mode

```bash
# Run with verbose logging
DEBUG=true npm run sync-obsidian
```

### Manual File Processing

If automatic sync fails:

```bash
# Create the target directory
mkdir -p src/content/obsidian

# Copy files manually
cp -r "/path/to/obsidian/vault"/* src/content/obsidian/

# Build the project
npm run build
```

## 🔒 Security Considerations

- **Public Notes**: Only sync notes you want to make public
- **Sensitive Data**: Never sync notes containing passwords, API keys, or personal information
- **Git History**: Consider using `.gitignore` to exclude sensitive files
- **Access Control**: Use proper authentication for your deployment platform

## 📚 Additional Resources

- [Obsidian Sync README](OBSIDIAN_SYNC_README.md) - Detailed sync documentation
- [iOS Sync Guide](scripts/ios-sync-guide.md) - Mobile sync instructions
- [GitHub Actions Workflow](.github/workflows/obsidian-sync.yml) - Automated deployment
- [Backend Server](https://github.com/bangsluke/bangsluke-backend-server) - GraphQL and email services

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel

1. Import your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy using the deploy script
./scripts/deploy.sh
```

## 🎯 Best Practices

1. **Regular Syncs**: Set up automated syncs via GitHub Actions
2. **Tag Management**: Use consistent tagging strategy
3. **Backup Strategy**: Keep local backups of your Obsidian vault
4. **Testing**: Test sync process regularly
5. **Monitoring**: Monitor sync logs and email notifications
6. **Security**: Review notes before syncing to ensure no sensitive data

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review the GitHub Actions logs
3. Check the sync error log (`sync-errors.json`)
4. Create an issue with detailed error information
5. Include your platform and Obsidian vault structure

---

**Happy syncing!** 🚀 