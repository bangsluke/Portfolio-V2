# Documentation Index

This index provides an overview of all documentation files in the Portfolio V2 repository and their purposes.

## 📚 Main Documentation

### [README.md](README.md)
**Primary documentation for the entire project**
- Project overview and features
- Quick start guide
- Complete Obsidian sync system documentation
- GraphQL setup and usage
- Troubleshooting guide
- **Start here for new users**

### [SETUP_GUIDE.md](SETUP_GUIDE.md)
**Comprehensive setup and configuration guide**
- Step-by-step installation instructions
- Environment configuration
- Project structure overview
- All features and their setup
- Best practices and security considerations
- **Use this for initial setup**

### [OBSIDIAN_SYNC_README.md](OBSIDIAN_SYNC_README.md)
**Detailed Obsidian sync system documentation**
- Complete feature list
- Configuration options
- Usage examples
- Mobile sync instructions
- GitHub Actions integration
- Troubleshooting guide
- **Reference for sync system**

## 📱 Mobile Sync Documentation

### [scripts/ios-sync-guide.md](scripts/ios-sync-guide.md)
**iOS-specific sync instructions**
- Multiple sync methods for iPhone
- Files app export process
- Working Copy app setup
- iOS Shortcuts automation
- GitHub Actions for iOS
- Troubleshooting iOS issues
- **Essential for iOS users**

### [scripts/ios-shortcut-template.json](scripts/ios-shortcut-template.json)
**iOS Shortcuts automation template**
- JSON template for iOS Shortcuts
- Automated file transfer setup
- Webhook integration
- **Import this into Shortcuts app**

## 🤖 Automation Documentation

### [.github/workflows/obsidian-sync.yml](.github/workflows/obsidian-sync.yml)
**GitHub Actions workflow configuration**
- Automated sync and deployment
- Manual trigger options
- Scheduled syncs
- Multi-platform support
- **CI/CD configuration**

### [scripts/deploy.sh](scripts/deploy.sh)
**Deployment script documentation**
- Automated deployment process
- Netlify and Vercel deployment
- Notification integration
- Error handling
- **Deployment automation**

## 🔧 Script Documentation

### [scripts/sync-obsidian.js](scripts/sync-obsidian.js)
**Main sync script**
- Core sync functionality
- File processing and organization
- Error logging and verification
- Email notifications
- **Primary sync engine**

### [scripts/sync-mobile.js](scripts/sync-mobile.js)
**Mobile-friendly sync script**
- Interactive prompts
- Platform detection
- Multiple sync methods
- iOS-specific handling
- **Mobile sync solution**

## 📋 Configuration Files

### [package.json](package.json)
**Project configuration and scripts**
- Available npm scripts
- Dependencies
- Sync command definitions
- **Project setup**

### [astro.config.mjs](astro.config.mjs)
**Astro framework configuration**
- Build settings
- Integration configuration
- **Framework setup**

## 🗂️ Documentation Structure

```
Portfolio-V2/
├── README.md                    # Main project documentation
├── SETUP_GUIDE.md              # Complete setup guide
├── OBSIDIAN_SYNC_README.md     # Sync system documentation
├── DOCUMENTATION_INDEX.md      # This file - documentation overview
├── scripts/
│   ├── ios-sync-guide.md       # iOS sync instructions
│   ├── ios-shortcut-template.json # iOS automation template
│   ├── sync-obsidian.js        # Main sync script
│   ├── sync-mobile.js          # Mobile sync script
│   └── deploy.sh               # Deployment script
├── .github/workflows/
│   └── obsidian-sync.yml       # GitHub Actions workflow
├── package.json                # Project configuration
└── astro.config.mjs           # Astro configuration
```

## 🎯 Documentation Usage Guide

### For New Users
1. Start with [README.md](README.md) for project overview
2. Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) for installation
3. Reference [OBSIDIAN_SYNC_README.md](OBSIDIAN_SYNC_README.md) for sync features

### For iOS Users
1. Read [scripts/ios-sync-guide.md](scripts/ios-sync-guide.md) for mobile sync
2. Import [scripts/ios-shortcut-template.json](scripts/ios-shortcut-template.json) for automation

### For Developers
1. Review [.github/workflows/obsidian-sync.yml](.github/workflows/obsidian-sync.yml) for CI/CD
2. Check [scripts/deploy.sh](scripts/deploy.sh) for deployment process
3. Examine [scripts/sync-obsidian.js](scripts/sync-obsidian.js) for sync logic

### For Troubleshooting
1. Check the troubleshooting sections in [README.md](README.md)
2. Review error logs and sync reports
3. Consult platform-specific guides (iOS, Android, etc.)

## 📝 Documentation Maintenance

### When Adding New Features
1. Update [README.md](README.md) with feature overview
2. Add setup instructions to [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. Update relevant script documentation
4. Add troubleshooting information if needed

### When Updating Scripts
1. Update inline comments in script files
2. Update corresponding documentation files
3. Test documentation examples
4. Update this index if new files are added

### Documentation Standards
- Use clear, concise language
- Include code examples where helpful
- Provide troubleshooting sections
- Keep links and references up to date
- Use consistent formatting and structure

## 🔗 Related Resources

- [Backend Server Documentation](https://github.com/bangsluke/bangsluke-backend-server)
- [Astro Documentation](https://docs.astro.build/)
- [Obsidian Documentation](https://help.obsidian.md/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: January 2025  
**Maintained By**: Portfolio V2 Development Team 