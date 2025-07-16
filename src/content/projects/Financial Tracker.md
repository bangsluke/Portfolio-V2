---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
  - Finance Tracker
  - Financial Tracking
  - Finance Tracking
  - "[Power Apps](#power-apps)"
  - "[Power BI](#power-bi)"
  - "[SharePoint](#sharepoint)"
  - "[Power Query](#power-query)"
  - "[RLE International](#rle-international)"
  - "[Thorsten Liewald](#thorsten-liewald)"
  - "[Nilesh Mistry](#nilesh-mistry)"
  - "[Work](#work)"
  - "[GPMO](#gpmo)"
  - "[Finances](#finances)"
---
# Financial Tracker

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

> Previous Owners: [Thomas Lerch](#thomas-lerch), [Ian Digman](#ian-digman)

## Table of Contents


-->
table-of-contents
```

>[!top] [Back to top](#Table%20of%20Contents)

## Introduction

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

Full financial reporting on the progress of projects.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [Power Apps](#power-apps), [Power BI](#power-bi) 
- Back end/Datasource: [SharePoint](#sharepoint), [Power Query](#power-query)
- Hosting: [SharePoint](#sharepoint)
- Security: [SharePoint](#sharepoint)
- Authentication: [SharePoint](#sharepoint)

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

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- TBC

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