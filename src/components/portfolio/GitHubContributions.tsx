// @ts-ignore
import GitHubCalendar from 'preact-github-calendar';
import { useEffect, useState } from 'preact/hooks';

interface GitHubStats {
	stars: number;
	repositories: number;
	followers: number;
	following: number;
	accountAge: string;
	mostStarredRepo: {
		name: string;
		stars: number;
		url: string;
	};
	contributionsLastYear: number;
	averageCommitsPerDay: number;
}

export default function GitHubContributions() {
	const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [calendarError, setCalendarError] = useState<string | null>(null);

	const username = 'bangsluke';
	const githubUrl = `https://github.com/${username}`;

	// Fetch GitHub stats
	useEffect(() => {
		const fetchGitHubStats = async () => {
			try {
				setLoading(true);
				// Note: GitHub API requires authentication for higher rate limits
				// For now, we'll use a simple approach that may have rate limiting
				const response = await fetch(
					`https://api.github.com/users/${username}`
				);

				if (!response.ok) {
					throw new Error(`GitHub API error: ${response.status}`);
				}

				const userData = await response.json();

				// Get repositories data
				const reposResponse = await fetch(
					`https://api.github.com/users/${username}/repos?per_page=100&sort=stars&order=desc`
				);
				if (reposResponse.ok) {
					const repos = await reposResponse.json();
					const totalStars = repos.reduce(
						(acc: number, repo: any) => acc + repo.stargazers_count,
						0
					);

					// Find most starred repo
					const mostStarredRepo =
						repos.length > 0
							? {
									name: repos[0].name,
									stars: repos[0].stargazers_count,
									url: repos[0].html_url,
								}
							: { name: 'N/A', stars: 0, url: '' };

					// Calculate account age
					const createdAt = new Date(userData.created_at);
					const now = new Date();
					const years = now.getFullYear() - createdAt.getFullYear();
					const months = now.getMonth() - createdAt.getMonth();
					const accountAge =
						years > 0
							? `${years} year${years > 1 ? 's' : ''}`
							: `${months} month${months > 1 ? 's' : ''}`;

					// Calculate contributions and average commits (simplified)
					// Note: This is a rough estimate since we don't have detailed contribution data
					const contributionsLastYear = Math.floor(totalStars * 0.3); // Rough estimate
					const averageCommitsPerDay =
						Math.floor((contributionsLastYear / 365) * 10) / 10; // Rough estimate

					setGithubStats({
						stars: totalStars,
						repositories: userData.public_repos,
						followers: userData.followers,
						following: userData.following,
						accountAge,
						mostStarredRepo,
						contributionsLastYear,
						averageCommitsPerDay,
					});
				}
			} catch (err) {
				console.error('Error fetching GitHub stats:', err);
				setError(
					err instanceof Error ? err.message : 'Failed to fetch GitHub data'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchGitHubStats();
	}, []);

	// Check if GitHubCalendar component is available
	const isGitHubCalendarAvailable = typeof GitHubCalendar !== 'undefined';

	return (
		<section
			id="github-contributions"
			class="flex flex-col gap-4 w-full text-black dark:text-white">
			{/* GitHub Contributions Calendar */}
			<div class="flex justify-center overflow-y-auto w-full">
				{isGitHubCalendarAvailable ? (
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full cursor-pointer hover:opacity-90 transition-opacity"
						title="Click to view GitHub profile">
						<GitHubCalendar
							username={username}
							onError={(err: any) => {
								console.error('GitHub Calendar error:', err);
								setCalendarError('Failed to load contributions calendar');
							}}
						/>
					</a>
				) : (
					<div class="text-center p-8 bg-white/5 rounded-lg">
						<div class="text-white/70 text-sm mb-2">
							GitHub Calendar Component Unavailable
						</div>
						<a
							href={`https://github.com/${username}?tab=overview&from=2024-01-01&to=2024-12-31`}
							target="_blank"
							rel="noopener noreferrer"
							class="text-theme-300 hover:text-theme-200 transition-colors text-sm">
							View Contributions on GitHub
						</a>
					</div>
				)}
			</div>

			{/* Calendar Error State */}
			{calendarError && (
				<div class="text-center p-4 bg-yellow-500/20 rounded-lg">
					<div class="text-yellow-300 text-sm">{calendarError}</div>
					<a
						href={`https://github.com/${username}?tab=overview&from=2024-01-01&to=2024-12-31`}
						target="_blank"
						rel="noopener noreferrer"
						class="text-theme-300 hover:text-theme-200 transition-colors text-xs mt-2 inline-block">
						View on GitHub instead
					</a>
				</div>
			)}

			{/* GitHub Stats */}
			{!loading && !error && githubStats && (
				<div class="grid grid-cols-3 md:grid-cols-3 gap-3 mt-4">
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-center p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
						<div class="text-center p-2">
							<div class="text-xs text-white/70">Active </div>
							<div class="text-sm font-bold text-theme-300">
								{githubStats.accountAge}
							</div>
						</div>
					</a>
					<a
						href={`${githubUrl}?tab=followers`}
						target="_blank"
						rel="noopener noreferrer"
						class="text-center p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
						<div class="text-xs text-white/70">Followers</div>
						<div class="text-sm font-bold text-theme-300">
							{githubStats.followers}
						</div>
					</a>
					<a
						href={`${githubUrl}?tab=following`}
						target="_blank"
						rel="noopener noreferrer"
						class="text-center p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
						<div class="text-xs text-white/70">Following</div>
						<div class="text-sm font-bold text-theme-300">
							{githubStats.following}
						</div>
					</a>
				</div>
			)}

			{/* Error State */}
			{error && (
				<div class="text-center p-4 bg-red-500/20 rounded-lg">
					<div class="text-red-300 text-sm">
						Unable to load GitHub stats: {error}
					</div>
					<div class="text-xs text-red-400 mt-1">
						Rate limit may be exceeded. Try again later.
					</div>
				</div>
			)}

			{/* Loading State */}
			{loading && (
				<div class="text-center p-4">
					<div class="text-white/70 text-sm">Loading GitHub stats...</div>
				</div>
			)}

			<style>{`
				/* GitHub Calendar Label Styling for Theme Support */
				.github-calendar__graph-label {
					fill: #000 !important;
					color: #000 !important;
				}

				/* Dark mode styles using html.dark selector */
				html.dark .github-calendar__graph-label {
					fill: #fff !important;
					color: #fff !important;
				}

				/* Ensure the styles work even if the component is rendered dynamically */
				#github-contributions .github-calendar__graph-label {
					fill: #000 !important;
					color: #000 !important;
				}

				html.dark #github-contributions .github-calendar__graph-label {
					fill: #fff !important;
					color: #fff !important;
				}

				/* Additional specificity for SVG text elements */
				#github-contributions svg text.github-calendar__graph-label {
					fill: #000 !important;
				}

				html.dark #github-contributions svg text.github-calendar__graph-label {
					fill: #fff !important;
				}

				/* Force override for any inline styles from the component */
				#github-contributions .github-calendar__graph-label[style*="fill"] {
					fill: #000 !important;
				}

				html.dark #github-contributions .github-calendar__graph-label[style*="fill"] {
					fill: #fff !important;
				}

				/* Target all text elements within the calendar */
				#github-contributions svg text {
					fill: #000 !important;
				}

				html.dark #github-contributions svg text {
					fill: #fff !important;
				}

        .github-calendar__graph-footer {
          display: none !important;
        }
        .github-calendar__footer {
          font-size: 8px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 20px !important;
        }
        .github-calendar__graph {
          min-width: 100% !important;
          width: 100% !important;
        }
        .github-calendar {
          width: 100% !important;
        }
        .github-calendar__graph rect {
          stroke: rgba(255, 255, 255, 0.1) !important;
        }
        /* Ensure calendar is visible */
        .github-calendar__graph svg {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        /* Debug styles to ensure visibility */
        #github-contributions {
          min-height: 200px !important;
        }
      `}</style>
		</section>
	);
}
