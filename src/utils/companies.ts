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
    const response = await graphqlClient.request<GetCompaniesResponse>(
      GET_COMPANIES_QUERY
    );
    return response.companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
} 