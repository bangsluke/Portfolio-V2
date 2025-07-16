// src/utils/cache.ts
const cache = new Map();

export async function cachedGraphQLRequest(query: string, variables: any) {
  const cacheKey = JSON.stringify({ query, variables });

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const result = await graphqlClient.request(query, variables);
  cache.set(cacheKey, result);

  return result;
}
