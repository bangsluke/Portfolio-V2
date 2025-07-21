import { Arrow, AutoPlay, Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import '@egjs/flicking-plugins/dist/pagination.css';
import '@egjs/flicking/dist/flicking.css';
import Flicking from '@egjs/preact-flicking';
import { useRef, useState } from 'preact/hooks';

interface Reference {
	id: string;
	name: string;
	title: string;
	email: string;
	phone: string;
	company: string;
	logoURL: string | null;
	address: string;
}

interface ReferencesCarouselComponentProps {
	references: Reference[];
}

const ReferencesCarouselComponent = ({
	references,
}: ReferencesCarouselComponentProps) => {
	const flickingRef = useRef<any>(null);
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const copyToClipboard = async (text: string, field: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedField(field);
			setTimeout(() => setCopiedField(null), 2000);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	};

	const plugins = [
		new AutoPlay({ duration: 5000, direction: 'NEXT', stopOnHover: true }),
		new Pagination({ type: 'bullet' }),
		new Arrow({ moveCount: 1 }),
	];

	return (
		<div className="relative">
			<Flicking
				ref={flickingRef}
				plugins={plugins}
				className="flicking-viewport"
				circular={true}
				adaptive={true}
				renderOnlyVisible={true}
				align="center"
				bound={false}
				preventClickOnDrag={true}
				preventDefaultOnDrag={true}
				noPanelStyleOverride={false}
				useFindDOMNode={false}
				renderExternal={false}
				firstPanelSize="280px"
				panelEffect={(x: number) => 1 - Math.pow(1 - x, 3)}>
				{references.map(reference => (
					<div key={reference.id} className="flicking-panel px-2">
						<div className="relative w-64 h-64 rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105">
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
							<div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-300" />

							{/* Content */}
							<div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
								{/* Top Section */}
								<div>
									<h3 className="text-xl font-bold mb-1">{reference.name}</h3>
									{reference.title && (
										<p className="text-sm text-white/80 mb-2">
											{reference.title}
										</p>
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
										<div className="flex items-center justify-between group/contact">
											<span className="text-xs text-white/70">Email:</span>
											<div className="flex items-center gap-2">
												<span className="text-xs text-white/90 truncate max-w-32">
													{reference.email}
												</span>
												<button
													onClick={e => {
														e.stopPropagation();
														copyToClipboard(
															reference.email,
															`email-${reference.id}`
														);
													}}
													className="opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded"
													title="Copy email">
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
											</div>
										</div>
									)}

									{reference.phone && (
										<div className="flex items-center justify-between group/contact">
											<span className="text-xs text-white/70">Phone:</span>
											<div className="flex items-center gap-2">
												<span className="text-xs text-white/90 truncate max-w-32">
													{reference.phone}
												</span>
												<button
													onClick={e => {
														e.stopPropagation();
														copyToClipboard(
															reference.phone,
															`phone-${reference.id}`
														);
													}}
													className="opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded"
													title="Copy phone">
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
											</div>
										</div>
									)}

									{reference.address && (
										<div className="text-xs text-white/70 mt-2">
											<span className="block font-medium mb-1">Address:</span>
											<span className="text-white/90">{reference.address}</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</Flicking>

			{/* Pagination container - Flicking will populate this */}
			<div className="flicking-pagination mt-6" />

			{/* Custom Arrow Buttons */}
			<button
				className="flicking-arrow flicking-arrow-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
				onClick={() => flickingRef.current?.prev()}>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<button
				className="flicking-arrow flicking-arrow-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
				onClick={() => flickingRef.current?.next()}>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ReferencesCarouselComponent;
