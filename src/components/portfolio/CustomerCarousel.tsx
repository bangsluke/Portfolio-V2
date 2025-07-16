import { Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import Flicking from "@egjs/preact-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

interface Company {
  id: string;
  slug: string;
  data: {
    created?: string | Date;
    modified?: string | Date;
    tags?: string[];
  };
}

interface CarouselItem {
  id: string;
  title: string;
  dateString: string;
  type: 'company' | 'client';
}

interface CustomerCarouselProps {
  companies: string;
}

// Helper function to format company name from slug
function formatCompanyName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function CustomerCarouselComponent({ companies }: CustomerCarouselProps) {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    console.log('=== CUSTOMER CAROUSEL TSX DEBUG ===');
    console.log('CustomerCarousel.tsx - Component mounted');
    console.log('CustomerCarousel.tsx - Companies prop received:', companies ? 'YES' : 'NO');
    console.log('CustomerCarousel.tsx - Companies prop type:', typeof companies);
    console.log('CustomerCarousel.tsx - Companies prop length:', companies?.length || 0);
    
    try {
      // Parse the JSON string back to an array
      const companiesArray: Company[] = JSON.parse(companies);
      
      // Enhanced debug logging
      console.log('CustomerCarousel.tsx - Companies parsed successfully');
      console.log('CustomerCarousel.tsx - Companies array length:', companiesArray?.length);
      console.log('CustomerCarousel.tsx - Companies array:', companiesArray);
      
      // Create carousel items from companies
      const items = companiesArray?.map(company => {
        const companyName = formatCompanyName(company.slug);
        const displayDate = company.data.created || company.data.modified;
        let dateString = '';
        
        if (displayDate) {
          if (displayDate instanceof Date) {
            dateString = displayDate.toLocaleDateString();
          } else if (typeof displayDate === 'string') {
            dateString = new Date(displayDate).toLocaleDateString();
          }
        }
        
        return {
          id: company.id,
          title: companyName,
          dateString: dateString,
          type: 'company' as const
        };
      }) || [];
      
      console.log('CustomerCarousel.tsx - Carousel items created:', items);
      console.log('CustomerCarousel.tsx - Number of carousel items:', items.length);
      
      setCarouselItems(items);
      
      // Set debug info for visual display
      setDebugInfo({
        propReceived: !!companies,
        propType: typeof companies,
        propLength: companies?.length || 0,
        parsedSuccessfully: true,
        companiesArrayLength: companiesArray?.length || 0,
        carouselItemsLength: items.length,
        firstCompany: companiesArray?.[0]?.slug || 'none'
      });
      
    } catch (error) {
      console.error('CustomerCarousel.tsx - Error parsing companies data:', error);
      console.error('CustomerCarousel.tsx - Error details:', error instanceof Error ? error.message : 'Unknown error');
      setCarouselItems([]);
      
      setDebugInfo({
        propReceived: !!companies,
        propType: typeof companies,
        propLength: companies?.length || 0,
        parsedSuccessfully: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    console.log('=== END TSX DEBUG ===');
  }, [companies]);

  const plugins = [new AutoPlay({ duration: 1000, direction: "NEXT", stopOnHover: true })];

  if (carouselItems.length === 0) {
    return (
      <section className="py-8 px-8 max-sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blacktext dark:text-mint-50 mb-2">
              Companies and <span className="bg-linear-to-r from-riptide-500 to-mint-500 dark:from-riptide-300 dark:to-mint-200 text-transparent bg-clip-text">Clients</span>
            </h2>
            <p className="text-lg text-blacktext dark:text-gray-200">
              No companies data available at the moment.
            </p>
            
            {/* Enhanced debug info */}
            <div className="mt-4 text-sm text-gray-500 bg-gray-100 p-4 rounded border">
              <h4 className="font-bold mb-2">Debug Info (TSX Component):</h4>
              <div className="text-left font-mono text-xs">
                <p>Prop received: {debugInfo.propReceived ? 'YES' : 'NO'}</p>
                <p>Prop type: {debugInfo.propType}</p>
                <p>Prop length: {debugInfo.propLength}</p>
                <p>Parsed successfully: {debugInfo.parsedSuccessfully ? 'YES' : 'NO'}</p>
                {debugInfo.companiesArrayLength !== undefined && (
                  <p>Companies array length: {debugInfo.companiesArrayLength}</p>
                )}
                <p>Carousel items: {carouselItems.length}</p>
                {debugInfo.firstCompany && (
                  <p>First company: {debugInfo.firstCompany}</p>
                )}
                {debugInfo.error && (
                  <p className="text-red-600">Error: {debugInfo.error}</p>
                )}
              </div>
            </div>
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
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    {item.dateString && (
                      <p className="text-sm text-gray-600 mb-3">{item.dateString}</p>
                    )}
                    <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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