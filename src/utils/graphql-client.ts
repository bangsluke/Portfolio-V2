// src/utils/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

// Determine the environment and use the appropriate backend URL
const isDevelopment = import.meta.env.DEV;
const endpoint = isDevelopment 
  ? import.meta.env.DEV_NEXT_PUBLIC_APP_BACKEND_URL 
  : import.meta.env.PROD_NEXT_PUBLIC_APP_BACKEND_URL;

if (!endpoint) {
  throw new Error(
    `GraphQL endpoint not configured. Please set ${
      isDevelopment ? 'DEV_NEXT_PUBLIC_APP_BACKEND_URL' : 'PROD_NEXT_PUBLIC_APP_BACKEND_URL'
    } in your environment variables.`
  );
}

// Log the endpoint being used in development
if (isDevelopment) {
  console.log('GraphQL Client initialized with endpoint:', endpoint);
}

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${import.meta.env.GRAPHQL_TOKEN}`,
  },
});