---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-09-08T11:18:04+01:00
viewCount: 13
aliases:
projectURL: https://app.powerbi.com/groups/me/apps/5c7de0e8-e59f-4c47-9a4a-5129c28e1c0f/reports/849fbe08-7442-4d16-8bb7-ba7d415e1d02/ReportSectiondbd35394606841004e11?ctid=6422ff1a-f3b5-4450-9230-ad4241884bf4&experience=power-bi
codeURL: n/a
codeMultipleRepos:
deploymentServiceURL: n/a
folderURL: https://app.powerbi.com/groups/5dc8490c-b5de-49a3-85f9-9eaee02b7d96/list?experience=power-bi
logoURL: https://i.postimg.cc/pVYFhDH1/Finance-Reports.png
imageURL: https://i.postimg.cc/zGcm3jTd/Project-Finance-Tracking-Report.png
dateStart: 2024-01-01
dateEnd: 2024-07-31
technologies:
  - "[[Power BI]]"
  - "[[Power Query]]"
  - "[[SharePoint]]"
  - "[[SQL]]"
  - "[[DevOps]]"
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
shortDescription: "The report section for the <a href=\"/projects/project-finance-data-manager\" class=\"theme-link\">Project Finance Data Manager</a> showing individual <span class=\"theme-link\">RLE International</span> project data."
longDescription: "A <span class=\"theme-link\">Power BI</span> report that allows users to select their project and drill through to see the forecast and actual finances for the project, as well as a tab showing project hours drawn in from the various timesheet systems."
lessonsLearned: "The key lesson learned here was gathering the data from the <span class=\"theme-link\">SQL</span> data, rather than from <span class=\"theme-link\">SharePoint</span>."
name: "Project Finance Tracking Report"
---
# Project Finance Tracking Report

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

The report section for the [[Project Finance Data Manager]] showing individual [[RLE International]] project data.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A [[Power BI]] report that allows users to select their project and drill through to see the forecast and actual finances for the project, as well as a tab showing project hours drawn in from the various timesheet systems.

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
- [[Project Finance Data Manager]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The key lesson learned here was gathering the data from the [[SQL]] data, rather than from [[SharePoint]].

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