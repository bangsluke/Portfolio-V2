---
tags:
  - tag
  - work
  - tool
  - project/completed/work
  - portfolio
modified: 2025-09-08T10:23:11+01:00
viewCount: 11
aliases:
  - Financial Tracking
  - FTL
projectURL: https://apps.powerapps.com/play/e/9cb5bfc9-13df-e75e-98ff-a4782f9d0f48/a/0f4944ff-c216-417f-9c3f-0a1caa4d9940?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4&hint=4806e425-29da-4f17-aa45-7a1d3e37666b&sourcetime=1708077290794&source=portal
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: n/a
logoURL: https://i.postimg.cc/pVYFhDH1/Finance-Reports.png
imageURL: https://i.postimg.cc/fRr4kKY2/Financial-Tracker-Lite.png
dateStart: 2023-11-27
dateEnd: 2024-07-30
technologies:
  - "[[Power Apps]]"
  - "[[Power Query]]"
  - "[[SharePoint]]"
  - "[[Azure DevOps]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Dominic Ede]]"
developers:
  - "[[Nilesh Mistry]]"
  - "[[Alex Sheers]]"
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[GPMO]]"
  - "[[Finances]]"
powerShellAlias: n/a
version: 2.2
portfolioOrder: 3
shortDescription: "A simplified version of the <span class=\"theme-link\">Financial Tracker</span>."
longDescription: "A <span class=\"theme-link\">Power Apps</span> tool for users to input finances (both realised and predicted) on a project by project basis, enabling finance forecasting per region."
lessonsLearned: "This project helped me work on <span class=\"theme-link\">Power Apps</span> gallery components and ensuring these are user friendly whilst staying maintainable.<br><br>It also involved integrating currency conversions within the tool to ensure that all regions could enter accurate information from their end for singular currency reporting at management level."
name: "Financial Tracker Lite"
---
# Financial Tracker Lite

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

A simplified version of the [[Financial Tracker]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A [[Power Apps]] tool for users to input finances (both realised and predicted) on a project by project basis, enabling finance forecasting per region.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Power Apps]]
- Back end/Datasource: [[SharePoint]], [[Power Query]]
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
- [[Financial Tracker]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project helped me work on [[Power Apps]] gallery components and ensuring these are user friendly whilst staying maintainable.

It also involved integrating currency conversions within the tool to ensure that all regions could enter accurate information from their end for singular currency reporting at management level.

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