---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
  - Pipeline
  - "[Power Apps](#power-apps)"
  - "[Power BI](#power-bi)"
  - "[Power Query](#power-query)"
  - "[SharePoint](#sharepoint)"
  - "[RLE International](#rle-international)"
  - "[Alex Sheers](#alex-sheers)"
  - "[Luke Bangs](#luke-bangs)"
  - "[Work](#work)"
  - "[GPMO](#gpmo)"
---
# Project Pipeline

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

>[!top] [Back to top](#Table%20of%20Contents)

## Introduction

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A tool for identifying the progress of global [RLE International](#rle-international) projects from lead to in-play, through to completion.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBC
- Back end/Datasource: TBC
- Hosting: [GitLab](#gitlab) (see [Repositories](#repositories))
- Security: n/a
- Authentication: TBC

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

- [Power Apps](https://apps.powerapps.com/play/e/default-6422ff1a-f3b5-4450-9230-ad4241884bf4/a/bc6bd75e-616c-4523-9aff-ebf895b6a517?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4#)
- [Power Apps - Testing Environment](https://apps.powerapps.com/play/e/af1a6289-d705-e68c-b420-36d1783eeb48/a/497b2bcd-1042-4ad0-9d36-c3cd000e0a4d?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4&sourcetime=1700652905991&source=portal#)
- [PowerBI](https://app.powerbi.com/groups/me/reports/4800ac5b-36e5-4818-9c5a-38b19965e578/ReportSection?ctid=6422ff1a-f3b5-4450-9230-ad4241884bf4&experience=power-bi)
- [SharePoint Lists](https://rleint.sharepoint.com/sites/ProjectPipeline/_layouts/15/viewlsts.aspx?view=14)
- [User Guide](https://rleint.sharepoint.com/:t:/s/ProjectPipeline/EWyXeHQPyhJEktSalIdYwjYBLcJic-6yZMqZ3vwVEtWanA?e=8ITTpQ)

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