import { defineCollection, z } from 'astro:content';

// Define the staticData collection schema
const staticDataCollection = defineCollection({
  type: 'data',
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
    contactSectionTitle: z.string(),
    contactSectionSubtitle: z.string(),
    contactSectionSubtitle2: z.string(),
    contactSectionButtonText: z.string(),
    contactSectionButtonIcon: z.string(),
    techsTitle: z.string(),
    instagramIconName: z.string(),
    youtubeIconName: z.string(),
    githubIconName: z.string(),
    linkedinIconName: z.string(),
    emailIconName: z.string(),
  }),
});

// Define projects collection schema based on actual project files
const projectsCollection = defineCollection({
  type: 'content',
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
    toolOwner: z.union([z.string(), z.null()]).optional(),
    developers: z.array(z.string()).optional(),
    topicTags: z.array(z.string()).optional(),
    version: z.union([z.number(), z.null()]).optional(),
    // Extracted section content
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    lessonsLearned: z.string().optional(),
  }),
});

// Define skills collection schema based on actual skill files
const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().optional(),
    tags: z.array(z.string()).optional(),
    skillRating: z.number().optional(),
    skillDescription: z.string().optional(),
    imageURL: z.union([z.string(), z.null()]).optional(),
    // Extracted section content
    keyAchievement: z.string().optional(),
  }),
});

// Define companies collection schema based on actual company files
const companiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    tags: z.array(z.string()).optional(),
    dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
    dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
    logoURL: z.string().optional(),
    imageURL: z.union([z.string(), z.null()]).optional(),
    // Extracted section content
    companyDescription: z.string().optional(),
    keyAchievement: z.string().optional(),
  }),
});

// Define clients collection schema based on actual client files
const clientsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().optional(),
    tags: z.array(z.string()).optional(),
    dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
    dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
    imageURL: z.union([z.string(), z.null()]).optional(),
    linkedCompany: z.string().optional(),
    // Extracted section content
    clientDescription: z.string().optional(),
    keyAchievement: z.string().optional(),
  }),
});

// Define roles collection schema based on actual role files
const rolesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().optional(),
    tags: z.array(z.string()).optional(),
    dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
    dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
    linkedCompany: z.array(z.string()).optional(),
    // Extracted section content
    roleDescription: z.string().optional(),
    keyAchievement: z.string().optional(),
  }),
});

// Define educations collection schema based on actual education files
const educationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().optional(),
    tags: z.array(z.string()).optional(),
    dateStart: z.union([z.string(), z.date(), z.null()]).optional(),
    dateEnd: z.union([z.string(), z.date(), z.null()]).optional(),
    logoURL: z.union([z.string(), z.null()]).optional(),
    // Extracted section content
    qualifications: z.string().optional(),
    additionalDetails: z.string().optional(),
  }),
});

// Define references collection schema based on actual reference files
const referencesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().optional(),
    tags: z.array(z.string()).optional(),
    linkedCompany: z.array(z.string()).optional(),
    referenceRole: z.string().optional(),
    referenceEmail: z.string().optional(),
    referenceNumber: z.string().optional(),
    referenceAddress: z.string().optional(),
    // Extracted section content
    referenceDescription: z.string().optional(),
    keyAchievement: z.string().optional(),
  }),
});

export const collections = {
  'staticData': staticDataCollection,
  'projects': projectsCollection,
  'skills': skillsCollection,
  'companies': companiesCollection,
  'clients': clientsCollection,
  'roles': rolesCollection,
  'educations': educationsCollection,
  'references': referencesCollection,
}; 