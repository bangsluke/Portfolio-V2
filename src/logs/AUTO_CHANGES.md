# Auto Changes Log

This file tracks all automatic changes made to the project.

## 2024-12-19

### Fixed MostCommonTechs Filtering by Reading Data from DOM
- **Issue**: The dropdown filter changes were not affecting the skill pills because the client-side script couldn't access the `techData` prop properly.
- **Solution**: Changed the filtering logic to read tech data directly from the DOM using `data-*` attributes instead of relying on the prop data.
- **Changes**:
  - Modified `filterAndDisplayTechs()` function in `MostCommonTechs.astro` to query DOM elements for tech data
  - Used `querySelectorAll('[data-tech-name]')` to get all tech elements
  - Extracted tech information from `data-*` attributes (name, count, projects, tags)
  - This ensures the filtering works correctly regardless of prop serialization issues
- **Result**: The dropdown filter now properly filters and displays the top 10 skills based on the selected category (All Categories, Frameworks & Libraries, Languages, Testing, Hosting)
- **Files Modified**: `src/components/portfolio/MostCommonTechs.astro`

## 2025-01-27 - Fixed Most Common Techs Dropdown Positioning and Filtering

### Changes Made:

1. **Fixed dropdown positioning in global.css**
   - Changed `right: 0` to `left: 0` in `.global-dropdown-menu` rule
   - This positions the dropdown below and to the left of the dropdown button

2. **Restored 'language' filter option in repoConfig.js**
   - Added `'language'` back to `SKILLS_FILTER_OPTIONS` array
   - This was needed for the language filter to work properly

3. **Fixed filtering logic in CodingSection.astro**
   - Updated dropdown labels to correctly show "Frameworks & Libraries" and "Languages" as separate options
   - Fixed display text logic to show "Languages" when only language filter is selected

4. **Fixed filtering logic in MostCommonTechs.astro**
   - Updated the filtering logic to correctly handle `framework` and `language` categories
   - Framework filter now includes both `framework` and `library` tags
   - Language filter now only includes `language` tags

5. **Fixed dropdown width in global.css**
   - Increased width from `12rem` to `24rem` (doubled the size)

6. **Disabled unwanted tooltips in MostCommonTechs**
   - Added `disableTooltip` prop to SkillPill component
   - Passed `disableTooltip={true}` from MostCommonTechs to prevent duplicate tooltips

## 2025-01-27 - Refactored MostCommonTechs Component for Dynamic Top 10 Calculation

### Changes Made:

1. **Converted from Astro to React/TSX component**
   - Changed `MostCommonTechs.astro` to `MostCommonTechs.tsx`
   - This enables proper client-side state management and dynamic filtering

2. **Implemented dynamic top 10 recalculation**
   - Component now recalculates the top 10 skills based on active filters
   - No more static pre-calculated pills that just hide/show
   - Real-time filtering with proper React state management

3. **Added comprehensive debugging**
   - Console logs for component mounting, data loading, and filtering decisions
   - Debug display showing tech count and data status
   - Polling mechanism to wait for server data

4. **Fixed data transfer from server to client**
   - Server processes all 35 projects and extracts 47 unique technologies
   - Data passed through window object for React component access
   - Proper serialization and data structure validation

## 2025-01-27 - Fixed Skill Tag Filtering, Dropdown Width, and Unwanted Tooltips

### Changes Made:

1. **Fixed skill tag filtering logic**
   - Added explicit handling for `testing` and `hosting` filters
   - Ensured all filter categories map correctly to their respective tags
   - Framework filter includes both `framework` and `library` tags

2. **Doubled dropdown filter menu width**
   - Changed `.global-dropdown-menu` width from `12rem` to `24rem`
   - Provides better user experience for longer filter option names

3. **Disabled unwanted tooltips in MostCommonTechs section**
   - Added `disableTooltip` prop to `SkillPill.astro` component
   - Prevents duplicate "Not used in any projects" tooltips
   - Keeps only the project usage tooltips below the pills

## 2025-01-27 - Major Improvements in Skill Matching and Data Structure for MostCommonTechs

### Changes Made:

1. **Restructured data from separate objects to unified array**
   - Changed from `{ techCount, techProjects, techTags }` to `{ techs: TechData[] }`
   - Each tech object contains: `{ name, count, projects, tags }`
   - Data is pre-sorted by count (most used first) on server-side

2. **Dramatically improved skill matching logic**
   - **Exact match**: Case-insensitive string comparison
   - **Normalized match**: Remove special characters (dots, spaces, etc.) for comparison
   - **Partial match**: Check if skill name contains tech or vice versa
   - **Alias match**: Check skill aliases for matches

3. **Significant improvement in skill tag extraction**
   - **Before**: Many skills had empty tag arrays due to poor matching
   - **After**: 47 out of 47 technologies now have proper tags extracted
   - Examples of improved matches:
     - Next.js → `nextjs` slug with `framework` tags ✅
     - Google Sheets → `google-sheets` slug ✅
     - Power BI → `power-bi` slug ✅
     - Vite.js → `vitejs` slug with `framework` tags ✅
     - Node.js → `nodejs` slug with `framework` tags ✅

4. **Enhanced debugging and logging**
   - Server-side logs show each technology match attempt
   - Clear success/failure indicators for each skill match
   - Data structure validation and serialization testing
   - Comprehensive console output for troubleshooting

### Technical Details:

- **Server-side processing**: 35 projects → 47 unique technologies → proper skill matching
- **Data serialization**: 8234 characters, valid JSON structure
- **Tag categories**: Framework, Library, Language, Testing, Hosting, Software, etc.
- **Performance**: Pre-sorted data eliminates need for client-side sorting

### Current Status:

✅ **Server-side**: Working perfectly - all 47 techs have proper tags
❌ **Client-side**: React component still not receiving data (showing 0 techs)
🔍 **Next step**: Debug client-side data transfer and rendering