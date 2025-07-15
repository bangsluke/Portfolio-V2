---
tags:
  - project
  - portfolio
  - notes
created: 2025-06-27 10:45
modified: 2025-07-11T15:53:56+01:00
aliases:
  - Scalable Development Plan
viewCount: 8
projectURL: TBC
codeURL: TBC
codeMultipleRepos: false
folderURL: n/a
logoURL: n/a
imageURL: 
dateStart: ""
dateEnd: ""
technologies:
  - "[01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java](01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java)"
  - "[React](React)"
  - "[Neo4j](Neo4j)"
  - "[Cypher](Cypher)"
  - "[GitLab](GitLab)"
  - "[Google Cloud|GCP](Google Cloud|GCP)"
  - "[SQL](SQL)"
  - "[Excel](Excel)"
  - "[VBA](VBA)"
  - "[Google Sheets](Google Sheets)"
  - "[Google Apps Script](Google Apps Script)"
  - "[NeoDash](NeoDash)"
projectCategory: Work Project
linkedCompany:
  - "[RLE International](RLE International)"
toolOwner: "[Uwe Kloss](Uwe Kloss)"
developers:
  - "[Adele Donaldson-Logan](Adele Donaldson-Logan)"
  - "[Elena Kohlwey](Elena Kohlwey)"
  - "[Karsten Maylahn](Karsten Maylahn)"
  - "[Luke Bangs](Luke Bangs)"
topicTags:
  - "[Work](Work)"
  - "[Digital Engineering](Digital Engineering)"
powerShellAlias: n/a
version: 3
---
# SDP

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

Scalable Development Plan to automatically building a full development timing plan based on a number of inputs.

Worked on this project with [Elena Kohlwey](Elena Kohlwey), [Karsten Maylahn](Karsten Maylahn), [Uwe Kloss](Uwe Kloss) and [Adele Donaldson-Logan](Adele Donaldson-Logan).

> **top:** [Back to top](#Table%20of%20Contents)

## Short Description

TBC

> **top:** [Back to top](#Table%20of%20Contents)

## Long Description

TBC

> **top:** [Back to top](#Table%20of%20Contents)

## Architecture and Technologies

- Front end: [01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java](01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java)/[React](React)
- Back end/Datasource: [Neo4j](Neo4j), [Cypher](Cypher), [01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java](01 Notes/02 Areas/Work Notes/Skills Notes/Languages/Java|Java), [SQL](SQL), [Excel](Excel), [VBA](VBA), [Google Sheets](Google Sheets), [Google Apps Script](Google Apps Script)
- Hosting: [GitLab](GitLab) (see [Repositories](#repositories))
- Security: n/a
- Authentication: [Google Cloud|GCP](Google Cloud|GCP)

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

- The planning and design of the frontend was done before I joined the project as we mainly developed the later apps to match the styling of the initial prototype.

> **top:** [Back to top](#Table%20of%20Contents)

## Other Links

- [SDP Acronyms](SDP Acronyms)
- [SDP Encyclopaedia](SDP Encyclopaedia)

> **top:** [Back to top](#Table%20of%20Contents)

## Lessons Learned

TBC

I was fully in charge of the [SQL](SQL) backend database, meaning I had to learn how to write [SQL](SQL) queries. I optimised this by storing the data that we collected day to day in [Excel](Excel) and then writing a [VBA](VBA) script to automate creating the [SQL](SQL) queries to update the database quickly.

This lead to a complete rebuild when our company migrated from [Microsoft](Microsoft) to [Google](Google), meaning I had to migrate the data and automations into [Google Sheets](Google Sheets) and use [Google Apps Script](Google Apps Script).

There was a brief period where we began consider rebuilding the frontend in [React](React) and as such, I was involved in discussing the requirements and helping with the interview process, although the development of this stopped relatively quickly when the whole project was scaled back.

As well as the main app, we also developed several [NeoDash](NeoDash) dashboards off of the [Neo4j](Neo4j) data for ongoing maintenance to check on the data.

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