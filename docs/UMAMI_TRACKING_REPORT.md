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

1. **Create a Google Sheet** and name a sheet (e.g. `Umami`).
2. **Extensions** → **Apps Script**. Delete any sample code.
3. **Project settings (gear)** → **Script properties** → Add:
   - `UMAMI_API_KEY`: your Umami API key  
   - `UMAMI_WEBSITE_ID`: your website UUID  
   (Use these in the script so the key is not in the code.)
4. **Example: total views for the past week**

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
  // Headers
  sheet.getRange('A1:B1').setValues([['Metric', 'Value']]);
  sheet.getRange('A2:B2').setValues([['Pageviews', data.pageviews || 0]]);
  sheet.getRange('A3:B3').setValues([['Visitors', data.visitors || 0]]);
  sheet.getRange('A4:B4').setValues([['Visits', data.visits || 0]]);
  sheet.getRange('A5:B5').setValues([['Last updated', new Date().toISOString()]]);
}
```

5. Save, run `fetchUmamiStats` once (authorize when prompted). The script will write pageviews, visitors, and visits for the last 7 days into the `Umami` sheet.
6. (Optional) **Triggers:** In Apps Script, add a time-driven trigger (e.g. daily) to run `fetchUmamiStats` so the sheet updates automatically.

To pull more metrics (e.g. specific events), you can add more `UrlFetchApp.fetch` calls to the event-data endpoints and write those results into other columns or rows in the same sheet.

---

## Summary

- **Tracking:** Implemented via `data-umami-event` (and `data-umami-event-*`) and `umami.track()` so every requested action sends a named event (and optional properties) to Umami.
- **In Umami:** Use **Events** + **Properties** for counts and breakdowns; use **Pages** for “About Me” reads and most visited project pages.
- **Google Sheets:** Use CSV export (Option A), the Umami API (Option B), or Apps Script (Option C) with your website ID and API key to pull total views and other metrics (e.g. past week) into a sheet.
