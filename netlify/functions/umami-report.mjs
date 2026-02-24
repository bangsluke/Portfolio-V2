/**
 * Netlify Scheduled Function: weekly Umami analytics report via Gmail.
 * Runs on schedule (@weekly = Sundays 00:00 UTC). Set env vars in Netlify UI:
 * UMAMI_WEBSITE_ID, UMAMI_API_KEY, GMAIL_USER, GMAIL_APP_PASSWORD, EMAIL_RECIPIENT, EMAIL_SENDER (optional).
 */

import nodemailer from 'nodemailer';

const UMAMI_BASE = 'https://api.umami.is/v1';

function getOpts(apiKey) {
	return { headers: { Accept: 'application/json', 'x-umami-api-key': apiKey } };
}

function getEventCount(events, name) {
	const row = events.find(e => e.x === name);
	return row ? row.y : 0;
}

export default async () => {
	const websiteId = process.env.UMAMI_WEBSITE_ID;
	const apiKey = process.env.UMAMI_API_KEY;
	const to = process.env.EMAIL_RECIPIENT;
	const from = process.env.EMAIL_SENDER || process.env.GMAIL_USER;
	const user = process.env.GMAIL_USER;
	const pass = process.env.GMAIL_APP_PASSWORD;

	if (!websiteId || !apiKey || !to || !user || !pass) {
		console.error(
			'Missing env: UMAMI_WEBSITE_ID, UMAMI_API_KEY, EMAIL_RECIPIENT, GMAIL_USER, GMAIL_APP_PASSWORD'
		);
		return new Response(JSON.stringify({ error: 'Missing configuration' }), {
			status: 500,
		});
	}

	const endAt = Date.now();
	const startAt = endAt - 7 * 24 * 60 * 60 * 1000;
	const prevEndAt = startAt;
	const prevStartAt = startAt - 7 * 24 * 60 * 60 * 1000;
	const q = `startAt=${startAt}&endAt=${endAt}`;
	const qPrev = `startAt=${prevStartAt}&endAt=${prevEndAt}`;

	try {
		const [
			statsRes,
			eventsRes,
			projectClickRes,
			pathRes,
			socialRes,
			statsPrevRes,
			eventsPrevRes,
			pathPrevRes,
			socialPrevRes,
		] = await Promise.all([
			fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?${q}`, getOpts(apiKey)),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/metrics?type=event&${q}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/event-data/values?event=Project%20click&propertyName=slug&${q}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/metrics?type=path&${q}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/event-data/values?event=Social%20click&propertyName=platform&${q}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/stats?${qPrev}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/metrics?type=event&${qPrev}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/metrics?type=path&${qPrev}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/event-data/values?event=Social%20click&propertyName=platform&${qPrev}`,
				getOpts(apiKey)
			),
		]);

		const stats = statsRes.ok
			? await statsRes.json()
			: { pageviews: 0, visitors: 0, visits: 0 };
		const statsPrev = statsPrevRes.ok
			? await statsPrevRes.json()
			: { pageviews: 0, visitors: 0, visits: 0 };
		const events = eventsRes.ok ? await eventsRes.json() : [];
		const eventsPrev = eventsPrevRes.ok ? await eventsPrevRes.json() : [];
		const projectClicks = projectClickRes.ok
			? await projectClickRes.json()
			: [];
		const paths = pathRes.ok ? await pathRes.json() : [];
		const pathsPrev = pathPrevRes.ok ? await pathPrevRes.json() : [];
		const socialClicks = socialRes.ok ? await socialRes.json() : [];
		const socialClicksPrev = socialPrevRes.ok ? await socialPrevRes.json() : [];

		const linkedin = socialClicks.find(r => r.value === 'linkedin')?.total ?? 0;
		const github = socialClicks.find(r => r.value === 'github')?.total ?? 0;
		const linkedinPrev =
			socialClicksPrev.find(r => r.value === 'linkedin')?.total ?? 0;
		const githubPrev =
			socialClicksPrev.find(r => r.value === 'github')?.total ?? 0;

		const contactClick = getEventCount(events, 'Contact email click');
		const downloadCv = getEventCount(events, 'Download CV');
		const skillsOpened = getEventCount(events, 'Skills search opened');
		const skillsQuery = getEventCount(events, 'Skills search query');
		const skillsResultClick = getEventCount(
			events,
			'Skills search result click'
		);
		const skillsToggle = getEventCount(events, 'Skills view toggle');
		const projectClick = getEventCount(events, 'Project click');
		const seeMoreProjects = getEventCount(events, 'See more projects');
		const seeMoreItems = getEventCount(events, 'See more items');
		const visitSite = getEventCount(events, 'Visit Site');
		const viewCode = getEventCount(events, 'View Code');

		const aboutMeRow = paths.find(p => p.x && p.x.includes('/about-me'));
		const aboutMeViews = aboutMeRow ? aboutMeRow.y : 0;
		const aboutMeRowPrev = pathsPrev.find(
			p => p.x && p.x.includes('/about-me')
		);
		const aboutMeViewsPrev = aboutMeRowPrev ? aboutMeRowPrev.y : 0;

		const contactClickPrev = getEventCount(eventsPrev, 'Contact email click');
		const downloadCvPrev = getEventCount(eventsPrev, 'Download CV');
		const skillsOpenedPrev = getEventCount(eventsPrev, 'Skills search opened');
		const skillsQueryPrev = getEventCount(eventsPrev, 'Skills search query');
		const skillsResultClickPrev = getEventCount(
			eventsPrev,
			'Skills search result click'
		);
		const skillsTogglePrev = getEventCount(eventsPrev, 'Skills view toggle');
		const projectClickPrev = getEventCount(eventsPrev, 'Project click');
		const seeMoreProjectsPrev = getEventCount(eventsPrev, 'See more projects');
		const seeMoreItemsPrev = getEventCount(eventsPrev, 'See more items');
		const visitSitePrev = getEventCount(eventsPrev, 'Visit Site');
		const viewCodePrev = getEventCount(eventsPrev, 'View Code');

		const projectPaths = paths
			.filter(p => p.x && p.x.includes('/projects/'))
			.sort((a, b) => (b.y || 0) - (a.y || 0))
			.slice(0, 10);
		const topProjectClicks = [...projectClicks]
			.sort((a, b) => (b.total || 0) - (a.total || 0))
			.slice(0, 10);

		const periodStart = new Date(startAt).toISOString().slice(0, 10);
		const periodEnd = new Date(endAt).toISOString().slice(0, 10);

		const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:Arial,sans-serif;line-height:1.5;color:#171717;max-width:640px;margin:0 auto;padding:20px;}
  h1{font-size:1.25rem;margin-bottom:0.5rem;}
  .meta{color:#666;font-size:0.875rem;margin-bottom:1.5rem;}
  section{margin:1.25rem 0;}
  section h2{font-size:1rem;margin:0 0 0.5rem;border-bottom:1px solid #ddd6fe;}
  .report-table{width:100%;border-collapse:collapse;border:1px solid #ddd6fe;}
  .report-table th,.report-table td{text-align:left;padding:8px 12px;border-bottom:1px solid #ede9fe;}
  .report-table th{background:#6d28d9;color:#fff;font-weight:600;}
  .report-table tbody tr:nth-child(even){background:#f5f3ff;}
  .report-table tbody tr:nth-child(odd){background:#fff;}
  .footer{margin-top:2rem;padding-top:1rem;border-top:1px solid #ddd6fe;font-size:0.75rem;color:#666;}
</style></head>
<body>
  <h1>Portfolio Site V2 - Umami Weekly Report</h1>
  <p class="meta">Period: ${periodStart} to ${periodEnd} (last 7 days). Generated ${new Date().toISOString()}.</p>

  <section>
    <h2>Traffic</h2>
    <table class="report-table">
      <tr><th>Metric</th><th>Count</th><th>Previous week</th></tr>
      <tr><td>Pageviews</td><td>${stats.pageviews ?? 0}</td><td>${statsPrev.pageviews ?? 0}</td></tr>
      <tr><td>Visitors</td><td>${stats.visitors ?? 0}</td><td>${statsPrev.visitors ?? 0}</td></tr>
      <tr><td>Visits</td><td>${stats.visits ?? 0}</td><td>${statsPrev.visits ?? 0}</td></tr>
    </table>
  </section>

  <section>
    <h2>Engagement</h2>
    <table class="report-table">
      <tr><th>Action</th><th>Count</th><th>Previous week</th></tr>
      <tr><td>LinkedIn Logo clicks</td><td>${linkedin}</td><td>${linkedinPrev}</td></tr>
      <tr><td>GitHub Logo clicks</td><td>${github}</td><td>${githubPrev}</td></tr>
      <tr><td>Contact Me (email) button clicks</td><td>${contactClick}</td><td>${contactClickPrev}</td></tr>
      <tr><td>Download CV button clicks</td><td>${downloadCv}</td><td>${downloadCvPrev}</td></tr>
      <tr><td>About Me page views</td><td>${aboutMeViews}</td><td>${aboutMeViewsPrev}</td></tr>
      <tr><td>Skills search opened</td><td>${skillsOpened}</td><td>${skillsOpenedPrev}</td></tr>
      <tr><td>Skills search queries submitted</td><td>${skillsQuery}</td><td>${skillsQueryPrev}</td></tr>
      <tr><td>Skills search result click</td><td>${skillsResultClick}</td><td>${skillsResultClickPrev}</td></tr>
      <tr><td>Skills view toggle</td><td>${skillsToggle}</td><td>${skillsTogglePrev}</td></tr>
      <tr><td>Project click (cards)</td><td>${projectClick}</td><td>${projectClickPrev}</td></tr>
      <tr><td>"See more projects" click</td><td>${seeMoreProjects}</td><td>${seeMoreProjectsPrev}</td></tr>
      <tr><td>"See more items" (experience/education)</td><td>${seeMoreItems}</td><td>${seeMoreItemsPrev}</td></tr>
      <tr><td>Visit Site button clicks (from individual project page)</td><td>${visitSite}</td><td>${visitSitePrev}</td></tr>
      <tr><td>View Code button clicks (from individual project page)</td><td>${viewCode}</td><td>${viewCodePrev}</td></tr>
    </table>
  </section>

  <section>
    <h2>Most clicked projects (by card)</h2>
    <table class="report-table">
      <tr><th>Slug</th><th>Clicks</th></tr>
      ${topProjectClicks.length ? topProjectClicks.map(r => `<tr><td>${r.value || '-'}</td><td>${r.total ?? 0}</td></tr>`).join('') : '<tr><td colspan="2">No data</td></tr>'}
    </table>
  </section>

  <section>
    <h2>Most visited project pages (by path)</h2>
    <table class="report-table">
      <tr><th>Path</th><th>Pageviews</th></tr>
      ${projectPaths.length ? projectPaths.map(p => `<tr><td>${p.x || '-'}</td><td>${p.y ?? 0}</td></tr>`).join('') : '<tr><td colspan="2">No data</td></tr>'}
    </table>
  </section>

  <p class="footer">Automated by Netlify Scheduled Function (umami-report).</p>
</body>
</html>`;

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: { user, pass },
			tls: { rejectUnauthorized: false },
		});
		await transporter.sendMail({
			from,
			to,
			subject: `Portfolio Site V2 - Umami Weekly Report (${periodStart} to ${periodEnd})`,
			html,
		});
	} catch (err) {
		console.error('umami-report error:', err);
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}

	return new Response(JSON.stringify({ ok: true, message: 'Report sent' }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const config = {
	schedule: '@weekly',
};
