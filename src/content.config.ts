import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

// Static data: single JSON file exposed as one entry
const staticDataCollection = defineCollection({
	loader: file('./src/content/staticData/allStaticData.json', {
		parser: (text) => {
			const data = JSON.parse(text) as Record<string, unknown>;
			return [{ id: 'default', ...data }];
		},
	}),
	schema: z.object({
		profileImage: z.string(),
		profileAlt: z.string(),
		profileLink: z.string(),
		profileTitle: z.string(),
		profileName: z.string(),
		github: z.string(),
		githubText: z.string(),
		portfolioImage: z.string(),
		email: z.string(),
		linkedin: z.string(),
		alias: z.string(),
		contactSectionSubtitle: z.string(),
		contactSectionSubtitle2: z.string(),
		contactSectionButtonText: z.string(),
		skillsTitle: z.string(),
		instagramIconName: z.string(),
		youtubeIconName: z.string(),
		githubIconName: z.string(),
		linkedinIconName: z.string(),
		emailIconName: z.string(),
	}),
});

const projectsCollection = defineCollection({
	loader: glob({
		base: './src/content/projects',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		name: z.string().optional(),
		tags: z.array(z.string()).optional(),
		projectURL: z.union([z.string(), z.null()]).optional(),
		codeURL: z.union([z.string(), z.null()]).optional(),
		codeMultipleRepos: z.union([z.boolean(), z.null()]).optional(),
		folderURL: z.union([z.string(), z.null()]).optional(),
		logoURL: z.union([z.string(), z.null()]).optional(),
		imageURL: z.union([z.string(), z.null()]).optional(),
		dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
		dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
		technologies: z.union([z.array(z.string()), z.null()]).optional(),
		projectCategory: z.union([z.string(), z.null()]).optional(),
		linkedCompany: z.array(z.string()).optional(),
		portfolioOrder: z.union([z.number(), z.null()]).optional(),
		toolOwner: z.union([z.string(), z.null()]).optional(),
		developers: z.array(z.string()).optional(),
		topicTags: z.array(z.string()).optional(),
		version: z.union([z.number(), z.null()]).optional(),
		shortDescription: z.union([z.string(), z.null()]).optional(),
		longDescription: z.union([z.string(), z.null()]).optional(),
		lessonsLearned: z.union([z.string(), z.null()]).optional(),
	}),
});

const skillsCollection = defineCollection({
	loader: glob({
		base: './src/content/skills',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		name: z.string().optional(),
		tags: z.array(z.string()).optional(),
		// Obsidian frontmatter `aliases:` can be a list, a string, or left blank.
		aliases: z
			.union([
				z.array(z.string()),
				z.string(),
				z.record(z.string(), z.unknown()),
				z.null(),
			])
			.optional(),
		skillRating: z.number().optional(),
		skillDescription: z.string().optional(),
		logoFileName: z.union([z.string(), z.null()]).optional(),
	}),
});

const companiesCollection = defineCollection({
	loader: glob({
		base: './src/content/companies',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		tags: z.array(z.string()).optional(),
		dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
		dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
		logoURL: z.union([z.string(), z.null()]).optional(),
		imageURL: z.union([z.string(), z.null()]).optional(),
		companyDescription: z.string().optional(),
		keyAchievement: z.string().optional(),
	}),
});

const clientsCollection = defineCollection({
	loader: glob({
		base: './src/content/clients',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		name: z.string().optional(),
		tags: z.array(z.string()).optional(),
		dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
		dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
		imageURL: z.union([z.string(), z.null()]).optional(),
		logoURL: z.union([z.string(), z.null()]).optional(),
		linkedCompany: z
			.union([z.string(), z.array(z.string()), z.null()])
			.optional(),
	}),
});

const rolesCollection = defineCollection({
	loader: glob({
		base: './src/content/roles',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		name: z.string().optional(),
		tags: z.array(z.string()).optional(),
		dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
		dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
		linkedCompany: z.array(z.string()).optional(),
		shortRoleDescription: z.string().optional(),
		fullRoleDescription: z.string().optional(),
		roleDescription: z.string().optional(),
		keyAchievement: z.string().optional(),
	}),
});

const educationsCollection = defineCollection({
	loader: glob({
		base: './src/content/educations',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		name: z.string().optional(),
		tags: z.array(z.string()).optional(),
		dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
		dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
		logoURL: z.union([z.string(), z.null()]).optional(),
		qualifications: z.string().optional(),
		additionalDetails: z.string().optional(),
	}),
});

const referencesCollection = defineCollection({
	loader: glob({
		base: './src/content/references',
		pattern: '**/*.md',
		generateId: ({ entry }) => entry,
	}),
	schema: z.object({
		name: z.string().optional(),
		tags: z.array(z.string()).optional(),
		linkedCompany: z.array(z.string()).optional(),
		referenceRole: z.string().optional(),
		referenceEmail: z.string().optional(),
		referenceNumber: z.string().optional(),
		referenceAddress: z.string().optional(),
		portfolioOrder: z.union([z.number(), z.null()]).optional(),
	}),
});

export const collections = {
	staticData: staticDataCollection,
	projects: projectsCollection,
	skills: skillsCollection,
	companies: companiesCollection,
	clients: clientsCollection,
	roles: rolesCollection,
	educations: educationsCollection,
	references: referencesCollection,
};
