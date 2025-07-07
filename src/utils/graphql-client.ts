// src/utils/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

// Determine the environment and use the appropriate backend URL
const isDevelopment = import.meta.env.DEV;
console.log('GraphQL Client: Environment check - isDevelopment:', isDevelopment);

// Try multiple endpoint sources
let endpoint = isDevelopment 
  ? import.meta.env.PUBLIC_APP_BACKEND_URL_DEV 
  : import.meta.env.PUBLIC_APP_BACKEND_URL_PROD;

// Fallback to local API proxy if direct backend URL is not available
if (!endpoint) {
  endpoint = isDevelopment 
    ? '/api/graphql'  // Use local API proxy
    : '/api/graphql';
  console.log('GraphQL Client: Using API proxy fallback:', endpoint);
}

console.log('GraphQL Client: Endpoint resolved:', endpoint);

if (!endpoint) {
  console.error('GraphQL Client: No endpoint configured!');
  throw new Error(
    `GraphQL endpoint not configured. Please set ${
      isDevelopment ? 'PUBLIC_APP_BACKEND_URL_DEV' : 'PUBLIC_APP_BACKEND_URL_PROD'
    } in your environment variables.`
  );
}

// Log the endpoint being used in development
if (isDevelopment) {
  console.log('GraphQL Client initialized with endpoint:', endpoint);
}

// Create GraphQL client with enhanced configuration
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  // Add request interceptor for debugging
  requestMiddleware: (request) => {
    console.log('GraphQL Client: Sending request:', {
      url: request.url,
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    return request;
  }
});

// Enhanced request function with retry logic
export const graphqlRequest = async <T = any>(
  query: string, 
  variables?: Record<string, any>,
  retries = 3
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`GraphQL Client: Attempt ${attempt}/${retries}`);
      const result = await graphqlClient.request<T>(query, variables);
      console.log('GraphQL Client: Request successful:', result);
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`GraphQL Client: Attempt ${attempt} failed:`, lastError.message);
      
      if (attempt < retries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`GraphQL Client: Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error('GraphQL request failed after all retries');
};