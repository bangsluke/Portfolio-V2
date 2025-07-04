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
      dateStart
      dateEnd
    }
  }
`;

export async function fetchCompanies(): Promise<Company[]> {
  try {
    console.log('fetchCompanies: Starting GraphQL request...');
    console.log('fetchCompanies: Using query:', GET_COMPANIES_QUERY);
    
    const response = await graphqlClient.request<GetCompaniesResponse>(
      GET_COMPANIES_QUERY
    );
    
    console.log('fetchCompanies: GraphQL response received:', response);
    console.log('fetchCompanies: Companies array:', response.companies);
    
    return response.companies;
  } catch (error) {
    console.error('fetchCompanies: Error fetching companies:', error);
    console.error('fetchCompanies: Error type:', typeof error);
    console.error('fetchCompanies: Error instanceof Error:', error instanceof Error);
    if (error instanceof Error) {
      console.error('fetchCompanies: Error message:', error.message);
      console.error('fetchCompanies: Error stack:', error.stack);
    }
    throw error;
  }
} 