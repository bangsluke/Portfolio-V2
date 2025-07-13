import { graphqlClient } from './graphql-client';

// Define the GetRoles query directly in this file
const GET_ROLES_QUERY = `
query GetRoles {
    roles {
      nodeId
      name
      dateStart
      dateEnd
      roleDescription
      linkedCompany {
        name
      }
    }
}
`;

export interface Role {
  nodeId: string;
  name: string;
  dateStart: string;
  dateEnd: string | null;
  roleDescription: string;
  linkedCompany: {
    name: string;
  };
}

export interface GetRolesResponse {
  roles: Role[];
}

export async function fetchRoles(): Promise<Role[]> {
  try {
    console.log('fetchRoles: Starting GraphQL request...');
    console.log('fetchRoles: Using query:', GET_ROLES_QUERY);
    
    const response = await graphqlClient.request<GetRolesResponse>(GET_ROLES_QUERY);
    
    console.log('fetchRoles: GraphQL response received:', response);
    console.log('fetchRoles: Roles array:', response.roles);
    console.log('fetchRoles: Number of roles:', response.roles?.length || 0);
    
    if (!response.roles) {
      console.error('fetchRoles: No roles array in response');
      throw new Error('Invalid response format: missing roles array');
    }
    
    return response.roles;
  } catch (error) {
    console.error('fetchRoles: Error fetching roles:', error);
    console.error('fetchRoles: Error type:', typeof error);
    console.error('fetchRoles: Error instanceof Error:', error instanceof Error);
    
    if (error instanceof Error) {
      console.error('fetchRoles: Error message:', error.message);
      console.error('fetchRoles: Error stack:', error.stack);
      
      // Check for specific error types
      if (error.message.includes('fetch')) {
        console.error('fetchRoles: Network error - backend may not be running');
        throw new Error('Cannot connect to backend server. Please ensure the backend is running on http://localhost:5001');
      }
      
      if (error.message.includes('timeout')) {
        console.error('fetchRoles: Request timed out');
        throw new Error('Request timed out. The backend may be slow or unresponsive.');
      }
      
      if (error.message.includes('CORS')) {
        console.error('fetchRoles: CORS error');
        throw new Error('CORS error. Please check backend CORS configuration.');
      }
    }
    
    throw error;
  }
} 