/**
 * Netlify Scheduled Function: weekly Umami analytics report via Gmail.
 * Runs on schedule (@weekly = Sundays 00:00 UTC). Set env vars in Netlify UI:
 * UMAMI_WEBSITE_ID, UMAMI_API_KEY, GMAIL_USER, GMAIL_APP_PASSWORD, EMAIL_RECIPIENT, EMAIL_SENDER (optional).
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const UMAMI_BASE = 'https://api.umami.is/v1';
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

const EMAIL_COLORS = {
	pageBg: '#f4f6f8',
	cardBg: '#ffffff',
	border: '#d6dde6',
	rowAlt: '#eef2f6',
	rowBase: '#ffffff',
	text: '#171717',
	textMuted: '#5f6b7a',
	headerNavyDark: '#132238',
	headerNavyMid: '#1e3352',
	headerNavyLight: '#2c4a6e',
	navyAccent: '#4a7a9b',
	goldAccent: '#e8a838',
	goldSoft: '#f0b84a',
};

function loadReportContent() {
	try {
		const dir = path.dirname(fileURLToPath(import.meta.url));
		const raw = readFileSync(
			path.join(dir, 'umami-report-content.json'),
			'utf8'
		);
		return JSON.parse(raw);
	} catch {
		return { projectSlugToOrder: {}, blogSlugToPubDate: {} };
	}
}

function getOpts(apiKey) {
	return { headers: { Accept: 'application/json', 'x-umami-api-key': apiKey } };
}

function getEventCount(events, name) {
	const row = events.find(e => e.x === name);
	return row ? row.y : 0;
}

function stripeBg(i) {
	return i % 2 === 0 ? EMAIL_COLORS.rowAlt : EMAIL_COLORS.rowBase;
}

function formatPubDate(iso) {
	if (!iso) return '—';
	const d = new Date(/T/.test(iso) ? iso : `${iso}T12:00:00Z`);
	if (Number.isNaN(d.getTime())) return String(iso);
	const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' });
	const day = String(d.getUTCDate()).padStart(2, '0');
	const month = d.toLocaleDateString('en-GB', { month: 'short' });
	const year = d.getUTCFullYear();
	return `${weekday} ${day} ${month} ${year}`;
}

function metricRow(label, curr, prev, i, opts = {}) {
	const border = opts.last
		? ''
		: `border-bottom:1px solid ${EMAIL_COLORS.border};`;
	return `<tr style="background-color:${stripeBg(i)};">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};${border}">${label}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;${border}text-align:right;">${curr}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};${border}text-align:right;">${prev}</td>
                        <td style="padding:9px 14px;${border}text-align:center;">${opts.trendHtml ?? ''}</td>
                      </tr>`;
}

function formatCountryLabel(value) {
	if (!value) return 'Unknown';
	const code = String(value).trim();
	// Keep Umami full country names as-is.
	if (!/^[A-Za-z]{2}$/.test(code)) return code;
	try {
		const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
		const fullName = displayNames.of(code.toUpperCase());
		return fullName ? `${code.toUpperCase()} - ${fullName}` : code.toUpperCase();
	} catch {
		return code.toUpperCase();
	}
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

	const reportContent = loadReportContent();
	const slugToOrder = reportContent.projectSlugToOrder || {};
	const blogSlugToPubDate = reportContent.blogSlugToPubDate || {};

	const endAt = Date.now();
	const startAt = endAt - WEEK_MS;
	const prevEndAt = startAt;
	const prevStartAt = startAt - WEEK_MS;
	const trendWeeks = 16;
	const trendStartAt = endAt - trendWeeks * WEEK_MS;
	const q = `startAt=${startAt}&endAt=${endAt}`;
	const qPrev = `startAt=${prevStartAt}&endAt=${prevEndAt}`;

	try {
		const [
			statsRes,
			eventsRes,
			projectClickRes,
			pathRes,
			countryRes,
			socialRes,
			statsPrevRes,
			eventsPrevRes,
			pathPrevRes,
			countryPrevRes,
			socialPrevRes,
			northStarSeriesRes,
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
				`${UMAMI_BASE}/websites/${websiteId}/metrics?type=country&${q}&limit=10`,
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
				`${UMAMI_BASE}/websites/${websiteId}/metrics?type=country&${qPrev}&limit=50`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/event-data/values?event=Social%20click&propertyName=platform&${qPrev}`,
				getOpts(apiKey)
			),
			fetch(
				`${UMAMI_BASE}/websites/${websiteId}/events/series?startAt=${trendStartAt}&endAt=${endAt}&unit=day&timezone=UTC`,
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
		const countries = countryRes.ok ? await countryRes.json() : [];
		const countriesPrev = countryPrevRes.ok ? await countryPrevRes.json() : [];
		const socialClicks = socialRes.ok ? await socialRes.json() : [];
		const socialClicksPrev = socialPrevRes.ok ? await socialPrevRes.json() : [];
		const northStarSeries = northStarSeriesRes.ok
			? await northStarSeriesRes.json()
			: [];

		const linkedin = socialClicks.find(r => r.value === 'linkedin')?.total ?? 0;
		const github = socialClicks.find(r => r.value === 'github')?.total ?? 0;
		const linkedinPrev =
			socialClicksPrev.find(r => r.value === 'linkedin')?.total ?? 0;
		const githubPrev =
			socialClicksPrev.find(r => r.value === 'github')?.total ?? 0;

		const contactClick = getEventCount(events, 'Contact email click');
		const viewCv = getEventCount(events, 'View CV');
		const skillsOpened = getEventCount(events, 'Skills search opened');
		const skillsQuery = getEventCount(events, 'Skills search query');
		const skillsResultClick = getEventCount(
			events,
			'Skills search result click'
		);
		const skillsToggle = getEventCount(events, 'Skills view toggle');
		const projectClick = getEventCount(events, 'Project click');
		const blogNavClick = getEventCount(events, 'Blog nav click');
		const seeMoreProjects = getEventCount(events, 'See more Projects');
		const seeMoreExperienceItems = getEventCount(
			events,
			'See more Experience items'
		);
		const seeMoreEducationItems = getEventCount(
			events,
			'See more Education items'
		);
		const visitSite = getEventCount(events, 'Visit Site');
		const aboutMeButtonClick = getEventCount(events, 'About Me button click');

		const aboutMeRow = paths.find(p => p.x && p.x.includes('/about-me'));
		const aboutMeViews = aboutMeRow ? aboutMeRow.y : 0;
		const aboutMeRowPrev = pathsPrev.find(
			p => p.x && p.x.includes('/about-me')
		);
		const aboutMeViewsPrev = aboutMeRowPrev ? aboutMeRowPrev.y : 0;

		const contactClickPrev = getEventCount(eventsPrev, 'Contact email click');
		const viewCvPrev = getEventCount(eventsPrev, 'View CV');
		const skillsOpenedPrev = getEventCount(eventsPrev, 'Skills search opened');
		const skillsQueryPrev = getEventCount(eventsPrev, 'Skills search query');
		const skillsResultClickPrev = getEventCount(
			eventsPrev,
			'Skills search result click'
		);
		const skillsTogglePrev = getEventCount(eventsPrev, 'Skills view toggle');
		const projectClickPrev = getEventCount(eventsPrev, 'Project click');
		const blogNavClickPrev = getEventCount(eventsPrev, 'Blog nav click');
		const seeMoreProjectsPrev = getEventCount(eventsPrev, 'See more Projects');
		const seeMoreExperienceItemsPrev = getEventCount(
			eventsPrev,
			'See more Experience items'
		);
		const seeMoreEducationItemsPrev = getEventCount(
			eventsPrev,
			'See more Education items'
		);
		const visitSitePrev = getEventCount(eventsPrev, 'Visit Site');
		const aboutMeButtonClickPrev = getEventCount(
			eventsPrev,
			'About Me button click'
		);

		const projectPaths = paths
			.filter(p => p.x && p.x.includes('/projects/'))
			.sort((a, b) => (b.y || 0) - (a.y || 0))
			.slice(0, 10);
		const blogPostPaths = paths
			.filter(p => p.x && p.x.includes('/blog/posts/'))
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
			return `<span style="color:${EMAIL_COLORS.textMuted};">&#8212;</span>`;
		};

		const tableWrapStyle =
			`width:100%;border:1px solid ${EMAIL_COLORS.border};border-radius:6px;overflow:hidden;border-collapse:collapse;`;

		const northStarEventNames = new Set([
			'Social click',
			'About Me button click',
			'Project click',
			'See more Projects',
			'See more Experience items',
			'See more Education items',
			'View CV',
		]);

		const weekBuckets = Array.from({ length: trendWeeks }, (_, index) => ({
			start: trendStartAt + index * WEEK_MS,
			end: trendStartAt + (index + 1) * WEEK_MS,
			total: 0,
		}));

		for (const point of northStarSeries) {
			const eventName = point?.x;
			const timestamp = Date.parse(point?.t || '');
			const count = Number(point?.y || 0);
			if (
				!northStarEventNames.has(eventName) ||
				Number.isNaN(timestamp) ||
				timestamp < trendStartAt ||
				timestamp > endAt
			) {
				continue;
			}
			const bucketIndex = Math.min(
				trendWeeks - 1,
				Math.floor((timestamp - trendStartAt) / WEEK_MS)
			);
			if (bucketIndex >= 0 && bucketIndex < weekBuckets.length) {
				weekBuckets[bucketIndex].total += count;
			}
		}

		const trendMaxValue = Math.max(...weekBuckets.map(week => week.total), 1);
		const formatShortDate = ts =>
			new Date(ts).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
			});

		const northStarTrendRows = weekBuckets
			.map((week, i) => {
				const rangeLabel = `${formatShortDate(week.start)} - ${formatShortDate(
					week.end - DAY_MS
				)}`;
				const widthPct = Math.max(
					4,
					Math.round((week.total / trendMaxValue) * 100)
				);
				const rowBorder =
					i === weekBuckets.length - 1
						? ''
						: `border-bottom:1px solid ${EMAIL_COLORS.border};`;
				return `<tr style="background-color:${stripeBg(i)};">
                        <td style="padding:8px 12px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:${EMAIL_COLORS.text};white-space:nowrap;${rowBorder}">${rangeLabel}</td>
                        <td style="padding:8px 12px;${rowBorder}">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;height:10px;background:${EMAIL_COLORS.pageBg};border:1px solid ${EMAIL_COLORS.border};border-radius:999px;">
                            <tr>
                              <td style="width:${widthPct}%;background:${EMAIL_COLORS.navyAccent};border-radius:999px;"></td>
                              <td></td>
                            </tr>
                          </table>
                        </td>
                        <td style="padding:8px 12px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:${EMAIL_COLORS.text};font-weight:700;text-align:right;white-space:nowrap;${rowBorder}">${week.total}</td>
                      </tr>`;
			})
			.join('');

		const countryPrevLookup = new Map(
			countriesPrev.map(item => [item.x || 'Unknown', item.y || 0])
		);
		const topCountries = [...countries]
			.sort((a, b) => (b.y || 0) - (a.y || 0))
			.slice(0, 8);
		const countryRows =
			topCountries.length > 0
				? topCountries
						.map((country, i) => {
							const rawName = country.x || 'Unknown';
							const name = formatCountryLabel(rawName);
							const curr = country.y || 0;
							const prev = countryPrevLookup.get(rawName) ?? 0;
							const rowBorder =
								i === topCountries.length - 1
									? ''
									: `border-bottom:1px solid ${EMAIL_COLORS.border};`;
							return `<tr style="background-color:${stripeBg(i)};">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};${rowBorder}">${name}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;text-align:right;${rowBorder}">${curr}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};text-align:right;${rowBorder}">${prev}</td>
                        <td style="padding:9px 14px;text-align:center;${rowBorder}">${trend(curr, prev)}</td>
                      </tr>`;
						})
						.join('')
				: `<tr><td colspan="4" style="padding:12px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};text-align:center;">No country data</td></tr>`;

		const northStarDefs = [
			{ label: 'GitHub Logo clicks', curr: github, prev: githubPrev },
			{ label: 'LinkedIn Logo clicks', curr: linkedin, prev: linkedinPrev },
			{
				label: 'About Me button clicks',
				curr: aboutMeButtonClick,
				prev: aboutMeButtonClickPrev,
			},
			{
				label: 'Project Card clicks',
				curr: projectClick,
				prev: projectClickPrev,
			},
			{
				label: '&quot;See more Projects&quot; button clicks',
				curr: seeMoreProjects,
				prev: seeMoreProjectsPrev,
			},
			{
				label: '&quot;See more Experience items&quot; button clicks',
				curr: seeMoreExperienceItems,
				prev: seeMoreExperienceItemsPrev,
			},
			{
				label: '&quot;See more Education items&quot; button clicks',
				curr: seeMoreEducationItems,
				prev: seeMoreEducationItemsPrev,
			},
			{
				label: '&quot;View CV&quot; button clicks',
				curr: viewCv,
				prev: viewCvPrev,
			},
		];

		const northStarSumCurr = northStarDefs.reduce((s, r) => s + r.curr, 0);
		const northStarSumPrev = northStarDefs.reduce((s, r) => s + r.prev, 0);
		const recent4Weeks = weekBuckets.slice(-4).map(week => week.total);
		const prior4Weeks = weekBuckets.slice(-8, -4).map(week => week.total);
		const rolling4WeekAvgCurr = recent4Weeks.length
			? Math.round(
					recent4Weeks.reduce((sum, value) => sum + value, 0) /
						recent4Weeks.length
				)
			: 0;
		const rolling4WeekAvgPrev = prior4Weeks.length
			? Math.round(
					prior4Weeks.reduce((sum, value) => sum + value, 0) /
						prior4Weeks.length
				)
			: 0;

		const northStarTotalTable = `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 14px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:left;letter-spacing:0.5px;">Summary</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 14px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 14px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 14px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color:${EMAIL_COLORS.rowAlt};">
                        <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};">Total</td>
                        <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;color:${EMAIL_COLORS.text};text-align:right;border-bottom:1px solid ${EMAIL_COLORS.border};">${northStarSumCurr}</td>
                        <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;color:${EMAIL_COLORS.textMuted};text-align:right;border-bottom:1px solid ${EMAIL_COLORS.border};">${northStarSumPrev}</td>
                        <td style="padding:10px 14px;text-align:center;border-bottom:1px solid ${EMAIL_COLORS.border};">${trend(northStarSumCurr, northStarSumPrev)}</td>
                      </tr>
                      <tr style="background-color:${EMAIL_COLORS.rowBase};">
                        <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;color:${EMAIL_COLORS.text};">Rolling 4 Week Average</td>
                        <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;color:${EMAIL_COLORS.text};text-align:right;">${rolling4WeekAvgCurr}</td>
                        <td style="padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;color:${EMAIL_COLORS.textMuted};text-align:right;">${rolling4WeekAvgPrev}</td>
                        <td style="padding:10px 14px;text-align:center;">${trend(rolling4WeekAvgCurr, rolling4WeekAvgPrev)}</td>
                      </tr>
                    </tbody>
                  </table>`;

		const northStarDetailRows = northStarDefs
			.map((r, i) =>
				metricRow(r.label, r.curr, r.prev, i, {
					trendHtml: trend(r.curr, r.prev),
					last: i === northStarDefs.length - 1,
				})
			)
			.join('');

		const engagementDefs = [
			{ label: 'LinkedIn Logo clicks', curr: linkedin, prev: linkedinPrev },
			{ label: 'GitHub Logo clicks', curr: github, prev: githubPrev },
			{
				label: 'Contact Me (email) button clicks',
				curr: contactClick,
				prev: contactClickPrev,
			},
			{
				label: 'View CV button clicks',
				curr: viewCv,
				prev: viewCvPrev,
			},
			{
				label: 'About Me page views',
				curr: aboutMeViews,
				prev: aboutMeViewsPrev,
			},
			{
				label: 'Blog section nav clicks',
				curr: blogNavClick,
				prev: blogNavClickPrev,
			},
			{
				label: 'Skills search opened',
				curr: skillsOpened,
				prev: skillsOpenedPrev,
			},
			{
				label: 'Skills search queries submitted',
				curr: skillsQuery,
				prev: skillsQueryPrev,
			},
			{
				label: 'Skills search result click',
				curr: skillsResultClick,
				prev: skillsResultClickPrev,
			},
			{
				label: 'Skills view toggle',
				curr: skillsToggle,
				prev: skillsTogglePrev,
			},
			{
				label: 'Project click (cards)',
				curr: projectClick,
				prev: projectClickPrev,
			},
			{
				label: '&quot;See more Projects&quot; click',
				curr: seeMoreProjects,
				prev: seeMoreProjectsPrev,
			},
			{
				label: '&quot;See more Experience items&quot; click',
				curr: seeMoreExperienceItems,
				prev: seeMoreExperienceItemsPrev,
			},
			{
				label: '&quot;See more Education items&quot; click',
				curr: seeMoreEducationItems,
				prev: seeMoreEducationItemsPrev,
			},
			{
				label: 'Visit Site button clicks (from individual project page)',
				curr: visitSite,
				prev: visitSitePrev,
			},
		];

		const engagementRowsHtml = engagementDefs
			.map((r, i) =>
				metricRow(r.label, r.curr, r.prev, i, {
					trendHtml: trend(r.curr, r.prev),
					last: i === engagementDefs.length - 1,
				})
			)
			.join('');

		const projectClicksRows =
			topProjectClicks.length > 0
				? topProjectClicks
						.map((r, i) => {
							const slug = r.value || '-';
							const ord = slugToOrder[slug];
							const orderCell =
								ord === null || ord === undefined ? '—' : String(ord);
							return `<tr style="background-color:${stripeBg(i)};"><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};">${slug}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};text-align:center;">${orderCell}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${r.total ?? 0}</td></tr>`;
						})
						.join('')
				: `<tr><td colspan="3" style="padding:12px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};text-align:center;">No data</td></tr>`;

		const blogRows =
			blogPostPaths.length > 0
				? blogPostPaths
						.map((p, i) => {
							const postSlug = p.x
								? p.x.replace('/blog/posts/', '').replace(/\/$/, '')
								: '';
							const title = postSlug || '-';
							const pubRaw = postSlug ? blogSlugToPubDate[postSlug] : null;
							const pub = pubRaw ? formatPubDate(pubRaw) : '—';
							return `<tr style="background-color:${stripeBg(i)};"><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};">${title}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};border-bottom:1px solid ${EMAIL_COLORS.border};">${pub}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${p.y ?? 0}</td></tr>`;
						})
						.join('')
				: `<tr><td colspan="3" style="padding:12px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};text-align:center;">No data</td></tr>`;

		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Site - Umami Weekly Report</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL_COLORS.pageBg};font-family:Montserrat,Arial,sans-serif;color:${EMAIL_COLORS.text};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${EMAIL_COLORS.pageBg};padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;background-color:${EMAIL_COLORS.cardBg};border-radius:8px;overflow:hidden;border:1px solid ${EMAIL_COLORS.border};">
          <tr><td style="width:100%;padding:0;">

            <!-- HEADER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:linear-gradient(135deg,${EMAIL_COLORS.headerNavyDark} 0%,${EMAIL_COLORS.headerNavyMid} 40%,${EMAIL_COLORS.headerNavyLight} 100%);border-radius:8px 8px 0 0;">
              <tr>
                <td style="padding:24px 28px;width:100%;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                    <tr>
                      <td style="vertical-align:middle;padding-right:16px;width:64px;">
                        <img src="https://bangsluke-assets.netlify.app/images/project-logos/Portfolio-Site-V2.png" alt="Portfolio Site" width="48" height="48" style="display:block;border-radius:8px;" />
                      </td>
                      <td style="vertical-align:middle;width:100%;">
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#aabdd4;margin-bottom:4px;">Portfolio Site V2</div>
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">Umami Weekly Report</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- NAV BAR -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${EMAIL_COLORS.headerNavyDark};border-bottom:3px solid ${EMAIL_COLORS.goldAccent};">
              <tr>
                <td style="padding:10px 12px;text-align:center;white-space:nowrap;">
                  <a href="https://cloud.umami.is/analytics/eu/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488" style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;color:#dfe8f2;text-decoration:underline;letter-spacing:0.2px;">Umami Overview</a><span style="color:${EMAIL_COLORS.goldAccent};padding:0 4px;font-size:12px;">|</span><a href="https://cloud.umami.is/analytics/eu/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488/events" style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;color:#dfe8f2;text-decoration:underline;letter-spacing:0.2px;">Umami Events</a><span style="color:${EMAIL_COLORS.goldAccent};padding:0 4px;font-size:12px;">|</span><a href="https://cloud.umami.is/analytics/eu/websites/fad6adfb-2b8b-4868-a0a9-59d4fd860488/goals" style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;color:#dfe8f2;text-decoration:underline;letter-spacing:0.2px;">Umami Goals</a>
                </td>
              </tr>
            </table>

            <!-- PERIOD META -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:14px 28px 0;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:${EMAIL_COLORS.textMuted};">
                  Period: <strong>${periodStart}</strong> to <strong>${periodEnd}</strong> (last 7 days). Generated ${new Date().toISOString()}.
                </td>
              </tr>
            </table>

            <!-- TRAFFIC SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:20px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_COLORS.goldAccent};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${EMAIL_COLORS.border};">Traffic</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Metric</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color:${EMAIL_COLORS.rowAlt};">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};">Pageviews</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${stats.pageviews ?? 0}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${statsPrev.pageviews ?? 0}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:center;">${trend(stats.pageviews ?? 0, statsPrev.pageviews ?? 0)}</td>
                      </tr>
                      <tr style="background-color:${EMAIL_COLORS.rowBase};">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};">Visitors</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${stats.visitors ?? 0}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${statsPrev.visitors ?? 0}</td>
                        <td style="padding:9px 14px;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:center;">${trend(stats.visitors ?? 0, statsPrev.visitors ?? 0)}</td>
                      </tr>
                      <tr style="background-color:${EMAIL_COLORS.rowAlt};">
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};">Visits</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;text-align:right;">${stats.visits ?? 0}</td>
                        <td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};text-align:right;">${statsPrev.visits ?? 0}</td>
                        <td style="padding:9px 14px;text-align:center;">${trend(stats.visits ?? 0, statsPrev.visits ?? 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${EMAIL_COLORS.navyAccent};margin:0 0 8px;">Top countries by visitors</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Country</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${countryRows}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- NORTH STAR METRIC -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_COLORS.goldAccent};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${EMAIL_COLORS.border};">North Star Metric</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 10px;">
                  ${northStarTotalTable}
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 12px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};line-height:1.5;font-style:italic;">
                  &quot;Increase the number of users clicking to learn more information about me and my work&quot;
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Action</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${northStarDetailRows}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${EMAIL_COLORS.navyAccent};margin:0 0 8px;">16-week total trend</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 12px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:left;letter-spacing:0.5px;">Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 12px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:left;letter-spacing:0.5px;">Trend</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:8px 12px;font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:700;text-align:right;letter-spacing:0.5px;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${northStarTrendRows}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- FULL ENGAGEMENT DATA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_COLORS.goldAccent};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${EMAIL_COLORS.border};">Full Engagement Data</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Action</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">This Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Prev. Week</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;width:48px;">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${engagementRowsHtml}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- MOST CLICKED PROJECTS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_COLORS.goldAccent};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${EMAIL_COLORS.border};">Most Clicked Projects (by card)</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Slug</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:center;letter-spacing:0.5px;">portfolioOrder</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${projectClicksRows}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- MOST VISITED PROJECT PAGES SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_COLORS.goldAccent};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${EMAIL_COLORS.border};">Most Visited Project Pages (by path)</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Path</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Pageviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${
												projectPaths.length
													? projectPaths
															.map(
																(p, i) =>
																`<tr style="background-color:${stripeBg(i)};"><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};border-bottom:1px solid ${EMAIL_COLORS.border};">${p.x || '-'}</td><td style="padding:9px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.text};font-weight:700;border-bottom:1px solid ${EMAIL_COLORS.border};text-align:right;">${p.y ?? 0}</td></tr>`
															)
															.join('')
													: `<tr><td colspan="2" style="padding:12px 14px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${EMAIL_COLORS.textMuted};text-align:center;">No data</td></tr>`
											}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- MOST VISITED BLOG POSTS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td style="padding:4px 28px 0;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_COLORS.goldAccent};margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid ${EMAIL_COLORS.border};">Most Visited Blog Posts (by path)</div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="${tableWrapStyle}">
                    <thead>
                      <tr>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Post</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Published</th>
                        <th style="background-color:${EMAIL_COLORS.headerNavyLight};color:#fff;padding:10px 14px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:right;letter-spacing:0.5px;">Visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${blogRows}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>

            <!-- FOOTER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-top:1px solid ${EMAIL_COLORS.border};">
              <tr>
                <td style="padding:16px 28px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:${EMAIL_COLORS.textMuted};line-height:1.5;">
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
			subject: `Portfolio Site - Umami Weekly Report (${periodStart} to ${periodEnd})`,
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
