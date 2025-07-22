import * as d3 from 'd3';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'preact/hooks';
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
	selectedFilter = 'all',
	onFilterChange,
	filterOptions = [],
	isFullscreen = false,
	onClose,
}: SkillsBubbleChartProps) => {
	const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
	const [tooltip, setTooltip] = useState<TooltipData | null>(null);
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

	// Calculate project count for each skill
	const getProjectCount = useCallback(
		(skillName: string): number => {
			return projects.filter(project =>
				project.data.technologies?.some((tech: string) =>
					tech.toLowerCase().includes(skillName.toLowerCase())
				)
			).length;
		},
		[projects]
	);

	// Filter skills based on selected filter
	const filteredSkills = useMemo(() => {
		if (selectedFilter === 'all') return skills;
		return skills.filter(skill => skill.data.tags?.includes(selectedFilter));
	}, [skills, selectedFilter]);

	// Process skills into bubble data
	const bubbleData = useMemo((): BubbleData[] => {
		return filteredSkills.map(skill => {
			// Use skill ID (minus file extension) for tooltip name
			const skillId = skill.id.replace(/\.md$/, '');
			const skillName = skill.data.name || skill.slug;
			const rating = skill.data.skillRating || 0;
			const projectCount = getProjectCount(skillName);
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
			.on('mouseenter', (event, d) => {
				setHoveredSkill(d.id);
				setTooltip({
					skill: d,
					x: event.clientX,
					y: event.clientY,
				});
				d3.select(event.currentTarget)
					.select('circle')
					.transition()
					.duration(200)
					.attr('r', d.radius * 1.1);
			})
			.on('mouseleave', (event, d) => {
				setHoveredSkill(null);
				setTooltip(null);
				d3.select(event.currentTarget)
					.select('circle')
					.transition()
					.duration(200)
					.attr('r', d.radius);
			})
			.on('click', (event, d) => {
				event.stopPropagation();
				setSelectedSkill(selectedSkill === d.id ? null : d.id);
				// Show tooltip on click for mobile
				setTooltip({
					skill: d,
					x: event.clientX,
					y: event.clientY,
				});
			})
			.on('touchstart', (event, d) => {
				event.preventDefault();
				const touch = event.touches[0];
				setSelectedSkill(selectedSkill === d.id ? null : d.id);
				setTooltip({
					skill: d,
					x: touch.clientX,
					y: touch.clientY,
				});
			});

		// Add clip path for each bubble
		bubbles.each(function (d: any) {
			const bubbleGroup = d3.select(this);
			const clipId = `clip-${d.id}`;

			// Create clip path
			svg
				.append('defs')
				.append('clipPath')
				.attr('id', clipId)
				.append('circle')
				.attr('r', d.radius)
				.attr('cx', 0)
				.attr('cy', 0);

			// Apply clip path to the bubble group
			bubbleGroup.attr('clip-path', `url(#${clipId})`);
		});

		// Add circles with gradient backgrounds
		bubbles
			.append('circle')
			.attr('r', (d: any) => d.radius)
			.style('fill', '#ffffff')
			.style('stroke', (d: any) => d.color)
			.style('stroke-width', 1.5)
			.style('opacity', 0.9)
			.style('filter', 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))')
			.transition()
			.duration(1000)
			.style('opacity', 1);

		// Add SVG icons as background using data URLs
		bubbles
			.append('image')
			.attr('x', (d: any) => -d.radius * 0.8)
			.attr('y', (d: any) => -d.radius * 0.8)
			.attr('width', (d: any) => d.radius * 1.6)
			.attr('height', (d: any) => d.radius * 1.6)
			.attr('href', (d: any) => {
				if (d.logoFileName) {
					// Load SVG from the icons directory
					return `/src/icons/${d.logoFileName}`;
				}
				return '';
			})
			.style('opacity', 0.8)
			.style('pointer-events', 'none');

		// Update positions on simulation tick
		simulation.on('tick', () => {
			bubbles.attr('transform', d => `translate(${d.x}, ${d.y})`);
		});

		// Add zoom behavior
		const zoom = d3
			.zoom()
			.scaleExtent([0.5, 3])
			.on('zoom', event => {
				svg
					.selectAll('.bubble')
					.attr(
						'transform',
						(d: any) =>
							`translate(${event.transform.applyX(d.x)}, ${event.transform.applyY(d.y)})`
					);
			});

		svg.call(zoom as any);

		// Add drag behavior
		const drag = d3
			.drag()
			.on('start', (event, d: any) => {
				if (!event.active) simulation.alphaTarget(0.3).restart();
				d.fx = d.x;
				d.fy = d.y;
			})
			.on('drag', (event, d: any) => {
				d.fx = event.x;
				d.fy = event.y;
			})
			.on('end', (event, d: any) => {
				if (!event.active) simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			});

		bubbles.call(drag as any);

		// Cleanup function
		return () => {
			if (simulationRef.current) {
				simulationRef.current.stop();
				simulationRef.current = null;
			}
		};
	}, [bubbleData]); // Only depend on bubbleData, not selectedSkill

	// Close tooltip when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltip && !containerRef.current?.contains(event.target as Node)) {
				setTooltip(null);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [tooltip]);

	const chartHeight = isFullscreen ? 'h-[90vh]' : 'h-[600px]';

	return (
		<div className="w-full">
			{/* Filter Dropdown (only show in fullscreen mode) */}
			{isFullscreen && onFilterChange && (
				<div className="mb-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						Skills Bubble Chart
					</h3>
					<div className="flex items-center gap-4">
						<select
							value={selectedFilter}
							onChange={e => onFilterChange(e.currentTarget.value)}
							className="global-form-element bg-transparent px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
							{filterOptions.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						{onClose && (
							<button
								onClick={onClose}
								className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
								aria-label="Close fullscreen view">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>
			)}

			{/* Bubble Chart Container */}
			<div
				ref={containerRef}
				className={`relative w-full ${chartHeight} rounded-xl overflow-hidden`}>
				<svg
					ref={svgRef}
					className="w-full h-full"
					style={{ userSelect: 'none' }}
				/>
			</div>

			{/* Tooltip */}
			{tooltip && (
				<div
					className="fixed z-50 max-w-xs pointer-events-none global-tooltip"
					style={{
						left: `${Math.min(tooltip.x + 10, window.innerWidth - 300)}px`,
						top: `${Math.max(tooltip.y - 10, 10)}px`,
						transform:
							tooltip.y > window.innerHeight / 2 ? 'translateY(-100%)' : 'none',
					}}>
					<div className="global-tooltip-content">
						<div className="font-semibold text-lg mb-2 text-white">
							{tooltip.skill.name}
						</div>
						<div className="text-xs text-theme-500 mb-1 font-medium">
							Used in {tooltip.skill.projectCount} project
							{tooltip.skill.projectCount === 1 ? '' : 's'}
						</div>
						<div className="text-sm text-gray-300 leading-relaxed">
							{tooltip.skill.description}
						</div>
					</div>
					{/* Arrow pointing to bubble */}
					<div
						className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white dark:border-t-gray-800"
						style={{
							left: '10px',
							bottom: tooltip.y > window.innerHeight / 2 ? '-8px' : 'auto',
							top: tooltip.y > window.innerHeight / 2 ? 'auto' : '-8px',
							borderTop:
								tooltip.y > window.innerHeight / 2 ? '8px solid white' : 'none',
							borderBottom:
								tooltip.y > window.innerHeight / 2 ? 'none' : '8px solid white',
							borderColor:
								tooltip.y > window.innerHeight / 2
									? 'transparent'
									: 'transparent',
						}}
					/>
				</div>
			)}

			{/* Detailed Tooltip (for selected skills) */}
			{(hoveredSkill || selectedSkill) && !tooltip && (
				<div className="mt-4 global-tooltip">
					<div className="global-tooltip-content">
						{bubbleData.find(b => b.id === (hoveredSkill || selectedSkill)) && (
							<>
								<div className="font-semibold text-lg mb-2">
									{
										bubbleData.find(
											b => b.id === (hoveredSkill || selectedSkill)
										)?.name
									}
								</div>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="font-medium">Rating:</span>{' '}
										{
											bubbleData.find(
												b => b.id === (hoveredSkill || selectedSkill)
											)?.rating
										}
										/100
									</div>
									<div>
										<span className="font-medium">Projects:</span>{' '}
										{
											bubbleData.find(
												b => b.id === (hoveredSkill || selectedSkill)
											)?.projectCount
										}
									</div>
									<div>
										<span className="font-medium">Category:</span>{' '}
										{
											bubbleData.find(
												b => b.id === (hoveredSkill || selectedSkill)
											)?.group
										}
									</div>
									<div>
										<span className="font-medium">Tags:</span>{' '}
										{bubbleData
											.find(b => b.id === (hoveredSkill || selectedSkill))
											?.tags.slice(0, 3)
											.join(', ')}
									</div>
								</div>
								<div className="mt-3 text-sm text-gray-300">
									{
										bubbleData.find(
											b => b.id === (hoveredSkill || selectedSkill)
										)?.description
									}
								</div>
							</>
						)}
					</div>
				</div>
			)}

			{/* Legend */}
			<div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-blue-500" />
					<span>Frameworks & Libraries</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-green-500" />
					<span>Languages</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-purple-500" />
					<span>Tools & Platforms</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-orange-500" />
					<span>Databases</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-indigo-500" />
					<span>Cloud & DevOps</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded-full bg-pink-500" />
					<span>Design</span>
				</div>
			</div>
		</div>
	);
};

export default SkillsBubbleChart;
