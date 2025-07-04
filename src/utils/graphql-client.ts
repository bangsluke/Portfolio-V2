// src/utils/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

// Determine the environment and use the appropriate backend URL
const isDevelopment = import.meta.env.DEV;
console.log('GraphQL Client: Environment check - isDevelopment:', isDevelopment);

const endpoint = isDevelopment 
  ? import.meta.env.DEV_NEXT_PUBLIC_APP_BACKEND_URL 
  : import.meta.env.PROD_NEXT_PUBLIC_APP_BACKEND_URL;

console.log('GraphQL Client: Endpoint resolved:', endpoint);

if (!endpoint) {
  console.error('GraphQL Client: No endpoint configured!');
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

const token = import.meta.env.JWT_SECRET_KEY;
console.log('GraphQL Client: Token exists:', !!token);

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});