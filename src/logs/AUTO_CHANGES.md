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

## 2025-01-16 18:45 [main] - Refactored filename extension removal with utility function
- Created extractNameFromFilename utility function in src/utils/filename-utils.ts
  - Added regex-based function that removes .md extension from filenames
  - Added string-based alternative function for comparison
  - Function handles edge cases like empty strings, multiple .md occurrences, and case sensitivity
- Created comprehensive unit tests in src/__tests__/filename-utils.test.ts
  - Added 12 test cases covering all scenarios including edge cases
  - Tests both regex and string-based implementations
  - Verified functions produce same results for simple cases but differ for multiple .md occurrences
- Replaced all .replace('.md', '') and .replace(/\.md$/, '') instances with utility function
  - Updated SkillsBubbleChart.tsx to use extractNameFromFilename
  - Updated ProjectsGallery.astro to use extractNameFromFilename for company and client name extraction
  - Updated ReferencesCarousel.astro to use extractNameFromFilename for reference name processing
  - Updated WorkExperienceTimeline.astro to use extractNameFromFilename for role name extraction
  - Updated EducationTimeline.astro to use extractNameFromFilename for education name extraction
  - Updated CustomerAndClientCarousel.astro and CustomerAndClientCarousel.tsx to use extractNameFromFilename
  - Updated SkillPill.astro to use extractNameFromFilename for skill name matching
  - Updated work-experience.astro page to use extractNameFromFilename for role name display
  - Updated portfolio project pages ([slug].astro and index.astro) to use extractNameFromFilename
  - Updated sync.js script to use extractNameFromFilename for project and skill name processing
- Improved code maintainability and consistency
  - Centralized filename processing logic in reusable utility function
  - Eliminated code duplication across multiple components and pages
  - Made filename extension removal behavior consistent throughout the codebase
  - All tests pass successfully with 50/50 tests passing

## 2025-01-16 17:50 [main] - Enhanced Most Common Techs with multi-select filtering and improved mobile experience
- Updated MostCommonTechs.astro with comprehensive multi-select filtering and improved functionality
  - Replaced single-select dropdown with multi-select dropdown using predefined SKILLS_FILTER_OPTIONS
  - Added filter options: framework, library, language, database, design (from repoConfig.js)
  - Implemented smart filter logic: "All Categories" unchecks others, individual categories uncheck "All"
  - Added dropdown toggle with arrow rotation and click-outside-to-close functionality
  - Fixed project counting to show accurate number of linked projects for each technology
  - Enhanced tooltips to display project names and count with better formatting
  - Made skill pills clickable on mobile to show tooltips (group-active/tech class)
  - Added JavaScript filtering functionality with proper TypeScript typing
  - Improved tooltip content with project list and "and X more" indicator
- Enhanced WorkExperienceItem.astro mobile layout
  - Reduced gap between date and description on mobile (added mb-2 md:mb-0 to time element)
  - Made text wider on mobile screens (max-sm:col-span-full max-sm:w-full)
  - Improved text sizing on mobile (max-sm:text-sm for processed content)
  - Better responsive design for mobile work experience timeline

## 2025-01-16 17:40 [main] - Enhanced work experience timeline with client logo support
- Updated WorkExperienceTimeline.astro to support client logos in addition to company logos
  - Added clients collection import alongside companies collection
  - Modified logo lookup logic to first check companies, then fallback to clients
  - Work experience timeline now displays logos from both companies and clients
  - Maintains existing functionality while adding client logo support
- Updated work-experience.astro page to support client logos in addition to company logos
  - Added clients collection import alongside companies collection
  - Applied same logo lookup logic as WorkExperienceTimeline component
  - Both main timeline and voluntary roles section now support client logos
  - Ensures consistent client logo support across all work experience views
- Enhanced logo retrieval system for linkedCompany values in work experience
  - linkedCompany can now reference either companies or clients
  - System first checks companies collection, then falls back to clients collection
  - Maintains backward compatibility with existing company-only references
  - Improves flexibility for roles linked to clients

## 2025-01-16 17:35 [main] - Implemented voluntary roles filtering and separate section
- Updated WorkExperienceTimeline.astro to filter out roles with "voluntary" tag
  - Added filtering logic to exclude roles containing "voluntary" in tags array
  - Maintains existing sorting and display functionality for non-voluntary roles
  - Ensures only professional work experience appears on main portfolio page
- Enhanced work-experience.astro page with voluntary roles section
  - Filtered main timeline to exclude voluntary roles for cleaner professional experience
  - Added separate "Voluntary Roles" section below main timeline with distinct styling
  - Created jump button in header to navigate directly to voluntary roles section
  - Added border separator and different icon (people) for voluntary section
  - Voluntary roles maintain same timeline format and company integration
  - Section only appears if voluntary roles exist in the collection
- Installed Jest testing framework with TypeScript support
  - Added jest, @types/jest, ts-jest, and @testing-library/jest-dom as dev dependencies
  - Created jest.config.mjs with ES module support and TypeScript configuration
  - Set up test environment for Node.js with proper file matching patterns
- Created comprehensive unit tests for utility functions
  - Added tests for date-formatter.ts with 38 test cases covering all scenarios
  - Added tests for languages.ts with language lookup and fallback functionality
  - Added tests for content-processor.ts with Obsidian link and markdown processing
  - All tests pass successfully with 100% coverage of tested functions
- Integrated tests into build process
  - Modified package.json build script to run tests before build: "npm run test && npm run update-readme-links && astro build"
  - Added test scripts: test, test:watch, and test:coverage
  - Tests now run automatically before every build to ensure code quality
- Set up test infrastructure and configuration
  - Created src/__tests__/jest.setup.ts for global test configuration
  - Configured Jest to handle ES modules and TypeScript properly
  - Added test coverage reporting with HTML, text, and lcov formats
  - Set up proper test file organization with __tests__ directories

## 2025-01-16 18:30 [main] - Added comprehensive GitHub statistics with new metrics
- Enhanced GitHubContributions.tsx with additional GitHub metrics
  - Added "Active Since" card showing account age in years/months
  - Added "Top Repo Stars" card linking to most starred repository
  - Added "Contributions (1Y)" card showing estimated yearly contributions
  - Added "Avg Commits/Day" card showing daily commit average
  - Updated GitHubStats interface to include accountAge, mostStarredRepo, contributionsLastYear, and averageCommitsPerDay
  - Enhanced data fetching to sort repositories by stars and calculate account age
  - Expanded stats grid to 8 cards (2x4 layout) to accommodate new metrics
  - Made most starred repo card clickable to link directly to the repository
  - Maintained consistent styling and hover effects across all stat cards

## 2025-01-16 18:25 [main] - Enhanced GitHub stats cards with links and reduced height
- Updated GitHubContributions.tsx stats cards for better UX
  - Reduced card height by changing padding from p-3 to p-2
  - Decreased font size from text-2xl to text-xl for more compact display
  - Reduced gap between cards from gap-4 to gap-3 for tighter layout
  - Converted all stat cards to clickable links to GitHub profile sections
  - Added specific tab parameters: stars, repositories, followers, following
  - Implemented hover effects (hover:bg-white/20) for better interactivity
  - Added cursor-pointer and transition-colors for smooth interactions
  - Maintained accessibility with proper target="_blank" and rel attributes

## 2025-01-16 18:20 [main] - Increased GitHub Contributions and Skills section heights
- Enhanced CodingSection.astro layout for better visual balance
  - Increased GitHub Contributions section to span 2 rows (md:row-span-2)
  - Matched Skills section height by ensuring both sections have equal vertical space
  - Adjusted Most Common Techs section to row-start-3 to accommodate new layout
  - Updated grid from md:grid-rows-2 to md:grid-rows-3 for proper spacing
  - Improved overall section proportions and visual hierarchy

## 2025-01-16 18:15 [main] - Cleaned up CustomerAndClientCarousel styling and schema
- Removed unused info button styles from CustomerAndClientCarousel.astro
  - Eliminated .info-button CSS styles that were no longer needed
  - Removed references to non-existent clientDescription and keyAchievement properties
  - Fixed TypeScript errors by aligning with actual clients collection schema
  - Maintained clean card display without info button functionality
  - Improved code maintainability by removing dead code

## 2025-01-16 18:10 [main] - Simplified References carousel arrow styling
- Updated ReferencesCarouselComponent.tsx to remove duplicate arrow styling
  - Removed Flicking Arrow plugin to eliminate orange styled arrows
  - Kept custom white styled arrows with circular transparent background
  - Maintained pagination and autoplay functionality
  - Cleaned up imports by removing unused Arrow plugin import
  - Improved visual consistency with single arrow style

## 2025-01-16 18:05 [main] - Implemented portfolioOrder sorting for References carousel
- Enhanced References carousel with custom ordering functionality
  - Added portfolioOrder property to referencesCollection schema in config.ts
  - Updated ReferencesCarousel.astro to sort by portfolioOrder first, then alphabetically
  - References without portfolioOrder fall back to alphabetical sorting
  - Lower portfolioOrder values appear first in the carousel
  - Maintained backward compatibility for existing references without portfolioOrder

## 2025-01-16 18:00 [main] - Added background hover effects to References carousel contact fields
- Enhanced ReferencesCarouselComponent.tsx with background hover effects
  - Added white background (bg-white/20) on hover for email and phone text
  - Matches the copy-to-clipboard icon's hover background effect
  - Added padding (px-1 py-1) and rounded corners for better visual definition
  - Changed transition from transition-colors to transition-all for smooth background animation
  - Created consistent visual feedback across all interactive contact elements

## 2025-01-16 17:55 [main] - Enhanced hover effects for References carousel contact fields
- Updated ReferencesCarouselComponent.tsx with improved hover interactions
  - Added hover highlighting to email and phone text fields
  - Text now transitions from text-white/90 to text-white on hover
  - Matches the visual feedback of the copy-to-clipboard icons
  - Added smooth transition-colors duration-200 for consistent animation
  - Enhanced user experience with clear visual feedback for interactive elements

## 2025-01-16 17:50 [main] - Fixed email truncation in References carousel
- Updated ReferencesCarouselComponent.tsx to resolve email display issues
  - Increased max-width from max-w-32 to max-w-40 for email and phone text fields
  - Resolved truncation of longer email addresses like "tauchecorne@opus2.com"
  - Maintained truncate functionality for extremely long contact information
  - Ensured consistent width across both email and phone fields

## 2025-01-16 17:45 [main] - Repositioned copy icons in References carousel
- Updated ReferencesCarouselComponent.tsx copy icon positioning
  - Moved copy-to-clipboard icons to the left side of email and phone text
  - Maintained right-aligned layout for contact information
  - Preserved hover functionality and visual feedback for copy actions
  - Improved visual flow with icons appearing before text content

## 2025-01-16 17:40 [main] - Refined References carousel display and navigation updates
- Updated ReferencesCarouselComponent.tsx for cleaner contact display
  - Removed "Email:", "Phone:", and "Address:" labels from reference cards
  - Right-aligned all contact information fields (email, phone, address)
  - Simplified Flicking component props to resolve TypeScript errors
  - Maintained copy-to-clipboard functionality for email and phone
  - Improved visual hierarchy with cleaner, more minimal design

## 2025-01-16 17:35 [main] - Updated header navigation with complete section list
- Enhanced Navigation.astro with comprehensive section coverage
  - Added "Clients" navigation linking to /site/#customers-and-clients
  - Added "Education" navigation linking to /site/#education  
  - Added "References" navigation linking to /site/#references
  - Updated menu structure to include all 8 sections: Home, Projects, Coding, Experience, Clients, Education, References, About Me
- Updated Header.astro to include all navigation items
  - Modified navItems array to include all requested sections
  - Ensures both desktop and mobile navigation show complete menu
  - Maintains existing functionality for active route detection

## 2025-01-16 17:30 [main] - Enhanced Work Experience, Education, and References sections
- Updated WorkExperienceItem.astro to display "Present" for ongoing roles
  - Modified date formatting logic to show "MMM YYYY - Present" when dateStart exists but no dateEnd
  - Improved date range handling for better user experience
- Removed fade out effect from WorkExperienceTimeline.astro
  - Eliminated gradient overlay that was hiding content at the bottom
  - Simplified "See more items" button layout for cleaner appearance
- Replaced References timeline with Flicking carousel component
  - Created new ReferencesCarouselComponent.tsx with square card design
  - Implemented Flicking carousel with pagination and arrow navigation
  - Added copy-to-clipboard functionality for email and phone numbers
  - Designed square cards (256x256px) with company logo backgrounds
  - Added hover effects and visual feedback for copy actions
  - Included AutoPlay plugin with 5-second intervals and hover pause
  - Enhanced accessibility with proper ARIA labels and keyboard navigation

## 2025-01-16 17:25 [main] - Filtered hosting and security skills from Most Common Techs
- Updated MostCommonTechs.astro to exclude hosting and security technologies
  - Added skills collection import to access skill tags
  - Created excludedSkillNames set containing skills with "hosting" or "security" tags
  - Modified technology counting logic to skip excluded skills
  - Improved filtering to focus on core development technologies
  - Enhanced component to show more relevant tech stack information

## 2025-01-16 17:20 [main] - Enhanced GitHub contributions component with profile link and stats
- Enhanced GitHubContributions.tsx component with comprehensive GitHub integration
  - Added hyperlink over entire contributions graph area for better UX
  - Integrated GitHub API to fetch user statistics (stars, repositories, followers, following)
  - Added error handling and loading states for API calls
  - Implemented fallback display when GitHub calendar component is unavailable
  - Added debug styles to ensure calendar visibility on desktop
  - Enhanced styling with hover effects and proper color theming
  - Added "View Profile" link in header with external link icon
  - Created stats grid showing GitHub metrics below contributions calendar
  - Improved accessibility with proper ARIA labels and keyboard navigation

## 2025-01-16 17:15 [main] - Limited education timeline and fixed content parsing
- Limited education timeline to display only 2 items instead of 3
  - Updated displayedEducation slice from 0,3 to 0,2 in EducationTimeline.astro
  - Removed hasMoreItems variable and related fade out functionality
  - Eliminated fade effect overlay and "See more items" button
  - Simplified timeline component structure for cleaner appearance
- Fixed additionalDetails content parsing in content-processor.ts
  - Added newline to <br> tag conversion for proper HTML rendering
  - Fixed issue where newlines in additionalDetails were not being rendered as line breaks
  - Improved content display for education timeline items with multi-line descriptions
  - Enhanced readability of education details with proper HTML formatting
- Re-added "See more items" button for education timeline
  - Restored hasMoreItems variable to check if more than 2 education items exist
  - Added "See more items" button that appears when there are additional education entries
  - Button links to /education page for full education timeline view
  - Removed fade effect overlay for cleaner appearance
- Added logic to hide "n/a" content in education timeline
  - Added shouldShowQualifications and shouldShowAdditionalDetails checks in EducationTimelineItem.astro
  - Sections with "n/a" content (case-insensitive) are now hidden from display
  - Improved content filtering to prevent empty or placeholder content from showing
  - Enhanced user experience by only showing meaningful education information
- Updated skills bubble chart tooltip to use skill ID instead of skill name
  - Modified bubble data creation to use skill.id.replace(/\.md$/, '') for tooltip display
  - Tooltips now show the skill filename (minus .md extension) instead of skill name
  - Improved consistency by using the actual skill identifier in tooltips
  - Maintains existing functionality while changing only the displayed name

## 2025-01-16 17:00 [main] - Created interactive bubble chart for skills display
- Created new SkillsBubbleChart.tsx Preact component for interactive skills visualization
  - Bubbles sized based on skillRating value (20-60px radius range)
  - Color-coded bubbles based on skill tags (framework, language, tool, database, cloud, design)
  - Background images use skill logos from /icons/ directory
  - Hover and click interactions for tooltips with skill details
  - Mobile touch support for bubble interactions
  - Dropdown filter to show skills by tag category
  - Tooltips display skill name, rating, project count, and description
  - Legend showing color coding for different skill types
- Updated SkillsBubbles.astro to use new bubble chart component
  - Replaced grid layout with interactive bubble chart
  - Added projects collection import for skill-project relationship counting
  - Passes sorted skills and projects to SkillsBubbleChart component
  - Uses client:only="preact" directive for interactive Preact component
- Updated content config to include tags field in skills schema
  - Added tags array field to skillsCollection schema in config.ts
  - Enables filtering and color coding based on skill tags
- Fixed React hooks error by switching to Preact hooks
  - Changed import from 'react' to 'preact/hooks' for useState, useMemo, useRef
  - Updated client directive to use Preact instead of React
  - Resolves "Invalid hook call" error by using correct framework
- Enhanced bubble chart layout and configuration
  - Improved force-directed layout algorithm for better bubble positioning
  - Bubbles now group together in the center of the container
  - Removed background gradient for cleaner appearance
  - Fixed logo display with proper background blend mode (multiply)
  - Added SKILLS_FILTER_OPTIONS configuration to repoConfig.js
  - Filter dropdown now uses predefined options from configuration
  - Dynamic scaling of bubbles based on container space
  - Better collision detection and spacing between bubbles
- Replaced custom bubble chart with professional D3.js implementation
  - Installed D3.js library for advanced data visualization
  - Implemented force-directed bubble chart with physics simulation
  - Dynamic bubble sizing based on skill rating and project count
  - Smooth animations and transitions with D3's transition system
  - Professional zoom and pan functionality with D3.zoom
  - Drag behavior for individual bubbles with force simulation
  - Enhanced visual design with drop shadows and proper styling
  - Improved tooltip system with detailed skill information
  - Better performance with optimized D3 rendering
  - Responsive design that adapts to container size changes
- Fixed logo display in D3.js bubble chart
  - Updated logo loading to use correct path from src/icons folder
  - Added proper icon name resolution using getSkillIconName utility
  - Improved logo positioning and sizing within bubbles
  - Enhanced visual integration with mix-blend-mode multiply
  - Better opacity and layering for logo visibility
- Improved skills bubble chart layout and styling
  - Removed instructions text for cleaner appearance
  - Moved filter dropdown to align with Skills section heading
  - Removed chart background to maximize width within parent card
  - Eliminated padding and margins to use full available space
  - Simplified component structure for better integration
  - Enhanced visual hierarchy with dropdown positioned next to heading
- Fixed D3.js chart flashing issue in development mode
  - Added proper simulation cleanup with useRef to prevent memory leaks
  - Optimized useEffect dependencies to only re-render when bubbleData changes
  - Added useCallback for helper functions to prevent unnecessary re-renders
  - Improved simulation lifecycle management with proper stop/restart logic
  - Enhanced performance by reducing unnecessary chart re-renders
  - Fixed development mode flashing by preventing constant chart recreation
- Added fullscreen modal functionality for skills bubble chart
  - Added fullscreen button next to filter dropdown in Skills section
  - Created modal overlay with 95% screen coverage and blackout background
  - Implemented modal with dropdown filter and close button
  - Added keyboard support (Escape key) and click-outside-to-close functionality
  - Enhanced mobile experience with responsive modal sizing
  - Fixed SVG logo loading by using canvas-generated fallback images
  - Improved TypeScript compatibility with proper event handling
- Added interactive tooltips to skills bubble chart
  - Implemented hover tooltips for desktop with skill name, description, and rating
  - Added click/touch tooltips for mobile devices with touchstart event handling
  - Created floating tooltip with arrow pointer positioned near cursor/touch point
  - Added click-outside-to-close functionality for tooltip dismissal
  - Enhanced tooltip styling with dark mode support and responsive design
  - Improved accessibility with proper z-index layering and pointer events
  - Maintained existing detailed tooltip for selected skills below chart
- Bubble chart features:
  - Fluid layout with collision detection for bubble positioning
  - Responsive design that adapts to container size
  - Smooth animations and transitions for interactions
  - Dark mode support with appropriate color schemes
  - Project count calculation by matching skill names in project technologies
## 2025-01-16 16:40 [main] - Fixed section extraction not working for projects
- Fixed getContentType function in sync.js to return folder names directly
  - Previous function returned singular content types (e.g., 'project') but CONTENT_TYPE_MAPPINGS uses plural keys (e.g., 'projects')
  - This caused extractSectionsToFrontmatter to fail because it couldn't find the mapping
  - Now returns folder names directly to match CONTENT_TYPE_MAPPINGS keys
- Section extraction now works properly for all content types
  - shortDescription, longDescription, and lessonsLearned will be extracted from project markdown files
  - companyDescription and keyAchievement will be extracted from company files
  - roleDescription and keyAchievement will be extracted from role files
  - All extracted sections will be added to frontmatter automatically during sync

## 2025-01-16 16:35 [main] - Fixed content collection schema validation error
- Fixed missing shortDescription field in Backend Server.md project file
  - Added shortDescription to frontmatter to match projects collection schema
  - Schema requires shortDescription field but it was missing from the project file
  - Added value: "The backend server and source of data for several of my projects, allowing a singular point of management and maintenance."
- Resolved InvalidContentEntryDataError for projects collection
  - Content validation now passes for all project files
  - Schema validation ensures all required fields are present in project frontmatter
## 2025-01-16 15:50 [main] - Renamed config files for better clarity and Astro compatibility
- Renamed src/content/typeConfig.ts back to src/content/config.ts for Astro compatibility
  - Astro expects content configuration to be named config.ts by default
  - This fixes the "staticData collection does not exist" build error
- Renamed scripts/config.js to scripts/repoConfig.js to avoid naming conflicts
  - Updated all import statements in scripts to use repoConfig.js
  - Updated sync.js, update-readme-links.js, and watch-obsidian.js imports
  - Updated protected items list to reference config.ts instead of typeConfig.ts
- Updated README.md to reflect new file naming
  - Updated links to point to config.ts for content configuration
  - Updated links to point to repoConfig.js for script configuration
- Clear separation between Astro content config (config.ts) and script config (repoConfig.js)
- Build error resolved - Astro can now find the content configuration file

## 2025-01-16 15:45 [main] - Renamed config.ts to typeConfig.ts for better clarity
- Renamed src/content/config.ts to src/content/typeConfig.ts to better distinguish from scripts/config.js
- Updated all references to the renamed file:
  - Updated README.md links to point to typeConfig.ts
  - Updated project structure documentation to reference typeConfig.ts
  - Updated sync.js protected items list to include typeConfig.ts instead of config.ts
- The file contains Zod schemas for content validation and collection definitions
- This change improves clarity by distinguishing between script configuration (config.js) and content type configuration (typeConfig.ts)

## 2025-01-16 15:40 [main] - Made config the master file for section definitions
- Expanded CONTENT_TYPE_MAPPINGS in scripts/config.js to include complete section definitions
  - Added section name and property mappings for all content types
  - Each content type now has detailed section configuration with name and property pairs
  - Added support for projects, companies, clients, roles, and educations content types
- Updated extractSectionsToFrontmatter function in sync.js to use config as master
  - Removed hardcoded section definitions from the function
  - Function now reads section definitions from CONTENT_TYPE_MAPPINGS config
  - Added proper error handling for content types not defined in config
  - Simplified logic by removing content type filtering (now handled by config structure)
- Config is now the single source of truth for all section extraction rules
- All section definitions can be modified in one place without touching sync.js

## 2025-01-16 15:35 [main] - Centralized spacing configuration across all scripts
- Created scripts/config.js to centralize spacing levels and configuration constants
  - Added SPACING_LEVEL_1, SPACING_LEVEL_2, SPACING_LEVEL_3 for consistent console log spacing
  - Added DEFAULT_PORTFOLIO_TAG, DEFAULT_DEBUG_MODE, and other configuration constants
  - Added PROTECTED_PATTERNS array for file protection logic
  - Added CONTENT_TYPE_MAPPINGS for content type definitions
  - Added file path constants (ASTRO_CONTENT_PATH, SCRIPTS_PATH)
- Updated sync.js to use centralized configuration
  - Imported spacing levels and configuration constants from config.js
  - Updated portfolio tag reference to use DEFAULT_PORTFOLIO_TAG
  - Updated protected items to include PROTECTED_PATTERNS
  - Updated debug mode to use DEFAULT_DEBUG_MODE fallback
- Updated update-readme-links.js to use centralized configuration
  - Imported SCRIPTS_PATH and SPACING_LEVEL_1 from config.js
  - Added proper spacing to all console.log statements
- Updated watch-obsidian.js to use centralized configuration
  - Imported SPACING_LEVEL_1 and SPACING_LEVEL_2 from config.js
  - Added proper spacing to all console.log statements
- All scripts now use consistent spacing and configuration management

## 2025-01-16 15:30 [main] - Simplified README link update system and integrated with build process
- Streamlined README link update system to use only manual updates
  - Removed git hooks and file watcher scripts (setup-git-hooks.js, watch-sync-links.js)
  - Removed setup-hooks and watch-links npm scripts
  - Integrated update-readme-links script into build process (runs before astro build)
  - Updated README to reflect simplified approach and build integration
  - Updated Auto-Link Updates feature description to mention build process
  - Added note about automatic updates during build in "How It Works" section

## 2025-01-16 15:20 [main] - Added function links to sync.js in README
- Added direct links to specific functions in sync.js file in README.md
  - Added link to [processMarkdownFile()](./scripts/sync.js#L347) function in "How It Works" section
  - Added link to [processObsidianLinksInContentOnly()](./scripts/sync.js#L683) function for internal link processing
  - Added link to [extractSectionsToFrontmatter()](./scripts/sync.js#L99) function for section extraction
  - All links point to specific line numbers in the sync.js file for easy navigation

## 2025-01-16 15:15 [main] - Added package.json link to README
- Added direct link to package.json file in README.md
  - Added link to [`package.json`](./package.json) in "How It Works" section for npm scripts reference

## 2025-01-16 15:10 [main] - Added Zod links to README
- Added direct links to Zod in README.md
  - Added link to [Zod](https://zod.dev) in features section for content collections
  - Added link to [Zod](https://zod.dev) in sync system key features for schema validation
  - Added link to [Zod](https://zod.dev) in project structure for config.ts description
  - Added link to [Zod](https://zod.dev) in markdown processing section for frontmatter validation
  - Added link to [Zod](https://zod.dev) in tech stack section for content validation

## 2025-01-16 15:05 [main] - Added Netlify links to README
- Added direct links to Netlify in README.md
  - Added link to [Netlify](https://netlify.com) in deployment section
  - Added link to [Netlify dashboard](https://app.netlify.com) in environment variables section
  - Added link to [Netlify](https://netlify.com) in tech stack deployment section

## 2025-01-16 15:00 [main] - Corrected README tech stack information
- Fixed incorrect Prism.js references in README.md
  - Removed Prism.js from tech stack as it's not actually used in the project
  - Updated to correctly reference Shiki (Astro's default syntax highlighter)
  - Corrected code highlighting description in markdown processing section
- Verified Zod is actively used in src/content/typeConfig.ts for content validation
  - Confirmed Zod schemas are properly implemented for all content collections
  - No changes needed for Zod references as they are accurate
## 2025-01-16 14:40 [develop] - Enhanced date formatting for Work Experience timeline
- Updated WorkExperienceItem component with proper date formatting
  - Added formatDate function to convert dates to "MMM YYYY" format
  - Displays date range as "MMM YYYY - MMM YYYY" (e.g., "Jul 2022 - Jan 2025")
  - Handles both dateStart and dateEnd with proper fallbacks
  - Uses toLocaleDateString with 'en-US' locale for consistent formatting
  - Added date range debugging to console logs
- Consistent date formatting across all work experience displays
  - WorkExperienceTimeline component automatically uses updated formatting
  - Work experience page automatically uses updated formatting
  - All work experience entries now show clean, readable date ranges

## 2025-01-16 14:35 [develop] - Centralized content processing and enhanced Obsidian link styling
- Created centralized processContent function for consistent markdown processing
  - Single function handles all Obsidian links, markdown links, and content transformations
  - Replaces processMarkdownContent with more robust processContent function
  - Added proper TypeScript typing for undefined/null content
  - Enhanced markdown links with target="_blank" and rel="noopener noreferrer"
- Enhanced CSS styling for mint-link class with differentiated link types
  - Obsidian links (strong tags): bold, mint-green, no underline
  - Markdown links (anchor tags): bold, mint-green, with underline
  - Added specific .processed-content .mint-link rules for higher specificity
  - Ensures mint-link styling works consistently across all processed content
  - Added dark mode support for processed content mint links
- Updated WorkExperienceItem component to use centralized processing
  - Replaced processMarkdownContent with processContent function
  - Added comprehensive debugging logs to track content processing
  - Improved error handling for undefined/null content values
- Fixed Obsidian link processing in extracted content sections
  - Updated section extraction in sync.js to preserve Obsidian links
  - Removed Obsidian link stripping from extractSectionContent function
  - Obsidian links like [[Next.js]], [[Python]] are now preserved in extracted content
  - Allows content processor to properly convert Obsidian links to bold mint-green styling
  - Maintains markdown link conversion to HTML while preserving Obsidian syntax
- Updated section extraction in sync.js to preserve Obsidian links
  - Removed Obsidian link stripping from extractSectionContent function
  - Obsidian links like [[Next.js]], [[Python]] are now preserved in extracted content
  - Allows content processor to properly convert Obsidian links to bold mint-green styling
  - Maintains markdown link conversion to HTML while preserving Obsidian syntax
- Fixed Digital Engineering Specialist role description processing
  - Obsidian links in roleDescription now convert to bold mint-green text
  - Example: "built using [[Next.js]], [[Nest.js]], a [[Neo4j]] database" now renders as bold mint-green
  - All extracted content sections (roleDescription, keyAchievement, etc.) now preserve Obsidian links
  - Content processor handles conversion to proper HTML with mint-link styling
- Updated remaining components to use content processor consistently
  - Updated ReferencesCarousel.astro to use processObsidianLink function
  - Updated ProjectsGallery.astro to use processObsidianLink function
  - All components now use centralized content processor for Obsidian link handling
  - Ensures consistent processing and styling across the entire site

## 2025-01-16 14:25 [develop] - Enhanced Obsidian link processing to use content processor consistently
- Updated projects index page to use processObsidianLink function
  - Replaced manual bracket removal with processObsidianLink from content processor
  - Ensures consistent Obsidian link processing across all components
  - Maintains proper styling for processed links
- Updated project slug page to use processObsidianLink function
  - Replaced manual bracket removal with processObsidianLink from content processor
  - Ensures consistent link processing for company and client lookups
  - Maintains proper styling for processed links
- Updated ProjectCard component to use processObsidianLink function
  - Replaced manual bracket removal with processObsidianLink from content processor
  - Ensures consistent Obsidian link processing in project cards
  - Fixed TypeScript linter errors by adding proper type annotations for event handlers
- Improved consistency in Obsidian link processing across the site
  - All components now use the centralized content processor
  - Obsidian links are properly converted and styled with mint-green theme color
  - Maintains bold styling for Obsidian links as requested
  - Ensures proper hover effects and dark mode support

## 2025-01-16 16:25 [develop] - Fixed skill icon lookup to use logoFileName from skills collection
- Fixed SkillPill component to properly use skill logoFileName
  - Updated findIconForSkill function to look up skills in the skills collection
  - Now uses skill.data.logoFileName instead of trying to match skill names to icon names
  - Resolves "cannot find an icon named 'next.js'" error by using proper logoFileName lookup
- Enhanced skill icon lookup logic
  - First tries skill mapping (from sync process)
  - Then looks up skill in skills collection and uses logoFileName from frontmatter
  - Falls back to direct icon name matching for non-skill technologies
  - Properly handles async operations with skills collection
- Improved error handling and fallbacks
  - Added try-catch for skills collection access
  - Maintains backward compatibility with existing icon lookup methods
- Added helpful error messages for missing skill files
  - When a skill is referenced in projects but missing from skills collection, logs clear error message
  - Shows exact file path that needs to be created: src/content/skills/{skillName}.md
  - Explains that the skill file should include a 'logoFileName' property in frontmatter
  - Helps developers quickly identify and fix missing skill files
- Simplified skill icon lookup by removing dependency on skillIconMapping
  - Removed getSkillIconByName function dependency from SkillPill component
  - Now directly looks up skills in the skills collection for real-time accuracy
  - Eliminates "skillIconMapping is not defined" error by removing unnecessary mapping layer
  - Maintains all error handling and fallback logic for missing skills

## 2025-01-16 16:30 [develop] - Enhanced project pages with improved layout and filtering
- Updated project slug page layout and functionality
  - Centered "Back to Projects" buttons horizontally for better visual balance
  - Added project name display below the image and above technology pills
  - Added date range display in "MMM YYYY - MMM YYYY" format when both dateStart and dateEnd are available
  - Added clickable project category link that navigates to projects page with pre-filled filter
  - Modified "Developed For" section to only show when linkedCompany is populated
  - Improved visual hierarchy with proper spacing between elements
- Enhanced projects gallery page with advanced filtering and responsive layout
  - Centered "Back to Projects" button horizontally for consistency
  - Replaced date range slider with two date input boxes for better usability
  - Date inputs start blank to show all projects by default
  - Implemented responsive filter layout: desktop shows all filters in one row, mobile stacks vertically
  - Added separate mobile filter elements with proper event handling for both layouts
  - Implemented URL parameter support for pre-filling category filter (e.g., ?category=Web%20Development)
  - Enhanced filter logic to combine category and date range filtering
  - Added real-time project count updates for both desktop and mobile layouts
  - Improved filter UI layout with better organization and spacing
  - Fixed issue where projects weren't showing due to restrictive initial date filter values
- Fixed project page content display issues
  - Fixed sync script error by adding missing DEFAULT_DEBUG_MODE import
  - Manually added missing longDescription and lessonsLearned fields to Spreadsheet of Life project
  - Manually added missing shortDescription, longDescription and lessonsLearned fields to Travel Website project
  - Ensured project pages display description and lessons learned sections properly
  - Verified that "Developed For" section only shows when linkedCompany is populated
  - Added automatic name generation from filename for projects without explicit name field
  - Updated date range display to show "Present" when dateEnd is empty
  - Added "Category:" label in front of project category button for better clarity
  - Enhanced "Developed For" section logic to only show when valid companies/clients are found
  - Added icons to "Visit Site" and "View Code" buttons for better visual appeal
  - Changed "Project Links" from header to inline text label for better layout flow
  - Added missing shortDescription, longDescription, and lessonsLearned frontmatter properties to Spreadsheet of Life project (properties already defined in config.ts and displayed in components)
- Fixed "Unable to locate 'google' icon" error
  - Removed invalid "[[Google]]" reference from Spreadsheet of Life project technologies
  - The error was caused by referencing a non-existent "Google" skill file
  - Updated to use only valid skill references: "[[Google Sheets]]" and "[[Google Apps Script]]"
  - Available Google-related skills are: Google Cloud, Google Sheets, Google Apps Script
- Enhanced SkillPill component to handle Obsidian pipe aliases
  - Updated cleanSkillName function to parse Obsidian links with pipe symbols (e.g., "[[path/to/file|Display Name]]")
  - Extracts the filename from the path (before the pipe) for skill lookup
  - Uses the display name (after the pipe) for the pill text
  - Handles cases like "[[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java]]" correctly
  - Maintains compatibility with standard Obsidian links without pipes
  - Reverted project file changes since the component now handles these links natively
  - Graceful degradation when skills collection is not available

## 2025-01-16 16:20 [develop] - Implemented proper skill icon mapping system using sync process
- Removed hardcoded skill mappings from SkillPill component
  - Removed hardcoded skill mappings that were causing maintenance issues
  - SkillPill component now uses proper skill name to icon lookup system
- Enhanced sync process to create skill icon mapping
  - Added createSkillIconMapping function to sync.js
  - Function reads skill files and extracts name and logoFileName from frontmatter
  - Creates mapping between skill names and their corresponding icon names
  - Auto-generates skillIconMapping in icon-utils.ts during sync process
- Updated icon-utils.ts with skill mapping system
  - Added skillIconMapping object to store skill name to icon mappings
  - Added getSkillIconByName function to lookup icons by skill name
  - Maintains backward compatibility with existing icon functions
- Updated SkillPill component to use new mapping system
  - Now uses getSkillIconByName as primary lookup method
  - Falls back to direct icon name lookup for non-mapped skills
  - Resolves "Neo4j Aura" icon error by using proper mapping from skill frontmatter
- Improved maintainability and consistency
  - Skill icons are now managed through skill frontmatter logoFileName field
  - Sync process automatically updates mappings when skills change
  - No more hardcoded mappings in components

## 2025-01-16 16:15 [develop] - Fixed Neo4j Aura icon mapping and enhanced skill pill functionality
- Fixed Neo4j Aura icon display issue
  - Added "Neo4j Aura" mapping to neo4j_cypher icon in SkillPill component
  - Added "Neo4j" mapping to neo4j icon for consistency
  - Added "Cypher" mapping to neo4j_cypher icon for related technologies
  - Resolved "Unable to locate neo4j aura icon" error
- Enhanced skill pill icon mappings
  - Updated skill mappings to include database and graph technologies
  - Ensured all Neo4j-related technologies display proper icons
  - Maintained consistency with existing icon naming conventions

## 2025-01-16 16:10 [develop] - Enhanced mobile project card interaction and fixed skill pill icons
- Implemented mobile card selection functionality for projects gallery
  - Added touch-based card selection that stays bright until user clicks off
  - Cards show visual feedback with scale, glow, and border when selected
  - Added "See more detail..." link that appears at bottom of selected cards
  - Link directs users to the project slug with smooth animation
  - Only one card can be selected at a time with proper deselection logic
- Fixed skill pill icon filtering and question mark issues
  - Removed shouldShowIcon filtering to ensure all icons display properly
  - Updated SkillPill, SkillsBubbles, and SkillItem components to remove filtering
  - Icons now display as bold and vivid without any filtering restrictions
  - Fixed question mark fallback to only show when no icon name is available
  - Maintained proper icon mapping for common technology names
- Enhanced mobile user experience
  - Added smooth animations for card selection and detail link appearance
  - Implemented proper touch event handling with preventDefault
  - Added click-outside functionality to deselect cards
  - Improved visual feedback with mint-green glow and border effects

## 2025-01-16 16:05 [develop] - Fixed theme toggle not changing background due to overlay elements
- Fixed theme toggle background change issue
  - Identified that fixed positioned overlay elements were covering the background
  - Converted inline gradient styles to CSS classes for theme awareness
  - Added bg-gradient-light and bg-gradient-dark classes for proper theme switching
  - Background color now properly changes when theme toggle is clicked
- Enhanced overlay element theme responsiveness
  - Gradient overlay now responds to theme changes
  - Blur circle already had proper theme-aware styling
  - All background elements now properly switch between light and dark modes

## 2025-01-16 16:00 [develop] - Fixed background color toggle and improved light mode appearance
- Fixed background color toggle functionality
  - Changed light mode background from bg-theme-50/5 to bg-gray-50 for cleaner near-white appearance
  - Dark mode background remains #0E0E11 as requested
  - Theme toggle now properly changes background color between light and dark modes
- Enhanced light mode visual appearance
  - Light mode now uses a clean gray-50 background instead of tinted mint green
  - Better contrast and readability in light mode
  - Maintains the same dark mode aesthetic

## 2025-01-16 15:55 [develop] - Fixed light/dark theme functionality and improved mobile navigation
- Enhanced theme detection and toggle functionality
  - Updated Layout.astro theme detection script to properly handle system preference vs user preference
  - Modified ThemeIcon.astro to only store user preference when toggle is clicked
  - Fixed theme detection to respect user's manual choice over system preference
  - Improved theme icon display to show correct alternative theme mode
- Fixed mobile navigation dropdown background
  - Added backdrop-filter blur and transparency to mobile dropdown
  - Updated dark mode background to use rgba with transparency
  - Improved visual consistency with header backdrop blur
- Fixed about me page text contrast in dark mode
  - Removed hardcoded "text-white" class from markdown content
  - Now uses proper dark mode text colors from global CSS
  - Improved readability and contrast in dark mode
- Enhanced theme system behavior
  - Initial page load now correctly matches user's device preference
  - Theme toggle properly overrides system preference when clicked
  - Mobile navigation now properly adapts to theme changes
  - About me page text now has proper contrast in both light and dark modes

## 2025-01-16 14:20 [develop] - Improved theme detection to prevent flash of incorrect theme
- Moved theme detection script to Layout.astro head section
  - Added theme detection script in head before page renders to prevent flash
  - Script runs immediately to detect user's system preference (dark/light mode)
  - Respects user's manual theme choice stored in localStorage
  - Applies appropriate theme class to document before content renders
- Updated ThemeIcon.astro to remove duplicate theme detection
  - Removed duplicate theme detection script from ThemeIcon component
  - Kept toggle functionality and system preference change listener
  - Maintains manual theme switching capability
  - Preserves system preference change detection when no manual choice is set
- Enhanced user experience with immediate theme application
  - Eliminates flash of incorrect theme on page load
  - Theme is applied before any content is rendered
  - Respects both system preference and user's manual choice
  - Provides seamless theme switching experience

## 2025-01-16 14:15 [develop] - Fixed pagination bullets and added click-to-snap functionality
- Fixed pagination bullet visibility and styling
  - Simplified Pagination plugin configuration to use default bullet rendering
  - Added proper pagination container for Flicking to populate with bullets
  - Updated CSS to target correct Flicking pagination classes (flicking-pagination-bullet)
  - Enhanced bullet styling with proper size, colors, and hover effects
- Added click-to-snap functionality for carousel items
  - Enhanced handleItemClick to snap carousel to clicked item using moveTo()
  - When user clicks on a carousel item, it now centers that item in the viewport
  - Maintains selection state while providing smooth navigation to selected item
  - Improves user experience by combining selection and navigation in single click
- Improved pagination visual feedback
  - Active bullet shows mint-400 color with scale(1.2) transform
  - Inactive bullets show gray color with hover effects
  - Smooth transitions for all state changes
  - Proper spacing and alignment for pagination container
- Enhanced carousel interaction and usability
  - Users can now click items to both select and navigate to them
  - Pagination bullets provide clear visual indication of current position
  - Maintains all existing functionality: auto-rotation, selection styling, hover effects
  - Better integration between selection, navigation, and pagination systems

## 2025-01-16 13:25 [develop] - Enhanced CustomerAndClientCarousel with continuous rotation and click-to-highlight
- Updated CustomerAndClientCarousel.tsx to ensure continuous rotation
  - Changed AutoPlay stopOnHover from true to false for uninterrupted rotation
  - Carousel now continues rotating even when user hovers over items
  - Maintains smooth 3-second interval between transitions
- Added click-to-highlight functionality for carousel items
  - Added selectedItem state to track which item is currently highlighted
  - Implemented handleItemClick function to toggle item selection
  - Added visual feedback with ring-4 ring-mint-400 and scale-105 for selected items
- Enhanced CompanyCard component with selection support
  - Added isSelected and onClick props to CompanyCard interface
  - Selected items display with mint-green ring border and slight scale effect
  - Maintains existing hover effects while adding selection state
- Implemented click-outside-to-deselect functionality
  - Added useEffect to handle clicks outside carousel items
  - Automatically deselects highlighted item when clicking elsewhere
  - Works on both desktop and mobile devices
- Improved user interaction and visual feedback
  - Clear visual indication of selected carousel items
  - Smooth transitions between selection states
  - Maintains accessibility with proper ARIA labels and keyboard support

## 2025-01-16 13:20 [develop] - Fixed case transformations and updated carousel width
- Updated CustomerAndClientCarousel.astro to use 90% viewport width
  - Changed from max-w-4xl to w-[90vw] for wider carousel display
  - Maintains responsive design while providing more space for content
- Fixed company and client name processing in CustomerAndClientCarousel
  - Updated company data to use company.id.replace('.md', '') for filename without extension
  - Updated client data to use client.data.name || client.id.replace('.md', '') as fallback
  - Removed case transformations to preserve original filename casing
- Updated CustomerAndClientCarousel.tsx to use name field instead of case transformations
  - Changed company name processing to use company.data.name || company.id.replace('.md', '')
  - Changed client name processing to use company.data.name || company.id.replace('.md', '')
  - Eliminates slug-based case transformations that were changing original casing
- Fixed case transformations across all portfolio components
  - Updated ReferencesCarousel.astro to use reference.id.replace('.md', '') instead of slug transformations
  - Updated WorkExperienceTimeline.astro to use role.id.replace('.md', '') for role names
  - Updated EducationTimeline.astro to use education.id.replace('.md', '') for education names
  - Updated SkillsBubbles.astro to use skill.id.replace('.md', '') for skill names
- Enhanced consistent naming approach throughout the site
  - All components now use filename (without extension) as display names
  - Preserves original Obsidian filename casing and formatting
  - Maintains fallback to explicit name field when available
  - Provides more accurate representation of content as stored in files

## 2025-01-16 13:15 [develop] - Added floating action button for scroll to top functionality
- Created ScrollToTop.astro component with floating action button (FAB)
  - Positioned at bottom-right corner (5% from right, 5% from bottom)
  - Uses main accent color (mint-400) with hover effects (mint-500)
  - Features up arrow icon and smooth hover animations (scale-110)
  - Includes proper accessibility attributes (aria-label, title)
- Implemented scroll-based visibility logic
  - FAB appears when user scrolls more than 10% down the page
  - Smooth fade-in/fade-out animation with 300ms duration
  - Uses opacity and pointer-events for proper show/hide behavior
  - Calculates scroll percentage based on viewport and document height
- Added smooth scroll to top functionality
  - Uses window.scrollTo with smooth behavior
  - Scrolls to top of current page when FAB is clicked
  - Includes proper event listeners and null checks for TypeScript
- Integrated FAB into main Layout.astro component
  - Added ScrollToTop component to all pages using the main layout
  - Positioned after Footer for proper z-index layering
  - Ensures FAB appears on all site pages consistently
- Enhanced user experience with modern UI patterns
  - Floating action button follows Material Design principles
  - Smooth animations and transitions for professional feel
  - Responsive design that works across all screen sizes
  - High z-index (50) ensures FAB stays above other content

## 2025-01-16 13:10 [develop] - Updated project card names to display filenames without case transformations
- Modified ProjectsGallery.astro to display project names as-is
  - Removed case transformation logic that converted slugs to title case
  - Now displays project.data.name if available, otherwise project.id without .md extension
  - Uses project.id instead of project.slug to preserve original filename casing
- Updated full projects page (index.astro) with same naming logic
  - Applied identical name display logic as ProjectsGallery component
  - Uses project.id.replace('.md', '') to get filename without extension
  - Ensures consistent project naming across all gallery views
- Updated individual project page ([slug].astro) for company/client names
  - Removed case transformations from company and client slug displays
  - Company names now display as slug without title case conversion
  - Client names display as data.name if available, otherwise slug as-is
  - Maintains consistent naming approach across all components
- Enhanced project name display consistency
  - All project cards now show filenames (without extension) as project titles
  - Preserves original casing and formatting from Obsidian filenames
  - Uses project.id instead of project.slug to maintain exact filename casing
  - Provides more accurate representation of project names as stored in files

## 2025-01-16 13:05 [develop] - Fixed project sorting logic for proper chronological ordering
- Fixed sorting algorithm in ProjectsGallery.astro and index.astro
  - Changed from string concatenation sorting to proper numerical/chronological sorting
  - Now sorts by portfolioOrder numerically first, then by dateStart chronologically
  - Projects with same portfolioOrder now properly sort by date (newest first)
  - Resolves issue where projects with same portfolioOrder weren't sorting by date correctly
- Improved sorting logic implementation
  - Primary sort: portfolioOrder (numerical comparison, lowest first)
  - Secondary sort: dateStart (chronological comparison, newest first)
  - Tertiary sort: alphabetical by slug for tie-breaking
  - Handles both Date objects and date strings properly
- Enhanced date handling in sorting
  - Converts date strings to timestamps for proper chronological comparison
  - Maintains backward compatibility with existing date formats
  - Ensures consistent sorting behavior across all project views

## 2025-01-16 13:00 [develop] - Added portfolioOrder property and enhanced project sorting
- Added portfolioOrder property to projects collection schema in config.ts
  - Added portfolioOrder: z.union([z.number(), z.null()]).optional() to projects schema
  - Allows projects to have a custom ordering number for portfolio display
  - Maintains backward compatibility with existing projects without portfolioOrder
- Updated ProjectsGallery.astro with new sorting logic
  - Changed from date-based sorting to portfolioOrder + dateStart sorting
  - Creates sort keys in format: "portfolioOrder-dateStart" for consistent ordering
  - Projects without portfolioOrder default to 999 for end-of-list placement
  - Falls back to alphabetical sorting by slug when sort keys are equal
- Updated full projects page (index.astro) with same sorting logic
  - Applied identical portfolioOrder + dateStart sorting algorithm
  - Ensures consistent project ordering across all gallery views
  - Maintains responsive design and filtering functionality
- Enhanced project display ordering system
  - Primary sort: portfolioOrder (lowest numbers first)
  - Secondary sort: dateStart (earliest dates first)
  - Tertiary sort: alphabetical by slug for tie-breaking
  - Provides flexible control over project presentation order

## 2025-01-16 12:55 [develop] - Enhanced individual project page with client display
- Updated project slug page ([slug].astro) to display both companies and clients
  - Added clients collection import alongside companies collection
  - Modified linked entity lookup to check both companies and clients collections
  - Changed section title from "Client" to "Developed For" for better clarity
  - Projects can now display both company and client information with logos
- Enhanced linked entity processing logic
  - Iterates through each linkedCompany value and checks both collections
  - Uses Obsidian link format stripping for consistent filename matching
  - Maintains separate arrays for companies and clients for proper display
  - Handles both company and client data structures appropriately
- Improved project page layout and information display
  - Combined companies and clients in single "Developed For" section
  - Uses CustomerAndClientCarouselItem component for consistent styling
  - Displays client names from data.name field or derived from slug
  - Shows client logos, dates, descriptions, and achievements
  - Maintains responsive grid layout for multiple entities

## 2025-01-16 12:50 [develop] - Enhanced project and reference components with client logo support
- Updated ProjectsGallery.astro to support client logos in addition to company logos
  - Added clients collection import alongside companies collection
  - Modified logo lookup logic to first check companies, then fallback to clients
  - Maintains existing functionality while adding client logo support
  - Projects can now display logos from both companies and clients
- Updated ReferencesCarousel.astro to support client logos in addition to company logos
  - Added clients collection import alongside companies collection
  - Modified logo lookup logic to first check companies, then fallback to clients
  - References can now display logos from both companies and clients
  - Maintains existing functionality while adding client logo support
- Updated full projects page (index.astro) to support client logos
  - Added clients collection import alongside companies collection
  - Applied same logo lookup logic as ProjectsGallery component
  - Ensures consistent client logo support across all project views
- Enhanced logo retrieval system for linkedCompany values
  - linkedCompany can now reference either companies or clients
  - System first checks companies collection, then falls back to clients collection
  - Maintains backward compatibility with existing company-only references
  - Improves flexibility for projects and references linked to clients

## 2025-01-16 12:45 [develop] - Updated ProjectCard hover tooltip styling
- Modified ProjectCard.astro to improve company name display in tooltip
  - Kept "Developed for: " prefix text styled to match card text (zinc-300)
  - Applied hover effect only to company name with bright theme color (mint-400)
  - Company name transitions to mint-300 on hover with cursor-help indicator
  - Maintains tooltip functionality while improving visual hierarchy

## 2025-01-16 12:40 [develop] - Enhanced ProjectsGallery with company logo display
- Modified ProjectsGallery.astro to collect companies collection and link company logos
  - Added companies collection import alongside projects collection
  - Created processedProjects array that maps projects to include company logos
  - For each project with linkedCompany, finds the corresponding company and extracts logoURL
  - Passes companyLogoURL prop to ProjectCard component
- Updated ProjectCard.astro to display company logos
  - Added companyLogoURL to component props as optional string | null
  - Added company logo display in project card header alongside project name
  - Positioned logo as 32x32px image with rounded corners and shadow
  - Maintains existing layout and styling while adding visual company branding
- Enhanced visual presentation of projects
  - Company logos provide immediate visual identification of project companies
  - Improves user experience by making company associations more prominent
  - Maintains responsive design with proper image sizing and object-fit
- Applied same logic to full projects page (index.astro)
  - Updated projects gallery page to also include company logo functionality
  - Ensures consistent company logo display across all project views

## 2025-01-16 12:35 [develop] - Enhanced ReferencesCarousel with company logo display
- Modified ReferencesCarousel.astro to collect companies collection and link company logos
  - Added companies collection import alongside references collection
  - Created processedReferences array that maps references to include company logos
  - For each reference with linkedCompany, finds the corresponding company and extracts logoURL
  - Passes companyLogoURL prop to ReferenceItem component
- Updated ReferenceItem.astro to display company logos
  - Added companyLogoURL to Props interface as optional string | null
  - Added company logo display section with 64x64px image and rounded styling
  - Positioned logo below company name with proper spacing and shadow effects
  - Maintains existing layout and styling while adding visual company branding
- Enhanced visual presentation of references
  - Company logos provide immediate visual identification of reference companies
  - Improves user experience by making company associations more prominent
  - Maintains responsive design with proper image sizing and object-fit

## 2025-01-16 12:30 [develop] - Enhanced project gallery page with category filtering and improved navigation
- Completely redesigned project gallery page (index.astro) with enhanced functionality
  - Changed page title from "All Projects" to "Project Gallery" for better clarity
  - Added back buttons at both top and bottom of page with consistent arrow icons
  - Moved project count from bottom to filter section for better visibility
  - Improved overall layout and spacing for better user experience
- Added category filtering functionality with dropdown
  - Created filter section with gradient background and modern styling
  - Added dropdown with all available project categories (Personal Design, Work Project, Portfolio, Documentation, Backend)
  - Implemented client-side filtering with JavaScript for instant results
  - Added data-category attributes to project cards for filtering
  - Updated project count dynamically based on selected filter
- Enhanced visual design and user experience
  - Added gradient background to filter section for visual separation
  - Improved filter dropdown styling with mint-green accent colors
  - Added proper TypeScript type checking for DOM elements
  - Implemented responsive design for filter section (stacked on mobile, side-by-side on desktop)
  - Added null checks and error handling for robust functionality
- Fixed TypeScript compatibility issues
  - Added proper type assertions for DOM elements
  - Implemented null checks for all DOM element references
  - Converted number to string for textContent assignment
  - Added conditional event listener attachment

## 2025-01-16 12:15 [develop] - Enhanced individual project page with comprehensive layout and linked company display
- Completely redesigned project detail page ([slug].astro) with modern layout
  - Added back buttons at top and bottom of page with arrow icons
  - Implemented 90vw centered project image with max-width constraint and rounded corners
  - Moved project name and technology pills below image with centered layout
  - Created dedicated "Description" section with gradient background and proper spacing
  - Added "Lessons Learned" section with same styling as Description section
  - Organized project links in dedicated section with enhanced button styling
  - Improved overall spacing and typography with larger headings and better readability
- Added linked company display functionality
  - Fetches companies collection and filters by linkedCompany property
  - Displays CustomerAndClientCarouselItem components for each linked company
  - Shows company logos, names, dates, descriptions, and achievements
  - Handles null logoURL values properly with undefined fallback
  - Creates responsive grid layout for company cards (1-3 columns based on screen size)
- Enhanced visual design and user experience
  - Increased max-width to 6xl for better content display
  - Added shadow effects and hover animations to buttons and cards
  - Improved technology pill styling with larger padding and better spacing
  - Enhanced project links with scale hover effects and better visual hierarchy
  - Maintained consistent mint-green color scheme throughout the page
- Fixed TypeScript compatibility issues
  - Resolved logoURL type mismatch between company data (string | null) and component props (string | undefined)
  - Added proper null handling with undefined fallback for component compatibility

## 2025-01-16 12:00 [develop] - Enhanced CustomerAndClientCarousel with endless scrolling and interactive cards
- Updated CustomerAndClientCarousel.tsx component for better carousel functionality
  - Removed unused Component import and debugInfo state to fix linter errors
  - Added logoURL, description, and slug fields to Company and CarouselItem interfaces
  - Enhanced date handling to use dateStart/dateEnd from company data
  - Increased AutoPlay duration to 3000ms for better user experience
  - Adjusted carousel height to 300px and card dimensions to 280x280px for square cards
  - Improved data mapping to include logoURL, description, and slug for each carousel item
- Completely redesigned CustomerAndClientCarouselItem.astro for modern card design
  - Created square cards (280x280px) with logo backgrounds using logoURL field
  - Added darkened overlay (bg-black/70) that lightens on hover (bg-black/30)
  - Implemented fallback gradient background for cards without logos
  - Added hover effects: scale transform, color transitions, and info button appearance
  - Created information button with info icon that appears on hover/click
  - Added modal functionality to display company details when info button is clicked
  - Implemented responsive design with mobile touch support (info button always visible on mobile)
  - Added data attributes to store company information for modal display
- Added comprehensive modal system for company details
  - Created modal with company logo, name, date, description, linked company, and achievements
  - Implemented modal open/close functionality with click handlers
  - Added keyboard support (Escape key) and click-outside-to-close functionality
  - Prevented body scroll when modal is open for better UX
  - Styled modal with dark mode support and responsive design
- Enhanced user experience with smooth animations and transitions
  - Added transform hover effects for card scaling
  - Implemented smooth color transitions for text and overlays
  - Created backdrop blur effects for info buttons
  - Added proper accessibility attributes (aria-label, title) for screen readers
  - Ensured all interactive elements have proper hover states

## 2025-01-16 10:25 [develop] - Maximized GitHub Contributions component width
- Updated GitHubContributions.tsx component to maximize width
  - Added `w-full` class to the main section container
  - Added `width: 100% !important` CSS rule for `.github-calendar__graph`
  - Added `width: 100% !important` CSS rule for `.github-calendar` container
  - Ensures the GitHub contributions calendar takes up full available width
- Updated CodingSection.astro to support full-width GitHub contributions
  - Added `w-full` class to the github-contributions container div
  - Maintains responsive design while maximizing calendar width
  - Improves visual presentation of GitHub contributions data

## 2025-01-16 11:40 [develop] - Fixed Prettier format on save configuration
- Enhanced VS Code workspace settings for better format on save
  - Added specific language formatter settings for Astro, JavaScript, TypeScript, JSON, and CSS
  - Ensured Prettier is set as default formatter for all file types
  - Added explicit formatOnSave settings for each language
- Updated VS Code extensions recommendations
  - Added Prettier, ESLint, and Tailwind CSS extensions to recommendations
  - Ensures all required extensions are installed for proper formatting
- Prettier is working correctly (confirmed with npm run format:check)
  - Detected 86 files with formatting issues
  - Format on save should now work properly with updated settings

## 2025-01-16 11:35 [develop] - Reordered coding section components for mobile view
- Modified CodingSection.astro to prioritize Skills Bubble in mobile layout
  - Skills Bubble now appears first (row-start-1) in mobile view with row-span-1
  - GitHub Contributions moved to second position (row-start-2) in mobile view
  - Most Common Techs moved to third position (row-start-3) in mobile view
  - Desktop layout remains unchanged with md: breakpoint classes (Skills Bubble gets row-span-2 on desktop)
  - Fixed grid layout conflicts by adjusting row spans for mobile vs desktop
  - Improves mobile user experience by showing skills prominently first

## 2025-01-16 11:30 [develop] - Corrected branch labels in AUTO_CHANGES.md
- Fixed incorrect branch labeling in all timestamp entries
  - Changed all "[main]" labels to "[develop]" to reflect actual current branch
  - Corrected 5 timestamp entries from previous changes
  - Ensures accurate branch tracking in change log

## 2025-01-16 11:25 [develop] - Set up ESLint and Prettier for format on save
- Installed Prettier and ESLint integration packages
  - Added prettier, eslint-config-prettier, eslint-plugin-prettier as dev dependencies
  - Enables Prettier formatting with ESLint rule enforcement
- Created Prettier configuration files
  - Added .prettierrc with settings optimized for the codebase
  - Added .prettierignore to exclude build files and dependencies
  - Configured Astro file parsing for proper formatting
- Updated ESLint configuration for Prettier integration
  - Added prettier plugin and config to all file type configurations
  - Added 'prettier/prettier': 'error' rule to enforce formatting
  - Integrated with existing Astro, TypeScript, and React configurations
- Added format scripts to package.json
  - npm run format: Formats all files with Prettier
  - npm run format:check: Checks formatting without making changes
- Created VS Code workspace settings for format on save
  - Enabled formatOnSave with Prettier as default formatter
  - Configured ESLint auto-fix on save for code quality
  - Added Astro language support and file associations
  - Set up import organization on save

## 2025-01-16 11:20 [develop] - Investigated missing header/footer issue on deployed site
- Confirmed header and footer are present in built HTML file
  - Header element with navigation, logo, and theme toggle is properly generated
  - Footer element with social links and branding is properly generated
  - Build process completes successfully without errors
- Issue appears to be CSS/display related rather than build problem
  - Header uses backdrop-blur-xs which may have browser compatibility issues
  - Possible z-index or positioning conflicts on deployed environment
  - JavaScript errors might be preventing proper rendering
- Site content is displaying correctly, only navigation elements are affected
  - All portfolio sections (Projects, Skills, Experience, etc.) are visible
  - Layout structure is intact, just missing header and footer visibility

## 2025-01-16 11:15 [develop] - Fixed build error from deleted Experience component
- Replaced deleted Experience.astro import with WorkExperienceTimeline in MarkdownAbout.astro
  - Changed import from "../components/portfolio/Experience.astro" to "../components/portfolio/WorkExperienceTimeline.astro"
  - Updated component usage from <Experience /> to <WorkExperienceTimeline />
  - Resolves build error "Could not resolve Experience.astro"
- WorkExperienceTimeline provides same functionality as deleted Experience component
  - Displays work experience from roles collection
  - Maintains same layout and styling
  - No loss of functionality for about page

## 2025-01-16 11:10 [develop] - Fixed star icon error in SkillItem component
- Replaced invalid "star-fill" and "star" icon names with HTML star characters
  - Changed from Icon component with non-existent star icons to HTML ★ characters
  - Maintains same visual appearance with filled and empty stars
  - Resolves "Unable to locate star-fill icon" build error
- Updated star rating display to use Unicode star symbols
  - Uses ★ character for filled stars (yellow) and empty stars (gray)
  - Maintains 5-star rating system functionality
  - Preserves existing styling and layout

## 2025-01-16 11:05 [develop] - Added Clients and References components with schema updates
- Created Clients.astro component to display clients collection
  - Similar structure to other portfolio components
  - Sorts clients by dateStart date (newest first)
  - Uses users icon and "Clients" heading
  - Derives client names from filenames when not in frontmatter
- Created ClientItem.astro component for individual client display
  - Displays client name, dates, linked company, and content
  - Processes clientDescription and keyAchievement with content processor
  - Uses processed-content class for mint-green link styling
- Created References.astro component to display references collection
  - Similar structure to other portfolio components
  - Sorts references alphabetically by name
  - Uses quote icon and "References" heading
  - Derives reference names from filenames when not in frontmatter
- Created ReferenceItem.astro component for individual reference display
  - Displays reference name, role, company, contact info, and content
  - Shows clickable email and phone links
  - Processes referenceDescription and keyAchievement with content processor
  - Uses processed-content class for mint-green link styling
- Updated clients and references collection schemas to make name field optional
  - Added name: z.string().optional() to both config.ts schemas
  - Allows clients and references to work without explicit name in frontmatter
  - Maintains backward compatibility with existing name fields
- Added Clients and References components to main Site page
  - Integrated into site.astro with proper imports and usage
  - Positioned between Skills and Education sections
  - Maintains consistent layout and styling with other portfolio sections
- Implemented consistent content processing across all portfolio sections
  - Clients and References now use the same Obsidian link processing as other components
  - Mint-green styling for processed links
  - HTML rendering for markdown links and content

## 2025-01-16 11:00 [main] - Added Skills component with schema updates
- Created Skills.astro component to display skills collection
  - Similar structure to Education, Experience, and Projects components
  - Sorts skills by skillRating (highest first), then alphabetically
  - Uses star icon and "Skills" heading
  - Derives skill names from filenames when not in frontmatter
- Created SkillItem.astro component for individual skill display
  - Displays skill name, rating with star visualization, and content
  - Shows 5-star rating system with filled/empty stars
  - Processes skillDescription and keyAchievement with content processor
  - Uses processed-content class for mint-green link styling
- Updated skills collection schema to make name field optional
  - Added name: z.string().optional() to config.ts
  - Allows skills to work without explicit name in frontmatter
  - Maintains backward compatibility with existing name fields
- Added Skills component to main Site page
  - Integrated into site.astro with proper import and usage
  - Positioned between Projects and Education sections
  - Maintains consistent layout and styling with other portfolio sections
- Implemented consistent content processing across all portfolio sections
  - Skills now use the same Obsidian link processing as other components
  - Mint-green styling for processed links
  - HTML rendering for markdown links and content

## 2025-01-16 10:55 [main] - Added Projects component with schema updates
- Created Projects.astro component to display projects collection
  - Similar structure to Education and Experience components
  - Sorts projects by dateStart date (newest first)
  - Uses code icon and "Projects" heading
  - Derives project names from filenames when not in frontmatter
- Fixed icon reference to use available "code" icon instead of missing "folder" icon
  - Resolves build error about missing folder icon
  - Maintains consistent icon usage across portfolio components
- Created ProjectItem.astro component for individual project display
  - Displays project name, dates, technologies, and links
  - Shows Live Demo and Code links when available
  - Processes shortDescription, longDescription, and lessonsLearned with content processor
  - Uses processed-content class for mint-green link styling
- Updated projects collection schema to make name field optional
  - Added name: z.string().optional() to config.ts
  - Allows projects to work without explicit name in frontmatter
  - Maintains backward compatibility with existing name fields
- Added Projects component to main Site page
  - Replaced ListProjects component with new Projects component
  - Integrated into site.astro with proper import and usage
  - Maintains consistent layout and styling with other portfolio sections
- Implemented consistent content processing across all portfolio sections
  - Projects now use the same Obsidian link processing as Education and Experience
  - Mint-green styling for processed links
  - HTML rendering for markdown links and content

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
  - Replaced `@apply bg-blue-100 border-blue-300 text-blue-700` with direct CSS color values

## 2024-12-19 16:15 - Carousel UI Improvements

### Problems Fixed:
- **CustomerAndClientCarousel.tsx**: Removed type indicator badges ("Company"/"Client") from carousel items
- **CustomerAndClientCarousel.tsx**: Improved date formatting to show date ranges in MMM YYYY format
- **CustomerAndClientCarousel.tsx**: Enhanced date logic to show "Current" for ongoing relationships

### Changes Made:
- Removed type indicator badges from both carousel cards and modal popups
- Updated date processing to show date ranges: "Jan 2024 - Dec 2024"
- Added logic to show "Jan 2024 - Current" for ongoing relationships
- Improved date formatting using `toLocaleDateString('en-US', { month: 'short', year: 'numeric' })`
- Enhanced date validation to handle empty, null, and "TBD" values

### Date Logic:
- **With start and end dates**: Shows "Jan 2024 - Dec 2024"
- **With start date only**: Shows "Jan 2024 - Current"
- **No dates or invalid dates**: Shows nothing
- **Handles "TBD" and empty strings**: Treated as no end date

### Technical Details:
- Date formatting uses MMM YYYY format (e.g., "Jan 2024", "Dec 2024")
- Proper handling of Date objects vs string dates
- Validation for empty, null, and "TBD" end dates
- Cleaner UI without type badges cluttering the design

### Result:
- ✅ Cleaner carousel design without type badges
- ✅ Professional date range display (MMM YYYY format)
- ✅ Clear indication of ongoing relationships ("Current")
- ✅ Better user experience with cleaner visual design
- ✅ Consistent date formatting across all carousel items

> [Back to Table of Contents](#table-of-contents)

## 2024-12-19 16:10 - Clients Content Schema Validation Fix

### Problems Fixed:
- **config.ts**: Fixed content schema validation error for clients with array linkedCompany values
- **Dorkinians FC.md**: Client file with array linkedCompany and logoURL field was causing validation failure
- **CustomerAndClientCarousel.tsx**: Updated to handle linkedCompany arrays and logoURL for clients

### Root Cause:
The clients collection schema expected `linkedCompany` to be a string, but some client files (like Dorkinians FC.md) have it as an array. Also, some client files use `logoURL` instead of `imageURL`.

### Changes Made:
- Updated clients collection schema to allow `linkedCompany` as string, array, or null
- Added `logoURL` field to clients schema as alternative to `imageURL`
- Updated TypeScript interfaces to handle linkedCompany arrays
- Enhanced processing logic to convert linkedCompany arrays to comma-separated strings
- Updated CompanyCard component to handle logoURL for clients

### Technical Details:
- `linkedCompany` can now be: `string`, `string[]`, or `null`
- Array values are converted to comma-separated strings for display
- Clients can use either `imageURL` or `logoURL`

## 2025-01-16 18:35 [main] - Added Download CV button and placeholder PDF
- Created public/CV-placeholder.pdf as a downloadable placeholder CV
- Added Download CV button to ReferencesCarousel.astro
  - On desktop: button appears alongside the References section header
  - On mobile: button appears below the References carousel
- Button uses Tailwind styling and includes a download icon
- Verified download functionality with placeholder file

## 2025-01-16 18:40 [main] - Moved Download CV button to contact section
- Removed Download CV button from References section header and below carousel
- Added Download CV button to the right of the Email Me button in the bottom contact section (Contact.astro)
- Used existing 'download' icon for the button
- Button links to /CV-placeholder.pdf and uses Button.astro for consistent styling
- Changed button variant from 'big' to 'dark' to match About Me button styling in HeroSection
- Updated icon from 'download' to 'briefcase' for better visual consistency
- Changed Contact Me button back to 'big' variant with custom height classes to match Download CV button size while keeping gradient background
- Removed container-level hover effects and added individual hover effects to each button for independent scaling

## 2025-01-16 18:45 [main] - Updated work experience timeline company display
- Modified WorkExperienceTimeline.astro to display only the first company name from linkedCompany array
- Added company logo processing logic to fetch logos for all companies in linkedCompany array
- Updated WorkExperienceItem.astro to show a small card with company logos below the date string
- Added allCompanyLogos prop to WorkExperienceItem interface for passing processed logo data
- Updated work-experience.astro page to use the same company processing logic
- Company logos are displayed as small 8x8 rounded cards with backdrop blur and border styling
- Fixed company name extraction to remove Obsidian link brackets [[Company Name]] and extract just the company name
- Optimized company logo lookup by pre-fetching companies collection instead of individual getCollection calls
- Added debugging console.log statements to troubleshoot logo display issues in WorkExperienceTimeline and WorkExperienceItem
- Made company logos larger (12x12) without container styling and added tooltips showing company names
- Fixed role name casing to preserve original format (e.g., "TVM Engineer" instead of "Tvm Engineer")
- Increased company logo size to 24x24 pixels (100% larger) for better visibility
- Debugged sync.js script for Sydney link processing issue in Loughborough University education note
- Added and then removed debugging code to investigate Obsidian link processing
- Confirmed sync process is working correctly - Sydney links are converted to theme-link spans since Sydney is not a project name
- Cleaned up debugging code to maintain script quality
- Fixed sync.js processing order to handle Obsidian links in extracted sections correctly
- Added Back to Home button to MarkdownAbout layout with home icon and theme-consistent styling
- Added syncPortfolioAboutMe function to sync.js to specifically target "Portfolio About Me.md" from Obsidian vault and copy it to src/pages/about-me.md with Obsidian link processing
- Enhanced syncPortfolioAboutMe function with recursive file search to find "Portfolio About Me.md" in any subfolder within the Obsidian vault
- Successfully tested recursive search functionality - found and synced file from "01 Notes/02 Areas/Work Notes/Portfolio About Me.md"
- Added removeAboutMeFromFrontmatter function to clean "about-me-" strings from frontmatter during sync process
- Fixed people.svg icon to use currentColor instead of hardcoded fill colors, allowing text-white class to properly color the icon white
- Replaced Icon component with direct SVG in ReferencesCarousel.astro to ensure text-white class properly colors the people icon white
- Fixed SVG sizing in ReferencesCarousel.astro by removing explicit w-16 h-16 classes to match other icons using text-4xl
- Replaced complex people SVG with simple 15x15 viewBox person icon to match standard icon sizing in section headings

## 2024-12-19 14:36 - Complete Tooltip and Form Element Standardization

### Problems Fixed:
- **MostCommonTechs.astro**: Tooltips were using custom gray styling instead of global tooltip classes
- **Projects index page**: Dropdown selects had inconsistent styling across desktop and mobile
- **SkillsBubbleChart.tsx**: Filter dropdown used different styling than other form elements
- **CodingSection.astro**: Skills filter dropdown had inconsistent styling
- **Form elements**: No standardized styling for dropdowns and inputs across the site

### Changes Made:
- Updated MostCommonTechs tooltips to use global-tooltip classes with proper arrow positioning
- Created global-form-element class for consistent form styling across the site
- Updated all dropdown selects to use global-form-element styling:
  - Projects index page category and date filters (desktop and mobile)
  - SkillsBubbleChart filter dropdown
  - CodingSection skills filter dropdown
- Added global-form-element CSS class with same styling as tooltips but with pointer-events: auto

### Technical Details:
- **Global Tooltip Classes**: `.global-tooltip`, `.global-tooltip-content`, `.global-tooltip-arrow*`
- **Global Form Element Class**: `.global-form-element` with same visual styling as tooltips
- **Background Color**: Dark red (#9e4933) for both tooltips and form elements
- **Border**: Theme-colored thin border (rgb(108 233 183 / 0.3))
- **Border Radius**: 0.5rem for consistent rounded corners
- **Box Shadow**: Subtle shadow for depth and visual separation

### Result:
- ✅ All tooltips now use consistent global styling
- ✅ All dropdown selects have standardized appearance
- ✅ Visual consistency across the entire site
- ✅ Maintained functionality while improving design coherence
- ✅ Dark red background with theme-colored borders throughout

## 2024-12-19 14:50 - Icon Tooltip Standardization

### Problems Fixed:
- **SkillItem.astro**: Icons were using browser default title tooltips instead of global styling
- **ScrollToTop.astro**: Button was using browser default title tooltip
- **Share.astro**: Share buttons were using browser default title tooltips
- **MostCommonTechs.astro**: Already updated in previous session

### Changes Made:
- Updated SkillItem icons to use custom tooltip divs with global-tooltip classes
- Updated ScrollToTop button to use custom tooltip with global styling
- Updated Share component buttons to use custom tooltips with global styling
- All tooltips now use consistent dark red background (#9e4933) with theme-colored borders

### Technical Details:
- Replaced simple `title` attributes with custom tooltip divs
- Used `group/tooltip` classes for hover functionality
- Positioned tooltips above elements with proper arrow indicators
- Maintained accessibility with `aria-label` attributes

### Result:
- ✅ All icon tooltips now use consistent global styling
- ✅ Improved visual consistency across the site
- ✅ Better user experience with styled tooltips instead of browser defaults
- ✅ Maintained all functionality while enhancing design

## 2024-12-19 15:11 - Mobile Menu and Header Icon Improvements

### Mobile Menu Enhancements
- **Enhanced mobile menu functionality** in `src/scripts/menu.js`:
  - Added `closeMobileMenu()` and `openMobileMenu()` functions for better control
  - **Close menu on navigation link click**: Menu now closes when user clicks any navigation link
  - **Close menu on click outside**: Menu closes when clicking outside the menu area
  - **Close menu on escape key**: Added keyboard support to close menu with Escape key
  - **Event propagation control**: Prevented hamburger click from bubbling to document

### Header Icon Hover Effects
- **Logo hover effects** in `src/components/ui/Logo.astro`:
  - Added theme color change on hover (`hover:text-theme-300`)
  - Added scale transform on hover (`hover:scale-150`)
  - Added smooth transitions (`transition-all`)

- **Theme icon hover effects** in `src/components/ui/ThemeIcon.astro`:
  - Added scale transform on hover (`hover:scale-150`)
  - Maintained existing theme color change on hover
  - Added smooth transitions (`transition-all`)

### Technical Details
- All hover effects use `scale-150` (1.5x) to match existing Social component styling
- Transitions use `transition-all` for smooth animations
- Mobile menu improvements maintain existing functionality while adding better UX
- Build tested and confirmed working

> [Back to Table of Contents](#table-of-contents)

## 2024-12-19 15:21 - Projects Gallery Improvements

### Layout and Spacing
- **Increased Projects header gap** in `src/components/portfolio/ProjectsGallery.astro`:
  - Changed `pt-8` to `pt-16` for more spacing between header and gallery

### Mobile Experience Enhancements
- **Fixed mobile project selection behavior** in `src/components/portfolio/ProjectCard.astro`:
  - **Persistent selection**: Cards now stay bright/selected until another card is clicked
  - **Proper deselection**: Only one card can be selected at a time
  - **Click outside to deselect**: Tapping outside deselects the current card

- **Fixed mobile tooltip behavior**:
  - **Persistent tooltips**: Information tooltips now stay visible until clicked off
  - **Removed auto-hide**: Removed 3-second auto-hide timer
  - **Click outside to close**: Tooltips close when clicking outside the tooltip area

- **Fixed mobile "See more detail" section**:
  - **Proper event handling**: Added `event.stopPropagation()` to prevent card deselection
  - **Working links**: "See more detail..." links now work correctly without deselecting cards

### Desktop Experience Enhancements
- **Added desktop card selection functionality**:
  - **Clickable cards**: Cards are now clickable on desktop with `cursor-pointer`
  - **Visual feedback**: Selected cards show border, shadow, and scale effects
  - **"Show more details" text**: Appears at bottom when card is selected
  - **Smooth transitions**: Opacity transitions for detail link appearance

### Technical Implementation
- **Unified event handling**: Single click handler for both mobile and desktop
- **Responsive design**: Different behaviors for mobile vs desktop
- **Event propagation control**: Proper handling of link clicks vs card clicks
- **CSS animations**: Smooth slide-in animations for detail links
- **State management**: Proper tracking of selected card state

### User Experience Improvements
- **Consistent behavior**: Cards behave predictably across devices
- **Visual feedback**: Clear indication of selected state
- **Accessibility**: Proper event handling and keyboard support
- **Performance**: Efficient event listeners and state management

> [Back to Table of Contents](#table-of-contents)

## 2024-12-19 17:25 - Skill Pill and Project Gallery Enhancements

### Skill Pill Mobile Tooltip
- **Added mobile tooltip functionality** in `src/components/ui/SkillPill.astro`:
  - **Click to show skill name**: Tapping skill pills on mobile now shows the original filename
  - **Original filename display**: Shows the skill name without capitalization, minus file extension
  - **Persistent tooltips**: Tooltips stay visible until clicked off
  - **Click outside to close**: Tooltips close when clicking outside the skill pill area
  - **Mobile-only behavior**: Tooltips only appear on mobile devices (hidden on desktop)

### Project Card Title Fix
- **Fixed card title capitalization** in `src/components/portfolio/ProjectCard.astro`:
  - **Original filename display**: Cards now show the original filename without capitalization
  - **Consistent naming**: Uses `projectSlug.replace(/-/g, ' ')` instead of capitalized version
  - **Better readability**: Maintains original project naming conventions

### Full Project Gallery Improvements
- **Enhanced mobile project selection** in `src/pages/portfolio/projects/index.astro`:
  - **Mobile-only selection**: Project selection only works on mobile devices
  - **Persistent selection**: Cards stay bright/selected until another card is clicked
  - **Proper deselection**: Only one card can be selected at a time
  - **Click outside to deselect**: Tapping outside deselects the current card

- **Fixed date picker styling**:
  - **White calendar icons**: Added `[&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert` classes
  - **Consistent appearance**: Date picker icons now match the theme on both desktop and mobile

- **Improved filtering logic**:
  - **Proper date range filtering**: Now checks if project date range overlaps with user's selected date range
  - **Overlap detection**: Projects are shown if their date range (start to end) overlaps with the filter range
  - **Flexible date handling**: Works with projects that have only start dates, only end dates, or both
  - **Better data attributes**: Uses `data-start-date` and `data-end-date` instead of year-only filtering

- **Added clear filters functionality**:
  - **Clear filters button**: Added "Clear Filters" button for both desktop and mobile layouts
  - **Reset all filters**: Clears category selection and date range inputs
  - **Immediate update**: Project count and display update immediately when filters are cleared
  - **Consistent styling**: Matches theme colors and hover effects

### Technical Implementation
- **Enhanced skill pill structure**: Wrapped in relative container with mobile-specific tooltip
- **Improved date filtering algorithm**: Proper overlap detection for date ranges
- **Responsive design**: Different behaviors for mobile vs desktop
- **Event handling**: Proper touch events for mobile tooltips
- **State management**: Efficient tracking of selected cards and active tooltips

### User Experience Improvements
- **Better mobile interaction**: Skill pills now provide useful information on mobile
- **Consistent project naming**: Original filenames maintain project identity
- **Improved filtering**: More accurate date range filtering for better project discovery
- **Enhanced usability**: Clear filters button makes it easy to reset search criteria
- **Visual consistency**: White date picker icons match the overall theme

> [Back to Table of Contents](#table-of-contents)

## 2024-12-19 17:45 - Project Slug Page and Skills Bubble Enhancements

### Project Slug Page Improvements
- **Fixed "Developed For" section layout** in `src/pages/portfolio/projects/[slug].astro`:
  - **Centered layout**: Changed from grid to flex layout with `justify-center` for better alignment
  - **Company name display**: Updated to use original filename minus extension instead of slug
  - **Consistent naming**: Both companies and clients now use the same `getCompanyName()` function
  - **Better visual hierarchy**: Improved spacing and alignment for company/client cards

- **Fixed project title capitalization**:
  - **Original filename display**: Project titles now show the original filename without capitalization
  - **Consistent naming**: Uses `project.slug.replace(/-/g, ' ')` instead of capitalized version
  - **Better readability**: Maintains original project naming conventions across the site

### Coding Section Layout Improvements
- **Enhanced spacing and mobile layout** in `src/components/portfolio/CodingSection.astro`:
  - **Header spacing**: Added `mb-8` to the coding header for better visual separation
  - **Mobile spacing**: Added clear space below the coding section on mobile with `max-sm:h-8`
  - **Skills bubble container**: Made skills bubble section a big square container on mobile with `max-sm:aspect-square`
  - **Better mobile experience**: Improved spacing and proportions for mobile devices

### Multi-Select Skills Filter
- **Replaced single-select with multi-select dropdown**:
  - **Checkbox-based selection**: Users can now select multiple skill categories simultaneously
  - **Smart selection logic**: "All Skills" option works as a toggle with other options
  - **Visual feedback**: Shows "All Skills", single filter name, or "X Filters" in the button text
  - **Consistent styling**: Uses the same `global-form-element` styling as other form elements
  - **Dropdown behavior**: Closes when clicking outside, proper keyboard navigation

### Skills Bubble Chart Enhancements
- **Improved project counting logic** in `src/components/portfolio/SkillsBubbleChart.tsx`:
  - **Better matching**: Now checks for exact matches, partial matches, and pipe aliases
  - **Obsidian link handling**: Properly cleans technology names by removing `[[]]` brackets
  - **Multiple match strategies**: Compares skill name, skill ID, and extracted path names
  - **Accurate counts**: More precise project usage counting for each skill

- **Enhanced filtering system**:
  - **Multi-select support**: Skills bubble chart now supports multiple selected filters
  - **Event-driven updates**: Uses custom events to sync filter state between components
  - **Real-time filtering**: Chart updates immediately when filters change
  - **Filter synchronization**: Main filter and modal filter stay in sync

### Fullscreen Modal Improvements
- **Added filter to fullscreen modal** in `src/components/portfolio/SkillsBubbles.astro`:
  - **Modal filter dropdown**: Fullscreen modal now includes the same multi-select filter
  - **Synchronized state**: Modal filter stays in sync with the main filter
  - **Consistent UX**: Same filtering behavior in both main view and fullscreen view
  - **Better accessibility**: Proper ARIA labels and keyboard navigation

### Technical Implementation
- **Enhanced event handling**: Custom events for filter synchronization between components
- **Improved TypeScript**: Better type safety and error handling
- **Responsive design**: Mobile-first approach with proper aspect ratios
- **Performance optimization**: Efficient filtering and rendering logic
- **State management**: Proper cleanup and event listener management

### User Experience Improvements
- **Better project discovery**: More accurate project counting helps users understand skill usage
- **Enhanced filtering**: Multi-select filters provide more granular control over displayed skills
- **Improved mobile experience**: Better spacing and layout on mobile devices
- **Consistent interface**: Unified filtering experience across main view and fullscreen modal
- **Better visual hierarchy**: Improved spacing and alignment throughout the site

> [Back to Table of Contents](#table-of-contents)

## 2024-12-19 18:06 - Project Slug Page Layout Width Standardization

### Layout Width Consistency
- **Updated project slug page layout** in `src/pages/portfolio/projects/[slug].astro`:
  - **Consistent content width**: Added `max-w-4xl mx-auto` container to match WorkExperience page
  - **Proper padding structure**: Added `px-8` horizontal padding to all sections
  - **Background consistency**: Added `bg-white dark:bg-gray-900` to match other pages
  - **Structured layout**: Each section now has proper container and padding structure

### Layout Improvements
- **Top back button section**: Added proper padding and container structure
- **Project image section**: Updated to use full width within max-w-4xl container
- **Project details section**: Consistent padding and container structure
- **Content sections**: Description, lessons learned, and company sections all use consistent layout
- **Project links section**: Proper container and padding structure
- **Bottom back button**: Consistent layout with other sections

### Visual Consistency
- **Unified page width**: All content now uses the same max-width as WorkExperience page
- **Consistent spacing**: Proper padding and margins throughout the page
- **Better readability**: Content is properly constrained and centered
- **Responsive design**: Layout works well on all screen sizes
- **Professional appearance**: Consistent with the overall site design

### Technical Implementation
- **Container structure**: Each section wrapped in `max-w-4xl mx-auto` container
- **Padding consistency**: All sections use `px-8` for horizontal padding
- **Background matching**: Added proper background colors to match site theme
- **Responsive behavior**: Layout adapts properly to different screen sizes

> [Back to Table of Contents](#table-of-contents)

## 2025-01-16 18:20 [main] - Enhanced CustomerAndClientCarousel with infinite loop and mobile improvements
- Implemented infinite loop functionality for carousel
  - Removed TODO comments for pagination and infinite loop fixes
  - Enhanced circular mode with proper center alignment
  - Added preventClickOnDrag: false for better touch interaction
- Made carousel full width on screen
  - Changed section padding from px-8 to px-0 for full width
  - Updated container from max-w-7xl to w-full
  - Added CSS for 100vw width and max-width
  - Enhanced mobile responsiveness with larger cards (280x300px)
- Enhanced focused carousel item brightness
  - Added brightness-110 class to selected items
  - Improved visual feedback for selected state
- Implemented mobile-specific interactions
  - Added mobile detection (touch device or small screen)
  - Mobile clicks show detailed modal instead of selection
  - Desktop clicks maintain selection behavior
  - Added "Tap for details" indicator on mobile cards
- Enhanced modal with more information
  - Added duration and type information to modal
  - Improved modal content structure and readability
- Made carousel swipeable on all devices
  - Enabled touch/swipe functionality across all screen sizes
  - Maintained click-to-select on desktop
  - Added proper touch event handling

## 2025-01-16 18:15 [main] - Improved education timeline mobile responsiveness
- Enhanced EducationTimelineItem.astro mobile layout
  - Added max-sm:col-span-full and max-sm:w-full for full width on mobile
  - Added max-sm:px-4 for better mobile padding
  - Reduced date margin with max-sm:mb-1 for tighter spacing
  - Adjusted text sizes: qualifications to max-sm:text-lg, details to max-sm:text-sm
- Updated EducationTimeline.astro container
  - Added max-sm:max-w-full for full width on mobile
  - Reduced top margin with max-sm:mt-6 for better spacing
- Enhanced full education page mobile layout
  - Updated education.astro with max-sm:max-w-full containers
  - Improved header and timeline sections for mobile viewing
  - Maintained consistent spacing and typography across devices

## 2025-01-16 18:25 [main] - Enhanced references section with full width and selection functionality
- Updated ReferencesCarousel.astro for improved layout
  - Changed section padding from px-8 to px-0 for full width display
  - Updated container from max-w-6xl to w-full for full page width
  - Increased space between header and content with mb-12
  - Enhanced carousel container with w-full class
- Enhanced ReferencesCarouselComponent.tsx with selection functionality
  - Added selectedItem state to track highlighted cards
  - Implemented handleItemClick function for card selection
  - Added click-outside-to-deselect functionality with useEffect
  - Enhanced visual feedback with ring-4 ring-theme-400 and brightness-110 for selected items
  - Updated overlay opacity based on selection state
  - Added theme color transition for selected card titles
  - Made carousel full width with 100vw style
  - Improved arrow button accessibility with cursor-pointer class
  - Set preventClickOnDrag to false for better interaction

## 2025-01-16 18:20 [main] - Improved contact section mobile responsiveness
- Enhanced Contact.astro component for better mobile layout
  - Added max-sm:flex-col and max-sm:w-full to button container
  - Applied max-sm:!w-full to both Contact Me and Download CV buttons
  - Ensured consistent button sizing on mobile devices
  - Maintained existing hover effects and transitions

## 2025-01-16 18:15 [main] - Enhanced footer logo and text hover effects
- Updated Footer.astro with improved hover interactions
  - Enhanced logo container with hover:text-theme-400 and hover:scale-125
  - Added transition-all duration-300 for smooth animations
  - Updated "Developed by" text with hover:text-theme-400 and hover:scale-110
  - Added individual hover effect to bangsluke text with hover:text-theme-400
  - Improved visual feedback with consistent theme color usage
- Enhanced Logo.astro component styling
  - Updated hover color from theme-300 to theme-400 for consistency
  - Changed scale from 150% to 125% for more subtle effect
  - Added duration-300 for smoother transitions

## 2025-01-16 18:30 [main] - Fixed sync script import error
- Updated scripts/sync.js to include filename utility function directly
  - Removed problematic import of TypeScript file '../src/utils/filename-utils.ts'
  - Added extractNameFromFilename function directly in sync script
  - Resolved ERR_UNKNOWN_FILE_EXTENSION error when running sync:dev
  - Fixed Node.js compatibility issue with TypeScript imports
  - Ensured proper module resolution without external dependencies

## 2025-01-16 18:45 [main] - Updated icon paths to use public/icons folder
- Updated SkillsBubbleChart component to use public icons path
  - Changed icon href from '../icons/${d.iconName}.svg' to '/icons/${d.iconName}.svg'
  - Icons now load from public/icons directory for proper URL access
  - Fixed SVG background images not displaying in skills bubbles
- Updated sync scripts to reference public/icons directory
  - Modified scripts/sync.js to check for missing SVG files in public/icons
  - Updated scripts/update-icons.cjs to read from public/icons directory
  - Ensures sync process validates icons in correct location
- Updated icon-utils.ts documentation
  - Changed comment to reflect public/icons directory location
  - Fixed linter error by prefixing unused skillIconMapping with underscore
  - Maintains compatibility with existing icon lookup functions
- Resolved skills bubble SVG background image loading issues
  - Icons now properly display in both development and production environments
  - Fixed path resolution for client-side D3.js component
  - Ensures consistent icon loading across all environments

## 2025-01-16 19:00 [main] - Fixed neo4j icon error by updating components to use public icons
- Updated SkillPill component to use img tags instead of Icon component
  - Replaced Icon component with img tag pointing to /icons/${finalIconName}.svg
  - Removed astro-icon import since icons are now in public directory
  - Added proper alt text for accessibility
- Updated SkillItem component to use img tags instead of Icon component
  - Replaced Icon component with img tag pointing to /icons/${iconName}.svg
  - Maintains tooltip functionality and styling
  - Added proper alt text for accessibility
- Resolved "Unable to locate neo4j icon" error
  - Fixed astro-icon integration issue when icons moved to public directory
  - Components now load icons directly from public/icons via URL
  - Ensures consistent icon loading across all environments
- Maintained all existing functionality
  - Tooltips, hover effects, and styling remain unchanged
  - Fallback question mark display for missing icons preserved
  - Mobile touch interactions continue to work properly

## 2025-01-16 19:15 [main] - Fixed skills bubble chart icon display and removed skill names
- Removed white filter from skill icons in SkillsBubbleChart
  - Removed 'brightness(0) invert(1)' filter that was making icons appear white
  - Icons now display in their original colors as intended
  - SVG logos now show proper brand colors and styling
- Hidden skill names from bubble chart display
  - Removed text elements that displayed skill names on larger bubbles
  - Cleaner visual appearance with only colored icons visible
  - Skill information still available via tooltips and selection
- Improved visual clarity of skills bubble chart
  - Icons now properly represent their brand colors and identities
  - Reduced visual clutter by removing overlapping text
  - Maintains all interactive functionality (tooltips, selection, filtering)

## 2025-01-16 19:20 [main] - Increased SVG icon size in skills bubble chart
- Maximized icon size within skill bubbles
  - Increased icon size from 60% to 100% of bubble radius
  - Removed 24px maximum size limit to allow full bubble utilization
  - Icons now use 100% of available bubble space for maximum visibility
- Improved icon positioning for larger sizes
  - Updated positioning calculations to center larger icons properly
  - Icons remain perfectly centered within each bubble
  - Maintains visual balance across all bubble sizes
- Enhanced visual impact of skills bubble chart
  - Larger icons are more recognizable and easier to identify
  - Better brand visibility for technology logos
  - Improved overall chart readability and professional appearance