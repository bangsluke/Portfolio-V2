---
tags:
  - project
  - portfolio
  - notes
  - coding
  - project/active
created: 2026-02-12
modified: 2026-02-22T14:55:28+00:00
aliases:
  - New Tab
viewCount: 3
projectURL:
codeURL:
codeMultipleRepos: false
deploymentServiceURL:
folderURL: n/a
logoURL: n/a
imageURL:
dateStart: 2026-02-12
dateEnd:
technologies:
  - TBC
projectCategory: Personal Design
linkedCompany:
  - n/a
toolOwner: "[[Luke Bangs]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - Coding
  - Navigation
powerShellAlias: n/a
version: 1
portfolioOrder: 7
shortDescription: "TBC"
longDescription: "TBC"
lessonsLearned: "TBC"
name: "New Tab Website V2"
---
# New Tab Website V2

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

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

TBC

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: TBC
- Back end/Datasource: TBC
- Hosting: [[GitHub]] (see [Repositories](#repositories))
- Security: [[Snyk]]
- Authentication: n/a

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

Initial planning began on 12/02/2026, drafting the initial requirements.

>[!top] [Back to top](#Table%20of%20Contents)

### Links List

| Order | Link Name          | Link                               | Grouping   | Logo URL                                     | Project Link              | Umami Tracking Link                                                               |
| ----- | ------------------ | ---------------------------------- | ---------- | -------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| 1     | Dorkinians Website | <https://dorkiniansfcstats.co.uk/> | Dorkinians | <https://i.postimg.cc/rm1f3Kth/Dorkinians.png> | [[Dorkinians Website V3]] | <https://cloud.umami.is/analytics/eu/websites/351bdc1f-abd3-4b55-8e6f-23b3693b13b4> |
|       |                    |                                    |            |                                              |                           |                                                                                   |
|       |                    |                                    |            |                                              |                           |                                                                                   |

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[Homepage Website]]
- [[New Tab Website]]

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