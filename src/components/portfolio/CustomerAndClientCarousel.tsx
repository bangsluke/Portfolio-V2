import { useState, useEffect } from 'preact/hooks';
import Flicking from '@egjs/preact-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking/dist/flicking.css';

interface Company {
	id: string; // This is the filename like "Test Company.md"
	slug: string;
	data: {
		created?: string | Date;
		modified?: string | Date;
		tags?: string[];
		logoURL?: string;
		dateStart?: string | Date;
		dateEnd?: string | Date;
		companyDescription?: string;
		keyAchievement?: string;
	};
	body?: string;
	filePath?: string;
	collection?: string;
}

interface CarouselItem {
	id: string;
	title: string;
	dateString: string;
	type: 'company' | 'client';
	logoURL?: string;
	description?: string;
	slug: string;
}

interface CustomerCarouselProps {
	companies: string;
}

// Company Card Component
function CompanyCard({ item }: { item: CarouselItem }) {
	const [showModal, setShowModal] = useState(false);
	const hasLogo = item.logoURL && item.logoURL.trim() !== '';
	const fallbackColor = 'bg-gradient-to-br from-blue-500 to-purple-600';

	const showCompanyModal = () => {
		setShowModal(true);
		document.body.style.overflow = 'hidden';
	};

	const closeCompanyModal = () => {
		setShowModal(false);
		document.body.style.overflow = '';
	};

	return (
		<>
			<div 
				className="relative w-full h-full rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 transform hover:scale-105"
				style={hasLogo ? `background-image: url('${item.logoURL}'); background-size: cover; background-position: center;` : ''}
			>
				{/* Darkened overlay that lightens on hover */}
				<div className={`absolute inset-0 transition-all duration-300 ${
					hasLogo 
						? 'bg-black/70 group-hover:bg-black/30' 
						: fallbackColor + ' group-hover:opacity-80'
				}`} />
				
				{/* Content container */}
				<div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
					{/* Top section with title and date */}
					<div className="flex-1">
						<h3 className="text-xl font-bold text-white mb-2 group-hover:text-mint-400 transition-colors duration-300">
							{item.title}
						</h3>
						{item.dateString && (
							<div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
								{item.dateString}
							</div>
						)}
					</div>
					
					{/* Bottom section with info button */}
					<div className="flex justify-end">
						<button 
							className="info-button opacity-0 group-hover:opacity-100 transition-all duration-300 bg-mint-400 hover:bg-mint-500 text-black rounded-full p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0"
							aria-label={`View details for ${item.title}`}
							title={`View details for ${item.title}`}
							onClick={showCompanyModal}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Modal for company details */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeCompanyModal}>
					<div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
						<div className="p-6">
							<div className="flex justify-between items-start mb-4">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
								<button 
									onClick={closeCompanyModal}
									className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							
							<div className="mb-4">
								{item.logoURL && (
									<img src={item.logoURL} alt={`${item.title} logo`} className="w-16 h-16 object-contain rounded" />
								)}
							</div>
							{item.dateString && (
								<div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.dateString}</div>
							)}
							{item.description && (
								<div className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default function ClientAndCustomerCarousel({
	companies,
}: CustomerCarouselProps) {
	const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			const companiesArray: Company[] = JSON.parse(companies);
			
			if (!companiesArray || companiesArray.length === 0) {
				setCarouselItems([]);
				return;
			}

			// Create carousel items from companies
			const items = companiesArray.map((company) => {
				const companyName = company.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
				const displayDate = company.data.dateStart || company.data.dateEnd;
				let dateString = '';

				if (displayDate) {
					if (displayDate instanceof Date) {
						dateString = displayDate.toLocaleDateString();
					} else if (typeof displayDate === 'string' && displayDate.trim() !== '') {
						dateString = new Date(displayDate).toLocaleDateString();
					}
				}

				const item: CarouselItem = {
					id: company.id || company.slug,
					title: companyName,
					dateString: dateString,
					type: 'company',
					logoURL: company.data.logoURL,
					description: company.data.companyDescription,
					slug: company.slug,
				};
				
				return item;
			});

			setCarouselItems(items);
			setError(null);
		} catch (error) {
			console.error('Error processing companies:', error);
			setError(error instanceof Error ? error.message : 'Unknown error occurred');
			setCarouselItems([]);
		}
	}, [companies]);

	const plugins = [
		new AutoPlay({ duration: 3000, direction: 'NEXT', stopOnHover: true }),
	];

	// Error boundary
	if (error) {
		return (
			<section className="py-8 px-8 max-sm:px-4">
				<div className="mx-auto max-w-7xl">
					<div className="bg-red-500 text-white p-4 mb-4">
						Error in TypeScript Component: {error}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-8 px-8 max-sm:px-4">
			<div className="mx-auto max-w-7xl">
				{carouselItems.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-gray-600 dark:text-gray-400 mb-4">
							Loading...
						</p>
					</div>
				) : (
					<Flicking
						plugins={plugins}
						className="flicking-viewport"
						style={{
							height: '300px',
							width: '100%',
							overflow: 'hidden',
						}}
						options={{
							align: 'center',
							circular: true,
							gap: 20,
							bound: false,
							adaptive: false,
							renderOnlyVisible: false,
						}}>
						{carouselItems.map(item => (
							<div
								key={item.id}
								className="plugins-panel"
								style={{ width: '280px', height: '280px', margin: '0 10px' }}>
								<CompanyCard item={item} />
							</div>
						))}
					</Flicking>
				)}
			</div>
		</section>
	);
}
