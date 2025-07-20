---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-07-19T10:05:29+01:00
viewCount: 8
aliases: 
projectURL: https://app.powerbi.com/groups/me/apps/5c7de0e8-e59f-4c47-9a4a-5129c28e1c0f/reports/efd30e67-8ed4-4807-95cb-11f46a62d7d2/ReportSectiona3c344f318d21cde0ced?ctid=6422ff1a-f3b5-4450-9230-ad4241884bf4&experience=power-bi
codeURL: 
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: 
logoURL: https://i.imgur.com/SFb7UNB.png
imageURL: 
dateStart: 2024-07-01
dateEnd: 2024-07-10
technologies:
  - "[[Power BI]]"
  - "[[Power Query]]"
  - "[[SharePoint]]"
  - "[[SQL]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Dominic Ede]]"
developers:
  - "[[Alex Sheers]]"
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[GPMO]]"
  - "[[Finances]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 4
shortDescription: "The report section for the <a href=\"/portfolio/projects/Financial Tracker\" class=\"theme-link\">Financial Tracker</a> showing global <span class=\"theme-link\">RLE International</span> data."
longDescription: "TBC"
lessonsLearned: "TBC"
---
# GPMO Reports

> [!back] Link back to <span class="theme-link">Projects</span>

>[!website-link] Links
> ```dataview
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file
>```
>```dataview
TABLE WITHOUT ID this.deploymentServiceURL as "Deployment Service Link"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents

```table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

The report section for the <a href="/portfolio/projects/Financial Tracker" class="theme-link">Financial Tracker</a> showing global <span class="theme-link">RLE International</span> data.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBC
- Back end/Datasource: TBC
- Hosting: <span class="theme-link">GitLab</span> (see [Repositories](#repositories))
- Security: n/a
- Authentication: TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the <span class="theme-link">PowerShell</span> alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- Sub sections:
	- <a href="/portfolio/projects/Pipeline App User Report" class="theme-link">Pipeline App User Report</a>
	- <a href="/portfolio/projects/Group Sales Report" class="theme-link">Group Sales Report</a>
	- <a href="/portfolio/projects/Project Finance Tracking Report" class="theme-link">Project Finance Tracking Report</a>

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Last Mentioned in Daily Notes

```dataview
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1
```

>[!top] [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

>[!top] [Back to top](#Table%20of%20Contents)