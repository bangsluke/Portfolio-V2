import { useState, useEffect } from 'preact/hooks';
import { graphqlClient } from '../utils/graphql-client';

interface Company {
  nodeId: string;
  name: string;
}

export default function CompaniesList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const query = `
          query GetCompanies {
            companies {
              nodeId
              name
            }
          }
        `;

        const response = await graphqlClient.request<{ companies: Company[] }>(query);
        setCompanies(response.companies || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err instanceof Error ? err.message : 'Failed to load companies');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="text-gray-600">Loading companies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Companies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Companies I've worked with and contributed to throughout my career.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">No companies found.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.nodeId}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {company.name}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {company.nodeId}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total companies: {companies.length}
          </div>
        </div>
      </div>
    </section>
  );
} 