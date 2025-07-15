---
tags:
  - project
  - portfolio
  - notes
  - project/completed/work
  - coding
  - work
created: 2025-06-02 17:16
modified: 2025-07-11T15:54:14+01:00
viewCount: 11
aliases: 
projectURL: https://sdp-dev-sites.netlify.app/pages/sdp-encyclopedia
codeURL: TBC
codeMultipleRepos: false
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: ""
dateEnd: ""
technologies:
  - "[HTML](HTML)"
  - "[CSS](CSS)"
  - "[JavaScript](JavaScript)"
  - "[GitLab](GitLab)"
  - "[Azure](Azure)"
projectCategory: Work Project
linkedCompany:
  - "[RLE International](RLE International)"
toolOwner: "[Uwe Kloss](Uwe Kloss)"
developers:
  - "[Luke Bangs](Luke Bangs)"
topicTags:
  - "[SDP](SDP)"
  - "[Work](Work)"
  - "[Digital Engineering](Digital Engineering)"
powerShellAlias: n/a
version: 1
---
# SDP Encyclopaedia

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

## Table of Contents

```table-of-contents
```

> **top:** [Back to top](#Table%20of%20Contents)

## Introduction

A basic site showing an expandable and collapsible list of the swimlanes and activities used in the [SDP](SDP) tool.

> **top:** [Back to top](#Table%20of%20Contents)

## Short Description

A basic site showing an expandable and collapsible list of the swimlanes and activities used in the [SDP](SDP) tool.

> **top:** [Back to top](#Table%20of%20Contents)

## Long Description

An expandable and collapsible list of the swimlanes and activities referenced across the [SDP](SDP) app, provided as support material to consultants using the tool for [RLE International|RLE](RLE International|RLE) and also by clients.

> **top:** [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [HTML](HTML), [CSS](CSS), [JavaScript](JavaScript)
- Back end/Datasource: n/a
- Hosting: [GitLab](GitLab) (see [Repositories](#repositories))
- Security: n/a
- Authentication: [Azure](Azure)

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

- Designed to look like the [SDP](SDP) site in terms of styling.

> **top:** [Back to top](#Table%20of%20Contents)

## Other Links

- [SDP|SDP](SDP|SDP)
- [SDP Acronyms](SDP Acronyms)

> **top:** [Back to top](#Table%20of%20Contents)

## Lessons Learned

Provided good learning for the interactivity of expanding and collapsing boxes on click, however unfortunately the site remained incomplete as the requirements changed for [SDP](SDP).

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