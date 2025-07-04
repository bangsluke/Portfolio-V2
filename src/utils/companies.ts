import { graphqlClient } from './graphql-client';

export interface Company {
  nodeId: string;
  name: string;
  dateStart: string;
  dateEnd: string | null;
}

export interface GetCompaniesVariables {
  limit?: number;
  offset?: number;
}

export interface GetCompaniesResponse {
  companies: Company[];
}

const GET_COMPANIES_QUERY = `
  query GetCompanies($limit: Int, $offset: Int) {
    companies(limit: $limit, offset: $offset) {
      nodeId
      name
      dateStart
      dateEnd
    }
  }
`;

export async function fetchCompanies(variables: GetCompaniesVariables = {}): Promise<Company[]> {
  try {
    const response = await graphqlClient.request<GetCompaniesResponse>(
      GET_COMPANIES_QUERY,
      variables
    );
    return response.companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
} 