# Umami Tracking Report — Portfolio V2

This document explains how the portfolio’s tracking code works with Umami, how to view each metric in the Umami interface, and how to pull metrics (including total views over the past week) into Google Sheets.

---

## 1. How the Code Enables Tracking

The site uses two mechanisms supported by [Umami’s event tracking](https://umami.is/docs/track-events):

- **Data attributes (HTML):** Any clickable element can send an event by adding `data-umami-event="{event-name}"`. Optional extra data is sent via attributes like `data-umami-event-{key}="{value}"` (e.g. `data-umami-event-platform="linkedin"`). The Umami script reads these on click and sends one event per click with the given name and properties. Event names are limited to 50 characters.
- **JavaScript:** For dynamic or complex cases, the code calls `window.umami.track('Event name', { key: 'value' })`. This sends an event with the same name and optional key/value data.

All of these events appear under your website’s **Events** in Umami. Custom properties are available under the **Properties** tab for each event.

### Metric → Event Mapping

| Metric | Event name | Property (optional) | Where it’s implemented |
|--------|------------|----------------------|--------------------------|
| Clicks to LinkedIn | Social click | platform = `linkedin` | `Social.astro` (header) |
| Clicks to GitHub | Social click | platform = `github` | `Social.astro` (header) |
| “Contact Me” (email) clicks | Contact email click | — | `Contact.astro` |
| “About Me” reads | (Page view) | path = `/about-me` | Umami pageview; no extra code |
| Skills search used | Skills search opened, Skills search query, Skills search result click | query, skill, etc. | `SkillsSearchModal.tsx` |
| Skills view toggle | Skills view toggle | view = grid \| list | `CodingSection.astro` |
| Most clicked project (card) | Project click | slug = project slug | `ProjectCard.astro` |
| “See more projects” | See more projects | — | `ProjectsGallery.astro` |
| “See more items” (experience) | See more items | section = `experience` | `WorkExperienceTimeline.astro` |
| “See more items” (education) | See more items | section = `education` | `EducationTimeline.astro` |
| Download CV | Download CV | — | `Contact.astro` |
| Visit Site (on project page) | Visit Site | slug = project slug | `[slug].astro` |
| View Code (on project page) | View Code | slug = project slug | `[slug].astro` |

Filtering by **event name** gives you counts per action; filtering or grouping by **property** (e.g. `platform`, `section`, `slug`) gives you breakdowns (e.g. LinkedIn vs GitHub, experience vs education, which project was clicked).

---

## 2. Step-by-Step: Using the Umami Interface

### Where to find events

1. Log in to [Umami Cloud](https://cloud.umami.is) (or your self-hosted Umami).
2. Open your **website** (portfolio).
3. In the left sidebar, go to **Events** (or **Reports** → **Events**, depending on your layout).
4. Use the date-range picker to set the period you care about.
5. You’ll see a list of **event names** and counts. Click an event to see more detail.
6. Open the **Properties** tab for that event to see breakdowns by custom data (e.g. `platform`, `section`, `slug`).

### How to get each metric

- **LinkedIn / GitHub clicks:** Events → filter or search for **“Social click”** → Properties tab → filter or group by `platform` = `linkedin` or `github`.
- **“Contact Me” clicks:** Events → **“Contact email click”** → total count.
- **“About Me” reads:** Go to **Pages** (or **Reports** → **Pages**). Filter by **path** (or URL) containing `/about-me`. The pageview count is “how many read About Me.”
- **Skills search usage:** Events → **“Skills search opened”** (opens), **“Skills search query”** (searches), **“Skills search result click”** (result clicks). Use Properties for query/skill if needed.
- **Skills toggle:** Events → **“Skills view toggle”** → Properties tab for `view` (grid/list).
- **Most clicked project (from cards):** Events → **“Project click”** → Properties tab → group or sort by `slug` to see which project slugs got the most clicks.
- **“See more projects”:** Events → **“See more projects”** → total count.
- **“See more items” (experience vs education):** Events → **“See more items”** → Properties tab → filter by `section` = `experience` or `section` = `education`.
- **Download CV:** Events → **“Download CV”** → total count.
- **Visit Site / View Code (from project page):** Events → **“Visit Site”** or **“View Code”** → total count; use Properties tab and `slug` to see which project pages generated the clicks.

### Report: Most visited projects

You can define “most visited” in two ways:

- **By project card clicks (homepage/gallery):** Events → **“Project click”** → Properties tab → breakdown by `slug`. Sort by count to get “most clicked” projects.
- **By project page views:** **Pages** → filter by path starting with `/projects/` (e.g. `/projects/portfolio-site-v2`). Pageview count per path is “most visited” by page.

Use the same date range for both for consistency.

---

## 3. Pulling Metrics into Google Sheets (e.g. total views past week)

You can get Umami data into Google Sheets in three ways: CSV export, Umami API, or Google Apps Script calling the API.

### Get your Website ID and API key (Umami Cloud)

1. In Umami Cloud, open your **website**.
2. **Website ID:** In the URL or in website settings you’ll see the website UUID (e.g. `fad6adfb-2b8b-4868-a0a9-59d4fd860488`). Use this as `websiteId` in API calls.
3. **API key:** Click the account/settings dropdown → **Settings** → **API keys** → **Create key**. Copy the key and store it securely (e.g. in a script property). Use the header `x-umami-api-key: YOUR_API_KEY` for API requests.

Umami Cloud base URL: `https://api.umami.is/v1`.

---

### Option A: Export from Umami, then import into Sheets

1. In Umami: **Settings** (account or website) → **Data** → **Export**.
2. Request an export (often CSV, sometimes gzip). Wait for the email/link if applicable.
3. Download the file, then in Google Sheets: **File** → **Import** → upload the file or paste from CSV.
4. You can repeat this periodically (e.g. weekly) to refresh a “last week” view manually.

---

### Option B: Use the Umami API directly

Use the [Umami API](https://docs.umami.is/docs/api/website-stats) with your API key.

- **Total views (e.g. past week):**  
  `GET https://api.umami.is/v1/websites/{websiteId}/stats?startAt={startMs}&endAt={endMs}`  
  Use `startAt` and `endAt` as Unix timestamps in **milliseconds** for the range (e.g. 7 days ago to now). The response includes `pageviews`, `visitors`, `visits`, etc.
- **Event breakdowns:** Use the event-related endpoints (e.g. event-data) with the same `websiteId` and date range to pull event counts or properties into any tool that can do HTTP (e.g. Postman, curl, or Apps Script).

Example “past week” in JavaScript (for use in Apps Script or Node):

- `endAt = Date.now()`
- `startAt = Date.now() - 7 * 24 * 60 * 60 * 1000`

Send these as query parameters. Header: `x-umami-api-key: YOUR_API_KEY` and `Accept: application/json`.

---

### Option C: Google Apps Script to write Umami data into a sheet

You can pull Umami analytics into a Google Sheet in two ways:

- **Minimal example (single site, 7 days):** Uses script properties `UMAMI_WEBSITE_ID` and `UMAMI_API_KEY`, writes Metric/Value into A1:B5. Good for a quick test.
- **Full script (multi-site, six time ranges):** Uses only `UMAMI_API_KEY`; site list comes from the sheet (columns A–B). Writes Last 24h / 7d / month and Past 24h / 7d / month for Pageviews, Visitors, and Visits. See **Single-sheet Umami layout** below.

**Minimal example — setup**

1. Create a Google Sheet and add a sheet named `Umami`.
2. **Extensions** → **Apps Script**. Delete any sample code.
3. **Project settings (gear)** → **Script properties** → Add:
   - `UMAMI_API_KEY` — your Umami API key (Umami Cloud: Settings → API keys)
   - `UMAMI_WEBSITE_ID` — your website’s UUID (from the Umami dashboard URL or website settings)
4. Paste the minimal script below, save, run `fetchUmamiStats` once (authorize when prompted). It writes pageviews, visitors, visits, and last updated for the last 7 days into A1:B5.
5. (Optional) **Triggers:** Add a time-driven trigger to run `fetchUmamiStats` daily.

**Minimal script (single site, 7 days)**

```javascript
function fetchUmamiStats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Umami');
  if (!sheet) return;

  const websiteId = PropertiesService.getScriptProperties().getProperty('UMAMI_WEBSITE_ID');
  const apiKey = PropertiesService.getScriptProperties().getProperty('UMAMI_API_KEY');
  if (!websiteId || !apiKey) throw new Error('Set UMAMI_WEBSITE_ID and UMAMI_API_KEY in Script properties');

  const endAt = Date.now();
  const startAt = endAt - 7 * 24 * 60 * 60 * 1000; // 7 days ago
  const url = 'https://api.umami.is/v1/websites/' + websiteId + '/stats?startAt=' + startAt + '&endAt=' + endAt;

  const response = UrlFetchApp.fetch(url, {
    headers: {
      'Accept': 'application/json',
      'x-umami-api-key': apiKey
    },
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    sheet.getRange('A1').setValue('Error: ' + response.getContentText());
    return;
  }

  const data = JSON.parse(response.getContentText());
  sheet.getRange('A1:B1').setValues([['Metric', 'Value']]);
  sheet.getRange('A2:B2').setValues([['Pageviews', data.pageviews || 0]]);
  sheet.getRange('A3:B3').setValues([['Visitors', data.visitors || 0]]);
  sheet.getRange('A4:B4').setValues([['Visits', data.visits || 0]]);
  sheet.getRange('A5:B5').setValues([['Last updated', new Date().toISOString()]]);
}
```

For **multiple sites** and **six time ranges** (Last and Past 24h, 7d, month), use the **Single-sheet Umami layout** and full script below.

---

### Single-sheet Umami layout (multi-site)

One sheet named **Umami**, header on **row 3**. You put **WebsiteId** in column A for every row (all three rows per site); the script reads A and B from the first row of each 3-row block and writes **Site** (B), **Metric** (C), the six period values (D–I), and **Last Updated** (J). Only **`UMAMI_API_KEY`** is required in Script properties.

#### Sheet structure

- **Header row:** Row 3. Labels: `WebsiteId` (A), `Site` (B), `Metric` (C), `Last 24 hours` (D), `Last 7 days` (E), `Last Month` (F), `Past 24 hours` (G), `Past 7 days` (H), `Past Month` (I), `Last Updated` (J).
- **Data:** Each site uses **3 consecutive rows**. Put the **WebsiteId** in column A for all three rows (same UUID). Put the **Site** name in B on the first row (or all three); the script overwrites B and C and writes the six values into D–I and the timestamp in J.
- **Adding a site:** Add three new rows with A = website UUID in each row (get the UUID from Umami), and B = site name on the first row. Run the script to fill B–J.

#### Setup (full script)

1. **Sheet:** Create a sheet named exactly **Umami**. In row 3, set headers: A = WebsiteId, B = Site, C = Metric, D = Last 24 hours, E = Last 7 days, F = Last Month, G = Past 24 hours, H = Past 7 days, I = Past Month, J = Last Updated.
2. **Site list:** For each website, add 3 rows with the **WebsiteId** in column A for each row (same UUID for all three). Site name in B on the first row is enough; the script will fill B and C for all three rows.
3. **Apps Script:** **Extensions** → **Apps Script**. In **Project settings** → **Script properties**, add **`UMAMI_API_KEY`** (Umami Cloud → Settings → API keys). The script reads website IDs from column A.
4. **Paste and run:** Paste the full script below, save, run **`fetchUmamiStats`** once and grant permissions. The script fills B–J for every 3-row block.
5. **Optional:** Add a time-driven trigger (e.g. daily) for `fetchUmamiStats`.

#### Putting 24h, week and month in a cell

After `fetchUmamiStats()` runs, **D–F** are Last 24h / 7d / month and **G–I** are Past 24h / 7d / month. Example: first site Pageviews = D4:I4; first site Visits = D6:I6. Use `=Umami!D6` (visits, last 24h) or the custom function: `=UMAMI_VISITS("24h")`, `=UMAMI_VISITS("7d", "Portfolio Site V2")`.

#### Full Apps Script (single sheet "Umami")

The script steps through the sheet in blocks of 3 rows. For each block it reads WebsiteId (A) and Site name (B) from the first row, calls the Umami API for six time ranges, and writes Site (B), Metric (C), values (D–I), and Last Updated (J). Column A is never written (you keep WebsiteId in every row).

```javascript
var UMAMI_BASE = 'https://api.umami.is/v1';
var HEADER_ROW = 3;
var METRIC_NAMES = ['Pageviews', 'Visitors', 'Visits'];
var ROWS_PER_SITE = 3;

function getTimeRanges() {
  var now = Date.now();
  var h = 60 * 60 * 1000;
  var d = 24 * h;
  return [
    { startAt: now - 24 * h, endAt: now },
    { startAt: now - 7 * d, endAt: now },
    { startAt: now - 30 * d, endAt: now },
    { startAt: now - 48 * h, endAt: now - 24 * h },
    { startAt: now - 14 * d, endAt: now - 7 * d },
    { startAt: now - 60 * d, endAt: now - 30 * d }
  ];
}

function fetchStatsForPeriod(websiteId, apiKey, startAt, endAt) {
  var url = UMAMI_BASE + '/websites/' + websiteId + '/stats?startAt=' + startAt + '&endAt=' + endAt;
  var response = UrlFetchApp.fetch(url, {
    headers: { 'Accept': 'application/json', 'x-umami-api-key': apiKey },
    muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200) return null;
  var data = JSON.parse(response.getContentText());
  return {
    pageviews: data.pageviews != null ? data.pageviews : 0,
    visitors: data.visitors != null ? data.visitors : 0,
    visits: data.visits != null ? data.visits : 0
  };
}

function fetchUmamiStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Umami');
  if (!sheet) throw new Error('Create a sheet named Umami with header row 3 (A=WebsiteId, B=Site, C=Metric, D–J as described above)');

  var apiKey = PropertiesService.getScriptProperties().getProperty('UMAMI_API_KEY');
  if (!apiKey) throw new Error('Set UMAMI_API_KEY in Script properties');

  var lastRow = sheet.getLastRow();
  if (lastRow < HEADER_ROW + 1) return;

  var lastUpdated = new Date().toISOString();
  var ranges = getTimeRanges();
  var row = HEADER_ROW + 1;

  while (row <= lastRow) {
    var websiteId = (sheet.getRange(row, 1).getValue() && sheet.getRange(row, 1).getValue().toString().trim()) || null;
    var name = (sheet.getRange(row, 2).getValue() && sheet.getRange(row, 2).getValue().toString().trim()) || null;
    if (!websiteId || !name) break;

    var pageviewsByPeriod = [], visitorsByPeriod = [], visitsByPeriod = [];
    for (var i = 0; i < ranges.length; i++) {
      var stats = fetchStatsForPeriod(websiteId, apiKey, ranges[i].startAt, ranges[i].endAt);
      if (stats) {
        pageviewsByPeriod.push(stats.pageviews);
        visitorsByPeriod.push(stats.visitors);
        visitsByPeriod.push(stats.visits);
      } else {
        pageviewsByPeriod.push(0);
        visitorsByPeriod.push(0);
        visitsByPeriod.push(0);
      }
    }

    sheet.getRange(row, 2).setValue(name);
    sheet.getRange(row, 3).setValue(METRIC_NAMES[0]);
    sheet.getRange(row, 4, 1, 6).setValues([pageviewsByPeriod]);
    sheet.getRange(row, 10).setValue(lastUpdated);

    sheet.getRange(row + 1, 2).setValue(name);
    sheet.getRange(row + 1, 3).setValue(METRIC_NAMES[1]);
    sheet.getRange(row + 1, 4, 1, 6).setValues([visitorsByPeriod]);
    sheet.getRange(row + 1, 10).setValue(lastUpdated);

    sheet.getRange(row + 2, 2).setValue(name);
    sheet.getRange(row + 2, 3).setValue(METRIC_NAMES[2]);
    sheet.getRange(row + 2, 4, 1, 6).setValues([visitsByPeriod]);
    sheet.getRange(row + 2, 10).setValue(lastUpdated);

    row += ROWS_PER_SITE;
  }
}

/**
 * Custom function: use in a cell as =UMAMI_VISITS("24h"), =UMAMI_VISITS("7d"), or =UMAMI_VISITS("30d").
 * Returns visits for the given period. If siteName is omitted, uses the first site on the Umami sheet.
 * Requires UMAMI_API_KEY. May be slow (API call); 30s limit.
 */
function UMAMI_VISITS(period, siteName) {
  var p = (period && period.toString().toLowerCase().trim()) || '24h';
  var now = Date.now();
  var h = 60 * 60 * 1000;
  var d = 24 * h;
  var startAt, endAt;
  if (p === '24h') { startAt = now - 24 * h; endAt = now; }
  else if (p === '7d') { startAt = now - 7 * d; endAt = now; }
  else if (p === '30d') { startAt = now - 30 * d; endAt = now; }
  else return null;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var apiKey = PropertiesService.getScriptProperties().getProperty('UMAMI_API_KEY');
  if (!apiKey) return null;
  var sheet = ss.getSheetByName('Umami');
  if (!sheet) return null;
  var lastRow = sheet.getLastRow();
  var dataStartRow = HEADER_ROW + 1;
  var websiteId = null;
  for (var r = dataStartRow; r <= lastRow; r += ROWS_PER_SITE) {
    var wid = (sheet.getRange(r, 1).getValue() && sheet.getRange(r, 1).getValue().toString().trim()) || null;
    var n = (sheet.getRange(r, 2).getValue() && sheet.getRange(r, 2).getValue().toString().trim()) || null;
    if (!wid || !n) continue;
    if (!siteName || n === siteName.toString().trim()) {
      websiteId = wid;
      break;
    }
  }
  if (!websiteId) return null;
  var stats = fetchStatsForPeriod(websiteId, apiKey, startAt, endAt);
  return stats ? stats.visits : 0;
}
```

Run **`fetchUmamiStats`** once (and add a time-driven trigger if you want automatic refresh). The Umami sheet will then show Pageviews, Visitors, and Visits for all sites and all six periods. To show 24h / week / month in a cell without running the script, use the custom function: `=UMAMI_VISITS("24h")`, `=UMAMI_VISITS("7d")`, or `=UMAMI_VISITS("30d")` (custom functions are subject to a 30s execution limit).

#### Formula examples (direct in cells)

All references use the **Umami** sheet. Row numbers below assume the first site is in rows 4–6 (row 4 = Pageviews, 5 = Visitors, 6 = Visits). For a second site, add 3 to the row (e.g. 7–9).

**Using the table (after running `fetchUmamiStats`):**

- **Visits, last 24h / 7d / month (first site):** `=Umami!D6`, `=Umami!E6`, `=Umami!F6`
- **Visits, previous 24h / 7d / month (first site):** `=Umami!G6`, `=Umami!H6`, `=Umami!I6`
- **Trend (current 24h vs previous 24h):** `=IF(Umami!G6=0,"N/A",(Umami!D6-Umami!G6)/Umami!G6)` — format as percentage. For 7d use E6 vs H6; for 30d use F6 vs I6.

**Using the custom function (fetches on recalc; use in the Umami sheet or any other sheet):**

- **24h:** `=UMAMI_VISITS("24h")` (first site) or `=UMAMI_VISITS("24h", "Portfolio Site V2")` (by name)
- **Week:** `=UMAMI_VISITS("7d")`
- **Month:** `=UMAMI_VISITS("30d")`

---

## 4. Weekly email report (Netlify Scheduled Function)

You can receive a **weekly summary** of portfolio analytics by email, with no external cron service. A **Netlify Scheduled Function** runs on a schedule (e.g. every Sunday), fetches Umami data for the last 7 days, builds an HTML report, and sends it to you via **Gmail** using the same env vars as the rest of the project.

### Architecture

- **Trigger:** Netlify runs the function on a schedule (e.g. `@weekly` = Sundays 00:00 UTC).
- **Flow:** Netlify Scheduler → `umami-report` function → Umami API (stats + events) → HTML report → Gmail (nodemailer).
- **Auth:** Scheduled functions are not invoked by URL; no secret token is required. Set env vars in the Netlify dashboard.

### Required env vars (Netlify UI)

In **Site settings → Environment variables**, set (for the weekly report):

- `UMAMI_WEBSITE_ID` — your Umami website UUID  
- `UMAMI_API_KEY` — Umami API key (Settings → API keys in Umami Cloud)  
- `GMAIL_USER` — Gmail address used to send  
- `GMAIL_APP_PASSWORD` — Gmail app password  
- `EMAIL_RECIPIENT` — where to send the report (e.g. your email)  
- `EMAIL_SENDER` (optional) — defaults to `GMAIL_USER`

These are the same as in [.env.example](.env.example) for local/scripts; the function reads them from Netlify’s environment.

### Implementation

- **File:** `netlify/functions/umami-report.mjs` in the repo. It exports a handler and `config = { schedule: "@weekly" }`.
- **Logic:** On each run, the function requests Umami stats and event metrics for the last 7 days, builds an HTML email (traffic, LinkedIn/GitHub clicks, Contact Me, Download CV, About Me, skills, project clicks, See more, Visit Site/View Code, most visited projects), and sends it with nodemailer (Gmail).
- **Schedule:** You can change the schedule in the function (`schedule: "@weekly"`) or in `netlify.toml` under `[functions."umami-report"] schedule = "@weekly"`. Times are UTC.

### How to test

- **Run now:** In the Netlify dashboard, go to **Functions**, select `umami-report`, and click **Run now**.
- **Locally:** Run `netlify dev` and use `netlify functions:invoke umami-report` to trigger the function (see [Netlify docs](https://docs.netlify.com/build/functions/scheduled-functions/#developing-and-debugging-scheduled-functions)).
- **Limits:** Scheduled functions have a 30s execution limit and run only on **published** deploys (not deploy previews).

---

## Summary

- **Tracking:** Implemented via `data-umami-event` (and `data-umami-event-*`) and `umami.track()` so every requested action sends a named event (and optional properties) to Umami.
- **In Umami:** Use **Events** + **Properties** for counts and breakdowns; use **Pages** for “About Me” reads and most visited project pages.
- **Google Sheets:** Use CSV export (Option A), the Umami API (Option B), or Apps Script (Option C) with your website ID and API key to pull total views and other metrics (e.g. past week) into a sheet. Use the single-sheet Umami layout (subsection above) for multiple sites: one sheet named Umami, header row 3, config in A–B, metrics in C–L (E–J = Last/Past 24h, 7d, month).
- **Weekly report:** Use the Netlify Scheduled Function `umami-report` (Section 4) to email yourself a weekly analytics summary via Gmail; set env vars in the Netlify dashboard.
