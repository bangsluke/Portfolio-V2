import { useState } from 'preact/hooks';

interface Reference {
	id: string;
	name: string;
	title?: string;
	email?: string;
	phone?: string;
	company?: string;
	logoURL?: string | null;
	address?: string;
}

interface ReferenceItemProps {
	reference: Reference;
	isSelected: boolean;
	onClick: () => void;
}

export default function ReferenceItem({
	reference,
	isSelected,
	onClick,
}: ReferenceItemProps) {
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const copyToClipboard = async (text: string, field: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedField(field);
			setTimeout(() => {
				setCopiedField(curr => (curr === field ? null : curr));
			}, 2000);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	};

	return (
		<div
			className={`carousel-item group relative ${
				isSelected === true
					? 'ring-4 ring-theme-400 scale-105 brightness-110'
					: ''
			}`}
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick();
				}
			}}>
			{/* Background Image */}
			{reference.logoURL ? (
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${reference.logoURL})` }}
				/>
			) : (
				<div className="absolute inset-0 bg-gradient-to-br from-theme-300 to-theme-600" />
			)}

			{/* Dark Overlay */}
			<div
				className={`absolute inset-0 transition-colors duration-300 ${
					isSelected === true
						? 'bg-black/5 dark:bg-black/5'
						: 'bg-black/20 dark:bg-black/50 group-hover:bg-black/5'
				}`}
			/>

			{/* Content */}
			<div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
				{/* Top Section */}
				<div>
					<h3
						className={`text-xl font-bold mb-1 transition-colors duration-300 ${
							isSelected === true ? 'text-theme-400' : 'text-white'
						}`}>
						{reference.name}
					</h3>
					{reference.title && (
						<p className="text-sm text-white/80 mb-2">{reference.title}</p>
					)}
					{reference.company && (
						<p className="text-sm text-theme-300 font-medium">
							{reference.company}
						</p>
					)}
				</div>

				{/* Contact Information */}
				<div className="space-y-2">
					{reference.email && (
						<div className="flex items-center justify-end group/contact">
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={e => {
										e.stopPropagation();
										copyToClipboard(reference.email!, `email-${reference.id}`);
									}}
									className="opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded"
									title="Copy email"
									aria-label={`Copy email ${reference.email}`}>
									{copiedField === `email-${reference.id}` ? (
										<svg
											className="w-3 h-3 text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg
											className="w-3 h-3"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
											<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
										</svg>
									)}
								</button>
								<span className="text-xs text-white/90 truncate max-w-40 group-hover/contact:text-white group-hover/contact:bg-white/20 transition-all duration-200 px-1 py-1 rounded">
									{reference.email}
								</span>
							</div>
						</div>
					)}

					{reference.phone && (
						<div className="flex items-center justify-end group/contact">
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={e => {
										e.stopPropagation();
										copyToClipboard(reference.phone!, `phone-${reference.id}`);
									}}
									className="opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded"
									title="Copy phone"
									aria-label={`Copy phone ${reference.phone}`}>
									{copiedField === `phone-${reference.id}` ? (
										<svg
											className="w-3 h-3 text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg
											className="w-3 h-3"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
											<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
										</svg>
									)}
								</button>
								<span className="text-xs text-white/90 truncate max-w-40 group-hover/contact:bg-white/20 transition-all duration-200 px-1 py-1 rounded">
									{reference.phone}
								</span>
							</div>
						</div>
					)}

					{reference.address && (
						<div className="text-right">
							<span className="text-xs text-white/90 whitespace-pre-line">
								{reference.address}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
