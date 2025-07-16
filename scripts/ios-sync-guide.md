# iOS Obsidian Sync Guide

Since Obsidian mobile files are not stored in iCloud by default, here are several methods to sync your notes from iPhone to your portfolio site.

## 📱 Method 1: Files App Export (Recommended)

### Step 1: Export from Obsidian Mobile
1. Open Obsidian mobile app
2. Go to **Settings** → **About**
3. Tap **Export vault**
4. Choose **"Export as plain text"**
5. Save to **Files app** in a folder you can access

### Step 2: Transfer to Computer
**Option A: AirDrop**
1. On your iPhone, open **Files app**
2. Navigate to the exported folder
3. Select all `.md` files
4. Tap **Share** → **AirDrop**
5. Send to your computer

**Option B: iCloud Drive**
1. In Files app, move the exported folder to **iCloud Drive**
2. On your computer, access via **iCloud Drive**
3. Copy files to your project directory

**Option C: USB Transfer**
1. Connect iPhone to computer via USB
2. Use **Finder** (Mac) or **File Explorer** (Windows)
3. Navigate to Files app folder
4. Copy files to your project

### Step 3: Run Sync Script
```bash
cd Portfolio-V2
node scripts/sync-mobile.js
# Choose "files-app" method
# Enter the path where you copied the files
```

## 📚 Method 2: Working Copy App (Git-based)

### Step 1: Setup Working Copy
1. Install **Working Copy** from App Store
2. Add your portfolio repository
3. Clone the repository to your iPhone

### Step 2: Export and Commit
1. Export Obsidian vault as plain text
2. Copy exported files to Working Copy repository
3. Commit and push changes

### Step 3: Run Sync Script
```bash
cd Portfolio-V2
node scripts/sync-mobile.js
# Choose "working-copy" method
# Enter your repository URL
```

## ⚡ Method 3: iOS Shortcuts Automation

### Step 1: Create Shortcut
1. Open **Shortcuts app**
2. Import the provided template: [ios-shortcut-template.json](ios-shortcut-template.json)
3. Or create new shortcut with these actions:
   - **Get File** (from Obsidian export location)
   - **Get Contents of URL** (webhook endpoint)
   - **Post to Web** (send files to your server)

### Step 2: Setup Webhook
Create a simple webhook endpoint that receives files and triggers the sync script.

### Step 3: Run Sync Script
```bash
cd Portfolio-V2
node scripts/sync-mobile.js
# Choose "shortcuts" method
# Enter your webhook URL
```

## 🔄 Method 4: Manual File Transfer

### Step 1: Export Notes
1. In Obsidian mobile, export vault as plain text
2. Save to Files app

### Step 2: Transfer Files
Use any of these methods:
- **Email** files to yourself
- **Dropbox/Google Drive** upload
- **AirDrop** to computer
- **USB** transfer

### Step 3: Run Sync
```bash
cd Portfolio-V2
# Copy files to src/content/obsidian/
npm run sync-obsidian
```

## 🎯 Method 5: GitHub Actions (Automated)

### Step 1: Setup Repository
1. Ensure your portfolio repo is on GitHub
2. Add GitHub secrets for deployment

### Step 2: Manual Trigger
1. Go to your GitHub repository
2. Navigate to **Actions** → **Obsidian Sync & Deploy**
3. Click **Run workflow**
4. Enter your Obsidian vault path (if accessible)

### Step 3: Automated Deployment
The workflow will:
- Sync notes with `#portfolio` tag
- Build the site
- Deploy to production

## 📋 Prerequisites

### Required Apps
- **Obsidian** (mobile app)
- **Files** (built-in iOS app)
- **Working Copy** (optional, for Git sync)
- **Shortcuts** (optional, for automation)

### Required Setup
- Portfolio repository cloned locally
- Node.js installed on computer
- Git configured with credentials

## 🔧 Troubleshooting

### "Files not found" Error
- Ensure you exported the vault as **plain text**
- Check that files have `.md` extension
- Verify the path you entered is correct

### "Permission denied" Error
- Check file permissions on exported files
- Ensure you have read access to the directory

### "No portfolio tag found" Error
- Add `#portfolio` tag to notes you want to sync
- Check tag format (frontmatter or inline)

### AirDrop Issues
- Ensure both devices have AirDrop enabled
- Check that devices are on same WiFi network
- Try restarting AirDrop on both devices

## 🚀 Best Practices

### File Organization
- Keep exported files in a dedicated folder
- Use consistent naming for exports
- Clean up old exports regularly

### Tag Management
- Use `#portfolio` tag consistently
- Consider using additional tags for organization
- Review tags before syncing

### Backup Strategy
- Keep local backup of exported files
- Use version control for your portfolio
- Test sync process regularly

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify your Obsidian vault structure
3. Test with a single note first
4. Check the sync script logs for errors

## 🔄 Automation Tips

### Scheduled Sync
- Use GitHub Actions for automated sync
- Set up daily/weekly sync schedules
- Configure notifications for sync status

### Mobile Workflow
- Export notes after major changes
- Use consistent export location
- Set up reminders for regular syncs

---

**Note**: Since Obsidian mobile files are sandboxed, direct file system access is limited. The methods above provide workarounds to get your notes from the mobile app to your portfolio site. 