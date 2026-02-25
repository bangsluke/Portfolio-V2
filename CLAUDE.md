# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev                    # Start dev server on localhost:4321
npm run build                  # Full production build (runs tests first, then astro build)
npm run preview                # Preview production build

# Testing
npm run test                   # Jest unit tests
npm run test:watch             # Jest watch mode
npm run test:coverage          # Jest with coverage report
npm run test:e2e               # Playwright E2E tests
npm run test:e2e:watch         # Playwright UI mode

# Linting & Formatting
npm run lint                   # ESLint check
npm run lint:fix               # ESLint auto-fix
npm run lint:css               # Stylelint check
npm run format                 # Prettier format all files
npm run format:check           # Prettier check only

# Obsidian Sync
npm run sync:dev               # Sync Obsidian vault locally (no deploy)
npm run sync:prod:deploy       # Sync + deploy to Netlify
```

**Run a single Jest test file:**
```bash
npx jest __tests__/unit/date-formatter.test.ts
```

**Run a single Playwright test:**
```bash
npx playwright test __tests__/e2e/01-home/
```

## Architecture

**Astro 5 static site** with Preact for interactive components, Tailwind CSS 4, deployed to Netlify.

### Content System

All portfolio content lives in `src/content/` as markdown files synced from an Obsidian vault. The sync system (`scripts/sync.js`) pulls files tagged `#portfolio` from the vault, processes Obsidian syntax (`[[wikilinks]]`, callouts, etc.), and writes typed content collections.

Content collections are defined with Zod schemas in `src/content/config.ts`:
- `projects` — portfolio projects with slug, skills, descriptions, URLs
- `skills` — skills with rating, category, icon mapping
- `companies` / `roles` / `clients` — work experience
- `educations` — education history
- `references` — professional references
- `staticData` — profile info, social links, site config

**Never manually edit files in `src/content/`** — they are overwritten by the sync system.

### Component Split: Astro vs Preact

- **`.astro` components** — used for all static rendering (project cards, timelines, hero, etc.)
- **`.tsx` Preact components** — used only when interactivity is needed (carousel hover states, GitHub contributions graph, search/filter)

Interactive components are in `src/components/portfolio/` and `src/components/ui/`. Preact is configured as the JSX runtime in `tsconfig.json`.

### Pages & Routing

- `src/pages/index.astro` — homepage assembling all portfolio sections
- `src/pages/projects/index.astro` — paginated project gallery with Fuse.js filtering
- `src/pages/projects/[slug].astro` — dynamic project detail pages
- `src/pages/work-experience.astro` — work timeline
- `src/pages/education.astro` — education timeline

### Utilities

Stateless helpers in `src/utils/`:
- `content-processor.ts` — processes Obsidian wikilinks to proper URLs
- `date-formatter.ts` — date display helpers
- `icon-utils.ts` — maps skill names to icon identifiers (100+ icons in `src/icons/`)
- `project-count-utils.ts` — project counting/filtering logic

### Icon System

Technology icons live in `src/icons/` as SVG files. The `icon-utils.ts` maps skill/technology names to icon file names with fuzzy fallbacks. To add new icons, run `npm run update-icons`.

### Theme

Dark/light mode uses CSS class toggling (`dark:` prefix) with localStorage persistence. The theme script is inlined in `src/layouts/Layout.astro` to prevent flash on load. Color scheme: primary green `#4ade80`, fonts: Montserrat/Roboto/Open Sans.

### Testing Infrastructure

- **Unit tests** (`__tests__/unit/`) — Jest + ts-jest for utility functions. Tests live alongside test fixtures and a shared `jest.setup.ts`.
- **E2E tests** (`__tests__/e2e/`) — Playwright organized by page with Page Object Models in `__tests__/e2e/page-object-models/`.
- **BDD tests** — Cucumber feature files in `__tests__/e2e/features/`.

### Build Pipeline

`npm run build` chains: `npm run test` → `npm run update-readme-links` → `astro build`. The build will fail if tests fail.

### Key Config

- `astro.config.mjs` — Astro config; uses Prism (not Shiki) for syntax highlighting to avoid WASM issues
- `eslint.config.cjs` — flat config ESLint; ignores `scripts/`, `dist/`, `.astro/`
- `netlify/functions/umami-report.mjs` — scheduled weekly analytics email

### Environment Variables

Required for sync/deploy features (see `.env.example`):
- `OBSIDIAN_PATH` — local path to Obsidian vault
- `NETLIFY_AUTH_TOKEN` / `NETLIFY_SITE_ID` — for deployment
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — for sync email notifications
- `UMAMI_WEBSITE_ID` / `UMAMI_API_KEY` — for analytics reports
