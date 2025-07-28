import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking/dist/flicking.css';
import Flicking from '@egjs/preact-flicking';
import { useEffect, useRef, useState } from 'preact/hooks';
import { extractNameFromFilename } from '../../utils/filename-utils';

interface Company {
	id: string;
	slug: string;
	type: 'company';
	data: {
		name?: string;
		logoURL?: string;
		dateStart?: string | Date;
		dateEnd?: string | Date;
	};
}

interface Client {
	id: string;
	slug: string;
	type: 'client';
	data: {
		name?: string;
		logoURL?: string;
		dateStart?: string | Date;
		dateEnd?: string | Date;
	};
}

type CarouselItemData = Company | Client;

interface CarouselItem {
	id: string;
	title: string;
	dateString: string;
	type: 'company' | 'client';
	logoURL?: string;
}

interface CustomerCarouselProps {
	companies: string;
}

// Company Card Component
function CompanyCard({
	item,
	isSelected,
	onClick,
}: {
	item: CarouselItem;
	isSelected: boolean;
	onClick: () => void;
}) {
	const [showModal, setShowModal] = useState(false);

	// Handle both companies (logoURL) and clients (imageURL or logoURL)
	const hasLogo = item.logoURL && item.logoURL.trim() !== '';
	const backgroundImage = item.logoURL;
	const hasBackground = hasLogo;

	const fallbackColor =
		item.type === 'client'
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

	// Handle card click - on mobile, show modal; on desktop, select item
	const handleCardClick = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// Check if it's mobile (touch device or small screen)
		const isMobile = 'ontouchstart' in window || window.innerWidth <= 768;

		if (isMobile) {
			showCompanyModal();
		} else {
			onClick();
		}
	};

	return (
		<>
			<div
				className={`relative w-full h-full rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
					isSelected ? 'ring-4 ring-theme-400 scale-105 brightness-110' : ''
				}`}
				style={
					hasBackground
						? `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`
						: ''
				}
				onClick={handleCardClick}>
				{/* Darkened overlay that lightens on hover - removed when selected */}
				{!isSelected && (
					<div
						className={`absolute inset-0 transition-all duration-300 ${
							hasBackground
								? 'bg-black/20 dark:bg-black/50 group-hover:bg-black/5'
								: fallbackColor + ' group-hover:opacity-80'
						}`}
					/>
				)}

				{/* Content container */}
				<div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
					{/* Top section with title and date */}
					<div className="flex-1">
						<div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 -m-3">
							<h3
								className={`text-xl font-bold mb-2 transition-colors duration-300 ${
									isSelected
										? 'text-theme-400'
										: 'text-white group-hover:text-theme-400'
								}`}>
								{item.title}
							</h3>
							{item.dateString && (
								<div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
									{item.dateString}
								</div>
							)}
						</div>
					</div>

					{/* Mobile tap indicator */}
					<div className="md:hidden text-xs text-white/60 text-center mt-2">
						Tap for details
					</div>
				</div>
			</div>

			{/* Enhanced Modal for company/client details */}
			{showModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={closeCompanyModal}>
					<div
						className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
						onClick={e => e.stopPropagation()}>
						<div className="p-6">
							<div className="flex justify-between items-start mb-4">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">
									{item.title}
								</h3>
								<button
									onClick={closeCompanyModal}
									className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="mb-4">
								{backgroundImage && (
									<img
										src={backgroundImage}
										alt={`${item.title} logo`}
										className="w-16 h-16 object-contain rounded"
									/>
								)}
							</div>
							{item.dateString && (
								<div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									<strong>Duration:</strong> {item.dateString}
								</div>
							)}
							<div className="text-sm text-gray-600 dark:text-gray-400">
								<strong>Type:</strong>{' '}
								{item.type === 'company' ? 'Company' : 'Client'}
							</div>
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
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const flickingRef = useRef<any>(null);

	useEffect(() => {
		try {
			const companiesArray: CarouselItemData[] = JSON.parse(companies);

			if (!companiesArray || companiesArray.length === 0) {
				setCarouselItems([]);
				return;
			}

			// Create carousel items from companies
			const items = companiesArray
				.map(company => {
					let item: CarouselItem;
					if (company.type === 'company') {
						const companyName =
							company.data.name || extractNameFromFilename(company.id);
						const dateStart = company.data.dateStart;
						const dateEnd = company.data.dateEnd;
						let dateString = '';

						// Process date range
						if (dateStart) {
							const startDate =
								dateStart instanceof Date ? dateStart : new Date(dateStart);
							const startFormatted = startDate.toLocaleDateString('en-US', {
								month: 'short',
								year: 'numeric',
							});

							if (dateEnd && dateEnd !== 'TBD' && dateEnd !== '') {
								const endDate =
									dateEnd instanceof Date ? dateEnd : new Date(dateEnd);
								const endFormatted = endDate.toLocaleDateString('en-US', {
									month: 'short',
									year: 'numeric',
								});
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
						};
					} else if (company.type === 'client') {
						const clientName =
							company.data.name || extractNameFromFilename(company.id);
						const dateStart = company.data.dateStart;
						const dateEnd = company.data.dateEnd;
						let dateString = '';

						// Process date range
						if (dateStart) {
							const startDate =
								dateStart instanceof Date ? dateStart : new Date(dateStart);
							const startFormatted = startDate.toLocaleDateString('en-US', {
								month: 'short',
								year: 'numeric',
							});

							if (dateEnd && dateEnd !== 'TBD' && dateEnd !== '') {
								const endDate =
									dateEnd instanceof Date ? dateEnd : new Date(dateEnd);
								const endFormatted = endDate.toLocaleDateString('en-US', {
									month: 'short',
									year: 'numeric',
								});
								dateString = `${startFormatted} - ${endFormatted}`;
							} else {
								dateString = `${startFormatted} - Current`;
							}
						}

						item = {
							id: company.id || company.slug,
							title: clientName,
							dateString: dateString,
							type: 'client',
							logoURL: company.data.logoURL,
						};
					} else {
						// Handle other types if necessary
						return null;
					}

					return item;
				})
				.filter(item => item !== null) as CarouselItem[]; // Filter out null items

			setCarouselItems(items);
			setError(null);
		} catch (error) {
			console.error('Error processing companies:', error);
			setError(
				error instanceof Error ? error.message : 'Unknown error occurred'
			);
			setCarouselItems([]);
		}
	}, [companies]);

	const autoPlayPlugin = new AutoPlay({
		duration: 3000,
		direction: 'NEXT',
		stopOnHover: true,
	});

	const plugins = [autoPlayPlugin];

	// Handle item selection
	const handleItemClick = (itemId: string) => {
		const newSelectedItem = selectedItem === itemId ? null : itemId;
		setSelectedItem(newSelectedItem);

		// Stop auto-play when an item is selected, resume when deselected
		if (flickingRef.current && autoPlayPlugin) {
			if (newSelectedItem) {
				autoPlayPlugin.stop();
			} else {
				autoPlayPlugin.play();
			}
		}

		// Snap to the clicked item
		if (flickingRef.current) {
			const itemIndex = carouselItems.findIndex(item => item.id === itemId);
			if (itemIndex !== -1) {
				flickingRef.current.moveTo(itemIndex, true);
			}
		}
	};

	// Handle click outside to deselect
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.plugins-panel')) {
				setSelectedItem(null);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

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
		<section className="py-8 px-0 max-sm:px-0">
			<style
				dangerouslySetInnerHTML={{
					__html: `
					/* Full width carousel */
					.flicking-viewport {
						width: 100vw !important;
						max-width: 100vw !important;
					}
					
					/* Enhanced mobile responsiveness */
					@media (max-width: 768px) {
						.plugins-panel {
							width: 280px !important;
							height: 300px !important;
							margin: 0 10px !important;
						}
					}
				`,
				}}
			/>
			<div className="w-full">
				{carouselItems.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-gray-600 dark:text-gray-400 mb-4">Loading...</p>
					</div>
				) : (
					<div className="overflow-visible">
						<Flicking
							ref={flickingRef}
							plugins={plugins}
							className="flicking-viewport"
							style={{
								height: '300px',
								width: '100vw',
								overflow: 'visible',
							}}
							options={{
								align: 'center',
								circular: true,
								gap: 40,
								bound: false,
								adaptive: false,
								renderOnlyVisible: false,
								preventClickOnDrag: false,
							}}>
							{carouselItems.map(item => (
								<div
									key={item.id}
									className="plugins-panel"
									style={{ width: '260px', height: '280px', margin: '0 20px' }}>
									<CompanyCard
										item={item}
										isSelected={selectedItem === item.id}
										onClick={() => handleItemClick(item.id)}
									/>
								</div>
							))}
						</Flicking>
					</div>
				)}
			</div>
		</section>
	);
}
