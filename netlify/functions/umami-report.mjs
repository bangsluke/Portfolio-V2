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
  const row = events.find((e) => e.x === name);
  return row ? row.y : 0;
}

export default async (req) => {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const apiKey = process.env.UMAMI_API_KEY;
  const to = process.env.EMAIL_RECIPIENT;
  const from = process.env.EMAIL_SENDER || process.env.GMAIL_USER;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!websiteId || !apiKey || !to || !user || !pass) {
    console.error('Missing env: UMAMI_WEBSITE_ID, UMAMI_API_KEY, EMAIL_RECIPIENT, GMAIL_USER, GMAIL_APP_PASSWORD');
    return new Response(JSON.stringify({ error: 'Missing configuration' }), { status: 500 });
  }

  const endAt = Date.now();
  const startAt = endAt - 7 * 24 * 60 * 60 * 1000;
  const q = `startAt=${startAt}&endAt=${endAt}`;

  try {
    const [statsRes, eventsRes, projectClickRes, pathRes, socialRes] = await Promise.all([
      fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?${q}`, getOpts(apiKey)),
      fetch(`${UMAMI_BASE}/websites/${websiteId}/metrics?type=event&${q}`, getOpts(apiKey)),
      fetch(
        `${UMAMI_BASE}/websites/${websiteId}/event-data/values?event=Project%20click&propertyName=slug&${q}`,
        getOpts(apiKey)
      ),
      fetch(`${UMAMI_BASE}/websites/${websiteId}/metrics?type=path&${q}`, getOpts(apiKey)),
      fetch(
        `${UMAMI_BASE}/websites/${websiteId}/event-data/values?event=Social%20click&propertyName=platform&${q}`,
        getOpts(apiKey)
      ),
    ]);

    const stats = statsRes.ok ? await statsRes.json() : { pageviews: 0, visitors: 0, visits: 0 };
    const events = eventsRes.ok ? await eventsRes.json() : [];
    const projectClicks = projectClickRes.ok ? await projectClickRes.json() : [];
    const paths = pathRes.ok ? await pathRes.json() : [];
    const socialClicks = socialRes.ok ? await socialRes.json() : [];

    const linkedin = socialClicks.find((r) => r.value === 'linkedin')?.total ?? 0;
    const github = socialClicks.find((r) => r.value === 'github')?.total ?? 0;

    const contactClick = getEventCount(events, 'Contact email click');
    const downloadCv = getEventCount(events, 'Download CV');
    const skillsOpened = getEventCount(events, 'Skills search opened');
    const skillsQuery = getEventCount(events, 'Skills search query');
    const skillsResultClick = getEventCount(events, 'Skills search result click');
    const skillsToggle = getEventCount(events, 'Skills view toggle');
    const projectClick = getEventCount(events, 'Project click');
    const seeMoreProjects = getEventCount(events, 'See more projects');
    const seeMoreItems = getEventCount(events, 'See more items');
    const visitSite = getEventCount(events, 'Visit Site');
    const viewCode = getEventCount(events, 'View Code');

    const aboutMeRow = paths.find((p) => p.x && p.x.includes('/about-me'));
    const aboutMeViews = aboutMeRow ? aboutMeRow.y : 0;
    const projectPaths = paths.filter((p) => p.x && p.x.includes('/projects/')).sort((a, b) => (b.y || 0) - (a.y || 0)).slice(0, 10);
    const topProjectClicks = [...projectClicks].sort((a, b) => (b.total || 0) - (a.total || 0)).slice(0, 10);

    const periodStart = new Date(startAt).toISOString().slice(0, 10);
    const periodEnd = new Date(endAt).toISOString().slice(0, 10);

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:Arial,sans-serif;line-height:1.5;color:#333;max-width:640px;margin:0 auto;padding:20px;}
  h1{font-size:1.25rem;margin-bottom:0.5rem;}
  .meta{color:#666;font-size:0.875rem;margin-bottom:1.5rem;}
  section{margin:1.25rem 0;}
  section h2{font-size:1rem;margin:0 0 0.5rem;border-bottom:1px solid #eee;}
  table{width:100%;border-collapse:collapse;}
  th,td{text-align:left;padding:4px 8px;border-bottom:1px solid #eee;}
  th{font-weight:600;}
  .footer{margin-top:2rem;padding-top:1rem;border-top:1px solid #ddd;font-size:0.75rem;color:#666;}
</style></head>
<body>
  <h1>Portfolio Umami — Weekly Report</h1>
  <p class="meta">Period: ${periodStart} to ${periodEnd} (last 7 days). Generated ${new Date().toISOString()}.</p>

  <section>
    <h2>Traffic</h2>
    <table>
      <tr><th>Metric</th><th>Count</th></tr>
      <tr><td>Pageviews</td><td>${stats.pageviews ?? 0}</td></tr>
      <tr><td>Visitors</td><td>${stats.visitors ?? 0}</td></tr>
      <tr><td>Visits</td><td>${stats.visits ?? 0}</td></tr>
    </table>
  </section>

  <section>
    <h2>Engagement</h2>
    <table>
      <tr><th>Action</th><th>Count</th></tr>
      <tr><td>LinkedIn clicks</td><td>${linkedin}</td></tr>
      <tr><td>GitHub clicks</td><td>${github}</td></tr>
      <tr><td>Contact Me (email)</td><td>${contactClick}</td></tr>
      <tr><td>Download CV</td><td>${downloadCv}</td></tr>
      <tr><td>About Me page views</td><td>${aboutMeViews}</td></tr>
      <tr><td>Skills search opened</td><td>${skillsOpened}</td></tr>
      <tr><td>Skills search query</td><td>${skillsQuery}</td></tr>
      <tr><td>Skills search result click</td><td>${skillsResultClick}</td></tr>
      <tr><td>Skills view toggle</td><td>${skillsToggle}</td></tr>
      <tr><td>Project click (cards)</td><td>${projectClick}</td></tr>
      <tr><td>See more projects</td><td>${seeMoreProjects}</td></tr>
      <tr><td>See more items (exp/edu)</td><td>${seeMoreItems}</td></tr>
      <tr><td>Visit Site (project page)</td><td>${visitSite}</td></tr>
      <tr><td>View Code (project page)</td><td>${viewCode}</td></tr>
    </table>
  </section>

  <section>
    <h2>Most clicked projects (by card)</h2>
    <table>
      <tr><th>Slug</th><th>Clicks</th></tr>
      ${topProjectClicks.length ? topProjectClicks.map((r) => `<tr><td>${r.value || '-'}</td><td>${r.total ?? 0}</td></tr>`).join('') : '<tr><td colspan="2">No data</td></tr>'}
    </table>
  </section>

  <section>
    <h2>Most visited project pages (by path)</h2>
    <table>
      <tr><th>Path</th><th>Pageviews</th></tr>
      ${projectPaths.length ? projectPaths.map((p) => `<tr><td>${p.x || '-'}</td><td>${p.y ?? 0}</td></tr>`).join('') : '<tr><td colspan="2">No data</td></tr>'}
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
      subject: `Portfolio Umami — Weekly report (${periodStart} to ${periodEnd})`,
      html,
    });
  } catch (err) {
    console.error('umami-report error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true, message: 'Report sent' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = {
  schedule: '@weekly',
};
