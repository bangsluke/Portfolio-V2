<p align="center">
  <img src="https://i.imgur.com/QL72TPw.png" alt="bangsluke Logo" width="200"/>
</p>

# Portfolio Site V2

> A personal portfolio website for displaying my skills and past projects.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9ed7eb9-789c-4a7c-b069-b9aebb73c553/deploy-status)](https://app.netlify.com/projects/bangsluke-portfolio/deploys)

> Also see the backend server repo <https://github.com/bangsluke/bangsluke-backend-server> for more details and instructions

## Table of Contents

- Introduction
- Quick Start
  - Development Start
  - Production Start

## Introduction

The front end Next.js repository for MyTravelJournal

> [Back to Table of Contents](#table-of-contents)

## Quick start

### Development Start

- Use `npm run dev` to start the development server
- Open `localhost:4321` to see the development site

<!-- TODO: Update list -->

> [Back to Table of Contents](#table-of-contents)

### Production Start

To quickly get started in production mode, do the following steps:

<!-- TODO: Update list -->

> [Back to Table of Contents](#table-of-contents)

## How it Works

### GraphQL Connection

The GraphQL client (`src/utils/graphql-client.ts`) automatically detects the environment:

- **Development**: Uses `PUBLIC_APP_BACKEND_URL_DEV`
- **Production**: Uses `PUBLIC_APP_BACKEND_URL_PROD`

### Example Usage

```typescript
import { graphqlClient } from '../utils/graphql-client';
import { fetchCompanies } from '../utils/companies';

// Make GraphQL requests
const companies = await fetchCompanies({ limit: 10, offset: 0 });
```

### Error Handling

If the environment variables are not set, the client will throw a descriptive error indicating which variable is missing.

> [Back to Table of Contents](#table-of-contents)

## GraphQL Setup

### Schema and Updates

The GraphQL schema is defined in the backend server and can be updated by modifying the schema files. The frontend automatically adapts to schema changes through the GraphQL client.

#### Current Schema Structure

The backend provides the following main types:

- **Company**: `{ nodeId, name, dateStart, dateEnd }`
- **Role**: `{ nodeId, name, dateStart, dateEnd, roleDescription }`
- **Project**: `{ nodeId, title, description, technologies, githubUrl, liveUrl, imageUrl }`

#### Adding New Fields

To add new fields to existing types:

1. **Backend**: Update the GraphQL schema in the backend server
2. **Frontend**: Update the corresponding TypeScript interfaces in the utils files
3. **Frontend**: Update any queries that use the modified type

Example - Adding a `description` field to Company:

```typescript
// Backend schema update
type Company {
  nodeId: String!
  name: String!
  dateStart: String!
  dateEnd: String
  description: String  # New field
}

// Frontend interface update (src/utils/companies.ts)
export interface Company {
  nodeId: string;
  name: string;
  dateStart: string;
  dateEnd: string | null;
  description?: string;  // New field
}

// Frontend query update
const GET_COMPANIES_QUERY = `
  query GetCompanies {
    companies {
      nodeId
      name
      dateStart
      dateEnd
      description  # New field
    }
  }
`;
```

#### Schema Validation

The GraphQL client automatically validates queries against the backend schema. If a query requests a field that doesn't exist, the backend will return an error with details about the missing field.

### Extending the Schema

#### Adding New Types

To add completely new types to the schema:

1. **Backend**: Define the new type in the GraphQL schema
2. **Frontend**: Create a new utility file for the type
3. **Frontend**: Define TypeScript interfaces and queries
4. **Frontend**: Create fetch functions

Example - Adding a `Skill` type:

```typescript
// 1. Backend schema (in backend server)
type Skill {
  nodeId: String!
  name: String!
  category: String!
  proficiency: Int!
  yearsOfExperience: Int!
}

// 2. Frontend utility file (src/utils/skills.ts)
export interface Skill {
  nodeId: string;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
}

export interface GetSkillsResponse {
  skills: Skill[];
}

const GET_SKILLS_QUERY = `
  query GetSkills {
    skills {
      nodeId
      name
      category
      proficiency
      yearsOfExperience
    }
  }
`;

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const response = await graphqlClient.request<GetSkillsResponse>(GET_SKILLS_QUERY);
    
    if (!response.skills) {
      throw new Error('Invalid response format: missing skills array');
    }
    
    return response.skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}
```

#### Adding New Queries

To add new queries for existing types:

1. **Frontend**: Add the new query to the appropriate utility file
2. **Frontend**: Create a new fetch function
3. **Frontend**: Update components to use the new function

Example - Adding a query to get companies by date range:

```typescript
// In src/utils/companies.ts
const GET_COMPANIES_BY_DATE_RANGE_QUERY = `
  query GetCompaniesByDateRange($startDate: String!, $endDate: String!) {
    companies(where: { dateStart: { gte: $startDate }, dateEnd: { lte: $endDate } }) {
      nodeId
      name
      dateStart
      dateEnd
    }
  }
`;

export async function fetchCompaniesByDateRange(
  startDate: string, 
  endDate: string
): Promise<Company[]> {
  try {
    const response = await graphqlClient.request<GetCompaniesResponse>(
      GET_COMPANIES_BY_DATE_RANGE_QUERY,
      { startDate, endDate }
    );
    
    if (!response.companies) {
      throw new Error('Invalid response format: missing companies array');
    }
    
    return response.companies;
  } catch (error) {
    console.error('Error fetching companies by date range:', error);
    throw error;
  }
}
```

#### Adding Query Parameters

To add parameters to existing queries:

1. **Frontend**: Update the query to include variables
2. **Frontend**: Update the fetch function to accept parameters
3. **Frontend**: Pass parameters to the GraphQL client

Example - Adding pagination to companies query:

```typescript
// Updated query with parameters
const GET_COMPANIES_PAGINATED_QUERY = `
  query GetCompanies($limit: Int, $offset: Int) {
    companies(limit: $limit, offset: $offset) {
      nodeId
      name
      dateStart
      dateEnd
    }
  }
`;

// Updated fetch function
export async function fetchCompanies(
  options: { limit?: number; offset?: number } = {}
): Promise<Company[]> {
  try {
    const { limit, offset } = options;
    const response = await graphqlClient.request<GetCompaniesResponse>(
      GET_COMPANIES_PAGINATED_QUERY,
      { limit, offset }
    );
    
    if (!response.companies) {
      throw new Error('Invalid response format: missing companies array');
    }
    
    return response.companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}
```

#### Best Practices

1. **Type Safety**: Always define TypeScript interfaces for your GraphQL types
2. **Error Handling**: Include proper error handling in fetch functions
3. **Query Organization**: Keep related queries in the same utility file
4. **Naming Conventions**: Use descriptive names for queries and functions
5. **Documentation**: Add comments explaining complex queries or business logic
6. **Testing**: Test new queries in the GraphQL playground before implementing

#### Debugging Schema Changes

If you encounter issues after schema changes:

1. **Check the GraphQL Playground**: Test queries directly in the backend GraphQL playground
2. **Review Error Messages**: GraphQL provides detailed error messages for schema mismatches
3. **Use the Debug Page**: Navigate to `/debug` to test the connection and see detailed error information
4. **Check Console Logs**: Look for GraphQL errors in the browser console




## Debugging Problems

### Connection Problems

If the problem is a connection issue between the backend server and front end website, navigate to `http://localhost:4321/debug` to see a connection test

> [Back to Table of Contents](#table-of-contents)