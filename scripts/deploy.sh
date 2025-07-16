#!/bin/bash

# Automated deployment script for Obsidian sync
# This script can be used in CI/CD pipelines or for manual deployment

set -e  # Exit on any error

echo "🚀 Starting automated deployment..."

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
NETLIFY_SITE_ID="${NETLIFY_SITE_ID:-}"
NETLIFY_TOKEN="${NETLIFY_TOKEN:-}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "$PROJECT_DIR/package.json" ]; then
    log_error "Not in a valid project directory"
    exit 1
fi

cd "$PROJECT_DIR"

# Check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
    log_info "Changes detected, committing..."
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "Auto-deploy: Sync Obsidian notes at $TIMESTAMP"
    
    # Push to remote
    log_info "Pushing to remote repository..."
    git push origin "$DEPLOY_BRANCH"
else
    log_warn "No changes to commit"
fi

# Install dependencies
log_info "Installing dependencies..."
npm ci

# Build the project
log_info "Building project..."
npm run build

# Deploy to Netlify (if configured)
if [ -n "$NETLIFY_SITE_ID" ] && [ -n "$NETLIFY_TOKEN" ]; then
    log_info "Deploying to Netlify..."
    
    # Check if netlify-cli is installed
    if ! command -v netlify &> /dev/null; then
        log_info "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Deploy to Netlify
    netlify deploy --prod --dir=dist --site="$NETLIFY_SITE_ID" --auth="$NETLIFY_TOKEN"
    
    log_info "✅ Netlify deployment completed!"
else
    log_warn "Netlify deployment skipped (missing NETLIFY_SITE_ID or NETLIFY_TOKEN)"
fi

# Alternative: Deploy to Vercel (if configured)
if [ -n "$VERCEL_TOKEN" ]; then
    log_info "Deploying to Vercel..."
    
    # Check if vercel-cli is installed
    if ! command -v vercel &> /dev/null; then
        log_info "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    vercel --prod --token="$VERCEL_TOKEN"
    
    log_info "✅ Vercel deployment completed!"
fi

log_info "🎉 Deployment completed successfully!"

# Optional: Send notification
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    log_info "Sending Slack notification..."
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"✅ Obsidian sync deployment completed successfully!\"}" \
        "$SLACK_WEBHOOK_URL"
fi

if [ -n "$DISCORD_WEBHOOK_URL" ]; then
    log_info "Sending Discord notification..."
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"content\":\"✅ Obsidian sync deployment completed successfully!\"}" \
        "$DISCORD_WEBHOOK_URL"
fi 