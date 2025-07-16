---
tags:
  - project
  - portfolio
  - notes
  - project/completed/work
  - coding
  - work
created: 2025-06-02 17:16
modified: 2025-07-11T15:51:04+01:00
aliases:
  - Stratamotiv Landing Page
viewCount: 10
projectURL: https://stratamotiv.netlify.app/
codeURL: TBC
codeMultipleRepos: false
folderURL: n/a
logoURL: n/a
imageURL: TBC
dateStart: ""
dateEnd: ""
technologies:
  - "[[React]]"
  - "[[Netlify]]"
  - "[[GitLab]]"
  - "[[Azure]]"
projectCategory: Work Project
linkedCompany:
  - "[[RLE International]]"
toolOwner: "[[Haydn Baker]]"
developers:
  - "[[Luke Bangs]]"
topicTags:
  - "[[Work]]"
  - "[[Centre of Excellence|CoE]]"
powerShellAlias: n/a
version: 1
shortDescription: "A landing page for showcasing a new Automotive Consultancy branch of RLE International|RLE, known as Centre of Excellence."
longDescription: "A basic landing page for showcasing a new Automotive Consultancy branch of RLE International|RLE, known as Centre of Excellence ready for prospective clients to view and see the services we provide."
lessonsLearned: "Main lesson was creating the automatic video background of the site along with a subtle purple filter across it which ended up looking pretty good. Sadly the site wasn’t finished as the requirements for the company changed."
---
# CoE Landing Page

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

>[!top] [Back to top](#Table%20of%20Contents)

## Introduction

A landing page for showcasing a new Automotive Consultancy branch of [[RLE International|RLE]], known as [[Centre of Excellence]].

>[!top] [Back to top](#Table%20of%20Contents)

## Short Description

A landing page for showcasing a new Automotive Consultancy branch of [[RLE International|RLE]], known as [[Centre of Excellence]].

>[!top] [Back to top](#Table%20of%20Contents)

## Long Description

A basic landing page for showcasing a new Automotive Consultancy branch of [[RLE International|RLE]], known as [[Centre of Excellence]] ready for prospective clients to view and see the services we provide.

>[!top] [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [[React]]
- Back end/Datasource: n/a
- Hosting: [[GitLab]] (see [Repositories](#repositories)), [[Netlify]]
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

- n/a

>[!top] [Back to top](#Table%20of%20Contents)

## Other Links

- [[Centre of Excellence]]

>[!top] [Back to top](#Table%20of%20Contents)

## Lessons Learned

Main lesson was creating the automatic video background of the site along with a subtle purple filter across it which ended up looking pretty good. Sadly the site wasn’t finished as the requirements for the company changed.

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