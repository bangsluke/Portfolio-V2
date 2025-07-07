import { graphqlClient } from './graphql-client';

export interface Company {
  nodeId: string;
  name: string;
  dateStart: string;
  dateEnd: string | null;
}

export interface GetCompaniesResponse {
  companies: Company[];
}

const GET_COMPANIES_QUERY = `
  query GetCompanies {
    companies {
      nodeId
      name
    }
  }
`;

export async function fetchCompanies(): Promise<Company[]> {
  try {
    console.log('fetchCompanies: Starting GraphQL request...');
    console.log('fetchCompanies: Using query:', GET_COMPANIES_QUERY);
    
    const response = await graphqlClient.request<GetCompaniesResponse>(GET_COMPANIES_QUERY);
    
    console.log('fetchCompanies: GraphQL response received:', response);
    console.log('fetchCompanies: Companies array:', response.companies);
    console.log('fetchCompanies: Number of companies:', response.companies?.length || 0);
    
    if (!response.companies) {
      console.error('fetchCompanies: No companies array in response');
      throw new Error('Invalid response format: missing companies array');
    }
    
    return response.companies;
  } catch (error) {
    console.error('fetchCompanies: Error fetching companies:', error);
    console.error('fetchCompanies: Error type:', typeof error);
    console.error('fetchCompanies: Error instanceof Error:', error instanceof Error);
    
    if (error instanceof Error) {
      console.error('fetchCompanies: Error message:', error.message);
      console.error('fetchCompanies: Error stack:', error.stack);
      
      // Check for specific error types
      if (error.message.includes('fetch')) {
        console.error('fetchCompanies: Network error - backend may not be running');
        throw new Error('Cannot connect to backend server. Please ensure the backend is running on http://localhost:5001');
      }
      
      if (error.message.includes('timeout')) {
        console.error('fetchCompanies: Request timed out');
        throw new Error('Request timed out. The backend may be slow or unresponsive.');
      }
      
      if (error.message.includes('CORS')) {
        console.error('fetchCompanies: CORS error');
        throw new Error('CORS error. Please check backend CORS configuration.');
      }
    }
    
    throw error;
  }
} 