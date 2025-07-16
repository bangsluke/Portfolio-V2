---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
  - "[RLE International](#rle-international)"
  - "[Luke Bangs](#luke-bangs)"
  - "[Alex Sheers](#alex-sheers)"
  - "[Excel](#excel)"
  - "[Finances](#finances)"
  - "[Work](#work)"
  - "[GPMO](#gpmo)"
---
# Cost Model

> **BACK:** Link back to [Projects](#01-projects)

>[!website-link] Links
> 
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.projectURL as "Project URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID this.codeURL as "Codebase URL Link"
WHERE file = this.file
>
-->

>
<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID choice(this.codeMultipleRepos = true, link("#repositories","True - Click for link"), "False") as "Multiple Repos"
WHERE file = this.file

>[!details]  `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

## Table of Contents


-->
table-of-contents
```

## Introduction

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A unified cost model template and approach for costing projects - feeds into the [Finance Tracker](#financial-tracker).

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBC
- Back end/Datasource: n/a
- Hosting: [Azure](#azure)
- Security: n/a
- Authentication: [Azure](#azure)

>[!top] [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

>[!top] [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](#powershell) alias 

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

- [GPMO](#gpmo)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Last Mentioned in Daily Notes


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1

-->


>[!top] [Back to top](#Table%20of%20Contents)

### Total Count


<!-- Dataview Query (hidden in production):
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"

-->


### Last Mentioned


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5

-->


### All Mentions


<!-- Dataview Query (hidden in production):
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC

-->


>[!top] [Back to top](#Table%20of%20Contents)