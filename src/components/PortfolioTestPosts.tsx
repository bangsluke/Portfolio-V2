// src/components/PortfolioTestPosts.tsx
import { useState, useEffect } from 'preact/hooks';
import { fetchCompanies, type Company } from '../utils/companies';

export default function PortfolioTestPosts() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const companiesData = await fetchCompanies({ limit: 10, offset: 0 });
        setCompanies(companiesData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);
  
  if (loading) return (
    <div className="p-4">
      <h1 className='text-2xl font-bold dark:text-white text-blacktext mb-4'>Companies</h1>
      <div className="text-gray-600 dark:text-gray-400">Loading companies...</div>
    </div>
  );

  if (error) return (
    <div className="p-4">
      <h1 className='text-2xl font-bold dark:text-white text-blacktext mb-4'>Companies</h1>
      <div className="text-red-600 dark:text-red-400">Error: {error}</div>
    </div>
  );
  
  return (
    <div className="p-4">
      <h1 className='text-2xl font-bold dark:text-white text-blacktext mb-4'>Companies</h1>
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
    </div>
  );
}