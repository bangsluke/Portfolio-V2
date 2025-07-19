const fs = require('fs');
const path = require('path');

// Path to the icons directory
const iconsDir = path.join(__dirname, '../src/icons');
const iconUtilsFile = path.join(__dirname, '../src/utils/icon-utils.ts');

function updateIconUtils() {
	try {
		// Check if icons directory exists
		if (!fs.existsSync(iconsDir)) {
			console.warn('Icons directory not found:', iconsDir);
			return;
		}

		// Read all files in the icons directory
		const files = fs.readdirSync(iconsDir);

		// Filter for SVG files and remove the .svg extension
		const icons = files
			.filter(file => file.endsWith('.svg'))
			.map(file => file.replace('.svg', ''))
			.sort(); // Sort alphabetically for consistency

		console.log(`Found ${icons.length} SVG icons:`, icons);

		// Read the current icon-utils file
		let content = fs.readFileSync(iconUtilsFile, 'utf8');

		// Create the new icons array string
		const iconsArrayString = icons.map(icon => `\t'${icon}'`).join(',\n');

		// Replace the existing icons array
		const updatedContent = content.replace(
			/let knownIconsCache: string\[\] = \[[\s\S]*?\];/,
			`let knownIconsCache: string[] = [\n${iconsArrayString},\n];`
		);

		// Write the updated content back to the file
		fs.writeFileSync(iconUtilsFile, updatedContent, 'utf8');

		console.log(
			'✅ Successfully updated icon-utils.ts with',
			icons.length,
			'icons'
		);
	} catch (error) {
		console.error('❌ Error updating icon-utils:', error);
		process.exit(1);
	}
}

// Run the update if this script is executed directly
if (require.main === module) {
	updateIconUtils();
}

module.exports = { updateIconUtils };
