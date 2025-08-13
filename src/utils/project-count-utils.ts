/**
 * Utility functions for calculating project counts consistently across components
 */

interface Project {
	data: {
		technologies?: string[];
		name?: string;
	};
	slug: string;
}

/**
 * Calculate the number of projects that use a specific skill/technology
 * Uses exact matching logic with support for pipe aliases
 */
export function getProjectCount(
	skillName: string,
	skillId: string,
	projects: Project[]
): number {
	return projects.filter(project => {
		// Add null checking for project and project.data
		if (!project || !project.data) {
			return false;
		}
		const technologies = project.data.technologies || [];
		return technologies.some((tech: string) => {
			// Clean the technology name (remove Obsidian brackets)
			const cleanTech = tech.replace(/\[\[|\]\]/g, '');

			// Check for exact match with skill name or skill ID
			if (
				cleanTech.toLowerCase() === skillName.toLowerCase() ||
				cleanTech.toLowerCase() === skillId.toLowerCase()
			) {
				return true;
			}

			// Handle pipe aliases in tech names
			if (cleanTech.includes('|')) {
				const [techPath, _techDisplay] = cleanTech.split('|');
				const techName = techPath.split('/').pop() || techPath;

				if (
					techName.toLowerCase() === skillName.toLowerCase() ||
					techName.toLowerCase() === skillId.toLowerCase()
				) {
					return true;
				}
			}

			return false;
		});
	}).length;
}

/**
 * Get projects that use a specific skill/technology
 * Returns an array of project names/slugs
 */
export function getProjectsUsingSkill(
	skillName: string,
	skillId: string,
	projects: Project[]
): string[] {
	const projectNames: string[] = [];

	projects.forEach(project => {
		// Add null checking for project and project.data
		if (!project || !project.data) {
			return;
		}
		const technologies = project.data.technologies || [];
		const isUsed = technologies.some((tech: string) => {
			// Clean the technology name (remove Obsidian brackets)
			const cleanTech = tech.replace(/\[\[|\]\]/g, '');

			// Check for exact match with skill name or skill ID
			if (
				cleanTech.toLowerCase() === skillName.toLowerCase() ||
				cleanTech.toLowerCase() === skillId.toLowerCase()
			) {
				return true;
			}

			// Handle pipe aliases in tech names
			if (cleanTech.includes('|')) {
				const [techPath, _techDisplay] = cleanTech.split('|');
				const techName = techPath.split('/').pop() || techPath;

				if (
					techName.toLowerCase() === skillName.toLowerCase() ||
					techName.toLowerCase() === skillId.toLowerCase()
				) {
					return true;
				}
			}

			return false;
		});

		if (isUsed) {
			projectNames.push(project.data.name || project.slug);
		}
	});

	return projectNames;
}
