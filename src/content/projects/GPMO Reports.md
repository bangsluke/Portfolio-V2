---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-09-05T11:58:34+01:00
viewCount: 12
aliases:
projectURL: https://app.powerbi.com/groups/me/apps/5c7de0e8-e59f-4c47-9a4a-5129c28e1c0f/reports/efd30e67-8ed4-4807-95cb-11f46a62d7d2/ReportSectiona3c344f318d21cde0ced?ctid=6422ff1a-f3b5-4450-9230-ad4241884bf4&experience=power-bi
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://app.powerbi.com/groups/5dc8490c-b5de-49a3-85f9-9eaee02b7d96/list?experience=power-bi
logoURL: https://i.imgur.com/SFb7UNB.png
imageURL: https://i.imgur.com/px7FLzl.png
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
portfolioOrder: 6
shortDescription: "A group of <span class=\"theme-link\">Power BI</span> reports for global <span class=\"theme-link\">RLE International</span> data. Includes the <a href=\"/projects/group-sales-report\" class=\"theme-link\">Group Sales Report</a>, <a href=\"/projects/pipeline-app-user-report\" class=\"theme-link\">Pipeline App User Report</a> and <a href=\"/projects/project-finance-tracking-report\" class=\"theme-link\">Project Finance Tracking Report</a>."
longDescription: "A collection of <span class=\"theme-link\">Power BI</span> reports for global <span class=\"theme-link\">RLE International</span> projects, focused on analysing the data important to the <span class=\"theme-link\">GPMO</span> team to ensure full data population to provide a full picture to the company's management.<br><br>Includes the <a href=\"/projects/group-sales-report\" class=\"theme-link\">Group Sales Report</a>, <a href=\"/projects/pipeline-app-user-report\" class=\"theme-link\">Pipeline App User Report</a> and <a href=\"/projects/project-finance-tracking-report\" class=\"theme-link\">Project Finance Tracking Report</a>."
lessonsLearned: "TBC"
name: "GPMO Reports"
---
# GPMO Reports

> [!back] Link back to [[01 Projects|Projects]]

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

A group of [[Power BI]] reports for global [[RLE International]] data. Includes the [[Group Sales Report]], [[Pipeline App User Report]] and [[Project Finance Tracking Report]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A collection of [[Power BI]] reports for global [[RLE International]] projects, focused on analysing the data important to the [[GPMO]] team to ensure full data population to provide a full picture to the company's management.

Includes the [[Group Sales Report]], [[Pipeline App User Report]] and [[Project Finance Tracking Report]].

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Power BI]]
- Back end/Datasource: [[SharePoint]], [[Power Query]], [[SQL]]
- Hosting: [[SharePoint]]
- Security: n/a
- Authentication: [[SharePoint]]

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [[PowerShell]] alias 

> `=this.powerShellAlias`

>[!top] [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[GPMO]]
- Sub sections:
	- [[Pipeline App User Report]]
	- [[Group Sales Report]]
	- [[Project Finance Tracking Report]]

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