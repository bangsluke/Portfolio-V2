// src/pages/api/graphql.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();

		// Get the backend URL from environment variables
		const isDevelopment = import.meta.env.DEV;
		const backendUrl = isDevelopment
			? process.env.PUBLIC_APP_BACKEND_URL_DEV
			: process.env.PUBLIC_APP_BACKEND_URL_PROD;

		console.log('API Proxy: Backend URL:', backendUrl);
		console.log('API Proxy: Request body:', body);

		if (!backendUrl) {
			console.error('API Proxy: No backend URL configured');
			return new Response(
				JSON.stringify({
					errors: [{ message: 'Backend URL not configured' }],
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Proxy GraphQL requests to your backend
		const response = await fetch(backendUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.GRAPHQL_TOKEN || ''}`,
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();
		console.log('API Proxy: Response status:', response.status);
		console.log('API Proxy: Response data:', data);

		return new Response(JSON.stringify(data), {
			status: response.status,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		});
	} catch (error) {
		console.error('API Proxy: Error:', error);
		return new Response(
			JSON.stringify({
				errors: [
					{ message: error instanceof Error ? error.message : 'Unknown error' },
				],
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};

export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
};
