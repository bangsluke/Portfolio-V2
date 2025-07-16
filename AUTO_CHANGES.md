# Auto Changes Log

## Example Log

### 2024-06-09 08:47 [main] - Tailwind CSS v4 Compatibility Fixes
- Fixed @apply directives in notes/[...slug].astro
  - Replaced all `@apply` directives with direct CSS properties
  - Converted Tailwind utility classes to raw CSS values
  - Fixed font-bold, text-gray-900, mt-8, mb-4, and other utility classes
- Fixed @apply bg-blue-100 in companies/index.astro  
  - Replaced `@apply bg-blue-100 border-blue-300 text-blue-700` with direct CSS color values
- Removed @apply prose from notes/[...slug].astro
  - Removed `@apply prose prose-lg max-w-none` from CSS
- Removed @apply prose from companies/[...slug].astro
  - Removed `@apply prose prose-lg max-w-none` from CSS
- Created tailwind.config.js
  - Added Tailwind CSS v4 configuration with typography plugin

## Auto Log

## 2025-01-16 09:15 [main] - Fixed Obsidian vault path validation in sync scripts
- Added proper validation for OBSIDIAN_PATH environment variable in sync-production.js
- Added proper validation for OBSIDIAN_PATH environment variable in sync-obsidian.js
- Added error handling to exit with clear error messages if OBSIDIAN_PATH is not set or invalid
- Fixed SYNC_CONFIG.DEBUG reference to use process.env.DEBUG instead
- Scripts now validate that the Obsidian vault path exists before attempting to sync
- Fixed .env file loading to use absolute paths for better reliability
- Added debugging output to show .env file location and available environment variables
- Fixed build error by removing missing image references from Dorkinians Website V2.md
- Removed references to non-existent image files: 20241201-player-stats-page-design.jpeg, 20241001-PointsPerGame.jpeg, 20241001-Stats Background.png, and 20241001-Stats Filters.png
- Added automatic image filtering in markdown processing to prevent build errors
- Enhanced email notification debugging and reliability
- Modified success criteria to send emails even when build fails if files were processed
- Added comprehensive email service debugging output
- Fixed image filtering to occur during file copy process instead of after build
- Image references are now filtered out before files are written to prevent build errors
- Manually fixed remaining image references in Dorkinians Website V2.md that were causing build errors
- Improved image filtering regex patterns to be more robust and handle edge cases
- Fixed require/import issue in post-processing function to work with ES modules
- Updated all package.json scripts to use cross-env instead of set for better cross-platform compatibility
- Added post-processing image filtering to sync-obsidian.js for consistency
- All sync scripts now use cross-env for reliable environment variable handling

## 2024-12-19 09:31 [main] - Added ESLint configuration
- Created eslint.config.js with comprehensive rules for Astro, TypeScript, React, and JavaScript
- Added support for Astro-specific linting rules and accessibility checks
- Configured TypeScript ESLint with strict rules and proper error handling
- Added React/Preact component linting rules
- Installed required dependencies: @eslint/js, globals, typescript-eslint
- Added lint and lint:fix scripts to package.json
- Configured proper file ignores for build artifacts and configuration files

## 2024-12-19 09:24 [main] - Fixed Tags component build error
- Fixed "i is not defined" error in Tags.astro component
- Added proper error handling for posts without tags in frontmatter
- Added optional chaining (?.) to safely access post.frontmatter.tags
- Added filtering to remove undefined/null tags before processing
- Added explicit type annotation for tag parameter in map function
- Fixed similar issues in MarkdownPostLayout.astro for both tags and languages
- Added optional chaining and fallback arrays for frontmatter.tags and frontmatter.languages

## 2024-06-09 09:00 [main] - Fixed GraphQL build error in Netlify
- Updated Experience component to handle GraphQL unavailability during build
- Added fallback data for when backend is not available
- Enhanced GraphQL client to handle build-time environment better
- Fixed "Invalid URL" error that was causing Netlify builds to fail

## 2024-06-09 08:52 [main] - Documented Shiki warnings for Obsidian languages
- Added comment explaining that Shiki warnings for "table-of-contents", "dataview", and "meta-bind" are expected
- These are Obsidian-specific syntaxes that fall back to plaintext highlighting
- No action needed as this is normal behavior when syncing from Obsidian

## 2024-06-09 08:51 [main] - Fixed @apply directives in global.css
- Replaced all `@apply` directives with direct CSS properties
- Converted Tailwind utility classes to raw CSS values
- Fixed text-white, bg-mint-500, text-sm, font-bold, text-3xl, text-2xl, text-xl, text-lg, text-base, tracking-normal, font-montserrat, text-pretty, max-md:text-lg, text-blacktext, dark:text-white, dark:text-gray-200, mb-8, leading-8, font-semibold, dark:text-riptide-300, text-mint-500, underline, hover:text-riptide-400, transition-all, list-decimal, list-disc, pl-4, pb-0, py-1, dark:text-mint-300/50, text-blacktext/30, py-4, border-l-4, border-mint-500, pl-4, italic, bg-mint-50, dark:bg-mint-900/20, backdrop-blur-lg, mb-0, px-2, py-0.5, w-full, h-full, px-8, py-12, font-bold, rounded-lg, h-auto, overflow-hidden, my-8, size-5, absolute, text-slate-400, text-xs, cursor-pointer, bg-slate-600/50, border, hover:bg-transparent, border-slate-500, p-2.5, rounded-md, top-4, right-4, flex, transition-all, duration-300, max-md:opacity-100, md:opacity-0, group-hover:opacity-100, items-center, justify-center, space-y-2, flex, items-center, gap-4, w-5, h-5, accent-mint-300, line-through, text-mint-600, text-gray-800, transition-all, duration-700, flex!, flex-col!, left-0, top-full, mt-4, absolute, shadow-xl, dark:text-zinc-300, bg-linear-to-t, from-white, to-white/90, dark:from-zinc-950, dark:to-zinc-950/80, bg-clip-padding, backdrop-filter, backdrop-blur, backdrop-saturate-100, backdrop-contrast-100, and many other utility classes

## 2024-06-09 08:50 [main] - Fixed @apply directives in companies/[...slug].astro
- Replaced all `@apply` directives with direct CSS properties
- Converted Tailwind utility classes to raw CSS values
- Fixed font-bold, text-gray-900, mt-8, mb-4, and other utility classes

## 2024-06-09 08:47 [main] - Tailwind CSS v4 Compatibility Fixes
- Fixed @apply directives in notes/[...slug].astro
  - Replaced all `@apply` directives with direct CSS properties
  - Converted Tailwind utility classes to raw CSS values
  - Fixed font-bold, text-gray-900, mt-8, mb-4, and other utility classes
- Fixed @apply bg-blue-100 in companies/index.astro  
  - Replaced `@apply bg-blue-100 border-blue-300 text-blue-700` with direct CSS color values
- Removed @apply prose from notes/[...slug].astro
  - Removed `@apply prose prose-lg max-w-none` from CSS
- Removed @apply prose from companies/[...slug].astro
  - Removed `@apply prose prose-lg max-w-none` from CSS
- Created tailwind.config.js
  - Added Tailwind CSS v4 configuration with typography plugin
