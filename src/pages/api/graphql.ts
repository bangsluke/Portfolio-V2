// src/pages/api/graphql.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  
  // Proxy GraphQL requests to your backend
  const response = await fetch('YOUR_GRAPHQL_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GRAPHQL_TOKEN}`
    },
    body: JSON.stringify(body)
  });
  
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};