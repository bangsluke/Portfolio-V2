---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-08-12T11:53:51+01:00
viewCount: 13
aliases:
  - PFDM
projectURL: https://apps.powerapps.com/play/e/9cb5bfc9-13df-e75e-98ff-a4782f9d0f48/a/2f37da68-ee87-4e33-854b-8598826a866f?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4&hint=d7be4b55-aa62-4dec-8fe2-a4738bd94489&sourcetime=1707918756797
codeURL: https://dev.azure.com/RLEGPMO/_git/Project%20Finance%20Data%20Manager
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://rleint.sharepoint.com/sites/UKPMO/Freigegebene%20Dokumente/Forms/AllItems.aspx?id=%2Fsites%2FUKPMO%2FFreigegebene%20Dokumente%2FGeneral%2FTools%2FProject%20Finance%20Data%20Manager&viewid=5f4536b9%2D13eb%2D4e4d%2Dbf13%2D48ab749b5169
logoURL: https://i.imgur.com/Jsm73YL.png
imageURL: https://i.imgur.com/aVgRHHq.png
dateStart: 2024-01-01
dateEnd: 2024-07-31
technologies:
  - "[[Power Apps]]"
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
version: 1.2
portfolioOrder: 3
shortDescription: "Data input for financial tracking of <span class=\"theme-link\">RLE International</span> projects."
longDescription: "TBC<br><br>Pulled in timesheet data and financial information from various <span class=\"theme-link\">RLE International</span> region sources such as <span class=\"theme-link\">Paycor</span>, <span class=\"theme-link\">T-Sheet</span> and <span class=\"theme-link\">Iplicit</span>."
lessonsLearned: "TBC"
name: "Project Finance Data Manager"
---
# Project Finance Data Manager

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

Data input for financial tracking of [[RLE International]] projects.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

Pulled in timesheet data and financial information from various [[RLE International]] region sources such as [[Paycor]], [[T-Sheet]] and [[Iplicit]].

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Power Apps]]
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
- [[Cost Model]]
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