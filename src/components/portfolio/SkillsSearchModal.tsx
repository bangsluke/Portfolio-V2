import Fuse from 'fuse.js';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { extractNameFromFilename } from '../../utils/filename-utils';

interface Skill {
	id: string;
	slug: string;
	data: {
		name?: string;
		skillName?: string;
		tags?: string[];
		skillRating?: number;
		skillDescription?: string;
		logoFileName?: string | null;
	};
}

interface Project {
	data?: {
		technologies?: string[];
	};
}

interface SkillsSearchModalProps {
	skills: Skill[];
	projects: Project[];
}

type ProjectCountDisplay = number | 'All';

const getProjectCountForSkill = (
	skill: Skill,
	projects: Project[]
): ProjectCountDisplay => {
	const skillName = skill.data.skillName || extractNameFromFilename(skill.id);
	const skillNameLower = skillName.toLowerCase();

	const projectCount = projects.filter(project => {
		if (!project || !project.data || !project.data.technologies) {
			return false;
		}

		return project.data.technologies.some((tech: string) => {
			const cleanTech = tech.replace(/\[\[|\]\]/g, '');
			return cleanTech.toLowerCase() === skillNameLower;
		});
	}).length;

	if (
		skillNameLower === 'git' ||
		skillNameLower === 'powershell' ||
		(skillNameLower === 'dependabot' && projectCount === 0)
	) {
		return 'All';
	}

	return projectCount;
};

const SkillsSearchModal = ({ skills, projects }: SkillsSearchModalProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');

	const inputRef = useRef<HTMLInputElement | null>(null);
	const overlayRef = useRef<HTMLDivElement | null>(null);

	const fuse = useMemo(() => {
		return new Fuse(skills, {
			keys: [
				'data.name',
				'data.skillName',
				'slug',
				'id',
				'data.skillDescription',
			],
			includeScore: true,
			threshold: 0.35,
			ignoreLocation: true,
		});
	}, [skills]);

	const results = useMemo(() => {
		const trimmed = query.trim();
		if (!trimmed || trimmed.length < 1) {
			return [];
		}

		const lowerQuery = trimmed.toLowerCase();

		return fuse
			.search(trimmed)
			.filter(result => {
				const item = result.item;
				const rawName =
					item.data.skillName ||
					item.data.name ||
					extractNameFromFilename(item.id) ||
					item.slug;
				const name = (rawName || '').toLowerCase();
				const description = (item.data.skillDescription || '').toLowerCase();

				const matchesNameSubstring = name.includes(lowerQuery);
				const matchesDescriptionSubstring = description.includes(lowerQuery);

				// Prefer direct substring matches in name or description
				if (matchesNameSubstring || matchesDescriptionSubstring) {
					return true;
				}

				// Fall back to fuzzy matching for near-typos (e.g. "Reect" -> "React")
				if (lowerQuery.length >= 3 && typeof result.score === 'number') {
					return result.score <= 0.25;
				}

				return false;
			})
			.map(result => result.item);
	}, [fuse, query]);

	const handleClose = () => {
		setIsOpen(false);
		setQuery('');
	};

	// Open the modal when a global event is dispatched from the Astro button
	useEffect(() => {
		const handleOpen = () => {
			setIsOpen(true);
		};

		window.addEventListener('openSkillsSearch', handleOpen);

		return () => {
			window.removeEventListener('openSkillsSearch', handleOpen);
		};
	}, []);

	// Focus the input when the modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Close on Escape
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isOpen) return;
			if (event.key === 'Escape') {
				event.preventDefault();
				handleClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	// Close when clicking the overlay (but not the inner panel)
	const handleOverlayClick = (event: MouseEvent) => {
		if (event.target === overlayRef.current) {
			handleClose();
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div
			ref={overlayRef}
			class="fixed inset-0 max-md:top-24 z-[130] bg-black bg-opacity-50 flex items-center max-md:items-start justify-center p-4 max-md:pt-24"
			role="dialog"
			aria-modal="true"
			aria-label="Search skills"
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onClick={handleOverlayClick as unknown as any}>
			<div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full min-h-[80vh] max-h-[80vh] max-md:min-h-[calc(100vh-12rem)] max-md:max-h-[calc(100vh-12rem)] overflow-hidden border border-gray-200/60 dark:border-gray-700/60">
				<div class="flex items-center justify-between gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
					<input
						ref={inputRef}
						type="text"
						class="flex-1 global-element global-form-element text-sm"
						placeholder="Search skills"
						value={query}
						onInput={event =>
							setQuery((event.currentTarget as HTMLInputElement).value)
						}
						aria-label="Search skills"
					/>
					<button
						type="button"
						class="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
						onClick={handleClose}
						aria-label="Close search">
						<svg
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div class="p-4 overflow-y-auto max-h-[calc(80vh-64px)] max-md:max-h-[calc(100vh-12rem-64px)] space-y-3">
					{query.trim().length < 1 ? (
						<p class="text-sm text-gray-500 dark:text-gray-400">
							Start typing to search Luke&apos;s skills.
						</p>
					) : results.length === 0 ? (
						<p class="text-sm text-gray-500 dark:text-gray-400">
							No skills found for &quot;{query.trim()}&quot;.
						</p>
					) : (
						<>
							<div class="w-full flex justify-center mb-2">
								<div class="px-3 py-1 rounded-full bg-theme-500 text-white text-xs font-medium">
									{results.length} result
									{results.length === 1 ? '' : 's'} found
								</div>
							</div>
							{results.map(skill => {
								const displayName = extractNameFromFilename(
									skill.id || skill.slug
								);
								const projectCount = getProjectCountForSkill(skill, projects);

								return (
									<div
										key={skill.id}
										class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
										data-testid={`skills-search-result-${displayName}`}>
										<div class="flex items-center justify-between gap-3 mb-2 h-6">
											<div class="flex flex-col items-center gap-1 min-w-0 shrink-0">
												<div class="text-xs font-medium text-colour">
													{displayName}
												</div>
											</div>
											{skill.data.logoFileName && (
												<div class="flex-1 flex justify-start">
													<img
														src={`/icons/${skill.data.logoFileName}`}
														alt={`${skill.data.name || skill.slug} icon`}
														class="h-full w-auto max-h-6"
													/>
												</div>
											)}
											<div class="flex gap-3 text-xs text-colour">
												<div class="text-center">
													<div class="text-gray-500 dark:text-gray-400">
														Rating
													</div>
													<div class="font-medium">
														{skill.data.skillRating ?? '-'}
													</div>
												</div>
												<div class="text-center">
													<div class="text-gray-500 dark:text-gray-400">
														Projects
													</div>
													<div class="font-medium">{projectCount}</div>
												</div>
											</div>
										</div>
										{skill.data.skillDescription &&
											skill.data.skillDescription !== '-' && (
												<div class="flex items-start">
													<div class="text-xs text-colour opacity-80 flex-1">
														{skill.data.skillDescription}
													</div>
												</div>
											)}
									</div>
								);
							})}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SkillsSearchModal;
