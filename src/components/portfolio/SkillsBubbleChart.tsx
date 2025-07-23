import * as d3 from 'd3';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'preact/hooks';
import { extractNameFromFilename } from '../../utils/filename-utils';
import { getSkillIconName } from '../../utils/icon-utils';

interface Skill {
	id: string;
	data: {
		name?: string;
		tags?: string[];
		skillRating?: number;
		skillDescription?: string;
		logoFileName?: string | null;
	};
	slug: string;
}

interface SkillsBubbleChartProps {
	skills: Skill[];
	projects: any[]; // Projects collection for counting skill usage
	selectedFilter?: string;
	onFilterChange?: (filter: string) => void;
	filterOptions?: { value: string; label: string }[];
	isFullscreen?: boolean;
	onClose?: () => void;
}

interface BubbleData extends d3.SimulationNodeDatum {
	id: string;
	name: string;
	rating: number;
	description: string;
	logoFileName: string | null;
	iconName: string | null;
	tags: string[];
	projectCount: number;
	radius: number;
	color: string;
	group: string;
}

interface TooltipData {
	skill: BubbleData;
	x: number;
	y: number;
}

const SkillsBubbleChart = ({
	skills,
	projects,
	selectedFilter: _selectedFilter = 'all',
	onFilterChange: _onFilterChange,
	filterOptions: _filterOptions = [],
	isFullscreen: _isFullscreen = false,
	onClose: _onClose,
}: SkillsBubbleChartProps) => {
	const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
	const [_hoveredSkill, setHoveredSkill] = useState<string | null>(null);
	const [tooltip, setTooltip] = useState<TooltipData | null>(null);
	const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
	const svgRef = useRef<SVGSVGElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const simulationRef = useRef<d3.Simulation<BubbleData, undefined> | null>(
		null
	);

	// Color mapping for different skill types
	const getSkillColor = useCallback((tags: string[]): string => {
		if (tags.includes('framework') || tags.includes('library')) {
			return '#3b82f6'; // blue-500
		} else if (tags.includes('language')) {
			return '#10b981'; // green-500
		} else if (tags.includes('tool') || tags.includes('platform')) {
			return '#8b5cf6'; // purple-500
		} else if (tags.includes('database')) {
			return '#f97316'; // orange-500
		} else if (tags.includes('cloud') || tags.includes('devops')) {
			return '#6366f1'; // indigo-500
		} else if (tags.includes('design')) {
			return '#ec4899'; // pink-500
		} else {
			return '#6b7280'; // gray-500
		}
	}, []);

	const getSkillGroup = useCallback((tags: string[]): string => {
		if (tags.includes('framework') || tags.includes('library')) {
			return 'Frameworks & Libraries';
		} else if (tags.includes('language')) {
			return 'Languages';
		} else if (tags.includes('tool') || tags.includes('platform')) {
			return 'Tools & Platforms';
		} else if (tags.includes('database')) {
			return 'Databases';
		} else if (tags.includes('cloud') || tags.includes('devops')) {
			return 'Cloud & DevOps';
		} else if (tags.includes('design')) {
			return 'Design';
		} else {
			return 'Other';
		}
	}, []);

	// Calculate project count for each skill - improved logic
	const getProjectCount = useCallback(
		(skillName: string, skillId: string): number => {
			return projects.filter(project => {
				const technologies = project.data.technologies || [];
				return technologies.some((tech: string) => {
					// Clean the technology name (remove Obsidian brackets)
					const cleanTech = tech.replace(/\[\[|\]\]/g, '');

					// Check for exact match with skill name or skill ID
					if (
						cleanTech.toLowerCase() === skillName.toLowerCase() ||
						cleanTech.toLowerCase() === skillId.toLowerCase()
					) {
						return true;
					}

					// Check for partial match (skill name contains tech or vice versa)
					if (
						cleanTech.toLowerCase().includes(skillName.toLowerCase()) ||
						skillName.toLowerCase().includes(cleanTech.toLowerCase())
					) {
						return true;
					}

					// Handle pipe aliases in tech names
					if (cleanTech.includes('|')) {
						const [techPath, _techDisplay] = cleanTech.split('|');
						const techName = techPath.split('/').pop() || techPath;

						if (
							techName.toLowerCase() === skillName.toLowerCase() ||
							techName.toLowerCase() === skillId.toLowerCase()
						) {
							return true;
						}
					}

					return false;
				});
			}).length;
		},
		[projects]
	);

	// Filter skills based on selected filters
	const filteredSkills = useMemo(() => {
		if (selectedFilters.includes('all')) return skills;
		return skills.filter(skill =>
			skill.data.tags?.some(tag => selectedFilters.includes(tag))
		);
	}, [skills, selectedFilters]);

	// Process skills into bubble data
	const bubbleData = useMemo((): BubbleData[] => {
		return filteredSkills.map(skill => {
			// Use skill ID (minus file extension) for tooltip name
			const skillId = extractNameFromFilename(skill.id);
			const skillName = skill.data.name || skill.slug;
			const rating = skill.data.skillRating || 0;
			const projectCount = getProjectCount(skillName, skillId);
			const iconName = getSkillIconName(skill.data.logoFileName || null);

			// Calculate bubble size based on rating and project count
			const baseRadius = Math.max(15, Math.min(50, 15 + (rating / 100) * 35));
			const projectBonus = Math.min(10, projectCount * 2);
			const radius = baseRadius + projectBonus;

			return {
				id: skill.slug,
				name: skillId, // Use skill ID for tooltip display
				rating,
				description: skill.data.skillDescription || 'No description available',
				logoFileName: skill.data.logoFileName || null,
				iconName,
				tags: skill.data.tags || [],
				projectCount,
				radius,
				color: getSkillColor(skill.data.tags || []),
				group: getSkillGroup(skill.data.tags || []),
			};
		});
	}, [filteredSkills, getProjectCount, getSkillColor, getSkillGroup]);

	// Listen for filter changes from parent components
	useEffect(() => {
		const handleFilterChange = (e: Event) => {
			const customEvent = e as CustomEvent;
			const { filters } = customEvent.detail;
			setSelectedFilters(filters);
		};

		window.addEventListener('skillsFilterChange', handleFilterChange);
		return () => {
			window.removeEventListener('skillsFilterChange', handleFilterChange);
		};
	}, []);

	// D3 Bubble Chart
	useEffect(() => {
		if (!svgRef.current || !containerRef.current || bubbleData.length === 0) {
			return;
		}

		const container = containerRef.current;
		const svg = d3.select(svgRef.current);

		// Clear previous content
		svg.selectAll('*').remove();

		// Get container dimensions
		const containerRect = container.getBoundingClientRect();
		const width = containerRect.width;
		const height = containerRect.height;

		// Set up SVG
		svg.attr('width', width).attr('height', height);

		// Stop any existing simulation
		if (simulationRef.current) {
			simulationRef.current.stop();
		}

		// Create force simulation
		const simulation = d3
			.forceSimulation(bubbleData)
			.force('charge', d3.forceManyBody().strength(5))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force(
				'collision',
				d3.forceCollide().radius((d: any) => d.radius + 5)
			)
			.force('x', d3.forceX(width / 2).strength(0.1))
			.force('y', d3.forceY(height / 2).strength(0.1));

		simulationRef.current = simulation;

		// Create bubble groups
		const bubbles = svg
			.selectAll('.bubble')
			.data(bubbleData)
			.enter()
			.append('g')
			.attr('class', 'bubble')
			.style('cursor', 'pointer')
			.on('click', (event, d) => {
				setSelectedSkill(selectedSkill === d.id ? null : d.id);
			})
			.on('mouseenter', (event, d) => {
				setHoveredSkill(d.id);
				const [x, y] = d3.pointer(event);
				setTooltip({ skill: d, x, y });
			})
			.on('mouseleave', () => {
				setHoveredSkill(null);
				setTooltip(null);
			});

		// Add circles
		bubbles
			.append('circle')
			.attr('r', (d: any) => d.radius)
			.attr('fill', (d: any) => d.color)
			.attr('stroke', '#ffffff')
			.attr('stroke-width', 2)
			.style('opacity', 0.8)
			.style('transition', 'opacity 0.3s ease');

		// Add skill icons
		bubbles
			.filter((d: any) => d.iconName)
			.append('image')
			.attr('href', (d: any) => `/icons/${d.iconName}.svg`)
			.attr('width', (d: any) => Math.min(d.radius * 0.6, 24))
			.attr('height', (d: any) => Math.min(d.radius * 0.6, 24))
			.attr('x', (d: any) => -Math.min(d.radius * 0.3, 12))
			.attr('y', (d: any) => -Math.min(d.radius * 0.3, 12))
			.style('filter', 'brightness(0) invert(1)');

		// Add skill names (for larger bubbles)
		bubbles
			.filter((d: any) => d.radius > 25)
			.append('text')
			.text((d: any) => d.name)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('fill', '#ffffff')
			.style(
				'font-size',
				(d: any) => Math.max(10, Math.min(14, d.radius * 0.2)) + 'px'
			)
			.style('font-weight', 'bold')
			.style('pointer-events', 'none');

		// Update positions on simulation tick
		simulation.on('tick', () => {
			bubbles.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
		});

		// Cleanup function
		return () => {
			if (simulationRef.current) {
				simulationRef.current.stop();
			}
		};
	}, [bubbleData]);

	// Handle click outside to deselect
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectedSkill && !(event.target as Element).closest('.bubble')) {
				setSelectedSkill(null);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [selectedSkill]);

	return (
		<div class="relative w-full h-full" ref={containerRef}>
			<svg ref={svgRef} class="w-full h-full" />

			{/* Tooltip */}
			{tooltip && (
				<div
					class="absolute pointer-events-none z-50"
					style={{
						left: tooltip.x + 10,
						top: tooltip.y - 10,
					}}>
					<div class="global-tooltip">
						<div class="global-tooltip-content">
							<div class="font-bold text-white mb-1">{tooltip.skill.name}</div>
							<div class="text-sm text-gray-200 mb-2">
								{tooltip.skill.description}
							</div>
							<div class="text-xs text-gray-300">
								Rating: {tooltip.skill.rating}/100
							</div>
							<div class="text-xs text-gray-300">
								Used in {tooltip.skill.projectCount} project
								{tooltip.skill.projectCount !== 1 ? 's' : ''}
							</div>
							<div class="text-xs text-gray-300">
								Group: {tooltip.skill.group}
							</div>
						</div>
						<div class="absolute left-1/2 transform -translate-x-1/2 global-tooltip-arrow global-tooltip-arrow-top" />
					</div>
				</div>
			)}

			{/* Selected Skill Details */}
			{selectedSkill && (
				<div class="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
					<div class="flex items-center justify-between mb-2">
						<h3 class="text-lg font-bold text-gray-900 dark:text-white">
							{bubbleData.find(d => d.id === selectedSkill)?.name}
						</h3>
						<button
							onClick={() => setSelectedSkill(null)}
							class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
							<svg
								class="w-5 h-5"
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
					<p class="text-sm text-gray-600 dark:text-gray-300">
						{bubbleData.find(d => d.id === selectedSkill)?.description}
					</p>
				</div>
			)}
		</div>
	);
};

export default SkillsBubbleChart;
