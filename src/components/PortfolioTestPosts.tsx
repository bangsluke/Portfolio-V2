// src/components/PortfolioTestPosts.tsx
import { useState, useEffect } from 'preact/hooks';
import { fetchCompanies, type Company } from '../utils/companies';
import BackendTest from './BackendTest';

export default function PortfolioTestPosts() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadCompanies = async () => {
      console.log('PortfolioTestPosts: Starting to load companies...');
      console.log('PortfolioTestPosts: Environment check - DEV:', import.meta.env.DEV);
      console.log('PortfolioTestPosts: DEV_NEXT_PUBLIC_APP_BACKEND_URL:', import.meta.env.DEV_NEXT_PUBLIC_APP_BACKEND_URL);
      console.log('PortfolioTestPosts: PROD_NEXT_PUBLIC_APP_BACKEND_URL:', import.meta.env.PROD_NEXT_PUBLIC_APP_BACKEND_URL);
      
      try {
        console.log('PortfolioTestPosts: Calling fetchCompanies...');
        const companiesData = await fetchCompanies();
        console.log('PortfolioTestPosts: Companies data received:', companiesData);
        setCompanies(companiesData);
        setLoading(false);
      } catch (err) {
        console.error('PortfolioTestPosts: Error details:', err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error('PortfolioTestPosts: Setting error message:', errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);
  
  return (
    <div className="p-4 space-y-6">
      {/* Backend Connection Test */}
      <BackendTest />
      
      {/* Companies Section */}
      <div>
        <h1 className='text-2xl font-bold dark:text-white text-blacktext mb-4'>Companies</h1>
        
        {loading && (
          <div className="text-gray-600 dark:text-gray-400">
            <div>Loading companies...</div>
            <div className="text-sm mt-2">This may take a few seconds. If it takes too long, check the browser console for errors.</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 font-medium mb-2">Error Loading Companies</div>
            <div className="text-red-600 text-sm">{error}</div>
            <div className="text-red-500 text-xs mt-2">
              <div>Debugging steps:</div>
              <div>1. Check if backend server is running on http://localhost:5001</div>
              <div>2. Open browser console (F12) for detailed error logs</div>
              <div>3. Verify .env file has correct backend URL</div>
            </div>
          </div>
        )}
        
        {!loading && !error && (
          <div className="space-y-4">
            {companies.length === 0 ? (
              <div className="text-gray-600 dark:text-gray-400">No companies found.</div>
            ) : (
              companies.map(company => (
                <div key={company.nodeId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h2 className="text-lg font-semibold dark:text-white text-blacktext">{company.name}</h2>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span>Start: {company.dateStart}</span>
                    {company.dateEnd && <span className="ml-4">End: {company.dateEnd}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}