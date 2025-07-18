---
tags:
  - tag
  - work
  - tool
  - portfolio
  - project/completed/work
created: 2025-07-18T08:23:00
modified: 2025-07-18T08:30:05+01:00
viewCount: 1
aliases: 
projectURL: 
codeURL: 
codeMultipleRepos: false
deploymentServiceURL: n/a
folderURL: 
logoURL: 
imageURL: 
dateStart: 2019-10-01
dateEnd: 2019-12-02
technologies:
  - "[[Google Sites]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Adele Donaldson-Logan]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
powerShellAlias: n/a
version: 1
portfolioOrder: 4
shortDescription: "A internal site providing links to key sites needed by employees."
longDescription: "A site providing links to key sites needed by employees, a tools library of useful documents and templates and a lessons learned page for end-of project.\nThis provided a structure for engineers to work with on a day to day basis to ensure consistency with work output quality."
lessonsLearned: "This taught me how to use basic website building tools such as [[Google Sites]] to quickly create a website structure using drag and drop components."
---
# RLE Google Sites

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

## Introduction

A site providing links to key sites needed by employees, a tools library of useful documents and templates and a lessons learned page for end-of project.

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A internal site providing links to key sites needed by employees.

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A site providing links to key sites needed by employees, a tools library of useful documents and templates and a lessons learned page for end-of project.

This provided a structure for engineers to work with on a day to day basis to ensure consistency with work output quality.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[Google Sites]]
- Back end/Datasource: n/a
- Hosting: n/a
- Security: n/a
- Authentication: [[Google]]

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

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

This taught me how to use basic website building tools such as [[Google Sites]] to quickly create a website structure using drag and drop components.

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