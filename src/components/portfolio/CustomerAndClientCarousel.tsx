import { useState, useEffect } from 'preact/hooks';
import Flicking from '@egjs/preact-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking/dist/flicking.css';

interface Company {
	id: string;
	slug: string;
	type: 'company';
	data: {
		logoURL?: string;
		dateStart?: string | Date;
		dateEnd?: string | Date;
		companyDescription?: string;
		keyAchievement?: string;
	};
}

interface Client {
	id: string;
	slug: string;
	type: 'client';
	data: {
		name?: string;
		imageURL?: string;
		logoURL?: string;
		dateStart?: string | Date;
		dateEnd?: string | Date;
		linkedCompany?: string | string[];
		clientDescription?: string;
		keyAchievement?: string;
	};
}

type CarouselItemData = Company | Client;

interface CarouselItem {
	id: string;
	title: string;
	dateString: string;
	type: 'company' | 'client';
	logoURL?: string;
	imageURL?: string;
	description?: string;
	slug: string;
	linkedCompany?: string;
}

interface CustomerCarouselProps {
	companies: string;
}

// Company Card Component
function CompanyCard({ item }: { item: CarouselItem }) {
	const [showModal, setShowModal] = useState(false);
	
	// Handle both companies (logoURL) and clients (imageURL or logoURL)
	const hasLogo = item.logoURL && item.logoURL.trim() !== '';
	const hasImage = item.imageURL && item.imageURL.trim() !== '';
	const backgroundImage = item.logoURL || item.imageURL;
	const hasBackground = hasLogo || hasImage;
	
	const fallbackColor = item.type === 'client' 
		? 'bg-gradient-to-br from-green-500 to-teal-600' 
		: 'bg-gradient-to-br from-blue-500 to-purple-600';

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
				style={hasBackground ? `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;` : ''}
			>
				{/* Darkened overlay that lightens on hover */}
				<div className={`absolute inset-0 transition-all duration-300 ${
					hasBackground 
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
						{item.linkedCompany && item.linkedCompany !== 'n/a' && (
							<div className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
								Linked: {item.linkedCompany}
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

			{/* Modal for company/client details */}
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
								{backgroundImage && (
									<img src={backgroundImage} alt={`${item.title} ${item.type === 'client' ? 'image' : 'logo'}`} className="w-16 h-16 object-contain rounded" />
								)}
							</div>
							{item.dateString && (
								<div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.dateString}</div>
							)}
							{item.description && (
								<div className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</div>
							)}
							{item.linkedCompany && item.linkedCompany !== 'n/a' && (
								<div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									<strong>Linked Company:</strong> {item.linkedCompany}
								</div>
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
			const companiesArray: CarouselItemData[] = JSON.parse(companies);
			
			if (!companiesArray || companiesArray.length === 0) {
				setCarouselItems([]);
				return;
			}

			// Create carousel items from companies
			const items = companiesArray.map((company) => {
				let item: CarouselItem;
				if (company.type === 'company') {
					const companyName = company.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
					const dateStart = company.data.dateStart;
					const dateEnd = company.data.dateEnd;
					let dateString = '';

					// Process date range
					if (dateStart) {
						const startDate = dateStart instanceof Date ? dateStart : new Date(dateStart);
						const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
						
						if (dateEnd && dateEnd !== 'TBD' && dateEnd !== '') {
							const endDate = dateEnd instanceof Date ? dateEnd : new Date(dateEnd);
							const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
							dateString = `${startFormatted} - ${endFormatted}`;
						} else {
							dateString = `${startFormatted} - Current`;
						}
					}

					item = {
						id: company.id || company.slug,
						title: companyName,
						dateString: dateString,
						type: 'company',
						logoURL: company.data.logoURL,
						description: company.data.companyDescription,
						slug: company.slug,
					};
				} else if (company.type === 'client') {
					const clientName = company.data.name || company.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
					const dateStart = company.data.dateStart;
					const dateEnd = company.data.dateEnd;
					let dateString = '';

					// Process date range
					if (dateStart) {
						const startDate = dateStart instanceof Date ? dateStart : new Date(dateStart);
						const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
						
						if (dateEnd && dateEnd !== 'TBD' && dateEnd !== '') {
							const endDate = dateEnd instanceof Date ? dateEnd : new Date(dateEnd);
							const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
							dateString = `${startFormatted} - ${endFormatted}`;
						} else {
							dateString = `${startFormatted} - Current`;
						}
					}

					// Handle linkedCompany as either string or array
					let linkedCompany = '';
					if (company.data.linkedCompany) {
						if (Array.isArray(company.data.linkedCompany)) {
							linkedCompany = company.data.linkedCompany.join(', ');
						} else {
							linkedCompany = company.data.linkedCompany;
						}
					}

					item = {
						id: company.id || company.slug,
						title: clientName,
						dateString: dateString,
						type: 'client',
						imageURL: company.data.imageURL,
						logoURL: company.data.logoURL,
						description: company.data.clientDescription,
						slug: company.slug,
						linkedCompany: linkedCompany,
					};
				} else {
					// Handle other types if necessary
					return null;
				}
				
				return item;
			}).filter(item => item !== null) as CarouselItem[]; // Filter out null items

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
