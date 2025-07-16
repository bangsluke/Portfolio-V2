import { Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import Flicking from "@egjs/preact-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import CustomerAndClientCarouselItem from "./CustomerAndClientCarouselItem.astro";

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

export default function ClientAndCustomerCarousel({ companies }: CustomerCarouselProps) {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {

    
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

  return (
    <section className="py-8 px-8 max-sm:px-4">
      <div className="mx-auto max-w-7xl">
        
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
              <CustomerAndClientCarouselItem {...item} name={item.title} />
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  );
} 