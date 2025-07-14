import { graphqlClient, graphqlRequest } from './graphql-client';

// Updated Company interface to match actual schema
export interface Company {
  nodeId: string;
  name: string;
  dateStart: string | null;
  dateEnd: string | null;
  logoURL: string;
}

// Updated Client interface to match actual schema
export interface Client {
  nodeId: string;
  name: string;
  dateStart: string | null;
  dateEnd: string | null;
  logoURL: string;
}

// Response interfaces
export interface GetCompaniesResponse {
  companies: Company[];
}

export interface GetClientsResponse {
  clients: Client[];
}

export interface GetCompanyByIdResponse {
  company: Company;
}

// Query options interface
export interface CompanyQueryOptions {
  limit?: number;
  offset?: number;
  search?: string;
  activeOnly?: boolean;
}

// Cache for companies data
const companiesCache = new Map<string, { data: Company[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Updated queries to match actual schema
const GET_COMPANIES_QUERY = `
  query GetCompanies($limit: Int, $offset: Int, $search: String, $activeOnly: Boolean) {
    companies(limit: $limit, offset: $offset, search: $search, activeOnly: $activeOnly) {
      nodeId
      name
      dateStart
      dateEnd
      logoURL
    }
  }
`;

const GET_COMPANY_BY_ID_QUERY = `
  query GetCompanyById($nodeId: String!) {
    company(nodeId: $nodeId) {
      nodeId
      name
      dateStart
      dateEnd
      logoURL
    }
  }
`;

const GET_CLIENTS_QUERY = `
  query GetClients($limit: Int, $offset: Int) {
    clients(limit: $limit, offset: $offset) {
      nodeId
      name
      dateStart
      dateEnd
      logoURL
    }
  }
`;

// Cache management functions
function getCacheKey(options: CompanyQueryOptions = {}): string {
  return JSON.stringify(options);
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

function setCache(key: string, data: Company[]): void {
  companiesCache.set(key, { data, timestamp: Date.now() });
}

function getCache(key: string): Company[] | null {
  const cached = companiesCache.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  return null;
}

// Enhanced error handling
function handleGraphQLError(error: any, operation: string): never {
  console.error(`${operation}: Error details:`, error);
  
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      throw new Error(`Network error: Cannot connect to backend server. Please ensure the backend is running.`);
    }
    
    // Timeout errors
    if (error.message.includes('timeout')) {
      throw new Error(`Request timed out. The backend may be slow or unresponsive.`);
    }
    
    // CORS errors
    if (error.message.includes('CORS')) {
      throw new Error(`CORS error. Please check backend CORS configuration.`);
    }
    
    // GraphQL errors
    if (error.message.includes('GraphQL')) {
      throw new Error(`GraphQL error: ${error.message}`);
    }
  }
  
  throw new Error(`Unknown error occurred during ${operation}: ${error}`);
}

// Main fetch functions
export async function fetchCompanies(options: CompanyQueryOptions = {}): Promise<Company[]> {
  try {
    console.log('fetchCompanies: Starting GraphQL request with options:', options);
    
    // Check cache first
    const cacheKey = getCacheKey(options);
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log('fetchCompanies: Returning cached data');
      return cachedData;
    }
    
    // Use enhanced request function with retry logic
    const response = await graphqlRequest<GetCompaniesResponse>(GET_COMPANIES_QUERY, options);
    
    console.log('fetchCompanies: GraphQL response received:', response);
    console.log('fetchCompanies: Number of companies:', response.companies?.length || 0);
    
    if (!response.companies) {
      throw new Error('Invalid response format: missing companies array');
    }
    
    // Process and validate the data
    const processedCompanies = response.companies.map(company => ({
      ...company,
      name: company.name || 'Unknown Company',
      logoURL: company.logoURL || '',
      dateStart: company.dateStart || null,
      dateEnd: company.dateEnd || null
    }));
    
    // Cache the result
    setCache(cacheKey, processedCompanies);
    
    return processedCompanies;
  } catch (error) {
    handleGraphQLError(error, 'fetchCompanies');
  }
}

export async function fetchCompanyById(nodeId: string): Promise<Company | null> {
  try {
    console.log('fetchCompanyById: Fetching company with nodeId:', nodeId);
    
    const response = await graphqlRequest<GetCompanyByIdResponse>(GET_COMPANY_BY_ID_QUERY, { nodeId });
    
    console.log('fetchCompanyById: GraphQL response received:', response);
    
    if (!response.company) {
      return null;
    }
    
    // Process and validate the data
    const processedCompany = {
      ...response.company,
      name: response.company.name || 'Unknown Company',
      logoURL: response.company.logoURL || '',
      dateStart: response.company.dateStart || null,
      dateEnd: response.company.dateEnd || null
    };
    
    return processedCompany;
  } catch (error) {
    handleGraphQLError(error, 'fetchCompanyById');
  }
}

export async function fetchClients(options: { limit?: number; offset?: number } = {}): Promise<Client[]> {
  try {
    console.log('fetchClients: Starting GraphQL request with options:', options);
    
    // Use enhanced request function with retry logic
    const response = await graphqlRequest<GetClientsResponse>(GET_CLIENTS_QUERY, options);
    
    console.log('fetchClients: GraphQL response received:', response);
    console.log('fetchClients: Number of clients:', response.clients?.length || 0);
    
    if (!response.clients) {
      throw new Error('Invalid response format: missing clients array');
    }
    
    // Process and validate the data
    const processedClients = response.clients.map(client => ({
      ...client,
      name: client.name || 'Unknown Client',
      logoURL: client.logoURL || '',
      dateStart: client.dateStart || null,
      dateEnd: client.dateEnd || null
    }));
    
    return processedClients;
  } catch (error) {
    handleGraphQLError(error, 'fetchClients');
  }
}

// Utility functions for data processing
export function getActiveCompanies(companies: Company[]): Company[] {
  return companies.filter(company => !company.dateEnd || new Date(company.dateEnd) > new Date());
}

export function searchCompanies(companies: Company[], searchTerm: string): Company[] {
  const term = searchTerm.toLowerCase();
  return companies.filter(company => 
    company.name.toLowerCase().includes(term)
  );
}

export function sortCompaniesByDate(companies: Company[], ascending: boolean = false): Company[] {
  return [...companies].sort((a, b) => {
    const dateA = new Date(a.dateStart || '1900-01-01').getTime();
    const dateB = new Date(b.dateStart || '1900-01-01').getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Cache management
export function clearCompaniesCache(): void {
  companiesCache.clear();
  console.log('Companies cache cleared');
}

export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: companiesCache.size,
    keys: Array.from(companiesCache.keys())
  };
}

// Batch operations
export async function fetchCompaniesBatch(nodeIds: string[]): Promise<Company[]> {
  try {
    console.log('fetchCompaniesBatch: Fetching companies for nodeIds:', nodeIds);
    
    const companies = await Promise.all(
      nodeIds.map(nodeId => fetchCompanyById(nodeId))
    );
    
    return companies.filter((company): company is Company => company !== null);
  } catch (error) {
    handleGraphQLError(error, 'fetchCompaniesBatch');
  }
}

// Statistics and analytics
export function getCompanyStats(companies: Company[]) {
  const total = companies.length;
  const active = getActiveCompanies(companies).length;
  
  return {
    total,
    active,
    inactive: total - active
  };
}

// Test GraphQL connection
export async function testGraphQLConnection(): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    console.log('testGraphQLConnection: Testing GraphQL connection...');
    
    const testQuery = `
      query TestConnection {
        companies(limit: 1) {
          nodeId
          name
        }
      }
    `;
    
    const response = await graphqlRequest(testQuery);
    
    console.log('testGraphQLConnection: Success - received response:', response);
    
    return {
      success: true,
      message: 'GraphQL connection successful',
      data: response
    };
  } catch (error) {
    console.error('testGraphQLConnection: Failed:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      data: null
    };
  }
}

// Export default for convenience
export default {
  fetchCompanies,
  fetchCompanyById,
  fetchClients,
  fetchCompaniesBatch,
  getActiveCompanies,
  searchCompanies,
  sortCompaniesByDate,
  clearCompaniesCache,
  getCacheStats,
  getCompanyStats,
  testGraphQLConnection
}; 