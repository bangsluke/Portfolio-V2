---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-10-08T18:00:21+01:00
viewCount: 13
aliases:
  - Pipeline
projectURL: https://apps.powerapps.com/play/e/9cb5bfc9-13df-e75e-98ff-a4782f9d0f48/a/c4b54ab2-1db0-4f44-8314-e1ca852d3f44?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4&sourcetime=1701875569544&source=portal
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://rleint.sharepoint.com/:f:/r/sites/UKPMO/Freigegebene%20Dokumente/General/Tools/Project%20Pipeline?csf=1&web=1&e=nVEm7I
logoURL: https://i.postimg.cc/sf9hQprn/Project-Pipeline.png
imageURL: https://i.postimg.cc/T348h9nH/Project-Pipeline.png
dateStart: 2023-05-01
dateEnd: 2024-07-31
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
  - "[[Alex Sheers]]"
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[GPMO]]"
powerShellAlias: n/a
version: 5.1
portfolioOrder: 4
shortDescription: "A tool for identifying the progress of global <span class=\"theme-link\">RLE International</span> projects from lead to in-play, through to completion."
longDescription: "A <span class=\"theme-link\">Power Apps</span> tool that utilised a project process defined internally within <span class=\"theme-link\">RLE International</span> and allowed users to create and track projects through various phases and stages.<br><br>Each phase had a set of user sign offs to provide process control with each stage below it having a RAG status and documentation explaining what is required to get to green.<br><br>Tasks along with in app notifications were also included in the application to help users pick up their required next steps quickly."
lessonsLearned: "The main lessons learned for this tool were ensuring the application was very user friendly as we had a very wide user base across the company. Adding features such as sidebar notifications to flag which pages needed attention and task counts on the main dashboard as well as weekly email summaries to users with outstanding tasks was key in keeping all users regularly updating the system."
name: "Project Pipeline"
---
# Project Pipeline

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

A tool for identifying the progress of global [[RLE International]] projects from lead to in-play, through to completion.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A [[Power Apps]] tool that utilised a project process defined internally within [[RLE International]] and allowed users to create and track projects through various phases and stages.

Each phase had a set of user sign offs to provide process control with each stage below it having a RAG status and documentation explaining what is required to get to green.

Tasks along with in app notifications were also included in the application to help users pick up their required next steps quickly.

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
- [Power Apps](https://apps.powerapps.com/play/e/default-6422ff1a-f3b5-4450-9230-ad4241884bf4/a/bc6bd75e-616c-4523-9aff-ebf895b6a517?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4#)
- [Power Apps - Testing Environment](https://apps.powerapps.com/play/e/af1a6289-d705-e68c-b420-36d1783eeb48/a/497b2bcd-1042-4ad0-9d36-c3cd000e0a4d?tenantId=6422ff1a-f3b5-4450-9230-ad4241884bf4&sourcetime=1700652905991&source=portal#)
- [PowerBI](https://app.powerbi.com/groups/me/reports/4800ac5b-36e5-4818-9c5a-38b19965e578/ReportSection?ctid=6422ff1a-f3b5-4450-9230-ad4241884bf4&experience=power-bi)
- [SharePoint Lists](https://rleint.sharepoint.com/sites/ProjectPipeline/_layouts/15/viewlsts.aspx?view=14)
- [User Guide](https://rleint.sharepoint.com/:t:/s/ProjectPipeline/EWyXeHQPyhJEktSalIdYwjYBLcJic-6yZMqZ3vwVEtWanA?e=8ITTpQ)

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

The main lessons learned for this tool were ensuring the application was very user friendly as we had a very wide user base across the company. Adding features such as sidebar notifications to flag which pages needed attention and task counts on the main dashboard as well as weekly email summaries to users with outstanding tasks was key in keeping all users regularly updating the system.

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