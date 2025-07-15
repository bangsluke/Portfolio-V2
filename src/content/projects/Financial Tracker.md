---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
modified: 2025-07-11T15:51:39+01:00
viewCount: 3
aliases:
  - Finance Tracker
  - Financial Tracking
  - Finance Tracking
projectURL: TBC
codeURL: n/a
codeMultipleRepos: false
folderURL: https://rleint.sharepoint.com/:f:/r/sites/UKPMO/Freigegebene%20Dokumente/General/Tools/Financial%20Tracker?csf=1&web=1&e=7tWn8h
logoURL: https://i.imgur.com/SFb7UNB.png
imageURL: 
dateStart: 2023-11-22
dateEnd: 2024-02-19
technologies:
  - "[Power Apps](Power Apps)"
  - "[Power BI](Power BI)"
  - "[SharePoint](SharePoint)"
  - "[Power Query](Power Query)"
projectCategory: Work Project
linkedCompany:
  - "[RLE International](RLE International)"
toolOwner: "[Dominic Ede](Dominic Ede)"
developers:
  - "[Thorsten Liewald](Thorsten Liewald)"
  - "[Nilesh Mistry](Nilesh Mistry)"
topicTags:
  - "[Work](Work)"
  - "[GPMO](GPMO)"
  - "[Finances](Finances)"
powerShellAlias: n/a
version: 
---
# Financial Tracker

> **back:** Link back to [01 Projects|Projects](01 Projects|Projects)

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

> **details:** `=this.file.name`
>`=choice(this.folderURL = null | this.folderURL = "" | this.folderURL = "n/a","","<br>Folder URL: " + link(this.folderURL,"Link")) + choice(this.dateStart = null | this.dateStart = "","","<br>Date Start: " + this.dateStart) + choice(this.dateEnd = null | this.dateEnd = "","","<br>Date End: " + this.dateEnd) + choice(this.dateStart = null | this.dateStart = "", "", choice(this.dateEnd = "", "<br>Development Duration: " + string(date(today) - date(this.dateStart)), "<br>Development Duration: " + string(date(this.dateEnd) - date(this.dateStart)))) + choice(this.projectCategory = null | this.projectCategory = "","","<br>Category: " + this.projectCategory) + choice(this.linkedCompany = null | this.linkedCompany = "" | contains(this.linkedCompany, "n/a"),"","<br>Project for: " + this.linkedCompany) + choice(this.toolOwner = null | this.toolOwner = "","","<br>Tool Owner: " + this.toolOwner) + choice(this.developers = null | this.developers = "","","<br>Developers: " + this.developers) + choice(this.technologies = null | this.technologies = "","","<br>Technologies: " + this.technologies) + choice(this.topicTags = null | this.topicTags = "","","<br>Topics: " + this.topicTags) + choice(this.powerShellAlias = null | this.powerShellAlias = "" | this.powerShellAlias = "n/a","","<br>PowerShell Alias: " + this.powerShellAlias) + choice(this.version = null | this.version = "","","<br>Version: " + this.version)`

> Previous Owners: [Thomas Lerch](Thomas Lerch), [Ian Digman](Ian Digman)

## Table of Contents

```table-of-contents
```

> **top:** [Back to top](#Table%20of%20Contents)

## Introduction

TBC

> **top:** [Back to top](#Table%20of%20Contents)

## Short Description

Full financial reporting on the progress of projects.

> **top:** [Back to top](#Table%20of%20Contents)

## Long Description

TBC

> **top:** [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [Power Apps](Power Apps), [Power BI](Power BI) 
- Back end/Datasource: [SharePoint](SharePoint), [Power Query](Power Query)
- Hosting: [SharePoint](SharePoint)
- Security: [SharePoint](SharePoint)
- Authentication: [SharePoint](SharePoint)

> **top:** [Back to top](#Table%20of%20Contents)

## Repositories

- Main repo: `=this.codeURL`
- Secondary repo: n/a

> **top:** [Back to top](#Table%20of%20Contents)

## PowerShell Query

To launch the repo, use the [PowerShell](PowerShell) alias 

> `=this.powerShellAlias`

> **top:** [Back to top](#Table%20of%20Contents)

## Planning and Design

- n/a

> **top:** [Back to top](#Table%20of%20Contents)

## Other Links

- TBC

> **top:** [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

> **top:** [Back to top](#Table%20of%20Contents)

## Analysis

### Last Mentioned in Daily Notes

```dataview
TABLE WITHOUT ID file.link as "Last Mentioned in Daily Note"
FROM [[]]
WHERE contains(tags, "daily")
SORT file.ctime DESC
LIMIT 1
```

> **top:** [Back to top](#Table%20of%20Contents)

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

> **top:** [Back to top](#Table%20of%20Contents)