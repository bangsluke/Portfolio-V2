---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-07-11T15:51:13+01:00
viewCount: 5
aliases: 
projectURL: https://rleint.sharepoint.com/:x:/r/sites/UKPMO/Freigegebene%20Dokumente/General/Tools/Cost%20Model/GPMO%20Cost%20Model%20V1.xlsx?d=w63d8777e305243178780a626d3abdf07&csf=1&web=1&e=hCf0X0
codeURL: n/a
codeMultipleRepos: 
folderURL: https://rleint.sharepoint.com/:f:/r/sites/UKPMO/Freigegebene%20Dokumente/General/Tools/Cost%20Model?csf=1&web=1&e=CGmO2I
logoURL: https://i.imgur.com/fmcxj4Y.png
imageURL: 
dateStart: 2023-11-15
dateEnd: 2024-07-26
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Keith Higham]]"
developers:
  - "[[Luke Bangs]]"
  - "[[Alex Sheers]]"
technologies:
  - "[[Excel]]"
topicTags:
  - "[[Finances]]"
  - "[[Work]]"
  - "[[GPMO]]"
powerShellAlias: n/a
version: 
shortDescription: "A unified cost model template and approach for costing projects - feeds into the [[Financial Tracker|Finance Tracker]]."
longDescription: "TBC"
lessonsLearned: "TBC"
---
# Cost Model

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

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents

```table-of-contents
```

## Introduction

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A unified cost model template and approach for costing projects - feeds into the [[Financial Tracker|Finance Tracker]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBC
- Back end/Datasource: n/a
- Hosting: [[Azure]]
- Security: n/a
- Authentication: [[Azure]]

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

- See below for requirements

>[!top] [Back to top](#Table%20of%20Contents)

### Requirements

- Aim - Make a single complex cost model that does as much work as possible
- Allow regions to create other cost models off of the base model - as long they keep the output sheet the same
- Simple set up "Config" sheet at the front - where you set;
	- Markup rate
	- Allocation etc
	- Contingency %
- Have default company rates (e.g. intercompany rates) and flag when the cost model deviates from it
- Every person books against a work order in GPCT, e.g. W0100
- Better if individuals book a project spec'd work order, e.g. "RICH-0100"
- For interest rates and exchange rates and role rates
	- MVP/V1 - Simple tab that holds interest rates and exchange rates and role rates initially
	- V2 - Automatic lookup of secure location for the above costs
	- V3 - Way of automatically updating and refreshing the rates when required (without refreshing other data)
- For costs out of the tool - give a column with the currency name, e.g. EUR, don't format the cells in the output sheet

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[GPMO]]

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