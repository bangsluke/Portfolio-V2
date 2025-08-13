import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking/dist/flicking.css';
import Flicking from '@egjs/preact-flicking';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import CustomerAndClientItem from '../portfolio/CustomerAndClientItem';
import ReferenceItem from '../portfolio/ReferenceItem';

// Types for different carousel items
interface CustomerClientItem {
	id: string;
	title: string;
	dateString: string;
	logoURL?: string;
	type?: string;
}

interface ReferenceItemData {
	id: string;
	name: string;
	title: string;
	email: string;
	phone: string;
	company: string;
	logoURL: string | null;
	address: string;
}

// Union type for all possible carousel data
type CarouselData = CustomerClientItem[] | ReferenceItemData[] | string;

// Props for the unified Carousel component
interface CarouselProps {
	items: CarouselData;
	type: 'customer-client' | 'reference';
	autoPlayDuration?: number;
	showArrows?: boolean;
	className?: string;
}

export default function Carousel({
	items,
	type,
	autoPlayDuration = 3000,
	showArrows = true,
	className = '',
}: CarouselProps) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const flickingRef = useRef<Flicking | null>(null);
	const [processedItems, setProcessedItems] = useState<
		(CustomerClientItem | ReferenceItemData)[]
	>([]);

	// Process items based on type
	useEffect(() => {
		if (type === 'customer-client' && typeof items === 'string') {
			try {
				const parsedItems = JSON.parse(items);
				// Transform the parsed items to match CarouselItem interface
				const transformed = parsedItems.map(
					(item: {
						id: string;
						data: {
							name?: string;
							dateStart?: string | Date;
							dateEnd?: string | Date;
							logoURL?: string;
						};
						type?: string;
					}) => ({
						id: item.id,
						title: item.data.name || item.id,
						dateString: (() => {
							const dateStart = item.data.dateStart;
							const dateEnd = item.data.dateEnd;

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
									return `${startFormatted} - ${endFormatted}`;
								} else {
									return `${startFormatted} - Current`;
								}
							}
							return '';
						})(),
						type: item.type,
						logoURL: item.data.logoURL || undefined,
					})
				);
				setProcessedItems(transformed);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Error parsing customer-client items:', error);
				setProcessedItems([]);
			}
		} else {
			if (Array.isArray(items)) {
				setProcessedItems(items);
			} else {
				// eslint-disable-next-line no-console
				console.error('Invalid items format for type:', type);
				setProcessedItems([]);
			}
		}
	}, [items, type]);

	// Create AutoPlay plugin
	const autoPlayPlugin = useRef(
		new AutoPlay({
			duration: autoPlayDuration,
			direction: 'NEXT',
			stopOnHover: true,
		})
	);

	const plugins = useMemo(() => [autoPlayPlugin.current], []);

	const handleItemClick = (itemId: string) => {
		const newSelectedItem = selectedItem === itemId ? null : itemId;
		setSelectedItem(newSelectedItem);

		// Stop auto-play when an item is selected, resume when deselected
		if (flickingRef.current && autoPlayPlugin.current) {
			autoPlayPlugin.current.stop();
		} else {
			autoPlayPlugin.current.play();
		}

		// Snap to the clicked item
		if (flickingRef.current) {
			const itemIndex = processedItems.findIndex(
				(item: CustomerClientItem | ReferenceItemData) => item.id === itemId
			);
			if (itemIndex !== -1) {
				flickingRef.current.moveTo(itemIndex, 0);
			}
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.flicking-panel')) {
				setSelectedItem(null);
				// Resume autoplay when deselecting
				if (autoPlayPlugin.current) {
					autoPlayPlugin.current.play();
				}
			}
		};

		document.addEventListener('click', handleClickOutside, { passive: true });
		return () => document.removeEventListener('click', handleClickOutside);
	}, [autoPlayPlugin]);

	// Render item based on type
	const renderItem = (item: CustomerClientItem | ReferenceItemData) => {
		if (type === 'customer-client') {
			return (
				<div key={item.id} className="flicking-panel">
					<CustomerAndClientItem
						item={item as CustomerClientItem & { type: 'company' | 'client' }}
						isSelected={selectedItem === item.id}
						onClick={() => handleItemClick(item.id)}
					/>
				</div>
			);
		} else if (type === 'reference') {
			return (
				<div key={item.id} className="flicking-panel">
					<ReferenceItem
						reference={item as ReferenceItemData}
						isSelected={selectedItem === item.id}
						onClick={() => handleItemClick(item.id)}
					/>
				</div>
			);
		}
		return null;
	};

	if (!processedItems || processedItems.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-600 dark:text-gray-400 mb-4">Loading...</p>
			</div>
		);
	}

	return (
		<div className={`carousel-container relative ${className}`}>
			<Flicking
				ref={flickingRef}
				plugins={plugins}
				className="flicking-viewport"
				circular={true}>
				{processedItems.map(renderItem)}
			</Flicking>

			{/* Custom Arrow Buttons */}
			{showArrows && (
				<>
					<button
						className="flicking-arrow flicking-arrow-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm cursor-pointer"
						onClick={() => flickingRef.current?.prev()}
						aria-label="Previous item"
						type="button">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<button
						className="flicking-arrow flicking-arrow-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm cursor-pointer"
						onClick={() => flickingRef.current?.next()}
						aria-label="Next item"
						type="button">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</>
			)}
		</div>
	);
}
