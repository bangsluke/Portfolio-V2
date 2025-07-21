// @ts-ignore
import GitHubCalendar from 'preact-github-calendar';
import { useEffect, useState } from 'preact/hooks';

interface GitHubStats {
	stars: number;
	repositories: number;
	followers: number;
	following: number;
}

export default function GitHubContributions() {
	const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [calendarError, setCalendarError] = useState<string | null>(null);

	const username = 'bangsluke';
	const githubUrl = `https://github.com/${username}`;

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

				// Get starred repositories count
				const starsResponse = await fetch(
					`https://api.github.com/users/${username}/repos?per_page=100`
				);
				if (starsResponse.ok) {
					const repos = await starsResponse.json();
					const totalStars = repos.reduce(
						(acc: number, repo: any) => acc + repo.stargazers_count,
						0
					);

					setGithubStats({
						stars: totalStars,
						repositories: userData.public_repos,
						followers: userData.followers,
						following: userData.following,
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
		<section id="github-contributions" class="flex flex-col gap-4 w-full">
			{/* GitHub Profile Link */}
			<div class="flex items-center justify-between">
				<h4 class="text-lg font-semibold text-white">GitHub Activity</h4>
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-theme-300 hover:text-theme-200 transition-colors text-sm flex items-center gap-2">
					View Profile
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
						<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
					</svg>
				</a>
			</div>

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
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
					<div class="text-center p-3 bg-white/10 rounded-lg">
						<div class="text-2xl font-bold text-theme-300">
							{githubStats.stars}
						</div>
						<div class="text-xs text-white/70">Stars</div>
					</div>
					<div class="text-center p-3 bg-white/10 rounded-lg">
						<div class="text-2xl font-bold text-theme-300">
							{githubStats.repositories}
						</div>
						<div class="text-xs text-white/70">Repositories</div>
					</div>
					<div class="text-center p-3 bg-white/10 rounded-lg">
						<div class="text-2xl font-bold text-theme-300">
							{githubStats.followers}
						</div>
						<div class="text-xs text-white/70">Followers</div>
					</div>
					<div class="text-center p-3 bg-white/10 rounded-lg">
						<div class="text-2xl font-bold text-theme-300">
							{githubStats.following}
						</div>
						<div class="text-xs text-white/70">Following</div>
					</div>
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
        #github-contributions * {
          color: #fff !important;
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
        .github-calendar__graph-label {
          fill: #fff !important;
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
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
		</section>
	);
}
