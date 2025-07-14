import { Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import Flicking from "@egjs/preact-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import { graphqlClient } from "../../utils/graphql-client";


interface Company {
  nodeId: string;
  name: string;
  dateStart: string | null;
  dateEnd: string | null;
  logoURL: string;
}

interface Client {
  nodeId: string;
  name: string;
  dateStart: string | null;
  dateEnd: string | null;
  logoURL: string;
}

interface CarouselItem {
  id: string;
  type: 'company' | 'client';
  title: string;
  description: string;
  image: string;
  dateRange: string;
  data: Company | Client;
}

// Helper function to format date range
function formatDateRange(startDate: string | null, endDate?: string | null): string {
  if (!startDate) {
    return 'Date not specified';
  }
  
  const start = new Date(startDate);
  const startYear = start.getFullYear();
  
  if (!endDate) {
    return `${startYear} - Present`;
  }
  
  const end = new Date(endDate);
  const endYear = end.getFullYear();
  
  if (startYear === endYear) {
    return startYear.toString();
  }
  
  return `${startYear} - ${endYear}`;
}

// Helper function to generate description
function generateDescription(item: Company | Client): string {
  const name = item.name;
  return `Professional collaboration with ${name}`;
}

export default function CustomerCarousel() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('CustomerCarousel: Loading carousel data...');
        
        const carouselItems: CarouselItem[] = [];
        const seenNodeIds = new Set<string>();
        
        // Fetch companies
        console.log('CustomerCarousel: Fetching companies...');
        const companiesQuery = `
          query GetCompanies {
            companies {
              nodeId
              name
              dateStart
              dateEnd
              logoURL
            }
          }
        `;
        
        const companiesResponse = await graphqlClient.request<{ companies: Company[] }>(companiesQuery);
        const companies = companiesResponse.companies || [];
        
        companies.forEach(company => {
          if (!seenNodeIds.has(company.nodeId)) {
            carouselItems.push({
              id: company.nodeId,
              type: 'company',
              title: company.name,
              description: generateDescription(company),
              image: company.logoURL,
              dateRange: formatDateRange(company.dateStart, company.dateEnd),
              data: company
            });
            seenNodeIds.add(company.nodeId);
          }
        });
        
        // Fetch clients
        console.log('CustomerCarousel: Fetching clients...');
        const clientsQuery = `
          query GetClients {
            clients {
              nodeId
              name
              dateStart
              dateEnd
              logoURL
            }
          }
        `;
        
        const clientsResponse = await graphqlClient.request<{ clients: Client[] }>(clientsQuery);
        const clients = clientsResponse.clients || [];
        
        clients.forEach(client => {
          if (!seenNodeIds.has(client.nodeId)) {
            carouselItems.push({
              id: client.nodeId,
              type: 'client',
              title: client.name,
              description: generateDescription(client),
              image: client.logoURL,
              dateRange: formatDateRange(client.dateStart, client.dateEnd),
              data: client
            });
            seenNodeIds.add(client.nodeId);
          }
        });
        
        // Sort by date (most recent first)
        carouselItems.sort((a, b) => {
          const dateA = new Date(a.data.dateStart || '1900-01-01').getTime();
          const dateB = new Date(b.data.dateStart || '1900-01-01').getTime();
          return dateB - dateA;
        });
        
        console.log('CustomerCarousel: Loaded carousel data:', carouselItems);
        console.log('CustomerCarousel: Number of items:', carouselItems.length);
        
        setCarouselItems(carouselItems);
      } catch (err) {
        console.error('CustomerCarousel: Error loading carousel data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load companies and clients');
      } finally {
        setLoading(false);
      }
    };

    loadCarouselData();
  }, []);

  const plugins = [new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true })];

  // Handle image load errors
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = '';
    img.alt = 'Default company/client image';
  };

  if (loading) {
    return (
      <section className="py-8 px-8 max-sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blacktext dark:text-mint-50 mb-2">
              Companies and <span className="bg-linear-to-r from-riptide-500 to-mint-500 dark:from-riptide-300 dark:to-mint-200 text-transparent bg-clip-text">Clients</span>
            </h2>
            <p className="text-lg text-blacktext dark:text-gray-200">
              Loading companies and clients...
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-8 max-sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blacktext dark:text-mint-50 mb-2">
              Companies and <span className="bg-linear-to-r from-riptide-500 to-mint-500 dark:from-riptide-300 dark:to-mint-200 text-transparent bg-clip-text">Clients</span>
            </h2>
            <p className="text-lg text-blacktext dark:text-gray-200">
              The companies and clients I have worked with
            </p>
          </div>
          <div className="text-center text-red-500">
            <p>Unable to load companies and clients data.</p>
            <p className="text-sm text-gray-500 mt-2">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (carouselItems.length === 0) {
    return (
      <section className="py-8 px-8 max-sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blacktext dark:text-mint-50 mb-2">
              Companies and <span className="bg-linear-to-r from-riptide-500 to-mint-500 dark:from-riptide-300 dark:to-mint-200 text-transparent bg-clip-text">Clients</span>
            </h2>
            <p className="text-lg text-blacktext dark:text-gray-200">
              No companies or clients data available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-8 max-sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blacktext dark:text-mint-50 mb-2">
            Companies and <span className="bg-linear-to-r from-riptide-500 to-mint-500 dark:from-riptide-300 dark:to-mint-200 text-transparent bg-clip-text">Clients</span>
          </h2>
          <p className="text-lg text-blacktext dark:text-gray-200">
            The companies and clients I have worked with
          </p>
        </div>
        
        <Flicking 
          plugins={plugins}
          className="flicking-viewport"
          style={{ 
            height: "400px",
            width: "100%",
            overflow: "hidden"
          }}
          options={{
            align: "center",
            circular: true,
            gap: 20,
            bound: false,
            adaptive: false,
            renderOnlyVisible: false
          }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="plugins-panel" style={{ width: "400px", margin: "0 10px" }}>
              <div className="relative w-[400px] h-[400px] bg-white border-2 border-white rounded-lg shadow-md overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={item.image} 
                  alt={`${item.title} logo`}
                  onError={handleImageError}
                  loading="lazy"
                />
                
                {/* Centered name overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.type === 'company' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {item.type === 'company' ? 'Company' : 'Client'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  );
}
  
