interface CarouselItem {
	id: string;
	title: string;
	dateString: string;
	type: 'company' | 'client';
	logoURL?: string;
}

interface CustomerAndClientItemProps {
	item: CarouselItem;
	isSelected: boolean;
	onClick: () => void;
}

export default function CustomerAndClientItem({
	item,
	isSelected,
	onClick,
}: CustomerAndClientItemProps) {
	// Handle both companies (logoURL) and clients (imageURL or logoURL)
	const hasLogo = item.logoURL && item.logoURL.trim() !== '';
	const backgroundImage = item.logoURL;
	const hasBackground = hasLogo;

	const fallbackColor =
		item.type === 'client'
			? 'bg-gradient-to-br from-green-500 to-teal-600'
			: 'bg-gradient-to-br from-blue-500 to-purple-600';

	// Handle card click - allow selection on all screen sizes
	const handleCardClick = (e: MouseEvent | TouchEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// Always allow selection on all screen sizes
		onClick();
	};

	// Handle touch events for mobile - allow selection with touch
	const handleTouchStart = (e: TouchEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// On touch devices, allow selection
		onClick();
	};

	return (
		<div
			className={`carousel-item group hover:scale-105 ${
				isSelected ? 'ring-4 ring-theme-400 scale-105 brightness-110' : ''
			}`}
			onClick={handleCardClick}
			onTouchStart={handleTouchStart}>
			{/* Background Image */}
			{hasBackground ? (
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url('${backgroundImage}')` }}
				/>
			) : (
				<div className={`absolute inset-0 ${fallbackColor}`} />
			)}

			{/* Dark Overlay */}
			<div
				className={`absolute inset-0 transition-colors duration-300 ${
					isSelected
						? 'bg-black/5 dark:bg-black/5'
						: 'bg-black/20 dark:bg-black/50 group-hover:bg-black/5'
				}`}
			/>

			{/* Content */}
			<div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
				{/* Top Section */}
				<div className="flex-1">
					<div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 -m-3">
						<h3
							className={`text-l font-bold mb-2 transition-colors duration-300 ${
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
			</div>
		</div>
	);
}
