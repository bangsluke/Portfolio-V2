// src/pages/api/posts.ts
import type { APIRoute } from 'astro';
import { graphqlClient } from '../../utils/graphql-client';

const GET_POSTS_QUERY = `
  query GetCompanies($limit: Int, $offset: Int) {
    companies(limit: $limit, offset: $offset) {
      nodeId
      name
      dateStart
      dateEnd
    }
}
  }
`;

export const GET: APIRoute = async ({ url }) => {
  const searchParams = new URL(url).searchParams;
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const data = await graphqlClient.request(GET_POSTS_QUERY, {
      limit,
      offset,
    });
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
