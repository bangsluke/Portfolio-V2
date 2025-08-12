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
	const backgroundImage = item.logoURL?.trim() ?? '';
	const hasBackground = backgroundImage.length > 0;
	const fallbackColor =
		item.type === 'client'
			? 'bg-gradient-to-br from-green-500 to-teal-600'
			: 'bg-gradient-to-br from-blue-500 to-purple-600';

	// Handle card click - allow selection on all screen sizes
	const handleCardClick = (e: any) => {
		e.preventDefault();
		e.stopPropagation();

		// Always allow selection on all screen sizes
		onClick();
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<div
			className={`carousel-item group relative ${
				isSelected ? 'ring-4 ring-theme-400 scale-105 brightness-110' : ''
			}`}
			role="button"
			tabIndex={0}
			onClick={handleCardClick}
			onKeyDown={handleKeyDown}>
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
			<div className="relative z-10 h-full flex flex-col justify-between p-6 text-white w-full">
				{/* Top Section */}
				<div className="flex-1">
					<div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 -m-3">
						<h3
							className={`text-lg font-bold mb-2 transition-colors duration-300 ${
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
