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

		const formatPeriodDate = ts => {
			const d = new Date(ts);
			const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' });
			const day = String(d.getDate()).padStart(2, '0');
			const month = d.toLocaleDateString('en-GB', { month: 'short' });
			const year = d.getFullYear();
			return `${weekday} ${day} ${month} ${year}`;
		};
		const periodStart = formatPeriodDate(startAt);
		const periodEnd = formatPeriodDate(endAt);
		const trend = (curr, prev) => {
			if (curr > prev)
				return '<span style="color:#16a34a;font-size:14px;">&#9650;</span>';
			if (curr < prev)
				return '<span style="color:#dc2626;font-size:14px;">&#9660;</span>';
			return '<span style="color:#9ca3af;">&#8212;</span>';
		};

		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Site V2 - Umami Weekly Report</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ff;font-family:Montserrat,Arial,sans-serif;color:#171717;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #ddd6fe;">
          <tr><td>

            <!-- HEADER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#2e1065 0%,#4c1d95 40%,#6d28d9 100%);border-radius:8px 8px 0 0;">
              <tr>
                <td style="padding:24px 28px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:16px;">
                        <img src="https://bangsluke-assets.netlify.app/images/project-logos/Portfolio-Site-V2.png" alt="Portfolio Site V2" width="48" height="48" style="display:block;border-radius:8px;" />
                      </td>
                      <td style="vertical-align:middle;">
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#c4b5fd;margin-bottom:4px;">Portfolio Site V2</div>
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">Umami Weekly Report</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- NAV BAR -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#2e1065;border-bottom:3px solid #6d28d9;">
              <tr>
                <td style="padding:10px 28px;text-align:center;">
                  <a href="https://cloud.umami.is/analytics/eu/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488" style="font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:600;color:#ddd6fe;text-decoration:none;letter-spacing:0.5px;">Umami Overview</a>
                  <span style="color:#6d28d9;padding:0 12px;font-size:14px;">|</span>
                  <a href="https://cloud.umami.is/analytics/eu/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488/events" style="font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:600;color:#ddd6fe;text-decoration:none;letter-spacing:0.5px;">Umami Events</a>
                  <span style="color:#6d28d9;padding:0 12px;font-size:14px;">|</span>
                  <a href="https://cloud.umami.is/analytics/eu/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488/goals" style="font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:600;color:#ddd6fe;text-decoration:none;letter-spacing:0.5px;">Umami Goals</a>
                </td>
              </tr>
            </table>

            <!-- PERIOD META -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:14px 28px 0;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:#6b7280;">
                  Period: <strong>${periodStart}</strong> to <strong>${periodEnd}</strong> (last 7 days). Generated ${new Date().toISOString()}.
                </td>
              </tr>
            </table>

            <!-- TRAFFIC SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:20px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Traffic</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ddd6fe;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <thead>
                      <tr>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Metric</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Pageviews</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${stats.pageviews ?? 0}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${statsPrev.pageviews ?? 0}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(stats.pageviews ?? 0, statsPrev.pageviews ?? 0)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Visitors</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${stats.visitors ?? 0}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${statsPrev.visitors ?? 0}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(stats.visitors ?? 0, statsPrev.visitors ?? 0)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;">Visits</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;text-align:right;">${stats.visits ?? 0}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;text-align:right;">${statsPrev.visits ?? 0}</td>
                        <td style="padding:9px 14px;text-align:center;">${trend(stats.visits ?? 0, statsPrev.visits ?? 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ENGAGEMENT SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Engagement</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ddd6fe;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <thead>
                      <tr>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Action</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">LinkedIn Logo clicks</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${linkedin}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${linkedinPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(linkedin, linkedinPrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">GitHub Logo clicks</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${github}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${githubPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(github, githubPrev)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Contact Me (email) button clicks</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${contactClick}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${contactClickPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(contactClick, contactClickPrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Download CV button clicks</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${downloadCv}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${downloadCvPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(downloadCv, downloadCvPrev)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">About Me page views</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${aboutMeViews}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${aboutMeViewsPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(aboutMeViews, aboutMeViewsPrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Skills search opened</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${skillsOpened}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${skillsOpenedPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(skillsOpened, skillsOpenedPrev)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Skills search queries submitted</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${skillsQuery}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${skillsQueryPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(skillsQuery, skillsQueryPrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Skills search result click</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${skillsResultClick}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${skillsResultClickPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(skillsResultClick, skillsResultClickPrev)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Skills view toggle</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${skillsToggle}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${skillsTogglePrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(skillsToggle, skillsTogglePrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Project click (cards)</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${projectClick}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${projectClickPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(projectClick, projectClickPrev)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">"See more projects" click</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${seeMoreProjects}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${seeMoreProjectsPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(seeMoreProjects, seeMoreProjectsPrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">"See more items" (experience/education)</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${seeMoreItems}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${seeMoreItemsPrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(seeMoreItems, seeMoreItemsPrev)}</td>
                      </tr>
                      <tr style="background-color:#f5f3ff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">Visit Site button clicks (from individual project page)</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${visitSite}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;text-align:right;">${visitSitePrev}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid #ede9fe;text-align:center;">${trend(visitSite, visitSitePrev)}</td>
                      </tr>
                      <tr style="background-color:#ffffff;">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;">View Code button clicks (from individual project page)</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;text-align:right;">${viewCode}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;text-align:right;">${viewCodePrev}</td>
                        <td style="padding:9px 14px;text-align:center;">${trend(viewCode, viewCodePrev)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- MOST CLICKED PROJECTS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Most Clicked Projects (by card)</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ddd6fe;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <thead>
                      <tr>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Slug</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${
												topProjectClicks.length
													? topProjectClicks
															.map(
																(r, i) =>
																	`<tr style="background-color:${i % 2 === 0 ? '#f5f3ff' : '#ffffff'};"><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">${r.value || '-'}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${r.total ?? 0}</td></tr>`
															)
															.join('')
													: '<tr><td colspan="2" style="padding:12px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;text-align:center;">No data</td></tr>'
											}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- MOST VISITED PROJECT PAGES SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Most Visited Project Pages (by path)</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ddd6fe;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <thead>
                      <tr>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Path</th>
                        <th style="background-color:#6d28d9;color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Pageviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${
												projectPaths.length
													? projectPaths
															.map(
																(p, i) =>
																	`<tr style="background-color:${i % 2 === 0 ? '#f5f3ff' : '#ffffff'};"><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #ede9fe;">${p.x || '-'}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${p.y ?? 0}</td></tr>`
															)
															.join('')
													: '<tr><td colspan="2" style="padding:12px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;text-align:center;">No data</td></tr>'
											}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- FOOTER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ddd6fe;">
              <tr>
                <td style="padding:16px 28px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;">
                  <em>Automated by Netlify Scheduled Function (umami-report).</em>
                </td>
              </tr>
            </table>

          </td></tr>
        </table>
      </td>
    </tr>
  </table>
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
