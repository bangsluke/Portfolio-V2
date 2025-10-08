---
tags:
  - tag
  - work
  - tool
  - project/completed/work
  - portfolio
modified: 2025-08-12T11:50:30+01:00
viewCount: 8
aliases:
projectURL: https://rleint.sharepoint.com/:x:/r/sites/UKPMO/Freigegebene%20Dokumente/General/Tools/Cost%20Model/GPMO%20Cost%20Model%20Translation%20File%20V1_5.xlsm?d=wcacae63dda2a43abbfe9065ce76d8b03&csf=1&web=1&e=wIT1PG
codeURL: n/a
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: https://rleint.sharepoint.com/:f:/r/sites/UKPMO/Freigegebene%20Dokumente/General/Tools/Cost%20Model?csf=1&web=1&e=CGmO2I
logoURL: n/a
imageURL: https://i.postimg.cc/zfbshgjJ/Cost-Model-Translation-File.png
dateStart: 2024-01-31
dateEnd: 2024-07-31
technologies:
  - "[[Excel]]"
  - "[[VBA]]"
  - "[[SharePoint]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Keith Higham]]"
developers:
  - "[[Luke Bangs]]"
  - "[[Alex Sheers]]"
topicTags:
  - "[[GPMO]]"
  - "[[Work]]"
  - "[[Finances]]"
powerShellAlias: n/a
version: 1.5
portfolioOrder: 5
shortDescription: "The automation file to convert the <a href=\"/projects/cost-model\" class=\"theme-link\">Cost Model</a> into the data format required for the <span class=\"theme-link\">Finance Tracker</span>."
longDescription: "An <span class=\"theme-link\">Excel</span> file that was used as the front end interface for users to upload <a href=\"/projects/cost-model\" class=\"theme-link\">Cost Model</a> data into our <span class=\"theme-link\">Financial Tracker</span> system.<br><br><span class=\"theme-link\">VBA</span> scripts facilitated the selection and upload of a file and processed the data to be stored in <span class=\"theme-link\">SharePoint</span>, ready for tools such as the <span class=\"theme-link\">Financial Tracker</span> to utilise."
lessonsLearned: "This project taught me about the importance of keeping users engaged and informed during the script running process to ensure users were aware that the <span class=\"theme-link\">VBA</span> script was working.<br><br>It also was an interesting technical consideration on how to create a tool that would work across multiple <span class=\"theme-link\">Microsoft</span> tenants as we have internal offices split across different ones."
name: "Cost Model Translation File"
---
# Cost Model Translation File

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

The automation file to convert the [[Cost Model]] into the data format required for the [[Financial Tracker|Finance Tracker]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

An [[Excel]] file that was used as the front end interface for users to upload [[Cost Model]] data into our [[Financial Tracker]] system.

[[VBA]] scripts facilitated the selection and upload of a file and processed the data to be stored in [[SharePoint]], ready for tools such as the [[Financial Tracker]] to utilise.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Excel]]
- Back end/Datasource: [[VBA]]
- Hosting: [[SharePoint]] (see [Repositories](#repositories))
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

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This project taught me about the importance of keeping users engaged and informed during the script running process to ensure users were aware that the [[VBA]] script was working.

It also was an interesting technical consideration on how to create a tool that would work across multiple [[Microsoft]] tenants as we have internal offices split across different ones.

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