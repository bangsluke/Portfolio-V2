import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { extractNameFromFilename } from '../../utils/filename-utils';
import { getSkillIconName } from '../../utils/icon-utils';
import { getProjectCount } from '../../utils/project-count-utils';

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	projects: any[]; // Projects collection for counting skill usage
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
	isFullscreen: _isFullscreen = false,
	onClose: _onClose,
}: SkillsBubbleChartProps) => {
	const [tooltip, setTooltip] = useState<TooltipData | null>(null);
	const [sizeByRating, setSizeByRating] = useState<boolean>(true);
	const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
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
		} else if (tags.includes('testing')) {
			return '#f97316'; // orange-500
		} else if (tags.includes('database')) {
			return '#6366f1'; // indigo-500
		} else if (tags.includes('hosting')) {
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
		} else if (tags.includes('hosting')) {
			return 'Hosting';
		} else {
			return 'Other';
		}
	}, []);

	// Use the common project count utility function
	const getProjectCountForSkill = useCallback(
		(skillName: string, skillId: string): number => {
			return getProjectCount(skillName, skillId, projects);
		},
		[projects]
	);

	// Process skills into bubble data (no filtering)
	const bubbleData = useCallback((): BubbleData[] => {
		return skills
			.map(skill => {
				// Use skill ID (minus file extension) for tooltip name
				const skillId = extractNameFromFilename(skill.id);
				const skillName = skill.data.name || skill.slug;
				const rating = skill.data.skillRating || 0;
				const projectCount = getProjectCountForSkill(skillName, skillId);
				const iconName = getSkillIconName(skill.data.logoFileName || null);

				// Skip skills that aren't used in any projects
				if (projectCount === 0) {
					return null;
				}

				// Calculate bubble size based on toggle state
				let radius: number;
				if (sizeByRating) {
					// Size based on skill rating (primary) with minimal project bonus
					radius = Math.max(20, Math.min(60, 20 + (rating / 100) * 40));
				} else {
					// Size based on project count (primary) with minimal rating bonus
					radius = Math.max(20, Math.min(60, 20 + projectCount * 4));
				}

				return {
					id: skill.slug,
					name: skillId, // Use skill ID for tooltip display
					rating,
					description:
						skill.data.skillDescription || 'No description available',
					logoFileName: skill.data.logoFileName || null,
					iconName,
					tags: skill.data.tags || [],
					projectCount,
					radius,
					color: getSkillColor(skill.data.tags || []),
					group: getSkillGroup(skill.data.tags || []),
				};
			})
			.filter((skill): skill is BubbleData => skill !== null);
	}, [
		skills,
		getProjectCountForSkill,
		getSkillColor,
		getSkillGroup,
		sizeByRating,
	]);

	// Listen for events from parent components
	useEffect(() => {
		const handleReset = (e: Event) => {
			const customEvent = e as CustomEvent;
			const { currentView } = customEvent.detail;

			// Set the sizing based on the current view
			if (currentView === 'bubbles-skill') {
				setSizeByRating(true);
			} else if (currentView === 'bubbles-project') {
				setSizeByRating(false);
			}

			setTooltip(null);

			// Reset zoom to fit all bubbles
			if (zoomRef.current && svgRef.current && containerRef.current) {
				const svg = d3.select(svgRef.current);
				const container = containerRef.current;
				const containerRect = container.getBoundingClientRect();
				const width = containerRect.width;
				const height = containerRect.height;

				// Get the bubble group to calculate bounds
				const bubbleGroup = svg.select('.bubble-group');
				if (!bubbleGroup.empty()) {
					const bubbleGroupNode = bubbleGroup.node() as SVGGElement;
					if (bubbleGroupNode) {
						const bounds = bubbleGroupNode.getBBox();
						const bubbleWidth = bounds.width || 1;
						const bubbleHeight = bounds.height || 1;

						// Calculate scale to fit all bubbles with some padding
						const padding = 50;
						const scaleX = (width - padding) / bubbleWidth;
						const scaleY = (height - padding) / bubbleHeight;
						const scale = Math.min(scaleX, scaleY, 1); // Don't zoom in beyond 1x

						// Calculate center translation
						const translateX =
							width / 2 - (bounds.x + bounds.width / 2) * scale;
						const translateY =
							height / 2 - (bounds.y + bounds.height / 2) * scale;

						// Check for valid values before applying transform
						if (!isNaN(translateX) && !isNaN(translateY) && !isNaN(scale)) {
							// Apply reset zoom
							const transform = d3.zoomIdentity
								.translate(translateX, translateY)
								.scale(scale);

							svg
								.transition()
								.duration(1000)
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								.call(zoomRef.current.transform as any, transform);
						}
					}
				}
			}
		};

		const handleViewToggle = (e: Event) => {
			const customEvent = e as CustomEvent;
			const { currentView } = customEvent.detail;

			// Update the sizing based on the current view
			if (currentView === 'bubbles-skill') {
				setSizeByRating(true);
			} else if (currentView === 'bubbles-project') {
				setSizeByRating(false);
			}
			// For 'list' view, we don't need to change anything in this component
		};

		// Handle resize events for modal context
		const handleResize = () => {
			// Force re-render when container size changes
			if (svgRef.current && containerRef.current) {
				const container = containerRef.current;
				const containerRect = container.getBoundingClientRect();
				if (containerRect.width > 0 && containerRect.height > 0) {
					// Trigger a re-render by updating state
					setSizeByRating(prev => prev);
				}
			}
		};

		// Add event listeners
		window.addEventListener('skillsReset', handleReset);
		window.addEventListener('skillsViewToggle', handleViewToggle);
		window.addEventListener('resize', handleResize);

		// Cleanup function
		return () => {
			window.removeEventListener('skillsReset', handleReset);
			window.removeEventListener('skillsViewToggle', handleViewToggle);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// D3 Bubble Chart
	useEffect(() => {
		const currentBubbleData = bubbleData();

		if (
			!svgRef.current ||
			!containerRef.current ||
			currentBubbleData.length === 0
		) {
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
			.forceSimulation(currentBubbleData)
			.force('charge', d3.forceManyBody().strength(5))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force(
				'collision',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				d3.forceCollide().radius((d: any) => d.radius + 5)
			)
			.force('x', d3.forceX(width / 2).strength(0.1))
			.force('y', d3.forceY(height / 2).strength(0.1));

		simulationRef.current = simulation;

		// Create a group for all bubbles to apply zoom to
		const bubbleGroup = svg.append('g').attr('class', 'bubble-group');

		// Create bubble groups
		const bubbles = bubbleGroup
			.selectAll('.bubble')
			.data(currentBubbleData)
			.enter()
			.append('g')
			.attr('class', 'bubble')
			.style('cursor', 'help')
			.on('click', (event, d) => {
				const [x, y] = d3.pointer(event);
				setTooltip({ skill: d, x, y });
			})
			.on('mouseenter', (event, d) => {
				const [x, y] = d3.pointer(event);
				setTooltip({ skill: d, x, y });
			})
			.on('mouseleave', () => {
				setTooltip(null);
			})
			.on('touchstart', (event, d) => {
				event.preventDefault();
				const touch = event.touches[0];
				const rect = svg.node()?.getBoundingClientRect();
				if (rect) {
					const x = touch.clientX - rect.left;
					const y = touch.clientY - rect.top;
					setTooltip({ skill: d, x, y });
				}
			});

		// Add circles
		bubbles
			.append('circle')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('r', (d: any) => d.radius)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('fill', (d: any) => d.color)
			.attr('stroke', '#ffffff')
			.attr('stroke-width', 2)
			.style('opacity', 0.8)
			.style('transition', 'opacity 0.3s ease');

		// Add skill icons
		bubbles
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.filter((d: any) => d.iconName)
			.append('image')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('href', (d: any) => `/icons/${d.iconName}.svg`)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('width', (d: any) => Math.min(d.radius * 1.0, d.radius * 1.0))
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('height', (d: any) => Math.min(d.radius * 1.0, d.radius * 1.0))
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('x', (d: any) => -Math.min(d.radius * 0.5, d.radius * 0.5))
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.attr('y', (d: any) => -Math.min(d.radius * 0.5, d.radius * 0.5));

		// Update positions on simulation tick
		simulation.on('tick', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			bubbles.attr('transform', (d: any) => {
				const x = d.x ?? 0;
				const y = d.y ?? 0;
				return `translate(${x},${y})`;
			});
		});

		// Set up zoom behavior
		const zoom = d3
			.zoom<SVGSVGElement, unknown>()
			.scaleExtent([0.1, 3]) // Min zoom 0.1x, max zoom 3x
			.on('zoom', event => {
				// Validate transform values before applying
				const { k, x, y } = event.transform;
				if (!isNaN(k) && !isNaN(x) && !isNaN(y)) {
					bubbleGroup.attr('transform', event.transform);
				}
			});

		zoomRef.current = zoom;
		svg.call(zoom);

		// Calculate initial zoom to fit all bubbles
		simulation.on('end', () => {
			// Get the bounds of all bubbles
			const bubbleGroupNode = bubbleGroup.node();
			if (!bubbleGroupNode) return;

			const bounds = bubbleGroupNode.getBBox();
			const bubbleWidth = bounds.width || 1;
			const bubbleHeight = bounds.height || 1;

			// Calculate scale to fit all bubbles with some padding
			const padding = 50;
			const scaleX = (width - padding) / bubbleWidth;
			const scaleY = (height - padding) / bubbleHeight;
			const scale = Math.min(scaleX, scaleY, 1); // Don't zoom in beyond 1x

			// Calculate center translation
			const translateX = width / 2 - (bounds.x + bounds.width / 2) * scale;
			const translateY = height / 2 - (bounds.y + bounds.height / 2) * scale;

			// Check for valid values before applying transform
			if (!isNaN(translateX) && !isNaN(translateY) && !isNaN(scale)) {
				// Apply initial zoom
				const transform = d3.zoomIdentity
					.translate(translateX, translateY)
					.scale(scale);

				svg
					.transition()
					.duration(1000)
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.call(zoom.transform as any, transform);
			}
		});

		// Cleanup function
		return () => {
			if (simulationRef.current) {
				simulationRef.current.stop();
			}
		};
	}, [bubbleData]);

	// Handle click outside to close tooltip
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltip && !(event.target as Element).closest('.bubble')) {
				setTooltip(null);
			}
		};

		const handleTouchOutside = (event: TouchEvent) => {
			if (tooltip && !(event.target as Element).closest('.bubble')) {
				setTooltip(null);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('touchstart', handleTouchOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('touchstart', handleTouchOutside);
		};
	}, [tooltip]);

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
								<span
									dangerouslySetInnerHTML={{
										__html: tooltip.skill.description,
									}}
								/>
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
		</div>
	);
};

export default SkillsBubbleChart;
