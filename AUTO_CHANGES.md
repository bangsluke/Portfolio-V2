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

## 2025-01-16 10:45 [main] - Enhanced section extraction with advanced link processing
- Updated extractSectionContent function with comprehensive link processing
  - Added priority processing for [[CompanyName|AltName]] format to extract AltName only
  - Converts standard markdown links [Link Text](url) to HTML <a href="url">Link Text</a>
  - Maintains existing [[text]] -> text conversion for simple Obsidian links
  - Improved text cleaning pipeline with ordered processing
- Enhanced section extraction for better content integration
  - Better handling of mixed link formats in extracted content
  - Cleaner output for frontmatter storage
  - Maintains HTML link functionality in extracted sections

## 2025-01-16 10:50 [main] - Added client-side content processing for Obsidian links
- Created content-processor.ts utility for processing markdown content on the site
  - processMarkdownContent function handles Obsidian links and markdown links when rendering
  - processObsidianLink function for single values like linkedCompany
  - Converts [[CompanyName|AltName]] to AltName and [[text]] to text
  - Converts markdown links to styled HTML links
- Updated ExperienceItem component to use content processing
  - Imports and uses content-processor utilities
  - Processes roleDescription and keyAchievement with HTML output
  - Processes linkedCompany to remove Obsidian syntax
  - Uses set:html directive to render processed HTML content
- Added CSS styling for processed content links
  - Added .processed-content a rules with mint-green color (#31d69a)
  - Hover effects with lighter mint-green (#6ce9b7)
  - Dark mode support for consistent styling
  - Applied processed-content class to ExperienceItem divs
- Improved content rendering with proper link handling
  - Obsidian links are processed when content is displayed on the site
  - Markdown links become clickable HTML links with mint-green styling
  - Better user experience with functional, styled links in portfolio content

## 2025-01-16 10:40 [main] - Added Obsidian link syntax removal to section extraction
- Updated extractSectionContent function to remove Obsidian-style links from extracted text
  - Added regex replacement to convert [[text]] to text
  - Removes double brackets while preserving the link text content
  - Ensures clean text output for frontmatter without Obsidian-specific syntax
- Improved text cleaning for section extraction
  - Maintains existing whitespace and newline cleanup
  - Adds link syntax removal to the processing pipeline
  - Better integration with Astro content collection requirements

## 2025-01-16 10:35 [main] - Fixed education name handling to use filenames instead of frontmatter
- Removed name field from Ashcombe School.md frontmatter
  - Education files should not have name property in frontmatter
  - Filenames can be used to populate the name automatically
- Updated education collection schema to make name field optional
  - Changed from required string to optional string in config.ts
  - Allows education files to work without explicit name in frontmatter
- Updated Education component to derive name from filename
  - Uses education.slug.replace(/-/g, ' ') to convert filename to readable name
  - Falls back to filename-based name when frontmatter name is not provided
  - Maintains backward compatibility with existing name fields
- Fixed sorting logic to use slug instead of potentially undefined name field
  - Prevents TypeScript errors when name field is missing
  - Ensures consistent sorting behavior

## 2025-01-16 10:30 [main] - Modified skill description handling to use YAML frontmatter only
- Updated extractSectionsToFrontmatter function to exclude skillDescription from section extraction
  - Removed "Skill Description" section from being extracted for skill content type
  - skillDescription should now only come from YAML frontmatter, not from markdown sections
  - Maintains extraction of other skill sections like "Key Achievement"
- Fixed issue where skill descriptions were being duplicated from both frontmatter and sections
  - Prevents conflicts between YAML frontmatter skillDescription and extracted section content
  - Ensures consistent data source for skill descriptions across the application
  - Maintains data integrity and prevents build errors from duplicate fields

## 2025-01-16 10:25 [main] - Fixed duplicate frontmatter fields in section extraction
- Enhanced section extraction logic to prevent duplicate fields in frontmatter
  - Added duplicate detection by parsing existing frontmatter fields
  - Only adds extracted fields if they don't already exist in frontmatter
  - Prevents YAML parsing errors from duplicate mapping keys
- Fixed specific issue in Apollo.md skill file
  - Removed duplicate skillDescription field that was causing build failure
  - Resolved "duplicated mapping key" error in YAML frontmatter
- Added debug logging for frontmatter field management
  - Shows when fields are added or skipped due to existing duplicates
  - Helps troubleshoot section extraction issues
- Improved robustness of section extraction process
  - Handles cases where Obsidian files already have extracted fields
  - Maintains data integrity and prevents build failures
  - Better error handling for malformed frontmatter

## 2025-01-16 10:20 [main] - Cleaned up old sync script files
- Deleted obsolete sync script files after successful consolidation
  - Removed sync-obsidian.js (functionality moved to sync.js with SYNC_MODE=development)
  - Removed sync-production.js (functionality moved to sync.js with SYNC_MODE=production)
  - Removed sync-mobile.js (functionality moved to sync.js with SYNC_MODE=mobile)
- Reduced codebase complexity and maintenance overhead
  - Eliminated 3 separate files with duplicated functionality
  - Single source of truth for all sync operations
  - Cleaner scripts directory structure
- All functionality preserved in unified sync.js script
  - No loss of features or capabilities
  - Improved maintainability and consistency
  - Better error handling and logging across all modes

## 2025-01-16 10:15 [main] - Consolidated sync scripts into unified system
- Created unified sync.js script that replaces sync-obsidian.js, sync-production.js, and sync-mobile.js
  - Single source of truth for all sync functionality
  - Environment variables control behavior: SYNC_MODE, EMAIL_NOTIFICATIONS, AUTO_DEPLOY, DEBUG
  - Eliminates code duplication and maintenance overhead
- Updated package.json scripts to use new unified sync system
  - sync:dev - Development mode (equivalent to old sync-obsidian)
  - sync:prod - Production mode (equivalent to old sync-production)
  - sync:mobile - Mobile mode (for future mobile-specific functionality)
  - Added debug variants for each mode with DEBUG=true
  - Maintained all existing functionality with cleaner command structure
- Environment variable controls:
  - SYNC_MODE: 'development', 'production', 'mobile' (defaults to 'development')
  - EMAIL_NOTIFICATIONS: 'true'/'false' (defaults to 'false')
  - AUTO_DEPLOY: 'true'/'false' (defaults to 'false')
  - DEBUG: 'true'/'false' (defaults to 'false')
- Improved logging and status reporting
  - Shows sync mode, email notifications, auto deploy, and debug status at startup
  - Consistent error handling across all modes
  - Better progress reporting and debugging information
- Maintained backward compatibility through environment variable mapping
  - All existing functionality preserved
  - Easier to extend with new sync modes in the future
  - Reduced maintenance burden and potential for bugs

## 2025-01-16 10:10 [main] - Integrated section extraction into sync scripts
- Added section extraction functionality directly to sync-production.js and sync-obsidian.js
  - Moved extractSectionContent and extractSectionsToFrontmatter functions from process-obsidian-markdown.js
  - Added getContentType function to determine content type based on target folder
  - Section extraction now happens during file copy process, not just post-processing
- Fixed issue where section content was not being extracted during sync
  - Previously, section extraction only occurred in post-processing step
  - Now sections are extracted and added to frontmatter before files are written
  - Content type detection ensures only relevant sections are extracted for each file type
- Added debug logging for section extraction process
  - Shows when section extraction is applied for each content type
  - Logs extracted content previews when DEBUG mode is enabled
  - Helps troubleshoot extraction issues during sync process
- Both production and development sync scripts now include section extraction
  - Ensures consistent behavior across all sync operations
  - Maintains backward compatibility with existing sync workflows

## 2025-01-16 10:05 [main] - Fixed schema validation for null date values
- Updated all collection schemas to properly handle null values for date fields
  - Added z.null() to dateStart and dateEnd unions in companies, clients, roles, and educations collections
  - Added z.null() to created and modified date fields in all collections
  - Added z.null() to birthday, died, and marriageDate in references collection
  - Added imageURL field to companies collection schema to match actual data
- Fixed InvalidContentEntryDataError for companies collection
  - Resolved issue where empty dateStart/dateEnd values in frontmatter were parsed as null
  - Schema now accepts null values for all date fields, preventing validation errors
  - Maintains backward compatibility while handling missing or empty date values

## 2025-01-16 10:00 [main] - Implemented content-type specific section extraction
- Updated extractSectionsToFrontmatter function to handle different content types
  - Role notes: extracts "Role Description" and "Key Achievement" sections
  - Project notes: extracts "Short Description", "Long Description", and "Lessons Learned" sections
  - Education notes: extracts "Qualifications" and "Additional Details" sections
  - Company notes: extracts "Company Description" and "Key Achievement" sections
  - Skill notes: extracts "Skill Description" and "Key Achievement" sections
  - Client notes: extracts "Client Description" and "Key Achievement" sections
  - Reference notes: extracts "Reference Description" and "Key Achievement" sections
- Updated collection schemas in config.ts to include new extracted properties
  - Projects: shortDescription, longDescription, lessonsLearned
  - Education: qualifications, additionalDetails
  - All other collections maintain their existing extracted properties
- Created debug-projects.astro page for project-specific section debugging
  - Shows extraction status for Short Description, Long Description, and Lessons Learned
  - Provides visual indicators and content previews for each section
  - Displays extraction statistics and individual project analysis
- Created debug-education.astro page for education-specific section debugging
  - Shows extraction status for Qualifications and Additional Details
  - Provides visual indicators and content previews for each section
  - Displays extraction statistics and individual education analysis
- All debug pages now focus on content-type specific sections rather than generic extraction

## 2025-01-16 09:50 [main] - Added console logging for roles collection debugging
- Created debug-roles.astro page for comprehensive roles collection logging
  - Fetches all roles from local content collection using getCollection('roles')
  - Logs total roles count, slugs, and detailed data to console
  - Displays roles collection summary on webpage for visual debugging
  - Shows JSON size and individual role data for troubleshooting
- Enhanced Experience.astro component with detailed roles logging
  - Added comprehensive console logging for GraphQL roles data
  - Logs total roles fetched, individual role details, and final processed array
  - Shows roleDescription and linkedCompany data from GraphQL backend
  - Provides debugging information for both successful and fallback scenarios
- Both debug pages provide server-side and client-side console output
  - Server-side logs show during build/SSR process
  - Client-side logs show in browser console for runtime debugging
  - Helps troubleshoot roles data extraction and processing pipeline

## 2025-01-16 09:45 [main] - Added section content extraction functionality
- Added extractSectionContent function to process-obsidian-markdown.js
  - Extracts content between specific markdown headers and end markers
  - Supports flexible section name matching with case-insensitive regex
  - Cleans up extracted content by removing extra whitespace and newlines
- Added extractSectionsToFrontmatter function to process-obsidian-markdown.js
  - Extracts multiple predefined sections: Role Description, Key Achievement, Project Description, etc.
  - Adds extracted content as structured frontmatter properties
  - Handles both existing and new frontmatter scenarios
  - Escapes quotes and newlines in extracted content for proper YAML formatting
- Updated all collection schemas in config.ts to include extracted section properties
  - Added roleDescription, keyAchievement, projectDescription, companyDescription, etc.
  - All new properties are optional strings to maintain backward compatibility
  - Supports extraction from roles, projects, companies, skills, educations, clients, and references
- Enhanced markdown processing pipeline to extract sections before other transformations
  - Section extraction happens early in the process to preserve original content structure
  - Extracted content is added to frontmatter for easy access in Astro components
  - Maintains original markdown content while adding structured data

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
  - Replaced `@apply bg-blue-100 border-blue-300 text-blue-700`